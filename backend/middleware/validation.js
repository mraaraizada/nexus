export const validateProject = (req, res, next) => {
  const { name } = req.body;
  
  if (!name || name.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Project name is required'
    });
  }
  
  next();
};

export const validateTask = (req, res, next) => {
  const { title, status, priority } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Task title is required'
    });
  }
  
  const validStatuses = ['todo', 'in-progress', 'done'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status. Must be: todo, in-progress, or done'
    });
  }
  
  const validPriorities = ['low', 'medium', 'high'];
  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid priority. Must be: low, medium, or high'
    });
  }
  
  next();
};
