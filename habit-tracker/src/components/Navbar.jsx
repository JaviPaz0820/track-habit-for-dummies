function Navbar({ currentView, onNavigate, theme, onToggleTheme }) {
  const views = [
    { id: 'month', label: 'Mes' },
    { id: 'day',   label: 'Hoy' },
    { id: 'year',  label: 'Año' },
    { id: 'stats', label: 'Stats' },
  ]

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', gap: '4px',
      padding: '12px 24px',
      borderBottom: '1px solid var(--border-color)',
      marginBottom: '24px',
      backgroundColor: 'var(--bg-secondary)',
    }}>
      <span style={{ fontWeight: 700, color: 'var(--text-primary)', marginRight: '16px', fontSize: '15px' }}>
        🌱 Habits
      </span>

      <div style={{ display: 'flex', gap: '2px', flex: 1 }}>
        {views.map((v) => (
          <button key={v.id} onClick={() => onNavigate(v.id)} style={{
            padding: '6px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer',
            backgroundColor: currentView === v.id ? 'var(--accent)' : 'transparent',
            color: currentView === v.id ? 'white' : 'var(--text-secondary)',
            fontWeight: currentView === v.id ? 600 : 400,
            transition: 'all 0.15s',
          }}>
            {v.label}
          </button>
        ))}
      </div>

      <button onClick={onToggleTheme} style={{
        padding: '6px 10px', borderRadius: '6px',
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        cursor: 'pointer', fontSize: '14px',
      }}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </nav>
  )
}

export default Navbar