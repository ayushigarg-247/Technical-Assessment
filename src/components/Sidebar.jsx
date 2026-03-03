import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, FolderOpen, Scan, Calendar,
    Bell, Settings, HelpCircle, X, User,
} from 'lucide-react';

const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'projects', label: 'Projects', icon: FolderOpen, path: '/dashboard' },
    { id: 'scans', label: 'Scans', icon: Scan, path: '/dashboard' },
    { id: 'schedule', label: 'Schedule', icon: Calendar, path: '/dashboard' },
];

const BOTTOM_NAV = [
    { id: 'notifications', label: 'Notifications', icon: Bell, path: '/dashboard' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard' },
    { id: 'support', label: 'Support', icon: HelpCircle, path: '/dashboard' },
];

function Sidebar({ activePage, isOpen, onClose }) {
    const navigate = useNavigate();
    const location = useLocation();

    const currentPath = location.pathname;
    const activeId = currentPath.startsWith('/scan/') ? 'scans' : activePage || 'dashboard';

    const handleNavClick = (item) => {
        navigate(item.path);
        onClose?.();
    };

    return (
        <>
            {isOpen && (
                <div
                    onClick={onClose}
                    style={{
                        position: 'fixed', inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 39, display: 'none',
                    }}
                    className="mobile-overlay"
                />
            )}

            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div style={{
                    padding: '20px 16px 16px',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid var(--border-subtle)',
                    marginBottom: '8px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            width: '28px', height: '28px', borderRadius: '50%',
                            background: 'var(--color-teal)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '13px', fontWeight: '700', color: '#0a2a24',
                        }}>a</div>
                        <span style={{ fontWeight: '700', fontSize: '15px', color: 'var(--text-primary)' }}>aps</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="mobile-close-btn"
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: 'var(--text-secondary)', padding: '4px', display: 'none',
                        }}
                    >
                        <X size={18} />
                    </button>
                </div>

                <nav style={{ flex: 1, padding: '4px 0' }}>
                    {NAV_ITEMS.map(item => {
                        const isActive = item.id === activeId;
                        const IconComponent = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item)}
                                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                                style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
                                aria-label={item.label}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <IconComponent size={17} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div style={{ borderTop: '1px solid var(--border-subtle)', margin: '8px 0' }} />

                <nav style={{ padding: '4px 0' }}>
                    {BOTTOM_NAV.map(item => {
                        const isActive = item.id === activeId;
                        const IconComponent = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item)}
                                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                                style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
                                aria-label={item.label}
                            >
                                <IconComponent size={17} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div
                    style={{
                        padding: '12px 16px',
                        borderTop: '1px solid var(--border-subtle)',
                        display: 'flex', alignItems: 'center',
                        gap: '10px', cursor: 'pointer',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                    <div style={{
                        width: '34px', height: '34px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                    }}>
                        <User size={16} color="white" />
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            admin@edu.com
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Security Lead</div>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
