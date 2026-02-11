-- ALCHEMY CONNECT SUPABASE SCHEMA

-- 1. Profiles table to store extra user data
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE,
  name TEXT,
  type TEXT CHECK (type IN ('volunteer', 'organization')),
  level INTEGER DEFAULT 1,
  joined_date DATE DEFAULT CURRENT_DATE,
  description TEXT, -- For organizations
  verified BOOLEAN DEFAULT FALSE,
  events_created INTEGER DEFAULT 0,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Missions table
CREATE TABLE missions (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  tags JSONB,
  progress INTEGER DEFAULT 0,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

ALTER TABLE missions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Missions are viewable by everyone" ON missions FOR SELECT USING (true);

-- 3. Proposals table
CREATE TABLE proposals (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  status TEXT CHECK (status IN ('Voting', 'Draft', 'Passed', 'Rejected')),
  votes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Proposals are viewable by everyone" ON proposals FOR SELECT USING (true);

-- 4. Events table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  organization_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('Environment', 'Education', 'Community', 'Health', 'Animals')),
  image_url TEXT,
  spots_total INTEGER DEFAULT 10,
  spots_taken INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Events are viewable by everyone" ON events FOR SELECT USING (true);
CREATE POLICY "Organizations can insert their own events" ON events FOR INSERT WITH CHECK (auth.uid() = organization_id);
CREATE POLICY "Organizations can update their own events" ON events FOR UPDATE USING (auth.uid() = organization_id);
CREATE POLICY "Organizations can delete their own events" ON events FOR DELETE USING (auth.uid() = organization_id);

-- SEED DATA
INSERT INTO missions (title, tags, progress, color) VALUES 
('Reforestation 2026', '["Environment", "Critical"]', 85, '#10b981'),
('Clean Water Initiative', '["Health", "Africa"]', 42, '#3b82f6'),
('Tech for Refugees', '["Education", "Global"]', 67, '#8b5cf6'),
('Urban Food Hubs', '["Sustainability", "DEI"]', 30, '#f59e0b');

INSERT INTO proposals (title, status, votes) VALUES 
('APP-14: Redirect 5% Protocol Fee to Ocean Cleanup', 'Voting', '1.2M / 2.0M'),
('APP-15: Expand Governance Staking Rewards', 'Draft', '--'),
('APP-13: Partner with UNICEF for Data Integrity', 'Passed', '1.8M / 2.0M');
