"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <Link href="/" className="text-2xl font-bold flex items-center mb-8">
        <span className="text-[#212A31] bg-[#D3D9D4] px-2 py-1 rounded-md mr-1">Coco</span>
        <span>Shop</span>
      </Link>

      <Card className="w-full max-w-md border-[#748D92]">
        <CardHeader className="space-y-1 bg-[#212A31] text-[#D3D9D4] rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center text-[#D3D9D4]/80">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-[#748D92] focus-visible:ring-[#124E66]"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-[#748D92] focus-visible:ring-[#124E66]"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#124E66] hover:bg-[#2E3944] text-[#D3D9D4]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[#748D92]" />
            </div>

          </div>
        </CardFooter>
        <div className="text-center pb-6">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#124E66] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
