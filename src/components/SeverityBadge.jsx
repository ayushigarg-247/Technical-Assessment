const SEVERITY_CLASSES = {
    critical: 'badge badge-critical',
    high: 'badge badge-high',
    medium: 'badge badge-medium',
    low: 'badge badge-low',
};

function SeverityBadge({ severity, count }) {
    const className = SEVERITY_CLASSES[severity] || 'badge';
    if (count === 0) return null;
    return (
        <span className={className} aria-label={`${count} ${severity} severity vulnerabilities`}>
            {count}
        </span>
    );
}

export default SeverityBadge;
