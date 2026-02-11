import React, { useState } from 'react';
import { User, AuthUser } from '../types';
import { User as UserIcon, Mail, Camera, Save, MapPin, FileText } from 'lucide-react';

interface ProfileProps {
    user: User;
    onUpdate: (updatedUser: Partial<User>) => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        avatar: user.avatar || '',
        bio: user.bio || '',
        location: user.location || ''
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(formData);
        setIsEditing(false);
        alert('Profile updated successfully!');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn text-slate-200">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-extrabold text-white flex items-center tracking-tight">
                    <div className="w-10 h-10 bg-alchemy-500/20 rounded-xl flex items-center justify-center mr-4 border border-alchemy-500/30">
                        <UserIcon className="w-6 h-6 text-alchemy-500" />
                    </div>
                    My Profile
                </h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-2.5 bg-white/5 text-slate-300 rounded-xl font-bold border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            <div className="bg-[#0f172a]/60 backdrop-blur-xl rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                <div className="h-32 bg-gradient-to-r from-alchemy-600/20 via-alchemy-500/20 to-indigo-600/20 relative">
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                <div className="px-10 pb-10">
                    <div className="flex flex-col items-center -mt-16 mb-10 relative z-10">
                        <div className="relative group">
                            <div className="absolute -inset-1.5 bg-gradient-to-r from-alchemy-400 to-alchemy-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                            <img
                                src={formData.avatar || 'https://picsum.photos/id/64/100/100'}
                                alt="Profile"
                                className="relative w-36 h-36 rounded-full object-cover border-4 border-[#0f172a] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                            {isEditing && (
                                <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-4 border-transparent">
                                    <Camera className="w-10 h-10 text-white" />
                                </div>
                            )}
                        </div>
                        <h3 className="mt-6 text-3xl font-black text-white tracking-tight">{user.name}</h3>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-alchemy-500 font-bold uppercase tracking-widest text-xs py-1 px-3 bg-alchemy-500/10 rounded-full border border-alchemy-500/20">
                                Level {user.level} Alchemist
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                                <div className="relative group">
                                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-alchemy-500 transition-colors" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-alchemy-500/50 transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-slate-700"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-alchemy-500 transition-colors" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-alchemy-500/50 transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-slate-700"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Current Location</label>
                            <div className="relative group">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-alchemy-500 transition-colors" />
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-alchemy-500/50 transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-slate-700"
                                    placeholder="City, Country"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Personal Bio</label>
                            <div className="relative group">
                                <FileText className="absolute left-4 top-4 w-5 h-5 text-slate-500 group-focus-within:text-alchemy-500 transition-colors" />
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                                    disabled={!isEditing}
                                    rows={4}
                                    className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-alchemy-500/50 transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed resize-none placeholder:text-slate-700"
                                    placeholder="Tell the community about your passions..."
                                />
                            </div>
                        </div>

                        {isEditing && (
                            <div className="space-y-3 animate-fadeIn">
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Avatar Image URL</label>
                                <div className="relative group">
                                    <Camera className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-alchemy-500 transition-colors" />
                                    <input
                                        type="text"
                                        name="avatar"
                                        value={formData.avatar}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-alchemy-500/50 transition-all text-white placeholder:text-slate-700"
                                        placeholder="https://example.com/avatar.jpg"
                                    />
                                </div>
                            </div>
                        )}

                        {isEditing && (
                            <div className="pt-6 flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setFormData({
                                            name: user.name,
                                            email: user.email,
                                            avatar: user.avatar || '',
                                            bio: user.bio || '',
                                            location: user.location || ''
                                        });
                                    }}
                                    className="px-8 py-3.5 bg-white/5 text-slate-400 rounded-xl font-bold hover:bg-white/10 hover:text-white transition-all shadow-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-3.5 bg-gradient-to-r from-alchemy-600 to-alchemy-500 text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(0,121,255,0.4)] transition-all flex items-center gap-2 group"
                                >
                                    <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};
