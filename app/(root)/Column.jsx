import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';

const Column = ({ status, tasks, onDropTask, onDeleteTask, dragEnabled }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item) => onDropTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [dragEnabled]); // Reapply useDrop when dragEnabled changes

  return (
    <div
      ref={dragEnabled ? drop : null} // Disable drop if dragEnabled is false
      className={`w-[14.3rem] p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md ${
        isOver ? 'bg-gray-200 dark:bg-gray-600' : ''
      }`}
    >
      <h3 className="text-lg font-bold mb-4 text-center">{status} ({tasks.length})</h3>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onDelete={onDeleteTask} />
      ))}
    </div>
  );
};

export default Column;
