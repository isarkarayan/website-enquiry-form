/*
  # Create enquiries table for website development enquiry form

  1. New Tables
    - `enquiries`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `website_type` (text, required)
      - `message` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `enquiries` table
    - Add policy for authenticated users to read all enquiries
    - Add policy for anonymous users to insert enquiries
*/

-- Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  website_type text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Policy for anonymous users to insert enquiries
CREATE POLICY "Anyone can submit enquiries"
  ON enquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy for authenticated users to read all enquiries
CREATE POLICY "Authenticated users can read all enquiries"
  ON enquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_enquiries_updated_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();