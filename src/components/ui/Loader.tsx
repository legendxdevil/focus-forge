import React from 'react'

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-focus-accent"></div>
    </div>
  )
}

export default Loader