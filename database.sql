CREATE DATABASE claraflowers;

USE claraflowers;

CREATE TABLE flowers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL(10,2),
    description TEXT,
    image VARCHAR(255),
    seller VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);