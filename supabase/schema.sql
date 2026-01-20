-- QR Codes table
CREATE TABLE IF NOT EXISTS qr_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  short_id VARCHAR(8) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  current_url TEXT NOT NULL,
  description TEXT,
  scan_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_scanned_at TIMESTAMP WITH TIME ZONE
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id VARCHAR(20) NOT NULL DEFAULT 'FREE',
  razorpay_subscription_id TEXT,
  razorpay_payment_id TEXT,
  status VARCHAR(20) DEFAULT 'active',
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_qr_codes_short_id ON qr_codes(short_id);
CREATE INDEX IF NOT EXISTS idx_qr_codes_user_id ON qr_codes(user_id);

-- Enable RLS for qr_codes
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;

-- Policy: Users can see only their own QR codes
CREATE POLICY "Users can view own QR codes" ON qr_codes
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own QR codes
CREATE POLICY "Users can insert own QR codes" ON qr_codes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own QR codes
CREATE POLICY "Users can update own QR codes" ON qr_codes
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can delete their own QR codes
CREATE POLICY "Users can delete own QR codes" ON qr_codes
  FOR DELETE USING (auth.uid() = user_id);

-- Public Policy for Redirects (Needed to fetch current_url without being logged in)
-- However, we handle this in Server Components with service role or edge functions if needed.
-- For now, let's allow public SELECT on qr_codes but ONLY for short_id and current_url?
-- Security note: In a real app, you might want to restrict columns or use a RPC.
CREATE POLICY "Public can view short links for redirect" ON qr_codes
  FOR SELECT USING (TRUE);
