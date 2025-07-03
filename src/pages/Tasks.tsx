import React, { useState } from 'react'
import { PlusIcon, TrashIcon, CheckIcon } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Task } from '@/types'
import { v4 as uuidv4 } from 'uuid'

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [])
  const [newTask, setNewTask] = useState<string>('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: uuidv4(),
        title: newTask,
        completed: false,
        priority: 'medium',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setTasks([...tasks, task])
      setNewTask('')
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed, updatedAt: new Date() } : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-focus-primary dark:text-white">
        Tasks
      </h1>
      
      <div className="flex mb-4">
        <input 
          type="text" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task" 
          className="flex-grow p-2 border rounded-l dark:bg-gray-800 dark:border-gray-700"
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button 
          onClick={addTask}
          className="bg-focus-accent text-white p-2 rounded-r hover:bg-opacity-90"
        >
          <PlusIcon size={24} />
        </button>
      </div>

      <div className="flex justify-center mb-4 space-x-2">
        {['all', 'active', 'completed'].map(filterType => (
          <button 
            key={filterType}
            onClick={() => setFilter(filterType as 'all' | 'active' | 'completed')}
            className={`px-4 py-2 rounded ${
              filter === filterType 
                ? 'bg-focus-accent text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filteredTasks.map(task => (
          <div 
            key={task.id} 
            className="flex items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm"
          >
            <button 
              onClick={() => toggleTask(task.id)}
              className={`mr-4 ${
                task.completed 
                  ? 'text-green-500' 
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            >
              <CheckIcon size={24} />
            </button>
            <span 
              className={`flex-grow ${
                task.completed 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-800 dark:text-white'
              }`}
            >
              {task.title}
            </span>
            <button 
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              <TrashIcon size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tasks