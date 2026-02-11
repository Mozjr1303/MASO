import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { supabase } from '../../services/supabaseClient';

interface Proposal {
    id: number;
    title: string;
    status: string;
    votes: string;
}

export const GovernanceSection = () => {
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const { data, error } = await supabase
                    .from('proposals')
                    .select('*');

                if (error) throw error;
                setProposals(data || []);
            } catch (err) {
                console.error('Error fetching proposals:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProposals();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-40">
                <Loader2 className="w-12 h-12 text-alchemy-500 animate-spin" />
            </div>
        );
    }
    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 animate-fadeIn py-20">
            <div className="text-center max-w-2xl mx-auto space-y-6 mb-20">
                <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter">Ecosystem <span className="text-gradient">Governance.</span></h1>
                <p className="text-xl text-slate-400 font-medium leading-relaxed">The Alchemy Protocol is governed by its contributors. Submit proposals, vote on missions, and shape the future.</p>
            </div>
            <div className="space-y-4">
                {proposals.map((prop, i) => (
                    <div key={i} className="glass rounded-3xl p-8 border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-white/[0.03] transition-colors group">
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${prop.status === 'Passed' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-alchemy-500/10 border-alchemy-500/20 text-alchemy-400'}`}>{prop.status}</span>
                                <span className="text-[10px] font-bold text-slate-500">ID: {100 + i}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white group-hover:text-alchemy-400 transition-colors">{prop.title}</h3>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="text-right">
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Quorum</div>
                                <div className="text-sm font-black text-white">{prop.votes}</div>
                            </div>
                            <button className="px-6 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Vote Now</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
