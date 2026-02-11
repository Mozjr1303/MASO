import React, { useState, useEffect } from 'react';
import { Hexagon, Mail, Lock, User, Building2, Loader2, ArrowRight, ShieldCheck, Zap, Globe, Heart, Menu, X } from 'lucide-react';
import { authService, LoginCredentials, SignupData } from '../services/authService';
import { AuthUser } from '../types';
import ElectricBorder from './ElectricBorder';
import logo from '../assets/logo.png';
import { z } from 'zod';

// Validation Schemas
const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    userType: z.enum(['volunteer', 'organization'])
});

const signupSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    userType: z.enum(['volunteer', 'organization']),
    description: z.string().optional()
});

// Landing Sections
import { MissionsSection } from './landing/MissionsSection';
import { HubSection } from './landing/HubSection';
import { GovernanceSection } from './landing/GovernanceSection';
import { AboutSection } from './landing/AboutSection';

interface AuthFormProps {
    onAuthSuccess: (user: AuthUser) => void;
}

export function AuthForm({ onAuthSuccess }: AuthFormProps) {
    const [activeSection, setActiveSection] = useState<'landing' | 'missions' | 'hub' | 'governance' | 'about'>('landing');
    const [isLogin, setIsLogin] = useState(true);
    const [userType, setUserType] = useState<'volunteer' | 'organization'>('volunteer');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        description: ''
    });

    const [showForm, setShowForm] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0, tiltX: 0, tiltY: 0 });
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowForm(true), 100);

        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            setMousePos({
                x: x * 20,
                y: y * 20,
                tiltX: -y * 15,
                tiltY: x * 15
            });
        };

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            if (['missions', 'hub', 'governance', 'about'].includes(hash)) {
                setActiveSection(hash as any);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (!hash) {
                setActiveSection('landing');
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('hashchange', handleHashChange);

        // Initial check
        handleHashChange();

        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

        return () => {
            clearTimeout(timer);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('hashchange', handleHashChange);
            observer.disconnect();
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const validation = loginSchema.safeParse({
                    email: formData.email,
                    password: formData.password,
                    userType
                });
                if (!validation.success) {
                    throw new Error(validation.error.issues[0].message);
                }
                const user = await authService.login({
                    email: formData.email,
                    password: formData.password,
                    userType
                });
                authService.saveUser(user);
                onAuthSuccess(user);
            } else {
                const validation = signupSchema.safeParse({
                    email: formData.email,
                    password: formData.password,
                    name: formData.name,
                    userType,
                    description: formData.description
                });
                if (!validation.success) {
                    throw new Error(validation.error.issues[0].message);
                }
                const user = await authService.signup({
                    email: formData.email,
                    password: formData.password,
                    name: formData.name,
                    userType,
                    description: formData.description
                });
                authService.saveUser(user);
                onAuthSuccess(user);
            }
        } catch (err: any) {
            console.error('Full Auth Error:', err);
            setError(err.message || err.error_description || 'Authentication failed. Check your connection or credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="min-h-screen bg-[#02020a] relative overflow-hidden selection:bg-alchemy-500/30">
            {/* Immersive Background */}
            <div
                className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-alchemy-600/20 rounded-full blur-[120px] animate-pulse-glow"
                style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
            />
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse-glow delay-1000"
                style={{ transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)` }}
            />


            {/* Animated Grid Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            {/* Navbar (MetaMask Style) */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-12 py-4 flex items-center justify-between ${scrolled ? 'bg-[#02020a]/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
                <div className="flex items-center gap-12">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setActiveSection('landing');
                            window.history.pushState(null, '', '#');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex items-center gap-4 group cursor-pointer"
                    >
                        <div className="relative">
                            <div className="absolute -inset-1 bg-white/10 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div
                                className="relative w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:border-white/30 shadow-2xl"
                                style={{
                                    backgroundImage: `url(${logo})`,
                                    backgroundSize: '310%',
                                    backgroundPosition: 'center 43%',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            />
                        </div>
                        <span className="text-2xl font-black text-white tracking-widest hidden sm:block">ALCHEMY</span>
                    </a>

                    <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-400">
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveSection('landing');
                                window.history.pushState(null, '', '#');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] ${activeSection === 'landing' ? 'text-white border-b-2 border-alchemy-500 pb-1' : ''}`}
                        >
                            Home
                        </a>
                        <a href="#missions" className={`hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] ${activeSection === 'missions' ? 'text-white border-b-2 border-alchemy-500 pb-1' : ''}`}>Missions</a>
                        <a href="#hub" className={`hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] ${activeSection === 'hub' ? 'text-white border-b-2 border-alchemy-500 pb-1' : ''}`}>The Hub</a>
                        <a href="#governance" className={`hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] ${activeSection === 'governance' ? 'text-white border-b-2 border-alchemy-500 pb-1' : ''}`}>Governance</a>
                        <a href="#about" className={`hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] ${activeSection === 'about' ? 'text-white border-b-2 border-alchemy-500 pb-1' : ''}`}>About Us</a>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => { setIsLogin(true); setShowAuthModal(true); }}
                        className="hidden sm:block text-sm font-bold text-white px-6 py-2.5 rounded-full border border-white/10 hover:bg-white/5 transition-all"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => { setIsLogin(false); setShowAuthModal(true); }}
                        className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-widest transition-all hover:bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        Create Account
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 glass rounded-xl z-[60]"
                    >
                        <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                        <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                <div className={`fixed inset-0 bg-[#02020a]/95 backdrop-blur-2xl z-50 lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <div className="flex flex-col items-center justify-center h-full gap-8 p-12">
                        {[
                            { name: 'Home', section: 'landing' },
                            { name: 'Missions', section: 'missions' },
                            { name: 'The Hub', section: 'hub' },
                            { name: 'Governance', section: 'governance' },
                            { name: 'About Us', section: 'about' }
                        ].map((item) => (
                            <a
                                key={item.section}
                                href={`#${item.section === 'landing' ? '' : item.section}`}
                                onClick={(e) => {
                                    if (item.section === 'landing') {
                                        e.preventDefault();
                                        window.history.pushState(null, '', '#');
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }
                                    setActiveSection(item.section as any);
                                    setIsMobileMenuOpen(false);
                                }}
                                className="text-2xl font-black text-white uppercase tracking-[0.3em] hover:text-alchemy-500 transition-colors"
                            >
                                {item.name}
                            </a>
                        ))}
                        <div className="w-full h-px bg-white/10 my-8" />
                        <button
                            onClick={() => { setIsLogin(true); setShowAuthModal(true); setIsMobileMenuOpen(false); }}
                            className="w-full py-5 rounded-2xl border border-white/10 text-white font-black uppercase tracking-widest"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 pt-32 pb-20">
                {activeSection === 'landing' && (
                    <div className="max-w-7xl mx-auto px-6 lg:px-12 animate-fadeIn">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            {/* Left Side: Content */}
                            <div className={`space-y-10 transition-all duration-1000 ${showForm ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                                <div className="space-y-4">
                                    <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                                        Alchemy <br />
                                        <span className="text-gradient">Connect.</span>
                                    </h1>
                                </div>

                                <p className="text-xl lg:text-2xl text-slate-400 max-w-xl leading-relaxed font-medium">
                                    Empowering the next generation of social innovators through transparent, cryptographically-verified impact tracking and decentralized coordination.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <button
                                        onClick={() => {
                                            setIsLogin(false);
                                            setShowAuthModal(true);
                                        }}
                                        className="px-10 py-5 rounded-2xl bg-alchemy-600 text-white font-black text-lg uppercase tracking-widest hover:bg-alchemy-500 hover:shadow-[0_0_30px_rgba(41,121,255,0.4)] transition-all flex items-center justify-center gap-3 group"
                                    >
                                        Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>

                            {/* Right Side: Visual Showcase */}
                            <div id="visual-section" className={`transition-all duration-1000 delay-300 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                                <div className="relative group" style={{ perspective: '1000px' }}>
                                    <div className="absolute -inset-10 bg-alchemy-500/20 rounded-full blur-[100px] animate-pulse-glow pointer-events-none" />
                                    <div className="relative transition-transform duration-200 ease-out" style={{ transform: `rotateX(${mousePos.tiltX}deg) rotateY(${mousePos.tiltY}deg)`, transformStyle: 'preserve-3d' }}>
                                        <div className="relative bg-[#0a0a1a]/40 backdrop-blur-3xl rounded-[3rem] p-4 overflow-hidden border border-white/5 shadow-2xl">
                                            <ElectricBorder color="#00e5ff" speed={0.5} chaos={0.1} thickness={3} style={{ borderRadius: '3rem', width: '100%' }}>
                                                <div className="relative aspect-square lg:aspect-[5/6] bg-black/40 rounded-[2.8rem] overflow-hidden flex items-center justify-center p-12">
                                                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                                                        <div className="relative transform-gpu">
                                                            <Hexagon className="w-48 h-48 lg:w-64 lg:h-64 text-alchemy-500 fill-alchemy-500/5 stroke-[0.5] animate-float" />
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <div className="w-32 h-32 lg:w-40 lg:h-40 glass rounded-full flex items-center justify-center border-alchemy-500/20 animate-pulse-glow overflow-hidden">
                                                                    <Zap className="w-16 h-16 lg:w-20 lg:h-20 text-white fill-white shadow-[0_0_50px_rgba(0,229,255,0.5)]" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ElectricBorder>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Landing Secondary Sections */}
                        <div className="mt-32">
                            {/* Content moved to partials for brevity in this replace call */}
                            <div className="reveal-on-scroll up opacity-0 translate-y-10 transition-all duration-1000">
                                <div className="text-center space-y-8">
                                    <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] reveal-on-scroll down">Global Trust Network</p>
                                    <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-500 stagger-reveal">
                                        <span className="text-2xl font-black text-white tracking-tighter">UNICEF</span>
                                        <span className="text-2xl font-black text-white tracking-tighter">RED CROSS</span>
                                        <span className="text-2xl font-black text-white tracking-tighter">WHO</span>
                                        <span className="text-2xl font-black text-white tracking-tighter">GATES FDN</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'missions' && <MissionsSection />}
                {activeSection === 'hub' && <HubSection />}
                {activeSection === 'governance' && <GovernanceSection />}
                {activeSection === 'about' && <AboutSection />}
            </main>

            {activeSection === 'landing' && (
                <>
                    {/* The Protocol Section (How it Works) */}
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <div className="mt-64 space-y-32">
                            <div className="text-center space-y-6 reveal-on-scroll up">
                                <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter">The <span className="text-gradient">Protocol.</span></h2>
                                <p className="text-slate-400 max-w-2xl mx-auto font-medium text-lg">Four layers of innovation designed to decentralize community transformation.</p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-reveal">
                                {[
                                    { title: 'Identity', desc: 'Secure your impact legacy with a unique cryptographic ID.', icon: User, color: 'blue' },
                                    { title: 'Connect', desc: 'Bridge with global NGOs and verified local projects.', icon: Globe, color: 'alchemy' },
                                    { title: 'Verify', desc: 'Proof-of-Impact protocol validates every contribution.', icon: ShieldCheck, color: 'green' },
                                    { title: 'Reward', desc: 'Unlock real-world value through our catalyst network.', icon: Zap, color: 'purple' }
                                ].map((item, i) => (
                                    <div key={i} className="group p-8 glass rounded-[2.5rem] border-white/5 hover:border-alchemy-500/30 transition-all hover:-translate-y-2 reveal-on-scroll up">
                                        <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-white`}>
                                            <item.icon className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Impact Numbers Section */}
                        <div className="mt-64 py-32 relative overflow-hidden">
                            <div className="absolute inset-0 bg-alchemy-500/5 blur-[120px] rounded-full animate-pulse-glow" />
                            <div className="relative grid lg:grid-cols-3 gap-12 text-center reveal-on-scroll zoom">
                                <div className="space-y-2">
                                    <div className="text-7xl lg:text-9xl font-black text-white tracking-tighter">50K+</div>
                                    <div className="text-sm font-black text-alchemy-500 uppercase tracking-[0.3em]">Active Agents</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-7xl lg:text-9xl font-black text-white tracking-tighter text-gradient">$12M</div>
                                    <div className="text-sm font-black text-alchemy-500 uppercase tracking-[0.3em]">Value Generated</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-7xl lg:text-9xl font-black text-white tracking-tighter">1.4K</div>
                                    <div className="text-sm font-black text-alchemy-500 uppercase tracking-[0.3em]">Nodes Online</div>
                                </div>
                            </div>
                        </div>

                        {/* Ecosystem Security (Perspective Reveal) */}
                        <div className="mt-64 grid lg:grid-cols-2 gap-20 items-center">
                            <div className="order-2 lg:order-1 relative reveal-on-scroll tilt">
                                <div className="absolute -inset-10 bg-purple-500/10 rounded-full blur-[100px] animate-pulse-glow" />
                                <div className="relative glass aspect-video rounded-[3rem] p-8 border-white/5 overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-transparent" />
                                    <Lock className="w-48 h-48 text-purple-500/20 absolute animate-rotate-slow" />
                                    <div className="relative z-10 space-y-6 text-center">
                                        <ShieldCheck className="w-20 h-20 text-white mx-auto animate-float-y" />
                                        <div className="text-2xl font-bold text-white uppercase tracking-widest">End-to-End <br /> Encryption</div>
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2 space-y-8 reveal-on-scroll right">
                                <div className="w-16 h-1 bg-gradient-to-r from-alchemy-500 to-transparent rounded-full" />
                                <h2 className="text-5xl lg:text-7xl font-black text-white leading-none">Military Grade <br /><span className="text-gradient text-purple-500">Security.</span></h2>
                                <p className="text-xl text-slate-400 font-medium leading-relaxed">Your data and impact history are protected by cutting-edge cryptographic protocols, ensuring 100% immutability and ownership.</p>
                                <ul className="space-y-4">
                                    {['Biometric Web3 Auth', 'Encrypted Impact Vaults', 'Multi-Node Consensus'].map((text, i) => (
                                        <li key={i} className="flex items-center gap-4 text-white font-bold">
                                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-[10px]"><Zap className="w-3 h-3 fill-current" /></div>
                                            {text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Final CTA Section */}
                        <div className="mt-80 mb-32 reveal-on-scroll up text-center">
                            <div className="relative glass rounded-[4rem] p-12 lg:p-24 overflow-hidden border-white/10 group">
                                <div className="absolute inset-0 bg-gradient-to-br from-alchemy-600/20 via-transparent to-purple-600/20 opacity-50" />
                                <div className="relative z-10 space-y-12">
                                    <h2 className="text-6xl lg:text-9xl font-black text-white tracking-tighter leading-none">Ready to <br />Catalyze <span className="text-gradient">Change?</span></h2>
                                    <p className="text-xl lg:text-2xl text-slate-400 max-w-2xl mx-auto font-medium">Join 100+ million heroes building the future of community coordination.</p>
                                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                                        <button onClick={() => { setIsLogin(false); setShowAuthModal(true); }} className="px-12 py-6 rounded-3xl bg-white text-black font-black text-xl uppercase tracking-widest hover:scale-105 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.2)]">Get Started Free</button>
                                        <button className="px-12 py-6 rounded-3xl bg-white/5 border border-white/10 text-white font-black text-xl uppercase tracking-widest hover:bg-white/10 transition-all">Read Whitepaper</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}


            {/* Authentication Modal */}
            {
                showAuthModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 pb-20 overflow-y-auto">
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                            onClick={() => setShowAuthModal(false)}
                        />

                        <div className="relative w-full max-w-md glass rounded-[3rem] p-8 lg:p-12 border-white/10 animate-reveal">
                            <div className="mb-8 space-y-2">
                                <h2 className="text-3xl font-black text-white tracking-tight">
                                    {isLogin ? 'Welcome Back' : 'Join the Network'}
                                </h2>
                                <p className="text-slate-400 text-sm font-medium">
                                    {isLogin ? 'Enter your credentials to access the hub' : 'Create your decentralized impact profile'}
                                </p>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {!isLogin && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setUserType('volunteer')}
                                            className={`py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${userType === 'volunteer' ? 'bg-alchemy-500/10 border-alchemy-500/40 text-alchemy-400' : 'bg-transparent border-white/5 text-slate-500 hover:border-white/10'}`}
                                        >
                                            Volunteer
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setUserType('organization')}
                                            className={`py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${userType === 'organization' ? 'bg-alchemy-500/10 border-alchemy-500/40 text-alchemy-400' : 'bg-transparent border-white/5 text-slate-500 hover:border-white/10'}`}
                                        >
                                            Organization
                                        </button>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    {!isLogin && (
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-alchemy-500 transition-colors" />
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder={userType === 'volunteer' ? "Full Name" : "Organization Name"}
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:bg-white/[0.05] focus:border-alchemy-500/50 focus:outline-none transition-all"
                                                required
                                            />
                                        </div>
                                    )}

                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-alchemy-500 transition-colors" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:bg-white/[0.05] focus:border-alchemy-500/50 focus:outline-none transition-all"
                                            required
                                        />
                                    </div>

                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-alchemy-500 transition-colors" />
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:bg-white/[0.05] focus:border-alchemy-500/50 focus:outline-none transition-all"
                                            required
                                        />
                                    </div>

                                    {!isLogin && userType === 'organization' && (
                                        <div className="relative group">
                                            <Building2 className="absolute left-4 top-4 w-5 h-5 text-slate-500 group-focus-within:text-alchemy-500 transition-colors" />
                                            <textarea
                                                name="description"
                                                placeholder="Tell us about your organization's mission..."
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:bg-white/[0.05] focus:border-alchemy-500/50 focus:outline-none transition-all min-h-[120px] resize-none"
                                                required
                                            />
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-5 rounded-2xl bg-alchemy-600 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-alchemy-500 hover:shadow-[0_0_30px_rgba(41,121,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 group"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            {isLogin ? 'Sign In' : 'Initialize Account'}
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>

                                <div className="pt-6 text-center">
                                    <button
                                        type="button"
                                        onClick={() => setIsLogin(!isLogin)}
                                        className="text-xs font-bold text-slate-500 hover:text-white transition-colors"
                                    >
                                        {isLogin ? "Don't have an account? Join the network" : "Already verified? Sign in here"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {/* Floating Background Decorations */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[20%] right-[-5%] w-[40rem] h-[40rem] bg-alchemy-600/5 rounded-full blur-[200px] animate-float-y" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-purple-600/5 rounded-full blur-[200px] animate-float-x" />
                <div className="absolute top-[40%] left-[20%] w-px h-[1000px] bg-gradient-to-b from-transparent via-alchemy-500/20 to-transparent rotate-12" />
                <div className="absolute top-[30%] right-[30%] w-px h-[800px] bg-gradient-to-b from-transparent via-purple-500/20 to-transparent -rotate-12" />
            </div>

            {/* Footer (MetaMask Style) */}
            <footer className="relative z-10 border-t border-white/5 bg-black/20 backdrop-blur-3xl pt-24 pb-12 px-6 lg:px-12 mt-32">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
                        <div className="col-span-2 lg:col-span-1 space-y-6">
                            <div className="flex items-center gap-4 group">
                                <div
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden transition-colors group-hover:border-white/20"
                                    style={{
                                        backgroundImage: `url(${logo})`,
                                        backgroundSize: '310%',
                                        backgroundPosition: 'center 43%',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                />
                                <span className="text-xl font-black text-white tracking-widest">ALCHEMY</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-widest">
                                The world’s leading digital gateway for community impact trackers.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Ecosystem</h4>
                            <ul className="space-y-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                <li><a href="#" className="hover:text-alchemy-400 transition-colors">Project Hub</a></li>
                                <li><a href="#" className="hover:text-alchemy-400 transition-colors">Impact Store</a></li>
                                <li><a href="#" className="hover:text-alchemy-400 transition-colors">Active Missions</a></li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Build</h4>
                            <ul className="space-y-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                <li><a href="#" className="hover:text-alchemy-400 transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-alchemy-400 transition-colors">Node SDK</a></li>
                                <li><a href="#" className="hover:text-alchemy-400 transition-colors">API Reference</a></li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Learn</h4>
                            <ul className="space-y-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                <li><a href="#" className="hover:text-alchemy-400 transition-colors">Whitepaper</a></li>
                                <li><a href="#" className="hover:text-alchemy-400 transition-colors">The Catalyst</a></li>
                                <li><a href="#" className="hover:text-alchemy-400 transition-colors">Security Audit</a></li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Network</h4>
                            <ul className="space-y-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                <li><a href="#" className="hover:text-alchemy-400 transition-colors">Discord</a></li>
                                <li><a href="#" className="hover:text-alchemy-400 transition-colors">Governance</a></li>
                                <li><a href="#" className="hover:text-alchemy-400 transition-colors">Twitter (X)</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">© 2026 Alchemy Connect. Built for the community.</p>
                        <div className="flex gap-6">
                            <div className="w-5 h-5 bg-slate-800 rounded-full" />
                            <div className="w-5 h-5 bg-slate-800 rounded-full" />
                            <div className="w-5 h-5 bg-slate-800 rounded-full" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}



