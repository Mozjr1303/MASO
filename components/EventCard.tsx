import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Event } from '../types';
import { CATEGORY_COLORS } from '../constants';

interface EventCardProps {
  event: Event;
  onJoin: (id: string) => void;
  isJoined?: boolean;

}

export const EventCard: React.FC<EventCardProps> = ({ event, onJoin, isJoined = false }) => {
  const percentFull = Math.round((event.spotsTaken / event.spotsTotal) * 100);
  const isFull = event.spotsTaken >= event.spotsTotal;

  return (
    <div className="bg-[#0f172a]/50 backdrop-blur-md rounded-2xl shadow-2xl hover:shadow-alchemy-500/10 transition-all duration-500 overflow-hidden border border-white/5 flex flex-col h-full group">
      <div className="relative h-56 overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-700"
        />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0f172a] to-transparent" />
        <div className="absolute top-4 left-4">
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${CATEGORY_COLORS[event.category] || 'bg-slate-800/80 text-slate-300 border-white/10'}`}>
            {event.category}
          </span>
        </div>
      </div>

      <div className="p-7 flex-1 flex flex-col -mt-10 relative z-10">
        <div className="mb-4">
          <p className="text-[10px] font-black text-alchemy-500 uppercase tracking-[0.2em] mb-1">{event.organization}</p>
          <h3 className="text-xl font-black text-white leading-tight group-hover:text-alchemy-400 transition-colors uppercase tracking-tight">{event.title}</h3>
        </div>

        <div className="space-y-3 mb-6 flex-1">
          <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-4 h-4 mr-3 text-alchemy-500" />
            <span>{event.date} • <span className="text-slate-500">{event.time}</span></span>
          </div>
          <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4 mr-3 text-alchemy-500" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-wider">
            <Users className="w-4 h-4 mr-3 text-alchemy-500" />
            <span>{event.spotsTaken} / {event.spotsTotal} <span className="text-slate-500 font-medium">VOLUNTEERS</span></span>
          </div>

          <div className="pt-2">
            <div className="w-full bg-white/5 rounded-full h-1 relative overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${isFull ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-alchemy-500 shadow-[0_0_10px_rgba(0,121,255,0.5)]'}`}
                style={{ width: `${percentFull}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{percentFull}% ENROLLED</span>
              {isFull && <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest">CAPACITY REACHED</span>}
            </div>
          </div>
        </div>

        <div className="mt-auto">
          {isJoined ? (
            <button
              disabled
              className="w-full py-4 px-6 bg-green-500/10 text-green-400 rounded-xl text-xs font-black uppercase tracking-[0.15em] border border-green-500/20 flex items-center justify-center cursor-default"
            >
              ✓ YOU ARE ENROLLED
            </button>
          ) : isFull ? (
            <button
              disabled
              className="w-full py-4 px-6 bg-white/5 text-slate-600 rounded-xl text-xs font-black uppercase tracking-[0.15em] border border-white/5 cursor-not-allowed"
            >
              WAITLIST ONLY
            </button>
          ) : (
            <button
              onClick={() => onJoin(event.id)}
              className="w-full py-4 px-6 bg-alchemy-600 hover:bg-alchemy-500 text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_4px_20px_rgba(0,121,255,0.2)] hover:shadow-alchemy-500/40 transform active:scale-[0.98]"
            >
              Secure Spot
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
