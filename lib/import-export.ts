import { type Student, classrooms } from "./database"

export interface ImportResult {
  success: boolean
  data?: Student[]
  errors?: string[]
  warnings?: string[]
}

export interface ExportData {
  students: Student[]
  attendance?: any[]
  metadata: {
    exportDate: string
    exportedBy: string
    totalRecords: number
  }
}

// CSV Template generation
export const generateStudentCSVTemplate = (): string => {
  const headers = ["Nombres", "Apellidos", "Aula (Código)"]

  const sampleData = ["Juan Carlos", "Pérez García", "100"]

  return [headers.join(","), sampleData.join(",")].join("\n")
}

// Excel template generation (simulated)
export const generateStudentExcelTemplate = (): Blob => {
  const headers = ["Nombres", "Apellidos", "Aula (Código)"]
  const sampleData = ["Juan Carlos", "Pérez García", "100"]

  // Create Excel-like CSV with proper formatting
  const csvContent = [
    headers.join(","),
    sampleData.join(","),
    // Add empty rows for users to fill
    ",,",
    ",,",
    ",,",
  ].join("\n")

  return new Blob([csvContent], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })
}

// CSV Parser
export const parseCSV = (csvContent: string): string[][] => {
  const lines = csvContent.trim().split("\n")
  return lines.map((line) => {
    const result = []
    let current = ""
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]

      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === "," && !inQuotes) {
        result.push(current.trim())
        current = ""
      } else {
        current += char
      }
    }

    result.push(current.trim())
    return result
  })
}

// Validate student data
export const validateStudentData = (data: any[]): ImportResult => {
  const errors: string[] = []
  const warnings: string[] = []
  const validStudents: Student[] = []

  if (data.length < 2) {
    return {
      success: false,
      errors: ["El archivo debe contener al menos una fila de datos además de los encabezados"],
    }
  }

  const dataRows = data.slice(1)

  dataRows.forEach((row, index) => {
    const rowNumber = index + 2

    if (row.length < 3) {
      errors.push(`Fila ${rowNumber}: Faltan datos obligatorios`)
      return
    }

    const [firstName, lastName, classroomCode] = row

    if (!firstName?.trim()) {
      errors.push(`Fila ${rowNumber}: El nombre es obligatorio`)
      return
    }

    if (!lastName?.trim()) {
      errors.push(`Fila ${rowNumber}: El apellido es obligatorio`)
      return
    }

    if (!classroomCode?.trim()) {
      errors.push(`Fila ${rowNumber}: El código de aula es obligatorio`)
      return
    }

    const classroom = classrooms.find((c) => c.code === classroomCode.trim())
    if (!classroom) {
      errors.push(`Fila ${rowNumber}: El aula "${classroomCode}" no existe`)
      return
    }

    const student: Student = {
      id: Date.now() + Math.random(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      classroom: classroomCode.trim(),
      grade: classroom.grade,
      section: classroom.section,
    }

    validStudents.push(student)
  })

  return {
    success: errors.length === 0,
    data: validStudents,
    errors: errors.length > 0 ? errors : undefined,
    warnings: warnings.length > 0 ? warnings : undefined,
  }
}

// Import students from CSV
export const importStudentsFromCSV = (csvContent: string): ImportResult => {
  try {
    const parsedData = parseCSV(csvContent)
    return validateStudentData(parsedData)
  } catch (error) {
    return {
      success: false,
      errors: [`Error al procesar el archivo: ${error instanceof Error ? error.message : "Error desconocido"}`],
    }
  }
}

// Export students to CSV
export const exportStudentsToCSV = (students: Student[]): string => {
  const headers = [
    "ID",
    "Nombres",
    "Apellidos",
    "Grado",
    "Sección",
    "Aula",
    "DNI",
    "Nombre del Padre/Madre",
    "Teléfono",
    "Fecha de Nacimiento",
  ]

  const rows = students.map((student) => [
    student.id.toString(),
    student.firstName,
    student.lastName,
    student.grade.toString(),
    student.section,
    student.classroom,
    student.dni || "",
    student.parentName || "",
    student.parentPhone || "",
    student.birthDate || "",
  ])

  const csvContent = [headers, ...rows].map((row) => row.map((field) => `"${field}"`).join(",")).join("\n")

  return csvContent
}

// Export students to Excel
export const exportStudentsToExcel = (students: Student[]): Blob => {
  const headers = ["ID", "Nombres", "Apellidos", "Grado", "Sección", "Aula"]

  const rows = students.map((student) => [
    student.id.toString(),
    student.firstName,
    student.lastName,
    student.grade.toString(),
    student.section,
    student.classroom,
  ])

  const csvContent = [headers, ...rows].map((row) => row.map((field) => `"${field}"`).join(",")).join("\n")

  return new Blob([csvContent], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })
}

// Export attendance report
export const exportAttendanceReport = (
  students: Student[],
  attendanceData: any[],
  dateRange: { from: Date; to: Date },
): string => {
  const headers = ["Fecha", "Estudiante", "Grado", "Sección", "Aula", "Estado", "Observaciones"]

  // Mock attendance data for demonstration
  const rows: string[][] = []

  students.forEach((student) => {
    // Generate sample attendance for each student
    const statuses = ["presente", "ausente", "tardanza", "justificado"]
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

    rows.push([
      new Date().toLocaleDateString("es-PE"),
      `${student.firstName} ${student.lastName}`,
      student.grade.toString(),
      student.section,
      student.classroom,
      randomStatus,
      randomStatus === "ausente" ? "Sin justificación" : "",
    ])
  })

  const csvContent = [headers, ...rows].map((row) => row.map((field) => `"${field}"`).join(",")).join("\n")

  return csvContent
}

// Export attendance report to Excel
export const exportAttendanceReportExcel = (
  students: Student[],
  attendanceData: any[],
  dateRange: { from: Date; to: Date },
): Blob => {
  const headers = ["Fecha", "Estudiante", "Grado", "Sección", "Aula", "Estado", "Observaciones"]

  const rows: string[][] = []

  students.forEach((student) => {
    const statuses = ["presente", "ausente", "tardanza", "justificado"]
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

    rows.push([
      new Date().toLocaleDateString("es-PE"),
      `${student.firstName} ${student.lastName}`,
      student.grade.toString(),
      student.section,
      student.classroom,
      randomStatus,
      randomStatus === "ausente" ? "Sin justificación" : "",
    ])
  })

  const csvContent = [headers, ...rows].map((row) => row.map((field) => `"${field}"`).join(",")).join("\n")

  return new Blob([csvContent], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })
}

// Download file helper
export const downloadFile = (content: string | Blob, filename: string, mimeType = "text/csv") => {
  const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}

// Generate comprehensive report
export const generateComprehensiveReport = (
  students: Student[],
  attendanceData: any[],
  reportType: "daily" | "weekly" | "monthly",
): ExportData => {
  return {
    students,
    attendance: attendanceData,
    metadata: {
      exportDate: new Date().toISOString(),
      exportedBy: "Sistema de Asistencia",
      totalRecords: students.length,
    },
  }
}
