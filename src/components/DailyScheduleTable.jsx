function StatusSelect({ value, onChange, disabled }) {
  if (disabled) {
    return <span className="row-muted">—</span>
  }
  return (
    <select
      className={`status-select ${value === 'Hadir' ? 'status-hadir' : 'status-bolos'}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="Hadir">Hadir</option>
      <option value="Bolos">Bolos</option>
    </select>
  )
}

function formatTanggal(iso) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })
}

export default function DailyScheduleTable({ days, onChangeDay }) {
  return (
    <div className="panel" style={{ overflowX: 'auto' }}>
      <table>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Hari</th>
            <th>Kuliah 1</th>
            <th>Jam 1</th>
            <th>Status 1</th>
            <th>Kuliah 2</th>
            <th>Jam 2</th>
            <th>Status 2</th>
            <th>Jam kantor rencana</th>
            <th>Rencana perjalanan hari itu</th>
            <th>Jam kantor aktual</th>
            <th>Catatan</th>
          </tr>
        </thead>
        <tbody>
          {days.map((d, i) => {
            const weekStart = i === 0 || days[i - 1].minggu !== d.minggu
            return (
              <tr key={d.tanggal} className={weekStart ? 'week-start' : ''}>
                <td className="tabular">{formatTanggal(d.tanggal)}</td>
                <td>{d.hari}</td>
                <td>{d.kuliah1}</td>
                <td className="row-muted">{d.jam1}</td>
                <td>
                  <StatusSelect
                    value={d.status1}
                    disabled={d.kuliah1 === '-'}
                    onChange={(v) => onChangeDay(d.tanggal, { status1: v })}
                  />
                </td>
                <td>{d.kuliah2}</td>
                <td className="row-muted">{d.jam2}</td>
                <td>
                  <StatusSelect
                    value={d.status2}
                    disabled={d.kuliah2 === '-'}
                    onChange={(v) => onChangeDay(d.tanggal, { status2: v })}
                  />
                </td>
                <td className="tabular">
                  {d.jamKantorRencana != null ? `${d.jamKantorRencana.toFixed(1)} jam` : '—'}
                </td>
                <td className="row-muted" style={{ minWidth: 260, whiteSpace: 'normal' }}>
                  {d.rencanaHari}
                </td>
                <td>
                  <input
                    className="actual-input tabular"
                    type="number"
                    step="0.5"
                    min="0"
                    max="24"
                    placeholder="—"
                    value={d.jamKantorAktual ?? ''}
                    onChange={(e) =>
                      onChangeDay(d.tanggal, {
                        jamKantorAktual: e.target.value === '' ? null : e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    className="note-input"
                    type="text"
                    placeholder="mis. ada rapat, pulang jam 18.00"
                    value={d.catatan}
                    onChange={(e) => onChangeDay(d.tanggal, { catatan: e.target.value })}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
