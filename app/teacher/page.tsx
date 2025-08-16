"use client"

import AuthGuard from "@/components/auth-guard"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  Users,
  GraduationCap,
  BarChart3,
  Download,
  CalendarIcon,
  Search,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react"
import { useState } from "react"
import { students, classrooms } from "@/lib/database"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { exportAttendanceReportExcel, exportStudentsToExcel, downloadFile } from "@/lib/excel"

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedGrade, setSelectedGrade] = useState<string>("all")
  const [selectedClassroom, setSelectedClassroom] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock attendance data for demonstration
  const mockAttendanceData = [
    { date: "2024-01-15", present: 850, absent: 120, late: 30, justified: 15 },
    { date: "2024-01-16", present: 870, absent: 100, late: 25, justified: 20 },
    { date: "2024-01-17", present: 860, absent: 110, late: 28, justified: 18 },
    { date: "2024-01-18", present: 880, absent: 95, late: 22, justified: 12 },
    { date: "2024-01-19", present: 875, absent: 105, late: 20, justified: 15 },
  ]

  const attendanceByGrade = [
    { grade: "1°", present: 180, absent: 20, late: 8 },
    { grade: "2°", present: 175, absent: 25, late: 6 },
    { grade: "3°", present: 170, absent: 30, late: 10 },
    { grade: "4°", present: 165, absent: 35, late: 12 },
    { grade: "5°", present: 160, absent: 28, late: 8 },
  ]

  const pieData = [
    { name: "Presente", value: 875, color: "#22c55e" },
    { name: "Ausente", value: 105, color: "#ef4444" },
    { name: "Tardanza", value: 20, color: "#f59e0b" },
    { name: "Justificado", value: 15, color: "#3b82f6" },
  ]

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGrade = selectedGrade === "all" || student.grade.toString() === selectedGrade
    const matchesClassroom = selectedClassroom === "all" || student.classroom === selectedClassroom
    return matchesSearch && matchesGrade && matchesClassroom
  })

  const getClassroomsByGrade = (grade: string) => {
    if (grade === "all") return classrooms
    return classrooms.filter((c) => c.grade.toString() === grade)
  }

  const generateReport = (type: string) => {
    let blob: Blob
    let filename: string

    switch (type) {
      case "asistencia":
        blob = exportAttendanceReportExcel(filteredStudents, [], { from: selectedDate, to: selectedDate })
        filename = `reporte_asistencia_${format(selectedDate, "yyyy-MM-dd")}.xlsx`
        break
      case "estudiantes":
        blob = exportStudentsToExcel(filteredStudents)
        filename = `lista_estudiantes_${format(new Date(), "yyyy-MM-dd")}.xlsx`
        break
      default:
        blob = exportAttendanceReportExcel(students, [], { from: new Date(), to: new Date() })
        filename = `reporte_${type}_${format(new Date(), "yyyy-MM-dd")}.xlsx`
    }

    downloadFile(blob, filename, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
  }

  const totalStudents = students.length
  const todayPresent = 875
  const todayAbsent = 105
  const todayLate = 20
  const attendanceRate = ((todayPresent / totalStudents) * 100).toFixed(1)

  return (
    <AuthGuard allowedRoles={["profesor"]}>
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Panel del Profesor</h1>
            <p className="text-muted-foreground">Consulta y analiza la asistencia de los estudiantes</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-card">
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="attendance">Asistencia</TabsTrigger>
              <TabsTrigger value="students">Estudiantes</TabsTrigger>
              <TabsTrigger value="reports">Reportes</TabsTrigger>
              <TabsTrigger value="analytics">Análisis</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Asistencia Hoy</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{todayPresent}</div>
                    <p className="text-xs text-muted-foreground">{attendanceRate}% de asistencia</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ausencias Hoy</CardTitle>
                    <XCircle className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{todayAbsent}</div>
                    <p className="text-xs text-muted-foreground">Estudiantes ausentes</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tardanzas Hoy</CardTitle>
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">{todayLate}</div>
                    <p className="text-xs text-muted-foreground">Llegadas tardías</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
                    <GraduationCap className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">{totalStudents}</div>
                    <p className="text-xs text-muted-foreground">Estudiantes registrados</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Asistencia por Día</CardTitle>
                    <CardDescription>Últimos 5 días</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={mockAttendanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), "dd/MM")} />
                        <YAxis />
                        <Tooltip labelFormatter={(value) => format(new Date(value), "dd/MM/yyyy", { locale: es })} />
                        <Bar dataKey="present" fill="#22c55e" name="Presente" />
                        <Bar dataKey="absent" fill="#ef4444" name="Ausente" />
                        <Bar dataKey="late" fill="#f59e0b" name="Tardanza" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Distribución de Asistencia Hoy</CardTitle>
                    <CardDescription>Estado actual de los estudiantes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Asistencia por Grado</CardTitle>
                  <CardDescription>Comparación entre grados académicos</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={attendanceByGrade}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="grade" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="present" fill="#22c55e" name="Presente" />
                      <Bar dataKey="absent" fill="#ef4444" name="Ausente" />
                      <Bar dataKey="late" fill="#f59e0b" name="Tardanza" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <Label>Fecha</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: es }) : "Seleccionar fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex-1">
                  <Label>Grado</Label>
                  <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los grados</SelectItem>
                      <SelectItem value="1">1° Grado</SelectItem>
                      <SelectItem value="2">2° Grado</SelectItem>
                      <SelectItem value="3">3° Grado</SelectItem>
                      <SelectItem value="4">4° Grado</SelectItem>
                      <SelectItem value="5">5° Grado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label>Aula</Label>
                  <Select value={selectedClassroom} onValueChange={setSelectedClassroom}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las aulas</SelectItem>
                      {getClassroomsByGrade(selectedGrade).map((classroom) => (
                        <SelectItem key={classroom.code} value={classroom.code}>
                          {classroom.name} - {classroom.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={() => generateReport("asistencia")} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Excel
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Registro de Asistencia - {format(selectedDate, "dd/MM/yyyy", { locale: es })}</CardTitle>
                  <CardDescription>Vista detallada por salón - Solo lectura</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[1, 2, 3, 4, 5].map((grade) => {
                      const gradeClassrooms = classrooms.filter((c) => c.grade === grade)
                      if (selectedGrade !== "all" && selectedGrade !== grade.toString()) return null

                      return (
                        <div key={grade} className="space-y-4">
                          <h3 className="text-xl font-semibold text-primary">{grade}° Grado</h3>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {gradeClassrooms.map((classroom) => {
                              if (selectedClassroom !== "all" && selectedClassroom !== classroom.code) return null

                              const studentsInClass = students.filter((s) => s.classroom === classroom.code)

                              return (
                                <Card key={classroom.code} className="border-l-4 border-l-primary">
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex justify-between items-center">
                                      <span>{classroom.name}</span>
                                      <Badge variant="outline">{studentsInClass.length} estudiantes</Badge>
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-2 max-h-60 overflow-y-auto">
                                      {studentsInClass.map((student) => {
                                        const statuses = ["presente", "ausente", "tardanza", "justificado"]
                                        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

                                        return (
                                          <div
                                            key={student.id}
                                            className="flex justify-between items-center py-1 px-2 rounded hover:bg-muted/50"
                                          >
                                            <span className="text-sm font-medium">
                                              {student.firstName} {student.lastName}
                                            </span>
                                            <Badge
                                              variant={
                                                randomStatus === "presente"
                                                  ? "default"
                                                  : randomStatus === "ausente"
                                                    ? "destructive"
                                                    : randomStatus === "tardanza"
                                                      ? "secondary"
                                                      : "outline"
                                              }
                                              className={
                                                randomStatus === "presente"
                                                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                                                  : randomStatus === "ausente"
                                                    ? "bg-red-100 text-red-800 hover:bg-red-200"
                                                    : randomStatus === "tardanza"
                                                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                                      : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                              }
                                            >
                                              {randomStatus === "presente"
                                                ? "P"
                                                : randomStatus === "ausente"
                                                  ? "A"
                                                  : randomStatus === "tardanza"
                                                    ? "T"
                                                    : "J"}
                                            </Badge>
                                          </div>
                                        )
                                      })}
                                    </div>
                                    <div className="mt-4 pt-3 border-t">
                                      <div className="flex justify-between text-sm">
                                        <span className="text-green-600">
                                          Presentes: {Math.floor(studentsInClass.length * 0.85)}
                                        </span>
                                        <span className="text-red-600">
                                          Ausentes: {Math.floor(studentsInClass.length * 0.1)}
                                        </span>
                                        <span className="text-yellow-600">
                                          Tardanzas: {Math.floor(studentsInClass.length * 0.05)}
                                        </span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label>Buscar estudiante</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por nombre o apellido..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <Label>Filtrar por grado</Label>
                  <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los grados</SelectItem>
                      <SelectItem value="1">1° Grado</SelectItem>
                      <SelectItem value="2">2° Grado</SelectItem>
                      <SelectItem value="3">3° Grado</SelectItem>
                      <SelectItem value="4">4° Grado</SelectItem>
                      <SelectItem value="5">5° Grado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label>Filtrar por aula</Label>
                  <Select value={selectedClassroom} onValueChange={setSelectedClassroom}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las aulas</SelectItem>
                      {getClassroomsByGrade(selectedGrade).map((classroom) => (
                        <SelectItem key={classroom.code} value={classroom.code}>
                          {classroom.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Lista de Estudiantes</CardTitle>
                  <CardDescription>
                    Mostrando {filteredStudents.length} de {students.length} estudiantes
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombres</TableHead>
                        <TableHead>Apellidos</TableHead>
                        <TableHead>Aula</TableHead>
                        <TableHead>Asistencia</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => {
                        const attendanceRate = Math.floor(Math.random() * 20) + 80
                        return (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.firstName}</TableCell>
                            <TableCell>{student.lastName}</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {student.grade}° {student.section} - {student.classroom}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  attendanceRate >= 90 ? "default" : attendanceRate >= 80 ? "secondary" : "destructive"
                                }
                              >
                                {attendanceRate}%
                              </Badge>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <h2 className="text-2xl font-bold">Reportes de Asistencia</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5" />
                      Reporte Diario Excel
                    </CardTitle>
                    <CardDescription>Asistencia del día actual en formato Excel</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => generateReport("diario")} className="w-full" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar Excel
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Reporte Semanal Excel
                    </CardTitle>
                    <CardDescription>Resumen de la semana en Excel</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => generateReport("semanal")} className="w-full" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar Excel
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="mr-2 h-5 w-5" />
                      Lista de Estudiantes Excel
                    </CardTitle>
                    <CardDescription>Exportar lista completa en Excel</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => generateReport("estudiantes")} className="w-full" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar Excel
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <GraduationCap className="mr-2 h-5 w-5" />
                      Reporte por Grado
                    </CardTitle>
                    <CardDescription>Comparación entre grados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => generateReport("grado")} className="w-full" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar Excel
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5" />
                      Reporte de Ausencias
                    </CardTitle>
                    <CardDescription>Estudiantes con alta ausencia</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => generateReport("ausencias")} className="w-full" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar Excel
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <h2 className="text-2xl font-bold">Análisis de Asistencia</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tendencia de Asistencia</CardTitle>
                    <CardDescription>Evolución durante el mes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={mockAttendanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), "dd/MM")} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="present" fill="#22c55e" name="Presente" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Comparación por Grado</CardTitle>
                    <CardDescription>Porcentaje de asistencia por grado</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {attendanceByGrade.map((grade) => {
                        const total = grade.present + grade.absent + grade.late
                        const percentage = ((grade.present / total) * 100).toFixed(1)
                        return (
                          <div key={grade.grade} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium">{grade.grade} Grado</span>
                              <span className="text-sm text-muted-foreground">{percentage}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: `${percentage}%` }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas Detalladas</CardTitle>
                  <CardDescription>Métricas importantes de asistencia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">87.5%</div>
                      <p className="text-sm text-muted-foreground">Promedio de Asistencia</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600">10.5%</div>
                      <p className="text-sm text-muted-foreground">Promedio de Ausencias</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-600">2.0%</div>
                      <p className="text-sm text-muted-foreground">Promedio de Tardanzas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  )
}
