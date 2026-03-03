// ─────────────────────────────────────────────────────────────
// PAGE: DashboardPage.jsx — Screen 2 (Scan List)
// ─────────────────────────────────────────────────────────────
//
// LAYOUT:
//   Sidebar (fixed left) + Main content area
//   Main = Stats Bar (top) + Toolbar + Scan Table
//
// KEY REACT CONCEPTS:
//   useState   → search query, selected filter, sidebar open/close
//   useMemo    → derived/filtered scan list (avoids re-calculating
//                on every render when unrelated state changes)
//   useNavigate → go to /scan/:id when row is clicked
// ─────────────────────────────────────────────────────────────

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search, Filter, Columns, Plus,
    TrendingUp, TrendingDown, RefreshCw,
    Menu, FileDown,
} from 'lucide-react';

import Sidebar from '../components/Sidebar';
import SeverityBadge from '../components/SeverityBadge';
import StatusChip from '../components/StatusChip';
import ThemeToggle from '../components/ThemeToggle';
import Toast from '../components/Toast';
import { scans, orgStats } from '../data/mockData';

// ── STAT CARD ─────────────────────────────────────────────────
// Small component defined in same file (fine for small components).
// Shows: label, count, % change, and a colored icon.
function StatCard({ label, count, change, icon: Icon, iconColor }) {
    const isPositive = change >= 0;

    return (
        <div style={{
            flex: 1,
            padding: '16px 20px',
            borderRight: '1px solid var(--border-color)',
            minWidth: 0,
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                    {label}
                </span>
                <Icon size={16} color={iconColor} />
            </div>

            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1, marginBottom: '6px' }}>
                {count}
            </div>

            {/* Change indicator: green arrow up or red arrow down */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                fontSize: '11px',
                color: isPositive ? '#22c55e' : '#ef4444',
            }}>
                {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                <span>
                    {isPositive ? '↑' : '↓'}
                    {Math.abs(change)}% {isPositive ? 'increase' : 'decrease'} than yesterday
                </span>
            </div>
        </div>
    );
}

// ── PROGRESS BAR ──────────────────────────────────────────────
function ProgressBar({ value }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '120px' }}>
            <div className="progress-bar" style={{ flex: 1 }}>
                <div
                    className="progress-fill"
                    style={{
                        width: `${value}%`,
                        // Red for failed/partial, teal for normal
                        backgroundColor: value < 50 ? 'var(--color-failed)' : 'var(--color-teal)',
                    }}
                />
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', minWidth: '32px' }}>
                {value}%
            </span>
        </div>
    );
}

// ── MAIN DASHBOARD PAGE ───────────────────────────────────────
function DashboardPage() {
    const navigate = useNavigate();

    // ── STATE ──────────────────────────────────────────────────
    const [sidebarOpen, setSidebarOpen] = useState(false);  // mobile sidebar
    const [searchQuery, setSearchQuery] = useState('');      // search input
    const [statusFilter, setStatusFilter] = useState('all'); // filter dropdown
    const [toast, setToast] = useState(null);               // toast notification
    const [showFilterMenu, setShowFilterMenu] = useState(false); // filter popup

    // ── useMemo: FILTERED SCANS ────────────────────────────────
    // useMemo = only recalculate when searchQuery or statusFilter change.
    // Without useMemo, this filtering would run on EVERY render,
    // even when unrelated state (like sidebarOpen) changes.
    //
    // Think of it as: "cache this expensive computation"
    const filteredScans = useMemo(() => {
        return scans.filter(scan => {
            // Check if name matches search
            const matchesSearch = scan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                scan.type.toLowerCase().includes(searchQuery.toLowerCase());

            // Check if status matches filter
            const matchesFilter = statusFilter === 'all' || scan.status === statusFilter;

            return matchesSearch && matchesFilter;
        });
    }, [searchQuery, statusFilter]); // dependencies — only recompute when these change

    // ── HANDLERS ──────────────────────────────────────────────
    const handleRowClick = (scan) => {
        // Navigate to scan detail page with the scan's ID in the URL
        navigate(`/scan/${scan.id}`);
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const handleNewScan = () => {
        showToast('🚀 New scan initiated successfully!', 'success');
    };

    const handleExportReport = () => {
        showToast('📄 Report export started. Download will begin shortly.', 'info');
    };

    // ── RENDER ─────────────────────────────────────────────────
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-base)' }}>

            {/* ── SIDEBAR ──────────────────────────────────────── */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* ── MAIN CONTENT (offset by sidebar width on desktop) */}
            <main className="main-with-sidebar fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

                {/* ── TOP HEADER BAR ─────────────────────────────── */}
                <div style={{
                    padding: '12px 24px',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'var(--bg-surface)',
                    gap: '12px',
                    position: 'sticky', top: 0, zIndex: 30,
                }}>
                    {/* Mobile menu button */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setSidebarOpen(true)}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: 'var(--text-secondary)', padding: '4px',
                            display: 'none', // shown via media query CSS
                        }}
                    >
                        <Menu size={20} />
                    </button>

                    {/* Breadcrumb */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                        <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Scan</span>
                        <span>/</span>
                        <span>Private Assets</span>
                        <span>/</span>
                        <span style={{ color: 'var(--color-teal)', fontWeight: '500' }}>New Scan</span>
                    </div>

                    {/* Right side actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto' }}>
                        <ThemeToggle />
                        <button
                            className="btn btn-ghost"
                            onClick={handleExportReport}
                            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                            <FileDown size={14} />
                            Export Report
                        </button>
                        <button
                            className="btn"
                            style={{ background: 'var(--color-failed)', color: 'white', borderRadius: '8px' }}
                            onClick={() => showToast('Scan stopped.', 'error')}
                        >
                            Stop Scan
                        </button>
                    </div>
                </div>

                <div style={{ flex: 1, overflow: 'auto' }}>

                    {/* ── ORG INFO BAR ──────────────────────────────── */}
                    <div style={{
                        padding: '10px 24px',
                        borderBottom: '1px solid var(--border-color)',
                        background: 'var(--bg-surface)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '24px',
                        fontSize: '13px',
                        color: 'var(--text-secondary)',
                        flexWrap: 'wrap',
                    }}>
                        <span><strong style={{ color: 'var(--text-primary)' }}>Org:</strong> {orgStats.org}</span>
                        <span><strong style={{ color: 'var(--text-primary)' }}>Owner:</strong> {orgStats.owner}</span>
                        <span><strong style={{ color: 'var(--text-primary)' }}>Total Scans:</strong> {orgStats.totalScans}</span>
                        <span><strong style={{ color: 'var(--text-primary)' }}>Scheduled:</strong> {orgStats.scheduled}</span>
                        <span><strong style={{ color: 'var(--text-primary)' }}>Rescans:</strong> {orgStats.rescans}</span>
                        <span><strong style={{ color: 'var(--text-primary)' }}>Failed Scans:</strong> {orgStats.failedScans}</span>
                        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-teal)' }}>
                            <RefreshCw size={13} />
                            {orgStats.lastUpdated}
                        </span>
                    </div>

                    {/* ── SEVERITY STAT CARDS ───────────────────────── */}
                    <div style={{
                        display: 'flex',
                        background: 'var(--bg-surface)',
                        borderBottom: '1px solid var(--border-color)',
                        margin: '0 0 0 0',
                    }}>
                        <StatCard
                            label="Critical Severity"
                            count={orgStats.severity.critical.count}
                            change={orgStats.severity.critical.change}
                            icon={() => <span style={{ fontSize: '16px' }}>🚫</span>}
                            iconColor="var(--color-critical)"
                        />
                        <StatCard
                            label="High Severity"
                            count={orgStats.severity.high.count}
                            change={orgStats.severity.high.change}
                            icon={() => <span style={{ fontSize: '16px' }}>⚠️</span>}
                            iconColor="var(--color-high)"
                        />
                        <StatCard
                            label="Medium Severity"
                            count={orgStats.severity.medium.count}
                            change={orgStats.severity.medium.change}
                            icon={() => <span style={{ fontSize: '16px' }}>⚠️</span>}
                            iconColor="var(--color-medium)"
                        />
                        <StatCard
                            label="Low Severity"
                            count={orgStats.severity.low.count}
                            change={orgStats.severity.low.change}
                            icon={() => <span style={{ fontSize: '16px' }}>🔍</span>}
                            iconColor="var(--color-low)"
                        />
                    </div>

                    {/* ── SCAN TABLE SECTION ────────────────────────── */}
                    <div style={{ padding: '20px 24px' }}>

                        {/* Toolbar: Search + Filters + New Scan */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '16px',
                            flexWrap: 'wrap',
                        }}>
                            {/* Search input */}
                            <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                                <Search size={14} style={{
                                    position: 'absolute', left: '12px', top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-muted)',
                                }} />
                                <input
                                    id="scan-search"
                                    type="text"
                                    placeholder="Search scans by name or type..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="input"
                                    style={{ paddingLeft: '36px' }}
                                    aria-label="Search scans"
                                />
                            </div>

                            {/* Filter button with dropdown */}
                            <div style={{ position: 'relative' }}>
                                <button
                                    id="filter-btn"
                                    className="btn btn-ghost"
                                    onClick={() => setShowFilterMenu(v => !v)}
                                    aria-expanded={showFilterMenu}
                                >
                                    <Filter size={14} /> Filter
                                    {statusFilter !== 'all' && (
                                        <span style={{
                                            width: '6px', height: '6px', borderRadius: '50%',
                                            background: 'var(--color-teal)', display: 'inline-block',
                                        }} />
                                    )}
                                </button>

                                {/* Filter dropdown menu */}
                                {showFilterMenu && (
                                    <div style={{
                                        position: 'absolute', top: '110%', left: 0,
                                        background: 'var(--bg-surface)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '10px',
                                        padding: '6px',
                                        minWidth: '160px',
                                        boxShadow: 'var(--shadow)',
                                        zIndex: 20,
                                    }}>
                                        {['all', 'completed', 'scheduled', 'failed', 'running'].map(status => (
                                            <button
                                                key={status}
                                                onClick={() => { setStatusFilter(status); setShowFilterMenu(false); }}
                                                style={{
                                                    width: '100%', textAlign: 'left',
                                                    padding: '8px 12px', borderRadius: '6px',
                                                    border: 'none', cursor: 'pointer',
                                                    background: statusFilter === status ? 'var(--color-teal-dim)' : 'transparent',
                                                    color: statusFilter === status ? 'var(--color-teal)' : 'var(--text-primary)',
                                                    fontSize: '13px', fontFamily: 'Inter, sans-serif',
                                                    fontWeight: statusFilter === status ? '600' : '400',
                                                    textTransform: 'capitalize',
                                                }}
                                            >
                                                {status === 'all' ? 'All Status' : status}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button id="column-btn" className="btn btn-ghost">
                                <Columns size={14} /> Column
                            </button>

                            {/* New Scan button — teal, primary action */}
                            <button
                                id="new-scan-btn"
                                className="btn btn-primary"
                                onClick={handleNewScan}
                                style={{ marginLeft: 'auto' }}
                            >
                                <Plus size={14} /> New scan
                            </button>
                        </div>

                        {/* ── TABLE ─────────────────────────────────── */}
                        <div className="card" style={{ overflow: 'hidden' }}>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    fontSize: '13px',
                                }}>
                                    {/* Table header */}
                                    <thead>
                                        <tr style={{
                                            borderBottom: '1px solid var(--border-color)',
                                            background: 'var(--bg-surface-2)',
                                        }}>
                                            {['Scan Name', 'Type', 'Status', 'Progress', 'Vulnerability', 'Last Scan'].map(col => (
                                                <th key={col} style={{
                                                    padding: '11px 16px',
                                                    textAlign: 'left',
                                                    fontWeight: '600',
                                                    fontSize: '12px',
                                                    color: 'var(--text-muted)',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.04em',
                                                    whiteSpace: 'nowrap',
                                                }}>
                                                    {col}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>

                                    {/* Table body */}
                                    <tbody>
                                        {filteredScans.length === 0 ? (
                                            // Empty state
                                            <tr>
                                                <td colSpan={6} style={{
                                                    padding: '48px', textAlign: 'center',
                                                    color: 'var(--text-muted)', fontSize: '14px',
                                                }}>
                                                    No scans match your search.
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredScans.map((scan, index) => (
                                                <tr
                                                    key={scan.id}
                                                    className="table-row"
                                                    onClick={() => handleRowClick(scan)}
                                                    style={{
                                                        borderBottom: index < filteredScans.length - 1
                                                            ? '1px solid var(--border-subtle)'
                                                            : 'none',
                                                        cursor: 'pointer',
                                                        transition: 'background 0.1s',
                                                    }}
                                                >
                                                    {/* Scan Name */}
                                                    <td style={{ padding: '12px 16px', fontWeight: '500', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                                                        {scan.name}
                                                    </td>

                                                    {/* Type */}
                                                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>
                                                        {scan.type}
                                                    </td>

                                                    {/* Status — uses our StatusChip component */}
                                                    <td style={{ padding: '12px 16px' }}>
                                                        <StatusChip status={scan.status} />
                                                    </td>

                                                    {/* Progress bar */}
                                                    <td style={{ padding: '12px 16px', minWidth: '140px' }}>
                                                        <ProgressBar value={scan.progress} />
                                                    </td>

                                                    {/* Vulnerability badges — 4 colored numbers */}
                                                    <td style={{ padding: '12px 16px' }}>
                                                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'nowrap' }}>
                                                            <SeverityBadge severity="critical" count={scan.vuln.critical} />
                                                            <SeverityBadge severity="high" count={scan.vuln.high} />
                                                            <SeverityBadge severity="medium" count={scan.vuln.medium} />
                                                            <SeverityBadge severity="low" count={scan.vuln.low} />
                                                        </div>
                                                    </td>

                                                    {/* Last Scan time */}
                                                    <td style={{ padding: '12px 16px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                                                        {scan.lastScan}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Row count info */}
                        <div style={{ marginTop: '10px', fontSize: '12px', color: 'var(--text-muted)' }}>
                            Showing {filteredScans.length} of {scans.length} scans
                        </div>
                    </div>
                </div>
            </main>

            {/* Toast notification — renders in bottom-right corner */}
            <Toast toast={toast} onClose={() => setToast(null)} />

            {/* Responsive CSS */}
            <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          .mobile-overlay  { display: block !important; }
        }
      `}</style>
        </div>
    );
}

export default DashboardPage;
