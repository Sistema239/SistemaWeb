"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GraduationCap, AlertCircle, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { users } from "@/lib/database"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Find user in database
    const user = users.find((u) => u.username === username && u.password === password)

    if (user) {
      // Store user session
      localStorage.setItem("currentUser", JSON.stringify(user))

      // Redirect based on role
      switch (user.role) {
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
          router.push("/")
      }
    } else {
      setError("Usuario o contraseña incorrectos")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-card to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
          >
            <GraduationCap className="w-8 h-8" />
            <span className="text-xl font-bold">I.E. Joaquín Capelo</span>
          </Link>
          <p className="text-muted-foreground mt-2">Sistema de Asistencia</p>
        </div>

        <Card className="border-accent/20 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif text-primary">Iniciar Sesión</CardTitle>
            <CardDescription>Ingresa tus credenciales para acceder al sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Ingresa tu usuario"
                  className="w-full"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    className="w-full pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? "Ingresando..." : "Ingresar al Sistema"}
              </Button>
            </form>

            <div className="text-center">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                ← Volver a la página principal
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p className="mb-2">Credenciales de prueba:</p>
          <div className="bg-card/50 rounded-lg p-3 space-y-1 text-xs">
            <p>
              <strong>Administrador:</strong> admin / admin123
            </p>
            <p>
              <strong>Profesor:</strong> profesor1 / prof123
            </p>
            <p>
              <strong>Auxiliar:</strong> auxiliar1 / aux123
            </p>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>¿Problemas para acceder?</p>
          <p>Contacta al administrador del sistema</p>
        </div>
      </div>
    </div>
  )
}
