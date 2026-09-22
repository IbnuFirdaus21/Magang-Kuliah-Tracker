# Tracker Magang × Kuliah — Dashboard

Dashboard React (Vite) untuk memantau keseimbangan jadwal kuliah dan jam
kantor magang selama periode 28 Sep – 30 Okt 2026, kelas 4PA23. Dibuat dari
data di `Jadwal_Magang_Kuliah.xlsx`.

## Menjalankan secara lokal

Butuh Node.js 18 ke atas.

```bash
npm install
npm run dev
```

Buka alamat yang ditampilkan di terminal (biasanya `http://localhost:5173`).

Untuk build produksi (folder `dist/`, bisa di-hosting di Vercel/Netlify/GitHub Pages):

```bash
npm run build
npm run preview   # opsional, untuk cek hasil build
```

## Isi dashboard

- **Ringkasan** — kartu ringkasan jam kantor, grafik batang rencana vs jam
  kantor aktual per minggu, donat rasio hadir/bolos, dan sisa jatah bolos
  per mata kuliah.
- **Jadwal Harian** — tabel 25 hari kerja yang bisa diedit: ubah status
  Hadir/Bolos tiap kuliah, isi jam kantor aktual dan catatan. Jam kantor
  rencana dan rencana perjalanan otomatis mengikuti kombinasi hari +
  status, persis seperti mesin skenario di file Excel aslinya.
- **Jadwal Kuliah** — referensi jadwal kelas tetap semester ganjil
  2026/2027.
- **Kuota Presensi** — rincian jatah bolos per mata kuliah, termasuk kolom
  "bolos sebelum periode" yang bisa kamu isi kalau sudah pernah bolos
  sebelum 28 September.
- **Pengaturan** — parameter perhitungan (jam kantor, waktu tempuh, buffer,
  maksimal bolos) dan catatan asumsi dari file sumber.

## Penyimpanan data

Semua perubahan (status kehadiran, jam kantor aktual, catatan, dan bolos
sebelum periode) disimpan otomatis di `localStorage` browser kamu, jadi
tetap ada walau tab ditutup. Tombol **Reset ke rencana awal** di kanan atas
mengembalikan semuanya ke data asli dari spreadsheet.

## Struktur proyek

```
src/
  data/scheduleData.js     data jadwal, kuota, dan mesin skenario (dari xlsx)
  utils/engine.js          logika perhitungan jam kantor & kuota bolos
  components/              komponen UI (sidebar, tabel, grafik, dsb.)
  App.jsx                  state utama + routing antar halaman
  index.css                desain sistem (warna, tipografi, layout)
```

## Mengubah data sumber

Kalau jadwal berubah (misalnya semester baru), edit
`src/data/scheduleData.js` — strukturnya mengikuti sheet asli:
`daily`, `courses`, `weekly`, `classSchedule`, `scenario`, `settings`,
`notes`.
