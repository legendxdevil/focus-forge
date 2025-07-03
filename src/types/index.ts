export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
  updatedAt: Date
}

export interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  tags?: string[]
}

export interface PomodoroSettings {
  workDuration: number
  breakDuration: number
  longBreakDuration: number
  sessionsBeforeLongBreak: number
}