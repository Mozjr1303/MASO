import React, { useState } from 'react';
import { Plus, Calendar, MapPin, Users, Edit, Trash2, CheckCircle, Clock, Building2, X } from 'lucide-react';
import { Event, Organization } from '../types';

interface OrganizationDashboardProps {
    organization: Organization;
    events: Event[];
    onCreateEvent: (event: Omit<Event, 'id' | 'spotsTaken'>) => void;
    onEditEvent: (eventId: string, updates: Partial<Event>) => void;
    onDeleteEvent: (eventId: string) => void;
}

export function OrganizationDashboard({
    organization,
    events,
    onCreateEvent,
    onEditEvent,
    onDeleteEvent
}: OrganizationDashboardProps) {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        category: 'Community' as Event['category'],
        spotsTotal: 10,
        imageUrl: 'https://picsum.photos/id/180/400/300'
    });

    // Filter events created by this organization
    const myEvents = events.filter(e => e.organizationId === organization.id);
    const upcomingEvents = myEvents.filter(e => new Date(e.date) >= new Date());
    const pastEvents = myEvents.filter(e => new Date(e.date) < new Date());

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreateEvent({
            ...formData,
            organization: organization.name,
            organizationId: organization.id
        });
        setFormData({
            title: '',
            date: '',
            time: '',
            location: '',
            description: '',
            category: 'Community',
            spotsTotal: 10,
            imageUrl: 'https://picsum.photos/id/180/400/300'
        });
        setShowCreateForm(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
        setFormData(prev => ({
            ...prev,
            [e.target.name]: value
        }));
    };

    return (
        <div className="space-y-8 animate-fadeIn text-slate-200">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-[2rem] p-10 relative overflow-hidden border border-white/5 shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-alchemy-500/10 rounded-full blur-[80px]" />

                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-alchemy-400 to-alchemy-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative w-24 h-24 bg-slate-900 rounded-2xl flex items-center justify-center p-1 border border-white/10 ring-1 ring-white/5">
                                {organization.logo ? (
                                    <img
                                        src={organization.logo}
                                        alt={organization.name}
                                        className="w-full h-full rounded-xl object-cover"
                                    />
                                ) : (
                                    <Building2 className="w-12 h-12 text-alchemy-500" />
                                )}
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h1 className="text-4xl font-extrabold tracking-tight text-white">{organization.name}</h1>
                            <p className="text-slate-400 max-w-xl text-lg font-medium">{organization.description}</p>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                                <span className="flex items-center gap-2 text-sm bg-alchemy-500/10 text-alchemy-400 px-4 py-1.5 rounded-full font-bold border border-alchemy-500/20">
                                    <Calendar className="w-4 h-4" />
                                    {organization.eventsCreated} Events Managed
                                </span>
                                {organization.verified && (
                                    <span className="flex items-center gap-2 text-sm bg-green-500/10 text-green-400 px-4 py-1.5 rounded-full font-bold border border-green-500/20">
                                        <CheckCircle className="w-4 h-4" />
                                        Verified Organization
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowCreateForm(true)}
                        className="group relative px-8 py-4 bg-alchemy-600 text-white rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 flex items-center gap-3 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-alchemy-400 to-alchemy-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Plus className="w-6 h-6 relative z-10" />
                        <span className="relative z-10">Create New Event</span>
                    </button>
                </div>
            </div>

            {/* Create Event Form Modal */}
            {showCreateForm && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md">
                    <div className="bg-[#0f172a] border border-white/10 rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-slideUp">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-extrabold text-white">Create New Event</h2>
                            <button onClick={() => setShowCreateForm(false)} className="text-slate-500 hover:text-white transition-colors">
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Event Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-alchemy-500/50 transition-all text-white placeholder:text-slate-700"
                                    placeholder="e.g. Community Tech Workshop"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-alchemy-500/50 transition-all text-white inverted-scheme"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Time</label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-alchemy-500/50 transition-all text-white inverted-scheme"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Location</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-12 pr-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-alchemy-500/50 transition-all text-white placeholder:text-slate-700"
                                        placeholder="City Hall or Virtual Link"
                                    />
                                    <MapPin className="absolute left-4 top-4.5 w-5 h-5 text-slate-500" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-alchemy-500/50 transition-all text-white appearance-none"
                                    >
                                        <option value="Environment" className="bg-[#0f172a]">Environment</option>
                                        <option value="Education" className="bg-[#0f172a]">Education</option>
                                        <option value="Community" className="bg-[#0f172a]">Community</option>
                                        <option value="Health" className="bg-[#0f172a]">Health</option>
                                        <option value="Animals" className="bg-[#0f172a]">Animals</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Total Spots</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="spotsTotal"
                                            value={formData.spotsTotal}
                                            onChange={handleInputChange}
                                            required
                                            min="1"
                                            className="w-full pl-12 pr-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-alchemy-500/50 transition-all text-white"
                                        />
                                        <Users className="absolute left-4 top-4.5 w-5 h-5 text-slate-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows={4}
                                    className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-alchemy-500/50 transition-all text-white placeholder:text-slate-700 resize-none"
                                    placeholder="Tell potential volunteers why they should join..."
                                />
                            </div>

                            <div className="flex gap-4 pt-6">
                                <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-alchemy-600 to-alchemy-500 text-white py-4 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300"
                                >
                                    Publish Event
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowCreateForm(false)}
                                    className="px-8 py-4 bg-white/5 text-slate-400 rounded-xl font-bold hover:bg-white/10 hover:text-white transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group bg-[#0f172a]/50 backdrop-blur-md rounded-2xl p-8 border border-white/5 hover:border-alchemy-500/30 transition-all duration-500 shadow-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Total Events</p>
                            <p className="text-4xl font-extrabold text-white group-hover:text-alchemy-400 transition-colors">{myEvents.length}</p>
                        </div>
                        <div className="w-16 h-16 bg-alchemy-500/10 rounded-2xl flex items-center justify-center group-hover:bg-alchemy-500/20 transition-all">
                            <Calendar className="w-8 h-8 text-alchemy-500" />
                        </div>
                    </div>
                </div>

                <div className="group bg-[#0f172a]/50 backdrop-blur-md rounded-2xl p-8 border border-white/5 hover:border-alchemy-500/30 transition-all duration-500 shadow-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Upcoming</p>
                            <p className="text-4xl font-extrabold text-white group-hover:text-alchemy-400 transition-colors">{upcomingEvents.length}</p>
                        </div>
                        <div className="w-16 h-16 bg-alchemy-500/10 rounded-2xl flex items-center justify-center group-hover:bg-alchemy-500/20 transition-all">
                            <Clock className="w-8 h-8 text-alchemy-500" />
                        </div>
                    </div>
                </div>

                <div className="group bg-[#0f172a]/50 backdrop-blur-md rounded-2xl p-8 border border-white/5 hover:border-alchemy-500/30 transition-all duration-500 shadow-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Total Volunteers</p>
                            <p className="text-4xl font-extrabold text-white group-hover:text-alchemy-400 transition-colors">
                                {myEvents.reduce((sum, e) => sum + e.spotsTaken, 0)}
                            </p>
                        </div>
                        <div className="w-16 h-16 bg-alchemy-500/10 rounded-2xl flex items-center justify-center group-hover:bg-alchemy-500/20 transition-all">
                            <Users className="w-8 h-8 text-alchemy-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Events List */}
            <div className="pt-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-extrabold text-white">Your Events</h2>
                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                        <button className="px-5 py-2 rounded-lg bg-alchemy-600 text-white font-bold text-sm">All</button>
                        <button className="px-5 py-2 rounded-lg text-slate-400 font-bold text-sm hover:text-white transition-colors">Drafts</button>
                    </div>
                </div>

                {myEvents.length === 0 ? (
                    <div className="text-center py-24 bg-[#0f172a]/30 rounded-[2.5rem] border border-dashed border-white/10">
                        <div className="bg-alchemy-500/10 p-6 rounded-3xl inline-block mb-6">
                            <Calendar className="w-12 h-12 text-alchemy-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">No impact stories yet</h3>
                        <p className="text-slate-500 mb-10 max-w-md mx-auto text-lg">
                            Ready to make a difference? Create your first event and start connecting with amazing volunteers.
                        </p>
                        <button
                            onClick={() => setShowCreateForm(true)}
                            className="px-10 py-4 bg-alchemy-600 text-white rounded-2xl font-bold hover:shadow-[0_0_25px_rgba(0,121,255,0.4)] transition-all duration-300"
                        >
                            Get Started
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {myEvents.map(event => (
                            <div key={event.id} className="group bg-[#0f172a]/40 backdrop-blur-sm rounded-[2rem] p-8 border border-white/5 hover:border-white/10 transition-all duration-500">
                                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex flex-wrap items-center gap-4">
                                            <h3 className="text-2xl font-bold text-white group-hover:text-alchemy-400 transition-colors uppercase tracking-tight">{event.title}</h3>
                                            <span className={`text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${event.category === 'Environment' ? 'bg-green-500/20 text-green-400 border border-green-500/20' :
                                                event.category === 'Education' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' :
                                                    event.category === 'Community' ? 'bg-alchemy-500/20 text-alchemy-400 border border-alchemy-500/20' :
                                                        event.category === 'Health' ? 'bg-red-500/20 text-red-400 border border-red-500/20' :
                                                            'bg-orange-500/20 text-orange-400 border border-orange-500/20'
                                                }`}>
                                                {event.category}
                                            </span>
                                        </div>
                                        <p className="text-slate-400 text-lg leading-relaxed">{event.description}</p>
                                        <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2 text-sm font-bold text-slate-500">
                                            <span className="flex items-center gap-2 group-hover:text-slate-300 transition-colors">
                                                <Calendar className="w-4 h-4 text-alchemy-500" />
                                                {event.date} • {event.time}
                                            </span>
                                            <span className="flex items-center gap-2 group-hover:text-slate-300 transition-colors">
                                                <MapPin className="w-4 h-4 text-alchemy-500" />
                                                {event.location}
                                            </span>
                                            <span className="flex items-center gap-2 group-hover:text-slate-300 transition-colors">
                                                <Users className="w-4 h-4 text-alchemy-500" />
                                                <span className="text-white">{event.spotsTaken}</span> / {event.spotsTotal} ENROLLED
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex md:flex-col gap-3">
                                        <button
                                            onClick={() => {/* TODO: Implement edit */ }}
                                            className="w-12 h-12 flex items-center justify-center text-slate-500 bg-white/5 rounded-xl hover:bg-alchemy-500/10 hover:text-alchemy-400 border border-white/5 transition-all"
                                            title="Edit event"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (confirm('Are you sure you want to delete this event?')) {
                                                    onDeleteEvent(event.id);
                                                }
                                            }}
                                            className="w-12 h-12 flex items-center justify-center text-slate-500 bg-white/5 rounded-xl hover:bg-red-500/10 hover:text-red-500 border border-white/5 transition-all"
                                            title="Delete event"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
