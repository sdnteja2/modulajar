interface LearningStep {
  title: string
  activities: string[]
}

export const getModelPembelajaranSteps = (
  model: string,
  topik: string,
  metode: string,
  strategi: string,
  kegiatanKhusus: string,
): LearningStep[] => {
  const topikText = topik || "[topik pembelajaran]"
  const metodeText = metode || "[metode pembelajaran]"
  const strategiText = strategi || "[strategi pembelajaran]"

  switch (model) {
    case "Problem Based Learning (PBL)":
      return [
        {
          title: "1. Orientasi Masalah (10 menit)",
          activities: [
            "Guru menyajikan masalah autentik terkait " + topikText,
            "Siswa mengamati dan mengidentifikasi masalah yang disajikan",
            "Guru memotivasi siswa untuk terlibat dalam pemecahan masalah",
          ],
        },
        {
          title: "2. Mengorganisasi Siswa untuk Belajar (15 menit)",
          activities: [
            "Guru membantu siswa mendefinisikan dan mengorganisasi tugas belajar",
            "Pembentukan kelompok belajar dengan " + strategiText,
            "Guru menjelaskan peran setiap anggota kelompok",
          ],
        },
        {
          title: "3. Membimbing Penyelidikan Individual/Kelompok (30 menit)",
          activities: [
            "Siswa mengumpulkan informasi yang sesuai dengan " + metodeText,
            "Guru membimbing siswa dalam penyelidikan dan pengumpulan data",
            kegiatanKhusus
              ? kegiatanKhusus
              : "Siswa melakukan investigasi untuk mendapatkan penjelasan dan pemecahan masalah",
          ],
        },
        {
          title: "4. Mengembangkan dan Menyajikan Hasil Karya (15 menit)",
          activities: [
            "Siswa merencanakan dan menyiapkan karya yang sesuai",
            "Kelompok menyajikan hasil penyelidikan mereka",
            "Siswa saling memberikan feedback terhadap hasil karya",
          ],
        },
        {
          title: "5. Menganalisis dan Mengevaluasi Proses Pemecahan Masalah (10 menit)",
          activities: [
            "Guru membantu siswa melakukan refleksi terhadap penyelidikan",
            "Evaluasi proses pemecahan masalah yang telah dilakukan",
            "Guru memberikan penguatan dan kesimpulan pembelajaran",
          ],
        },
      ]

    case "Project Based Learning":
      return [
        {
          title: "1. Penentuan Pertanyaan Mendasar (10 menit)",
          activities: [
            "Guru menyajikan pertanyaan esensial terkait " + topikText,
            "Siswa mengidentifikasi masalah yang akan diselesaikan melalui proyek",
            "Guru memotivasi siswa untuk terlibat dalam kegiatan proyek",
          ],
        },
        {
          title: "2. Mendesain Perencanaan Proyek (15 menit)",
          activities: [
            "Siswa merencanakan proyek dengan bimbingan guru",
            "Pembagian tugas dalam kelompok menggunakan " + strategiText,
            "Penentuan timeline dan milestone proyek",
          ],
        },
        {
          title: "3. Menyusun Jadwal (5 menit)",
          activities: [
            "Guru dan siswa menyusun jadwal aktivitas proyek",
            "Penentuan deadline setiap tahapan proyek",
            "Alokasi waktu untuk setiap kegiatan proyek",
          ],
        },
        {
          title: "4. Memonitor Siswa dan Kemajuan Proyek (35 menit)",
          activities: [
            "Siswa melaksanakan proyek dengan " + metodeText,
            "Guru memonitor aktivitas dan kemajuan siswa",
            kegiatanKhusus ? kegiatanKhusus : "Siswa mengumpulkan data dan informasi untuk proyek mereka",
          ],
        },
        {
          title: "5. Menguji Hasil dan Mengevaluasi Pengalaman (15 menit)",
          activities: [
            "Siswa mempresentasikan hasil proyek mereka",
            "Evaluasi hasil proyek dan proses pembelajaran",
            "Refleksi pengalaman belajar melalui proyek",
          ],
        },
      ]

    case "Discovery Learning":
      return [
        {
          title: "1. Stimulation (Stimulasi) - 10 menit",
          activities: [
            "Guru memberikan stimulasi berupa pertanyaan atau fenomena terkait " + topikText,
            "Siswa mengamati dan merespon stimulasi yang diberikan",
            "Guru memancing rasa ingin tahu siswa",
          ],
        },
        {
          title: "2. Problem Statement (Identifikasi Masalah) - 10 menit",
          activities: [
            "Siswa mengidentifikasi masalah dari stimulasi yang diberikan",
            "Perumusan masalah dalam bentuk pertanyaan",
            "Guru membimbing siswa dalam merumuskan masalah",
          ],
        },
        {
          title: "3. Data Collection (Pengumpulan Data) - 25 menit",
          activities: [
            "Siswa mengumpulkan informasi dengan " + metodeText,
            "Penerapan " + strategiText + " dalam pengumpulan data",
            kegiatanKhusus ? kegiatanKhusus : "Siswa melakukan eksplorasi untuk mengumpulkan data",
          ],
        },
        {
          title: "4. Data Processing (Pengolahan Data) - 15 menit",
          activities: [
            "Siswa mengolah dan menganalisis data yang telah dikumpulkan",
            "Klasifikasi dan kategorisasi informasi",
            "Siswa mencari pola atau hubungan dari data",
          ],
        },
        {
          title: "5. Verification (Pembuktian) - 10 menit",
          activities: [
            "Siswa memverifikasi hasil pengolahan data",
            "Pengecekan kebenaran hipotesis atau dugaan awal",
            "Diskusi dan konfirmasi hasil temuan",
          ],
        },
        {
          title: "6. Generalization (Menarik Kesimpulan) - 10 menit",
          activities: [
            "Siswa menarik kesimpulan dari hasil pembelajaran",
            "Generalisasi konsep yang telah dipelajari",
            "Guru memberikan penguatan terhadap kesimpulan siswa",
          ],
        },
      ]

    case "Inquiry Learning":
      return [
        {
          title: "1. Orientasi (10 menit)",
          activities: [
            "Guru menyajikan fenomena atau situasi terkait " + topikText,
            "Siswa mengamati dan mengidentifikasi hal-hal yang menarik",
            "Guru memotivasi siswa untuk bertanya dan menyelidiki",
          ],
        },
        {
          title: "2. Merumuskan Masalah (10 menit)",
          activities: [
            "Siswa merumuskan pertanyaan penelitian",
            "Identifikasi variabel yang akan diselidiki",
            "Guru membimbing siswa dalam merumuskan masalah yang jelas",
          ],
        },
        {
          title: "3. Merumuskan Hipotesis (10 menit)",
          activities: [
            "Siswa membuat dugaan sementara atau hipotesis",
            "Diskusi kelompok dengan " + strategiText,
            "Guru membantu siswa merumuskan hipotesis yang dapat diuji",
          ],
        },
        {
          title: "4. Mengumpulkan Data (25 menit)",
          activities: [
            "Siswa mengumpulkan data dengan " + metodeText,
            "Pelaksanaan penyelidikan atau eksperimen",
            kegiatanKhusus ? kegiatanKhusus : "Siswa melakukan observasi dan pencatatan data",
          ],
        },
        {
          title: "5. Menguji Hipotesis (15 menit)",
          activities: [
            "Siswa menganalisis data yang telah dikumpulkan",
            "Pengujian hipotesis berdasarkan data",
            "Diskusi hasil analisis dalam kelompok",
          ],
        },
        {
          title: "6. Merumuskan Kesimpulan (10 menit)",
          activities: [
            "Siswa menarik kesimpulan berdasarkan hasil penyelidikan",
            "Presentasi hasil penyelidikan",
            "Guru memberikan konfirmasi dan penguatan",
          ],
        },
      ]

    case "Cooperative Learning":
      return [
        {
          title: "1. Presentasi Kelas (15 menit)",
          activities: [
            "Guru menyampaikan materi " + topikText + " secara klasikal",
            "Penjelasan tujuan pembelajaran dan langkah-langkah kegiatan",
            "Siswa menyimak dan bertanya jawab dengan guru",
          ],
        },
        {
          title: "2. Belajar Kelompok (35 menit)",
          activities: [
            "Pembentukan kelompok heterogen (4-5 siswa)",
            "Siswa belajar dalam kelompok dengan " + strategiText,
            "Penerapan " + metodeText + " dalam diskusi kelompok",
            kegiatanKhusus ? kegiatanKhusus : "Siswa saling membantu memahami materi dalam kelompok",
          ],
        },
        {
          title: "3. Kuis Individual (15 menit)",
          activities: [
            "Setiap siswa mengerjakan kuis secara individual",
            "Tidak diperbolehkan saling membantu saat kuis",
            "Guru mengawasi pelaksanaan kuis",
          ],
        },
        {
          title: "4. Skor Kemajuan Individual (5 menit)",
          activities: [
            "Perhitungan skor kemajuan setiap siswa",
            "Perbandingan dengan skor sebelumnya",
            "Penentuan kontribusi skor untuk kelompok",
          ],
        },
        {
          title: "5. Rekognisi Kelompok (10 menit)",
          activities: [
            "Pengumuman kelompok dengan skor tertinggi",
            "Pemberian penghargaan kepada kelompok terbaik",
            "Motivasi untuk semua kelompok",
          ],
        },
      ]

    case "Contextual Teaching Learning (CTL)":
      return [
        {
          title: "1. Konstruktivisme (10 menit)",
          activities: [
            "Siswa membangun pengetahuan sendiri terkait " + topikText,
            "Guru memfasilitasi siswa mengaitkan pengetahuan baru dengan pengalaman",
            "Aktivasi pengetahuan awal siswa",
          ],
        },
        {
          title: "2. Inquiry (15 menit)",
          activities: [
            "Siswa melakukan penyelidikan dengan " + metodeText,
            "Guru membimbing siswa dalam proses penemuan",
            "Siswa mengajukan pertanyaan dan mencari jawaban",
          ],
        },
        {
          title: "3. Questioning (10 menit)",
          activities: [
            "Guru dan siswa melakukan tanya jawab",
            "Penerapan " + strategiText + " dalam sesi tanya jawab",
            "Siswa didorong untuk bertanya dan menjawab",
          ],
        },
        {
          title: "4. Learning Community (20 menit)",
          activities: [
            "Siswa belajar dalam komunitas/kelompok",
            "Sharing pengalaman dan pengetahuan antar siswa",
            kegiatanKhusus ? kegiatanKhusus : "Kolaborasi dalam menyelesaikan tugas kelompok",
          ],
        },
        {
          title: "5. Modeling (10 menit)",
          activities: [
            "Guru atau siswa mendemonstrasikan konsep",
            "Siswa mengamati dan meniru model yang diberikan",
            "Praktik langsung konsep yang dipelajari",
          ],
        },
        {
          title: "6. Reflection (10 menit)",
          activities: [
            "Siswa merefleksikan apa yang telah dipelajari",
            "Guru membantu siswa menyimpulkan pembelajaran",
            "Evaluasi proses dan hasil belajar",
          ],
        },
        {
          title: "7. Authentic Assessment (5 menit)",
          activities: [
            "Penilaian autentik terhadap kinerja siswa",
            "Evaluasi kemampuan siswa dalam konteks nyata",
            "Feedback untuk perbaikan pembelajaran",
          ],
        },
      ]

    default:
      return [
        {
          title: "1. Kegiatan Pendahuluan (10 menit)",
          activities: [
            "Guru membuka pembelajaran dengan salam dan doa",
            "Guru melakukan apersepsi terkait materi " + topikText,
            "Guru menyampaikan tujuan pembelajaran",
          ],
        },
        {
          title: "2. Kegiatan Inti (50 menit)",
          activities: [
            "Guru menerapkan model pembelajaran yang dipilih",
            "Siswa mengikuti pembelajaran dengan " + metodeText,
            "Implementasi " + strategiText,
            kegiatanKhusus ? kegiatanKhusus : "Siswa aktif dalam kegiatan pembelajaran",
          ],
        },
        {
          title: "3. Kegiatan Penutup (10 menit)",
          activities: [
            "Guru dan siswa melakukan refleksi pembelajaran",
            "Guru memberikan penguatan materi",
            "Guru menutup pembelajaran dengan doa dan salam",
          ],
        },
      ]
  }
}
