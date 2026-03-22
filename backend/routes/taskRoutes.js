import express from 'express';
import { db } from '../db/database.js';
import { validateTask } from '../middleware/validation.js';

const router = express.Router();

// POST /projects/:project_id/tasks - Create a new task
router.post('/projects/:project_id/tasks', validateTask, async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const project = await db.projects.findById(project_id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    const { title, description, status = 'todo', priority = 'medium', due_date } = req.body;
    const task = await db.tasks.create({
      project_id: parseInt(project_id),
      title,
      description,
      status,
      priority,
      due_date
    });
    
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    next(error);
  }
});

// GET /projects/:project_id/tasks - Get all tasks for a project
router.get('/projects/:project_id/tasks', async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const { status, sort } = req.query;
    
    const project = await db.projects.findById(project_id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    const tasks = await db.tasks.findByProjectId(project_id, { status, sort });
    
    res.json({
      success: true,
      data: tasks,
      total: tasks.length
    });
  } catch (error) {
    next(error);
  }
});

// PUT /tasks/:id - Update a task
router.put('/:id', validateTask, async (req, res, next) => {
  try {
    const task = await db.tasks.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    const { title, description, status, priority, due_date } = req.body;
    const updatedTask = await db.tasks.update(req.params.id, {
      title,
      description,
      status,
      priority,
      due_date
    });
    
    res.json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /tasks/:id - Delete a task
router.delete('/:id', async (req, res, next) => {
  try {
    const task = await db.tasks.delete(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Task deleted successfully',
      data: task
    });
  } catch (error) {
    next(error);
  }
});

export default router;
