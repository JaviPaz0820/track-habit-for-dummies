import { useState, useEffect } from 'react'

const generateDays = () => {
  const days = []
  for (let i = 1; i <= 30; i++) {
    days.push({
      date: `2025-04-${String(i).padStart(2, '0')}`,
      completed: false,
    })
  }
  return days
}

const loadFromStorage = () => {
  try {
    const data = localStorage.getItem('habits')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const saveToStorage = (habits) => {
  localStorage.setItem('habits', JSON.stringify(habits))
}

function useHabits() {
  const [habits, setHabits] = useState(loadFromStorage)

  useEffect(() => {
    saveToStorage(habits)
  }, [habits])

  const addHabit = (name) => {
    const newHabit = {
      id: Date.now(),
      name,
      days: generateDays(),
    }
    setHabits([...habits, newHabit])
  }

  const toggleDay = (habitId, date) => {
    setHabits(habits.map((habit) =>
      habit.id !== habitId ? habit : {
        ...habit,
        days: habit.days.map((d) =>
          d.date !== date ? d : { ...d, completed: !d.completed }
        ),
      }
    ))
  }

  const deleteHabit = (habitId) => {
    setHabits(habits.filter((h) => h.id !== habitId))
  }

  return { habits, addHabit, toggleDay, deleteHabit }
}

export default useHabits