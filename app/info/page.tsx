"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Target,
  Eye,
  Award,
  BookOpen,
  Trophy,
  Globe,
  Heart,
} from "lucide-react"
import Link from "next/link"

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-red-700 to-red-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-yellow-300" />
              <span className="text-xl font-bold text-white">I.E. Joaquín Capelo</span>
            </Link>
            <div className="flex space-x-4">
              <Link href="/">
                <Button variant="ghost" className="text-white hover:bg-red-600">
                  Inicio
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-red-800 font-semibold shadow-lg">
                  Acceder al Sistema
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-700 to-red-900 bg-clip-text text-transparent mb-6">
            Institución Educativa Pública Emblemática "Joaquín Capelo"
          </h1>
          <p className="text-xl text-slate-700 mb-8 max-w-4xl mx-auto">
            Formando líderes del futuro con excelencia académica, valores sólidos y compromiso social en el corazón de
            Chanchamayo
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-yellow-200">
              <div className="text-3xl font-bold text-emerald-600 mb-2">1,200+</div>
              <div className="text-slate-600 font-medium">Estudiantes</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-yellow-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">39</div>
              <div className="text-slate-600 font-medium">Aulas Activas</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-yellow-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">80+</div>
              <div className="text-slate-600 font-medium">Docentes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Information */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* General Data */}
          <Card className="border-yellow-300 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50">
              <CardTitle className="text-2xl text-slate-800 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-blue-600" />
                Datos Generales de la Institución
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-emerald-600" />
                    Ubicación Geográfica
                  </h3>
                  <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                    <p className="text-slate-700">
                      <strong>Dirección:</strong> Calle Cauchos s/n
                    </p>
                    <p className="text-slate-700">
                      <strong>Distrito:</strong> La Merced
                    </p>
                    <p className="text-slate-700">
                      <strong>Provincia:</strong> Chanchamayo
                    </p>
                    <p className="text-slate-700">
                      <strong>Departamento:</strong> Junín
                    </p>
                    <p className="text-slate-700">
                      <strong>Región:</strong> Selva Central del Perú
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    Información Institucional
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-slate-700">
                      <strong>RUC:</strong> 20603199023
                    </p>
                    <p className="text-slate-700">
                      <strong>Fecha de Inscripción:</strong> 17 de mayo del 2018
                    </p>
                    <p className="text-slate-700">
                      <strong>Director:</strong> Parisaca Puma Jorge
                    </p>
                    <p className="text-slate-700">
                      <strong>Modalidad:</strong> Educación Básica Regular
                    </p>
                    <p className="text-slate-700">
                      <strong>Nivel:</strong> Educación Secundaria
                    </p>
                    <p className="text-slate-700">
                      <strong>Gestión:</strong> Pública
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mission, Vision, Objectives */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-emerald-300 bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader className="bg-gradient-to-br from-emerald-50 to-green-50">
                <CardTitle className="text-emerald-800 flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Misión Institucional
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-slate-700 text-sm leading-relaxed">
                  Brindar una formación integral a los estudiantes, enfocada al logro de los aprendizajes en base a las
                  orientaciones del CNEB, promoviendo y fortaleciendo la práctica de valores, principios y ética, en
                  espacios seguros e inclusivos de sana convivencia, libres de violencia, con conciencia ambiental y
                  actitud emprendedora que les permita afrontar los desafíos del mundo globalizado.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-300 bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader className="bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardTitle className="text-blue-800 flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Visión al 2027
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-slate-700 text-sm leading-relaxed">
                  Para el año 2027, ser reconocidos y valorados como una I.E.E que brinda un Servicio Educativo de
                  Calidad, con énfasis en una educación humanista, tecnológica, disciplinada, inclusiva, intercultural,
                  emprendedora y ética; organizada, con buenas prácticas pedagógicas y de gestión ecoeficiente, que
                  contribuya al desarrollo social de forma activa involucrando a las familias.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-300 bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader className="bg-gradient-to-br from-purple-50 to-pink-50">
                <CardTitle className="text-purple-800 flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Objetivos Estratégicos
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="text-slate-700 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    Incrementar la calidad educativa mediante estrategias pedagógicas innovadoras
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    Optimizar procesos internos para mejorar la gestión educativa
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    Implementar soluciones tecnológicas para el desarrollo integral
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-indigo-300 bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader className="bg-gradient-to-br from-indigo-50 to-blue-50">
                <CardTitle className="text-indigo-800 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Programas Académicos
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-indigo-700 mb-2">Áreas Curriculares</h4>
                    <ul className="text-slate-700 text-sm space-y-1">
                      <li>• Comunicación y Literatura</li>
                      <li>• Matemática</li>
                      <li>• Ciencia y Tecnología</li>
                      <li>• Ciencias Sociales</li>
                      <li>• Educación Física</li>
                      <li>• Arte y Cultura</li>
                      <li>• Inglés como Lengua Extranjera</li>
                      <li>• Educación Religiosa</li>
                      <li>• Educación para el Trabajo</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-2">Talleres Extracurriculares</h4>
                    <ul className="text-slate-700 text-sm space-y-1">
                      <li>• Club de Ciencias</li>
                      <li>• Taller de Robótica</li>
                      <li>• Banda Musical</li>
                      <li>• Deportes Múltiples</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-300 bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader className="bg-gradient-to-br from-orange-50 to-yellow-50">
                <CardTitle className="text-orange-800 flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Valores y Principios
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-orange-50 p-3 rounded-lg text-center">
                      <div className="font-semibold text-orange-700">Respeto</div>
                      <div className="text-xs text-slate-600 mt-1">Valoramos la diversidad</div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg text-center">
                      <div className="font-semibold text-red-700">Responsabilidad</div>
                      <div className="text-xs text-slate-600 mt-1">Compromiso con el aprendizaje</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <div className="font-semibold text-green-700">Solidaridad</div>
                      <div className="text-xs text-slate-600 mt-1">Apoyo mutuo</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <div className="font-semibold text-blue-700">Honestidad</div>
                      <div className="text-xs text-slate-600 mt-1">Transparencia en el actuar</div>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-purple-700 mb-2">Enfoque Pedagógico</h4>
                    <p className="text-slate-700 text-sm">
                      Educación humanista centrada en el desarrollo integral del estudiante, promoviendo el pensamiento
                      crítico, la creatividad y el liderazgo.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Infrastructure and Services */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-teal-300 bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader className="bg-gradient-to-br from-teal-50 to-cyan-50">
                <CardTitle className="text-teal-800 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Infraestructura Educativa
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-teal-700 font-bold text-lg">Total de Aulas:</span>
                      <span className="text-teal-800 font-bold text-2xl">39</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between bg-white p-2 rounded">
                        <span className="text-slate-700 font-medium">1er Grado:</span>
                        <span className="text-slate-600">8 secciones (100-107)</span>
                      </div>
                      <div className="flex justify-between bg-white p-2 rounded">
                        <span className="text-slate-700 font-medium">2do Grado:</span>
                        <span className="text-slate-600">7 secciones (200-206)</span>
                      </div>
                      <div className="flex justify-between bg-white p-2 rounded">
                        <span className="text-slate-700 font-medium">3er Grado:</span>
                        <span className="text-slate-600">8 secciones (300-307)</span>
                      </div>
                      <div className="flex justify-between bg-white p-2 rounded">
                        <span className="text-slate-700 font-medium">4to Grado:</span>
                        <span className="text-slate-600">8 secciones (400-407)</span>
                      </div>
                      <div className="flex justify-between bg-white p-2 rounded">
                        <span className="text-slate-700 font-medium">5to Grado:</span>
                        <span className="text-slate-600">8 secciones (500-507)</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-cyan-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-cyan-700 mb-2">Capacidad Estudiantil</h4>
                    <p className="text-slate-700 text-sm">
                      Aproximadamente <strong>30-35 estudiantes por aula</strong>, con una población total de más de{" "}
                      <strong>1,200 estudiantes</strong>
                      distribuidos en los cinco grados de educación secundaria.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-rose-300 bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader className="bg-gradient-to-br from-rose-50 to-pink-50">
                <CardTitle className="text-rose-800 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Servicios y Horarios
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
                    <h4 className="font-medium text-rose-700 mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Horario Académico
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between bg-white p-2 rounded">
                        <span className="text-slate-700 font-medium">Lunes a Viernes:</span>
                        <span className="text-slate-600">7:30 AM - 1:30 PM</span>
                      </div>
                      <div className="flex justify-between bg-white p-2 rounded">
                        <span className="text-slate-700 font-medium">Recreos:</span>
                        <span className="text-slate-600">9:50 AM y 11:30 AM</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-pink-50 p-3 rounded-lg">
                    <h4 className="font-medium text-pink-700 mb-2">Servicios Disponibles</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                        <span className="text-slate-700">Biblioteca escolar</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                        <span className="text-slate-700">Lab. de ciencias</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                        <span className="text-slate-700">Aula de cómputo</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                        <span className="text-slate-700">Área deportiva</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                        <span className="text-slate-700">Comedor estudiantil</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                        <span className="text-slate-700">Auditorio</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card className="border-slate-300 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50">
              <CardTitle className="text-2xl text-slate-800 flex items-center gap-2">
                <Phone className="h-6 w-6 text-slate-600" />
                Información de Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center bg-green-50 p-6 rounded-lg border border-green-200">
                  <Phone className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-green-700 mb-2">Teléfono</h3>
                  <p className="text-slate-700 font-medium">+51 948565328</p>
                  <p className="text-slate-500 text-sm mt-1">Atención: 8:00 AM - 3:00 PM</p>
                </div>
                <div className="text-center bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <Mail className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-blue-700 mb-2">Email Institucional</h3>
                  <p className="text-slate-700 font-medium">info@joaquincapelo.edu.pe</p>
                  <p className="text-slate-500 text-sm mt-1">Respuesta en 24-48 horas</p>
                </div>
                <div className="text-center bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-purple-700 mb-2">Ubicación</h3>
                  <p className="text-slate-700 font-medium">
                    Calle Cauchos s/n
                    <br />
                    La Merced, Chanchamayo
                  </p>
                  <p className="text-slate-500 text-sm mt-1">Junín, Perú</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-700 to-orange-700 bg-clip-text text-transparent mb-6">
            ¿Listo para acceder al sistema?
          </h2>
          <p className="text-xl text-slate-700 mb-8">
            Ingresa al sistema de asistencia para gestionar y consultar la información estudiantil de manera eficiente
          </p>
          <Link href="/login">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Acceder al Sistema de Asistencia
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-yellow-400" />
                I.E. Joaquín Capelo
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Institución educativa emblemática comprometida con la formación integral de más de 1,200 estudiantes en
                el corazón de Chanchamayo.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-yellow-400">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <Link href="/" className="hover:text-yellow-400 transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-yellow-400 transition-colors">
                    Sistema de Asistencia
                  </Link>
                </li>
                <li>
                  <a href="tel:+51948565328" className="hover:text-yellow-400 transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-yellow-400">Información</h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>RUC: 20603199023</li>
                <li>La Merced, Chanchamayo</li>
                <li>Junín, Perú</li>
                <li>+51 948565328</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-6 text-center">
            <p className="text-slate-400">
              © 2024 I.E. Joaquín Capelo - Todos los derechos reservados | Formando líderes del futuro con excelencia y
              valores
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
