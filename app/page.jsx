'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
// Remove these alias imports:
import TaskStats from '../components/TaskStats';
import TaskItem from '../components/TaskItem';
import TaskFormModal from '../components/TaskFormModal';

const Task3DModel = dynamic(() => import('../components/Task3DModel'), { ssr: false });

const INITIAL_TASKS = [
  {
    id: 1,
    title: 'Design task management system',
    description: 'Structure responsive dashboard cards and color badges.',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2026-10-15',
  },
  {
    id: 2,
    title: 'Setup token based auth flow',
    description: 'Ensure route security, token refresh, and permissions.',
    priority: 'Medium',
    status: 'Todo',
    dueDate: '2026-09-01',
  },
  {
    id: 3,
    title: 'Document architecture specification',
    description: 'Add API documentation and flow diagrams.',
    priority: 'Low',
    status: 'Completed',
    dueDate: '2026-10-30',
  },
];

export default function Page() {
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setTheme] = useState('dark');

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Todo',
    dueDate: '',
  });

  // Load from local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme_pref');
    if (savedTheme) setTheme(savedTheme);

    const savedTasks = localStorage.getItem('app_tasks_v2');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch {
        setTasks(INITIAL_TASKS);
      }
    } else {
      setTasks(INITIAL_TASKS);
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('app_tasks_v2', JSON.stringify(tasks));
      localStorage.setItem('theme_pref', theme);
    }
  }, [tasks, theme, isLoaded]);

  const isDark = theme === 'dark';
  const themeColors = {
    bg: isDark ? '#0b0f19' : '#f8fafc',
    surface: isDark ? '#111827' : '#ffffff',
    surfaceSubtle: isDark ? '#1f2937' : '#f1f5f9',
    border: isDark ? '#374151' : '#e2e8f0',
    text: isDark ? '#f9fafb' : '#0f172a',
    textSecondary: isDark ? '#9ca3af' : '#64748b',
    primary: isDark ? '#38bdf8' : '#0284c7',
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const active = tasks.filter((t) => t.status === 'Todo' || t.status === 'In Progress').length;
  const overdue = tasks.filter(
    (t) => t.dueDate && t.dueDate < todayStr && t.status !== 'Completed'
  ).length;
  const completionRate = total > 0 ? completed / total : 0;

  const filteredTasks = tasks.filter((t) => {
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  const openNewTaskModal = () => {
    setEditingTaskId(null);
    setFormData({
      title: '',
      description: '',
      priority: 'Medium',
      status: 'Todo',
      dueDate: new Date().toISOString().split('T')[0],
    });
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTaskId(task.id);
    setFormData({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate || '',
    });
    setModalOpen(true);
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingTaskId) {
      setTasks(tasks.map((t) => (t.id === editingTaskId ? { ...t, ...formData } : t)));
    } else {
      setTasks([{ ...formData, id: Date.now() }, ...tasks]);
    }
    setModalOpen(false);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const cycleStatus = (id) => {
    const sequence = ['Todo', 'In Progress', 'Completed'];
    setTasks(
      tasks.map((t) => {
        if (t.id === id) {
          const nextIdx = (sequence.indexOf(t.status) + 1) % sequence.length;
          return { ...t, status: sequence[nextIdx] };
        }
        return t;
      })
    );
  };

  if (!isLoaded) return null;

  return (
    <div
      style={{
        backgroundColor: themeColors.bg,
        color: themeColors.text,
        minHeight: '100vh',
        padding: '2rem 1rem',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        
        {/* Navigation Bar */}
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: 0 }}>Mission Control</h1>
            <p style={{ margin: '0.25rem 0 0', color: themeColors.textSecondary, fontSize: '0.95rem' }}>
              Full-Stack Dynamic Task Manager
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              style={{
                backgroundColor: themeColors.surface,
                color: themeColors.text,
                border: `1px solid ${themeColors.border}`,
                padding: '0.6rem 1rem',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
              }}
            >
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>

            <button
              onClick={openNewTaskModal}
              style={{
                backgroundColor: themeColors.primary,
                color: isDark ? '#0b0f19' : '#ffffff',
                border: 'none',
                padding: '0.6rem 1.25rem',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.9rem',
              }}
            >
              + Create Task
            </button>
          </div>
        </header>

        {/* Top Summary Statistics */}
        <TaskStats
          stats={{ total, active, completed, overdue }}
          themeColors={themeColors}
        />

        {/* Dashboard Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            alignItems: 'start',
          }}
        >
          {/* Main Tasks List View */}
          <main style={{ minWidth: 0 }}>
            <div
              style={{
                backgroundColor: themeColors.surface,
                border: `1px solid ${themeColors.border}`,
                borderRadius: '16px',
                padding: '1rem',
                marginBottom: '1.5rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <input
                type="text"
                placeholder="Search title or details..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  flex: '1 1 200px',
                  backgroundColor: themeColors.surfaceSubtle,
                  border: `1px solid ${themeColors.border}`,
                  borderRadius: '10px',
                  padding: '0.6rem 0.9rem',
                  color: themeColors.text,
                  outline: 'none',
                }}
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  backgroundColor: themeColors.surfaceSubtle,
                  border: `1px solid ${themeColors.border}`,
                  borderRadius: '10px',
                  padding: '0.6rem 0.8rem',
                  color: themeColors.text,
                  outline: 'none',
                }}
              >
                <option value="All">All Statuses</option>
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                style={{
                  backgroundColor: themeColors.surfaceSubtle,
                  border: `1px solid ${themeColors.border}`,
                  borderRadius: '10px',
                  padding: '0.6rem 0.8rem',
                  color: themeColors.text,
                  outline: 'none',
                }}
              >
                <option value="All">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {filteredTasks.length === 0 ? (
                <div
                  style={{
                    backgroundColor: themeColors.surface,
                    border: `1px dashed ${themeColors.border}`,
                    borderRadius: '16px',
                    padding: '3rem 1rem',
                    textAlign: 'center',
                    color: themeColors.textSecondary,
                  }}
                >
                  No tasks found matching your filters.
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    todayStr={todayStr}
                    themeColors={themeColors}
                    isDark={isDark}
                    onToggleStatus={cycleStatus}
                    onEdit={openEditModal}
                    onDelete={deleteTask}
                  />
                ))
              )}
            </div>
          </main>

          {/* Right Sidebar: 3D Core View */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div
              style={{
                backgroundColor: themeColors.surface,
                border: `1px solid ${themeColors.border}`,
                borderRadius: '20px',
                padding: '1.75rem',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: themeColors.textSecondary,
                  marginBottom: '0.5rem',
                }}
              >
                Progress Engine (3D)
              </div>

              <Task3DModel completionRate={completionRate} isDark={isDark} />

              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: themeColors.text,
                  marginTop: '0.5rem',
                }}
              >
                {Math.round(completionRate * 100)}%
              </div>
              <div style={{ fontSize: '0.85rem', color: themeColors.textSecondary }}>
                {completed} of {total} completed
              </div>

              <div
                style={{
                  height: '6px',
                  backgroundColor: themeColors.surfaceSubtle,
                  borderRadius: '999px',
                  overflow: 'hidden',
                  marginTop: '1.25rem',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    backgroundColor: completionRate === 1 ? '#10b981' : themeColors.primary,
                    width: `${completionRate * 100}%`,
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Dynamic Modal Form */}
      <TaskFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSaveTask}
        formData={formData}
        setFormData={setFormData}
        isEditing={Boolean(editingTaskId)}
        themeColors={themeColors}
        isDark={isDark}
      />
    </div>
  );
}