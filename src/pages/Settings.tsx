import React, { useState } from 'react'
import { 
  Settings as SettingsIcon, 
  Palette, 
  Bell, 
  Clock, 
  Moon, 
  Sun 
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface AppSettings {
  notifications: boolean
  soundEffects: boolean
  defaultPomodoroWorkDuration: number
  defaultBreakDuration: number
}

const Settings: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme()
  const [settings, setSettings] = useLocalStorage<AppSettings>('appSettings', {
    notifications: true,
    soundEffects: true,
    defaultPomodoroWorkDuration: 25,
    defaultBreakDuration: 5
  })

  const handleSettingToggle = (key: keyof AppSettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleDurationChange = (key: keyof AppSettings, value: number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 flex items-center text-focus-primary dark:text-white">
        <SettingsIcon className="mr-3" size={32} /> App Settings
      </h1>

      <div className="space-y-6">
        {/* Theme Settings */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-focus-primary dark:text-white">
            <Palette className="mr-3" size={24} /> Theme
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
            <button 
              onClick={toggleTheme} 
              className="bg-focus-accent text-white px-4 py-2 rounded-full flex items-center"
            >
              {isDarkMode ? <Sun className="mr-2" size={20} /> : <Moon className="mr-2" size={20} />}
              Switch Theme
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-focus-primary dark:text-white">
            <Bell className="mr-3" size={24} /> Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">
                Enable Notifications
              </span>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.notifications}
                  onChange={() => handleSettingToggle('notifications')}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">
                Sound Effects
              </span>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.soundEffects}
                  onChange={() => handleSettingToggle('soundEffects')}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Pomodoro Settings */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-focus-primary dark:text-white">
            <Clock className="mr-3" size={24} /> Pomodoro Defaults
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">
                Work Session Duration
              </span>
              <div className="flex items-center">
                <input 
                  type="number" 
                  value={settings.defaultPomodoroWorkDuration}
                  onChange={(e) => handleDurationChange('defaultPomodoroWorkDuration', Number(e.target.value))}
                  min={10} 
                  max={60} 
                  className="w-20 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="ml-2 text-gray-600 dark:text-gray-400">minutes</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">
                Break Duration
              </span>
              <div className="flex items-center">
                <input 
                  type="number" 
                  value={settings.defaultBreakDuration}
                  onChange={(e) => handleDurationChange('defaultBreakDuration', Number(e.target.value))}
                  min={5} 
                  max={30} 
                  className="w-20 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="ml-2 text-gray-600 dark:text-gray-400">minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings