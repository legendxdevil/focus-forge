import React from 'react'
import { 
  CheckSquare, 
  Clock, 
  FileText, 
  TrendingUp 
} from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Task, Note } from '@/types'

const Dashboard: React.FC = () => {
  const [tasks] = useLocalStorage<Task[]>('tasks', [])
  const [notes] = useLocalStorage<Note[]>('notes', [])

  const completedTasksCount = tasks.filter(task => task.completed).length
  const totalTasksCount = tasks.length

  const recentNotes = notes
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-focus-primary dark:text-white">
        Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tasks Overview Widget */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <CheckSquare className="mr-3 text-focus-accent" size={24} />
            <h2 className="text-xl font-semibold text-focus-primary dark:text-white">
              Task Progress
            </h2>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-focus-accent mb-2">
              {completedTasksCount}/{totalTasksCount}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Tasks Completed
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-4">
              <div 
                className="bg-focus-accent h-2.5 rounded-full" 
                style={{ 
                  width: `${totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0}%` 
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Pomodoro Statistics Widget */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Clock className="mr-3 text-focus-accent" size={24} />
            <h2 className="text-xl font-semibold text-focus-primary dark:text-white">
              Focus Time
            </h2>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-focus-accent mb-2">
              25
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Minutes Focused Today
            </p>
            <div className="mt-4 flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Avg. Daily Focus</span>
              <span>75%</span>
            </div>
          </div>
        </div>

        {/* Recent Notes Widget */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FileText className="mr-3 text-focus-accent" size={24} />
            <h2 className="text-xl font-semibold text-focus-primary dark:text-white">
              Recent Notes
            </h2>
          </div>
          <div className="space-y-3">
            {recentNotes.length > 0 ? (
              recentNotes.map(note => (
                <div 
                  key={note.id} 
                  className="border-b last:border-b-0 pb-2 dark:border-gray-700"
                >
                  <h3 className="font-semibold text-focus-primary dark:text-white truncate">
                    {note.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                    {note.content}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center">
                No recent notes
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard