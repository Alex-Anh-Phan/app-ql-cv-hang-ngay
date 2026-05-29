import React, { useState, useMemo } from 'react';
import {
  LayoutGrid, BarChart2, Timer, Archive,
  Settings, HelpCircle, Search, Plus,
  Zap, Calendar, UserPlus, Trash2,
} from 'lucide-react';
import { useTasks } from './hooks/useTasks';
import Quadrant from './components/Quadrant';
import TaskModal from './components/TaskModal';
import './App.css';

// Map each quadrant to its icon component
const QUADRANT_ICONS = { 1: Zap, 2: Calendar, 3: UserPlus, 4: Trash2 };

export default function App() {
  const { tasks } = useTasks();

  // Modal state
  const [modalOpen, setModalOpen]           = useState(false);
  const [defaultQuadrant, setDefaultQuadrant] = useState(1);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Stats: today's focus score = % of Q1+Q2 tasks completed
  const focusScore = useMemo(() => {
    const priorityTasks = tasks.filter(t => t.quadrant === 1 || t.quadrant === 2);
    if (priorityTasks.length === 0) return 84;
    const completed = priorityTasks.filter(t => t.isCompleted).length;
    return Math.round((completed / priorityTasks.length) * 100);
  }, [tasks]);

  const handleAddTask = (quadrantId) => {
    setDefaultQuadrant(quadrantId);
    setModalOpen(true);
  };

  const handleTopbarAdd = () => {
    setDefaultQuadrant(1);
    setModalOpen(true);
  };

  return (
    <div className="app-container">
      {/* 🧭 LEFT SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">
            <span className="brand-title">DeepWork Orbit</span>
            <span className="brand-subtitle">HIGH PERFORMANCE</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group">
            <a href="#dashboard" className="nav-link active">
              <LayoutGrid size={18} /><span>Dashboard</span>
            </a>
            <a href="#analytics" className="nav-link">
              <BarChart2 size={18} /><span>Analytics</span>
            </a>
            <a href="#focus" className="nav-link">
              <Timer size={18} /><span>Focus Mode</span>
            </a>
            <a href="#archive" className="nav-link">
              <Archive size={18} /><span>Archive</span>
            </a>
          </div>
        </nav>

        <div className="upgrade-card">
          <h4>Upgrade to Pro</h4>
          <p>Unlock advanced analytics and infinite focus sessions.</p>
          <button className="upgrade-btn">UPGRADE NOW</button>
        </div>

        <div className="sidebar-footer">
          <a href="#settings" className="nav-link">
            <Settings size={18} /><span>Settings</span>
          </a>
          <a href="#support" className="nav-link">
            <HelpCircle size={18} /><span>Support</span>
          </a>
        </div>
      </aside>

      {/* 🖥️ MAIN WORKSPACE */}
      <main className="main-content">
        {/* 🔍 Topbar */}
        <header className="topbar">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="topbar-actions">
            <button className="add-task-btn" onClick={handleTopbarAdd}>
              <Plus size={15} /><span>Add Task</span>
            </button>

            <div className="user-profile">
              <div className="user-info">
                <span className="user-name">Alex Rivera</span>
                <span className="user-focus">Focus Level: High</span>
              </div>
              <div className="user-avatar">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&q=80"
                  alt="User avatar"
                />
              </div>
            </div>
          </div>
        </header>

        {/* ⚡ Title Section */}
        <section className="workspace-header">
          <div className="title-area">
            <h1>Workspace Priority</h1>
            <p>Strategic alignment based on the Eisenhower Matrix.</p>
          </div>
          <div className="system-status-badge">
            <span className="status-dot" />
            <span>SYSTEM STATUS: OPTIMIZED</span>
          </div>
        </section>

        {/* 🔲 Eisenhower Grid */}
        <section className="eisenhower-grid">
          {[1, 2, 3, 4].map((qId) => (
            <Quadrant
              key={qId}
              quadrantId={qId}
              icon={QUADRANT_ICONS[qId]}
              onAddTask={handleAddTask}
            />
          ))}
        </section>

        {/* 📈 Floating Stats Badge */}
        <div className="floating-stats-badge">
          <div className="stats-info">
            <span className="stats-label">TODAY'S FOCUS</span>
            <span className="stats-value">{focusScore}%</span>
          </div>
          <div className={`stats-rank ${focusScore >= 80 ? 'rank-a' : focusScore >= 60 ? 'rank-b' : 'rank-c'}`}>
            {focusScore >= 80 ? 'A+' : focusScore >= 60 ? 'B' : 'C'}
          </div>
        </div>
      </main>

      {/* 📝 Task Modal */}
      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultQuadrant={defaultQuadrant}
      />
    </div>
  );
}
