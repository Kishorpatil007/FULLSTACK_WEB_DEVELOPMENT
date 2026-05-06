# Project 115: ☁️ Cloud Storage

## Description
Upload, organize, and manage files in the cloud.

## Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js + Express.js
- **Database**: In-Memory (can be replaced with MongoDB/MySQL)

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm

### Install Dependencies
```bash
npm install express cors uuid
```

### Run the Server
```bash
node server.js
```

### Open in Browser
Visit: http://localhost:3000

## Features
- Dashboard with live stats
- Add, view, and delete records
- Status tracking (Active / Pending / Completed)
- Reports and analytics view
- Responsive design (mobile + desktop)
- Offline fallback using localStorage

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/records | Get all records |
| POST | /api/records | Create new record |
| PUT | /api/records/:id | Update record |
| DELETE | /api/records/:id | Delete record |

## Project Structure
```
Project_115_Cloud Storage/
├── index.html      # Main frontend
├── style.css       # Styles
├── script.js       # Frontend logic
├── server.js       # Express backend
└── README.md       # This file
```

## Course
Full Stack Development (FSD) - Level 2
