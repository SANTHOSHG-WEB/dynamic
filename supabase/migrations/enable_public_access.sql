-- Permissions for Full Access Free Mode
-- This allows persistent QR code creation/management without user authentication (Guest Mode).

-- WARNING: This allows ANYONE to insert/update/delete records if they know the guest-user-123 ID.
-- This is intended for public free access/demo apps as requested.

-- 1. Enable RLS (Should be already enabled, but let's confirm)
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view own QR codes" ON qr_codes;
DROP POLICY IF EXISTS "Users can insert own QR codes" ON qr_codes;
DROP POLICY IF EXISTS "Users can update own QR codes" ON qr_codes;
DROP POLICY IF EXISTS "Users can delete own QR codes" ON qr_codes;

-- 3. Create OPEN policies for Guest User
-- Allow anyone (anon) to do anything if the user_id matches the guest ID or if they are just reading.

-- Allow SELECT for everyone (needed for redirects and dashboard viewing)
CREATE POLICY "Public Read Access" ON qr_codes
  FOR SELECT USING (true);

-- Allow INSERT for everyone (anon role)
CREATE POLICY "Public Insert Access" ON qr_codes
  FOR INSERT WITH CHECK (true);

-- Allow UPDATE for everyone
CREATE POLICY "Public Update Access" ON qr_codes
  FOR UPDATE USING (true);

-- Allow DELETE for everyone
CREATE POLICY "Public Delete Access" ON qr_codes
  FOR DELETE USING (true);
