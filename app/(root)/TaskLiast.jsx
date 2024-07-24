// TaskList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateTask from './CreateTask';
import Column from './Column';
import { STATUSES } from './constant';

const TaskList = () => {
  const [tasks, setTasks] = useState({
    [STATUSES.TODO]: [],
    [STATUSES.IN_PROGRESS]: [],
    [STATUSES.DONE]: [],
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const result = await axios.get('/api/tasks');
      const fetchedTasks = result.data.data.reduce((acc, task) => {
        acc[task.status].push(task);
        return acc;
      }, {
        [STATUSES.TODO]: [],
        [STATUSES.IN_PROGRESS]: [],
        [STATUSES.DONE]: [],
      });
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, []);

  const addTask = async (taskName) => {
    const newTask = {
      name: taskName,
      status: STATUSES.TODO,
    };
    const result = await axios.post('/api/tasks', newTask);
    setTasks({
      ...tasks,
      [STATUSES.TODO]: [...tasks[STATUSES.TODO], result.data.data],
    });
  };

  const handleDropTask = async (taskName, status) => {
    const updatedTasks = { ...tasks };
    const task = Object.values(updatedTasks).flat().find(task => task.name === taskName);
    if (task) {
      task.status = status;
      await axios.put(`/api/tasks/${task._id}`, task);
      Object.keys(updatedTasks).forEach((key) => {
        updatedTasks[key] = updatedTasks[key].filter((task) => task.name !== taskName);
      });
      updatedTasks[status].push(task);
      setTasks(updatedTasks);
    }
  };

const deleteTask = async (taskId) => {
  await axios.delete(`/api/tasks/${taskId}`);
  const updatedTasks = { ...tasks };
  Object.keys(updatedTasks).forEach((key) => {
    updatedTasks[key] = updatedTasks[key].filter((task) => task._id !== taskId);
  });
  setTasks(updatedTasks);
};

  return (
    <div className="p-10">
      <CreateTask onAddTask={addTask} />
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
