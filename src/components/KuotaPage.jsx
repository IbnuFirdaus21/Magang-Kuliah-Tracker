function statusClass(status) {
  if (status === 'Waspada') return 'badge-waspada'
  if (status === 'Melebihi batas') return 'badge-melebihi'
  return 'badge-aman'
}

export default function KuotaPage({ courses, bolosSebelum, onChangeBolosSebelum }) {
  return (
    <div className="panel" style={{ overflowX: 'auto' }}>
      <table>
        <thead>
          <tr>
            <th>Mata kuliah</th>
            <th>Hari</th>
            <th>Pertemuan dalam periode</th>
            <th>Bolos sebelum periode</th>
            <th>Bolos direncanakan</th>
            <th>Total bolos</th>
            <th>Maks. bolos</th>
            <th>Sisa jatah</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.matkul}>
              <td>{c.matkul}</td>
              <td className="row-muted">{c.hari}</td>
              <td className="tabular">{c.pertemuan}</td>
              <td>
                <input
                  className="actual-input tabular"
                  type="number"
                  min="0"
                  max="3"
                  value={bolosSebelum[c.matkul] ?? 0}
                  onChange={(e) => onChangeBolosSebelum(c.matkul, e.target.value)}
                />
              </td>
              <td className="tabular">{c.bolosDirencanakan}</td>
              <td className="tabular" style={{ fontWeight: 600 }}>
                {c.totalBolos}
              </td>
              <td className="tabular row-muted">{c.maksBolos}</td>
              <td className="tabular" style={{ fontWeight: 600 }}>
                {c.sisaJatah}
              </td>
              <td>
                <span className={`badge ${statusClass(c.status)}`}>{c.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
