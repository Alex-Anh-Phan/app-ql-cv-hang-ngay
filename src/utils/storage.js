const STORAGE_KEY_TASKS = 'deepwork_orbit_tasks';
const STORAGE_KEY_SETTINGS = 'deepwork_orbit_settings';

export const storage = {
  getTasks: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY_TASKS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading tasks from localStorage:', error);
      return null;
    }
  },

  setTasks: (tasks) => {
    try {
      localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error writing tasks to localStorage:', error);
    }
  },

  getSettings: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY_SETTINGS);
      return data ? JSON.parse(data) : { alarmSound: true, pushNotifications: false };
    } catch (error) {
      console.error('Error reading settings from localStorage:', error);
      return { alarmSound: true, pushNotifications: false };
    }
  },

  setSettings: (settings) => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error writing settings to localStorage:', error);
    }
  }
};
