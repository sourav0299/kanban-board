import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';

const Column = ({ status, tasks, onDropTask, onDeleteTask }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item) => {
      console.log('Dropping task:', item.id, 'to status:', status);
      onDropTask(item.id, status);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`w-[20rem] p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md ${
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
