import { useState, useEffect } from 'react'
import { generateYearDays, getTodayString } from '../utils/dateHelpers'

const buildDays = () => {
  const year = new Date().getFullYear()
  return generateYearDays(year).map((date) => ({
    date,
    completed: false,
  }))
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
    setHabits((prev) => [...prev, {
      id: Date.now(),
      name,
      type: 'default',
      days: buildDays(),
    }])
  }

  const addStudyHabit = (name) => {
    setHabits((prev) => [...prev, {
      id: Date.now(),
      name,
      type: 'study',
      days: buildDays(),
      topics: [],
    }])
  }

const toggleDay = (habitId, date) => {
  setHabits((prev) => prev.map((habit) =>
    habit.id !== habitId ? habit : {
      ...habit,
      days: habit.days.map((d) =>
        d.date !== date || d.completed ? d : { ...d, completed: true }
      ),
    }
  ))
}

  const deleteHabit = (habitId) => {
    setHabits((prev) => prev.filter((h) => h.id !== habitId))
  }

  const addTopic = (habitId, topicName) => {
    setHabits((prev) => prev.map((habit) =>
      habit.id !== habitId ? habit : {
        ...habit,
        topics: [...habit.topics, { id: Date.now(), name: topicName, progress: 0 }],
      }
    ))
  }

  const updateTopicProgress = (habitId, topicId, progress) => {
    setHabits((prev) => prev.map((habit) =>
      habit.id !== habitId ? habit : {
        ...habit,
        topics: habit.topics.map((t) =>
          t.id !== topicId ? t : { ...t, progress: Number(progress) }
        ),
      }
    ))
  }

  return { habits, addHabit, addStudyHabit, toggleDay, deleteHabit, addTopic, updateTopicProgress }
}

export default useHabits