import { useState } from 'react'

function TopicProgress({ topics, habitId, completionPct, onAddTopic }) {
  const [newTopic, setNewTopic] = useState('')

  const handleAdd = () => {
    if (!newTopic.trim()) return
    onAddTopic(habitId, newTopic.trim())
    setNewTopic('')
  }

  const getBarColor = (p) => {
    if (p < 25) return 'var(--cell-1)'
    if (p < 50) return 'var(--cell-2)'
    if (p < 75) return 'var(--cell-3)'
    return 'var(--cell-4)'
  }

  return (
    <div style={{ marginTop: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
      <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Materias
      </p>

      {topics.map((topic) => (
        <div key={topic.id} style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{topic.name}</span>
            <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 600 }}>{completionPct}%</span>
          </div>
          <div style={{ height: '6px', backgroundColor: 'var(--cell-empty)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
              width: `${completionPct}%`,
              height: '100%',
              backgroundColor: getBarColor(completionPct),
              borderRadius: '3px',
              transition: 'width 0.4s ease',
            }} />
          </div>
        </div>
      ))}

      <div style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
        <input
          type="text"
          placeholder="Agregar materia..."
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          style={{
            flex: 1, padding: '5px 8px', borderRadius: '6px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
          }}
        />
        <button onClick={handleAdd} style={{
          padding: '5px 12px', borderRadius: '6px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          cursor: 'pointer',
        }}>+</button>
      </div>
    </div>
  )
}

export default TopicProgress