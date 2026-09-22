import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #d7dbd2',
        borderRadius: 3,
        padding: '8px 10px',
        fontSize: 12,
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 4 }}>Minggu {label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} style={{ color: p.color }}>
          {p.name}: {p.value.toFixed(1)} jam
        </div>
      ))}
    </div>
  )
}

export default function WeeklyHoursChart({ weekly }) {
  const data = weekly.map((w) => ({
    minggu: w.minggu,
    Rencana: Number(w.jamKantorRencana.toFixed(2)),
    Aktual: w.adaAktual ? Number(w.jamKantorAktual.toFixed(2)) : 0,
  }))

  return (
    <div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barGap={4} margin={{ top: 4, right: 8, left: -14, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#e3e5de" />
          <XAxis
            dataKey="minggu"
            tickFormatter={(v) => `M${v}`}
            tick={{ fontSize: 11, fill: '#56626c' }}
            axisLine={{ stroke: '#d7dbd2' }}
            tickLine={false}
          />
          <YAxis tick={{ fontSize: 11, fill: '#56626c' }} axisLine={false} tickLine={false} width={30} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f4f5f1' }} />
          <Bar dataKey="Rencana" fill="#2f5a74" radius={[2, 2, 0, 0]} maxBarSize={26} />
          <Bar dataKey="Aktual" fill="#a3701f" radius={[2, 2, 0, 0]} maxBarSize={26} />
        </BarChart>
      </ResponsiveContainer>
      <div className="legend" style={{ marginTop: 6 }}>
        <span className="legend-item">
          <span className="legend-swatch" style={{ background: '#2f5a74' }} />
          Jam kantor rencana
        </span>
        <span className="legend-item">
          <span className="legend-swatch" style={{ background: '#a3701f' }} />
          Jam kantor aktual tercatat
        </span>
      </div>
    </div>
  )
}
