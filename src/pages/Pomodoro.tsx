import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Play, Pause, RefreshCw, Clock, Timer, Target } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { PomodoroSettings } from '@/types'

type Mode = 'pomodoro' | 'stopwatch' | 'focus'

const Pomodoro: React.FC = () => {
  // Default settings with more robust initialization
  const [settings, setSettings] = useLocalStorage<PomodoroSettings>('pomodoroSettings', {
    workDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
    sessionsBeforeLongBreak: 4
  })

  // Comprehensive state management
  const [mode, setMode] = useState<Mode>('pomodoro')
  const [isRunning, setIsRunning] = useState(false)
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const [isWorkSession, setIsWorkSession] = useState(true)

  // Time calculation based on current mode and session type
  const calculateInitialTime = useCallback(() => {
    switch (mode) {
      case 'pomodoro':
        return isWorkSession 
          ? settings.workDuration * 60 
          : (sessionsCompleted % settings.sessionsBeforeLongBreak === 0 
            ? settings.longBreakDuration * 60 
            : settings.breakDuration * 60)
      case 'stopwatch':
      case 'focus':
        return 0
      default:
        return settings.workDuration * 60
    }
  }, [mode, isWorkSession, sessionsCompleted, settings])

  const [timeLeft, setTimeLeft] = useState(calculateInitialTime())

  // Memoized timer modes for consistent rendering
  const timerModes = useMemo(() => [
    { name: 'pomodoro', icon: Clock },
    { name: 'stopwatch', icon: Timer },
    { name: 'focus', icon: Target }
  ], [])

  // Comprehensive timer management effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null
    
    const handleTimerTick = () => {
      if (isRunning) {
        setTimeLeft(prevTime => {
          if (prevTime <= 0) {
            // Session complete logic for Pomodoro mode
            if (mode === 'pomodoro') {
              const newSessionsCompleted = sessionsCompleted + 1
              const nextIsWorkSession = !isWorkSession

              // Determine next session duration
              const newDuration = nextIsWorkSession 
                ? settings.workDuration * 60 
                : (newSessionsCompleted % settings.sessionsBeforeLongBreak === 0 
                  ? settings.longBreakDuration * 60 
                  : settings.breakDuration * 60)

              setSessionsCompleted(newSessionsCompleted)
              setIsWorkSession(nextIsWorkSession)
              setIsRunning(false)
              return newDuration
            }
            
            // For stopwatch and focus modes, reset or stop
            setIsRunning(false)
            return 0
          }
          return prevTime - 1
        })
      }
    }

    if (isRunning) {
      interval = setInterval(handleTimerTick, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, mode, sessionsCompleted, isWorkSession, settings])

  // Reset timer for current mode
  const resetTimer = useCallback(() => {
    const initialTime = calculateInitialTime()
    setTimeLeft(initialTime)
    setIsRunning(false)
    
    if (mode === 'pomodoro') {
      setIsWorkSession(true)
      setSessionsCompleted(0)
    }
  }, [mode, calculateInitialTime])

  // Mode change handler
  const handleModeChange = useCallback((newMode: Mode) => {
    setMode(newMode)
    
    // Reset state when changing modes
    setIsRunning(false)
    setSessionsCompleted(0)
    setIsWorkSession(true)
    
    // Calculate and set initial time for new mode
    const initialTime = mode === 'pomodoro' 
      ? settings.workDuration * 60 
      : 0
    
    setTimeLeft(initialTime)
  }, [mode, settings])

  // Toggle timer for current mode
  const toggleTimer = useCallback(() => {
    setIsRunning(prev => !prev)
  }, [])

  // Utility function to format time
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours > 0 ? `${hours.toString().padStart(2, '0')}:` : ''}${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Render timer content based on current mode
  const renderModeContent = () => {
    switch (mode) {
      case 'pomodoro':
        return (
          <>
            <div className="text-6xl font-bold mb-6 text-focus-accent">
              {formatTime(timeLeft)}
            </div>
            <div className="text-lg mb-4 text-gray-600 dark:text-gray-300">
              {isWorkSession ? 'Work Session' : 'Break Time'}
            </div>
          </>
        )
      case 'stopwatch':
        return (
          <>
            <div className="text-6xl font-bold mb-6 text-focus-accent">
              {formatTime(timeLeft)}
            </div>
            <div className="text-lg mb-4 text-gray-600 dark:text-gray-300">
              Stopwatch
            </div>
          </>
        )
      case 'focus':
        return (
          <>
            <div className="text-6xl font-bold mb-6 text-focus-accent">
              {formatTime(timeLeft)}
            </div>
            <div className="text-lg mb-4 text-gray-600 dark:text-gray-300">
              Focus Mode
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-focus-primary dark:text-white">
        Productivity Tracker
      </h1>
      
      {/* Sub Navigation */}
      <div className="flex space-x-4 mb-6">
        {timerModes.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => handleModeChange(name as Mode)}
            className={`px-4 py-2 rounded-full flex items-center ${
              mode === name 
                ? 'bg-focus-accent text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Icon size={20} className="mr-2" />
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        {renderModeContent()}
        
        <div className="flex justify-center space-x-4">
          <button 
            onClick={toggleTimer} 
            className="bg-focus-accent text-white p-3 rounded-full hover:bg-opacity-90"
          >
            {isRunning ? <Pause size={24} /> : <Play size={24} />}
          </button>
          
          <button 
            onClick={resetTimer} 
            className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-3 rounded-full hover:bg-opacity-90"
          >
            <RefreshCw size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pomodoro