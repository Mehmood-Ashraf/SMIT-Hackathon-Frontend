"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Moon, Sun, Bell, Lock, User } from "lucide-react"

export default function SettingsPage() {
  const [language, setLanguage] = useState("en")
  const [theme, setTheme] = useState("light")
  const [notifications, setNotifications] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "pt", name: "Português" },
    { code: "ja", name: "日本語" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your preferences and account settings</p>
      </div>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Language & Region
          </CardTitle>
          <CardDescription>Choose your preferred language</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`p-4 rounded-lg border transition-colors text-left ${
                  language === lang.code ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                }`}
              >
                <p className="font-medium text-foreground">{lang.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{lang.code.toUpperCase()}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="w-5 h-5" />
            Appearance
          </CardTitle>
          <CardDescription>Customize how HealthMate looks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { id: "light", name: "Light", icon: Sun },
                { id: "dark", name: "Dark", icon: Moon },
                { id: "auto", name: "Auto", icon: "auto" },
              ].map((themeOption) => {
                const Icon = typeof themeOption.icon === "string" ? null : themeOption.icon
                return (
                  <button
                    key={themeOption.id}
                    onClick={() => setTheme(themeOption.id)}
                    className={`p-4 rounded-lg border transition-colors ${
                      theme === themeOption.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {Icon && <Icon className="w-6 h-6 text-foreground mb-2" />}
                    <p className="font-medium text-foreground">{themeOption.name}</p>
                  </button>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
          <CardDescription>Manage how you receive updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-medium text-foreground">Push Notifications</p>
              <p className="text-sm text-muted-foreground">Receive alerts on your device</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications ? "bg-primary" : "bg-muted-foreground"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-medium text-foreground">Email Alerts</p>
              <p className="text-sm text-muted-foreground">Get important updates via email</p>
            </div>
            <button
              onClick={() => setEmailAlerts(!emailAlerts)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                emailAlerts ? "bg-primary" : "bg-muted-foreground"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  emailAlerts ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Privacy & Security
          </CardTitle>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Two-Factor Authentication
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Connected Devices
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Privacy Policy
          </Button>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Account
          </CardTitle>
          <CardDescription>Manage your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Edit Profile
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Download Your Data
          </Button>
          <Button variant="destructive" className="w-full justify-start">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
