"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart, Upload, TrendingUp, Shield } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Heart className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">HealthMate</span>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => router.push("/login")}>
            Login
          </Button>
          <Button onClick={() => router.push("/register")}>Sign Up</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
          Your Personal Health Companion
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
          Upload medical reports, get AI-powered insights in simple language, and manage your health all in one place.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={() => router.push("/register")}>
            Get Started
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why HealthMate?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Upload, title: "Easy Upload", desc: "Upload PDFs, images, and reports" },
            { icon: Heart, title: "AI Analysis", desc: "Get instant AI-powered summaries" },
            { icon: TrendingUp, title: "Track Progress", desc: "Monitor your health over time" },
            { icon: Shield, title: "Secure & Private", desc: "Your data is encrypted and safe" },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <feature.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to take control of your health?</h2>
          <p className="text-muted-foreground mb-8">Join thousands of users managing their health with HealthMate</p>
          <Button size="lg" onClick={() => router.push("/register")}>
            Start Free Today
          </Button>
        </div>
      </section>
    </div>
  )
}
