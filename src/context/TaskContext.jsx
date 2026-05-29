import React, { createContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { initialTasks } from '../utils/mockData';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // State for tasks
  const [tasks, setTasksState] = useState([]);
  
  // State for settings
  const [settings, setSettingsState] = useState({ alarmSound: true, pushNotifications: false });

  // 1. Initial Load
  useEffect(() => {
    // Load tasks
    const storedTasks = storage.getTasks();
    if (storedTasks && storedTasks.length > 0) {
      setTasksState(storedTasks);
    } else {
      // First-time load: seed with gorgeous mock data
      setTasksState(initialTasks);
      storage.setTasks(initialTasks);
    }

    // Load settings
    const storedSettings = storage.getSettings();
    setSettingsState(storedSettings);
  }, []);

  // 2. Custom setters that auto-sync to LocalStorage
  const setTasks = (newTasks) => {
    setTasksState(newTasks);
    storage.setTasks(newTasks);
  };

  const setSettings = (newSettings) => {
    setSettingsState(newSettings);
    storage.setSettings(newSettings);
  };

  // 3. CRUD API Implementation
  const addTask = (taskData) => {
    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: taskData.title || 'Untitled Task',
      description: taskData.description || '',
      quadrant: Number(taskData.quadrant) || 1,
      isCompleted: false,
      dueDate: taskData.dueDate || null,
      badgeText: taskData.badgeText || '',
      badgeType: taskData.badgeType || '',
      metaText: taskData.metaText || '',
      createdAt: new Date().toISOString(),
      ...taskData
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    return newTask;
  };

  const updateTask = (id, updatedFields) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...updatedFields } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const moveTask = (id, targetQuadrant) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, quadrant: Number(targetQuadrant) } : task
    );
    setTasks(updatedTasks);
  };

  const toggleTaskComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  const updateSettings = (newSettingsFields) => {
    const updatedSettings = { ...settings, ...newSettingsFields };
    setSettings(updatedSettings);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        settings,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        toggleTaskComplete,
        updateSettings
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
