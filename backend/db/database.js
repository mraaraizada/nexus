import pool from './connection.js';

export const db = {
  // Projects
  projects: {
    create: async (data) => {
      const { name, description } = data;
      const result = await pool.query(
        'INSERT INTO projects (name, description) VALUES ($1, $2) RETURNING *',
        [name, description]
      );
      return result.rows[0];
    },

    findAll: async (page = 1, limit = 10) => {
      const offset = (page - 1) * limit;
      
      const countResult = await pool.query('SELECT COUNT(*) FROM projects');
      const total = parseInt(countResult.rows[0].count);
      
      const result = await pool.query(
        'SELECT * FROM projects ORDER BY created_at DESC LIMIT $1 OFFSET $2',
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
        'SELECT * FROM projects WHERE id = $1',
        [id]
      );
      return result.rows[0];
    },

    delete: async (id) => {
      const result = await pool.query(
        'DELETE FROM projects WHERE id = $1 RETURNING *',
        [id]
      );
      return result.rows[0];
    }
  },

  // Tasks
  tasks: {
    create: async (data) => {
      const { project_id, title, description, status, priority, due_date } = data;
      const result = await pool.query(
        'INSERT INTO tasks (project_id, title, description, status, priority, due_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [project_id, title, description, status || 'todo', priority || 'medium', due_date]
      );
      return result.rows[0];
    },

    findByProjectId: async (projectId, filters = {}) => {
      let query = 'SELECT * FROM tasks WHERE project_id = $1';
      const params = [projectId];
      let paramCount = 1;
      
      // Filter by status
      if (filters.status) {
        paramCount++;
        query += ` AND status = $${paramCount}`;
        params.push(filters.status);
      }
      
      // Sort by due_date
      if (filters.sort === 'due_date') {
        query += ' ORDER BY due_date ASC NULLS LAST';
      } else {
        query += ' ORDER BY created_at DESC';
      }
      
      const result = await pool.query(query, params);
      return result.rows;
    },

    findById: async (id) => {
      const result = await pool.query(
        'SELECT * FROM tasks WHERE id = $1',
        [id]
      );
      return result.rows[0];
    },

    update: async (id, data) => {
      const { title, description, status, priority, due_date } = data;
      const result = await pool.query(
        'UPDATE tasks SET title = $1, description = $2, status = $3, priority = $4, due_date = $5 WHERE id = $6 RETURNING *',
        [title, description, status, priority, due_date, id]
      );
      return result.rows[0];
    },

    delete: async (id) => {
      const result = await pool.query(
        'DELETE FROM tasks WHERE id = $1 RETURNING *',
        [id]
      );
      return result.rows[0];
    }
  }
};
