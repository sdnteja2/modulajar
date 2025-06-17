"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, FileText, GraduationCap, CheckCircle, AlertCircle, Sparkles } from "lucide-react"
import { generatePDF } from "@/lib/pdf-generator"
import { generateDOCX } from "@/lib/docx-generator"
import { getModelPembelajaranSteps } from "@/lib/pembelajaran-steps"
import { getRubrikPenilaian } from "@/lib/rubrik-penilaian"
import { getCapaianPembelajaran, getFase } from "@/lib/capaian-pembelajaran"

interface ModulAjarData {
  namaSekolah: string
  kelas: string
  mataPelajaran: string
  topik: string
  alokasi: string
  tujuanPembelajaran: string
  modelPembelajaran: string
  metodePembelajaran: string
  strategiPembelajaran: string
  asesmen: string
  sumberBelajar: string
  kegiatanPembelajaran: string
  capaianPembelajaran: string
}

const modelPembelajaranOptions = [
  {
    value: "Problem Based Learning (PBL)",
    label: "Problem Based Learning (PBL)",
    description: "Pembelajaran berbasis masalah",
  },
  { value: "Project Based Learning", label: "Project Based Learning", description: "Pembelajaran berbasis proyek" },
  { value: "Discovery Learning", label: "Discovery Learning", description: "Pembelajaran penemuan" },
  { value: "Inquiry Learning", label: "Inquiry Learning", description: "Pembelajaran inkuiri" },
  { value: "Cooperative Learning", label: "Cooperative Learning", description: "Pembelajaran kooperatif" },
  {
    value: "Contextual Teaching Learning (CTL)",
    label: "Contextual Teaching Learning (CTL)",
    description: "Pembelajaran kontekstual",
  },
]

const metodePembelajaranOptions = [
  "Ceramah Interaktif",
  "Diskusi Kelompok",
  "Demonstrasi",
  "Eksperimen",
  "Observasi",
  "Presentasi",
  "Tanya Jawab",
  "Simulasi",
]

const strategiPembelajaranOptions = [
  "Think Pair Share",
  "Jigsaw",
  "Gallery Walk",
  "Mind Mapping",
  "Role Playing",
  "Brainstorming",
  "STAD (Student Teams Achievement Division)",
  "Numbered Heads Together",
]

const asesmenOptions = [
  "Asesmen Formatif - Observasi",
  "Asesmen Formatif - Kuis",
  "Asesmen Sumatif - Tes Tertulis",
  "Asesmen Sumatif - Proyek",
  "Asesmen Autentik - Portofolio",
  "Asesmen Peer - Penilaian Teman Sejawat",
  "Asesmen Kinerja - Praktik",
]

const alokasiWaktuOptions = [
  { value: "2 x 35 menit", label: "2 x 35 menit (70 menit)" },
  { value: "3 x 35 menit", label: "3 x 35 menit (105 menit)" },
  { value: "4 x 35 menit", label: "4 x 35 menit (140 menit)" },
  { value: "5 x 35 menit", label: "5 x 35 menit (175 menit)" },
  { value: "6 x 35 menit", label: "6 x 35 menit (210 menit)" },
  { value: "8 x 35 menit", label: "8 x 35 menit (280 menit)" },
]

const mataPelajaranOptions = [
  { value: "IPAS (Ilmu Pengetahuan Alam dan Sosial)", label: "IPAS" },
  { value: "Bahasa Indonesia", label: "Bahasa Indonesia" },
  { value: "Matematika", label: "Matematika" },
  { value: "Pendidikan Pancasila", label: "Pendidikan Pancasila" },
  { value: "Seni dan Budaya", label: "Seni dan Budaya" },
  { value: "Pendidikan Jasmani", label: "Pendidikan Jasmani" },
  { value: "Bahasa Inggris", label: "Bahasa Inggris" },
]

export default function ModulAjarGenerator() {
  const [formData, setFormData] = useState<ModulAjarData>({
    namaSekolah: "",
    kelas: "5",
    mataPelajaran: "IPAS (Ilmu Pengetahuan Alam dan Sosial)",
    topik: "",
    alokasi: "",
    tujuanPembelajaran: "",
    modelPembelajaran: "",
    metodePembelajaran: "",
    strategiPembelajaran: "",
    asesmen: "",
    sumberBelajar: "",
    kegiatanPembelajaran: "",
    capaianPembelajaran: "",
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [generatingFormat, setGeneratingFormat] = useState<string>("")

  const handleInputChange = (field: keyof ModulAjarData, value: string) => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        [field]: value,
      }

      // Auto-update CP when mata pelajaran or kelas changes
      if (field === "mataPelajaran" || field === "kelas") {
        const fase = getFase(field === "kelas" ? value : newData.kelas)
        const cp = getCapaianPembelajaran(field === "mataPelajaran" ? value : newData.mataPelajaran, fase)
        newData.capaianPembelajaran = cp
      }

      return newData
    })
  }

  const handleDownload = async (format: "pdf" | "docx") => {
    setIsGenerating(true)
    setGeneratingFormat(format.toUpperCase())
    try {
      if (format === "pdf") {
        await generatePDF(formData)
      } else {
        await generateDOCX(formData)
      }
    } catch (error) {
      console.error(`Error generating ${format.toUpperCase()}:`, error)
    } finally {
      setIsGenerating(false)
      setGeneratingFormat("")
    }
  }

  const requiredFields = [
    "namaSekolah",
    "topik",
    "alokasi",
    "tujuanPembelajaran",
    "modelPembelajaran",
    "metodePembelajaran",
    "strategiPembelajaran",
    "asesmen",
  ]
  const filledFields = requiredFields.filter((field) => formData[field as keyof ModulAjarData])
  const progress = (filledFields.length / requiredFields.length) * 100
  const isFormValid = progress === 100

  const currentFase = getFase(formData.kelas)

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <motion.div className="max-w-7xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <GraduationCap className="h-8 w-8 text-blue-600" />
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Generator Modul Ajar SD
            </h1>
            <Sparkles className="h-6 w-6 text-purple-500" />
          </div>
          <p className="text-gray-600 text-lg">Buat modul ajar yang sesuai dengan kurikulum merdeka untuk siswa SD</p>

          {/* Progress Bar */}
          <motion.div className="mt-6 max-w-md mx-auto" variants={itemVariants}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">Progress Pengisian:</span>
              <Badge variant={progress === 100 ? "default" : "secondary"}>{Math.round(progress)}%</Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Input */}
          <motion.div variants={itemVariants}>
            <Card className="h-fit shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Form Input Modul Ajar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {/* Informasi Dasar */}
                <motion.div className="space-y-4" variants={itemVariants}>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">Informasi Dasar</h3>
                    {formData.namaSekolah && formData.topik && formData.alokasi && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="namaSekolah">Nama Sekolah *</Label>
                    <Input
                      id="namaSekolah"
                      placeholder="Contoh: SD Negeri 1 Jakarta"
                      value={formData.namaSekolah}
                      onChange={(e) => handleInputChange("namaSekolah", e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="kelas">Kelas</Label>
                      <Select value={formData.kelas} onValueChange={(value) => handleInputChange("kelas", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6].map((kelas) => (
                            <SelectItem key={kelas} value={kelas.toString()}>
                              Kelas {kelas}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="text-xs text-gray-500">Fase {currentFase}</div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mataPelajaran">Mata Pelajaran</Label>
                      <Select
                        value={formData.mataPelajaran}
                        onValueChange={(value) => handleInputChange("mataPelajaran", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {mataPelajaranOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topik">Topik/Materi Pembelajaran *</Label>
                    <Input
                      id="topik"
                      placeholder="Contoh: Sistem Pencernaan Manusia"
                      value={formData.topik}
                      onChange={(e) => handleInputChange("topik", e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alokasi">Alokasi Waktu *</Label>
                    <Select value={formData.alokasi} onValueChange={(value) => handleInputChange("alokasi", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih alokasi waktu" />
                      </SelectTrigger>
                      <SelectContent>
                        {alokasiWaktuOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>

                <Separator />

                {/* Capaian Pembelajaran */}
                <motion.div className="space-y-4" variants={itemVariants}>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">Capaian Pembelajaran</h3>
                    <Badge variant="outline">Fase {currentFase}</Badge>
                    {formData.capaianPembelajaran && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </motion.div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capaianPembelajaran">Capaian Pembelajaran (CP)</Label>
                    <Textarea
                      id="capaianPembelajaran"
                      value={formData.capaianPembelajaran}
                      onChange={(e) => handleInputChange("capaianPembelajaran", e.target.value)}
                      rows={4}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="CP akan otomatis terisi berdasarkan mata pelajaran dan kelas yang dipilih"
                    />
                    <div className="text-xs text-gray-500">
                      CP otomatis disesuaikan dengan {formData.mataPelajaran} Fase {currentFase}
                    </div>
                  </div>
                </motion.div>

                <Separator />

                {/* Tujuan Pembelajaran */}
                <motion.div className="space-y-4" variants={itemVariants}>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">Tujuan Pembelajaran</h3>
                    {formData.tujuanPembelajaran && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </motion.div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tujuanPembelajaran">Tujuan Pembelajaran *</Label>
                    <Textarea
                      id="tujuanPembelajaran"
                      placeholder="Contoh: Siswa dapat menjelaskan fungsi organ pencernaan manusia dan menyebutkan cara menjaga kesehatan sistem pencernaan"
                      value={formData.tujuanPembelajaran}
                      onChange={(e) => handleInputChange("tujuanPembelajaran", e.target.value)}
                      rows={3}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </motion.div>

                <Separator />

                {/* Pilihan Pembelajaran */}
                <motion.div className="space-y-4" variants={itemVariants}>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">Metode & Strategi Pembelajaran</h3>
                    {formData.modelPembelajaran &&
                      formData.metodePembelajaran &&
                      formData.strategiPembelajaran &&
                      formData.asesmen && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </motion.div>
                      )}
                  </div>

                  <div className="space-y-2">
                    <Label>Model Pembelajaran *</Label>
                    <Select
                      value={formData.modelPembelajaran}
                      onValueChange={(value) => handleInputChange("modelPembelajaran", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih model pembelajaran" />
                      </SelectTrigger>
                      <SelectContent>
                        {modelPembelajaranOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div>
                              <div className="font-medium">{option.label}</div>
                              <div className="text-sm text-gray-500">{option.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Metode Pembelajaran *</Label>
                    <Select
                      value={formData.metodePembelajaran}
                      onValueChange={(value) => handleInputChange("metodePembelajaran", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih metode pembelajaran" />
                      </SelectTrigger>
                      <SelectContent>
                        {metodePembelajaranOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Strategi Pembelajaran *</Label>
                    <Select
                      value={formData.strategiPembelajaran}
                      onValueChange={(value) => handleInputChange("strategiPembelajaran", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih strategi pembelajaran" />
                      </SelectTrigger>
                      <SelectContent>
                        {strategiPembelajaranOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Jenis Asesmen *</Label>
                    <Select value={formData.asesmen} onValueChange={(value) => handleInputChange("asesmen", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis asesmen" />
                      </SelectTrigger>
                      <SelectContent>
                        {asesmenOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>

                <Separator />

                {/* Input Tambahan */}
                <motion.div className="space-y-4" variants={itemVariants}>
                  <h3 className="font-semibold text-lg">Informasi Tambahan</h3>

                  <div className="space-y-2">
                    <Label htmlFor="sumberBelajar">Sumber Belajar</Label>
                    <Textarea
                      id="sumberBelajar"
                      placeholder="Contoh: Buku siswa IPAS kelas 5, video pembelajaran, alat peraga sistem pencernaan"
                      value={formData.sumberBelajar}
                      onChange={(e) => handleInputChange("sumberBelajar", e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kegiatanPembelajaran">Kegiatan Pembelajaran Khusus</Label>
                    <Textarea
                      id="kegiatanPembelajaran"
                      placeholder="Contoh: Praktik mengamati model sistem pencernaan, diskusi kelompok tentang makanan sehat"
                      value={formData.kegiatanPembelajaran}
                      onChange={(e) => handleInputChange("kegiatanPembelajaran", e.target.value)}
                      rows={3}
                    />
                  </div>
                </motion.div>

                {/* Alert untuk form validation */}
                <AnimatePresence>
                  {!isFormValid && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Mohon lengkapi semua field yang bertanda (*) untuk dapat mendownload dokumen.
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preview Modul Ajar */}
          <motion.div variants={itemVariants}>
            <Card className="h-fit shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                <CardTitle>Preview Modul Ajar</CardTitle>
                <div className="flex items-center gap-2">
                  {/* Download Buttons */}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => handleDownload("pdf")}
                      disabled={!isFormValid || isGenerating}
                      className="flex items-center gap-2 bg-red-600 text-white hover:bg-red-700"
                      size="sm"
                    >
                      <Download className="h-4 w-4" />
                      {isGenerating && generatingFormat === "PDF" ? "Generating..." : "PDF"}
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => handleDownload("docx")}
                      disabled={!isFormValid || isGenerating}
                      className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
                      size="sm"
                    >
                      <Download className="h-4 w-4" />
                      {isGenerating && generatingFormat === "DOCX" ? "Generating..." : "DOCX"}
                    </Button>
                  </motion.div>

                  {/* Alternative: Dropdown Menu */}
                  {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          disabled={!isFormValid || isGenerating}
                          className="flex items-center gap-2 bg-white text-purple-600 hover:bg-gray-100"
                        >
                          <Download className="h-4 w-4" />
                          {isGenerating ? `Generating ${generatingFormat}...` : "Download"}
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDownload("pdf")} disabled={isGenerating}>
                        <FileText className="h-4 w-4 mr-2" />
                        Download PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDownload("docx")} disabled={isGenerating}>
                        <FileText className="h-4 w-4 mr-2" />
                        Download DOCX
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu> */}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <motion.div
                  id="modul-ajar-content"
                  className="space-y-6 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Header */}
                  <div className="text-center border-b pb-4">
                    <h2 className="text-xl font-bold mb-2">MODUL AJAR</h2>
                    <h3 className="text-lg font-semibold">{formData.namaSekolah || "[Nama Sekolah]"}</h3>
                  </div>

                  {/* Identitas Modul */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-base flex items-center gap-2">
                      IDENTITAS MODUL
                      <Badge variant="outline">Kurikulum Merdeka</Badge>
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Nama Sekolah: {formData.namaSekolah || "[Belum diisi]"}</div>
                      <div>Kelas: {formData.kelas}</div>
                      <div>Mata Pelajaran: {formData.mataPelajaran}</div>
                      <div>Fase: {currentFase}</div>
                      <div>Alokasi Waktu: {formData.alokasi || "[Belum dipilih]"}</div>
                    </div>
                    <div>Topik: {formData.topik || "[Belum diisi]"}</div>
                  </div>

                  {/* Capaian Pembelajaran */}
                  {formData.capaianPembelajaran && (
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h4 className="font-semibold text-base flex items-center gap-2">
                        CAPAIAN PEMBELAJARAN
                        <Badge variant="secondary">Fase {currentFase}</Badge>
                      </h4>
                      <p className="text-justify text-sm bg-blue-50 p-3 rounded-lg">{formData.capaianPembelajaran}</p>
                    </motion.div>
                  )}

                  {/* Tujuan Pembelajaran */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-base">TUJUAN PEMBELAJARAN</h4>
                    <p className="text-justify">{formData.tujuanPembelajaran || "[Belum diisi]"}</p>
                  </div>

                  {/* Model, Metode, Strategi */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-base">PENDEKATAN PEMBELAJARAN</h4>
                    <div className="space-y-1">
                      <div>
                        <strong>Model Pembelajaran:</strong> {formData.modelPembelajaran || "[Belum dipilih]"}
                      </div>
                      <div>
                        <strong>Metode Pembelajaran:</strong> {formData.metodePembelajaran || "[Belum dipilih]"}
                      </div>
                      <div>
                        <strong>Strategi Pembelajaran:</strong> {formData.strategiPembelajaran || "[Belum dipilih]"}
                      </div>
                    </div>
                  </div>

                  {/* Langkah Pembelajaran dengan Sintaks Model */}
                  <AnimatePresence>
                    {formData.modelPembelajaran && (
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4 className="font-semibold text-base flex items-center gap-2">
                          LANGKAH PEMBELAJARAN
                          <Badge variant="secondary">{formData.modelPembelajaran}</Badge>
                        </h4>
                        <div className="space-y-3">
                          {getModelPembelajaranSteps(
                            formData.modelPembelajaran,
                            formData.topik,
                            formData.metodePembelajaran,
                            formData.strategiPembelajaran,
                            formData.kegiatanPembelajaran,
                          ).map((step, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div>
                                <strong>{step.title}</strong>
                                <ul className="list-disc list-inside ml-4 mt-1">
                                  {step.activities.map((activity, actIndex) => (
                                    <li key={actIndex}>{activity}</li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Asesmen */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-base">ASESMEN</h4>
                    <p>
                      <strong>Jenis Asesmen:</strong> {formData.asesmen || "[Belum dipilih]"}
                    </p>
                    <p>Asesmen dilakukan untuk mengukur pencapaian tujuan pembelajaran yang telah ditetapkan.</p>
                  </div>

                  {/* Rubrik Penilaian */}
                  <AnimatePresence>
                    {formData.asesmen && (
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4 className="font-semibold text-base flex items-center gap-2">
                          RUBRIK PENILAIAN
                          <Badge variant="secondary">{formData.asesmen}</Badge>
                        </h4>
                        <div className="space-y-3">
                          {getRubrikPenilaian(formData.asesmen).map((rubrik, index) => (
                            <motion.div
                              key={index}
                              className="border rounded-lg p-3 bg-gray-50"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <h5 className="font-medium text-sm mb-2">{rubrik.kriteria}</h5>
                              <div className="grid grid-cols-4 gap-2 text-xs">
                                {rubrik.skala.map((skala, skalaIndex) => (
                                  <div key={skalaIndex} className="text-center">
                                    <div className="font-medium mb-1">{skala.nilai}</div>
                                    <div className="text-gray-600">{skala.deskriptor}</div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Sumber Belajar */}
                  {formData.sumberBelajar && (
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h4 className="font-semibold text-base">SUMBER BELAJAR</h4>
                      <p>{formData.sumberBelajar}</p>
                    </motion.div>
                  )}

                  {/* Footer */}
                  <div className="text-center pt-4 border-t">
                    <p className="text-xs text-gray-500">Modul Ajar dibuat oleh nnarr07 - permadi.dev</p>
                    <Badge variant="outline" className="mt-2">
                      Kurikulum Merdeka
                    </Badge>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
