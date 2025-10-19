
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Heart, Mail, Lock, User } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegister = async (e) => {
    
    
    e.preventDefault()
    try {
    setIsLoading(true)
 
      const response = await axios.post(`https://smit-hackathon-backend-phi.vercel.app/api/auth/register`, {
   userName:`${firstName} ${lastName}`,
        email,
    password,
  });
  console.log(response)
  if (response.data.status) {
    localStorage.setItem("authToken", response?.data?.data?.token,)
      router.push("/dashboard")
      setIsLoading(false)
    } else {
      alert('something went wrong')
    setIsLoading(false)
    
  }
    } catch (error) {
         alert('something went wrong')
      console.log(error)
    }
    // DUMMY DATA - Replace with real API call
    // setTimeout(() => {

    //   localStorage.setItem("authToken", "dummy-token-" + Date.now())
    //   router.push("/dashboard")
    //   setIsLoading(false)
    // }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Heart className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold">HealthMate</span>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Create Account</h1>
        <p className="text-center text-muted-foreground mb-8">Join HealthMate today</p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">First Name</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Last Name</label>
              <Input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <button onClick={() => router.push("/login")} className="text-primary hover:underline font-medium">
            Sign in
          </button>
        </p>
      </Card>
    </div>
  )
}
