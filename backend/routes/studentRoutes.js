import express from 'express';
import { attendanceDB } from '../db/attendance-database.js';

const router = express.Router();

// POST /classes/:class_id/students - Create a new student
router.post('/classes/:class_id/students', async (req, res, next) => {
  try {
    const { class_id } = req.params;
    const { name, roll_number, email, phone } = req.body;
    
    if (!name || !roll_number) {
      return res.status(400).json({
        success: false,
        message: 'Student name and roll number are required'
      });
    }
    
    // Check if class exists
    const classData = await attendanceDB.classes.findById(class_id);
    if (!classData) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }
    
    const student = await attendanceDB.students.create({
      class_id: parseInt(class_id),
      name,
      roll_number,
      email,
      phone
    });
    
    res.status(201).json({
      success: true,
      message: 'Student added successfully',
      data: student
    });
  } catch (error) {
    if (error.code === '23505') { // Unique violation
      return res.status(400).json({
        success: false,
        message: 'Roll number already exists'
      });
    }
    next(error);
  }
});

// GET /classes/:class_id/students - Get all students for a class
router.get('/classes/:class_id/students', async (req, res, next) => {
  try {
    const { class_id } = req.params;
    
    const classData = await attendanceDB.classes.findById(class_id);
    if (!classData) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }
    
    const students = await attendanceDB.students.findByClassId(class_id);
    
    res.json({
      success: true,
      data: students,
      total: students.length
    });
  } catch (error) {
    next(error);
  }
});

// GET /students/:id - Get a single student
router.get('/:id', async (req, res, next) => {
  try {
    const student = await attendanceDB.students.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /students/:id - Delete a student
router.delete('/:id', async (req, res, next) => {
  try {
    const student = await attendanceDB.students.delete(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Student deleted successfully',
      data: student
    });
  } catch (error) {
    next(error);
  }
});

export default router;
