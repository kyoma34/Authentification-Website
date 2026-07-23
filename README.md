# User Authentication App

A simple full-stack web app with three pages — **Login**, **Register**, and **Home** — built on the MERN stack. User accounts are stored in MongoDB, with the backend handling registration and login requests from the React frontend.

## Features

- User registration with form validation (name, email, password, confirm password, terms acceptance)
- User login with form validation
- User data stored in MongoDB
- Home page (currently a placeholder, shown after login)

## Tech Stack

- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)

## Project Structure

```
project/
├── frontend/     # React app
└── backend/      # Express server + MongoDB connection
```

## Getting Started

### Prerequisites

- Node.js installed
- A MongoDB connection URI (local or MongoDB Atlas)

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd <your-repo-name>
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```
MONGO_URI=your_mongodb_connection_string
PORT=3001
```

Start the backend:

```bash
npm start
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:3001`.

## Pages

| Page     | Route       | Description                          |
|----------|-------------|---------------------------------------|
| Login    | `/login`    | Existing users sign in                |
| Register | `/register` | New users create an account           |
| Home     | `/home`     | Landing page after successful login   |

## Status

Work in progress — the Home page is currently empty and will be built out further.
