"use client"
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskList from './(root)/Taskliast';

export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <TaskList />
      </div>
    </DndProvider>
  );
}
