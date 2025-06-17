interface SkalaRubrik {
  nilai: string
  deskriptor: string
}

interface RubrikPenilaian {
  kriteria: string
  skala: SkalaRubrik[]
}

export const getRubrikPenilaian = (jenisAsesmen: string): RubrikPenilaian[] => {
  switch (jenisAsesmen) {
    case "Asesmen Formatif - Observasi":
      return [
        {
          kriteria: "Partisipasi dalam Pembelajaran",
          skala: [
            { nilai: "4 (Sangat Baik)", deskriptor: "Selalu aktif bertanya, menjawab, dan berdiskusi" },
            { nilai: "3 (Baik)", deskriptor: "Sering aktif bertanya, menjawab, dan berdiskusi" },
            { nilai: "2 (Cukup)", deskriptor: "Kadang-kadang aktif dalam pembelajaran" },
            { nilai: "1 (Kurang)", deskriptor: "Jarang atau tidak pernah aktif dalam pembelajaran" },
          ],
        },
        {
          kriteria: "Kerjasama dalam Kelompok",
          skala: [
            { nilai: "4 (Sangat Baik)", deskriptor: "Selalu bekerja sama dengan baik dan membantu teman" },
            { nilai: "3 (Baik)", deskriptor: "Sering bekerja sama dengan baik" },
            { nilai: "2 (Cukup)", deskriptor: "Kadang-kadang bekerja sama dalam kelompok" },
            { nilai: "1 (Kurang)", deskriptor: "Sulit bekerja sama dalam kelompok" },
          ],
        },
        {
          kriteria: "Pemahaman Konsep",
          skala: [
            { nilai: "4 (Sangat Baik)", deskriptor: "Menunjukkan pemahaman konsep yang sangat baik" },
            { nilai: "3 (Baik)", deskriptor: "Menunjukkan pemahaman konsep yang baik" },
            { nilai: "2 (Cukup)", deskriptor: "Menunjukkan pemahaman konsep yang cukup" },
            { nilai: "1 (Kurang)", deskriptor: "Menunjukkan pemahaman konsep yang kurang" },
          ],
        },
      ]

    case "Asesmen Formatif - Kuis":
      return [
        {
          kriteria: "Ketepatan Jawaban",
          skala: [
            { nilai: "4 (90-100)", deskriptor: "Jawaban sangat tepat dan lengkap" },
            { nilai: "3 (80-89)", deskriptor: "Jawaban tepat dan cukup lengkap" },
            { nilai: "2 (70-79)", deskriptor: "Jawaban cukup tepat" },
            { nilai: "1 (60-69)", deskriptor: "Jawaban kurang tepat" },
          ],
        },
        {
          kriteria: "Pemahaman Konsep",
          skala: [
            { nilai: "4 (Sangat Baik)", deskriptor: "Menguasai konsep dengan sangat baik" },
            { nilai: "3 (Baik)", deskriptor: "Menguasai konsep dengan baik" },
            { nilai: "2 (Cukup)", deskriptor: "Cukup menguasai konsep" },
            { nilai: "1 (Kurang)", deskriptor: "Kurang menguasai konsep" },
          ],
        },
        {
          kriteria: "Kecepatan Mengerjakan",
          skala: [
            { nilai: "4 (Sangat Baik)", deskriptor: "Mengerjakan dengan cepat dan tepat" },
            { nilai: "3 (Baik)", deskriptor: "Mengerjakan dengan baik dalam waktu yang wajar" },
            { nilai: "2 (Cukup)", deskriptor: "Mengerjakan dengan cukup baik" },
            { nilai: "1 (Kurang)", deskriptor: "Membutuhkan waktu lebih lama" },
          ],
        },
      ]

    case "Asesmen Sumatif - Tes Tertulis":
      return [
        {
          kriteria: "Penguasaan Materi",
          skala: [
            { nilai: "A (85-100)", deskriptor: "Menguasai seluruh materi dengan sangat baik" },
            { nilai: "B (70-84)", deskriptor: "Menguasai sebagian besar materi dengan baik" },
            { nilai: "C (55-69)", deskriptor: "Menguasai sebagian materi dengan cukup" },
            { nilai: "D (40-54)", deskriptor: "Menguasai sedikit materi" },
          ],
        },
        {
          kriteria: "Kemampuan Analisis",
          skala: [
            { nilai: "A (Sangat Baik)", deskriptor: "Mampu menganalisis dengan sangat baik" },
            { nilai: "B (Baik)", deskriptor: "Mampu menganalisis dengan baik" },
            { nilai: "C (Cukup)", deskriptor: "Cukup mampu menganalisis" },
            { nilai: "D (Kurang)", deskriptor: "Kurang mampu menganalisis" },
          ],
        },
        {
          kriteria: "Sistematika Jawaban",
          skala: [
            { nilai: "A (Sangat Baik)", deskriptor: "Jawaban sangat sistematis dan terstruktur" },
            { nilai: "B (Baik)", deskriptor: "Jawaban sistematis dan cukup terstruktur" },
            { nilai: "C (Cukup)", deskriptor: "Jawaban cukup sistematis" },
            { nilai: "D (Kurang)", deskriptor: "Jawaban kurang sistematis" },
          ],
        },
      ]

    case "Asesmen Sumatif - Proyek":
      return [
        {
          kriteria: "Perencanaan Proyek",
          skala: [
            { nilai: "4 (Sangat Baik)", deskriptor: "Perencanaan sangat matang dan detail" },
            { nilai: "3 (Baik)", deskriptor: "Perencanaan baik dan cukup detail" },
            { nilai: "2 (Cukup)", deskriptor: "Perencanaan cukup baik" },
            { nilai: "1 (Kurang)", deskriptor: "Perencanaan kurang matang" },
          ],
        },
        {
          kriteria: "Pelaksanaan Proyek",
          skala: [
            { nilai: "4 (Sangat Baik)", deskriptor: "Melaksanakan proyek dengan sangat baik sesuai rencana" },
            { nilai: "3 (Baik)", deskriptor: "Melaksanakan proyek dengan baik" },
            { nilai: "2 (Cukup)", deskriptor: "Melaksanakan proyek dengan cukup baik" },
            { nilai: "1 (Kurang)", deskriptor: "Pelaksanaan proyek kurang optimal" },
          ],
        },
        {
          kriteria: "Hasil/Produk Proyek",
          skala: [
            { nilai: "4 (Sangat Baik)", deskriptor: "Hasil proyek sangat berkualitas dan kreatif" },
            { nilai: "3 (Baik)", deskriptor: "Hasil proyek berkualitas baik" },
            { nilai: "2 (Cukup)", deskriptor: "Hasil proyek cukup berkualitas" },
            { nilai: "1 (Kurang)", deskriptor: "Hasil proyek kurang berkualitas" },
          ],
        },
        {
          kriteria: "Presentasi Proyek",
          skala: [
            { nilai: "4 (Sangat Baik)", deskriptor: "Presentasi sangat baik, jelas, dan menarik" },
            { nilai: "3 (Baik)", deskriptor: "Presentasi baik dan cukup jelas" },
            { nilai: "2 (Cukup)", deskriptor: "Presentasi cukup baik" },
            { nilai: "1 (Kurang)", deskriptor: "Presentasi kurang optimal" },
          ],
        },
      ]

    case "Asesmen Autentik - Portofolio":
      return [
        {
          kriteria: "Kelengkapan Portofolio",
          skala: [
            { nilai: "4 (Sangat Baik)", deskriptor: "Portofolio sangat lengkap dan terorganisir" },
            { nilai: "3 (Baik)", deskriptor: "Portofolio lengkap dan cukup terorganisir" },
            { nilai: "2 (Cukup)", deskriptor: "Portofolio cukup lengkap" },
            { nilai: "1 (Kurang)", deskriptor: "Portofolio kurang lengkap" },
          ],
        },
        {
          kriteria: "Kualitas Karya",
          skala: [
            { nilai: "4 (Sangat Baik)", deskriptor: "Karya berkualitas sangat tinggi dan kreatif" },
            { nilai: "3 (Baik)", deskriptor: "Karya berkualitas baik" },
            { nilai: "2 (Cukup)", deskriptor: "Karya berkualitas cukup" },
            { nilai: "1 (Kurang)", deskriptor: "Karya berkualitas kurang" },
          ],
        },
        {
          kriteria: "Refleksi Pembelajaran",
          skala: [
            { nilai: "4 (Sangat Baik)", deskriptor: "Refleksi sangat mendalam dan bermakna" },
            { nilai: "3 (Baik)", deskriptor: "Refleksi baik dan cukup bermakna" },
            { nilai: "2 (Cukup)", deskriptor: "Refleksi cukup baik" },
            { nilai: "1 (Kurang)", deskriptor: "Refleksi kurang mendalam" },
          ],
        },
        {
          kriteria: "Perkembangan Belajar",
          skala: [
            { nilai: "4 (Sangat Baik)", deskriptor: "Menunjukkan perkembangan belajar yang sangat baik" },
            { nilai: "3 (Baik)", deskriptor: "Menunjukkan perkembangan belajar yang baik" },
            { nilai: "2 (Cukup)", deskriptor: "Menunjukkan perkembangan belajar yang cukup" },
            { nilai: "1 (Kurang)", deskriptor: "Perkembangan belajar kurang terlihat" },
          ],
        },
      ]

    case "Asesmen Peer - Penilaian Teman Sejawat":
      return [
        {
          kriteria: "Kemampuan Menilai",
          skala: [
            { nilai: "4 (Sangat Baik)", deskriptor: "Mampu menilai teman dengan objektif dan konstruktif" },
            { nilai: "3 (Baik)", deskriptor: "Mampu menilai teman dengan cukup objektif" },
            { nilai: "2 (Cukup)", deskriptor: "Cukup mampu menilai teman" },
            { nilai: "1 (Kurang)", deskriptor: "Kurang mampu menilai teman dengan objektif" },
          ],
        },
        {
          kriteria: "Memberikan Feedback",
          skala: [
            { nilai: "4 (Sangat Baik)", deskriptor: "Memberikan feedback yang sangat konstruktif" },
            { nilai: "3 (Baik)", deskriptor: "Memberikan feedback yang konstruktif" },
            { nilai: "2 (Cukup)", deskriptor: "Memberikan feedback yang cukup baik" },
            { nilai: "1 (Kurang)", deskriptor: "Feedback yang diberikan kurang konstruktif" },
          ],
        },
        {
          kriteria: "Menerima Penilaian",
          skala: [
            { nilai: "4 (Sangat Baik)", deskriptor: "Menerima penilaian teman dengan sangat baik" },
            { nilai: "3 (Baik)", deskriptor: "Menerima penilaian teman dengan baik" },
            { nilai: "2 (Cukup)", deskriptor: "Cukup menerima penilaian teman" },
            { nilai: "1 (Kurang)", deskriptor: "Sulit menerima penilaian dari teman" },
          ],
        },
      ]

    case "Asesmen Kinerja - Praktik":
      return [
        {
          kriteria: "Persiapan Praktik",
          skala: [
            { nilai: "4 (Sangat Baik)", deskriptor: "Persiapan sangat matang dan lengkap" },
            { nilai: "3 (Baik)", deskriptor: "Persiapan baik dan cukup lengkap" },
            { nilai: "2 (Cukup)", deskriptor: "Persiapan cukup baik" },
            { nilai: "1 (Kurang)", deskriptor: "Persiapan kurang matang" },
          ],
        },
        {
          kriteria: "Pelaksanaan Praktik",
          skala: [
            { nilai: "4 (Sangat Baik)", deskriptor: "Melaksanakan praktik dengan sangat terampil" },
            { nilai: "3 (Baik)", deskriptor: "Melaksanakan praktik dengan terampil" },
            { nilai: "2 (Cukup)", deskriptor: "Melaksanakan praktik dengan cukup terampil" },
            { nilai: "1 (Kurang)", deskriptor: "Pelaksanaan praktik kurang terampil" },
          ],
        },
        {
          kriteria: "Hasil Praktik",
          skala: [
            { nilai: "4 (Sangat Baik)", deskriptor: "Hasil praktik sangat baik dan sesuai target" },
            { nilai: "3 (Baik)", deskriptor: "Hasil praktik baik dan sesuai target" },
            { nilai: "2 (Cukup)", deskriptor: "Hasil praktik cukup baik" },
            { nilai: "1 (Kurang)", deskriptor: "Hasil praktik kurang optimal" },
          ],
        },
        {
          kriteria: "Keselamatan Kerja",
          skala: [
            { nilai: "4 (Sangat Baik)", deskriptor: "Sangat memperhatikan keselamatan kerja" },
            { nilai: "3 (Baik)", deskriptor: "Memperhatikan keselamatan kerja" },
            { nilai: "2 (Cukup)", deskriptor: "Cukup memperhatikan keselamatan kerja" },
            { nilai: "1 (Kurang)", deskriptor: "Kurang memperhatikan keselamatan kerja" },
          ],
        },
      ]

    default:
      return [
        {
          kriteria: "Pencapaian Tujuan Pembelajaran",
          skala: [
            { nilai: "4 (Sangat Baik)", deskriptor: "Mencapai tujuan pembelajaran dengan sangat baik" },
            { nilai: "3 (Baik)", deskriptor: "Mencapai tujuan pembelajaran dengan baik" },
            { nilai: "2 (Cukup)", deskriptor: "Cukup mencapai tujuan pembelajaran" },
            { nilai: "1 (Kurang)", deskriptor: "Kurang mencapai tujuan pembelajaran" },
          ],
        },
        {
          kriteria: "Pemahaman Konsep",
          skala: [
            { nilai: "4 (Sangat Baik)", deskriptor: "Pemahaman konsep sangat baik" },
            { nilai: "3 (Baik)", deskriptor: "Pemahaman konsep baik" },
            { nilai: "2 (Cukup)", deskriptor: "Pemahaman konsep cukup" },
            { nilai: "1 (Kurang)", deskriptor: "Pemahaman konsep kurang" },
          ],
        },
      ]
  }
}
