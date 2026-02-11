import React, { useState, useEffect } from 'react';
import { Download, X, Sparkles } from 'lucide-react';

export const PWAInstallOverlay: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        // 1. Check for standard beforeinstallprompt (Android/Chrome/Edge)
        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowPrompt(true);
        };

        // 2. Detection (Don't show if already installed)
        const isStandalone = (window.navigator as any).standalone === true || window.matchMedia('(display-mode: standalone)').matches;
        if (isStandalone) return;

        // 3. iOS Detection (iOS doesn't support beforeinstallprompt)
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

        // If iOS and not already installed, show prompt after a short delay
        if (isIOS) {
            const timer = setTimeout(() => setShowPrompt(true), 3000);
            return () => clearTimeout(timer);
        }

        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            setDeferredPrompt(null);
            setShowPrompt(false);
        } else {
            // iOS fallback instructions
            alert("To install on iOS: Tap the 'Share' icon in Safari and select 'Add to Home Screen'!");
            setShowPrompt(false);
        }
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed bottom-6 left-4 right-4 z-[9999] animate-reveal">
            <div className="glass p-5 rounded-[2rem] border border-alchemy-500/30 shadow-[0_0_50px_rgba(0,229,255,0.2)] relative overflow-hidden group">
                {/* Animated background glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-alchemy-500/10 to-alchemy-700/10 blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                <div className="relative flex items-center gap-4">
                    <div className="w-14 h-14 bg-alchemy-500/20 rounded-2xl flex items-center justify-center border border-alchemy-500/40 relative">
                        <Download className="w-7 h-7 text-alchemy-500" />
                        <div className="absolute -top-1 -right-1">
                            <Sparkles className="w-4 h-4 text-alchemy-500 animate-pulse" />
                        </div>
                    </div>

                    <div className="flex-1">
                        <h3 className="text-white font-black text-lg leading-tight uppercase tracking-tighter">Install Alchemy</h3>
                        <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest opacity-70">Experience the Full Link</p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowPrompt(false)}
                            className="p-2 text-slate-500 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleInstall}
                            className="bg-alchemy-600 hover:bg-alchemy-500 text-white px-6 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-alchemy-600/30 transition-all hover:scale-105 active:scale-95"
                        >
                            Install
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
