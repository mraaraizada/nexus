import pool from './connection.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function setupDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('🔧 Setting up database...');
    
    // Read and execute schema
    const schema = fs.readFileSync(join(__dirname, 'schema.sql'), 'utf8');
    await client.query(schema);
    console.log('✅ Schema created successfully');
    
    // Insert mock data
    console.log('📝 Inserting mock data...');
    
    // Mock Projects
    const projects = [
      { name: 'Website Redesign', description: 'Complete overhaul of company website with modern UI/UX' },
      { name: 'Mobile App Development', description: 'Build native iOS and Android applications' },
      { name: 'API Integration', description: 'Integrate third-party APIs for payment and analytics' },
      { name: 'Database Migration', description: 'Migrate from MySQL to PostgreSQL' },
      { name: 'Security Audit', description: 'Comprehensive security review and penetration testing' }
    ];
    
    const projectIds = [];
    for (const project of projects) {
      const result = await client.query(
        'INSERT INTO projects (name, description) VALUES ($1, $2) RETURNING id',
        [project.name, project.description]
      );
      projectIds.push(result.rows[0].id);
    }
    console.log(`✅ Inserted ${projectIds.length} projects`);
    
    // Mock Tasks
    const tasks = [
      // Website Redesign tasks
      { project_id: projectIds[0], title: 'Design homepage mockup', description: 'Create high-fidelity mockup in Figma', status: 'done', priority: 'high', due_date: '2024-03-15' },
      { project_id: projectIds[0], title: 'Implement responsive navigation', description: 'Build mobile-first navigation component', status: 'in-progress', priority: 'high', due_date: '2024-03-20' },
      { project_id: projectIds[0], title: 'Optimize images and assets', description: 'Compress and optimize all media files', status: 'todo', priority: 'medium', due_date: '2024-03-25' },
      { project_id: projectIds[0], title: 'Setup CDN', description: 'Configure CloudFlare for static assets', status: 'todo', priority: 'low', due_date: '2024-03-30' },
      
      // Mobile App tasks
      { project_id: projectIds[1], title: 'Setup React Native project', description: 'Initialize project with Expo', status: 'done', priority: 'high', due_date: '2024-03-10' },
      { project_id: projectIds[1], title: 'Build authentication flow', description: 'Implement login, signup, and password reset', status: 'in-progress', priority: 'high', due_date: '2024-03-22' },
      { project_id: projectIds[1], title: 'Design app icon and splash screen', description: 'Create branding assets for app stores', status: 'todo', priority: 'medium', due_date: '2024-03-28' },
      { project_id: projectIds[1], title: 'Implement push notifications', description: 'Setup Firebase Cloud Messaging', status: 'todo', priority: 'medium', due_date: '2024-04-05' },
      
      // API Integration tasks
      { project_id: projectIds[2], title: 'Research payment gateways', description: 'Compare Stripe, PayPal, and Square', status: 'done', priority: 'high', due_date: '2024-03-12' },
      { project_id: projectIds[2], title: 'Integrate Stripe API', description: 'Setup payment processing with Stripe', status: 'in-progress', priority: 'high', due_date: '2024-03-25' },
      { project_id: projectIds[2], title: 'Add Google Analytics', description: 'Implement GA4 tracking', status: 'todo', priority: 'medium', due_date: '2024-03-30' },
      
      // Database Migration tasks
      { project_id: projectIds[3], title: 'Backup existing database', description: 'Create full backup of MySQL database', status: 'done', priority: 'high', due_date: '2024-03-08' },
      { project_id: projectIds[3], title: 'Write migration scripts', description: 'Create scripts to transfer data', status: 'in-progress', priority: 'high', due_date: '2024-03-20' },
      { project_id: projectIds[3], title: 'Test on staging environment', description: 'Verify migration works correctly', status: 'todo', priority: 'high', due_date: '2024-03-27' },
      { project_id: projectIds[3], title: 'Update application code', description: 'Change database drivers and queries', status: 'todo', priority: 'medium', due_date: '2024-04-02' },
      
      // Security Audit tasks
      { project_id: projectIds[4], title: 'Run automated security scan', description: 'Use OWASP ZAP for vulnerability scanning', status: 'in-progress', priority: 'high', due_date: '2024-03-23' },
      { project_id: projectIds[4], title: 'Review authentication system', description: 'Check for security flaws in auth flow', status: 'todo', priority: 'high', due_date: '2024-03-26' },
      { project_id: projectIds[4], title: 'Update dependencies', description: 'Patch all vulnerable npm packages', status: 'todo', priority: 'medium', due_date: '2024-03-29' },
      { project_id: projectIds[4], title: 'Document security findings', description: 'Create comprehensive security report', status: 'todo', priority: 'low', due_date: '2024-04-05' }
    ];
    
    let taskCount = 0;
    for (const task of tasks) {
      await client.query(
        'INSERT INTO tasks (project_id, title, description, status, priority, due_date) VALUES ($1, $2, $3, $4, $5, $6)',
        [task.project_id, task.title, task.description, task.status, task.priority, task.due_date]
      );
      taskCount++;
    }
    console.log(`✅ Inserted ${taskCount} tasks`);
    
    console.log('🎉 Database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

setupDatabase().catch(console.error);
