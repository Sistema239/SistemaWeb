import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, MapPin, Phone, Clock, Users, Target, Eye, Award } from "lucide-react"
import Link from "next/link"

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100">
      {/* Navigation */}
      <nav className="bg-red-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-yellow-300" />
              <span className="text-xl font-bold text-white">I.E. Joaquín Capelo</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/info">
                <Button variant="ghost" className="text-white hover:bg-red-600">
                  Información
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-red-800 font-semibold">
                  Acceder al Sistema
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-32 h-32 bg-red-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <GraduationCap className="h-16 w-16 text-yellow-300" />
            </div>
            <h1 className="text-5xl font-bold text-red-800 mb-4">I.E. Joaquín Capelo</h1>
            <h2 className="text-2xl text-red-700 mb-6">Institución Educativa Pública Emblemática</h2>
            <p className="text-xl text-red-600 mb-8 max-w-4xl mx-auto">
              Sistema de Asistencia Escolar - Portal de Acceso
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-white/80 border-red-200 shadow-lg">
              <CardContent className="pt-6 text-center">
                <Users className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-bold text-red-800">1,200+</h3>
                <p className="text-red-600 text-sm">Estudiantes</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 border-red-200 shadow-lg">
              <CardContent className="pt-6 text-center">
                <Award className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-bold text-red-800">39</h3>
                <p className="text-red-600 text-sm">Aulas</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 border-red-200 shadow-lg">
              <CardContent className="pt-6 text-center">
                <Target className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-bold text-red-800">5</h3>
                <p className="text-red-600 text-sm">Grados</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 border-red-200 shadow-lg">
              <CardContent className="pt-6 text-center">
                <Eye className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-bold text-red-800">50+</h3>
                <p className="text-red-600 text-sm">Años</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Actions */}
          <div className="space-y-6">
            <div className="bg-white/90 rounded-lg p-8 shadow-xl max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-red-800 mb-4">Acceso al Sistema</h3>
              <p className="text-red-600 mb-6">
                Ingresa al sistema de asistencia para gestionar y consultar información estudiantil
              </p>
              <div className="space-y-4">
                <Link href="/login">
                  <Button size="lg" className="w-full bg-red-700 hover:bg-red-800 text-white py-4 text-lg">
                    Ingresar al Sistema de Asistencia
                  </Button>
                </Link>
                <Link href="/info">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-red-300 text-red-700 hover:bg-red-50 py-4 text-lg bg-transparent"
                  >
                    Ver Información del Colegio
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="bg-white/80 border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center gap-2 text-lg">
                    <MapPin className="h-5 w-5" />
                    Ubicación
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-600 text-sm">
                    Calle Cauchos s/n
                    <br />
                    La Merced, Chanchamayo
                    <br />
                    Junín, Perú
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center gap-2 text-lg">
                    <Clock className="h-5 w-5" />
                    Horarios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-600 text-sm">
                    Clases: 7:15 AM - 2:55 PM
                    <br />
                    Atención: 8:00 AM - 1:00 PM
                    <br />
                    Lunes a Viernes
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center gap-2 text-lg">
                    <Phone className="h-5 w-5" />
                    Contacto
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-600 text-sm">
                    Teléfono: +51 948565328
                    <br />
                    Email: info@joaquincapelo.edu.pe
                    <br />
                    RUC: 20603199023
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-red-800 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">I.E. Joaquín Capelo</h3>
            <p className="text-red-200">Formando líderes del futuro con excelencia y valores</p>
          </div>
          <div className="border-t border-red-700 pt-4">
            <p className="text-red-200">© 2024 I.E. Joaquín Capelo - Todos los derechos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
