"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Heart, Mail, Lock } from "lucide-react"
import {useAppDispatch,useAppSelector} from "@/store/hook"
import { loginUser } from "@/store/thunks/userThunks"


export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
const dispatch = useAppDispatch();
  const {loading, error  } = useAppSelector((s) => s.user);
  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

 const result = await dispatch(loginUser({ email, password }));
    if (result.type.endsWith('fulfilled')) router.push('/dashboard');
    // DUMMY DATA - Replace with real API call
    setTimeout(() => {
      localStorage.setItem("authToken", "dummy-token-" + Date.now())
      router.push("/dashboard")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Heart className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold">HealthMate</span>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-center text-muted-foreground mb-8">Sign in to your account</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <button onClick={() => router.push("/register")} className="text-primary hover:underline font-medium">
            Sign up
          </button>
        </p>
      </Card>
    </div>
  )
}
