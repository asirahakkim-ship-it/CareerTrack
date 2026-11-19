# CareerTrack – Job Application Tracking System

CareerTrack is a web-based application that helps users manage and track their job applications in one place.

Instead of maintaining job application details manually, users can add, update, delete, and monitor their application progress through a simple dashboard.

## Features

- User Registration and Login
- JWT Authentication
- Add New Job Applications
- View All Personal Applications
- Update Application Details
- Delete Job Applications
- Search and Filter Applications
- Track Application Status
- Dashboard with Application Statistics
- User Profile Management

## Application Status

- Applied
- Shortlisted
- Interview
- Selected
- Rejected

## Tech Stack

**Frontend**
- React.js
- JavaScript
- Bootstrap
- Axios
- React Router DOM
- Vite

**Backend**
- Python
- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication

**Database**
- PostgreSQL

## Project Structure

```text
CareerTrack/
│
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── main.py
│   │   ├── auth.py
│   │   ├── database.py
│   │   └── security.py
│   ├── requirements.txt
│   └── create_tables.py
│
├── public/
├── src/
├── package.json
├── index.html
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/asirahakkim-ship-it/CareerTrack.git
cd CareerTrack
```

### 2. Frontend Setup

```bash
npm install
npm run dev
```

### 3. Backend Setup

Open another terminal:

```bash
cd backend
python -m venv venv
```

Activate virtual environment on Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure your `.env` file using `.env.example` and provide your PostgreSQL database URL and secret key.

Start FastAPI:

```bash
uvicorn app.main:app --reload
```

### 4. API Documentation

Once the backend is running, open:

```text
http://127.0.0.1:8000/docs
```

## Purpose

CareerTrack was developed as a full-stack project to practice frontend development, backend API development, database integration, and authentication.

## Author

**Asira Hakkim**

GitHub: https://github.com/asirahakkim-ship-it