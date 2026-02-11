import { supabase } from './supabaseClient';
import { Event } from '../types';

export const eventService = {
    async getEvents(): Promise<Event[]> {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase Events Error:', error);
            throw error;
        }

        console.log('Fetched events from cloud:', data);
        return (data || []).map(this.mapSupabaseToEvent);
    },

    async createEvent(eventData: Omit<Event, 'id' | 'spotsTaken'>): Promise<Event> {
        const { data, error } = await supabase
            .from('events')
            .insert({
                title: eventData.title,
                organization: eventData.organization,
                organization_id: eventData.organizationId,
                date: eventData.date,
                time: eventData.time,
                location: eventData.location,
                description: eventData.description,
                category: eventData.category,
                image_url: eventData.imageUrl,
                spots_total: eventData.spotsTotal,
                spots_taken: 0
            })
            .select()
            .single();

        if (error) throw error;
        return this.mapSupabaseToEvent(data);
    },

    async deleteEvent(eventId: string): Promise<void> {
        const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', eventId);

        if (error) throw error;
    },

    async joinEvent(eventId: string): Promise<void> {
        // Simple logic: atomicity would be better in a real app with RPC
        const { data: event, error: fetchError } = await supabase
            .from('events')
            .select('spots_taken')
            .eq('id', eventId)
            .single();

        if (fetchError) throw fetchError;

        const { error: updateError } = await supabase
            .from('events')
            .update({ spots_taken: event.spots_taken + 1 })
            .eq('id', eventId);

        if (updateError) throw updateError;
    },

    async updateEvent(eventId: string, updates: Partial<Event>): Promise<void> {
        const { error } = await supabase
            .from('events')
            .update({
                title: updates.title,
                date: updates.date,
                time: updates.time,
                location: updates.location,
                description: updates.description,
                category: updates.category,
                image_url: updates.imageUrl,
                spots_total: updates.spotsTotal
            })
            .eq('id', eventId);

        if (error) throw error;
    },

    mapSupabaseToEvent(r: any): Event {
        return {
            id: r.id,
            title: r.title,
            organization: r.organization,
            organizationId: r.organization_id,
            date: r.date,
            time: r.time,
            location: r.location,
            description: r.description,
            category: r.category,
            imageUrl: r.image_url,
            spotsTotal: r.spots_total,
            spotsTaken: r.spots_taken
        };
    }
};
