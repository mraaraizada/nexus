import pool from './connection.js';

export const attendanceDB = {
  // Classes
  classes: {
    create: async (data) => {
      const { name, semester, room, time, total_students, status, color } = data;
      const result = await pool.query(
        'INSERT INTO classes (name, semester, room, time, total_students, status, color) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [name, semester, room, time, total_students || 0, status || 'active', color || '#6366F1']
      );
      return result.rows[0];
    },

    findAll: async (page = 1, limit = 10) => {
      const offset = (page - 1) * limit;
      
      const countResult = await pool.query('SELECT COUNT(*) FROM classes');
      const total = parseInt(countResult.rows[0].count);
      
      const result = await pool.query(
        'SELECT * FROM classes ORDER BY created_at DESC LIMIT $1 OFFSET $2',
        [limit, offset]
      );
      
      return {
        data: result.rows,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      };
    },

    findById: async (id) => {
      const result = await pool.query(
        'SELECT * FROM classes WHERE id = $1',
        [id]
      );
      return result.rows[0];
    },

    delete: async (id) => {
      const result = await pool.query(
        'DELETE FROM classes WHERE id = $1 RETURNING *',
        [id]
      );
      return result.rows[0];
    },

    getStats: async () => {
      const result = await pool.query(`
        SELECT 
          COUNT(*) as total_classes,
          SUM(total_students) as total_students,
          COUNT(CASE WHEN status = 'active' THEN 1 END) as active_classes
        FROM classes
      `);
      return result.rows[0];
    }
  },

  // Students
  students: {
    create: async (data) => {
      const { class_id, name, roll_number, email, phone } = data;
      const result = await pool.query(
        'INSERT INTO students (class_id, name, roll_number, email, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [class_id, name, roll_number, email, phone]
      );
      
      // Update class total_students count
      await pool.query(
        'UPDATE classes SET total_students = total_students + 1 WHERE id = $1',
        [class_id]
      );
      
      return result.rows[0];
    },

    findByClassId: async (classId, filters = {}) => {
      let query = 'SELECT * FROM students WHERE class_id = $1';
      const params = [classId];
      
      query += ' ORDER BY name ASC';
      
      const result = await pool.query(query, params);
      return result.rows;
    },

    findById: async (id) => {
      const result = await pool.query(
        'SELECT * FROM students WHERE id = $1',
        [id]
      );
      return result.rows[0];
    },

    delete: async (id) => {
      // Get class_id before deleting
      const student = await pool.query('SELECT class_id FROM students WHERE id = $1', [id]);
      if (student.rows.length === 0) return null;
      
      const result = await pool.query(
        'DELETE FROM students WHERE id = $1 RETURNING *',
        [id]
      );
      
      // Update class total_students count
      await pool.query(
        'UPDATE classes SET total_students = total_students - 1 WHERE id = $1',
        [student.rows[0].class_id]
      );
      
      return result.rows[0];
    }
  },

  // Attendance
  attendance: {
    markAttendance: async (data) => {
      const { class_id, student_id, date, status, notes } = data;
      const result = await pool.query(
        `INSERT INTO attendance_records (class_id, student_id, date, status, notes) 
         VALUES ($1, $2, $3, $4, $5) 
         ON CONFLICT (class_id, student_id, date) 
         DO UPDATE SET status = $4, notes = $5, marked_at = CURRENT_TIMESTAMP
         RETURNING *`,
        [class_id, student_id, date || new Date().toISOString().split('T')[0], status || 'present', notes]
      );
      return result.rows[0];
    },

    markBulkAttendance: async (classId, date, attendanceData) => {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        
        const results = [];
        for (const record of attendanceData) {
          const result = await client.query(
            `INSERT INTO attendance_records (class_id, student_id, date, status, notes) 
             VALUES ($1, $2, $3, $4, $5) 
             ON CONFLICT (class_id, student_id, date) 
             DO UPDATE SET status = $4, notes = $5, marked_at = CURRENT_TIMESTAMP
             RETURNING *`,
            [classId, record.student_id, date, record.status, record.notes]
          );
          results.push(result.rows[0]);
        }
        
        await client.query('COMMIT');
        return results;
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    },

    getByClass: async (classId, filters = {}) => {
      let query = `
        SELECT ar.*, s.name as student_name, s.roll_number
        FROM attendance_records ar
        JOIN students s ON ar.student_id = s.id
        WHERE ar.class_id = $1
      `;
      const params = [classId];
      let paramCount = 1;
      
      // Filter by date
      if (filters.date) {
        paramCount++;
        query += ` AND ar.date = $${paramCount}`;
        params.push(filters.date);
      }
      
      // Filter by status
      if (filters.status) {
        paramCount++;
        query += ` AND ar.status = $${paramCount}`;
        params.push(filters.status);
      }
      
      query += ' ORDER BY ar.date DESC, s.name ASC';
      
      const result = await pool.query(query, params);
      return result.rows;
    },

    getByStudent: async (studentId, filters = {}) => {
      let query = `
        SELECT ar.*, c.name as class_name
        FROM attendance_records ar
        JOIN classes c ON ar.class_id = c.id
        WHERE ar.student_id = $1
      `;
      const params = [studentId];
      let paramCount = 1;
      
      if (filters.startDate && filters.endDate) {
        paramCount++;
        query += ` AND ar.date BETWEEN $${paramCount}`;
        params.push(filters.startDate);
        paramCount++;
        query += ` AND $${paramCount}`;
        params.push(filters.endDate);
      }
      
      query += ' ORDER BY ar.date DESC';
      
      const result = await pool.query(query, params);
      return result.rows;
    },

    getStats: async (classId, startDate, endDate) => {
      const result = await pool.query(`
        SELECT 
          COUNT(*) as total_records,
          COUNT(CASE WHEN status = 'present' THEN 1 END) as present_count,
          COUNT(CASE WHEN status = 'late' THEN 1 END) as late_count,
          COUNT(CASE WHEN status = 'absent' THEN 1 END) as absent_count,
          ROUND(COUNT(CASE WHEN status = 'present' THEN 1 END) * 100.0 / NULLIF(COUNT(*), 0), 2) as attendance_percentage
        FROM attendance_records
        WHERE class_id = $1
        AND date BETWEEN $2 AND $3
      `, [classId, startDate, endDate]);
      
      return result.rows[0];
    },

    delete: async (id) => {
      const result = await pool.query(
        'DELETE FROM attendance_records WHERE id = $1 RETURNING *',
        [id]
      );
      return result.rows[0];
    }
  }
};
