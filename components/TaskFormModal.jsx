'use client';

export default function TaskFormModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  isEditing,
  themeColors,
  isDark,
}) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '1rem',
      }}
    >
      <div
        style={{
          backgroundColor: themeColors.surface,
          border: `1px solid ${themeColors.border}`,
          borderRadius: '20px',
          maxWidth: '480px',
          width: '100%',
          padding: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)',
        }}
      >
        <h3 style={{ margin: '0 0 1.25rem', fontSize: '1.35rem', fontWeight: 800 }}>
          {isEditing ? 'Edit Task' : 'Create New Task'}
        </h3>

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: '0.4rem',
                color: themeColors.textSecondary,
              }}
            >
              Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Implement OAuth Flow"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{
                width: '100%',
                backgroundColor: themeColors.surfaceSubtle,
                border: `1px solid ${themeColors.border}`,
                borderRadius: '10px',
                padding: '0.7rem',
                color: themeColors.text,
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: '0.4rem',
                color: themeColors.textSecondary,
              }}
            >
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Add key milestones or notes..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{
                width: '100%',
                backgroundColor: themeColors.surfaceSubtle,
                border: `1px solid ${themeColors.border}`,
                borderRadius: '10px',
                padding: '0.7rem',
                color: themeColors.text,
                outline: 'none',
                resize: 'none',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  marginBottom: '0.4rem',
                  color: themeColors.textSecondary,
                }}
              >
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                style={{
                  width: '100%',
                  backgroundColor: themeColors.surfaceSubtle,
                  border: `1px solid ${themeColors.border}`,
                  borderRadius: '10px',
                  padding: '0.7rem',
                  color: themeColors.text,
                  outline: 'none',
                }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  marginBottom: '0.4rem',
                  color: themeColors.textSecondary,
                }}
              >
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                style={{
                  width: '100%',
                  backgroundColor: themeColors.surfaceSubtle,
                  border: `1px solid ${themeColors.border}`,
                  borderRadius: '10px',
                  padding: '0.7rem',
                  color: themeColors.text,
                  outline: 'none',
                }}
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: '0.4rem',
                color: themeColors.textSecondary,
              }}
            >
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              style={{
                width: '100%',
                backgroundColor: themeColors.surfaceSubtle,
                border: `1px solid ${themeColors.border}`,
                borderRadius: '10px',
                padding: '0.7rem',
                color: themeColors.text,
                outline: 'none',
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'flex-end',
              marginTop: '0.75rem',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: 'transparent',
                border: `1px solid ${themeColors.border}`,
                borderRadius: '10px',
                padding: '0.6rem 1.25rem',
                color: themeColors.text,
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                backgroundColor: themeColors.primary,
                border: 'none',
                borderRadius: '10px',
                padding: '0.6rem 1.5rem',
                color: isDark ? '#0b0f19' : '#ffffff',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}