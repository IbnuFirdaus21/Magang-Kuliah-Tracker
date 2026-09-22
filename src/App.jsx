import { useEffect, useMemo, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import TopBar from './components/TopBar.jsx'
import OverviewPage from './components/OverviewPage.jsx'
import DailyScheduleTable from './components/DailyScheduleTable.jsx'
import ClassScheduleTable from './components/ClassScheduleTable.jsx'
import KuotaPage from './components/KuotaPage.jsx'
import SettingsPanel from './components/SettingsPanel.jsx'
import { scheduleData } from './data/scheduleData.js'
import {
  buildInitialDays,
  buildInitialBolosSebelum,
  computeAllDays,
  computeWeeklyRecap,
  computeCourseQuota,
  computeTotals,
} from './utils/engine.js'

const STORAGE_KEY = 'tracker-magang-kuliah-v1'

function loadStoredState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export default function App() {
  const [page, setPage] = useState('overview')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [days, setDays] = useState(() => loadStoredState()?.days ?? buildInitialDays())
  const [bolosSebelum, setBolosSebelum] = useState(
    () => loadStoredState()?.bolosSebelum ?? buildInitialBolosSebelum(),
  )

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ days, bolosSebelum }))
    } catch {
      // storage unavailable — continue without persistence
    }
  }, [days, bolosSebelum])

  const computedDays = useMemo(() => computeAllDays(days), [days])
  const weekly = useMemo(() => computeWeeklyRecap(computedDays), [computedDays])
  const courses = useMemo(
    () => computeCourseQuota(computedDays, bolosSebelum),
    [computedDays, bolosSebelum],
  )
  const totals = useMemo(() => computeTotals(computedDays, weekly), [computedDays, weekly])

  function handleChangeDay(tanggal, patch) {
    setDays((prev) => prev.map((d) => (d.tanggal === tanggal ? { ...d, ...patch } : d)))
  }

  function handleChangeBolosSebelum(matkul, value) {
    const n = value === '' ? 0 : Math.max(0, Number(value))
    setBolosSebelum((prev) => ({ ...prev, [matkul]: n }))
  }

  function handleReset() {
    if (!window.confirm('Kembalikan semua status, jam aktual, dan catatan ke rencana awal?')) {
      return
    }
    setDays(buildInitialDays())
    setBolosSebelum(buildInitialBolosSebelum())
  }

  return (
    <div className="shell">
      <Sidebar
        active={page}
        onNavigate={setPage}
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
      <div className="main">
        <TopBar
          page={page}
          periode={scheduleData.periode}
          onReset={handleReset}
          onMenuClick={() => setMobileNavOpen(true)}
        />
        <div className="content">
          {page === 'overview' && (
            <OverviewPage totals={totals} weekly={weekly} courses={courses} />
          )}
          {page === 'harian' && (
            <DailyScheduleTable days={computedDays} onChangeDay={handleChangeDay} />
          )}
          {page === 'kuliah' && <ClassScheduleTable />}
          {page === 'kuota' && (
            <KuotaPage
              courses={courses}
              bolosSebelum={bolosSebelum}
              onChangeBolosSebelum={handleChangeBolosSebelum}
            />
          )}
          {page === 'pengaturan' && <SettingsPanel />}
        </div>
      </div>
    </div>
  )
}
