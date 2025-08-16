"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileSpreadsheet, Download, CheckCircle, XCircle } from "lucide-react"
import {
  importStudentsFromCSV,
  generateStudentCSVTemplate,
  generateStudentExcelTemplate,
  downloadFile,
  type ImportResult,
} from "@/lib/import-export"

interface ImportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onImportSuccess: (students: any[]) => void
}

export default function ImportDialog({ open, onOpenChange, onImportSuccess }: ImportDialogProps) {
  const [file, setFile] = useState<File | null>(null)
  const [importing, setImporting] = useState(false)
  const [importResult, setImportResult] = useState<ImportResult | null>(null)
  const [progress, setProgress] = useState(0)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setImportResult(null)
    }
  }

  const handleImport = async () => {
    if (!file) return

    setImporting(true)
    setProgress(0)

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90))
      }, 100)

      const fileContent = await file.text()
      const result = importStudentsFromCSV(fileContent)

      clearInterval(progressInterval)
      setProgress(100)

      setImportResult(result)

      if (result.success && result.data) {
        setTimeout(() => {
          onImportSuccess(result.data!)
          onOpenChange(false)
          resetDialog()
        }, 1000)
      }
    } catch (error) {
      setImportResult({
        success: false,
        errors: [`Error al procesar el archivo: ${error instanceof Error ? error.message : "Error desconocido"}`],
      })
    } finally {
      setImporting(false)
    }
  }

  const resetDialog = () => {
    setFile(null)
    setImporting(false)
    setImportResult(null)
    setProgress(0)
  }

  const downloadCSVTemplate = () => {
    const template = generateStudentCSVTemplate()
    downloadFile(template, "plantilla_estudiantes.csv", "text/csv")
  }

  const downloadExcelTemplate = () => {
    const template = generateStudentExcelTemplate()
    downloadFile(
      template,
      "plantilla_estudiantes.xlsx",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Importar Estudiantes</DialogTitle>
          <DialogDescription>
            Importa estudiantes desde archivos CSV o Excel usando nuestras plantillas
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="import" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="import">Importar Archivo</TabsTrigger>
            <TabsTrigger value="templates">Descargar Plantillas</TabsTrigger>
          </TabsList>

          <TabsContent value="import" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="file">Seleccionar archivo CSV o Excel</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                  disabled={importing}
                />
                {file && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Archivo seleccionado: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>

              {importing && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Upload className="h-4 w-4 animate-pulse" />
                    <span className="text-sm">Procesando archivo...</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              )}

              {importResult && (
                <div className="space-y-2">
                  {importResult.success ? (
                    <Alert className="border-green-500">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-700">
                        ¡Importación exitosa! Se importaron {importResult.data?.length} estudiantes.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert variant="destructive">
                      <XCircle className="h-4 w-4" />
                      <AlertDescription>Error en la importación. Revisa los errores a continuación.</AlertDescription>
                    </Alert>
                  )}

                  {importResult.errors && importResult.errors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <h4 className="font-medium text-red-800 mb-2">Errores encontrados:</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        {importResult.errors.map((error, index) => (
                          <li key={index}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {importResult.warnings && importResult.warnings.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <h4 className="font-medium text-yellow-800 mb-2">Advertencias:</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        {importResult.warnings.map((warning, index) => (
                          <li key={index}>• {warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleImport} disabled={!file || importing}>
                  {importing ? "Importando..." : "Importar Estudiantes"}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Descarga las plantillas para llenar los datos de los estudiantes correctamente.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <FileSpreadsheet className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium">Plantilla CSV</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Formato de texto separado por comas, compatible con Excel y Google Sheets.
                  </p>
                  <Button onClick={downloadCSVTemplate} variant="outline" className="w-full bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar CSV
                  </Button>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <FileSpreadsheet className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium">Plantilla Excel</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Formato Excel nativo con validaciones y formato mejorado.
                  </p>
                  <Button onClick={downloadExcelTemplate} variant="outline" className="w-full bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar Excel
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Instrucciones:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Descarga la plantilla de tu preferencia</li>
                  <li>• Llena los datos de los estudiantes en las columnas correspondientes</li>
                  <li>• Los campos obligatorios son: Nombres, Apellidos y Aula</li>
                  <li>• El código de aula debe coincidir con las aulas existentes (100-506)</li>
                  <li>• Guarda el archivo y súbelo usando la pestaña "Importar Archivo"</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
