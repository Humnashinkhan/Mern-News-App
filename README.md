# MERN HackerNews Clone

A full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js) that scrapes and displays the top stories from HackerNews. It features a modern, premium dark-mode user interface with secure JWT authentication and bookmarking capabilities.

## Features

- **Automated Web Scraper:** Automatically fetches the top 10 stories (Title, URL, Points, Author, Posted Time) from HackerNews on server startup using `axios` and `cheerio`.
- **User Authentication:** Secure JWT-based login and registration system with encrypted passwords using `bcryptjs`.
- **Story Bookmarking:** Authenticated users can save and manage their favorite stories in a dedicated protected route.
- **Pagination:** Backend API supports paginated fetching of stories to optimize loading times.
- **Premium UI:** Built with Vite and TailwindCSS v4, featuring a glassmorphism design, smooth gradients, responsive layout, and interactive micro-animations.

## Tech Stack

**Frontend:**
- React 19 (Vite)
- React Router DOM
- Tailwind CSS v4
- Context API (State Management)
- Lucide React (Icons)
- Axios

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Cheerio (Web Scraping)

## Setup Instructions

### 1. Clone the repository
```bash
git clone <your-github-repo-url>
cd <repo-name>
```

### 2. Environment Variables
You need to create a `.env` file in the `Backend` directory.

```bash
cd Backend
touch .env
```
Add the following credentials to your `Backend/.env` file:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?appName=Cluster0
PORT=5000
JWT_SECRET=your_super_secret_key
```
*(Note: Replace the `MONGO_URI` with your actual MongoDB connection string and choose a secure `JWT_SECRET`)*

## How to Run the Project Locally

You will need to run both the frontend and backend servers simultaneously.

### Start the Backend Server
```bash
cd Backend
npm install
npm run dev
```
The backend server will start on `http://localhost:5000`. Upon successful connection to the database, the HackerNews scraper will automatically run and fetch the latest top 10 stories.

### Start the Frontend Server
Open a new terminal window/tab:
```bash
cd frontend
npm install
npm run dev
```
The frontend Vite server will start (usually on `http://localhost:5173` or `5175`). Open the provided local URL in your browser to view the application.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate a user and receive a JWT

### Stories
- `GET /api/stories?page=1&limit=10` - Fetch all stories (sorted by points descending)
- `GET /api/stories/:id` - Fetch a single story by ID
- `POST /api/stories/:id/bookmark` - Toggle bookmark for a specific story (Requires Auth Header)
- `GET /api/stories/bookmarks` - Fetch all bookmarked stories for the logged-in user (Requires Auth Header)
- `POST /api/stories/scrape` - Manually trigger the scraper

## Folder Structure
```
├── Backend/
│   ├── controllers/      # Route controllers (auth, stories)
│   ├── middleware/       # Custom middlewares (JWT verification)
│   ├── models/           # Mongoose schemas (User, Story)
│   ├── routes/           # Express routes
│   ├── utils/            # Helper functions (HackerNews Scraper)
│   ├── server.js         # Entry point for the backend
│   └── .env              # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components (Navbar, StoryCard)
│   │   ├── context/      # React Context (AuthContext)
│   │   ├── pages/        # Page views (Home, Login, Register, Bookmarks)
│   │   ├── utils/        # Utilities (Tailwind class merging)
│   │   ├── App.jsx       # Main application routing
│   │   └── main.jsx      # React entry point
│   ├── vite.config.js    # Vite configuration
│   └── package.json      # Frontend dependencies
└── README.md
```
