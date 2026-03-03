import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check, Star } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const FEATURES = [
    'Effortlessly spider and map targets to uncover hidden security flaws',
    'Deliver high-quality, validated findings in hours, not weeks.',
    'Generate professional, enterprise-grade security reports automatically.',
];

function LoginPage() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        agreed: false,
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const errs = {};
        if (!form.firstName.trim()) errs.firstName = 'First name is required';
        if (!form.lastName.trim()) errs.lastName = 'Last name is required';
        if (!form.email.trim()) errs.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
        if (!form.password) errs.password = 'Password is required';
        else if (form.password.length < 8) errs.password = 'Min 8 characters';
        if (!form.agreed) errs.agreed = 'You must agree to the terms';
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        navigate('/dashboard');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
            <div style={{ position: 'fixed', top: '16px', right: '16px', zIndex: 100 }}>
                <ThemeToggle />
            </div>

            <div
                className="login-left-panel"
                style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #0a1628 0%, #0d1f3c 30%, #0a1a0f 60%, #111 100%)',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', padding: '60px 56px',
                    position: 'relative', overflow: 'hidden', minWidth: 0,
                }}
            >
                <div style={{ position: 'absolute', bottom: '-100px', right: '-50px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', top: '10%', left: '30%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(12,200,168,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '64px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '800', color: '#0a2a24' }}>a</div>
                    <span style={{ fontWeight: '700', fontSize: '18px', color: '#ffffff' }}>aps</span>
                </div>

                <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: '700', color: '#ffffff', lineHeight: 1.2, marginBottom: '32px' }}>
                    Expert level Cybersecurity{' '}<br />
                    in{' '}<span style={{ color: 'var(--color-teal)' }}>hours</span>{' '}not weeks.
                </h1>

                <div style={{ marginBottom: '48px' }}>
                    <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '16px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        What's included
                    </p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {FEATURES.map((feature, i) => (
                            <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                <span style={{ flexShrink: 0, marginTop: '2px', color: 'var(--color-teal)' }}>
                                    <Check size={15} strokeWidth={3} />
                                </span>
                                <span style={{ fontSize: '14px', color: '#d1d5db', lineHeight: 1.5 }}>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                        <Star size={14} fill="#00b67a" color="#00b67a" />
                        <span style={{ fontSize: '13px', color: '#00b67a', fontWeight: '600' }}>Trustpilot</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px', fontWeight: '700', color: '#ffffff' }}>Rated 4.5/5.0</span>
                        <span style={{ fontSize: '13px', color: '#6b7280' }}>(100k+ reviews)</span>
                    </div>
                </div>
            </div>

            <div
                className="login-right-panel"
                style={{
                    width: '480px', minWidth: '480px',
                    background: 'var(--bg-surface)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '40px 48px',
                    boxShadow: '-8px 0 40px rgba(0,0,0,0.15)',
                }}
            >
                <div style={{ width: '100%', maxWidth: '360px' }} className="fade-in">
                    <h2 style={{ fontSize: '26px', fontWeight: '700', color: 'var(--text-primary)', textAlign: 'center', marginBottom: '6px' }}>
                        Sign up
                    </h2>
                    <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '28px' }}>
                        Already have an account?{' '}
                        <a href="#login" style={{ color: 'var(--color-teal)', textDecoration: 'none', fontWeight: '500' }} onClick={e => { e.preventDefault(); navigate('/dashboard'); }}>
                            Log in
                        </a>
                    </p>

                    <form onSubmit={handleSubmit} noValidate>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div>
                                <input id="firstName" name="firstName" type="text" placeholder="First name*" value={form.firstName} onChange={handleChange} className="input" style={errors.firstName ? { borderColor: 'var(--color-critical)' } : {}} aria-label="First name" />
                                {errors.firstName && <p style={{ color: 'var(--color-critical)', fontSize: '11px', marginTop: '4px' }}>{errors.firstName}</p>}
                            </div>
                            <div>
                                <input id="lastName" name="lastName" type="text" placeholder="Last name*" value={form.lastName} onChange={handleChange} className="input" style={errors.lastName ? { borderColor: 'var(--color-critical)' } : {}} aria-label="Last name" />
                                {errors.lastName && <p style={{ color: 'var(--color-critical)', fontSize: '11px', marginTop: '4px' }}>{errors.lastName}</p>}
                            </div>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <input id="email" name="email" type="email" placeholder="Email address*" value={form.email} onChange={handleChange} className="input" style={errors.email ? { borderColor: 'var(--color-critical)' } : {}} aria-label="Email address" />
                            {errors.email && <p style={{ color: 'var(--color-critical)', fontSize: '11px', marginTop: '4px' }}>{errors.email}</p>}
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <div style={{ position: 'relative' }}>
                                <input
                                    id="password" name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password (8+ characters)*"
                                    value={form.password} onChange={handleChange}
                                    className="input"
                                    style={{ paddingRight: '44px', ...(errors.password ? { borderColor: 'var(--color-critical)' } : {}) }}
                                    aria-label="Password"
                                />
                                <button type="button" onClick={() => setShowPassword(v => !v)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px', display: 'flex', alignItems: 'center' }} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {errors.password && <p style={{ color: 'var(--color-critical)', fontSize: '11px', marginTop: '4px' }}>{errors.password}</p>}
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                <input type="checkbox" name="agreed" checked={form.agreed} onChange={handleChange} style={{ marginTop: '2px', accentColor: 'var(--color-teal)', cursor: 'pointer' }} aria-label="Agree to Terms and Conditions" />
                                <span>
                                    I agree to Aps's{' '}
                                    <a href="#terms" style={{ color: 'var(--color-teal)', textDecoration: 'none' }}>Terms &amp; Conditions</a>
                                    {' '}and acknowledge the{' '}
                                    <a href="#privacy" style={{ color: 'var(--color-teal)', textDecoration: 'none' }}>Privacy Policy</a>
                                </span>
                            </label>
                            {errors.agreed && <p style={{ color: 'var(--color-critical)', fontSize: '11px', marginTop: '6px' }}>{errors.agreed}</p>}
                        </div>

                        <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '15px', borderRadius: '10px', justifyContent: 'center', opacity: isLoading ? 0.8 : 1, marginBottom: '20px' }}>
                            {isLoading ? (
                                <>
                                    <span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                                    Creating account...
                                </>
                            ) : 'Create account'}
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                            <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>or continue with</span>
                            <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button type="button" onClick={() => navigate('/dashboard')} style={{ flex: 1, padding: '10px', background: '#000000', color: '#ffffff', border: 'none', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', gap: '6px', fontFamily: 'Inter, sans-serif', fontWeight: '500' }} aria-label="Continue with Apple">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                            </button>
                            <button type="button" onClick={() => navigate('/dashboard')} style={{ flex: 1, padding: '10px', background: 'var(--bg-surface-3)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', gap: '6px', fontFamily: 'Inter, sans-serif', fontWeight: '500' }} aria-label="Continue with Google">
                                <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                            </button>
                            <button type="button" onClick={() => navigate('/dashboard')} style={{ flex: 1, padding: '10px', background: '#1877f2', color: '#ffffff', border: 'none', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', gap: '6px', fontFamily: 'Inter, sans-serif', fontWeight: '500' }} aria-label="Continue with Meta">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .login-left-panel { display: none !important; }
          .login-right-panel { width: 100% !important; min-width: 0 !important; }
        }
      `}</style>
        </div>
    );
}

export default LoginPage;
