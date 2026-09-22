import { scheduleData } from '../data/scheduleData.js'

export default function SettingsPanel() {
  return (
    <div className="two-col" style={{ alignItems: 'start' }}>
      <div className="panel panel-pad">
        <div className="section-heading" style={{ marginBottom: 12 }}>
          <h2>Parameter perhitungan</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Nilai</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.settings.map((s) => (
              <tr key={s.parameter}>
                <td>{s.parameter}</td>
                <td className="tabular" style={{ fontWeight: 500 }}>
                  {s.nilai}
                </td>
                <td className="row-muted" style={{ whiteSpace: 'normal', minWidth: 180 }}>
                  {s.keterangan}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="panel panel-pad">
        <div className="section-heading" style={{ marginBottom: 12 }}>
          <h2>Asumsi &amp; catatan</h2>
        </div>
        <div className="note-list">
          {scheduleData.notes.map((n, i) => (
            <div className="note-item" key={i}>
              <span className="note-index">{String(i + 1).padStart(2, '0')}</span>
              <span>{n}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
