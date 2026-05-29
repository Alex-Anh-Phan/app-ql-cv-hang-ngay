import React from 'react';
import { CheckCircle2, Circle, Trash2, GripVertical } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import './TaskCard.css';

const BADGE_CONFIG = {
  overdue:  { className: 'badge-overdue' },
  plan:     { className: 'badge-plan' },
  draft:    { className: 'badge-draft' },
  delegate: { className: 'badge-delegate' },
  low:      { className: 'badge-low' },
  ticket:   { className: 'badge-ticket' },
  default:  { className: 'badge-default' },
};

export default function TaskCard({ task, quadrantId }) {
  const { toggleTaskComplete, deleteTask } = useTasks();

  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.effectAllowed = 'move';
    // Add drag ghost effect
    e.currentTarget.classList.add('dragging');
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('dragging');
  };

  const badgeConfig = BADGE_CONFIG[task.badgeType] || BADGE_CONFIG.default;
  const isOverdue = task.badgeType === 'overdue';

  const formatRelativeTime = (isoDate) => {
    if (!isoDate) return null;
    const diff = Date.now() - new Date(isoDate).getTime();
    const hours = Math.floor(Math.abs(diff) / (1000 * 60 * 60));
    const minutes = Math.floor(Math.abs(diff) / (1000 * 60));
    if (diff > 0) {
      if (hours >= 24) return `${Math.floor(hours / 24)}d ago`;
      if (hours >= 1) return `${hours}h ago`;
      return `${minutes}m ago`;
    }
    return null;
  };

  return (
    <div
      className={`task-card glass-card ${task.isCompleted ? 'completed' : ''} ${isOverdue ? 'overdue-card' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Drag Handle */}
      <div className="task-drag-handle">
        <GripVertical size={14} />
      </div>

      {/* Checkbox */}
      <button
        className={`task-checkbox q${quadrantId}-check ${task.isCompleted ? 'checked' : ''}`}
        onClick={() => toggleTaskComplete(task.id)}
        title={task.isCompleted ? 'Mark as pending' : 'Mark as done'}
      >
        {task.isCompleted ? <CheckCircle2 size={12} /> : <Circle size={12} />}
      </button>

      {/* Content */}
      <div className="task-content">
        <h3 className={`task-title ${task.isCompleted ? 'completed-text' : ''}`}>
          {task.title}
        </h3>

        {/* Meta badges row */}
        {(task.badgeText || task.metaText || task.dueDate) && (
          <div className="task-meta">
            {task.badgeText && (
              <span className={`badge ${badgeConfig.className}`}>
                {task.badgeText}
              </span>
            )}
            {task.metaText && (
              <span className="meta-text">{task.metaText}</span>
            )}
            {task.dueDate && !task.isCompleted && formatRelativeTime(task.dueDate) && (
              <span className="time-text">⏰ {formatRelativeTime(task.dueDate)}</span>
            )}
          </div>
        )}
      </div>

      {/* Delete button */}
      <button
        className="task-delete-btn"
        onClick={() => deleteTask(task.id)}
        title="Delete task"
      >
        <Trash2 size={13} />
      </button>
    </div>
  );
}
