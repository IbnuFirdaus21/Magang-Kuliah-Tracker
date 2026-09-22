const NAV_ITEMS = [
  { key: 'overview', label: 'Ringkasan', index: '01' },
  { key: 'harian', label: 'Jadwal Harian', index: '02' },
  { key: 'kuliah', label: 'Jadwal Kuliah', index: '03' },
  { key: 'kuota', label: 'Kuota Presensi', index: '04' },
  { key: 'pengaturan', label: 'Pengaturan', index: '05' },
]

export default function Sidebar({ active, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-title">Tracker Magang × Kuliah</div>
        <div className="brand-sub">Kelas 4PA23</div>
      </div>

      <nav className="nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            className={`nav-item${active === item.key ? ' active' : ''}`}
            onClick={() => onNavigate(item.key)}
          >
            <span className="nav-index">{item.index}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        Perubahan status, jam aktual, dan catatan tersimpan otomatis di
        perangkat ini.
      </div>
    </aside>
  )
}
