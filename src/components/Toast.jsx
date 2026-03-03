import { useEffect } from 'react';
import { CheckCircle, Info, AlertCircle, X } from 'lucide-react';

const ICONS = {
    success: <CheckCircle size={16} />,
    info: <Info size={16} />,
    error: <AlertCircle size={16} />,
};

const CLASS_MAP = {
    success: 'toast toast-success',
    info: 'toast toast-info',
    error: 'toast toast-error',
};

function Toast({ toast, onClose }) {
    useEffect(() => {
        if (!toast) return;
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [toast]);

    if (!toast) return null;

    const icon = ICONS[toast.type] || ICONS.info;
    const className = CLASS_MAP[toast.type] || CLASS_MAP.info;

    return (
        <div className={className} role="alert" aria-live="polite">
            {icon}
            <span style={{ flex: 1 }}>{toast.message}</span>
            <button
                onClick={onClose}
                style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'currentColor', opacity: 0.7, padding: '2px',
                    display: 'flex', alignItems: 'center',
                }}
                aria-label="Close notification"
            >
                <X size={14} />
            </button>
        </div>
    );
}

export default Toast;
