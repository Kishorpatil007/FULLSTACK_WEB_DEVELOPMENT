# 151. Online Blockchain Voting System

## Overview
A full-stack web application for **Online Blockchain Voting System** built with Node.js (Express) backend and vanilla HTML/CSS/JS frontend.

## Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Storage**: In-Memory (easily replaceable with MongoDB/PostgreSQL)
- **Other**: UUID for unique IDs, CORS enabled

## Project Structure
```
P151_Online_Blockchain_Voting_System/
├── index.html        # Main frontend UI
├── style.css         # Styling
├── script.js         # Frontend JavaScript logic
├── server.js         # Express backend API
├── package.json      # Node dependencies
├── .env.example      # Environment variables template
└── README.md         # This file
```

## Getting Started

### Prerequisites
- Node.js (v16 or above)
- npm

### Installation
```bash
cd P151_Online_Blockchain_Voting_System
npm install
npm start
```

Open your browser and navigate to: `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/data        | Get all records |
| POST   | /api/data        | Create new record |
| PUT    | /api/data/:id    | Update record |
| DELETE | /api/data/:id    | Delete record |

## Features
- RESTful API architecture
- CRUD operations
- Responsive UI
- Real-time updates

## Deployment
- **Frontend**: Netlify / Vercel
- **Backend**: Render / Railway / Fly.io
- **Database**: MongoDB Atlas / Supabase

## Author
FSD Course Project - Project #151
