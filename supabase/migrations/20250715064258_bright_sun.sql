/*
  # Create users table and related schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key, references auth.users)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text, unique)
      - `phone_number` (text)
      - `email_verified` (boolean, default false)
      - `phone_verified` (boolean, default false)
      - `role` (text, default 'customer')
      - `provider` (text, default 'email')
      - `farm_location` (text)
      - `farm_size` (text)
      - `primary_crops` (text[])
      - `soil_type` (text)
      - `profile_completed` (boolean, default true)
      - `total_points` (integer, default 0)
      - `total_spent` (numeric, default 0)
      - `loyalty_tier` (text, default 'Bronze')
      - `last_order_date` (timestamptz)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

    - `products`
      - Product catalog with categories, pricing, and inventory
    
    - `orders`
      - Order management with items, status, and customer info
    
    - `user_preferences`
      - User shipping addresses and preferences
    
    - `weather_insights`
      - Weather data and farming recommendations
    
    - `contact_forms`
      - Contact form submissions

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public access where appropriate

  3. Functions
    - Auto-update timestamps
    - Handle user profile creation
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text DEFAULT '',
  last_name text DEFAULT '',
  email text UNIQUE NOT NULL,
  phone_number text DEFAULT '',
  email_verified boolean DEFAULT false,
  phone_verified boolean DEFAULT false,
  role text DEFAULT 'customer',
  provider text DEFAULT 'email',
  farm_location text DEFAULT '',
  farm_size text DEFAULT '',
  primary_crops text[] DEFAULT '{}',
  soil_type text DEFAULT '',
  profile_completed boolean DEFAULT true,
  total_points integer DEFAULT 0,
  total_spent numeric DEFAULT 0,
  loyalty_tier text DEFAULT 'Bronze',
  last_order_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL,
  original_price numeric,
  description text DEFAULT '',
  image_url text DEFAULT '',
  packaging text DEFAULT 'Standard',
  in_stock boolean DEFAULT true,
  stock_quantity integer DEFAULT 0,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id text UNIQUE NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  items jsonb NOT NULL DEFAULT '[]',
  subtotal numeric NOT NULL DEFAULT 0,
  tax_amount numeric DEFAULT 0,
  total_amount numeric NOT NULL DEFAULT 0,
  discount_applied numeric DEFAULT 0,
  reward_points_earned integer DEFAULT 0,
  status text DEFAULT 'Order Confirmed',
  payment_status text DEFAULT 'Pending',
  payment_method text DEFAULT 'Cash on Delivery',
  estimated_delivery timestamptz,
  customer_info jsonb DEFAULT '{}',
  shipping_address jsonb DEFAULT '{}',
  billing_address jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  last_shipping_address jsonb DEFAULT '{}',
  notification_preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create weather_insights table
CREATE TABLE IF NOT EXISTS weather_insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  farmer_name text NOT NULL,
  contact_number text NOT NULL,
  location text NOT NULL,
  coordinates jsonb DEFAULT '{}',
  crop_type text NOT NULL,
  land_area numeric NOT NULL,
  land_area_unit text DEFAULT 'acres',
  soil_type text NOT NULL,
  weather_data jsonb DEFAULT '{}',
  recommendations jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create contact_forms table
CREATE TABLE IF NOT EXISTS contact_forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text DEFAULT '',
  message text NOT NULL,
  status text DEFAULT 'new',
  responded boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Products policies (public read access)
CREATE POLICY "Anyone can read products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Orders policies
CREATE POLICY "Users can read own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- User preferences policies
CREATE POLICY "Users can manage own preferences"
  ON user_preferences
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Weather insights policies
CREATE POLICY "Users can read own weather insights"
  ON weather_insights
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can create weather insights"
  ON weather_insights
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Contact forms policies
CREATE POLICY "Anyone can create contact forms"
  ON contact_forms
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create function to handle updated_at timestamp
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Insert sample products
INSERT INTO products (name, category, price, original_price, description, image_url, packaging, in_stock, stock_quantity, featured) VALUES
('Organic Fertilizer Premium', 'Fertilizers', 899, 999, 'High-quality organic fertilizer for all crops', 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg', '25kg bag', true, 100, true),
('NPK Complex 20-20-20', 'Fertilizers', 1299, 1399, 'Balanced NPK fertilizer for optimal plant growth', 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg', '50kg bag', true, 75, true),
('Bio Pesticide Natural', 'Pesticides', 649, 749, 'Eco-friendly pesticide for sustainable farming', 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg', '1L bottle', true, 200, false),
('Hybrid Tomato Seeds', 'Seeds', 299, 349, 'High-yield hybrid tomato seeds', 'https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg', '100g packet', true, 150, true),
('Wheat Seeds Premium', 'Seeds', 199, 249, 'Premium quality wheat seeds', 'https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg', '1kg packet', true, 300, false),
('Drip Irrigation Kit', 'Equipment', 2499, 2799, 'Complete drip irrigation system', 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg', 'Complete kit', true, 25, true);