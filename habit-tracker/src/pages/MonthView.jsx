import { useState } from 'react'
import GitHubGrid from '../components/GitHubGrid'
import TopicProgress from '../components/TopicProgress'
import { generateMonthDays, getMonthName } from '../utils/dateHelpers'

const btn = (extra = {}) => ({
  padding: '7px 14px', borderRadius: '6px', cursor: 'pointer',
  border: '1px solid var(--border-color)',
  backgroundColor: 'var(--bg-secondary)',
  color: 'var(--text-primary)',
  ...extra,
})

function MonthView({ habits, onToggleDay, onAddHabit, onAddStudyHabit, onDeleteHabit, onAddTopic }) {
  const [habitName, setHabitName] = useState('')
  const now = new Date()
  const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1)
  const currentYear = now.getFullYear()
  const monthDates  = generateMonthDays(currentYear, currentMonth)

  const getMonthDays = (habit) => habit.days.filter((d) => monthDates.includes(d.date))

  const getPct = (days) => {
    if (!days.length) return 0
    return Math.round((days.filter(d => d.completed).length / days.length) * 100)
  }

  const handleAdd = (fn) => {
    if (!habitName.trim()) return
    fn(habitName.trim())
    setHabitName('')
  }

  return (
    <div style={{ padding: '0 24px' }}>
      {/* Navegación de mes */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <button onClick={() => setCurrentMonth((m) => m === 1 ? 12 : m - 1)} style={btn()}>←</button>
        <h3 style={{ margin: 0, color: 'var(--text-primary)', minWidth: '160px', textAlign: 'center', textTransform: 'capitalize' }}>
          {getMonthName(currentMonth)} {currentYear}
        </h3>
        <button onClick={() => setCurrentMonth((m) => m === 12 ? 1 : m + 1)} style={btn()}>→</button>
      </div>

      {/* Formulario */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Nombre del hábito..."
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd(onAddHabit)}
          style={{
            flex: 1, padding: '7px 10px', borderRadius: '6px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
          }}
        />
        <button onClick={() => handleAdd(onAddHabit)} style={btn()}>+ Hábito</button>
        <button onClick={() => handleAdd(onAddStudyHabit)} style={btn({ backgroundColor: 'var(--accent)', color: 'white', border: 'none' })}>
          + Estudio
        </button>
      </div>

      {/* Lista de hábitos */}
      {habits.map((habit) => {
        const monthDays = getMonthDays(habit)
        const pct       = getPct(monthDays)

        return (
          <div key={habit.id} style={{
            marginBottom: '16px', padding: '16px',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            backgroundColor: 'var(--bg-card)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <strong style={{ color: 'var(--text-primary)' }}>{habit.name}</strong>
                {habit.type === 'study' && (
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-secondary)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                    estudio
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 700 }}>{pct}%</span>
                <button onClick={() => onDeleteHabit(habit.id)} style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>✕</button>
              </div>
            </div>

            <GitHubGrid
              days={monthDays}
              onToggleDay={(date) => onToggleDay(habit.id, date)}
              showMonthLabels={false}
            />

            {habit.type === 'study' && (
              <TopicProgress
                topics={habit.topics}
                habitId={habit.id}
                completionPct={pct}
                onAddTopic={onAddTopic}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default MonthView