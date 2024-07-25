import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateTask from './CreateTask';
import Column from './Column';
import { STATUSES } from '../(root)/constant';

const TaskList = () => {
  const [tasks, setTasks] = useState({
    [STATUSES.TODO]: [],
    [STATUSES.IN_PROGRESS]: [],
    [STATUSES.DONE]: [],
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
  console.log('Fetching tasks');
  try {
    const result = await axios.get('/api/tasks');
    console.log('Fetched tasks from API:', result.data);
    const fetchedTasks = result.data.data.reduce((acc, task) => {
      acc[task.status].push(task);
      return acc;
    }, {
      [STATUSES.TODO]: [],
      [STATUSES.IN_PROGRESS]: [],
      [STATUSES.DONE]: [],
    });
    setTasks(fetchedTasks);
    console.log('Tasks fetched:', fetchedTasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};



const addTask = async (taskName) => {
  const newTask = {
    name: taskName,
    status: STATUSES.TODO,
  };
  console.log('Adding task:', newTask);
  await axios.post('/api/tasks', newTask);
  console.log('Task added, fetching tasks');
  await fetchTasks();
  // Add a delay to ensure state is updated before further actions
  setTimeout(() => {
    fetchTasks();
  }, 100);
};

 const handleDropTask = async (taskId, status) => {
  const updatedTasks = { ...tasks };
  const task = Object.values(updatedTasks).flat().find(task => task._id === taskId);
  if (task) {
    console.log('Found task to update:', task);
    task.status = status;
    try {
      console.log('Updating task status:', task);
      await axios.put(`/api/tasks/${task._id}`, task);
      console.log('Task updated, fetching tasks');
      await fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  } else {
    console.error('Task not found in the current state:', taskId);
  }
};



  const deleteTask = async (taskId) => {
    console.log('Deleting task:', taskId);
    await axios.delete(`/api/tasks/${taskId}`);
    console.log('Task deleted, fetching tasks');
    await fetchTasks();
  };

  return (
    <div className="p-10">
      <CreateTask onAddTask={addTask} fetchTasks={fetchTasks} />
      <div className="flex space-x-4 mt-6">
        <Column 
          status={STATUSES.TODO} 
          tasks={tasks[STATUSES.TODO]} 
          onDropTask={handleDropTask} 
          onDeleteTask={deleteTask} 
        />
        <Column 
          status={STATUSES.IN_PROGRESS} 
          tasks={tasks[STATUSES.IN_PROGRESS]} 
          onDropTask={handleDropTask} 
          onDeleteTask={deleteTask} 
        />
        <Column 
          status={STATUSES.DONE} 
          tasks={tasks[STATUSES.DONE]} 
          onDropTask={handleDropTask} 
          onDeleteTask={deleteTask} 
        />
      </div>
    </div>
  );
};

export default TaskList;
