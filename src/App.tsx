import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import ThemeProvider from './contexts/ThemeContext'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/layout/Navbar'

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <ThemeProvider>
      <Router>
        <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
          <Navbar />
          <AppRoutes />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App