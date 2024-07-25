import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateTask from './CreateTask';
import Column from './Column';
import { STATUSES } from '../(root)/constant'; // Adjust the path as needed

const TaskList = () => {
  const [tasks, setTasks] = useState({
    [STATUSES.APPLICATION]: [],
    [STATUSES.REJECTION]: [],
    [STATUSES.GHOST]: [],
    [STATUSES.INTERVIEW]: [],
    [STATUSES.BREAKDOWN]: [],
    [STATUSES.OFFERS]: [],
  });
  const [dragEnabled, setDragEnabled] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const result = await axios.get('/api/tasks');
    const fetchedTasks = result.data.data.reduce((acc, task) => {
      acc[task.status].push(task);
      return acc;
    }, {
    [STATUSES.APPLICATION]: [],
    [STATUSES.REJECTION]: [],
    [STATUSES.GHOST]: [],
    [STATUSES.INTERVIEW]: [],
    [STATUSES.BREAKDOWN]: [],
    [STATUSES.OFFERS]: [],
    });
    setTasks(fetchedTasks);
  };

  const addTask = async (taskName) => {
    const newTask = {
      name: taskName,
      status: STATUSES.APPLICATION,
    };
    setDragEnabled(false);
    await axios.post('/api/tasks', newTask);
    fetchTasks();
    // Add a delay before re-enabling drag-and-drop
    setTimeout(() => setDragEnabled(true), 500);
  };

  const handleDropTask = async (taskId, newStatus) => {
    const taskToUpdate = Object.values(tasks).flat().find(task => task._id === taskId);
    if (!taskToUpdate) {
      return;
    }
    taskToUpdate.status = newStatus;
    await axios.put(`/api/tasks/${taskToUpdate._id}`, taskToUpdate);
    fetchTasks();
  };

  const deleteTask = async (taskId) => {
    await axios.delete(`/api/tasks/${taskId}`);
    fetchTasks();
  };

  return (
    <div className="p-10">
      <CreateTask onAddTask={addTask} fetchTasks={fetchTasks} />
      <div className="flex space-x-4 mt-6">
        <Column 
          status={STATUSES.APPLICATION} 
          tasks={tasks[STATUSES.APPLICATION]} 
          onDropTask={handleDropTask} 
          onDeleteTask={deleteTask} 
          dragEnabled={dragEnabled}
        />
        <Column 
          status={STATUSES.REJECTION} 
          tasks={tasks[STATUSES.REJECTION]} 
          onDropTask={handleDropTask} 
          onDeleteTask={deleteTask} 
          dragEnabled={dragEnabled}
        />
        <Column 
          status={STATUSES.GHOST} 
          tasks={tasks[STATUSES.GHOST]} 
          onDropTask={handleDropTask} 
          onDeleteTask={deleteTask} 
          dragEnabled={dragEnabled}
        />
        <Column 
          status={STATUSES.INTERVIEW} 
          tasks={tasks[STATUSES.INTERVIEW]} 
          onDropTask={handleDropTask} 
          onDeleteTask={deleteTask} 
          dragEnabled={dragEnabled}
        />
        <Column 
          status={STATUSES.BREAKDOWN} 
          tasks={tasks[STATUSES.BREAKDOWN]} 
          onDropTask={handleDropTask} 
          onDeleteTask={deleteTask} 
          dragEnabled={dragEnabled}
        />
        <Column 
          status={STATUSES.OFFERS} 
          tasks={tasks[STATUSES.OFFERS]} 
          onDropTask={handleDropTask} 
          onDeleteTask={deleteTask} 
          dragEnabled={dragEnabled}
        />
      </div>
    </div>
  );
};

export default TaskList;
