# Task Tracker Project

## Overview

The Task Tracker is a Node.js application designed to help users manage tasks efficiently. It supports task creation, updating, deletion, and tracking. The project uses a MongoDB database for storage and JSON Web Tokens (JWT) for secure authentication.

## Features
- User authentication with JWT
- Task management (Create, Read, Update, Delete)
- Session management
- Secure routes using JWT-based authorization

## Prerequisites

- Node.js (v12.x or higher)
- MongoDB (Ensure you have a MongoDB instance running)
- npm (Node Package Manager)

## Getting Started

### Clone the repository
git clone https://github.com/iamsrahimi/task-tracker.git
cd task-tracker

**Install Dependencies**
Before running the project, install all the required dependencies using npm:

npm install
Create .env File
Create a .env file in the root directory of the project and add the following environment variables:

DB_URI=your_mongodb_connection_string
JWT_SECRET_STRING=your_jwt_secret_key
JWT_EXPIRY_DURATION=1h # Adjust as needed (e.g., 1h, 24h)
SESSION_SECRET=your_session_secret_key
Replace the placeholder values (your_mongodb_connection_string, your_jwt_secret_key, and your_session_secret_key) with the appropriate values for your setup.

**Run the Application**
Once everything is set up, you can start the development server:

npm start
The server will start on http://localhost:3000.

API Endpoints
Here are the core API endpoints for task management:

POST /auth/login - Login and obtain a JWT token
POST /auth/register - Register a new user
GET /tasks - Fetch all tasks (Requires JWT token)
POST /tasks - Create a new task (Requires JWT token)
PUT /tasks/:id - Update an existing task (Requires JWT token)
DELETE /tasks/:id - Delete a task (Requires JWT token)
Scripts
npm start: Starts the Node.js server.
npm run dev: Starts the server in development mode using nodemon.
License
This project is licensed under the MIT License.
