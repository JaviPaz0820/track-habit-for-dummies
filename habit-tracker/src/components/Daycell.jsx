function DayCell({ date, completed, intensity = 0, onClick }) {
  const getColor = () => {
    if (!completed) return '#ebedf0'
    if (intensity < 0.25) return '#c6e48b'
    if (intensity < 0.5)  return '#7bc96f'
    if (intensity < 0.75) return '#239a3b'
    return '#196127'
  }

  return (
    <div
      title={date}
      onClick={onClick}
      style={{
        width: '14px',
        height: '14px',
        borderRadius: '3px',
        backgroundColor: getColor(),
        cursor: 'pointer',
      }}
    />
  )
}

export default DayCell