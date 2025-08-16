"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, type User } from "@/lib/database"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  allowedRoles?: ("administrador" | "profesor" | "auxiliar")[]
  redirectTo?: string
}

export default function AuthGuard({ children, allowedRoles, redirectTo = "/login" }: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()

    if (!currentUser) {
      router.push(redirectTo)
      return
    }

    if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
      // Redirect to appropriate dashboard based on role
      switch (currentUser.role) {
        case "administrador":
          router.push("/admin")
          break
        case "profesor":
          router.push("/teacher")
          break
        case "auxiliar":
          router.push("/assistant")
          break
        default:
          router.push("/login")
      }
      return
    }

    setUser(currentUser)
    setIsLoading(false)
  }, [router, allowedRoles, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <GraduationCap className="w-12 h-12 text-primary animate-pulse mb-4" />
            <p className="text-muted-foreground">Verificando acceso...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
