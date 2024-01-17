You can use the script[setup.sh] to do this automagically and just Press Enter when you're done to stop the servers/cancel the running tests.

I recommend using a local DB.

# Project Setup Instructions

## Clone the repository

git clone https://github.com/captjay98/todopro

## CD into the directory

cd todopro

## Copy the example environment file

cp exampleenv .env

THE DB IS REALLY SLOW, If you can edit the env file and use a db that's available locally, It'll be much better.

## Install Backend dependencies

composer install

## Clear config Cache and Cache

php artisan cache:clear
php artisan config:clear
php artisan config:cache

## Run database migrations

php artisan migrate

## Seed the database

php artisan db:seed

## Install frontend dependencies

yarn install or npm install

## Start the Frontend Dev server in the background

Better to run it in the foreground and run the backend in another tab

npm run dev &

## Go back to the project root directory

cd ..

## Start the Backend Dev server

php artisan serve &

## RUN BACKEND TESTS

php artisan test
