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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ImportDialog from "@/components/import-dialog"
import { exportStudentsToCSV, exportAttendanceReport, downloadFile } from "@/lib/import-export"
import {
  Users,
  GraduationCap,
  Building,
  BarChart3,
  UserPlus,
  Upload,
  Download,
  Trash2,
  Edit,
  Plus,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { useState } from "react"
import { users, students, classrooms, type User, type Student } from "@/lib/database"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [userList, setUserList] = useState<User[]>(users)
  const [studentList, setStudentList] = useState<Student[]>(students)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    role: "profesor" as "administrador" | "profesor" | "auxiliar",
    assignedClassrooms: [] as string[],
  })
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    classroom: "",
    grade: 1,
    section: "",
    dni: "",
    parentName: "",
    parentPhone: "",
  })
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({ type, message })
    setTimeout(() => setAlert(null), 3000)
  }

  const handleAddUser = () => {
    if (!newUser.username || !newUser.password || !newUser.name || !newUser.email) {
      showAlert("error", "Todos los campos son obligatorios")
      return
    }

    const userExists = userList.some((u) => u.username === newUser.username)
    if (userExists) {
      showAlert("error", "El nombre de usuario ya existe")
      return
    }

    const user: User = {
      id: Math.max(...userList.map((u) => u.id)) + 1,
      ...newUser,
    }

    setUserList([...userList, user])
    setNewUser({
      username: "",
      password: "",
      name: "",
      email: "",
      role: "profesor",
      assignedClassrooms: [],
    })
    setIsAddUserOpen(false)
    showAlert("success", "Usuario agregado exitosamente")
  }

  const handleAddStudent = () => {
    if (!newStudent.firstName || !newStudent.lastName || !newStudent.classroom) {
      showAlert("error", "Nombre, apellido y aula son obligatorios")
      return
    }

    const classroom = classrooms.find((c) => c.code === newStudent.classroom)
    if (!classroom) {
      showAlert("error", "Aula no válida")
      return
    }

    const student: Student = {
      id: Math.max(...studentList.map((s) => s.id), 0) + 1,
      ...newStudent,
      grade: classroom.grade,
      section: classroom.section,
    }

    setStudentList([...studentList, student])
    setNewStudent({
      firstName: "",
      lastName: "",
      classroom: "",
      grade: 1,
      section: "",
      dni: "",
      parentName: "",
      parentPhone: "",
    })
    setIsAddStudentOpen(false)
    showAlert("success", "Estudiante agregado exitosamente")
  }

  const handleDeleteUser = (id: number) => {
    setUserList(userList.filter((u) => u.id !== id))
    showAlert("success", "Usuario eliminado exitosamente")
  }

  const handleDeleteStudent = (id: number) => {
    setStudentList(studentList.filter((s) => s.id !== id))
    showAlert("success", "Estudiante eliminado exitosamente")
  }

  const generateStudentTemplate = () => {
    const csvContent = "Nombres,Apellidos,Aula,DNI,Nombre del Padre/Madre,Teléfono\n"
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "plantilla_estudiantes.csv"
    a.click()
    window.URL.revokeObjectURL(url)
    showAlert("success", "Plantilla CSV descargada")
  }

  const generateExcelTemplate = () => {
    // Simulate Excel template generation
    showAlert("success", "Plantilla Excel descargada (simulado)")
  }

  const handleImportSuccess = (importedStudents: Student[]) => {
    // Add imported students to the list
    const studentsWithIds = importedStudents.map((student) => ({
      ...student,
      id: Math.max(...studentList.map((s) => s.id), 0) + Math.random(),
    }))
    setStudentList([...studentList, ...studentsWithIds])
    showAlert("success", `Se importaron ${importedStudents.length} estudiantes exitosamente`)
  }

  const exportStudents = () => {
    const csvContent = exportStudentsToCSV(studentList)
    downloadFile(csvContent, `estudiantes_${new Date().toISOString().split("T")[0]}.csv`)
    showAlert("success", "Lista de estudiantes exportada")
  }

  const exportAttendance = () => {
    const csvContent = exportAttendanceReport(studentList, [], { from: new Date(), to: new Date() })
    downloadFile(csvContent, `reporte_asistencia_${new Date().toISOString().split("T")[0]}.csv`)
    showAlert("success", "Reporte de asistencia exportado")
  }

  const stats = {
    totalStudents: studentList.length,
    totalTeachers: userList.filter((u) => u.role === "profesor").length,
    totalAssistants: userList.filter((u) => u.role === "auxiliar").length,
    totalClassrooms: classrooms.length,
  }

  return (
    <AuthGuard allowedRoles={["administrador"]}>
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Panel de Administración</h1>
            <p className="text-muted-foreground">Gestiona usuarios, estudiantes y configuraciones del sistema</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 bg-card">
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="users">Usuarios</TabsTrigger>
              <TabsTrigger value="students">Estudiantes</TabsTrigger>
              <TabsTrigger value="classrooms">Aulas</TabsTrigger>
              <TabsTrigger value="reports">Reportes</TabsTrigger>
              <TabsTrigger value="settings">Configuración</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">{stats.totalStudents}</div>
                    <p className="text-xs text-muted-foreground">Estudiantes registrados</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Profesores</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">{stats.totalTeachers}</div>
                    <p className="text-xs text-muted-foreground">Profesores activos</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Auxiliares</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">{stats.totalAssistants}</div>
                    <p className="text-xs text-muted-foreground">Auxiliares activos</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Aulas</CardTitle>
                    <Building className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">{stats.totalClassrooms}</div>
                    <p className="text-xs text-muted-foreground">Aulas disponibles</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Acciones Rápidas</CardTitle>
                    <CardDescription>Funciones más utilizadas</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button onClick={() => setIsAddUserOpen(true)} className="w-full justify-start" variant="outline">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Agregar Usuario
                    </Button>
                    <Button
                      onClick={() => setIsAddStudentOpen(true)}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Agregar Estudiante
                    </Button>
                    <Button
                      onClick={generateStudentTemplate}
                      className="w-full justify-start bg-transparent"
                      variant="outline"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Descargar Plantilla CSV
                    </Button>
                    <Button
                      onClick={generateExcelTemplate}
                      className="w-full justify-start bg-transparent"
                      variant="outline"
                    >
                      <FileSpreadsheet className="mr-2 h-4 w-4" />
                      Descargar Plantilla Excel
                    </Button>
                    <Button
                      onClick={() => setIsImportDialogOpen(true)}
                      className="w-full justify-start bg-transparent"
                      variant="outline"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Importar Estudiantes
                    </Button>
                    <Button onClick={exportStudents} className="w-full justify-start bg-transparent" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Exportar Estudiantes
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Distribución por Grado</CardTitle>
                    <CardDescription>Estudiantes por grado académico</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[1, 2, 3, 4, 5].map((grade) => {
                        const gradeStudents = studentList.filter((s) => s.grade === grade).length
                        return (
                          <div key={grade} className="flex items-center justify-between">
                            <span className="text-sm font-medium">{grade}° Grado</span>
                            <Badge variant="secondary">{gradeStudents} estudiantes</Badge>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
                <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Agregar Usuario
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
                      <DialogDescription>Completa la información del nuevo usuario</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="username">Usuario</Label>
                          <Input
                            id="username"
                            value={newUser.username}
                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                            placeholder="nombre_usuario"
                          />
                        </div>
                        <div>
                          <Label htmlFor="password">Contraseña</Label>
                          <Input
                            id="password"
                            type="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            placeholder="contraseña"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="name">Nombre Completo</Label>
                        <Input
                          id="name"
                          value={newUser.name}
                          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                          placeholder="Nombre completo"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                          placeholder="email@ejemplo.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="role">Rol</Label>
                        <Select
                          value={newUser.role}
                          onValueChange={(value: any) => setNewUser({ ...newUser, role: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="administrador">Administrador</SelectItem>
                            <SelectItem value="profesor">Profesor</SelectItem>
                            <SelectItem value="auxiliar">Auxiliar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleAddUser}>Agregar Usuario</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userList.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.username}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.role === "administrador"
                                  ? "default"
                                  : user.role === "profesor"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteUser(user.id)}
                                disabled={user.role === "administrador"}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gestión de Estudiantes</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={generateStudentTemplate}>
                    <Download className="mr-2 h-4 w-4" />
                    Plantilla CSV
                  </Button>
                  <Button variant="outline" onClick={() => setIsImportDialogOpen(true)}>
                    <Upload className="mr-2 h-4 w-4" />
                    Importar
                  </Button>
                  <Button variant="outline" onClick={exportStudents}>
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombres</TableHead>
                        <TableHead>Apellidos</TableHead>
                        <TableHead>Aula</TableHead>
                        <TableHead>DNI</TableHead>
                        <TableHead>Padre/Madre</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentList.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.firstName}</TableCell>
                          <TableCell>{student.lastName}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {student.grade}° {student.section} - {student.classroom}
                            </Badge>
                          </TableCell>
                          <TableCell>{student.dni || "N/A"}</TableCell>
                          <TableCell>{student.parentName || "N/A"}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleDeleteStudent(student.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="classrooms" className="space-y-6">
              <h2 className="text-2xl font-bold">Gestión de Aulas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5].map((grade) => (
                  <Card key={grade}>
                    <CardHeader>
                      <CardTitle>{grade}° Grado</CardTitle>
                      <CardDescription>
                        {classrooms.filter((c) => c.grade === grade).length} aulas disponibles
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {classrooms
                          .filter((c) => c.grade === grade)
                          .map((classroom) => {
                            const studentsInClass = studentList.filter((s) => s.classroom === classroom.code).length
                            return (
                              <div key={classroom.code} className="flex justify-between items-center">
                                <span className="text-sm font-medium">{classroom.name}</span>
                                <Badge variant="secondary">
                                  {studentsInClass}/{classroom.capacity}
                                </Badge>
                              </div>
                            )
                          })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <h2 className="text-2xl font-bold">Reportes de Asistencia</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Generar Reportes</CardTitle>
                  <CardDescription>Exporta reportes de asistencia en diferentes formatos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button onClick={exportAttendance} variant="outline" className="h-20 flex-col bg-transparent">
                      <BarChart3 className="h-6 w-6 mb-2" />
                      Exportar Reporte Diario
                    </Button>
                    <Button onClick={exportAttendance} variant="outline" className="h-20 flex-col bg-transparent">
                      <FileSpreadsheet className="h-6 w-6 mb-2" />
                      Exportar Reporte Semanal
                    </Button>
                    <Button onClick={exportAttendance} variant="outline" className="h-20 flex-col bg-transparent">
                      <Download className="h-6 w-6 mb-2" />
                      Exportar Reporte Mensual
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <h2 className="text-2xl font-bold">Configuración del Sistema</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Configuraciones Generales</CardTitle>
                  <CardDescription>Ajusta las configuraciones del sistema de asistencia</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Horario de Clases</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Hora de inicio (7:15 AM)" />
                      <Input placeholder="Hora de fin (2:55 PM)" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Configuración de Asistencia</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="auto-absent" />
                        <Label htmlFor="auto-absent">Marcar automáticamente como ausente después de 15 minutos</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="notifications" />
                        <Label htmlFor="notifications">Enviar notificaciones a padres</Label>
                      </div>
                    </div>
                  </div>
                  <Button>Guardar Configuración</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <ImportDialog
          open={isImportDialogOpen}
          onOpenChange={setIsImportDialogOpen}
          onImportSuccess={handleImportSuccess}
        />
      </div>
    </AuthGuard>
  )
}
