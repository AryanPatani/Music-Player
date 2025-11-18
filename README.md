# Music Streaming Application (MERN Stack)

A Spotify-like music streaming application built with the MERN stack.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Redux Toolkit, Lucide-React, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Audio**: HTML5 Audio

## Project Structure

```
music-streaming-app/
├── client/          # React frontend
├── server/          # Node.js backend
└── README.md        # This file
```

## Getting Started

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your MongoDB URI:
   ```
   MONGODB_URI=mongodb://localhost:27017/music-streaming
   PORT=5000
   ```

4. Seed the database with sample data:
   ```bash
   npm run seed
   ```

5. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Features

- Music playback with controls
- Song search functionality
- Album browsing
- Playlist management
- Responsive design
- Real-time player state management

## API Endpoints

- `GET /api/songs/search` - Search songs
- `GET /api/albums` - Get all albums
- `GET /api/playlists` - Get all playlists
