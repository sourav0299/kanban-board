import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';
import { STATUSES } from './constant';

const Column = ({ status, tasks, onDropTask, onDeleteTask }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item) => onDropTask(item.id, status), // Use `item.id` to identify the task
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`w-1/3 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md ${
        isOver ? 'bg-gray-200 dark:bg-gray-600' : ''
      }`}
    >
      <h2 className="text-xl font-bold mb-4 text-center">{status}</h2>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onDelete={onDeleteTask} />
      ))}
    </div>
  );
};

export default Column;