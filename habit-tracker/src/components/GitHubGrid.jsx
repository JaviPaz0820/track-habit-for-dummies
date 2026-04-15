import DayCell from './DayCell'

const DAY_LABELS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
const MONTH_NAMES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
const CELL = 13
const GAP  = 3

function groupIntoWeeks(days) {
  if (!days.length) return []
  const firstDate = new Date(days[0].date + 'T00:00:00')
  const firstDow  = (firstDate.getDay() + 6) % 7
  const padded    = [...Array(firstDow).fill(null), ...days]
  const weeks     = []
  for (let i = 0; i < padded.length; i += 7) {
    const week = padded.slice(i, i + 7)
    while (week.length < 7) week.push(null)
    weeks.push(week)
  }
  return weeks
}

function getMonthLabels(weeks) {
  const labels = []
  let lastMonth = -1
  weeks.forEach((week, wi) => {
    const first = week.find(d => d !== null)
    if (first) {
      const m = parseInt(first.date.slice(5, 7)) - 1
      if (m !== lastMonth) { labels.push({ wi, m }); lastMonth = m }
    }
  })
  return labels
}

function GitHubGrid({ days, onToggleDay, showMonthLabels = true }) {
  const weeks       = groupIntoWeeks(days)
  const monthLabels = showMonthLabels ? getMonthLabels(weeks) : []
  const step        = CELL + GAP
  const leftOffset  = 22

  return (
    <div style={{ overflowX: 'auto', paddingBottom: '4px' }}>
      <div style={{ position: 'relative', display: 'inline-block', minWidth: 'fit-content' }}>

        {/* Etiquetas de mes */}
        {showMonthLabels && (
          <div style={{ height: '18px', position: 'relative', marginLeft: `${leftOffset}px` }}>
            {monthLabels.map(({ wi, m }) => (
              <span key={m} style={{
                position: 'absolute',
                left: `${wi * step}px`,
                fontSize: '10px',
                color: 'var(--text-secondary)',
              }}>
                {MONTH_NAMES[m]}
              </span>
            ))}
          </div>
        )}

        <div style={{ display: 'flex' }}>
          {/* Etiquetas de días */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: `${GAP}px`, marginRight: '4px', width: `${leftOffset - 4}px` }}>
            {DAY_LABELS.map((label, i) => (
              <div key={i} style={{
                width: `${CELL}px`,
                height: `${CELL}px`,
                fontSize: '9px',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
                {i % 2 === 0 ? label : ''}
              </div>
            ))}
          </div>

          {/* Grid de semanas */}
          <div style={{ display: 'flex', gap: `${GAP}px` }}>
            {weeks.map((week, wi) => (
              <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: `${GAP}px` }}>
                {week.map((day, di) =>
                  day ? (
                    <DayCell
                      key={day.date}
                      date={day.date}
                      completed={day.completed}
                      intensity={day.completed ? 1 : 0}
                      onClick={() => onToggleDay?.(day.date)}
                    />
                  ) : (
                    <div key={`e-${wi}-${di}`} style={{ width: `${CELL}px`, height: `${CELL}px` }} />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GitHubGrid