import React, { useState, useEffect } from 'react';
import { X, Calendar, AlertCircle } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import './TaskModal.css';

const QUADRANT_LABELS = {
  1: { label: 'Q1 – Do Immediately', color: 'var(--q1-accent)' },
  2: { label: 'Q2 – Schedule & Plan', color: 'var(--q2-accent)' },
  3: { label: 'Q3 – Delegate Tasks', color: 'var(--q3-accent)' },
  4: { label: 'Q4 – Eliminate & Drop', color: 'var(--q4-accent)' },
};

export default function TaskModal({ isOpen, onClose, defaultQuadrant = 1, editTask = null }) {
  const { addTask, updateTask } = useTasks();

  const [form, setForm] = useState({
    title: '',
    description: '',
    quadrant: defaultQuadrant,
    dueDate: '',
  });
  const [errors, setErrors] = useState({});

  // Reset form when modal opens / editTask changes
  useEffect(() => {
    if (isOpen) {
      if (editTask) {
        setForm({
          title: editTask.title || '',
          description: editTask.description || '',
          quadrant: editTask.quadrant || defaultQuadrant,
          dueDate: editTask.dueDate ? editTask.dueDate.slice(0, 16) : '',
        });
      } else {
        setForm({ title: '', description: '', quadrant: defaultQuadrant, dueDate: '' });
      }
      setErrors({});
    }
  }, [isOpen, editTask, defaultQuadrant]);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Vui lòng nhập tiêu đề công việc';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const taskData = {
      title: form.title.trim(),
      description: form.description.trim(),
      quadrant: Number(form.quadrant),
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
      badgeText: '',
      badgeType: '',
    };

    if (editTask) {
      updateTask(editTask.id, taskData);
    } else {
      addTask(taskData);
    }

    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  const selectedQ = QUADRANT_LABELS[form.quadrant];

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-panel glass-panel">
        {/* Modal Header */}
        <div className="modal-header">
          <h3>{editTask ? 'Edit Task' : 'Add New Task'}</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="task-title">Task Title *</label>
            <input
              id="task-title"
              type="text"
              className={`form-input ${errors.title ? 'input-error' : ''}`}
              placeholder="What needs to be done?"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              autoFocus
            />
            {errors.title && (
              <span className="error-msg">
                <AlertCircle size={12} /> {errors.title}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="task-desc">Description</label>
            <textarea
              id="task-desc"
              className="form-input form-textarea"
              placeholder="Add more context (optional)..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
            />
          </div>

          {/* Quadrant Selector */}
          <div className="form-group">
            <label>Priority Quadrant</label>
            <div className="quadrant-selector">
              {[1, 2, 3, 4].map((q) => (
                <button
                  key={q}
                  type="button"
                  className={`q-option ${form.quadrant === q ? 'selected' : ''} q${q}-option`}
                  onClick={() => setForm({ ...form, quadrant: q })}
                >
                  <span className="q-num">Q{q}</span>
                  <span className="q-label">{QUADRANT_LABELS[q].label.split('–')[1].trim()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Due Date */}
          <div className="form-group">
            <label htmlFor="task-due">
              <Calendar size={13} /> Due Date & Alarm
            </label>
            <input
              id="task-due"
              type="datetime-local"
              className="form-input"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />
          </div>

          {/* Submit */}
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn-submit"
              style={{ '--q-color': selectedQ.color }}
            >
              {editTask ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
