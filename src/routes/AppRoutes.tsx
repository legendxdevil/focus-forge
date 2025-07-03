import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Loader from '../components/ui/Loader'

const Dashboard = lazy(() => import('../pages/Dashboard'))
const Tasks = lazy(() => import('../pages/Tasks'))
const Pomodoro = lazy(() => import('../pages/Pomodoro'))
const Notes = lazy(() => import('../pages/Notes'))
const Settings = lazy(() => import('../pages/Settings'))

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes