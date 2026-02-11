import React from 'react';
import { Globe, Zap, ShieldCheck } from 'lucide-react';

export const HubSection = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 animate-fadeIn py-20">
            <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
                <div className="space-y-8">
                    <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter">The <span className="text-gradient">Collaboration Hub.</span></h1>
                    <p className="text-xl text-slate-400 font-medium leading-relaxed">A central nexus for organizations, volunteers, and stakeholders to coordinate resources in real-time.</p>
                    <div className="space-y-4">
                        {[
                            { icon: Globe, label: 'Real-time Global Sync' },
                            { icon: Zap, label: 'Instant Resource Allocation' },
                            { icon: ShieldCheck, label: 'Verified Governance' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 text-white font-bold">
                                <div className="w-10 h-10 rounded-xl bg-alchemy-500/10 flex items-center justify-center text-alchemy-500"><item.icon className="w-5 h-5" /></div>
                                {item.label}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute -inset-10 bg-alchemy-500/10 blur-[100px] animate-pulse-glow" />
                    <div className="relative glass aspect-video rounded-[3rem] p-12 flex flex-col justify-between overflow-hidden">
                        <div className="text-3xl font-black text-white uppercase tracking-tighter">Network <br />Visualizer 2.0</div>
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-xs font-black text-green-400 uppercase tracking-widest">System Online</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
