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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  CheckCircle,
  XCircle,
  Clock,
  CalendarIcon,
  Search,
  Save,
  RotateCcw,
  AlertCircle,
  FileText,
  Building,
} from "lucide-react"
import { useState, useEffect } from "react"
import { students, classrooms, getCurrentUser, type Student } from "@/lib/database"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface AttendanceRecord {
  studentId: number
  status: "presente" | "ausente" | "tardanza" | "justificado"
  notes?: string
}

export default function AssistantDashboard() {
  const [activeTab, setActiveTab] = useState("attendance")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedClassroom, setSelectedClassroom] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, AttendanceRecord>>({})
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [notes, setNotes] = useState("")

  useEffect(() => {
    const user = getCurrentUser()
    setCurrentUser(user)
    if (user?.assignedClassrooms && user.assignedClassrooms.length > 0) {
      setSelectedClassroom(user.assignedClassrooms[0])
    }
  }, [])

  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({ type, message })
    setTimeout(() => setAlert(null), 3000)
  }

  const assignedClassrooms = currentUser?.assignedClassrooms || []
  const assignedClassroomDetails = classrooms.filter((c) => assignedClassrooms.includes(c.code))

  const studentsInSelectedClassroom = students.filter((s) => s.classroom === selectedClassroom)
  const filteredStudents = studentsInSelectedClassroom.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAttendanceChange = (studentId: number, status: "presente" | "ausente" | "tardanza" | "justificado") => {
    const key = `${selectedDate.toISOString().split("T")[0]}-${selectedClassroom}-${studentId}`
    setAttendanceRecords((prev) => ({
      ...prev,
      [key]: {
        studentId,
        status,
        notes: prev[key]?.notes || "",
      },
    }))
  }

  const getAttendanceStatus = (studentId: number) => {
    const key = `${selectedDate.toISOString().split("T")[0]}-${selectedClassroom}-${studentId}`
    return attendanceRecords[key]?.status || null
  }

  const saveAttendance = () => {
    // In a real app, this would save to the database
    showAlert("success", "Asistencia guardada exitosamente")
  }

  const resetAttendance = () => {
    const dateKey = `${selectedDate.toISOString().split("T")[0]}-${selectedClassroom}`
    const newRecords = { ...attendanceRecords }
    Object.keys(newRecords).forEach((key) => {
      if (key.startsWith(dateKey)) {
        delete newRecords[key]
      }
    })
    setAttendanceRecords(newRecords)
    showAlert("success", "Asistencia reiniciada")
  }

  const openNotesDialog = (student: Student) => {
    setSelectedStudent(student)
    const key = `${selectedDate.toISOString().split("T")[0]}-${selectedClassroom}-${student.id}`
    setNotes(attendanceRecords[key]?.notes || "")
    setIsNotesDialogOpen(true)
  }

  const saveNotes = () => {
    if (selectedStudent) {
      const key = `${selectedDate.toISOString().split("T")[0]}-${selectedClassroom}-${selectedStudent.id}`
      setAttendanceRecords((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          studentId: selectedStudent.id,
          status: prev[key]?.status || "presente",
          notes,
        },
      }))
      setIsNotesDialogOpen(false)
      showAlert("success", "Notas guardadas")
    }
  }

  const getAttendanceStats = () => {
    const dateKey = `${selectedDate.toISOString().split("T")[0]}-${selectedClassroom}`
    const todayRecords = Object.entries(attendanceRecords).filter(([key]) => key.startsWith(dateKey))

    const stats = {
      presente: 0,
      ausente: 0,
      tardanza: 0,
      justificado: 0,
      total: studentsInSelectedClassroom.length,
    }

    todayRecords.forEach(([, record]) => {
      stats[record.status]++
    })

    stats.presente = stats.total - stats.ausente - stats.tardanza - stats.justificado

    return stats
  }

  const stats = getAttendanceStats()

  if (!currentUser) {
    return <div>Cargando...</div>
  }

  return (
    <AuthGuard allowedRoles={["auxiliar"]}>
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="container mx-auto px-4 py-6">
          {alert && (
            <Alert className={`mb-4 ${alert.type === "success" ? "border-green-500" : "border-red-500"}`}>
              {alert.type === "success" ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={alert.type === "success" ? "text-green-700" : "text-red-700"}>
                {alert.message}
              </AlertDescription>
            </Alert>
          )}

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Panel del Auxiliar</h1>
            <p className="text-muted-foreground">Registra la asistencia de tus aulas asignadas</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-card">
              <TabsTrigger value="attendance">Registro de Asistencia</TabsTrigger>
              <TabsTrigger value="summary">Resumen</TabsTrigger>
              <TabsTrigger value="classrooms">Mis Aulas</TabsTrigger>
            </TabsList>

            <TabsContent value="attendance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
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
                <div>
                  <Label>Aula Asignada</Label>
                  <Select value={selectedClassroom} onValueChange={setSelectedClassroom}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar aula" />
                    </SelectTrigger>
                    <SelectContent>
                      {assignedClassroomDetails.map((classroom) => (
                        <SelectItem key={classroom.code} value={classroom.code}>
                          {classroom.name} - {classroom.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Buscar estudiante</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {selectedClassroom && (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Presentes</p>
                            <p className="text-2xl font-bold text-green-600">{stats.presente}</p>
                          </div>
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Ausentes</p>
                            <p className="text-2xl font-bold text-red-600">{stats.ausente}</p>
                          </div>
                          <XCircle className="h-8 w-8 text-red-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Tardanzas</p>
                            <p className="text-2xl font-bold text-yellow-600">{stats.tardanza}</p>
                          </div>
                          <Clock className="h-8 w-8 text-yellow-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Justificados</p>
                            <p className="text-2xl font-bold text-blue-600">{stats.justificado}</p>
                          </div>
                          <FileText className="h-8 w-8 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>
                            Lista de Asistencia - {format(selectedDate, "dd/MM/yyyy", { locale: es })}
                          </CardTitle>
                          <CardDescription>
                            {assignedClassroomDetails.find((c) => c.code === selectedClassroom)?.name} - Total:{" "}
                            {studentsInSelectedClassroom.length} estudiantes
                          </CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Button onClick={resetAttendance} variant="outline" size="sm">
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Reiniciar
                          </Button>
                          <Button onClick={saveAttendance} size="sm">
                            <Save className="mr-2 h-4 w-4" />
                            Guardar
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {filteredStudents.map((student) => {
                          const status = getAttendanceStatus(student.id)
                          const hasNotes =
                            attendanceRecords[
                              `${selectedDate.toISOString().split("T")[0]}-${selectedClassroom}-${student.id}`
                            ]?.notes
                          return (
                            <div
                              key={student.id}
                              className="flex items-center justify-between p-4 border rounded-lg bg-card"
                            >
                              <div className="flex-1">
                                <h3 className="font-medium text-foreground">
                                  {student.firstName} {student.lastName}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {student.grade}° {student.section} - DNI: {student.dni || "N/A"}
                                </p>
                                {hasNotes && (
                                  <p className="text-xs text-blue-600 mt-1">
                                    <FileText className="inline h-3 w-3 mr-1" />
                                    Tiene notas
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant={status === "presente" ? "default" : "outline"}
                                  onClick={() => handleAttendanceChange(student.id, "presente")}
                                  className={
                                    status === "presente"
                                      ? "bg-green-600 hover:bg-green-700 text-white"
                                      : "hover:bg-green-50 hover:text-green-700 hover:border-green-300"
                                  }
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />P
                                </Button>
                                <Button
                                  size="sm"
                                  variant={status === "ausente" ? "default" : "outline"}
                                  onClick={() => handleAttendanceChange(student.id, "ausente")}
                                  className={
                                    status === "ausente"
                                      ? "bg-red-600 hover:bg-red-700 text-white"
                                      : "hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                                  }
                                >
                                  <XCircle className="h-4 w-4 mr-1" />A
                                </Button>
                                <Button
                                  size="sm"
                                  variant={status === "tardanza" ? "default" : "outline"}
                                  onClick={() => handleAttendanceChange(student.id, "tardanza")}
                                  className={
                                    status === "tardanza"
                                      ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                                      : "hover:bg-yellow-50 hover:text-yellow-700 hover:border-yellow-300"
                                  }
                                >
                                  <Clock className="h-4 w-4 mr-1" />T
                                </Button>
                                <Button
                                  size="sm"
                                  variant={status === "justificado" ? "default" : "outline"}
                                  onClick={() => handleAttendanceChange(student.id, "justificado")}
                                  className={
                                    status === "justificado"
                                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                                      : "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                                  }
                                >
                                  <FileText className="h-4 w-4 mr-1" />J
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => openNotesDialog(student)}>
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>

            <TabsContent value="summary" className="space-y-6">
              <h2 className="text-2xl font-bold">Resumen de Asistencia</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assignedClassroomDetails.map((classroom) => {
                  const classroomStudents = students.filter((s) => s.classroom === classroom.code)
                  const dateKey = `${selectedDate.toISOString().split("T")[0]}-${classroom.code}`
                  const classroomRecords = Object.entries(attendanceRecords).filter(([key]) => key.startsWith(dateKey))

                  const classroomStats = {
                    presente: 0,
                    ausente: 0,
                    tardanza: 0,
                    justificado: 0,
                    total: classroomStudents.length,
                  }

                  classroomRecords.forEach(([, record]) => {
                    classroomStats[record.status]++
                  })

                  classroomStats.presente =
                    classroomStats.total - classroomStats.ausente - classroomStats.tardanza - classroomStats.justificado

                  const attendanceRate =
                    classroomStats.total > 0 ? (classroomStats.presente / classroomStats.total) * 100 : 0

                  return (
                    <Card key={classroom.code}>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Building className="mr-2 h-5 w-5" />
                          {classroom.name}
                        </CardTitle>
                        <CardDescription>Código: {classroom.code}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Asistencia:</span>
                            <Badge
                              variant={
                                attendanceRate >= 90 ? "default" : attendanceRate >= 80 ? "secondary" : "destructive"
                              }
                            >
                              {attendanceRate.toFixed(1)}%
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-green-600">Presentes:</span>
                              <span>{classroomStats.presente}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-red-600">Ausentes:</span>
                              <span>{classroomStats.ausente}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-yellow-600">Tardanzas:</span>
                              <span>{classroomStats.tardanza}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-blue-600">Justificados:</span>
                              <span>{classroomStats.justificado}</span>
                            </div>
                          </div>
                          <div className="pt-2 border-t">
                            <div className="flex justify-between text-sm font-medium">
                              <span>Total:</span>
                              <span>{classroomStats.total}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="classrooms" className="space-y-6">
              <h2 className="text-2xl font-bold">Mis Aulas Asignadas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assignedClassroomDetails.map((classroom) => {
                  const classroomStudents = students.filter((s) => s.classroom === classroom.code)
                  return (
                    <Card key={classroom.code}>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Building className="mr-2 h-5 w-5" />
                          {classroom.name}
                        </CardTitle>
                        <CardDescription>
                          {classroom.grade}° Grado - Sección {classroom.section}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Código:</span>
                            <Badge variant="outline">{classroom.code}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Estudiantes:</span>
                            <span className="text-sm">{classroomStudents.length}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Capacidad:</span>
                            <span className="text-sm">{classroom.capacity}</span>
                          </div>
                          <Button
                            className="w-full mt-4 bg-transparent"
                            variant="outline"
                            onClick={() => {
                              setSelectedClassroom(classroom.code)
                              setActiveTab("attendance")
                            }}
                          >
                            Registrar Asistencia
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Dialog open={isNotesDialogOpen} onOpenChange={setIsNotesDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Notas</DialogTitle>
              <DialogDescription>
                {selectedStudent && `${selectedStudent.firstName} ${selectedStudent.lastName}`}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="notes">Observaciones</Label>
                <Textarea
                  id="notes"
                  placeholder="Agregar observaciones sobre la asistencia..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsNotesDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={saveNotes}>Guardar Notas</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AuthGuard>
  )
}
