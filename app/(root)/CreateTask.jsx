import React from 'react'

const CreateTask = () => {
  return (
    <div className='flex flex-col items-center justify-center py-10'>
        <div className="text-center text-xl font-bold">
            Add Task      
          </div>
          <input type="text" placeholder="Enter task name" className="w-full px-4 py-2 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
        <button className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 rounded">
            Add Task
        </button>
    </div>
  )
}

export default CreateTask