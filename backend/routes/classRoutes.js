import express from 'express';
import { attendanceDB } from '../db/attendance-database.js';

const router = express.Router();

// POST /classes - Create a new class
router.post('/', async (req, res, next) => {
  try {
    const { name, semester, room, time, total_students, status, color } = req.body;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Class name is required'
      });
    }
    
    const classData = await attendanceDB.classes.create({
      name, semester, room, time, total_students, status, color
    });
    
    res.status(201).json({
      success: true,
      message: 'Class created successfully',
      data: classData
    });
  } catch (error) {
    next(error);
  }
});

// GET /classes - Get all classes with pagination
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await attendanceDB.classes.findAll(page, limit);
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    next(error);
  }
});

// GET /classes/stats - Get overall stats
router.get('/stats', async (req, res, next) => {
  try {
    const stats = await attendanceDB.classes.getStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
});

// GET /classes/:id - Get a single class
router.get('/:id', async (req, res, next) => {
  try {
    const classData = await attendanceDB.classes.findById(req.params.id);
    
    if (!classData) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }
    
    res.json({
      success: true,
      data: classData
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /classes/:id - Delete a class
router.delete('/:id', async (req, res, next) => {
  try {
    const classData = await attendanceDB.classes.delete(req.params.id);
    
    if (!classData) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Class deleted successfully',
      data: classData
    });
  } catch (error) {
    next(error);
  }
});

export default router;
