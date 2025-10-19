"use client"

import { createContext, useContext, useState } from "react"

const LanguageContext = createContext()

const translations = {
  en: {
    dashboard: "Dashboard",
    reports: "Reports",
    vitals: "Vitals",
    analytics: "Analytics",
    timeline: "Timeline",
    chat: "Chat",
    settings: "Settings",
    logout: "Logout",
    welcome: "Welcome back!",
    healthOverview: "Here's your health overview",
    recentReports: "Recent Reports",
    viewAll: "View All",
    uploadReport: "Upload Report",
    addVitals: "Add Vitals",
    askQuestion: "Ask a Question",
  },
  ur: {
    dashboard: "ڈیش بورڈ",
    reports: "رپورٹس",
    vitals: "حیاتیات",
    analytics: "تجزیات",
    timeline: "ٹائم لائن",
    chat: "چیٹ",
    settings: "ترتیبات",
    logout: "لاگ آؤٹ",
    welcome: "خوش آمدید!",
    healthOverview: "یہاں آپ کی صحت کا جائزہ ہے",
    recentReports: "حالیہ رپورٹس",
    viewAll: "سب دیکھیں",
    uploadReport: "رپورٹ اپ لوڈ کریں",
    addVitals: "حیاتیات شامل کریں",
    askQuestion: "سوال پوچھیں",
  },
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en")

  const t = (key) => translations[language]?.[key] || key

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
