import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home')
    }, 3000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0F1A45 0%, #0B1026 50%, #1E3A8A 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #6366F1, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #22D3EE, transparent)' }} />

      {/* Rotating ring */}
      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{ border: '1px solid rgba(99,102,241,0.3)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full"
        style={{ border: '1px dashed rgba(34,211,238,0.2)' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      {/* Logo area */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        {/* Logo icon */}
        <motion.div
          className="relative w-24 h-24 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
            boxShadow: '0 0 40px rgba(99,102,241,0.6), 0 0 80px rgba(99,102,241,0.2)',
          }}
          animate={{ boxShadow: ['0 0 40px rgba(99,102,241,0.6)', '0 0 60px rgba(99,102,241,0.9)', '0 0 40px rgba(99,102,241,0.6)'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-white font-bold text-3xl" style={{ fontFamily: 'Poppins' }}>N</span>
        </motion.div>

        {/* Brand name */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h1 className="text-5xl font-black tracking-widest mb-2 text-gradient" style={{ fontFamily: 'Poppins' }}>
            NEXUS
          </h1>
          <p className="text-sm font-medium tracking-[0.3em] uppercase" style={{ color: '#22D3EE' }}>
            Attendance Management
          </p>
        </motion.div>

        {/* Loading message */}
        <motion.p
          className="text-sm text-white/50 text-center max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          NEXUS is loading your dashboard...
        </motion.p>

        {/* Progress bar */}
        <motion.div
          className="w-48 h-1 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.1)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #6366F1, #22D3EE)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ delay: 1.1, duration: 1.8, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Dot nodes */}
        <motion.div
          className="flex gap-2 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="rounded-full"
              style={{
                width: i === 2 ? 10 : 6,
                height: i === 2 ? 10 : 6,
                background: i === 2 ? '#22D3EE' : 'rgba(99,102,241,0.6)',
              }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.2, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
