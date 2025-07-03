import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Play, Pause, RefreshCw, Clock, Timer, Target } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { PomodoroSettings } from '@/types'
import TimePicker from '../components/ui/TimePicker'

type Mode = 'pomodoro' | 'stopwatch' | 'focus'

const Pomodoro: React.FC = () => {
  // TimePicker modal state
  const [showTimePicker, setShowTimePicker] = useState(false)

  // Focus mode duration (in minutes) input
  const [focusDuration, setFocusDuration] = useState(50) // default 50 min
  const [focusInput, setFocusInput] = useState('50') // for input field

  // Default settings with more robust initialization
  // Pomodoro timer settings
const [settings, setSettings] = useLocalStorage<PomodoroSettings>('pomodoroSettings', {
  workDuration: 25,
  breakDuration: 5,
  longBreakDuration: 15,
  sessionsBeforeLongBreak: 4
})

// --- Sync with global appSettings (from Settings page) ---
useEffect(() => {
  // Read appSettings from localStorage
  const appSettingsRaw = localStorage.getItem('appSettings');
  if (!appSettingsRaw) return;
  try {
    const appSettings = JSON.parse(appSettingsRaw);
    // Only update if values actually changed
    setSettings(prev => {
      let changed = false;
      const newSettings = { ...prev };
      if (typeof appSettings.defaultPomodoroWorkDuration === 'number' && appSettings.defaultPomodoroWorkDuration !== prev.workDuration) {
        newSettings.workDuration = appSettings.defaultPomodoroWorkDuration;
        changed = true;
      }
      if (typeof appSettings.defaultBreakDuration === 'number' && appSettings.defaultBreakDuration !== prev.breakDuration) {
        newSettings.breakDuration = appSettings.defaultBreakDuration;
        changed = true;
      }
      // Optionally sync longBreakDuration, sessionsBeforeLongBreak if present in appSettings
      if (typeof appSettings.defaultLongBreakDuration === 'number' && appSettings.defaultLongBreakDuration !== prev.longBreakDuration) {
        newSettings.longBreakDuration = appSettings.defaultLongBreakDuration;
        changed = true;
      }
      if (typeof appSettings.defaultSessionsBeforeLongBreak === 'number' && appSettings.defaultSessionsBeforeLongBreak !== prev.sessionsBeforeLongBreak) {
        newSettings.sessionsBeforeLongBreak = appSettings.defaultSessionsBeforeLongBreak;
        changed = true;
      }
      return changed ? newSettings : prev;
    });
  } catch {}
}, []); // Run once on mount

// Listen for appSettings changes (e.g. when user updates settings)
useEffect(() => {
  const onStorage = (e: StorageEvent) => {
    if (e.key === 'appSettings') {
      try {
        const appSettings = JSON.parse(e.newValue || '');
        setSettings(prev => {
          let changed = false;
          const newSettings = { ...prev };
          if (typeof appSettings.defaultPomodoroWorkDuration === 'number' && appSettings.defaultPomodoroWorkDuration !== prev.workDuration) {
            newSettings.workDuration = appSettings.defaultPomodoroWorkDuration;
            changed = true;
          }
          if (typeof appSettings.defaultBreakDuration === 'number' && appSettings.defaultBreakDuration !== prev.breakDuration) {
            newSettings.breakDuration = appSettings.defaultBreakDuration;
            changed = true;
          }
          if (typeof appSettings.defaultLongBreakDuration === 'number' && appSettings.defaultLongBreakDuration !== prev.longBreakDuration) {
            newSettings.longBreakDuration = appSettings.defaultLongBreakDuration;
            changed = true;
          }
          if (typeof appSettings.defaultSessionsBeforeLongBreak === 'number' && appSettings.defaultSessionsBeforeLongBreak !== prev.sessionsBeforeLongBreak) {
            newSettings.sessionsBeforeLongBreak = appSettings.defaultSessionsBeforeLongBreak;
            changed = true;
          }
          return changed ? newSettings : prev;
        });
      } catch {}
    }
  };
  window.addEventListener('storage', onStorage);
  return () => window.removeEventListener('storage', onStorage);
}, []);

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
  // For stopwatch mode (in centiseconds for decimals)
  const [stopwatchTime, setStopwatchTime] = useState(0) // in centiseconds (1/100th sec)

  // --- Alarm Sound Logic ---
  // --- Persistent Alarm for Pomodoro Mode ---
  const alarmRef = React.useRef<HTMLAudioElement | null>(null);

  const playPersistentAlarm = useCallback(() => {
    if (!alarmRef.current) {
      const audio = new Audio('/mixkit-happy-bells-notification-937.wav');
      audio.loop = true;
      alarmRef.current = audio;
    }
    alarmRef.current.currentTime = 0;
    alarmRef.current.play();
  }, []);

  const stopPersistentAlarm = useCallback(() => {
    if (alarmRef.current) {
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
      alarmRef.current = null;
    }
  }, []);

  // Single play for focus/stopwatch
  const playAlarm = useCallback(() => {
    try {
      const audio = new Audio('/mixkit-happy-bells-notification-937.wav');
      audio.play();
    } catch (e) {}
  }, []);

  // --- Focus session completion alarm control ---
  const focusAlarmPlayedRef = React.useRef(false);

  // --- Alarm trigger effect ---
  useEffect(() => {
    // Pomodoro mode: persistent alarm until user interacts
    if (mode === 'pomodoro') {
      if (timeLeft === 0 && isRunning) {
        playPersistentAlarm();
      } else {
        stopPersistentAlarm();
      }
    } else {
      // Stop alarm if not in Pomodoro mode
      stopPersistentAlarm();
    }
    // Focus mode: play sound when session completes (timer reaches 0)
    if (mode === 'focus') {
      if (timeLeft === 0 && !focusAlarmPlayedRef.current) {
        playAlarm();
        focusAlarmPlayedRef.current = true;
      }
      if (timeLeft > 0) {
        focusAlarmPlayedRef.current = false;
      }
    } else {
      focusAlarmPlayedRef.current = false;
    }
    // Stopwatch mode: (optional)
    // if (mode === 'stopwatch' && isRunning && timeLeft >= 59 * 60 + 59) {
    //   playAlarm();
    // }
  }, [mode, timeLeft, isRunning, playPersistentAlarm, stopPersistentAlarm, playAlarm]);

  // Memoized timer modes for consistent rendering
  const timerModes = useMemo(() => [
    { name: 'pomodoro', icon: Clock },
    { name: 'stopwatch', icon: Timer },
    { name: 'focus', icon: Target }
  ], [])

  // Comprehensive timer management effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null
    let rafId: number | null = null
    let lastTimestamp: number | null = null

    if (isRunning) {
      if (mode === 'stopwatch') {
        // Use requestAnimationFrame for smooth stopwatch updates
        const step = (timestamp: number) => {
          if (!lastTimestamp) lastTimestamp = timestamp
          const diff = timestamp - lastTimestamp
          lastTimestamp = timestamp
          setStopwatchTime(prev => prev + Math.round(diff / 10)) // centiseconds
          rafId = requestAnimationFrame(step)
        }
        rafId = requestAnimationFrame(step)
      } else {
        interval = setInterval(() => {
          if (mode === 'pomodoro') {
            setTimeLeft(prevTime => {
              if (prevTime <= 0) {
                // Pomodoro session complete
                const newSessionsCompleted = sessionsCompleted + 1
                const nextIsWorkSession = !isWorkSession
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
              return prevTime - 1
            })
          } else if (mode === 'focus') {
            setTimeLeft(prevTime => {
              if (prevTime <= 0) {
                setIsRunning(false)
                return 0
              }
              return prevTime - 1
            })
          }
        }, 1000)
      }
    }

    return () => {
      if (interval) clearInterval(interval)
      if (rafId) cancelAnimationFrame(rafId)
      lastTimestamp = null
    }
  }, [isRunning, mode, sessionsCompleted, isWorkSession, settings])

  // Reset timer for current mode
  const resetTimer = useCallback(() => {
    setIsRunning(false)
    if (mode === 'pomodoro') {
      setIsWorkSession(true)
      setSessionsCompleted(0)
      setTimeLeft(settings.workDuration * 60)
    } else if (mode === 'stopwatch') {
      setStopwatchTime(0)
    } else if (mode === 'focus') {
      setTimeLeft(focusDuration * 60)
    }
  }, [mode, settings, focusDuration])

  // Mode change handler
  const handleModeChange = useCallback((newMode: Mode) => {
    setMode(newMode)
    setIsRunning(false)
    setSessionsCompleted(0)
    setIsWorkSession(true)
    if (newMode === 'pomodoro') {
      setTimeLeft(settings.workDuration * 60)
    } else if (newMode === 'stopwatch') {
      setStopwatchTime(0)
    } else if (newMode === 'focus') {
      setTimeLeft(focusDuration * 60)
    }
  }, [settings, focusDuration])

  // Toggle timer for current mode
  const toggleTimer = useCallback(() => {
    setIsRunning(prev => !prev)
  }, [])

  // Utility function to format time
  // Format stopwatch time as MM:SS:CC (centiseconds)
  const formatStopwatch = (centiseconds: number) => {
    const totalSeconds = Math.floor(centiseconds / 100)
    const cs = centiseconds % 100
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${cs.toString().padStart(2, '0')}`
  }

  // Format normal timer as MM:SS
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
            <div className="text-6xl font-bold mb-6 text-focus-accent font-mono" style={{width:'8.5ch',letterSpacing:'0.05em'}}>
              {formatStopwatch(stopwatchTime)}
            </div>
            <div className="text-lg mb-4 text-gray-600 dark:text-gray-300">
              Stopwatch
            </div>
          </>
        )
      case 'focus':
        return (
          <>
            {showTimePicker && (
              <TimePicker
                initialMinutes={Math.floor(timeLeft / 60)}
                initialSeconds={timeLeft % 60}
                onConfirm={(min, sec) => {
                  setFocusDuration(min)
                  setTimeLeft(min * 60 + sec)
                  setShowTimePicker(false)
                }}
                onCancel={() => setShowTimePicker(false)}
              />
            )}
            <div className="mb-4">
              <span className="text-gray-600 dark:text-gray-300">Set your focus time</span>
            </div>
            <div
              className="text-6xl font-bold mb-6 text-focus-accent cursor-pointer select-none font-mono"
              style={{width:'8.5ch',letterSpacing:'0.05em'}}
              onClick={() => !isRunning && setShowTimePicker(true)}
              title="Click to set time"
            >
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