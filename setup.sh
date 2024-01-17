#!/bin/bash
set -e

# Clone the repository
git clone https://github.com/captjay98/todopro
cd todopro

# Copy the example environment file
cp exampleenv .env

# Install dependencies
composer install

# Run database migrations
php artisan migrate

# Seed the database
php artisan db:seed

# Install frontend dependencies
cd todopro-frontend
yarn install

# Build frontend assets
npm run dev &

# Go back to the project root directory
cd ..

# Start the server
php artisan serve &

echo "Setup complete. Servers running in the background."
