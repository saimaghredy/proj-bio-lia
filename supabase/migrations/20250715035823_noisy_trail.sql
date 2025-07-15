-- database/init/01-init.sql
-- Bio Lia Database Initialization Script

\c bioliadata;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (main authentication)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone_number VARCHAR(15),
    
    -- Verification status
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    email_verified_at TIMESTAMP NULL,
    phone_verified_at TIMESTAMP NULL,
    
    -- Profile information
    role VARCHAR(50) DEFAULT 'farmer',
    profile_completed BOOLEAN DEFAULT FALSE,
    
    -- Agriculture specific fields
    farm_location TEXT,
    farm_address JSONB,
    farm_size DECIMAL(10,2),
    farm_size_unit VARCHAR(20) DEFAULT 'acres',
    primary_crops TEXT[],
    soil_type VARCHAR(50),
    farming_experience INTEGER,
    
    -- Authentication providers
    provider VARCHAR(50) DEFAULT 'email',
    google_id VARCHAR(255) UNIQUE,
    
    -- Login tracking
    last_login TIMESTAMP,
    login_count INTEGER DEFAULT 0,
    last_ip INET,
    
    -- Account status
    is_active BOOLEAN DEFAULT TRUE,
    is_blocked BOOLEAN DEFAULT FALSE,
    blocked_reason TEXT,
    blocked_at TIMESTAMP NULL,
    
    -- Preferences
    language VARCHAR(10) DEFAULT 'en',
    timezone VARCHAR(50) DEFAULT 'Asia/Kolkata',
    notification_preferences JSONB DEFAULT '{"email": true, "sms": true, "push": true}',
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Email verification tokens
CREATE TABLE email_verifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    verified_at TIMESTAMP NULL,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Phone verification (MSG91 integration)
CREATE TABLE phone_verifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    phone_number VARCHAR(15) NOT NULL,
    otp_code VARCHAR(10),
    status VARCHAR(20) DEFAULT 'sent',
    verification_attempts INTEGER DEFAULT 0,
    max_attempts INTEGER DEFAULT 3,
    otp_sent_at TIMESTAMP DEFAULT NOW(),
    verified_at TIMESTAMP NULL,
    expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '5 minutes'),
    msg91_request_id VARCHAR(100),
    delivery_status VARCHAR(50),
    failure_reason TEXT,
    ip_address INET,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Password reset tokens
CREATE TABLE password_resets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used_at TIMESTAMP NULL,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- User sessions (JWT token management)
CREATE TABLE user_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    token_id VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_revoked BOOLEAN DEFAULT FALSE,
    device_info JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    revoked_at TIMESTAMP NULL
);

-- Products catalog
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    description TEXT,
    detailed_description TEXT,
    
    -- Pricing
    price DECIMAL(10,2) NOT NULL,
    mrp DECIMAL(10,2),
    discount_percentage DECIMAL(5,2) DEFAULT 0,
    
    -- Product details
    packaging VARCHAR(100),
    unit_of_measurement VARCHAR(20),
    weight DECIMAL(8,2),
    dimensions JSONB,
    
    -- Inventory
    stock_quantity INTEGER DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 10,
    is_in_stock BOOLEAN DEFAULT TRUE,
    
    -- Product features
    features TEXT[],
    usage_instructions TEXT,
    benefits TEXT[],
    suitable_crops TEXT[],
    application_method TEXT,
    
    -- SEO and marketing
    meta_title VARCHAR(255),
    meta_description TEXT,
    keywords TEXT[],
    
    -- Product status
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    
    -- Ratings and reviews
    average_rating DECIMAL(3,2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id),
    
    -- Order status
    status VARCHAR(50) DEFAULT 'pending',
    payment_status VARCHAR(50) DEFAULT 'pending',
    
    -- Financial details
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    shipping_amount DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    
    -- Payment information
    payment_method VARCHAR(50),
    payment_gateway VARCHAR(50),
    payment_transaction_id VARCHAR(255),
    
    -- Customer information
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(15) NOT NULL,
    
    -- Addresses
    shipping_address JSONB NOT NULL,
    billing_address JSONB,
    
    -- Shipping details
    shipping_method VARCHAR(100),
    tracking_number VARCHAR(255),
    estimated_delivery_date DATE,
    shipped_at TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL,
    
    -- Order notes
    customer_notes TEXT,
    admin_notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Order items
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    product_name VARCHAR(255) NOT NULL,
    product_sku VARCHAR(100),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Weather insights
CREATE TABLE weather_insights (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    
    -- Farmer information
    farmer_name VARCHAR(255) NOT NULL,
    contact_number VARCHAR(15) NOT NULL,
    location TEXT NOT NULL,
    coordinates JSONB,
    
    -- Farm details
    crop_type VARCHAR(100) NOT NULL,
    land_area DECIMAL(10,2) NOT NULL,
    land_area_unit VARCHAR(20) DEFAULT 'acres',
    soil_type VARCHAR(50) NOT NULL,
    
    -- Weather data
    weather_data JSONB NOT NULL,
    recommendations TEXT[],
    
    -- Status
    is_processed BOOLEAN DEFAULT TRUE,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Contact forms
CREATE TABLE contact_forms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(15),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    
    -- Status
    status VARCHAR(50) DEFAULT 'new',
    responded_at TIMESTAMP NULL,
    response_message TEXT,
    
    -- Contact details
    ip_address INET,
    user_agent TEXT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- System settings
CREATE TABLE settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_users_google_id ON users(google_id);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at);

CREATE INDEX idx_email_verifications_token ON email_verifications(token);
CREATE INDEX idx_email_verifications_user_id ON email_verifications(user_id);

CREATE INDEX idx_phone_verifications_user_id ON phone_verifications(user_id);
CREATE INDEX idx_phone_verifications_phone ON phone_verifications(phone_number);
CREATE INDEX idx_phone_verifications_status ON phone_verifications(status);

CREATE INDEX idx_password_resets_token ON password_resets(token);
CREATE INDEX idx_password_resets_user_id ON password_resets(user_id);

CREATE INDEX idx_user_sessions_token ON user_sessions(token_id);
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_created_at ON products(created_at);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_order_number ON orders(order_number);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

CREATE INDEX idx_weather_insights_user_id ON weather_insights(user_id);
CREATE INDEX idx_weather_insights_created_at ON weather_insights(created_at);

CREATE INDEX idx_contact_forms_status ON contact_forms(status);
CREATE INDEX idx_contact_forms_created_at ON contact_forms(created_at);

-- Insert default settings
INSERT INTO settings (key, value, description, is_public) VALUES
('site_name', '"Bio Lia"', 'Website name', true),
('site_description', '"Plant Molecules Engineered for Impact"', 'Website description', true),
('contact_email', '"contact@biolia.com"', 'Contact email address', true),
('contact_phone', '"+91-80-1234-5678"', 'Contact phone number', true),
('free_shipping_threshold', '2000', 'Minimum order value for free shipping', true),
('tax_rate', '0.18', 'GST tax rate (18%)', true),
('currency', '"INR"', 'Default currency', true),
('timezone', '"Asia/Kolkata"', 'Default timezone', true);

-- Insert sample admin user (password: admin123)
INSERT INTO users (
    email, password_hash, first_name, last_name, role, 
    email_verified, is_active, created_at, updated_at
) VALUES (
    'admin@biolia.com', 
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.G',
    'Admin', 
    'User', 
    'admin', 
    true, 
    true, 
    NOW(), 
    NOW()
);

-- Insert sample products from your CSV data
INSERT INTO products (name, category, price, packaging, description, features, is_active, is_in_stock, stock_quantity) VALUES
('BOXER', 'Plant Protectants', 154.00, '50ml', 'Advanced soil conditioning formula that improves soil structure and enhances root development for stronger, healthier crops.', ARRAY['Improves soil aeration and water retention', 'Enhances root zone development', 'Increases nutrient uptake efficiency', 'Suitable for all crop types'], true, true, 100),
('COMET', 'Plant Protectants', 154.00, '50ml', 'High-performance growth accelerator that boosts plant metabolism and accelerates crop development cycles.', ARRAY['Accelerates plant growth by 25-30%', 'Enhances photosynthesis efficiency', 'Improves stress tolerance', 'Organic and eco-friendly formula'], true, true, 100),
('LEO', 'Plant Protectants', 106.00, '50ml', 'Natural pest deterrent system that provides comprehensive protection against common agricultural pests.', ARRAY['100% organic pest control', 'Safe for beneficial insects', 'Long-lasting protection', 'No chemical residue'], true, true, 100),
('PANGEO', 'Plant Protectants', 154.00, '50ml', 'Complete phosphorus and potassium supplement that enhances flowering, fruiting, and overall plant vigor.', ARRAY['High phosphorus and potassium content', 'Promotes flowering and fruiting', 'Improves crop quality', 'Water-soluble formula'], true, true, 100),
('SPRINT', 'Plant Protectants', 86.00, '50ml', 'Rapid recovery formula designed to help crops bounce back quickly from stress, disease, or adverse conditions.', ARRAY['Rapid stress recovery', 'Boosts plant immunity', 'Restores plant vigor', 'Fast-acting formula'], true, true, 100),
('ROOTEX', 'Plant Protectants', 55.00, '50ml', 'Specialized root development enhancer that promotes strong root system formation and improves nutrient absorption.', ARRAY['Stimulates root hair development', 'Increases root mass by 40%', 'Improves nutrient absorption', 'Enhances drought tolerance'], true, true, 100),
('FLORA', 'Plant Growth Promoters', 185.00, '50ml', 'Premium flowering enhancer that maximizes bloom production and improves flower quality in ornamental and fruit crops.', ARRAY['Increases flower count by 35%', 'Improves flower size and color', 'Extends flowering period', 'Enhances fruit set'], true, true, 100),
('NORA', 'Plant Growth Promoters', 81.00, '50ml', 'Advanced nitrogen management solution that optimizes nitrogen utilization and reduces nitrogen loss from soil.', ARRAY['Reduces nitrogen leaching', 'Improves nitrogen use efficiency', 'Promotes steady growth', 'Environmentally friendly'], true, true, 100),
('BIOCONSTORTIUM', 'Bio-Fertilizers', 40.00, '50ml', 'Comprehensive soil reconstruction formula that rebuilds degraded soils and restores natural soil biology.', ARRAY['Rebuilds soil structure', 'Restores microbial activity', 'Improves water holding capacity', 'Long-term soil health improvement'], true, true, 100),
('EM.SOLUTION', 'Bio-Fertilizers', 43.00, '50ml', 'Effective microorganisms solution that introduces beneficial bacteria and fungi to improve soil health.', ARRAY['Contains 15+ beneficial microorganisms', 'Improves soil biology', 'Enhances nutrient cycling', 'Suppresses harmful pathogens'], true, true, 100);

-- Create a function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_phone_verifications_updated_at BEFORE UPDATE ON phone_verifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_weather_insights_updated_at BEFORE UPDATE ON weather_insights FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_forms_updated_at BEFORE UPDATE ON contact_forms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Success message
SELECT 'Bio Lia database initialized successfully!' as message;