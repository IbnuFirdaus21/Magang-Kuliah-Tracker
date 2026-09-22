import { scheduleData } from '../data/scheduleData.js'

export default function ClassScheduleTable() {
  return (
    <div className="panel" style={{ overflowX: 'auto' }}>
      <table>
        <thead>
          <tr>
            <th>Hari</th>
            <th>Urutan</th>
            <th>Mata kuliah</th>
            <th>Mulai</th>
            <th>Selesai</th>
            <th>Ruang</th>
            <th>Kampus</th>
            <th>Dosen</th>
            <th>Catatan</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.classSchedule.map((c, i) => (
            <tr key={`${c.hari}-${c.urutan}`}>
              <td>{c.hari}</td>
              <td className="tabular">{c.urutan}</td>
              <td>{c.matkul}</td>
              <td className="tabular row-muted">{c.mulai || '—'}</td>
              <td className="tabular row-muted">{c.selesai || '—'}</td>
              <td>{c.ruang}</td>
              <td>{c.kampus}</td>
              <td className="row-muted">{c.dosen}</td>
              <td className="row-muted" style={{ minWidth: 200, whiteSpace: 'normal' }}>
                {c.catatan || ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
