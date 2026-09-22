import StatCard from './StatCard.jsx'
import WeeklyHoursChart from './WeeklyHoursChart.jsx'
import AttendanceDonut from './AttendanceDonut.jsx'
import CourseQuotaPanel from './CourseQuotaPanel.jsx'

export default function OverviewPage({ totals, weekly, courses }) {
  const watchCount = courses.filter((c) => c.status !== 'Aman').length

  return (
    <div>
      <div className="grid-stats">
        <StatCard
          label="Jam kantor terjadwal"
          value={totals.jamKantorRencana.toFixed(1)}
          unit="jam"
          note={`Sepanjang ${totals.totalMinggu} minggu magang`}
        />
        <StatCard
          label="Jam kantor aktual tercatat"
          value={totals.jamKantorAktual.toFixed(1)}
          unit="jam"
          note={`${totals.hariTercatat} dari ${totals.totalHari} hari sudah diisi`}
        />
        <StatCard
          label="Total bolos terjadwal"
          value={totals.totalBolos}
          unit="pertemuan"
          note={`Dari ${totals.totalHadir + totals.totalBolos} total pertemuan kuliah`}
        />
        <StatCard
          label="Mata kuliah perlu diwaspadai"
          value={watchCount}
          unit={`dari ${courses.length}`}
          note={watchCount === 0 ? 'Semua jatah bolos masih aman' : 'Cek halaman Kuota Presensi'}
        />
      </div>

      <div className="two-col">
        <div className="panel panel-pad">
          <div className="section-heading">
            <h2>Jam kantor per minggu</h2>
            <p>Rencana vs. aktual yang sudah kamu catat</p>
          </div>
          <WeeklyHoursChart weekly={weekly} />
        </div>
        <div className="panel panel-pad">
          <div className="section-heading">
            <h2>Rasio kehadiran kuliah</h2>
            <p>Hadir vs. bolos, seluruh periode</p>
          </div>
          <AttendanceDonut totalHadir={totals.totalHadir} totalBolos={totals.totalBolos} />
        </div>
      </div>

      <div className="panel panel-pad">
        <div className="section-heading">
          <h2>Sisa jatah bolos per mata kuliah</h2>
          <p>Maksimal 3 kali bolos per mata kuliah pada periode ini</p>
        </div>
        <CourseQuotaPanel courses={courses} compact />
      </div>
    </div>
  )
}
