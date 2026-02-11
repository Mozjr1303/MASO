import React from 'react';
import { Loader2 } from 'lucide-react';
import { supabase } from '../../services/supabaseClient';

interface Mission {
    id: number;
    title: string;
    tags: string[];
    progress: number;
    color: string;
}

export const MissionsSection = () => {
    const [missions, setMissions] = React.useState<Mission[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchMissions = async () => {
            try {
                const { data, error } = await supabase
                    .from('missions')
                    .select('*');

                if (error) throw error;
                setMissions(data || []);
            } catch (err) {
                console.error('Error fetching missions:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMissions();
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
            <div className="text-center max-w-3xl mx-auto space-y-6 mb-20">
                <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter">Global <span className="text-gradient">Missions.</span></h1>
                <p className="text-xl text-slate-400 font-medium">Browse and contribute to cross-border initiatives verified by the protocol.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {missions.map((mission, i) => (
                    <div key={i} className="glass rounded-[2rem] p-8 border-white/5 space-y-6 hover:translate-y-[-10px] transition-all duration-500 group">
                        <div className="flex gap-2">
                            {Array.isArray(mission.tags) && mission.tags.map(tag => (
                                <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-white/5 text-white/50 rounded-lg">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h3 className="text-2xl font-black text-white">{mission.title}</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                                <span>Progress</span>
                                <span>{mission.progress}%</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-alchemy-500 to-purple-500 rounded-full" style={{ width: `${mission.progress}%` }} />
                            </div>
                        </div>
                        <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all">Support Mission</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
