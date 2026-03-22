import pool from './connection.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function setupAttendanceDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('🔧 Setting up attendance database...');
    
    // Read and execute schema
    const schema = fs.readFileSync(join(__dirname, 'attendance-schema.sql'), 'utf8');
    await client.query(schema);
    console.log('✅ Schema created successfully');
    
    // Insert mock data
    console.log('📝 Inserting mock data...');
    
    // Mock Classes
    const classes = [
      { name: 'Computer Science 201', semester: 'Semester 3', room: 'Room 101', time: '09:00 AM', total_students: 45, status: 'active', color: '#6366F1' },
      { name: 'Data Structures', semester: 'Semester 4', room: 'Room 204', time: '11:00 AM', total_students: 38, status: 'upcoming', color: '#22D3EE' },
      { name: 'Machine Learning', semester: 'Semester 5', room: 'Lab 301', time: '02:00 PM', total_students: 52, status: 'upcoming', color: '#8B5CF6' },
      { name: 'Web Development', semester: 'Semester 2', room: 'Room 115', time: '04:00 PM', total_students: 41, status: 'upcoming', color: '#4ade80' },
      { name: 'Database Systems', semester: 'Semester 4', room: 'Lab 202', time: '10:00 AM', total_students: 35, status: 'active', color: '#F59E0B' }
    ];
    
    const classIds = [];
    for (const cls of classes) {
      const result = await client.query(
        'INSERT INTO classes (name, semester, room, time, total_students, status, color) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
        [cls.name, cls.semester, cls.room, cls.time, cls.total_students, cls.status, cls.color]
      );
      classIds.push(result.rows[0].id);
    }
    console.log(`✅ Inserted ${classIds.length} classes`);
    
    // Mock Students
    const studentNames = [
      'John Smith', 'Emma Johnson', 'Michael Brown', 'Sophia Davis', 'William Wilson',
      'Olivia Martinez', 'James Anderson', 'Ava Taylor', 'Robert Thomas', 'Isabella Garcia',
      'David Rodriguez', 'Mia Hernandez', 'Joseph Moore', 'Charlotte Martin', 'Daniel Lee',
      'Amelia Jackson', 'Matthew White', 'Harper Harris', 'Christopher Thompson', 'Evelyn Clark',
      'Andrew Lewis', 'Abigail Walker', 'Joshua Hall', 'Emily Allen', 'Ryan Young',
      'Elizabeth King', 'Nicholas Wright', 'Sofia Lopez', 'Jacob Hill', 'Avery Scott',
      'Ethan Green', 'Ella Adams', 'Alexander Baker', 'Scarlett Nelson', 'Benjamin Carter',
      'Grace Mitchell', 'Samuel Perez', 'Chloe Roberts', 'Henry Turner', 'Victoria Phillips',
      'Sebastian Campbell', 'Aria Parker', 'Jack Evans', 'Madison Edwards', 'Owen Collins'
    ];
    
    let studentCount = 0;
    let rollNumber = 1000;
    
    // Add students to each class
    for (let i = 0; i < classIds.length; i++) {
      const classId = classIds[i];
      const numStudents = classes[i].total_students;
      
      for (let j = 0; j < numStudents; j++) {
        const name = studentNames[j % studentNames.length];
        const roll = `CS${rollNumber++}`;
        const email = `${name.toLowerCase().replace(' ', '.')}@university.edu`;
        
        await client.query(
          'INSERT INTO students (class_id, name, roll_number, email) VALUES ($1, $2, $3, $4)',
          [classId, name, roll, email]
        );
        studentCount++;
      }
    }
    console.log(`✅ Inserted ${studentCount} students`);
    
    // Mock Attendance Records (for active classes)
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
    const dates = [today, yesterday, twoDaysAgo];
    let attendanceCount = 0;
    
    // Add attendance for active classes
    for (let i = 0; i < classIds.length; i++) {
      if (classes[i].status === 'active') {
        const classId = classIds[i];
        
        // Get students for this class
        const studentsResult = await client.query(
          'SELECT id FROM students WHERE class_id = $1',
          [classId]
        );
        const students = studentsResult.rows;
        
        // Add attendance for each date
        for (const date of dates) {
          for (const student of students) {
            // 90% present, 5% late, 5% absent
            const rand = Math.random();
            let status = 'present';
            if (rand > 0.95) status = 'absent';
            else if (rand > 0.90) status = 'late';
            
            await client.query(
              'INSERT INTO attendance_records (class_id, student_id, date, status) VALUES ($1, $2, $3, $4)',
              [classId, student.id, date.toISOString().split('T')[0], status]
            );
            attendanceCount++;
          }
        }
      }
    }
    console.log(`✅ Inserted ${attendanceCount} attendance records`);
    
    console.log('🎉 Attendance database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

setupAttendanceDatabase().catch(console.error);
