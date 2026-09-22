import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'

export default function AttendanceDonut({ totalHadir, totalBolos }) {
  const total = totalHadir + totalBolos
  const data = [
    { name: 'Hadir', value: totalHadir, color: '#35704f' },
    { name: 'Bolos', value: totalBolos, color: '#a83a2c' },
  ]
  const pct = total ? Math.round((totalHadir / total) * 100) : 0

  return (
    <div style={{ position: 'relative' }}>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={62}
            outerRadius={86}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} pertemuan`, name]}
            contentStyle={{
              border: '1px solid #d7dbd2',
              borderRadius: 3,
              fontSize: 12,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div
        style={{
          position: 'absolute',
          top: '48%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 600 }}>{pct}%</div>
        <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>hadir</div>
      </div>
      <div className="legend" style={{ marginTop: 6, justifyContent: 'center' }}>
        <span className="legend-item">
          <span className="legend-swatch" style={{ background: '#35704f' }} />
          Hadir ({totalHadir})
        </span>
        <span className="legend-item">
          <span className="legend-swatch" style={{ background: '#a83a2c' }} />
          Bolos ({totalBolos})
        </span>
      </div>
    </div>
  )
}
