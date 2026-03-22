# Project Management API

A RESTful API for managing projects and tasks with pagination, filtering, and sorting capabilities.

## Features

- ✅ Project CRUD operations
- ✅ Task CRUD operations
- ✅ Pagination support
- ✅ Filter tasks by status
- ✅ Sort tasks by due date
- ✅ Input validation
- ✅ Error handling

## Installation

```bash
cd backend
npm install
```

## Running the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server runs on: `http://localhost:5000`

## API Endpoints

### Projects

#### Create Project
```http
POST /api/projects
Content-Type: application/json

{
  "name": "My Project",
  "description": "Project description"
}
```

#### Get All Projects (with pagination)
```http
GET /api/projects?page=1&limit=10
```

#### Get Single Project
```http
GET /api/projects/{id}
```

#### Delete Project
```http
DELETE /api/projects/{id}
```

### Tasks

#### Create Task
```http
POST /api/projects/{project_id}/tasks
Content-Type: application/json

{
  "title": "Task title",
  "description": "Task description",
  "status": "todo",
  "priority": "high",
  "due_date": "2024-12-31"
}
```

#### Get All Tasks for a Project
```http
GET /api/projects/{project_id}/tasks

# With filters
GET /api/projects/{project_id}/tasks?status=in-progress
GET /api/projects/{project_id}/tasks?sort=due_date
GET /api/projects/{project_id}/tasks?status=todo&sort=due_date
```

#### Update Task
```http
PUT /api/tasks/{id}
Content-Type: application/json

{
  "title": "Updated title",
  "status": "done",
  "priority": "low"
}
```

#### Delete Task
```http
DELETE /api/tasks/{id}
```

## Data Models

### Project
```json
{
  "id": 1,
  "name": "Project Name",
  "description": "Project description",
  "created_at": "2024-03-22T00:00:00.000Z"
}
```

### Task
```json
{
  "id": 1,
  "project_id": 1,
  "title": "Task title",
  "description": "Task description",
  "status": "todo",
  "priority": "medium",
  "due_date": "2024-12-31",
  "created_at": "2024-03-22T00:00:00.000Z"
}
```

## Validation Rules

### Project
- `name`: Required, non-empty string

### Task
- `title`: Required, non-empty string
- `status`: Optional, must be one of: `todo`, `in-progress`, `done`
- `priority`: Optional, must be one of: `low`, `medium`, `high`
- `due_date`: Optional, ISO date string

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [...],
  "total": 100,
  "page": 1,
  "limit": 10,
  "totalPages": 10
}
```

## Testing with cURL

### Create a project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"name":"My First Project","description":"Test project"}'
```

### Get all projects
```bash
curl http://localhost:5000/api/projects
```

### Create a task
```bash
curl -X POST http://localhost:5000/api/projects/1/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"My Task","status":"todo","priority":"high"}'
```

### Get tasks with filters
```bash
curl "http://localhost:5000/api/projects/1/tasks?status=todo&sort=due_date"
```

## Environment Variables

Create a `.env` file:

```env
PORT=5000
NODE_ENV=development
```

## Tech Stack

- Node.js
- Express.js
- In-memory database (easily replaceable with MongoDB, PostgreSQL, etc.)

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Authentication & Authorization
- Task assignment to users
- File attachments
- Comments on tasks
- Activity logs
