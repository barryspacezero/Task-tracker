# Task Manager App

A full-stack Task Management application built with Next.js (Frontend) and Node.js/Express (Backend).

## Technologies Used

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Authentication**: JWT (stored in cookies/localStorage)
- **Features**: 
    - Responsive Design
    - Route Protection (Middleware)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Caching**: Redis (ioredis)
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Zod
- **Testing**: Jest, Supertest
- **Containerization**: Docker, Docker Compose

## Setup and Installation

### Prerequisites
- Docker and Docker Compose installed on your machine.
- OR Node.js and MongoDB/Redis installed locally.


1. **Clone the repository**
   ```bash
   git clone https://github.com/barryspacezero/Task-tracker
   cd Task-tracker
   ```

2. **Start Backend Services**
   ```bash
   docker compose up --build
   ```
   This will start:
   - Backend API at `http://localhost:8000`
   - MongoDB
   - Redis

3. **Start Frontend**
   Open a new terminal:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`.


## API Documentation

### Authentication
- `POST /api/auth/signup`: Create a new account
- `POST /api/auth/signin`: Login to an existing account

### Tasks (Protected Routes)
- `GET /api/tasks`: Get all tasks for the logged-in user
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/:id`: Update a task (title, description, status, due_date)
- `DELETE /api/tasks/:id`: Delete a task

## Running Tests
To run backend integration tests:

```bash
cd Backend
npm run test
```

To view test coverage:
```bash
npm run test:coverage
```
