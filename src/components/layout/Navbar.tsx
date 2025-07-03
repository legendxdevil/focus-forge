import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Home, 
  CheckSquare, 
  Clock, 
  FileText, 
  Settings, 
  Moon, 
  Sun 
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: Clock, label: 'Pomodoro', path: '/pomodoro' },
    { icon: FileText, label: 'Notes', path: '/notes' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-focus-primary dark:hover:text-white transition-colors"
          >
            <item.icon size={24} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
        <button 
          onClick={toggleTheme} 
          className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-focus-primary dark:hover:text-white transition-colors"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          <span className="text-xs mt-1">{isDarkMode ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar