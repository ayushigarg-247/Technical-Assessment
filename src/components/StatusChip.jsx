const STATUS_CONFIG = {
    completed: { className: 'chip chip-completed', label: 'Completed' },
    scheduled: { className: 'chip chip-scheduled', label: 'Scheduled' },
    failed: { className: 'chip chip-failed', label: 'Failed' },
    running: { className: 'chip chip-running', label: 'Running' },
};

function StatusChip({ status }) {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.scheduled;
    return (
        <span className={config.className} aria-label={`Status: ${config.label}`}>
            <span
                style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'currentColor',
                    display: 'inline-block',
                    flexShrink: 0,
                }}
            />
            {config.label}
        </span>
    );
}

export default StatusChip;
