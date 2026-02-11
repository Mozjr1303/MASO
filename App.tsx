import React, { useState, useCallback, useEffect } from 'react';
import { LayoutGrid, CalendarHeart, User, Hexagon, Filter, X, Menu, Sparkles, LogOut } from 'lucide-react';
import logo from './assets/logo.png';
import { Event, UserActivity, ViewState, AuthUser, User as UserType, Organization } from './types';
import { MOCK_EVENTS } from './constants';

import { authService } from './services/authService';
import { eventService } from './services/eventService';
import { EventCard } from './components/EventCard';

import { AuthForm } from './components/AuthForm';
import { OrganizationDashboard } from './components/OrganizationDashboard';
import { Profile } from './components/Profile';
import { PWAInstallOverlay } from './components/PWAInstallOverlay';


export default function App() {
  console.log("ALCHEMY CONNECT: App component mounting...");
  // Auth State
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // App State
  const [view, setView] = useState<ViewState>('explore');
  const [events, setEvents] = useState<Event[]>([]);
  const [myActivities, setMyActivities] = useState<UserActivity[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



  // Check for existing session on mount
  useEffect(() => {
    // 1. Initial session check
    const checkSession = async () => {
      try {
        const { data: { session } } = await authService.getSession();
        if (session?.user) {
          // Fetch the profile for this user
          const { data: profile } = await authService.getProfile(session.user.id);
          if (profile) {
            const user: AuthUser = {
              id: profile.id,
              email: profile.email,
              name: profile.name,
              type: profile.type as 'volunteer' | 'organization',
              level: profile.level,
              joinedDate: profile.joined_date,
              description: profile.description,
              verified: profile.verified,
              eventsCreated: profile.events_created,
              avatar: profile.avatar_url,
              token: session.access_token
            } as any;
            setAuthUser(user);
            setIsAuthenticated(true);
            authService.saveUser(user);
          }
        }
      } catch (err) {
        console.error('Initial session check failed:', err);
      }
    };

    checkSession();

    // 3. Fetch events
    const fetchEvents = async () => {
      try {
        const data = await eventService.getEvents();
        setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };
    fetchEvents();

    // 2. Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setAuthUser(null);
        setIsAuthenticated(false);
      } else if (event === 'SIGNED_IN' && session) {
        // Handled by handleAuthSuccess usually, but good for persistence
      }
    });

    return () => subscription.unsubscribe();
  }, []);


  const handleAuthSuccess = (user: AuthUser) => {
    setAuthUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await authService.logout();
    setAuthUser(null);
    setIsAuthenticated(false);
    setMyActivities([]);
    setView('explore');
  };

  const handleJoinEvent = useCallback(async (eventId: string) => {
    try {
      await eventService.joinEvent(eventId);

      setEvents(prevEvents =>
        prevEvents.map(ev =>
          ev.id === eventId ? { ...ev, spotsTaken: ev.spotsTaken + 1 } : ev
        )
      );

      setMyActivities(prev => [
        ...prev,
        { eventId, joinedAt: new Date().toISOString(), status: 'confirmed' }
      ]);

      alert("You have successfully joined the event! Check 'My Activities'.");
    } catch (err) {
      alert("Failed to join event.");
    }
  }, []);

  const handleCreateEvent = useCallback(async (eventData: Omit<Event, 'id' | 'spotsTaken'>) => {
    try {
      const newEvent = await eventService.createEvent(eventData);
      setEvents(prev => [newEvent, ...prev]);

      // Update organization's event count locally
      if (authUser?.type === 'organization') {
        const updatedOrg: Organization = {
          ...(authUser as Organization),
          eventsCreated: (authUser as Organization).eventsCreated + 1
        };
        setAuthUser(updatedOrg);
        authService.saveUser(updatedOrg);
      }

      alert('Event created successfully!');
    } catch (err: any) {
      console.error('Event Creation Error:', err);
      alert(`Failed to create event: ${err.message || 'Unknown error'}`);
    }
  }, [authUser]);

  const handleDeleteEvent = useCallback(async (eventId: string) => {
    try {
      await eventService.deleteEvent(eventId);
      setEvents(prev => prev.filter(e => e.id !== eventId));

      // Update organization's event count locally
      if (authUser?.type === 'organization') {
        const updatedOrg: Organization = {
          ...(authUser as Organization),
          eventsCreated: Math.max(0, (authUser as Organization).eventsCreated - 1)
        };
        setAuthUser(updatedOrg);
        authService.saveUser(updatedOrg);
      }
    } catch (err) {
      alert("Failed to delete event.");
    }
  }, [authUser]);

  const handleUpdateProfile = async (updatedData: Partial<UserType>) => {
    if (authUser && authUser.type === 'volunteer') {
      try {
        await authService.updateProfile(authUser.id, updatedData);
        setAuthUser(prev => prev ? { ...prev, ...updatedData } : null);
        alert('Profile updated successfully!');
      } catch (err) {
        alert('Failed to update profile.');
      }
    }
  };



  const getMyJoinedEvents = () => {
    const myEventIds = myActivities.map(a => a.eventId);
    return events.filter(e => myEventIds.includes(e.id));
  };

  // Show auth form if not authenticated
  if (!isAuthenticated || !authUser) {
    return (
      <div className="min-h-screen bg-[#02020a]">
        <div className="pwa-container">
          <AuthForm onAuthSuccess={handleAuthSuccess} />
        </div>
        <PWAInstallOverlay />
      </div>
    );
  }

  // Show organization dashboard for organizations
  if (authUser.type === 'organization') {
    return (
      <div className="min-h-screen bg-[#02020a]">
        <div className="pwa-container">
          <div className="min-h-screen font-sans text-slate-200">
            {/* Header */}
            <header className="bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
              <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={logo} alt="Alchemy Logo" className="w-10 h-10 object-contain" />
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-alchemy-500 to-alchemy-700">
                    Alchemy Connect
                  </span>
                </div>

                {/* Desktop Nav */}
                <button
                  onClick={handleLogout}
                  className="hidden lg:flex items-center gap-2 px-4 py-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>

                {/* Mobile Nav Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 text-slate-400 hover:text-white"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>

              {/* Mobile Dropdown */}
              <div className={`lg:hidden absolute top-full left-0 right-0 overflow-hidden transition-all duration-300 bg-[#0f172a] border-b border-slate-800 shadow-2xl ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 rounded-xl">
                    <img
                      src={(authUser as Organization).logo || 'https://picsum.photos/id/45/100/100'}
                      alt="Org"
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{authUser.name}</span>
                      <span className="text-xs text-slate-500">Organization</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-red-900/20 hover:text-red-400 rounded-xl transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              </div>
            </header>

            <div className="max-w-7xl mx-auto p-4 lg:p-8">
              <OrganizationDashboard
                organization={authUser as Organization}
                events={events}
                onCreateEvent={handleCreateEvent}
                onEditEvent={async (id, updates) => {
                  try {
                    await eventService.updateEvent(id, updates);
                    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
                  } catch (err) {
                    alert("Failed to update event.");
                  }
                }}
                onDeleteEvent={handleDeleteEvent}
              />
            </div>
          </div>
        </div>
        <PWAInstallOverlay />
      </div>
    );
  }

  // Volunteer Dashboard (existing UI)
  const renderContent = () => {
    if (view === 'profile' && authUser?.type === 'volunteer') {
      return (
        <Profile
          user={authUser as UserType}
          onUpdate={handleUpdateProfile}
        />
      );
    }

    if (view === 'my-activities') {
      const myEvents = getMyJoinedEvents();
      return (
        <div className="space-y-6 animate-fadeIn">
          <h2 className="text-3xl font-extrabold text-white flex items-center tracking-tight">
            <div className="w-10 h-10 bg-alchemy-500/20 rounded-xl flex items-center justify-center mr-4 border border-alchemy-500/30">
              <CalendarHeart className="w-6 h-6 text-alchemy-500" />
            </div>
            My Engagement
          </h2>

          {myEvents.length === 0 ? (
            <div className="text-center py-24 bg-[#0f172a]/30 rounded-[2.5rem] border border-dashed border-white/10">
              <div className="bg-alchemy-500/10 p-6 rounded-3xl inline-block mb-6">
                <CalendarHeart className="w-12 h-12 text-alchemy-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No adventures yet</h3>
              <p className="text-slate-500 mb-10 max-w-md mx-auto text-lg">Your journey of impact hasn't started yet. Join an event to see it here!</p>
              <button
                onClick={() => setView('explore')}
                className="px-10 py-4 bg-alchemy-600 text-white rounded-2xl font-bold hover:shadow-[0_0_25px_rgba(0,121,255,0.4)] transition-all duration-300"
              >
                Find Opportunities
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onJoin={() => { }}
                  isJoined={true}
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    const displayedEvents = events;

    return (
      <div className="space-y-10 animate-fadeIn">
        <div className="flex flex-col space-y-3">
          <h1 className="text-4xl font-black text-white tracking-widest uppercase">Global Feed</h1>
          <p className="text-slate-500 font-bold tracking-widest text-xs uppercase">Curated opportunities for impact catalysts</p>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedEvents.map(event => {

            const isJoined = myActivities.some(a => a.eventId === event.id);

            return (
              <EventCard
                key={event.id}
                event={event}
                onJoin={handleJoinEvent}
                isJoined={isJoined}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#02020a]">
      <div className="pwa-container">
        <div className="min-h-screen font-sans flex text-slate-200">
          {/* Sidebar Navigation - Desktop Only */}
          <aside className="hidden lg:flex flex-col sticky top-0 h-screen w-64 bg-[#0f172a] border-r border-slate-800 z-50 transition-transform duration-300 ease-in-out">
            <div className="p-6 flex items-center gap-3 border-b border-slate-800 h-20">
              <img src={logo} alt="Alchemy Logo" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-alchemy-500 to-alchemy-700">
                Alchemy Connect
              </span>
            </div>

            <nav className="p-4 space-y-2 mt-4">
              <button
                onClick={() => { setView('explore'); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${view === 'explore' ? 'bg-alchemy-900/50 text-alchemy-500 font-semibold border border-alchemy-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
              >
                <LayoutGrid className="w-5 h-5" />
                Explore
              </button>

              <button
                onClick={() => { setView('my-activities'); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${view === 'my-activities' ? 'bg-alchemy-900/50 text-alchemy-500 font-semibold border border-alchemy-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
              >
                <CalendarHeart className="w-5 h-5" />
                My Activities
                {myActivities.length > 0 && (
                  <span className="ml-auto bg-alchemy-500 text-black py-0.5 px-2 rounded-full text-xs font-bold">
                    {myActivities.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => { setView('profile'); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${view === 'profile' ? 'bg-alchemy-900/50 text-alchemy-500 font-semibold border border-alchemy-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
              >
                <User className="w-5 h-5" />
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-400 hover:bg-red-900/20 hover:text-red-400 mt-4"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </nav>

            <div className="absolute bottom-0 w-full p-6 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={authUser.type === 'organization' ? (authUser as Organization).logo || 'https://picsum.photos/id/45/100/100' : (authUser as UserType).avatar || 'https://picsum.photos/id/64/100/100'}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-200">{authUser.name}</span>
                  <span className="text-xs text-slate-500">
                    {authUser.type === 'volunteer' ? `Level ${(authUser as UserType).level} Alchemist` : 'Verified Organization'}
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
            {/* Mobile Header */}
            <header className="lg:hidden h-16 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800 flex items-center px-4 justify-between shrink-0 relative z-[60]">
              <div className="flex items-center gap-2">
                <img src={logo} alt="Alchemy Logo" className="w-8 h-8 object-contain" />
                <span className="font-bold text-slate-200">
                  Alchemy Connect
                </span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-400">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Mobile Dropdown */}
              <div className={`absolute top-full left-0 right-0 overflow-hidden transition-all duration-300 bg-[#0f172a] border-b border-slate-800 ${isMobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                <nav className="p-4 space-y-2">
                  {[
                    { id: 'explore', label: 'Explore', icon: LayoutGrid },
                    { id: 'my-activities', label: 'My Activities', icon: CalendarHeart },
                    { id: 'profile', label: 'Profile', icon: User }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => { setView(item.id as ViewState); setIsMobileMenuOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${view === item.id ? 'bg-alchemy-900/50 text-alchemy-500 font-semibold border border-alchemy-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                      {item.id === 'my-activities' && myActivities.length > 0 && (
                        <span className="ml-auto bg-alchemy-500 text-black py-0.5 px-2 rounded-full text-xs font-bold">
                          {myActivities.length}
                        </span>
                      )}
                    </button>
                  ))}
                  <div className="h-px bg-slate-800 my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-red-900/20 hover:text-red-400 rounded-xl transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </nav>
              </div>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-10">
              <div className="max-w-6xl mx-auto">
                {renderContent()}
              </div>
            </div>
          </main>
        </div>
      </div>
      <PWAInstallOverlay />
    </div>
  );
}