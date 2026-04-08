import DayCell from './DayCell'

function HabitGrid({ days, onToggleDay }) {
  return (
    <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
      {days.map((day) => (
        <DayCell
          key={day.date}
          date={day.date}
          completed={day.completed}
          intensity={day.completed ? 1 : 0}
          onClick={() => onToggleDay(day.date)}
        />
      ))}
    </div>
  )
}

export default HabitGrid