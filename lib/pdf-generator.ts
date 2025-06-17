import { getModelPembelajaranSteps } from "./pembelajaran-steps"
import { getRubrikPenilaian } from "./rubrik-penilaian"
import { getFase } from "./capaian-pembelajaran"

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

export const generatePDF = async (data: ModulAjarData) => {
  // Import jsPDF dynamically to avoid SSR issues
  const { jsPDF } = await import("jspdf")

  const doc = new jsPDF()
  const currentFase = getFase(data.kelas)

  // Set font
  doc.setFont("helvetica")

  // Title
  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.text("MODUL AJAR", 105, 20, { align: "center" })

  doc.setFontSize(14)
  doc.text(data.namaSekolah, 105, 30, { align: "center" })

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text("Kurikulum Merdeka", 105, 38, { align: "center" })

  // Content
  let yPosition = 55
  const lineHeight = 6
  const margin = 20

  // Helper function to add text with word wrap
  const addText = (text: string, fontSize = 10, isBold = false) => {
    doc.setFontSize(fontSize)
    doc.setFont("helvetica", isBold ? "bold" : "normal")

    const splitText = doc.splitTextToSize(text, 170)
    doc.text(splitText, margin, yPosition)
    yPosition += splitText.length * lineHeight + 2
  }

  // Helper function to check if new page is needed
  const checkNewPage = () => {
    if (yPosition > 270) {
      doc.addPage()
      yPosition = 20
    }
  }

  // Add sections
  addText("IDENTITAS MODUL", 12, true)
  yPosition += 3

  addText(`Nama Sekolah: ${data.namaSekolah}`)
  addText(`Kelas: ${data.kelas}`)
  addText(`Mata Pelajaran: ${data.mataPelajaran}`)
  addText(`Fase: ${currentFase}`)
  addText(`Topik: ${data.topik}`)
  addText(`Alokasi Waktu: ${data.alokasi}`)
  yPosition += 8

  checkNewPage()

  // Capaian Pembelajaran
  if (data.capaianPembelajaran) {
    addText("CAPAIAN PEMBELAJARAN", 12, true)
    addText(`(Fase ${currentFase})`, 10, true)
    yPosition += 3
    addText(data.capaianPembelajaran)
    yPosition += 8
  }

  checkNewPage()

  addText("TUJUAN PEMBELAJARAN", 12, true)
  yPosition += 3
  addText(data.tujuanPembelajaran)
  yPosition += 8

  checkNewPage()

  addText("PENDEKATAN PEMBELAJARAN", 12, true)
  yPosition += 3
  addText(`Model Pembelajaran: ${data.modelPembelajaran}`)
  addText(`Metode Pembelajaran: ${data.metodePembelajaran}`)
  addText(`Strategi Pembelajaran: ${data.strategiPembelajaran}`)
  yPosition += 8

  checkNewPage()

  // Langkah pembelajaran dengan sintaks model
  addText("LANGKAH PEMBELAJARAN", 12, true)
  addText(`(Sintaks ${data.modelPembelajaran})`, 10, true)
  yPosition += 3

  const steps = getModelPembelajaranSteps(
    data.modelPembelajaran,
    data.topik,
    data.metodePembelajaran,
    data.strategiPembelajaran,
    data.kegiatanPembelajaran,
  )

  steps.forEach((step) => {
    checkNewPage()

    addText(step.title, 11, true)
    step.activities.forEach((activity) => {
      addText(`• ${activity}`, 10)
    })
    yPosition += 5
  })

  checkNewPage()

  addText("ASESMEN", 12, true)
  yPosition += 3
  addText(`Jenis Asesmen: ${data.asesmen}`)
  addText("Asesmen dilakukan untuk mengukur pencapaian tujuan pembelajaran yang telah ditetapkan.")
  yPosition += 8

  checkNewPage()

  addText("RUBRIK PENILAIAN", 12, true)
  addText(`(${data.asesmen})`, 10, true)
  yPosition += 3

  const rubrikList = getRubrikPenilaian(data.asesmen)

  rubrikList.forEach((rubrik, index) => {
    checkNewPage()

    addText(`${index + 1}. ${rubrik.kriteria}`, 11, true)
    yPosition += 2

    rubrik.skala.forEach((skala) => {
      addText(`• ${skala.nilai}: ${skala.deskriptor}`, 9)
    })
    yPosition += 3
  })

  yPosition += 5

  if (data.sumberBelajar) {
    checkNewPage()
    addText("SUMBER BELAJAR", 12, true)
    yPosition += 3
    addText(data.sumberBelajar)
    yPosition += 8
  }

  // Footer
  checkNewPage()
  doc.setFontSize(8)
  doc.setFont("helvetica", "italic")
  doc.text("Modul Ajar dibuat oleh narr07 - permadi.dev | Kurikulum Merdeka", 105, yPosition + 10, {
    align: "center",
  })

  // Save the PDF
  const fileName = `Modul_Ajar_${data.mataPelajaran.replace(/\s+/g, "_")}_Kelas_${data.kelas}_${data.topik.replace(/\s+/g, "_")}.pdf`
  doc.save(fileName)
}
