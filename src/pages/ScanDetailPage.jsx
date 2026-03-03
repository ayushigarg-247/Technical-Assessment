import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, X, Menu, FileDown, Circle, CheckCircle2 } from 'lucide-react';

import Sidebar from '../components/Sidebar';
import SeverityBadge from '../components/SeverityBadge';
import ThemeToggle from '../components/ThemeToggle';
import Toast from '../components/Toast';
import { activeScan, scanSteps, activityLogs, verificationLoops, findings, statusBar } from '../data/mockData';

function CircularProgress({ percent }) {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div style={{ position: 'relative', width: '100px', height: '100px', flexShrink: 0 }}>
            <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="50" cy="50" r={radius} fill="none" stroke="var(--bg-surface-3)" strokeWidth="8" />
                <circle
                    cx="50" cy="50" r={radius}
                    fill="none"
                    stroke="var(--color-teal)"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>{percent}%</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '1px' }}>In Progress</span>
            </div>
        </div>
    );
}

function StepTracker({ steps, currentStep }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            {steps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isActive = index === currentStep;
                const isFuture = index > currentStep;

                return (
                    <div key={step} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '50%',
                                border: `2px solid ${isCompleted || isActive ? 'var(--color-teal)' : 'var(--border-color)'}`,
                                background: isCompleted ? 'var(--color-teal)' : isActive ? 'var(--color-teal-dim)' : 'var(--bg-surface-2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.3s',
                            }}>
                                {isCompleted ? (
                                    <CheckCircle2 size={18} color="white" />
                                ) : isActive ? (
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-teal)', animation: 'pulse 1.5s infinite' }} />
                                ) : (
                                    <Circle size={16} color="var(--text-muted)" />
                                )}
                            </div>
                            <span style={{
                                fontSize: '11px',
                                fontWeight: isActive ? '600' : '400',
                                color: isActive ? 'var(--color-teal)' : isFuture ? 'var(--text-muted)' : 'var(--text-secondary)',
                                whiteSpace: 'nowrap',
                            }}>
                                {step}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div style={{
                                height: '2px', flex: 1,
                                background: index < currentStep ? 'var(--color-teal)' : 'var(--border-color)',
                                marginBottom: '24px',
                                transition: 'background 0.3s',
                            }} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

function LogLine({ entry }) {
    const renderWithHighlights = (text, highlights) => {
        if (!highlights || highlights.length === 0) return text;
        const pattern = highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
        const regex = new RegExp(`(${pattern})`, 'g');
        const parts = text.split(regex);
        return parts.map((part, i) => {
            const isHighlight = highlights.some(h => h === part);
            return isHighlight ? (
                <span key={i} style={{ color: 'var(--color-teal)', fontWeight: '500' }}>{part}</span>
            ) : part;
        });
    };

    const timeColor = {
        info: 'var(--text-muted)',
        success: 'var(--color-low)',
        warning: 'var(--color-medium)',
        error: 'var(--color-critical)',
    }[entry.type] || 'var(--text-muted)';

    return (
        <div style={{ marginBottom: '12px', lineHeight: 1.7 }}>
            <span style={{ color: timeColor, marginRight: '8px', fontWeight: '500' }}>[{entry.time}]</span>
            <span style={{ color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
                {renderWithHighlights(entry.text, entry.highlights)}
            </span>
        </div>
    );
}

function FindingCard({ finding }) {
    const severityLabel = { critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low' }[finding.severity];

    const severityBg = {
        critical: 'rgba(239,68,68,0.1)', high: 'rgba(249,115,22,0.1)',
        medium: 'rgba(234,179,8,0.1)', low: 'rgba(34,197,94,0.1)',
    }[finding.severity];

    const severityBorder = {
        critical: 'rgba(239,68,68,0.2)', high: 'rgba(249,115,22,0.2)',
        medium: 'rgba(234,179,8,0.2)', low: 'rgba(34,197,94,0.2)',
    }[finding.severity];

    return (
        <div style={{ padding: '14px', borderRadius: '10px', border: `1px solid ${severityBorder}`, background: severityBg, marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className={`badge badge-${finding.severity}`} style={{ fontSize: '11px', padding: '2px 10px' }}>{severityLabel}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{finding.time}</span>
            </div>
            <h4 style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>{finding.title}</h4>
            <div style={{ fontSize: '12px', color: 'var(--color-teal)', marginBottom: '6px', fontFamily: 'monospace' }}>{finding.endpoint}</div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{finding.description}</p>
        </div>
    );
}

function ScanDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('activity');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [toast, setToast] = useState(null);
    const [consoleMinimized, setConsoleMinimized] = useState(false);
    const [visibleLogs, setVisibleLogs] = useState(activityLogs.slice(0, 2));
    const [visibleVerification] = useState(verificationLoops.slice(0, 2));
    const consoleRef = useRef(null);

    useEffect(() => {
        if (visibleLogs.length >= activityLogs.length) return;
        const timer = setTimeout(() => {
            setVisibleLogs(prev => [...prev, activityLogs[prev.length]]);
        }, 3000);
        return () => clearTimeout(timer);
    }, [visibleLogs]);

    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
        }
    }, [visibleLogs]);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-base)' }}>
            <Sidebar activePage="scans" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="main-with-sidebar fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, maxHeight: '100vh', overflow: 'hidden' }}>

                <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-surface)', gap: '12px', flexShrink: 0 }}>
                    <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'none' }} className="mobile-menu-btn">
                        <Menu size={20} />
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                        <span onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer', fontWeight: '600', color: 'var(--text-primary)' }}>Scan</span>
                        <span>/</span>
                        <span>Private Assets</span>
                        <span>/</span>
                        <span style={{ color: 'var(--color-teal)', fontWeight: '500' }}>New Scan</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto', alignItems: 'center' }}>
                        <ThemeToggle />
                        <button className="btn btn-ghost" onClick={() => setToast({ message: '📄 Report exported!', type: 'info' })}>
                            <FileDown size={14} /> Export Report
                        </button>
                        <button
                            className="btn"
                            style={{ background: 'var(--color-failed)', color: 'white' }}
                            onClick={() => { setToast({ message: '🛑 Scan stopped successfully.', type: 'error' }); setTimeout(() => navigate('/dashboard'), 2000); }}
                        >
                            Stop Scan
                        </button>
                    </div>
                </div>

                <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>

                    <div style={{ padding: '20px 24px', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '20px' }}>
                            <CircularProgress percent={activeScan.progress} />
                            <StepTracker steps={scanSteps} currentStep={activeScan.currentStep} />
                        </div>
                        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                            {[
                                { label: 'Scan Type', value: activeScan.type },
                                { label: 'Targets', value: activeScan.target },
                                { label: 'Started At', value: activeScan.startedAt },
                                { label: 'Credentials', value: activeScan.credentials },
                                { label: 'Files', value: activeScan.files },
                                { label: 'Checklists', value: activeScan.checklists },
                            ].map(({ label, value }) => (
                                <div key={label}>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                                    <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ flex: 1, display: 'flex', gap: '16px', minHeight: 0, padding: '16px 24px' }}>

                        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
                            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div className="pulse-dot" />
                                    <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>Live Scan Console</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '2px 10px', borderRadius: '20px', background: 'var(--color-teal-dim)', color: 'var(--color-teal)', fontSize: '11px', fontWeight: '500' }}>
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
                                        Running...
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    <button onClick={() => setConsoleMinimized(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }} aria-label={consoleMinimized ? 'Expand console' : 'Minimize console'}>
                                        {consoleMinimized ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                                    </button>
                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }} aria-label="Close console">
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>

                            {!consoleMinimized && (
                                <>
                                    <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface-2)', flexShrink: 0 }}>
                                        {[
                                            { id: 'activity', label: 'Activity Log' },
                                            { id: 'verification', label: 'Verification Loops' },
                                        ].map(tab => (
                                            <button
                                                key={tab.id}
                                                id={`tab-${tab.id}`}
                                                onClick={() => setActiveTab(tab.id)}
                                                role="tab"
                                                aria-selected={activeTab === tab.id}
                                                style={{
                                                    padding: '9px 16px', fontSize: '12px', fontWeight: '500',
                                                    border: 'none', background: 'none', cursor: 'pointer',
                                                    fontFamily: 'Inter, sans-serif',
                                                    color: activeTab === tab.id ? 'var(--color-teal)' : 'var(--text-muted)',
                                                    borderBottom: activeTab === tab.id ? '2px solid var(--color-teal)' : '2px solid transparent',
                                                    marginBottom: '-1px', transition: 'all 0.15s',
                                                }}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>

                                    <div
                                        ref={consoleRef}
                                        className="console-text"
                                        role="log"
                                        aria-live="polite"
                                        aria-label="Scan console output"
                                        style={{ flex: 1, overflowY: 'auto', padding: '16px', background: 'var(--bg-base)', minHeight: '200px', maxHeight: '320px' }}
                                    >
                                        {activeTab === 'activity'
                                            ? visibleLogs.map(entry => <LogLine key={entry.id} entry={entry} />)
                                            : visibleVerification.map(entry => <LogLine key={entry.id} entry={entry} />)
                                        }
                                        <span style={{ display: 'inline-block', width: '8px', height: '14px', background: 'var(--color-teal)', opacity: 0.8, animation: 'blink 1s step-end infinite' }} />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="card" style={{ width: '320px', minWidth: '300px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', flexShrink: 0 }}>
                                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>Finding Log</span>
                                <span style={{ marginLeft: '8px', padding: '1px 8px', background: 'var(--bg-surface-3)', borderRadius: '10px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                                    {findings.length}
                                </span>
                            </div>
                            <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
                                {findings.map(finding => <FindingCard key={finding.id} finding={finding} />)}
                            </div>
                        </div>

                    </div>

                    <div style={{ padding: '8px 24px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', gap: '24px', fontSize: '12px', color: 'var(--text-secondary)', flexShrink: 0, flexWrap: 'wrap' }}>
                        <span><span style={{ color: 'var(--color-teal)', marginRight: '4px' }}>●</span>Sub-Agents: {statusBar.subAgents}</span>
                        <span><span style={{ color: 'var(--color-teal)', marginRight: '4px' }}>●</span>Parallel Executions: {statusBar.parallelExecutions}</span>
                        <span><span style={{ color: 'var(--color-teal)', marginRight: '4px' }}>●</span>Operations: {statusBar.operations}</span>
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '16px', alignItems: 'center' }}>
                            {['critical', 'high', 'medium', 'low'].map(s => (
                                <span key={s} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <span style={{ textTransform: 'capitalize', color: `var(--color-${s})`, fontWeight: '500', fontSize: '12px' }}>
                                        {s.charAt(0).toUpperCase() + s.slice(1)}:
                                    </span>
                                    <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{statusBar.severity[s]}</span>
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </main>

            <Toast toast={toast} onClose={() => setToast(null)} />

            <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          .mobile-overlay  { display: block !important; }
        }
      `}</style>
        </div>
    );
}

export default ScanDetailPage;
