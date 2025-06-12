# Supeo Backend Repository

Developing a time management system for our final project in collaboration with Supeo

This tutorial will guide you through how to install and run the application for both frontend and backend.

---

## Prerequisites

* Docker
* Docker Compose
* [Node.js](https://nodejs.org/)
---

## How to Install and Run the Application

### Backend

1. Create the .env file in the root of the backend

2. Insert the .env variables in the file found in the "Credentials and .env variables" document
   

3. Open your terminal and navigate to the backend directory:

   ```bash
   cd /your/path/to/the_project/Supeo_backend
   ```
   
4. On first run (builds the containers):

   ```bash
   docker compose up --build
   ```
   
5. On subsequent runs:

   ```bash
   docker compose up
   ```

The server will be available at [http://localhost:4000](http://localhost:4000)
