import express from 'express';
import { attendanceDB } from '../db/attendance-database.js';

const router = express.Router();

// POST /attendance/mark - Mark attendance for a single student
router.post('/mark', async (req, res, next) => {
  try {
    const { class_id, student_id, date, status, notes } = req.body;
    
    if (!class_id || !student_id) {
      return res.status(400).json({
        success: false,
        message: 'Class ID and Student ID are required'
      });
    }
    
    const record = await attendanceDB.attendance.markAttendance({
      class_id,
      student_id,
      date,
      status: status || 'present',
      notes
    });
    
    res.status(201).json({
      success: true,
      message: 'Attendance marked successfully',
      data: record
    });
  } catch (error) {
    next(error);
  }
});

// POST /attendance/mark-bulk - Mark attendance for multiple students
router.post('/mark-bulk', async (req, res, next) => {
  try {
    const { class_id, date, attendance } = req.body;
    
    if (!class_id || !attendance || !Array.isArray(attendance)) {
      return res.status(400).json({
        success: false,
        message: 'Class ID and attendance array are required'
      });
    }
    
    const records = await attendanceDB.attendance.markBulkAttendance(
      class_id,
      date || new Date().toISOString().split('T')[0],
      attendance
    );
    
    res.status(201).json({
      success: true,
      message: `Attendance marked for ${records.length} students`,
      data: records
    });
  } catch (error) {
    next(error);
  }
});

// GET /attendance/class/:class_id - Get attendance records for a class
router.get('/class/:class_id', async (req, res, next) => {
  try {
    const { class_id } = req.params;
    const { date, status } = req.query;
    
    const records = await attendanceDB.attendance.getByClass(class_id, { date, status });
    
    res.json({
      success: true,
      data: records,
      total: records.length
    });
  } catch (error) {
    next(error);
  }
});

// GET /attendance/student/:student_id - Get attendance records for a student
router.get('/student/:student_id', async (req, res, next) => {
  try {
    const { student_id } = req.params;
    const { startDate, endDate } = req.query;
    
    const records = await attendanceDB.attendance.getByStudent(student_id, { startDate, endDate });
    
    res.json({
      success: true,
      data: records,
      total: records.length
    });
  } catch (error) {
    next(error);
  }
});

// GET /attendance/stats/:class_id - Get attendance statistics for a class
router.get('/stats/:class_id', async (req, res, next) => {
  try {
    const { class_id } = req.params;
    const { startDate, endDate } = req.query;
    
    // Default to last 30 days if not provided
    const end = endDate || new Date().toISOString().split('T')[0];
    const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const stats = await attendanceDB.attendance.getStats(class_id, start, end);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /attendance/:id - Delete an attendance record
router.delete('/:id', async (req, res, next) => {
  try {
    const record = await attendanceDB.attendance.delete(req.params.id);
    
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Attendance record deleted successfully',
      data: record
    });
  } catch (error) {
    next(error);
  }
});

export default router;
