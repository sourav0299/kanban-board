"use client";
import { useState } from 'react';
import '../app/globals.css'
import CreateTask from './(root)/CreateTask';
import ListTasks from './(root)/ListTasks';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  return (
    <div className="text-center">
      <CreateTask task={tasks} setTasks={setTasks} />
      <ListTasks tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default HomePage;
