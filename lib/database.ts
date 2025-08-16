export interface User {
  id: number
  username: string
  password: string
  role: "administrador" | "profesor" | "auxiliar"
  name: string
  email: string
  assignedClassrooms?: string[]
}

export interface Student {
  id: number
  firstName: string
  lastName: string
  classroom: string
  grade: number
  section: string
}

export interface Classroom {
  code: string
  grade: number
  section: string
  name: string
  capacity: number
}

export interface Attendance {
  id: number
  studentId: number
  date: string
  status: "presente" | "ausente" | "tardanza" | "justificado"
  classroom: string
  registeredBy: number
  registeredAt: string
  notes?: string
}

// Predefined users
export const users: User[] = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    role: "administrador",
    name: "Administrador del Sistema",
    email: "admin@joaquincapelo.edu.pe",
  },
  {
    id: 2,
    username: "profesor1",
    password: "prof123",
    role: "profesor",
    name: "María González",
    email: "maria.gonzalez@joaquincapelo.edu.pe",
  },
  {
    id: 3,
    username: "profesor2",
    password: "prof123",
    role: "profesor",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@joaquincapelo.edu.pe",
  },
  {
    id: 4,
    username: "auxiliar1",
    password: "aux123",
    role: "auxiliar",
    name: "Ana Rodríguez",
    email: "ana.rodriguez@joaquincapelo.edu.pe",
    assignedClassrooms: ["100", "101", "102", "103"],
  },
  {
    id: 5,
    username: "auxiliar2",
    password: "aux123",
    role: "auxiliar",
    name: "Luis Pérez",
    email: "luis.perez@joaquincapelo.edu.pe",
    assignedClassrooms: ["104", "105", "106", "107"],
  },
  {
    id: 6,
    username: "auxiliar3",
    password: "aux123",
    role: "auxiliar",
    name: "Carmen Silva",
    email: "carmen.silva@joaquincapelo.edu.pe",
    assignedClassrooms: ["200", "201", "202", "203"],
  },
]

// School classroom structure (39 classrooms total)
export const classrooms: Classroom[] = [
  // 1er grado (8 secciones: 100-107)
  { code: "100", grade: 1, section: "A", name: "1° A - 100", capacity: 30 },
  { code: "101", grade: 1, section: "B", name: "1° B - 101", capacity: 30 },
  { code: "102", grade: 1, section: "C", name: "1° C - 102", capacity: 30 },
  { code: "103", grade: 1, section: "D", name: "1° D - 103", capacity: 30 },
  { code: "104", grade: 1, section: "E", name: "1° E - 104", capacity: 30 },
  { code: "105", grade: 1, section: "F", name: "1° F - 105", capacity: 30 },
  { code: "106", grade: 1, section: "G", name: "1° G - 106", capacity: 30 },
  { code: "107", grade: 1, section: "H", name: "1° H - 107", capacity: 30 },

  { code: "200", grade: 2, section: "A", name: "2° A - 200", capacity: 30 },
  { code: "201", grade: 2, section: "B", name: "2° B - 201", capacity: 30 },
  { code: "202", grade: 2, section: "C", name: "2° C - 202", capacity: 30 },
  { code: "203", grade: 2, section: "D", name: "2° D - 203", capacity: 30 },
  { code: "204", grade: 2, section: "E", name: "2° E - 204", capacity: 30 },
  { code: "205", grade: 2, section: "F", name: "2° F - 205", capacity: 30 },
  { code: "206", grade: 2, section: "G", name: "2° G - 206", capacity: 30 },

  // 3er grado (8 secciones: 300-307)
  { code: "300", grade: 3, section: "A", name: "3° A - 300", capacity: 30 },
  { code: "301", grade: 3, section: "B", name: "3° B - 301", capacity: 30 },
  { code: "302", grade: 3, section: "C", name: "3° C - 302", capacity: 30 },
  { code: "303", grade: 3, section: "D", name: "3° D - 303", capacity: 30 },
  { code: "304", grade: 3, section: "E", name: "3° E - 304", capacity: 30 },
  { code: "305", grade: 3, section: "F", name: "3° F - 305", capacity: 30 },
  { code: "306", grade: 3, section: "G", name: "3° G - 306", capacity: 30 },
  { code: "307", grade: 3, section: "H", name: "3° H - 307", capacity: 30 },

  // 4to grado (8 secciones: 400-407)
  { code: "400", grade: 4, section: "A", name: "4° A - 400", capacity: 30 },
  { code: "401", grade: 4, section: "B", name: "4° B - 401", capacity: 30 },
  { code: "402", grade: 4, section: "C", name: "4° C - 402", capacity: 30 },
  { code: "403", grade: 4, section: "D", name: "4° D - 403", capacity: 30 },
  { code: "404", grade: 4, section: "E", name: "4° E - 404", capacity: 30 },
  { code: "405", grade: 4, section: "F", name: "4° F - 405", capacity: 30 },
  { code: "406", grade: 4, section: "G", name: "4° G - 406", capacity: 30 },
  { code: "407", grade: 4, section: "H", name: "4° H - 407", capacity: 30 },

  { code: "500", grade: 5, section: "A", name: "5° A - 500", capacity: 30 },
  { code: "501", grade: 5, section: "B", name: "5° B - 501", capacity: 30 },
  { code: "502", grade: 5, section: "C", name: "5° C - 502", capacity: 30 },
  { code: "503", grade: 5, section: "D", name: "5° D - 503", capacity: 30 },
  { code: "504", grade: 5, section: "E", name: "5° E - 504", capacity: 30 },
  { code: "505", grade: 5, section: "F", name: "5° F - 505", capacity: 30 },
  { code: "506", grade: 5, section: "G", name: "5° G - 506", capacity: 30 },
  { code: "507", grade: 5, section: "H", name: "5° H - 507", capacity: 30 },
]

// Sample students data
export const students: Student[] = [
  // Sample students for classroom 100 (1° A)
  {
    id: 1,
    firstName: "Juan",
    lastName: "Pérez García",
    classroom: "100",
    grade: 1,
    section: "A",
  },
  {
    id: 2,
    firstName: "Ana",
    lastName: "López Mendoza",
    classroom: "100",
    grade: 1,
    section: "A",
  },
  {
    id: 3,
    firstName: "Luis",
    lastName: "Rodríguez Silva",
    classroom: "100",
    grade: 1,
    section: "A",
  },
  {
    id: 4,
    firstName: "María",
    lastName: "González Torres",
    classroom: "101",
    grade: 1,
    section: "B",
  },
  {
    id: 5,
    firstName: "Carlos",
    lastName: "Mendoza Ruiz",
    classroom: "101",
    grade: 1,
    section: "B",
  },
  {
    id: 6,
    firstName: "Rosa",
    lastName: "Silva Vargas",
    classroom: "200",
    grade: 2,
    section: "A",
  },
  {
    id: 7,
    firstName: "Pedro",
    lastName: "Ramírez Castro",
    classroom: "200",
    grade: 2,
    section: "A",
  },
  {
    id: 8,
    firstName: "Carmen",
    lastName: "Flores Díaz",
    classroom: "300",
    grade: 3,
    section: "A",
  },
  {
    id: 9,
    firstName: "Miguel",
    lastName: "Torres Herrera",
    classroom: "400",
    grade: 4,
    section: "A",
  },
  {
    id: 10,
    firstName: "Elena",
    lastName: "Vásquez Morales",
    classroom: "500",
    grade: 5,
    section: "A",
  },
]

// Mock attendance data
export const attendanceRecords: Attendance[] = []

// Helper functions
export const getCurrentUser = (): User | null => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("currentUser")
    return userData ? JSON.parse(userData) : null
  }
  return null
}

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("currentUser")
  }
}

export const getClassroomsByGrade = (grade: number): Classroom[] => {
  return classrooms.filter((c) => c.grade === grade)
}

export const getStudentsByClassroom = (classroomCode: string): Student[] => {
  return students.filter((s) => s.classroom === classroomCode)
}
