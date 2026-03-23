import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import classRoutes from './routes/classRoutes-memory.js';
import studentRoutes from './routes/studentRoutes-memory.js';
import attendanceRoutes from './routes/attendanceRoutes-memory.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? allowedOrigins 
    : '*',
  credentials: true
}));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Nexus Attendance API (In-Memory)',
    version: '1.0.0',
    storage: 'In-Memory (No Database)',
    note: 'Data will reset when server restarts',
    endpoints: {
      health: '/api/health',
      classes: '/api/classes',
      students: '/api/students',
      attendance: '/api/attendance'
    }
  });
});

// Routes
app.use('/api/classes', classRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Nexus Attendance API is running',
    storage: 'In-Memory'
  });
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Nexus Attendance API running on http://localhost:${PORT}`);
  console.log(`💾 Using in-memory storage (no database)`);
  console.log(`📚 Health check: http://localhost:${PORT}/api/health`);
});
