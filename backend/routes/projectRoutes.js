import express from 'express';
import { db } from '../db/database.js';
import { validateProject } from '../middleware/validation.js';

const router = express.Router();

// POST /projects - Create a new project
router.post('/', validateProject, async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const project = await db.projects.create({ name, description });
    
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
});

// GET /projects - Get all projects with pagination
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await db.projects.findAll(page, limit);
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    next(error);
  }
});

// GET /projects/:id - Get a single project
router.get('/:id', async (req, res, next) => {
  try {
    const project = await db.projects.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /projects/:id - Delete a project
router.delete('/:id', async (req, res, next) => {
  try {
    const project = await db.projects.delete(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Project deleted successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
});

export default router;
