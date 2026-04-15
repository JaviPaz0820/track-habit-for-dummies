export const getTodayString = () => {
  return new Date().toISOString().split('T')[0]
}

export const generateMonthDays = (year, month) => {
  const daysInMonth = new Date(year, month, 0).getDate()
  const days = []
  for (let i = 1; i <= daysInMonth; i++) {
    const mm = String(month).padStart(2, '0')
    const dd = String(i).padStart(2, '0')
    days.push(`${year}-${mm}-${dd}`)
  }
  return days
}

export const generateYearDays = (year) => {
  const days = []
  for (let month = 1; month <= 12; month++) {
    generateMonthDays(year, month).forEach((d) => days.push(d))
  }
  return days
}

export const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('-')
  return new Date(year, month - 1, day).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const getMonthName = (month) => {
  return new Date(2025, month - 1, 1).toLocaleDateString('es-ES', { month: 'long' })
}