export interface Event {
  id: string;
  title: string;
  organization: string;
  organizationId?: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: 'Environment' | 'Education' | 'Community' | 'Health' | 'Animals';
  imageUrl: string;
  spotsTotal: number;
  spotsTaken: number;
}

export interface UserActivity {
  eventId: string;
  joinedAt: string;
  status: 'confirmed' | 'pending' | 'completed';
}

export type ViewState = 'explore' | 'my-activities' | 'profile';

export interface AIRecommendation {
  eventId: string;
  reason: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  type: 'volunteer';
  avatar?: string;
  level: number;
  joinedDate: string;
  bio?: string;
  location?: string;
  token?: string;
}

export interface Organization {
  id: string;
  email: string;
  name: string;
  type: 'organization';
  description: string;
  logo?: string;
  verified: boolean;
  eventsCreated: number;
  token?: string;
}

export type AuthUser = User | Organization;

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  userType: 'volunteer' | 'organization' | null;
}