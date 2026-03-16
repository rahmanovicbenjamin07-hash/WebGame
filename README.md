# Geotagger

Geotagger is a web application where users can upload geotagged photos and challenge others to guess the location using an interactive map. The closer your guess, the better your score!

## Getting Started

### Prerequisites

- pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/geotagger.git
cd geotagger
```

2. Install frontend dependencies:

```bash
cd frontend
pnpm install
```

3. Install backend dependencies:

```bash
cd server
pnpm install
```

### Running the app

Start the backend:

```bash
cd backend
pnpm dev
```

Start the frontend:

```bash
cd frontend
pnpm dev
```

The app will be available at `http://localhost:3000`
The server will be available at `http://localhost:3001`

---

## Project Structure

```
geotagger/
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── ui/
│   │   ├── routes/
│   │   └── utils/
└── backend/
    ├── routes/
    ├── controllers/
    └── uploads/
```

---

## Environment Variables

Create a `.env` file in the backend directory:

```env
DATABASE_URL
AUTH_SECRET
SUPABASE_URL
SUPABASE_KEY
```

---

## 📄 License

This project is licensed under the MIT License.
