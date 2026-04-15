import { useState, useEffect } from 'react'
import useHabits from './hooks/useHabits'
import Navbar from './components/Navbar'
import MonthView from './pages/MonthView'
import YearView from './pages/YearView'

function App() {
  const [view,  setView]  = useState('month')
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  const { habits, addHabit, addStudyHabit, toggleDay, deleteHabit, addTopic } = useHabits()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div style={{ maxWidth: '920px', margin: '0 auto', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Navbar
        currentView={view}
        onNavigate={setView}
        theme={theme}
        onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
      />

      {view === 'month' && (
        <MonthView
          habits={habits}
          onToggleDay={toggleDay}
          onAddHabit={addHabit}
          onAddStudyHabit={addStudyHabit}
          onDeleteHabit={deleteHabit}
          onAddTopic={addTopic}
        />
      )}

      {view === 'year' && (
        <YearView
          habits={habits}
          onToggleDay={toggleDay}
          onAddTopic={addTopic}
        />
      )}

      {view === 'day'   && <p style={{ padding: '24px', color: 'var(--text-secondary)' }}>Vista diaria — próximo paso</p>}
      {view === 'stats' && <p style={{ padding: '24px', color: 'var(--text-secondary)' }}>Estadísticas — próximo paso</p>}
    </div>
  )
}

export default App