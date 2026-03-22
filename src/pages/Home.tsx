import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BarChart3, FileText, Calendar, ClipboardList, Cloud,
  ArrowRight, Play, ChevronRight, Star, UserCheck, CheckCircle, TrendingUp,
  Users, BookOpen, Shield, Twitter, Github, Linkedin, Menu, X, Bell, ClipboardCheck
} from 'lucide-react'
import { useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts'

const attendanceData = [
  { day: 'Mon', rate: 92 }, { day: 'Tue', rate: 88 }, { day: 'Wed', rate: 95 },
  { day: 'Thu', rate: 91 }, { day: 'Fri', rate: 85 }, { day: 'Sat', rate: 78 },
]
const engagementData = [
  { month: 'Jan', score: 75 }, { month: 'Feb', score: 82 }, { month: 'Mar', score: 79 },
  { month: 'Apr', score: 88 }, { month: 'May', score: 85 }, { month: 'Jun', score: 92 },
]

const features = [
  { icon: UserCheck, title: 'Manual Attendance', desc: 'Quickly mark attendance for each student with a smart click - Present, Absent, or Late.' },
  { icon: BarChart3, title: 'Class Analytics', desc: 'Deep insights into class performance and attendance patterns.' },
  { icon: TrendingUp, title: 'Student Insights', desc: 'Monitor student attendance trends and identify at-risk students early.' },
  { icon: FileText, title: 'Automatic Reports', desc: 'Generate detailed attendance reports with one click.' },
  { icon: Calendar, title: 'Schedule Planner', desc: 'Manage and plan your class schedule with ease.' },
  { icon: ClipboardList, title: 'Assignment Tracker', desc: 'Track assignments and deadlines seamlessly.' },
  { icon: Bell, title: 'Absence Alerts', desc: 'Get notified when students exceed their absence limit.' },
  { icon: Cloud, title: 'Secure Cloud Storage', desc: 'All your data encrypted and stored securely in the cloud.' },
]

const steps = [
  { icon: BookOpen, title: 'Open Your Class', desc: 'Select the class session you want to manage attendance for.' },
  { icon: ClipboardCheck, title: 'Mark Students', desc: 'Mark each student as present, absent, or late in seconds.' },
  { icon: CheckCircle, title: 'Attendance Saved', desc: 'Records are automatically saved and synced to the cloud.' },
]

const testimonials = [
  {
    name: 'Prof. Sarah Mitchell', role: 'Computer Science, MIT',
    text: '"NEXUS reduced my attendance work by 90%. What used to take 15 minutes now takes seconds!"',
    rating: 5, initials: 'SM',
  },
  {
    name: 'Dr. James Chen', role: 'Engineering, Stanford',
    text: '"The reports and analytics are remarkable. Managing 300+ students is now completely stress-free."',
    rating: 5, initials: 'JC',
  },
  {
    name: 'Prof. Aisha Patel', role: 'Mathematics, Oxford',
    text: '"The analytics dashboard gives me insights I never had before. Truly transformational for teaching."',
    rating: 5, initials: 'AP',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0F1A45 0%, #0B1026 60%, #1E3A8A 100%)' }}>
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #6366F1, transparent)' }} />
        <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #22D3EE, transparent)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-5"
          style={{ background: 'radial-gradient(circle, #8B5CF6, transparent)' }} />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Nexus Logo" className="w-9 h-9 rounded-xl" />
            <span className="text-white font-bold text-xl tracking-wider" style={{ fontFamily: 'Poppins' }}>NEXUS</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Features', 'How It Works', 'Analytics', 'Pricing'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                className="text-white/60 hover:text-white text-sm font-medium transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate('/projects')}
              className="text-white/70 hover:text-white text-sm font-medium px-4 py-2 transition-colors"
            >
              Projects
            </button>
            <button className="text-white/70 hover:text-white text-sm font-medium px-4 py-2 transition-colors">
              Sign In
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-primary text-white text-sm font-semibold px-5 py-2 rounded-full"
            >
              Get Started
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden glass-dark border-t border-white/10 px-6 py-4 flex flex-col gap-4">
            {['Features', 'How It Works', 'Analytics', 'Pricing'].map(item => (
              <a key={item} href="#" className="text-white/70 text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}>{item}</a>
            ))}
            <button onClick={() => navigate('/dashboard')} className="btn-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full w-fit">
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium" style={{ color: '#22D3EE' }}>Smart Management Platform</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6" style={{ fontFamily: 'Poppins' }}>
              <span className="text-white">Smart</span><br />
              <span className="text-gradient">Attendance</span><br />
              <span className="text-white">Management</span><br />
              <span className="text-white/80 text-4xl lg:text-5xl">For Smart Classrooms</span>
            </h1>

            <p className="text-white/60 text-lg mb-8 leading-relaxed max-w-lg">
              Track attendance, generate reports, and manage your classes — all in one clean, easy-to-use platform.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                onClick={() => navigate('/dashboard')}
                className="btn-primary text-white font-semibold px-7 py-3.5 rounded-full flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Start Managing Classes
                <ArrowRight size={18} />
              </motion.button>
              <motion.button
                className="flex items-center gap-2 text-white/80 font-semibold px-7 py-3.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #6366F1, #22D3EE)' }}>
                  <Play size={12} fill="white" className="text-white ml-0.5" />
                </div>
                Watch Demo
              </motion.button>
            </div>

            <div className="flex gap-8 mt-10">
              {[['50K+', 'Students'], ['2000+', 'Classes'], ['99%', 'Uptime']].map(([num, label]) => (
                <div key={label}>
                  <div className="text-2xl font-black text-gradient" style={{ fontFamily: 'Poppins' }}>{num}</div>
                  <div className="text-white/50 text-xs font-medium">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Floating Dashboard Cards */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-md h-96">
              {/* Main card */}
              <motion.div
                className="absolute inset-0 rounded-2xl p-5 glass"
                style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.4)' }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/70 text-sm font-medium">Today's Overview</span>
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80' }}>Live</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: 'Attendance Rate', value: '94.2%', color: '#22D3EE', icon: TrendingUp },
                    { label: 'Active Classes', value: '12', color: '#6366F1', icon: BookOpen },
                    { label: 'Student Count', value: '847', color: '#8B5CF6', icon: Users },
                    { label: 'Present Today', value: '798', color: '#4ade80', icon: UserCheck },
                  ].map(({ label, value, color, icon: Icon }) => (
                    <div key={label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div className="flex items-center gap-2 mb-1">
                        <Icon size={13} style={{ color }} />
                        <span className="text-white/50 text-xs">{label}</span>
                      </div>
                      <div className="text-white font-bold text-lg" style={{ fontFamily: 'Poppins' }}>{value}</div>
                    </div>
                  ))}
                </div>
                {/* Mini chart */}
                <div className="h-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={attendanceData}>
                      <defs>
                        <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="rate" stroke="#6366F1" fill="url(#heroGrad)" strokeWidth={2} dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Quick mark floating widget */}
              <motion.div
                className="absolute -right-16 top-4 glass rounded-2xl p-4 w-44"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                style={{ boxShadow: '0 16px 48px rgba(34,211,238,0.15)' }}
              >
                <div className="mb-3">
                  <p className="text-white/70 text-xs font-semibold mb-2">Quick Mark</p>
                  {[
                    { name: 'Alice Johnson', status: 'present', color: '#4ade80' },
                    { name: 'Bob Smith', status: 'absent', color: '#f87171' },
                    { name: 'Carol White', status: 'present', color: '#4ade80' },
                  ].map(({ name, status, color }) => (
                    <div key={name} className="flex items-center justify-between py-1">
                      <span className="text-white/60 text-xs truncate flex-1">{name}</span>
                      <span className="text-xs font-medium ml-2 capitalize" style={{ color }}>{status}</span>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-white/10 my-2" />
                <p className="text-xs text-center font-medium" style={{ color: '#22D3EE' }}>3 / 3 marked</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)' }}>
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#6366F1' }}>Capabilities</span>
            </div>
            <h2 className="text-4xl font-black mb-4 text-white" style={{ fontFamily: 'Poppins' }}>
              Features for <span className="text-gradient">Smart Teaching</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Everything you need to run a modern, data-driven classroom.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                className="glass rounded-2xl p-6 cursor-pointer group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(99,102,241,0.2)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(34,211,238,0.1))', border: '1px solid rgba(99,102,241,0.3)' }}>
                  <Icon size={22} style={{ color: '#22D3EE' }} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-black mb-4 text-white" style={{ fontFamily: 'Poppins' }}>
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-white/50">Three smart steps to manage your attendance.</p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="flex flex-col md:flex-row items-center flex-1 gap-4">
                <motion.div
                  className="flex-1 glass rounded-2xl p-8 text-center w-full"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)', boxShadow: '0 8px 24px rgba(99,102,241,0.4)' }}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <div className="text-4xl font-black mb-2 text-gradient" style={{ fontFamily: 'Poppins' }}>
                    0{i + 1}
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                  <p className="text-white/50 text-sm">{desc}</p>
                </motion.div>

                {i < steps.length - 1 && (
                  <motion.div
                    className="hidden md:flex items-center"
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ delay: 0.4 }}>
                    <ChevronRight size={28} className="text-indigo-400" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANALYTICS PREVIEW */}
      <section id="analytics" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-black mb-4 text-white" style={{ fontFamily: 'Poppins' }}>
              Powerful <span className="text-gradient">Analytics</span>
            </h2>
            <p className="text-white/50">Clear insights to help you track and improve attendance.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Attendance Graph */}
            <motion.div className="glass rounded-2xl p-6"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-white font-semibold">Weekly Attendance</h3>
                  <p className="text-white/50 text-xs mt-1">Average this week: 88.2%</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80' }}>+2.4%</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={attendanceData}>
                  <defs>
                    <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} domain={[70, 100]} />
                  <Tooltip contentStyle={{ background: 'rgba(11,16,38,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }} />
                  <Area type="monotone" dataKey="rate" stroke="#6366F1" strokeWidth={2.5} fill="url(#attGrad)" dot={{ fill: '#6366F1', strokeWidth: 0, r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Monthly Trend Chart */}
            <motion.div className="glass rounded-2xl p-6"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-white font-semibold">Monthly Trend</h3>
                  <p className="text-white/50 text-xs mt-1">Attendance score over 6 months</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>Monthly</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'rgba(11,16,38,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }} />
                  <Bar dataKey="score" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22D3EE" />
                      <stop offset="100%" stopColor="#6366F1" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Mini stat cards */}
            {[
              { label: 'Class Performance', value: '92.4', unit: '%', sub: 'Avg across all classes', color: '#8B5CF6' },
              { label: 'Weekly Improvement', value: '+12', unit: '%', sub: 'Attendance this week vs last', color: '#22D3EE' },
            ].map(({ label, value, unit, sub, color }, i) => (
              <motion.div key={label} className="glass rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/50 text-sm mb-2">{label}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black" style={{ fontFamily: 'Poppins', color }}>{value}</span>
                      <span className="text-xl font-bold text-white/60">{unit}</span>
                    </div>
                    <p className="text-white/40 text-xs mt-2">{sub}</p>
                  </div>
                  <div className="w-20 h-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={attendanceData}>
                        <defs>
                          <linearGradient id={`miniGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="rate" stroke={color} fill={`url(#miniGrad${i})`} strokeWidth={2} dot={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-black mb-4 text-white" style={{ fontFamily: 'Poppins' }}>
              Loved by <span className="text-gradient">Educators</span>
            </h2>
            <p className="text-white/50">Join thousands of teachers already using NEXUS.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, text, rating, initials }, i) => (
              <motion.div
                key={name}
                className="glass rounded-2xl p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: rating }).map((_, j) => (
                    <Star key={j} size={14} fill="#FBBF24" className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6">{text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #4F46E5, #22D3EE)' }}>
                    {initials}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{name}</p>
                    <p className="text-white/40 text-xs">{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="rounded-3xl p-12 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.3), rgba(34,211,238,0.1))', border: '1px solid rgba(99,102,241,0.3)' }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 blur-3xl opacity-20"
                style={{ background: 'radial-gradient(circle, #6366F1, transparent)' }} />
            </div>
            <h2 className="text-4xl font-black text-white mb-4 relative z-10" style={{ fontFamily: 'Poppins' }}>
              Ready to Simplify Attendance?
            </h2>
            <p className="text-white/60 mb-8 relative z-10">
              Join 2,000+ educators managing attendance the smart way with NEXUS.
            </p>
            <motion.button
              onClick={() => navigate('/dashboard')}
              className="btn-primary text-white font-semibold px-8 py-4 rounded-full text-base relative z-10 inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Start for Free <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="Nexus Logo" className="w-8 h-8 rounded-lg" />
                <span className="text-white font-bold tracking-wider" style={{ fontFamily: 'Poppins' }}>NEXUS</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Smart, powerful attendance management for the modern classroom.
              </p>
              <div className="flex gap-3 mt-5">
                {[Twitter, Github, Linkedin].map((Icon, i) => (
                  <button key={i} className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors">
                    <Icon size={15} className="text-white/60" />
                  </button>
                ))}
              </div>
            </div>

            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
              { title: 'Documentation', links: ['Getting Started', 'API Reference', 'Guides', 'Examples'] },
              { title: 'Company', links: ['Contact', 'Privacy Policy', 'Terms of Service', 'Security'] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
                <ul className="space-y-2.5">
                  {links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">© 2026 NEXUS. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-white/30" />
              <span className="text-white/30 text-xs">SOC 2 Compliant · GDPR Ready · 256-bit Encryption</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
