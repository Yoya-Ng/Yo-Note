// src/utils/store.js

// 本地存儲鍵
const PROJECTS_KEY = 'tenThousandHours_projects';
const TIME_ENTRIES_KEY = 'tenThousandHours_timeEntries';

// 初始化示範數據
const initializeData = () => {
  // 如果本地存儲中沒有數據，則創建示範數據
  if (!localStorage.getItem(PROJECTS_KEY)) {
    const sampleProjects = [
      {
        id: '1',
        name: '學習程式設計',
        startDate: '2023-01-01',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: '彈鋼琴',
        startDate: '2023-03-15',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        name: '寫作',
        startDate: '2023-06-20',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(sampleProjects));
  }

  if (!localStorage.getItem(TIME_ENTRIES_KEY)) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    const sampleTimeEntries = [
      {
        id: '1',
        projectId: '1',
        hours: 2.5,
        entryDate: today.toISOString().split('T')[0],
        description: '學習 React',
        createdAt: today.toISOString()
      },
      {
        id: '2',
        projectId: '1',
        hours: 1.5,
        entryDate: yesterday.toISOString().split('T')[0],
        description: '學習 JavaScript',
        createdAt: yesterday.toISOString()
      },
      {
        id: '3',
        projectId: '2',
        hours: 1,
        entryDate: today.toISOString().split('T')[0],
        description: '練習巴哈曲子',
        createdAt: today.toISOString()
      },
      {
        id: '4',
        projectId: '3',
        hours: 3,
        entryDate: lastWeek.toISOString().split('T')[0],
        description: '寫短篇小說',
        createdAt: lastWeek.toISOString()
      }
    ];
    localStorage.setItem(TIME_ENTRIES_KEY, JSON.stringify(sampleTimeEntries));
  }
};

// 生成唯一ID
const generateId = () => {
  return Date.now().toString();
};

// 獲取所有項目
export const getProjects = () => {
  if (typeof window === 'undefined') return [];
  
  initializeData();
  const projects = JSON.parse(localStorage.getItem(PROJECTS_KEY) || '[]');
  
  // 計算每個項目的總時數
  const timeEntries = JSON.parse(localStorage.getItem(TIME_ENTRIES_KEY) || '[]');
  
  return projects.map(project => {
    const projectEntries = timeEntries.filter(entry => entry.projectId === project.id);
    const totalHours = projectEntries.reduce((sum, entry) => sum + entry.hours, 0);
    return {
      ...project,
      totalHours
    };
  });
};

// 添加新項目
export const addProject = (project) => {
  if (typeof window === 'undefined') return null;
  
  const projects = getProjects();
  const newProject = {
    ...project,
    id: generateId(),
    createdAt: new Date().toISOString(),
    totalHours: 0
  };
  
  projects.push(newProject);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  
  return newProject;
};

// 更新項目
export const updateProject = (id, updatedData) => {
  if (typeof window === 'undefined') return null;
  
  let projects = JSON.parse(localStorage.getItem(PROJECTS_KEY) || '[]');
  const index = projects.findIndex(p => p.id === id);
  
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updatedData };
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    return { ...projects[index], totalHours: calculateProjectHours(id) };
  }
  
  return null;
};

// 刪除項目
export const deleteProject = (id) => {
  if (typeof window === 'undefined') return false;
  
  let projects = JSON.parse(localStorage.getItem(PROJECTS_KEY) || '[]');
  projects = projects.filter(p => p.id !== id);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  
  // 刪除相關的時間記錄
  let timeEntries = JSON.parse(localStorage.getItem(TIME_ENTRIES_KEY) || '[]');
  timeEntries = timeEntries.filter(entry => entry.projectId !== id);
  localStorage.setItem(TIME_ENTRIES_KEY, JSON.stringify(timeEntries));
  
  return true;
};

// 計算項目總時數
const calculateProjectHours = (projectId) => {
  if (typeof window === 'undefined') return 0;
  
  const timeEntries = JSON.parse(localStorage.getItem(TIME_ENTRIES_KEY) || '[]');
  const projectEntries = timeEntries.filter(entry => entry.projectId === projectId);
  return projectEntries.reduce((sum, entry) => sum + entry.hours, 0);
};

// 獲取項目的時間記錄
export const getTimeEntriesByProject = (projectId) => {
  if (typeof window === 'undefined') return [];
  
  const timeEntries = JSON.parse(localStorage.getItem(TIME_ENTRIES_KEY) || '[]');
  return timeEntries.filter(entry => entry.projectId === projectId);
};

// 添加時間記錄
export const addTimeEntry = (entry) => {
  if (typeof window === 'undefined') return null;
  
  const timeEntries = JSON.parse(localStorage.getItem(TIME_ENTRIES_KEY) || '[]');
  const newEntry = {
    ...entry,
    id: generateId(),
    createdAt: new Date().toISOString()
  };
  
  timeEntries.push(newEntry);
  localStorage.setItem(TIME_ENTRIES_KEY, JSON.stringify(timeEntries));
  
  return newEntry;
};

// 刪除時間記錄
export const deleteTimeEntry = (id) => {
  if (typeof window === 'undefined') return false;
  
  let timeEntries = JSON.parse(localStorage.getItem(TIME_ENTRIES_KEY) || '[]');
  timeEntries = timeEntries.filter(entry => entry.id !== id);
  localStorage.setItem(TIME_ENTRIES_KEY, JSON.stringify(timeEntries));
  
  return true;
};

// 獲取項目統計數據
export const getProjectStats = () => {
  if (typeof window === 'undefined') return [];
  
  const projects = getProjects();
  return projects.map(project => ({
    name: project.name,
    totalHours: project.totalHours,
    percentage: (project.totalHours / 10000) * 100
  }));
};