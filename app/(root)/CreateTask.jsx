"use client";
import React, { useState } from 'react';

const CreateTask = ({ onAddTask, fetchTasks }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      await onAddTask(taskName);
      setTaskName('');
      fetchTasks(); // Refetch tasks to ensure proper state
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center py-10'>
      <div className="text-center text-xl font-bold py-4">
        Add Task
      </div>
      <div className="pb-4 w-full max-w-md">
        <input 
          type="text" 
          placeholder="Enter task name" 
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
        />
      </div>
      <button type="submit" className="bg-gray-400 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
};

export default CreateTask;
