# Chronicle — MERN Personal Blog

A full-stack personal blog application built with **MongoDB, Express, React (Vite), and Node.js**.
Inspired by the layout of a personal-blog theme (hero, topic tiles, post grid, categories,
about, contact, newsletter) but built from scratch with original code, styling, and content —
no theme files or assets were copied.

## Features

- Public blog with homepage, paginated post grid, and topic/category tiles
- Post detail pages with view counts, categories, author bio
- Categories index + posts-by-category pages
- About page and Contact page (contact form saves to MongoDB)
- Newsletter subscribe form (stores emails in MongoDB)
- REST API with JWT-based admin auth for creating/editing/deleting posts and categories
- Seed script that creates an admin user, categories, and sample posts

## Tech Stack

- **Frontend:** React 18, Vite, React Router, Axios
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **Auth:** JWT + bcrypt password hashing

## Project Structure

```
blog-mern/
  backend/
    config/db.js
    controllers/        # route logic (auth, posts, categories, contact, subscribe)
    middleware/          # auth + error handling
    models/               # Mongoose schemas (User, Post, Category, Contact, Subscriber)
    routes/                # Express routers
    seed/seed.js           # demo data seeding script
    server.js               # app entry point
    package.json
    .env.example
  frontend/
    src/
      api/axios.js         # pre-configured axios instance
      components/           # Navbar, Footer, PostCard, Newsletter, UI helpers
      pages/                 # Home, PostDetail, Categories, CategoryPosts, About, Contact
      styles/index.css       # design system (original, not copied from any theme)
      App.jsx
      main.jsx
    index.html
    vite.config.js
    package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB instance (local `mongod`, or a free MongoDB Atlas cluster)

### 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
# edit .env and set MONGO_URI, JWT_SECRET, etc.
npm run seed     # creates admin user + sample categories/posts
npm run dev      # starts the API on http://localhost:5000
```

Seeded admin login: `admin@example.com` / `admin123`

### 2. Frontend setup

```bash
cd frontend
npm install
npm run dev      # starts the app on http://localhost:5173
```

The Vite dev server proxies `/api` requests to `http://localhost:5000`, so both servers
need to be running at the same time during development.

### 3. Build for production

```bash
cd frontend
npm run build     # outputs static files to frontend/dist
```

Serve `frontend/dist` with any static host (or add `express.static` to `server.js`), and
point `CLIENT_URL` in the backend `.env` at your deployed frontend URL.

## API Overview

| Method | Endpoint                     | Access        | Description                     |
|--------|-------------------------------|---------------|----------------------------------|
| POST   | /api/auth/register            | Public        | Create a user account            |
| POST   | /api/auth/login                | Public        | Log in, returns JWT              |
| GET    | /api/auth/me                   | Private       | Current user profile             |
| GET    | /api/posts                     | Public        | List posts (page, limit, category, search) |
| GET    | /api/posts/slug/:slug          | Public        | Single post by slug              |
| POST   | /api/posts                     | Admin         | Create post                      |
| PUT    | /api/posts/:id                 | Admin         | Update post                      |
| DELETE | /api/posts/:id                 | Admin         | Delete post                      |
| GET    | /api/categories                | Public        | List categories with post counts |
| POST   | /api/categories                | Admin         | Create category                  |
| DELETE | /api/categories/:id            | Admin         | Delete category                  |
| POST   | /api/contact                   | Public        | Submit contact form              |
| GET    | /api/contact                   | Admin         | List contact messages            |
| POST   | /api/subscribe                 | Public        | Subscribe an email               |

## Notes on Design

The visual layout (hero banner, topic tiles, post cards, sidebar-free single column, footer
newsletter) takes general inspiration from the kind of personal-blog template you referenced,
but all copy, styling (`styles/index.css`), component code, and sample content here are
original — none of it was copied from that site's HTML/CSS/JS or its paid WordPress theme
files, which remain the property of their creators.

## Next Steps You Might Add

- Rich text / markdown editor for the admin post form
- Image upload (e.g. via Cloudinary or multer + S3) instead of raw `coverImage` URLs
- An actual admin dashboard UI (the API already supports everything it needs)
- Comments on posts
- Full-text search box wired to the existing `$text` index on `Post`

## Chronicle UI refresh

The frontend has been redesigned to match the supplied Chronicle reference screens: blue/purple visual system, branded book-mark logo, active navigation, search bar, theme switch, profile button, category cards, post-detail sidebar, related posts, and responsive mobile layouts.

### Run

1. Start MongoDB locally.
2. Backend: `cd backend` -> `npm install` -> copy `.env.example` to `.env` -> `npm run seed` -> `npm run dev`.
3. Frontend: `cd frontend` -> `npm install` -> `npm run dev`.
4. Open `http://localhost:5173`.

Demo admin: `admin@example.com` / `admin123`.
