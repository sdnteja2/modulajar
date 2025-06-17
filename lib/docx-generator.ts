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

export const generateDOCX = async (data: ModulAjarData) => {
  // Import docx dynamically to avoid SSR issues
  const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType } =
    await import("docx")

  const currentFase = getFase(data.kelas)

  // Create document
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title
          new Paragraph({
            children: [
              new TextRun({
                text: "MODUL AJAR",
                bold: true,
                size: 32,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: data.namaSekolah,
                bold: true,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Kurikulum Merdeka",
                size: 20,
                italics: true,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          // Identitas Modul
          new Paragraph({
            children: [
              new TextRun({
                text: "IDENTITAS MODUL",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
          }),

          new Paragraph({
            children: [new TextRun({ text: "Nama Sekolah: ", bold: true }), new TextRun({ text: data.namaSekolah })],
            spacing: { after: 100 },
          }),

          new Paragraph({
            children: [new TextRun({ text: "Kelas: ", bold: true }), new TextRun({ text: data.kelas })],
            spacing: { after: 100 },
          }),

          new Paragraph({
            children: [
              new TextRun({ text: "Mata Pelajaran: ", bold: true }),
              new TextRun({ text: data.mataPelajaran }),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            children: [new TextRun({ text: "Fase: ", bold: true }), new TextRun({ text: currentFase })],
            spacing: { after: 100 },
          }),

          new Paragraph({
            children: [new TextRun({ text: "Topik: ", bold: true }), new TextRun({ text: data.topik })],
            spacing: { after: 100 },
          }),

          new Paragraph({
            children: [new TextRun({ text: "Alokasi Waktu: ", bold: true }), new TextRun({ text: data.alokasi })],
            spacing: { after: 300 },
          }),

          // Capaian Pembelajaran
          ...(data.capaianPembelajaran
            ? [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `CAPAIAN PEMBELAJARAN (Fase ${currentFase})`,
                      bold: true,
                      size: 24,
                    }),
                  ],
                  heading: HeadingLevel.HEADING_1,
                  spacing: { before: 200, after: 200 },
                }),

                new Paragraph({
                  children: [new TextRun({ text: data.capaianPembelajaran })],
                  alignment: AlignmentType.JUSTIFIED,
                  spacing: { after: 300 },
                }),
              ]
            : []),

          // Tujuan Pembelajaran
          new Paragraph({
            children: [
              new TextRun({
                text: "TUJUAN PEMBELAJARAN",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
          }),

          new Paragraph({
            children: [new TextRun({ text: data.tujuanPembelajaran })],
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 300 },
          }),

          // Pendekatan Pembelajaran
          new Paragraph({
            children: [
              new TextRun({
                text: "PENDEKATAN PEMBELAJARAN",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
          }),

          new Paragraph({
            children: [
              new TextRun({ text: "Model Pembelajaran: ", bold: true }),
              new TextRun({ text: data.modelPembelajaran }),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            children: [
              new TextRun({ text: "Metode Pembelajaran: ", bold: true }),
              new TextRun({ text: data.metodePembelajaran }),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            children: [
              new TextRun({ text: "Strategi Pembelajaran: ", bold: true }),
              new TextRun({ text: data.strategiPembelajaran }),
            ],
            spacing: { after: 300 },
          }),

          // Langkah Pembelajaran
          new Paragraph({
            children: [
              new TextRun({
                text: `LANGKAH PEMBELAJARAN (Sintaks ${data.modelPembelajaran})`,
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
          }),

          // Add learning steps
          ...getModelPembelajaranSteps(
            data.modelPembelajaran,
            data.topik,
            data.metodePembelajaran,
            data.strategiPembelajaran,
            data.kegiatanPembelajaran,
          ).flatMap((step) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: step.title,
                  bold: true,
                  size: 22,
                }),
              ],
              spacing: { before: 200, after: 100 },
            }),
            ...step.activities.map(
              (activity) =>
                new Paragraph({
                  children: [new TextRun({ text: "• " }), new TextRun({ text: activity })],
                  spacing: { after: 50 },
                }),
            ),
          ]),

          // Asesmen
          new Paragraph({
            children: [
              new TextRun({
                text: "ASESMEN",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),

          new Paragraph({
            children: [new TextRun({ text: "Jenis Asesmen: ", bold: true }), new TextRun({ text: data.asesmen })],
            spacing: { after: 100 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Asesmen dilakukan untuk mengukur pencapaian tujuan pembelajaran yang telah ditetapkan.",
              }),
            ],
            spacing: { after: 300 },
          }),

          // Rubrik Penilaian
          new Paragraph({
            children: [
              new TextRun({
                text: `RUBRIK PENILAIAN (${data.asesmen})`,
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
          }),

          // Add rubrik as table
          ...getRubrikPenilaian(data.asesmen).map((rubrik, index) => {
            const tableRows = [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: `${index + 1}. ${rubrik.kriteria}`,
                            bold: true,
                          }),
                        ],
                      }),
                    ],
                    columnSpan: 4,
                  }),
                ],
              }),
              new TableRow({
                children: rubrik.skala.map(
                  (skala) =>
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: skala.nilai,
                              bold: true,
                            }),
                          ],
                          alignment: AlignmentType.CENTER,
                        }),
                        new Paragraph({
                          children: [new TextRun({ text: skala.deskriptor })],
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                      width: { size: 25, type: WidthType.PERCENTAGE },
                    }),
                ),
              }),
            ]

            return new Table({
              rows: tableRows,
              width: { size: 100, type: WidthType.PERCENTAGE },
            })
          }),

          // Sumber Belajar
          ...(data.sumberBelajar
            ? [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "SUMBER BELAJAR",
                      bold: true,
                      size: 24,
                    }),
                  ],
                  heading: HeadingLevel.HEADING_1,
                  spacing: { before: 400, after: 200 },
                }),

                new Paragraph({
                  children: [new TextRun({ text: data.sumberBelajar })],
                  alignment: AlignmentType.JUSTIFIED,
                  spacing: { after: 300 },
                }),
              ]
            : []),

          // Footer
          new Paragraph({
            children: [
              new TextRun({
                text: "Modul Ajar dibuat oleh narr07 - permadi.dev | Kurikulum Merdeka",
                italics: true,
                size: 16,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 400 },
          }),
        ],
      },
    ],
  })

  // Generate and download
  const blob = await Packer.toBlob(doc)
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `Modul_Ajar_${data.mataPelajaran.replace(/\s+/g, "_")}_Kelas_${data.kelas}_${data.topik.replace(/\s+/g, "_")}.docx`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
