const TITLES = {
  overview: ['Ringkasan', 'Ikhtisar jam kantor, kehadiran, dan sisa jatah bolos'],
  harian: ['Jadwal Harian', 'Catat status kehadiran dan jam kantor aktual per hari'],
  kuliah: ['Jadwal Kuliah', 'Jadwal kelas tetap semester ganjil 2026/2027'],
  kuota: ['Kuota Presensi', 'Rincian jatah bolos per mata kuliah'],
  pengaturan: ['Pengaturan', 'Asumsi dan parameter yang dipakai perhitungan'],
}

export default function TopBar({ page, periode, onReset }) {
  const [title, subtitle] = TITLES[page] || TITLES.overview
  return (
    <header className="topbar">
      <div>
        <div className="topbar-title">{title}</div>
        <div className="topbar-meta">
          {subtitle} · Periode magang {periode}
        </div>
      </div>
      <button className="btn btn-quiet" onClick={onReset}>
        Reset ke rencana awal
      </button>
    </header>
  )
}
