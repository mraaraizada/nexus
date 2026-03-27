# Nexus 

<div align="center">
  <img src="public/logo.png" alt="Nexus Attendance Logo" width="200"/>

</div>

## About The Project

Nexus Attendance is a comprehensive attendance management system designed for schools and educational institutions. It provides an intuitive interface for tracking student attendance, managing classes, and generating insightful reports through interactive dashboards.

### Key Features

-  **Interactive Dashboard** - Real-time attendance statistics and visualizations
-  **Student Management** - Easy student registration and profile management
-  **Class Management** - Organize and manage multiple classes
-  **Attendance Tracking** - Quick and efficient attendance marking
-  **Analytics** - Visual reports using charts and graphs
-  **Modern UI** - Beautiful, responsive design with smooth animations
-  **Real-time Updates** - Instant data synchronization

## Built With

### Frontend
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Vite](https://vitejs.dev/) - Fast build tool
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React Router](https://reactrouter.com/) - Client-side routing
- [Recharts](https://recharts.org/) - Chart library
- [Lucide React](https://lucide.dev/) - Icon library
- [Axios](https://axios-http.com/) - HTTP client

### Backend
- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web framework
- [PostgreSQL](https://www.postgresql.org/) - Database
- [pg](https://node-postgres.com/) - PostgreSQL client
- [CORS](https://github.com/expressjs/cors) - Cross-origin resource sharing
- [dotenv](https://github.com/motdotla/dotenv) - Environment variable management

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
  ```bash
  node --version
  ```

- **npm** (comes with Node.js)
  ```bash
  npm --version
  ```

- **PostgreSQL** (v14 or higher)
  ```bash
  psql --version
  ```

## Installation

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd nexus-attendance
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
```

### 4. Set up Environment Variables

#### Frontend (.env)
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

#### Backend (backend/.env)
Create a `.env` file in the backend directory:
```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/nexus_attendance
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Replace `username` and `password` with your PostgreSQL credentials.

### 5. Set up the Database

```bash
cd backend
npm run db:setup
npm run db:attendance
```

This will create the necessary database tables and schema.

## Usage

### Development Mode

#### Start the Backend Server
```bash
cd backend
npm run dev
```
The API will be available at `http://localhost:5000`

#### Start the Frontend Development Server
In a new terminal:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Production Build

#### Build Frontend
```bash
npm run build
```

#### Start Backend in Production
```bash
cd backend
npm start
```

## API Endpoints

### Health Check
```
GET /api/health
```

### Classes
```
GET    /api/classes          - Get all classes
POST   /api/classes          - Create a new class
GET    /api/classes/:id      - Get class by ID
PUT    /api/classes/:id      - Update class
DELETE /api/classes/:id      - Delete class
```

### Students
```
GET    /api/students         - Get all students
POST   /api/students         - Register a new student
GET    /api/students/:id     - Get student by ID
PUT    /api/students/:id     - Update student
DELETE /api/students/:id     - Delete student
```

### Attendance
```
GET    /api/attendance       - Get attendance records
POST   /api/attendance       - Mark attendance
GET    /api/attendance/stats - Get attendance statistics
```

## Project Structure

```
nexus-attendance/
├── backend/
│   ├── db/                  # Database setup and schemas
│   ├── middleware/          # Express middleware
│   ├── routes/              # API routes
│   ├── server.js            # Express server
│   └── package.json
├── src/
│   ├── pages/               # React pages/components
│   ├── services/            # API service layer
│   ├── App.tsx              # Main App component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── index.html
└── package.json
```

## Features in Detail

### Dashboard
- View attendance statistics
- Interactive charts showing attendance trends
- Quick overview of classes and students
- Recent attendance records

### Attendance Management
- Mark attendance for multiple students
- Filter by class and date
- View attendance history
- Export attendance reports

### Student Management
- Add, edit, and delete student records
- Assign students to classes
- View individual student attendance history

### Class Management
- Create and manage classes
- View class rosters
- Track class-wise attendance

## License

Distributed under the MIT License. See `LICENSE` for more information.
