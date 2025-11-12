⚙️ Prerequisites

Before starting, ensure you have the following installed on your machine:

-Node.js (v18 or higher)
-npm (v9 or higher)
-Docker and Docker Compose

1. Database Setup

Navigate to the database and start the database container using Docker Compose:

-cd database
-docker compose up -d

2. Run Database Migrations

After the database is running, navigate to the backend directory and execute the migrations to set up the schema:

-cd stock-api
-npm install
-npm run migration:run

3. Backend Setup

Navigate to the backend directory, install dependencies, and start the server:

cd stock-api
npm install
npm run start

The backend will be available at: http://localhost:3000

4. Frontend Setup

Navigate to the frontend directory, install dependencies, and start the development server:

cd stock-frontend
npm install
npm run dev


The frontend will be available at: http://localhost:5173