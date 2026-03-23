import express from 'express';

const router = express.Router();

// In-memory storage
let attendanceRecords = [];
let nextId = 1;

// POST /attendance/mark - Mark attendance for a single student
router.post('/mark', (req, res) => {
  const { class_id, student_id, date, status, notes } = req.body;
  
  if (!class_id || !student_id) {
    return res.status(400).json({
      success: false,
      message: 'Class ID and Student ID are required'
    });
  }
  
  const record = {
    id: nextId++,
    class_id: parseInt(class_id),
    student_id: parseInt(student_id),
    date: date || new Date().toISOString().split('T')[0],
    status: status || 'present',
    notes: notes || '',
    created_at: new Date().toISOString()
  };
  
  attendanceRecords.push(record);
  
  res.status(201).json({
    success: true,
    message: 'Attendance marked successfully',
    data: record
  });
});

// POST /attendance/mark-bulk - Mark attendance for multiple students
router.post('/mark-bulk', (req, res) => {
  const { class_id, date, attendance } = req.body;
  
  if (!class_id || !attendance || !Array.isArray(attendance)) {
    return res.status(400).json({
      success: false,
      message: 'Class ID and attendance array are required'
    });
  }
  
  const recordDate = date || new Date().toISOString().split('T')[0];
  const records = [];
  
  attendance.forEach(item => {
    const record = {
      id: nextId++,
      class_id: parseInt(class_id),
      student_id: parseInt(item.student_id),
      date: recordDate,
      status: item.status || 'present',
      notes: item.notes || '',
      created_at: new Date().toISOString()
    };
    attendanceRecords.push(record);
    records.push(record);
  });
  
  res.status(201).json({
    success: true,
    message: `Attendance marked for ${records.length} students`,
    data: records
  });
});

// GET /attendance/class/:class_id - Get attendance records for a class
router.get('/class/:class_id', (req, res) => {
  const { class_id } = req.params;
  const { date, status } = req.query;
  
  let records = attendanceRecords.filter(r => r.class_id === parseInt(class_id));
  
  if (date) {
    records = records.filter(r => r.date === date);
  }
  
  if (status) {
    records = records.filter(r => r.status === status);
  }
  
  res.json({
    success: true,
    data: records,
    total: records.length
  });
});

// GET /attendance/student/:student_id - Get attendance records for a student
router.get('/student/:student_id', (req, res) => {
  const { student_id } = req.params;
  const records = attendanceRecords.filter(r => r.student_id === parseInt(student_id));
  
  res.json({
    success: true,
    data: records,
    total: records.length
  });
});

// GET /attendance/stats/:class_id - Get attendance statistics for a class
router.get('/stats/:class_id', (req, res) => {
  const { class_id } = req.params;
  const records = attendanceRecords.filter(r => r.class_id === parseInt(class_id));
  
  const stats = {
    total_records: records.length,
    present: records.filter(r => r.status === 'present').length,
    absent: records.filter(r => r.status === 'absent').length,
    late: records.filter(r => r.status === 'late').length
  };
  
  res.json({
    success: true,
    data: stats
  });
});

// DELETE /attendance/:id - Delete an attendance record
router.delete('/:id', (req, res) => {
  const index = attendanceRecords.findIndex(r => r.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Attendance record not found'
    });
  }
  
  const deleted = attendanceRecords.splice(index, 1)[0];
  
  res.json({
    success: true,
    message: 'Attendance record deleted successfully',
    data: deleted
  });
});

export default router;
