import express from 'express';

const router = express.Router();

// In-memory storage
let students = [
  {
    id: 1,
    class_id: 1,
    name: 'John Doe',
    username: 'johndoe',
    roll_number: 'CS001',
    email: 'user',
    phone: '1234567890',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    class_id: 1,
    name: 'Jane Smith',
    username: 'janesmith',
    roll_number: 'CS002',
    email: 'user',
    phone: '0987654321',
    created_at: new Date().toISOString()
  }
];

let nextId = 3;

// POST /classes/:class_id/students - Create a new student
router.post('/classes/:class_id/students', (req, res) => {
  const { class_id } = req.params;
  const { name, username, roll_number, email, phone } = req.body;
  
  if (!name || !roll_number) {
    return res.status(400).json({
      success: false,
      message: 'Student name and roll number are required'
    });
  }
  
  // Check for duplicate roll number
  const exists = students.find(s => s.roll_number === roll_number);
  if (exists) {
    return res.status(400).json({
      success: false,
      message: 'Roll number already exists'
    });
  }
  
  const newStudent = {
    id: nextId++,
    class_id: parseInt(class_id),
    name,
    username: username || '',
    roll_number,
    email: email || 'user',
    phone: phone || '',
    created_at: new Date().toISOString()
  };
  
  students.push(newStudent);
  
  res.status(201).json({
    success: true,
    message: 'Student added successfully',
    data: newStudent
  });
});

// GET /classes/:class_id/students - Get all students for a class
router.get('/classes/:class_id/students', (req, res) => {
  const { class_id } = req.params;
  const classStudents = students.filter(s => s.class_id === parseInt(class_id));
  
  res.json({
    success: true,
    data: classStudents,
    total: classStudents.length
  });
});

// GET /students/:id - Get a single student
router.get('/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  
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
});

// DELETE /students/:id - Delete a student
router.delete('/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }
  
  const deleted = students.splice(index, 1)[0];
  
  res.json({
    success: true,
    message: 'Student deleted successfully',
    data: deleted
  });
});

export default router;
