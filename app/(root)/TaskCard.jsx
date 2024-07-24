import React from 'react';
import { useDrag } from 'react-dnd';
import { FaTrash } from 'react-icons/fa';

const TaskCard = ({ task, onDelete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task._id, name: task.name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`flex items-center justify-between p-4 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-md ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <span className="text-gray-800 dark:text-gray-200">{task.name}</span>
      <button onClick={() => onDelete(task._id)} className="text-red-500">
        <FaTrash />
      </button>
    </div>
  );
};

export default TaskCard;
