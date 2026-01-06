-- Drop tables if they exist to ensure fresh schema
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS workers;

-- Create tables
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price VARCHAR(50) NOT NULL, -- Changed to VARCHAR to support ranges
    duration_min INTEGER NOT NULL, -- Renamed to match frontend expectation or aliased later
    image_url TEXT
);

CREATE TABLE IF NOT EXISTS workers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
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

-- Clean up existing data to avoid duplicates/conflicts on re-seed
TRUNCATE TABLE bookings CASCADE;
TRUNCATE TABLE services CASCADE;
TRUNCATE TABLE workers CASCADE;
-- Reset sequences
ALTER SEQUENCE services_id_seq RESTART WITH 1;
ALTER SEQUENCE workers_id_seq RESTART WITH 1;
ALTER SEQUENCE bookings_id_seq RESTART WITH 1;

-- Insert Seed Data
INSERT INTO services (name, price, duration_min) VALUES 
('Permanent makeup', '90-200', 120),
('Facial treatments', '40-400', 60),
('Nails', '20-60', 45),
('Lash lift', '30-50', 45),
('Lash extensions', '50-180', 90),
('Pedicure', '20-60', 45);

INSERT INTO workers (name) VALUES 
('Abdullah'),
('Ema'),
('Džoana'),
('Sabaheta'),
('Dževad'),
('Ruždija'),
('Jakov'),
('Umihana');
