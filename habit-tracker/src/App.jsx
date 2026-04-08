import useHabits from './hooks/useHabits'
import HabitGrid from './components/HabitGrid'

function App() {
  const { habits, addHabit, toggleDay, deleteHabit } = useHabits()

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => addHabit('Ejercicio')}>+ Agregar hábito</button>
      <button onClick={() => addHabit('Lectura')} style={{ marginLeft: '8px' }}>+ Lectura</button>

      {habits.map((habit) => (
        <div key={habit.id} style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <strong>{habit.name}</strong>
            <button onClick={() => deleteHabit(habit.id)}>Eliminar</button>
          </div>
          <HabitGrid
            days={habit.days}
            onToggleDay={(date) => toggleDay(habit.id, date)}
          />
        </div>
      ))}
    </div>
  )
}

export default App