import React from 'react';

export const AboutSection = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 animate-fadeIn py-20">
            <div className="max-w-3xl space-y-12">
                <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none">Our <span className="text-gradient">Narrative.</span></h1>
                <div className="space-y-8 text-xl text-slate-400 font-medium leading-relaxed">
                    <p>Alchemy Connect was born from a simple yet radical idea: that social impact should be as transparent, efficient, and verifiable as a financial transaction.</p>
                    <p>In a world where trust in institutions is at an all-time low, we provide the cryptographic framework for communities to self-organize, fund, and execute transformation without central intermediaries.</p>
                    <p>We aren't just building a tool; we are building the foundation of Decentralized Social Coordination (DeSoCo).</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-8 pt-12">
                    <div className="space-y-2">
                        <div className="text-2xl font-black text-white uppercase tracking-widest">Ownership</div>
                        <p className="text-sm text-slate-500">Volunteers own their data and impact history permanently.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-2xl font-black text-white uppercase tracking-widest">Efficiency</div>
                        <p className="text-sm text-slate-500">Protocol-level verification removes 99% of administrative overhead.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
