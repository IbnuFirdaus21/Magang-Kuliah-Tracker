import { scheduleData } from '../data/scheduleData.js'

// Build the initial editable day state from the source schedule.
// Each entry keeps everything needed to recompute office hours and
// attendance quotas when the user changes a status, logs actual hours,
// or adds a note.
export function buildInitialDays() {
  return scheduleData.daily.map((d) => ({
    tanggal: d.tanggal,
    minggu: d.minggu,
    hari: d.hari,
    kuliah1: d.kuliah1,
    jam1: d.jam1,
    status1: d.kuliah1 === '-' ? '-' : 'Hadir',
    kuliah2: d.kuliah2,
    jam2: d.jam2,
    status2: d.kuliah2 === '-' ? '-' : 'Hadir',
    ruang: d.ruang,
    jamKantorAktual: null,
    catatan: '',
  }))
}

export function buildInitialBolosSebelum() {
  const map = {}
  scheduleData.courses.forEach((c) => {
    map[c.matkul] = c.bolosSebelum || 0
  })
  return map
}

// Look up the pre-computed office-hours scenario for a given day + status
// pair, exactly as the source workbook's "Skenario" sheet does.
export function lookupScenario(hari, status1, status2) {
  const key = `${hari}|${status1}|${status2}`
  const entry = scheduleData.scenario[key]
  if (entry) return entry
  // Fallback: keep the previous plan text but flag hours as unknown.
  return {
    jamDiKantor: null,
    rencanaHari: 'Kombinasi status ini belum ada di mesin skenario.',
    kantorMulai1: null,
    kantorSelesai1: null,
    kantorMulai2: null,
    kantorSelesai2: null,
  }
}

export function computeDayPlan(day) {
  const scenario = lookupScenario(day.hari, day.status1, day.status2)
  return {
    ...day,
    jamKantorRencana: scenario.jamDiKantor,
    rencanaHari: scenario.rencanaHari,
  }
}

export function computeAllDays(days) {
  return days.map(computeDayPlan)
}

export function computeWeeklyRecap(computedDays) {
  const weeks = {}
  computedDays.forEach((d) => {
    if (!weeks[d.minggu]) {
      weeks[d.minggu] = {
        minggu: d.minggu,
        jamKantorRencana: 0,
        jamKantorAktual: 0,
        adaAktual: false,
        jumlahBolos: 0,
        tanggalMulai: d.tanggal,
        tanggalAkhir: d.tanggal,
      }
    }
    const w = weeks[d.minggu]
    w.jamKantorRencana += d.jamKantorRencana || 0
    if (d.jamKantorAktual != null && d.jamKantorAktual !== '') {
      w.jamKantorAktual += Number(d.jamKantorAktual)
      w.adaAktual = true
    }
    if (d.status1 === 'Bolos') w.jumlahBolos += 1
    if (d.status2 === 'Bolos') w.jumlahBolos += 1
    if (d.tanggal < w.tanggalMulai) w.tanggalMulai = d.tanggal
    if (d.tanggal > w.tanggalAkhir) w.tanggalAkhir = d.tanggal
  })
  return Object.values(weeks).sort((a, b) => a.minggu - b.minggu)
}

export function computeCourseQuota(computedDays, bolosSebelum) {
  const perCourse = {}
  const ensure = (nama, hari) => {
    if (!perCourse[nama]) {
      perCourse[nama] = {
        matkul: nama,
        hari,
        pertemuan: 0,
        bolosSebelum: bolosSebelum[nama] || 0,
        bolosDirencanakan: 0,
      }
    }
  }

  computedDays.forEach((d) => {
    if (d.kuliah1 && d.kuliah1 !== '-') {
      ensure(d.kuliah1, d.hari)
      perCourse[d.kuliah1].pertemuan += 1
      if (d.status1 === 'Bolos') perCourse[d.kuliah1].bolosDirencanakan += 1
    }
    if (d.kuliah2 && d.kuliah2 !== '-') {
      ensure(d.kuliah2, d.hari)
      perCourse[d.kuliah2].pertemuan += 1
      if (d.status2 === 'Bolos') perCourse[d.kuliah2].bolosDirencanakan += 1
    }
  })

  const maksBolos = Number(
    scheduleData.settings.find((s) => s.parameter === 'Maks. bolos per matkul')?.nilai || 3,
  )

  return Object.values(perCourse)
    .map((c) => {
      const totalBolos = c.bolosSebelum + c.bolosDirencanakan
      const sisaJatah = maksBolos - totalBolos
      let status = 'Aman'
      if (sisaJatah < 0) status = 'Melebihi batas'
      else if (sisaJatah === 0) status = 'Waspada'
      return { ...c, totalBolos, maksBolos, sisaJatah, status }
    })
    .sort((a, b) => a.matkul.localeCompare(b.matkul))
}

export function computeTotals(computedDays, weekly) {
  const jamKantorRencana = computedDays.reduce((sum, d) => sum + (d.jamKantorRencana || 0), 0)
  const jamKantorAktual = computedDays.reduce(
    (sum, d) => sum + (d.jamKantorAktual != null && d.jamKantorAktual !== '' ? Number(d.jamKantorAktual) : 0),
    0,
  )
  const hariTercatat = computedDays.filter(
    (d) => d.jamKantorAktual != null && d.jamKantorAktual !== '',
  ).length
  const totalBolos = computedDays.reduce((sum, d) => {
    let n = 0
    if (d.status1 === 'Bolos') n += 1
    if (d.status2 === 'Bolos') n += 1
    return sum + n
  }, 0)
  const totalHadir = computedDays.reduce((sum, d) => {
    let n = 0
    if (d.status1 === 'Hadir') n += 1
    if (d.status2 === 'Hadir') n += 1
    return sum + n
  }, 0)
  return {
    jamKantorRencana,
    jamKantorAktual,
    hariTercatat,
    totalBolos,
    totalHadir,
    totalHari: computedDays.length,
    totalMinggu: weekly.length,
  }
}

export function formatJam(value) {
  if (value == null || Number.isNaN(value)) return '—'
  return `${value.toFixed(1)} jam`
}
