#!/bin/bash
set -e

# kill a process by name
kill_process() {
  local process_name="$1"
  local pid

  pid=$(pgrep -f "$process_name")

  if [[ -n "$pid" ]]; then
    echo "Killing $process_name (PID: $pid)..."
    kill "$pid"
    echo "Successfully killed $process_name."
  else
    echo "$process_name is not running."
  fi
}

# Stop the servers
stop_servers() {
  echo "Killing all services..."
  kil_process "php artisan serve"
  kill_process "npm run dev"
}

# Clone the repository
# git clone https://github.com/captjay98/todopro
# cd todopro

# Copy the example environment file
cp exampleenv .env

# Install dependencies
composer install

# Clear config Cache and Cache
php artisan cache:clear
php artisan config:clear
php artisan config:cache

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

# Kill services on script exit
trap kill_services EXIT

# Wait for user input to exit the script
read -rp "Press Enter to stop the services and exit..."
