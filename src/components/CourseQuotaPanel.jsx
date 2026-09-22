function statusClass(status) {
  if (status === 'Waspada') return 'badge-waspada'
  if (status === 'Melebihi batas') return 'badge-melebihi'
  return 'badge-aman'
}

function fillClass(sisaJatah) {
  if (sisaJatah < 0) return 'over'
  if (sisaJatah === 0) return 'warn'
  return ''
}

export default function CourseQuotaPanel({ courses, compact }) {
  return (
    <div>
      {courses.map((c) => {
        const pct = Math.min(100, Math.round((c.totalBolos / c.maksBolos) * 100))
        return (
          <div className="quota-row" key={c.matkul}>
            <div className="quota-name">
              {c.matkul}
              <span className="day-tag">{c.hari}</span>
            </div>
            <div className="quota-track">
              <div
                className={`quota-fill ${fillClass(c.sisaJatah)}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="quota-count tabular">
              {c.totalBolos}/{c.maksBolos}
              {!compact && (
                <span className={`badge ${statusClass(c.status)}`} style={{ marginLeft: 8 }}>
                  {c.status}
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
