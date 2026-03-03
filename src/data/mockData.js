export const orgStats = {
    totalScans: 100,
    scheduled: 1000,
    rescans: 100,
    failedScans: 100,
    lastUpdated: '10 mins ago',
    org: 'Project X',
    owner: 'Nammagiri',
    severity: {
        critical: { count: 86, change: +2.0 },
        high: { count: 16, change: +0.9 },
        medium: { count: 26, change: -0.9 },
        low: { count: 16, change: +0.9 },
    },
};

export const scans = [
    { id: '1', name: 'Web App Servers', type: 'Greybox', status: 'completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago', target: 'webapp.democorp.com' },
    { id: '2', name: 'Web App Servers', type: 'Greybox', status: 'completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago', target: 'api.democorp.com' },
    { id: '3', name: 'Web App Servers', type: 'Greybox', status: 'completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago', target: 'admin.democorp.com' },
    { id: '4', name: 'Web App Servers', type: 'Greybox', status: 'completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago', target: 'cdn.democorp.com' },
    { id: '5', name: 'Web App Servers', type: 'Greybox', status: 'completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago', target: 'helpdesk.democorp.com' },
    { id: '6', name: 'Web App Servers', type: 'Greybox', status: 'completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago', target: 'portal.democorp.com' },
    { id: '7', name: 'Web App Servers', type: 'Greybox', status: 'completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago', target: 'auth.democorp.com' },
    { id: '8', name: 'Web App Servers', type: 'Greybox', status: 'scheduled', progress: 100, vuln: { critical: 5, high: 12, medium: 0, low: 0 }, lastScan: '4d ago', target: 'staging.democorp.com' },
    { id: '9', name: 'Web App Servers', type: 'Greybox', status: 'scheduled', progress: 100, vuln: { critical: 5, high: 12, medium: 0, low: 0 }, lastScan: '4d ago', target: 'dev.democorp.com' },
    { id: '10', name: 'IoT Devices', type: 'Blackbox', status: 'failed', progress: 10, vuln: { critical: 2, high: 4, medium: 3, low: 1 }, lastScan: '3d ago', target: 'iot.democorp.com' },
    { id: '11', name: 'Temp Data', type: 'Blackbox', status: 'failed', progress: 10, vuln: { critical: 2, high: 4, medium: 3, low: 1 }, lastScan: '3d ago', target: 'temp.democorp.com' },
    { id: '12', name: 'New Scan', type: 'Greybox', status: 'running', progress: 0, vuln: { critical: 0, high: 0, medium: 0, low: 0 }, lastScan: 'Just now', target: 'google.com' },
];

export const activeScan = {
    id: '12',
    name: 'New Scan',
    type: 'Grey Box',
    target: 'google.com',
    startedAt: 'Nov 22, 09:00AM',
    credentials: '2 Active',
    files: 'Control.pdf',
    checklists: '40/350',
    progress: 68,
    currentStep: 2,
};

export const scanSteps = ['Spidering', 'Mapping', 'Testing', 'Validating', 'Reporting'];

export const activityLogs = [
    {
        id: 'l1',
        time: '09:00:00',
        text: "I'll begin a systematic penetration test on helpdesk.democorp.com. Let me start with reconnaissance and enumeration.",
        highlights: ['helpdesk.democorp.com'],
        type: 'info',
    },
    {
        id: 'l2',
        time: '09:01:00',
        text: "Good! target is online. Now let me perform port scanning to identify running services.",
        highlights: [],
        type: 'success',
    },
    {
        id: 'l3',
        time: '09:02:00',
        text: "Excellent reconnaissance results:\n  - helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server)\nLet me probe the web server on target first to understand its structure.",
        highlights: ['helpdesk.democorp.com', 'Apache httpd 2.4.65'],
        type: 'info',
    },
    {
        id: 'l4',
        time: '09:03:00',
        text: "Great! I found a login page for a Help Desk Platform. I can see a useful comment: \"7000: deleteaccount:test:test\". Let me test this credential. The login redirects to /password/test. Let me follow that path and explore it.",
        highlights: ['/password/test', '7000: deleteaccount:test:test'],
        type: 'warning',
    },
    {
        id: 'l5',
        time: '09:04:00',
        text: "The POST method is not allowed on /password/test. Let me check what the JavaScript does - it posts to '#' which means the current page. Let me try a different approach.",
        highlights: ['#'],
        type: 'info',
    },
    {
        id: 'l6',
        time: '09:05:00',
        text: "It redirects back to /password/test. Let me check if there's an /api endpoint or look for other paths. Let me also try exploring with the test:test password directly on other endpoints.",
        highlights: ['/password/test', 'test:test'],
        type: 'info',
    },
    {
        id: 'l7',
        time: '09:06:00',
        text: "Great! I can access the dashboard using the 'X-UserId: 10032' header. The dashboard shows \"Welcome, John Doe\". This suggests an **IDOR vulnerability** - I can access any user's dashboard by just changing the X-UserId header. Let me explore more of the application...",
        highlights: ["'X-UserId: 10032'", '**IDOR vulnerability**'],
        type: 'error',
    },
];

export const verificationLoops = [
    { id: 'v1', time: '09:10:00', text: "Verifying SQL injection on /api/users/profile — payload: ' OR 1=1--", highlights: ['/api/users/profile'], type: 'warning' },
    { id: 'v2', time: '09:11:00', text: 'Confirmed! Time-based blind SQLi detected. Response delay: 5.2s with SLEEP(5) payload.', highlights: ['SLEEP(5)'], type: 'error' },
    { id: 'v3', time: '09:12:00', text: 'Verifying IDOR on /api/auth/login — attempting user enumeration via X-UserId header.', highlights: ['/api/auth/login', 'X-UserId'], type: 'warning' },
    { id: 'v4', time: '09:13:00', text: 'Confirmed IDOR. Accessed 3 different user accounts: ID 10030, 10031, 10032.', highlights: ['10030', '10031', '10032'], type: 'error' },
    { id: 'v5', time: '09:14:00', text: 'Rate limit check on /api/search — sending 500 requests in 10 seconds. No throttling detected.', highlights: ['/api/search'], type: 'warning' },
];

export const findings = [
    { id: 'f1', severity: 'critical', time: '18:45:23', title: 'SQL Injection in Authentication Endpoint', endpoint: '/api/users/profile', description: 'Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.' },
    { id: 'f2', severity: 'high', time: '18:45:23', title: 'Unauthorized Access to User Metadata', endpoint: '/api/auth/login', description: 'Authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.' },
    { id: 'f3', severity: 'medium', time: '18:45:23', title: 'Broken Authentication Rate Limiting', endpoint: '/api/search', description: 'No effective rate limiting detected on login attempts. Automated brute-force attempts possible.' },
    { id: 'f4', severity: 'high', time: '18:46:10', title: 'Insecure Direct Object Reference (IDOR)', endpoint: '/api/users/:id', description: 'User IDs are sequential integers. Changing X-UserId header grants access to any user account without authorization.' },
    { id: 'f5', severity: 'medium', time: '18:47:05', title: 'Missing Content-Security-Policy Header', endpoint: '/dashboard', description: 'No CSP header found. This increases risk of XSS attacks and content injection by malicious third parties.' },
    { id: 'f6', severity: 'low', time: '18:48:30', title: 'Server Version Disclosure', endpoint: 'All endpoints', description: 'Server response headers expose Apache version 2.4.65. Attackers can target known CVEs for this version.' },
];

export const statusBar = {
    subAgents: 3,
    parallelExecutions: 2,
    operations: 1,
    severity: { critical: 1, high: 2, medium: 2, low: 1 },
};
