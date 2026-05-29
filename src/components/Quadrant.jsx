import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import TaskCard from './TaskCard';
import './Quadrant.css';

const QUADRANT_CONFIG = {
  1: { tag: 'Q1 • URGENT & IMPORTANT', title: 'Do Immediately', colorClass: 'q1', addLabel: 'ADD TASK TO Q1' },
  2: { tag: 'Q2 • IMPORTANT • NOT URGENT', title: 'Schedule & Plan', colorClass: 'q2', addLabel: 'ADD TASK TO Q2' },
  3: { tag: 'Q3 • URGENT • NOT IMPORTANT', title: 'Delegate Tasks', colorClass: 'q3', addLabel: 'ADD TASK TO Q3' },
  4: { tag: 'Q4 • NOT URGENT • NOT IMPORTANT', title: 'Eliminate & Drop', colorClass: 'q4', addLabel: 'ADD TASK TO Q4' },
};

export default function Quadrant({ quadrantId, icon: Icon, onAddTask }) {
  const { tasks, moveTask } = useTasks();
  const [isDragOver, setIsDragOver] = useState(false);

  const config = QUADRANT_CONFIG[quadrantId];
  const quadrantTasks = tasks.filter((t) => t.quadrant === quadrantId);

  // --- Drag & Drop Handlers ---
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    // Only trigger if leaving the quadrant entirely
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      moveTask(taskId, quadrantId);
    }
  };

  return (
    <div
      className={`quadrant-card glass-panel ${config.colorClass} ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div className="quadrant-header">
        <div className="quadrant-info">
          <span className="quadrant-tag">{config.tag}</span>
          <h2>{config.title}</h2>
        </div>
        {Icon && <Icon size={18} className="quadrant-icon" />}
      </div>

      {/* Task List */}
      <div className="task-list">
        {quadrantTasks.length === 0 ? (
          <div className="empty-state">
            <p>Drag tasks here or add a new one ✦</p>
          </div>
        ) : (
          quadrantTasks.map((task) => (
            <TaskCard key={task.id} task={task} quadrantId={quadrantId} />
          ))
        )}
      </div>

      {/* Add Task Button */}
      <button
        className="add-task-quadrant-btn"
        onClick={() => onAddTask(quadrantId)}
      >
        <Plus size={13} />
        {config.addLabel}
      </button>
    </div>
  );
}
