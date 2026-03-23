import express from 'express';

const router = express.Router();

// In-memory storage
let classes = [
  {
    id: 1,
    name: 'Computer Science 101',
    semester: 'Fall 2024',
    room: 'Room 301',
    time: '10:00 AM',
    total_students: 30,
    status: 'active',
    color: '#3b82f6',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Mathematics 201',
    semester: 'Fall 2024',
    room: 'Room 205',
    time: '2:00 PM',
    total_students: 25,
    status: 'active',
    color: '#10b981',
    created_at: new Date().toISOString()
  }
];

let nextId = 3;

// POST /classes - Create a new class
router.post('/', (req, res) => {
  const { name, semester, room, time, total_students, status, color } = req.body;
  
  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Class name is required'
    });
  }
  
  const newClass = {
    id: nextId++,
    name,
    semester: semester || 'Fall 2024',
    room: room || '',
    time: time || '',
    total_students: total_students || 0,
    status: status || 'active',
    color: color || '#3b82f6',
    created_at: new Date().toISOString()
  };
  
  classes.push(newClass);
  
  res.status(201).json({
    success: true,
    message: 'Class created successfully',
    data: newClass
  });
});

// GET /classes - Get all classes
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: classes,
    total: classes.length
  });
});

// GET /classes/stats - Get overall stats
router.get('/stats', (req, res) => {
  const stats = {
    total_classes: classes.length,
    active_classes: classes.filter(c => c.status === 'active').length,
    total_students: classes.reduce((sum, c) => sum + (c.total_students || 0), 0)
  };
  
  res.json({
    success: true,
    data: stats
  });
});

// GET /classes/:id - Get a single class
router.get('/:id', (req, res) => {
  const classData = classes.find(c => c.id === parseInt(req.params.id));
  
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
});

// DELETE /classes/:id - Delete a class
router.delete('/:id', (req, res) => {
  const index = classes.findIndex(c => c.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Class not found'
    });
  }
  
  const deleted = classes.splice(index, 1)[0];
  
  res.json({
    success: true,
    message: 'Class deleted successfully',
    data: deleted
  });
});

export default router;
