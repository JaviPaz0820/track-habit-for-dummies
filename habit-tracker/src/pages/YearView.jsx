import GitHubGrid from '../components/GitHubGrid'
import TopicProgress from '../components/TopicProgress'
import { getTodayString } from '../utils/dateHelpers'

function YearView({ habits, onToggleDay, onAddTopic }) {
  const today = getTodayString()
  const year  = new Date().getFullYear()

  const getPct = (days) => {
    const past = days.filter(d => d.date <= today)
    if (!past.length) return 0
    return Math.round((past.filter(d => d.completed).length / past.length) * 100)
  }

  if (!habits.length) return (
    <p style={{ padding: '24px', color: 'var(--text-secondary)' }}>
      No hay hábitos. Créalos en la vista Mes.
    </p>
  )

  return (
    <div style={{ padding: '0 24px' }}>
      <h3 style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>{year} — vista anual</h3>

      {habits.map((habit) => {
        const pct = getPct(habit.days)

        return (
          <div key={habit.id} style={{
            marginBottom: '24px', padding: '16px',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            backgroundColor: 'var(--bg-card)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <strong style={{ color: 'var(--text-primary)' }}>{habit.name}</strong>
              <span style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 700 }}>{pct}% del año</span>
            </div>

            <GitHubGrid
              days={habit.days}
              onToggleDay={(date) => onToggleDay(habit.id, date)}
              showMonthLabels={true}
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

export default YearView