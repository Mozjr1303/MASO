import { User, Organization, AuthUser } from '../types';
import { supabase } from './supabaseClient';

export interface LoginCredentials {
    email: string;
    password: string;
    userType: 'volunteer' | 'organization'; // Note: Supabase doesn't strictly need this for login, but good for validation
}

export interface SignupData {
    email: string;
    password: string;
    name: string;
    userType: 'volunteer' | 'organization';
    description?: string; // For organizations
}

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthUser> {
        try {
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email: credentials.email,
                password: credentials.password,
            });

            if (authError) throw authError;

            // Fetch profile data
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authData.user.id)
                .single();

            if (profileError) throw profileError;

            // Map profile back to AuthUser type
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
                token: authData.session?.access_token
            } as any;

            this.saveUser(user);
            return user;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    async signup(data: SignupData): Promise<AuthUser> {
        try {
            // 1. Sign up user in Supabase Auth
            // We pass 'name' in options so the DB trigger can pick it up
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        name: data.name,
                        user_type: data.userType
                    }
                }
            });

            if (authError) throw authError;
            if (!authData.user) throw new Error('Signup failed');

            // The profile is now created automatically by the DB trigger we added to Supabase.
            // We just need to log in now.
            return await this.login({ email: data.email, password: data.password, userType: data.userType });
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    },

    // Session helpers
    getSession() {
        return supabase.auth.getSession();
    },

    getProfile(userId: string) {
        return supabase.from('profiles').select('*').eq('id', userId).single();
    },

    onAuthStateChange(callback: (event: string, session: any) => void) {
        return supabase.auth.onAuthStateChange(callback);
    },

    async logout(): Promise<void> {
        await supabase.auth.signOut();
        localStorage.removeItem('auth_user');
    },

    getToken(): string | null {
        const user = this.getCurrentUser();
        return user?.token || null;
    },

    getAuthHeader(): { Authorization?: string } {
        const token = this.getToken();
        return token ? { Authorization: `Bearer ${token}` } : {};
    },

    getCurrentUser(): AuthUser | null {
        const stored = localStorage.getItem('auth_user');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch {
                return null;
            }
        }
        return null;
    },

    async updateProfile(userId: string, updates: Partial<User>): Promise<void> {
        const { error } = await supabase
            .from('profiles')
            .update({
                name: updates.name,
                email: updates.email,
                avatar_url: updates.avatar,
                bio: updates.bio,
                location: updates.location
            })
            .eq('id', userId);

        if (error) throw error;

        // Refresh local storage
        const user = this.getCurrentUser();
        if (user) {
            this.saveUser({ ...user, ...updates });
        }
    },

    saveUser(user: AuthUser): void {
        localStorage.setItem('auth_user', JSON.stringify(user));
    }
};
