function DayCell({ date, completed, intensity = 0, onClick }) {
  const getColor = () => {
    if (!completed) return 'var(--cell-empty)'
    if (intensity < 0.25) return 'var(--cell-1)'
    if (intensity < 0.5)  return 'var(--cell-2)'
    if (intensity < 0.75) return 'var(--cell-3)'
    return 'var(--cell-4)'
  }

  return (
    <div
      title={date}
      onClick={completed ? undefined : onClick}
      style={{
        width: '13px',
        height: '13px',
        borderRadius: '3px',
        backgroundColor: getColor(),
        cursor: completed ? 'default' : 'pointer',
        transition: 'background-color 0.15s',
      }}
    />
  )
}

export default DayCell