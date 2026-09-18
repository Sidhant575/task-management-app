'use client';

export default function TaskStats({ stats, themeColors }) {
  const cards = [
    { label: 'Total Tasks', value: stats.total, color: themeColors.text },
    { label: 'Active', value: stats.active, color: '#38bdf8' },
    { label: 'Completed', value: stats.completed, color: '#10b981' },
    {
      label: 'Overdue',
      value: stats.overdue,
      color: stats.overdue > 0 ? '#ef4444' : themeColors.textSecondary,
    },
  ];

  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
      }}
    >
      {cards.map((item, index) => (
        <div
          key={index}
          style={{
            backgroundColor: themeColors.surface,
            border: `1px solid ${themeColors.border}`,
            borderRadius: '16px',
            padding: '1.25rem',
          }}
        >
          <div
            style={{
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              color: themeColors.textSecondary,
              fontWeight: 700,
            }}
          >
            {item.label}
          </div>
          <div
            style={{
              fontSize: '1.85rem',
              fontWeight: 800,
              marginTop: '0.4rem',
              color: item.color,
            }}
          >
            {item.value}
          </div>
        </div>
      ))}
    </section>
  );
}