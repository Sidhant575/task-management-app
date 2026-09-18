'use client';

export default function TaskItem({
  task,
  todayStr,
  themeColors,
  isDark,
  onToggleStatus,
  onEdit,
  onDelete,
}) {
  const getPriorityStyle = (priority) => {
    if (priority === 'High') return { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444' };
    if (priority === 'Medium') return { bg: 'rgba(245, 158, 11, 0.15)', text: '#f59e0b' };
    return { bg: 'rgba(16, 185, 129, 0.15)', text: '#10b981' };
  };

  const getStatusStyle = (status) => {
    if (status === 'Completed') return { bg: 'rgba(16, 185, 129, 0.2)', text: '#10b981' };
    if (status === 'In Progress') return { bg: 'rgba(59, 130, 246, 0.2)', text: '#3b82f6' };
    return { bg: 'rgba(156, 163, 175, 0.2)', text: isDark ? '#9ca3af' : '#6b7280' };
  };

  const pStyle = getPriorityStyle(task.priority);
  const sStyle = getStatusStyle(task.status);
  const isOverdue = task.dueDate && task.dueDate < todayStr && task.status !== 'Completed';

  return (
    <article
      style={{
        backgroundColor: themeColors.surface,
        border: `1px solid ${themeColors.border}`,
        borderRadius: '16px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <button
            title="Toggle completed"
            onClick={() => onToggleStatus(task.id)}
            style={{
              marginTop: '0.2rem',
              width: '20px',
              height: '20px',
              borderRadius: '6px',
              border: `2px solid ${task.status === 'Completed' ? '#10b981' : themeColors.border}`,
              backgroundColor: task.status === 'Completed' ? '#10b981' : 'transparent',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              cursor: 'pointer',
            }}
          >
            {task.status === 'Completed' ? '✓' : ''}
          </button>

          <div>
            <h2
              style={{
                margin: 0,
                fontSize: '1.05rem',
                fontWeight: 600,
                textDecoration: task.status === 'Completed' ? 'line-through' : 'none',
                color: task.status === 'Completed' ? themeColors.textSecondary : themeColors.text,
              }}
            >
              {task.title}
            </h2>

            {task.description && (
              <p
                style={{
                  margin: '0.35rem 0 0',
                  fontSize: '0.88rem',
                  color: themeColors.textSecondary,
                  lineHeight: '1.45',
                }}
              >
                {task.description}
              </p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
          <button
            onClick={() => onEdit(task)}
            title="Edit task"
            style={{
              background: 'none',
              border: `1px solid ${themeColors.border}`,
              borderRadius: '8px',
              color: themeColors.textSecondary,
              padding: '0.3rem 0.55rem',
              cursor: 'pointer',
              fontSize: '0.85rem',
            }}
          >
            ✎
          </button>
          <button
            onClick={() => onDelete(task.id)}
            title="Delete task"
            style={{
              background: 'none',
              border: `1px solid ${themeColors.border}`,
              borderRadius: '8px',
              color: '#ef4444',
              padding: '0.3rem 0.55rem',
              cursor: 'pointer',
              fontSize: '0.85rem',
            }}
          >
            ✕
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          alignItems: 'center',
          paddingTop: '0.4rem',
          borderTop: `1px solid ${themeColors.border}`,
          fontSize: '0.75rem',
        }}
      >
        <button
          onClick={() => onToggleStatus(task.id)}
          style={{
            backgroundColor: sStyle.bg,
            color: sStyle.text,
            border: 'none',
            padding: '0.25rem 0.6rem',
            borderRadius: '100px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          ● {task.status}
        </button>

        <span
          style={{
            backgroundColor: pStyle.bg,
            color: pStyle.text,
            padding: '0.25rem 0.6rem',
            borderRadius: '100px',
            fontWeight: 700,
          }}
        >
          {task.priority} Priority
        </span>

        {task.dueDate && (
          <span
            style={{
              marginLeft: 'auto',
              color: isOverdue ? '#ef4444' : themeColors.textSecondary,
              fontWeight: isOverdue ? 700 : 500,
            }}
          >
            {isOverdue ? '⚠️ Overdue: ' : '📅 Due: '}
            {task.dueDate}
          </span>
        )}
      </div>
    </article>
  );
}