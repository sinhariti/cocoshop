"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProtectedPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-80px)]">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in the useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Protected Page</h1>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Welcome, {user.name}!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a protected page that only logged-in users can access.</p>
          <p className="mt-4">Your email: {user.email}</p>
        </CardContent>
      </Card>
    </div>
  )
}
