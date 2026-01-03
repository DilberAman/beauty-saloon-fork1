-- Create tables
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    duration INTEGER NOT NULL, -- in minutes
    image_url TEXT
);

CREATE TABLE IF NOT EXISTS workers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    image_url TEXT
);

CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id),
    worker_id INTEGER REFERENCES workers(id),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    customer_full_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert Seed Data
INSERT INTO services (name, description, price, duration, image_url) VALUES 
('Haircut', 'Standard haircut service', 30.00, 60, 'https://placehold.co/600x400'),
('Manicure', 'Full manicure service', 25.00, 45, 'https://placehold.co/600x400'),
('Facial', 'Relaxing facial treatment', 50.00, 60, 'https://placehold.co/600x400');

INSERT INTO workers (name, role, image_url) VALUES 
('Alice', 'Senior Stylist', 'https://placehold.co/400x400'),
('Bob', 'Nail Artist', 'https://placehold.co/400x400'),
('Charlie', 'Esthetician', 'https://placehold.co/400x400');
