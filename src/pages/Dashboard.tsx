import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, BookOpen, ClipboardCheck, Activity, Upload, BarChart3,
  User, Settings, Bell, Search, ChevronDown, TrendingUp,
  Users, Clock, Calendar, ChevronRight, Play,
  CheckCircle, AlertCircle, ArrowUpRight, Home
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts'

const weeklyData = [
  { day: 'Mon', attendance: 92, engagement: 78 },
  { day: 'Tue', attendance: 88, engagement: 82 },
  { day: 'Wed', attendance: 95, engagement: 91 },
  { day: 'Thu', attendance: 91, engagement: 85 },
  { day: 'Fri', attendance: 85, engagement: 76 },
  { day: 'Sat', attendance: 78, engagement: 70 },
]

const engagementData = [
  { name: 'Present', value: 75, color: '#22D3EE' },
  { name: 'Late', value: 15, color: '#6366F1' },
  { name: 'Absent', value: 10, color: '#f87171' },
]

const classes = [
  { name: 'Computer Science 201', semester: 'Semester 3', students: 45, time: '09:00 AM', status: 'active', color: '#6366F1' },
  { name: 'Data Structures', semester: 'Semester 4', students: 38, time: '11:00 AM', status: 'upcoming', color: '#22D3EE' },
  { name: 'Machine Learning', semester: 'Semester 5', students: 52, time: '02:00 PM', status: 'upcoming', color: '#8B5CF6' },
  { name: 'Web Development', semester: 'Semester 2', students: 41, time: '04:00 PM', status: 'upcoming', color: '#4ade80' },
]

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: BookOpen, label: 'My Classes', id: 'classes' },
  { icon: ClipboardCheck, label: 'Take Attendance', id: 'attendance' },
  { icon: Activity, label: 'Activities', id: 'activities' },
  { icon: Upload, label: 'Uploads', id: 'uploads' },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
  { icon: User, label: 'Profile', id: 'profile' },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

const recentAttendance = [
  { class: 'CS 201', time: '09:00 AM', present: 43, total: 45, percent: 96 },
  { class: 'Data Struct', time: 'Yesterday', present: 35, total: 38, percent: 92 },
  { class: 'ML 401', time: 'Yesterday', present: 48, total: 52, percent: 92 },
]

const upcomingClasses = [
  { name: 'Data Structures', time: '11:00 AM', room: 'Room 204' },
  { name: 'Machine Learning', time: '02:00 PM', room: 'Lab 301' },
  { name: 'Web Dev', time: '04:00 PM', room: 'Room 115' },
]

const notifications = [
  { text: '3 students absent from CS 201', type: 'warning', time: '5m ago' },
  { text: 'Attendance report ready', type: 'success', time: '1h ago' },
  { text: 'New assignment submitted', type: 'info', time: '2h ago' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#080e25' }}>
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-64 w-96 h-96 rounded-full blur-3xl opacity-5"
          style={{ background: 'radial-gradient(circle, #6366F1, transparent)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-5"
          style={{ background: 'radial-gradient(circle, #22D3EE, transparent)' }} />
      </div>

      {/* SIDEBAR */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            className="relative z-30 flex flex-col h-full"
            style={{
              width: 240,
              minWidth: 240,
              background: 'rgba(11,16,38,0.85)',
              backdropFilter: 'blur(20px)',
              borderRight: '1px solid rgba(255,255,255,0.06)',
            }}
            initial={{ x: -240 }}
            animate={{ x: 0 }}
            exit={{ x: -240 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Logo */}
            <div className="px-6 py-5 flex items-center gap-3 border-b border-white/5">
              <img src="/logo.png" alt="Nexus Logo" className="w-9 h-9 rounded-xl flex-shrink-0" />
              <div>
                <span className="text-white font-bold text-lg tracking-wider" style={{ fontFamily: 'Poppins' }}>NEXUS</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-xs text-white/30">Pro Plan</span>
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 overflow-y-auto">
              <p className="text-white/25 text-xs font-semibold uppercase tracking-widest px-3 mb-3">Menu</p>
              {navItems.map(({ icon: Icon, label, id }) => (
                <motion.button
                  key={id}
                  onClick={() => {
                    if (id === 'attendance') {
                      navigate('/attendance');
                    } else {
                      setActiveNav(id);
                    }
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm font-medium transition-all relative"
                  style={{
                    color: activeNav === id ? '#fff' : 'rgba(255,255,255,0.45)',
                    background: activeNav === id ? 'rgba(99,102,241,0.15)' : 'transparent',
                  }}
                  whileHover={{ x: 2 }}
                >
                  {activeNav === id && (
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-full"
                      style={{ background: '#6366F1' }}
                      layoutId="activeBar"
                    />
                  )}
                  <Icon size={17} />
                  {label}
                  {id === 'activities' && (
                    <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full font-semibold"
                      style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}>3</span>
                  )}
                </motion.button>
              ))}
            </nav>

            {/* User */}
            <div className="px-3 py-4 border-t border-white/5">
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl glass cursor-pointer hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #4F46E5, #22D3EE)' }}>JD</div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-semibold truncate">Dr. John Doe</p>
                  <p className="text-white/40 text-xs truncate">john@university.edu</p>
                </div>
                <ChevronDown size={14} className="text-white/30 flex-shrink-0" />
              </div>
              <button
                onClick={() => navigate('/home')}
                className="w-full flex items-center gap-2 px-3 py-2 mt-1 rounded-xl text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                <Home size={14} />
                Back to Home
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="flex-shrink-0 flex items-center justify-between px-6 py-4"
          style={{ background: 'rgba(11,16,38,0.6)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors">
              <LayoutDashboard size={16} className="text-white/60" />
            </button>
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Search classes, students..."
                className="glass rounded-xl pl-9 pr-4 py-2 text-sm text-white/70 placeholder-white/25 outline-none focus:border-indigo-500/50 w-64"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors">
              <Bell size={16} className="text-white/60" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #22D3EE)' }}>JD</div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex gap-6">
            {/* Left + Center */}
            <div className="flex-1 min-w-0 space-y-6">
              {/* Greeting */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Poppins' }}>
                  Good morning, User 👋
                </h1>
                <p className="text-white/40 text-sm">You have 3 classes today. Attendance not yet recorded for 2.</p>
              </motion.div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  { label: 'Total Students', value: '847', icon: Users, change: '+12', color: '#6366F1', bg: 'rgba(99,102,241,0.15)' },
                  { label: 'Active Classes', value: '12', icon: BookOpen, change: '+2', color: '#22D3EE', bg: 'rgba(34,211,238,0.15)' },
                  { label: 'Attendance Rate', value: '94.2%', icon: TrendingUp, change: '+1.8%', color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
                  { label: 'Classes Today', value: '3', icon: Clock, change: '2 pending', color: '#FBBF24', bg: 'rgba(251,191,36,0.12)' },
                ].map(({ label, value, icon: Icon, change, color, bg }, i) => (
                  <motion.div
                    key={label}
                    className="glass rounded-2xl p-5 cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ y: -3, boxShadow: `0 20px 50px ${color}20` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                        <Icon size={18} style={{ color }} />
                      </div>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80' }}>
                        {change}
                      </span>
                    </div>
                    <div className="text-2xl font-black text-white mb-1" style={{ fontFamily: 'Poppins' }}>{value}</div>
                    <div className="text-white/40 text-xs">{label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid xl:grid-cols-3 gap-5">
                {/* Weekly Attendance */}
                <motion.div
                  className="glass rounded-2xl p-5 xl:col-span-2"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-white font-semibold text-sm">Weekly Attendance Graph</h3>
                      <p className="text-white/40 text-xs mt-0.5">Present vs Late this week</p>
                    </div>
                    <button className="flex items-center gap-1 text-xs text-white/50 glass px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
                      This Week <ChevronDown size={12} />
                    </button>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={weeklyData}>
                      <defs>
                        <linearGradient id="attGrad2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                      <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: 'rgba(11,16,38,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 12 }} />
                      <Area type="monotone" dataKey="attendance" stroke="#6366F1" strokeWidth={2.5} fill="url(#attGrad2)" dot={{ fill: '#6366F1', r: 4, strokeWidth: 0 }} name="Attendance %" />
                      <Area type="monotone" dataKey="engagement" stroke="#22D3EE" strokeWidth={2} fill="url(#engGrad)" dot={{ fill: '#22D3EE', r: 3, strokeWidth: 0 }} name="Late %" />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="flex gap-5 mt-3">
                    {[['#6366F1', 'Present'], ['#22D3EE', 'Late']].map(([color, label]) => (
                      <div key={label} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                        <span className="text-white/40 text-xs">{label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Engagement Pie */}
                <motion.div className="glass rounded-2xl p-5"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                  <h3 className="text-white font-semibold text-sm mb-1">Attendance Distribution</h3>
                  <p className="text-white/40 text-xs mb-4">Present / Late / Absent breakdown</p>
                  <div className="flex justify-center mb-4">
                    <ResponsiveContainer width={160} height={160}>
                      <PieChart>
                        <Pie data={engagementData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                          {engagementData.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ background: 'rgba(11,16,38,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 12 }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2">
                    {engagementData.map(({ name, value, color }) => (
                      <div key={name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                          <span className="text-white/50 text-xs">{name}</span>
                        </div>
                        <span className="text-white text-xs font-semibold">{value}%</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Class Cards */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">My Classes</h3>
                  <button className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
                    View All <ChevronRight size={13} />
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {classes.map((cls, i) => (
                    <motion.div
                      key={cls.name}
                      className="glass rounded-2xl p-5 cursor-pointer group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 + i * 0.06 }}
                      whileHover={{ y: -3 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: `${cls.color}20`, border: `1px solid ${cls.color}30` }}>
                          <BookOpen size={18} style={{ color: cls.color }} />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full"
                            style={{ background: cls.status === 'active' ? '#4ade80' : 'rgba(255,255,255,0.2)' }} />
                          <span className="text-xs capitalize"
                            style={{ color: cls.status === 'active' ? '#4ade80' : 'rgba(255,255,255,0.4)' }}>
                            {cls.status}
                          </span>
                        </div>
                      </div>
                      <h4 className="text-white font-semibold text-sm mb-1">{cls.name}</h4>
                      <p className="text-white/40 text-xs mb-3">{cls.semester}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-white/50 text-xs">
                          <Users size={12} />
                          {cls.students} Students
                        </div>
                        <div className="flex items-center gap-1.5 text-white/50 text-xs">
                          <Clock size={12} />
                          {cls.time}
                        </div>
                      </div>
                      <div className="h-px bg-white/5 my-3" />
                      <motion.button
                        className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all"
                        style={{ background: `${cls.color}15`, color: cls.color, border: `1px solid ${cls.color}25` }}
                        whileHover={{ background: `${cls.color}25` }}
                      >
                        Take Attendance
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT PANEL */}
            <div className="w-72 flex-shrink-0 space-y-5">
              {/* Quick action */}
              <motion.div className="glass rounded-2xl p-5"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <h3 className="text-white font-semibold text-sm mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { icon: ClipboardCheck, label: 'Take Attendance', color: '#6366F1' },
                    { icon: Upload, label: 'Upload File', color: '#22D3EE' },
                    { icon: BarChart3, label: 'View Reports', color: '#8B5CF6' },
                    { icon: ClipboardCheck, label: 'Mark All', color: '#FBBF24' },
                  ].map(({ icon: Icon, label, color }) => (
                    <motion.button
                      key={label}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl text-center transition-all"
                      style={{ background: `${color}10`, border: `1px solid ${color}20` }}
                      whileHover={{ scale: 1.04, background: `${color}20` }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Icon size={18} style={{ color }} />
                      <span className="text-white/60 text-xs leading-tight">{label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Upcoming Classes */}
              <motion.div className="glass rounded-2xl p-5"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-sm">Upcoming Classes</h3>
                  <Calendar size={14} className="text-white/30" />
                </div>
                <div className="space-y-3">
                  {upcomingClasses.map(({ name, time, room }) => (
                    <div key={name} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(99,102,241,0.15)' }}>
                        <BookOpen size={14} style={{ color: '#6366F1' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-medium truncate">{name}</p>
                        <p className="text-white/40 text-xs">{time} · {room}</p>
                      </div>
                      <Play size={12} className="text-white/30" />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Attendance */}
              <motion.div className="glass rounded-2xl p-5"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-sm">Recent Attendance</h3>
                  <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">See all</button>
                </div>
                <div className="space-y-3">
                  {recentAttendance.map(({ class: cls, time, present, total, percent }) => (
                    <div key={cls}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div>
                          <span className="text-white text-xs font-medium">{cls}</span>
                          <span className="text-white/30 text-xs ml-2">{time}</span>
                        </div>
                        <span className="text-xs font-semibold" style={{ color: percent >= 90 ? '#4ade80' : '#FBBF24' }}>
                          {percent}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: percent >= 90 ? 'linear-gradient(90deg, #4ade80, #22D3EE)' : 'linear-gradient(90deg, #FBBF24, #f97316)' }}
                          initial={{ width: 0 }}
                          animate={{ width: `${percent}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                      <div className="text-white/30 text-xs mt-1">{present}/{total} present</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Notifications */}
              <motion.div className="glass rounded-2xl p-5"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-sm">Notifications</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171' }}>3</span>
                </div>
                <div className="space-y-3">
                  {notifications.map(({ text, type, time }) => (
                    <div key={text} className="flex gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <div className="flex-shrink-0 mt-0.5">
                        {type === 'warning' && <AlertCircle size={14} className="text-yellow-400" />}
                        {type === 'success' && <CheckCircle size={14} className="text-green-400" />}
                        {type === 'info' && <ArrowUpRight size={14} style={{ color: '#22D3EE' }} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white/70 text-xs leading-relaxed">{text}</p>
                        <p className="text-white/30 text-xs mt-1">{time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
