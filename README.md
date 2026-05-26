# FairFundz MERN App

FairFundz is a MERN full stack project for worker and business registration around fair wage management.

## Tech Stack

- MongoDB with Mongoose
- Express.js API
- React + TypeScript frontend
- Node.js runtime
- Tailwind CSS

## Features

- Worker registration
- Business/contractor registration
- Document metadata capture for uploaded ID proof or business license
- Recent registration list on the frontend
- MongoDB persistence when `MONGO_URI` is configured
- Temporary in-memory storage when MongoDB is not configured, useful for quick demos

## Project Structure

```text
FairFundz-main/
  server/
    config/db.js
    models/Registration.js
    routes/registrationRoutes.js
    index.js
  src/
    App.tsx
    main.tsx
    index.css
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file from the example:

```bash
copy .env.example .env
```

3. Update `.env` if needed:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/fairfundz
CLIENT_URL=http://localhost:5173
```

4. Start the MERN development app:

```bash
npm run dev
```

The React app runs at `http://localhost:5173` and the API runs at `http://localhost:5000`.

## API

```http
GET /api/health
GET /api/registrations
POST /api/registrations
```

`POST /api/registrations` accepts multipart form data with:

- `userType`: `worker` or `contractor`
- `name`
- `email`
- `contact`
- `jobRole` and `wage` for workers
- `workType` and `workers` for contractors
- `document` file upload
