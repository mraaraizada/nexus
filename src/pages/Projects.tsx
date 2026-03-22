import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, FolderOpen, Calendar, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { projectAPI, taskAPI } from '../services/api';

interface Project {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

interface Task {
  id: number;
  project_id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  due_date: string;
  created_at: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Project form
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectForm, setProjectForm] = useState({ name: '', description: '' });

  // Task form
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    status: 'todo' as const,
    priority: 'medium' as const,
    due_date: ''
  });

  useEffect(() => {
    fetchProjects();
  }, [page]);

  useEffect(() => {
    if (selectedProject) {
      fetchTasks(selectedProject.id);
    }
  }, [selectedProject, statusFilter, sortBy]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response: any = await projectAPI.getAll(page, 10);
      setProjects(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async (projectId: number) => {
    try {
      const response: any = await taskAPI.getByProject(projectId, { status: statusFilter, sort: sortBy });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await projectAPI.create(projectForm);
      setProjectForm({ name: '', description: '' });
      setShowProjectForm(false);
      fetchProjects();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Delete this project and all its tasks?')) return;
    try {
      await projectAPI.delete(id);
      if (selectedProject?.id === id) {
        setSelectedProject(null);
        setTasks([]);
      }
      fetchProjects();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;
    try {
      await taskAPI.create(selectedProject.id, taskForm);
      setTaskForm({ title: '', description: '', status: 'todo', priority: 'medium', due_date: '' });
      setShowTaskForm(false);
      fetchTasks(selectedProject.id);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleUpdateTaskStatus = async (task: Task, newStatus: 'todo' | 'in-progress' | 'done') => {
    try {
      await taskAPI.update(task.id, { ...task, status: newStatus });
      fetchTasks(selectedProject!.id);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (!confirm('Delete this task?')) return;
    try {
      await taskAPI.delete(id);
      fetchTasks(selectedProject!.id);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done': return <CheckCircle2 size={16} className="text-green-400" />;
      case 'in-progress': return <Clock size={16} className="text-yellow-400" />;
      default: return <AlertCircle size={16} className="text-blue-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white text-xl">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8" style={{ background: 'linear-gradient(135deg, #0F0C29, #302B63, #24243E)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Projects & Tasks</h1>
            <p className="text-white/60">Manage your projects and track progress</p>
          </div>
          <button
            onClick={() => setShowProjectForm(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          >
            <Plus size={20} />
            New Project
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects List */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">Projects ({projects.length})</h2>
              <div className="space-y-3">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedProject(project)}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      selectedProject?.id === project.id
                        ? 'bg-gradient-to-r from-indigo-500/30 to-purple-500/30 border-2 border-indigo-400'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <FolderOpen size={16} className="text-indigo-400" />
                          <h3 className="font-semibold text-white">{project.name}</h3>
                        </div>
                        <p className="text-sm text-white/60 line-clamp-2">{project.description}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProject(project.id);
                        }}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  <button
                    onClick={() => setPage(p => p - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-lg bg-white/10 text-white disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-white">Page {page} of {totalPages}</span>
                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-2 rounded-lg bg-white/10 text-white disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Tasks List */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              {selectedProject ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedProject.name}</h2>
                      <p className="text-white/60">{tasks.length} tasks</p>
                    </div>
                    <button
                      onClick={() => setShowTaskForm(true)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
                    >
                      <Plus size={18} />
                      Add Task
                    </button>
                  </div>

                  {/* Filters */}
                  <div className="flex gap-3 mb-6">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20"
                    >
                      <option value="">All Status</option>
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20"
                    >
                      <option value="">Default Sort</option>
                      <option value="due_date">Sort by Due Date</option>
                    </select>
                  </div>

                  {/* Tasks */}
                  <div className="space-y-3">
                    {tasks.length === 0 ? (
                      <div className="text-center py-12 text-white/40">
                        No tasks yet. Create one to get started!
                      </div>
                    ) : (
                      tasks.map((task) => (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {getStatusIcon(task.status)}
                                <h3 className="font-semibold text-white">{task.title}</h3>
                              </div>
                              <p className="text-sm text-white/60 mb-3">{task.description}</p>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                                  {task.priority}
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                  {task.status}
                                </span>
                                {task.due_date && (
                                  <span className="flex items-center gap-1 text-xs text-white/60">
                                    <Calendar size={12} />
                                    {new Date(task.due_date).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {task.status !== 'done' && (
                                <button
                                  onClick={() => handleUpdateTaskStatus(task, task.status === 'todo' ? 'in-progress' : 'done')}
                                  className="px-3 py-1 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 text-sm"
                                >
                                  {task.status === 'todo' ? 'Start' : 'Complete'}
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-20 text-white/40">
                  <FolderOpen size={64} className="mx-auto mb-4 opacity-50" />
                  <p className="text-xl">Select a project to view tasks</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Project Form Modal */}
      {showProjectForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowProjectForm(false)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Create New Project</h2>
            <form onSubmit={handleCreateProject}>
              <div className="mb-4">
                <label className="block text-white/80 mb-2">Project Name</label>
                <input
                  type="text"
                  value={projectForm.name}
                  onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-indigo-400 outline-none"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-white/80 mb-2">Description</label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-indigo-400 outline-none"
                  rows={3}
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowProjectForm(false)}
                  className="flex-1 px-6 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-lg text-white font-semibold"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                >
                  Create
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Task Form Modal */}
      {showTaskForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowTaskForm(false)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Create New Task</h2>
            <form onSubmit={handleCreateTask}>
              <div className="mb-4">
                <label className="block text-white/80 mb-2">Task Title</label>
                <input
                  type="text"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-indigo-400 outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white/80 mb-2">Description</label>
                <textarea
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-indigo-400 outline-none"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-white/80 mb-2">Status</label>
                  <select
                    value={taskForm.status}
                    onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20"
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/80 mb-2">Priority</label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-white/80 mb-2">Due Date</label>
                <input
                  type="date"
                  value={taskForm.due_date}
                  onChange={(e) => setTaskForm({ ...taskForm, due_date: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-indigo-400 outline-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowTaskForm(false)}
                  className="flex-1 px-6 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-lg text-white font-semibold"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                >
                  Create
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
