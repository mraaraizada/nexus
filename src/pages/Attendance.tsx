import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Calendar, Users, Search, Filter } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  rollNumber: string;
  status: 'present' | 'absent' | 'late' | null;
}

const mockStudents: Student[] = [
  { id: 1, name: 'Alice Johnson', rollNumber: 'CS001', status: null },
  { id: 2, name: 'Bob Smith', rollNumber: 'CS002', status: null },
  { id: 3, name: 'Charlie Brown', rollNumber: 'CS003', status: null },
  { id: 4, name: 'Diana Prince', rollNumber: 'CS004', status: null },
  { id: 5, name: 'Ethan Hunt', rollNumber: 'CS005', status: null },
  { id: 6, name: 'Fiona Green', rollNumber: 'CS006', status: null },
  { id: 7, name: 'George Wilson', rollNumber: 'CS007', status: null },
  { id: 8, name: 'Hannah Lee', rollNumber: 'CS008', status: null },
  { id: 9, name: 'Ian Malcolm', rollNumber: 'CS009', status: null },
  { id: 10, name: 'Julia Roberts', rollNumber: 'CS010', status: null },
  { id: 11, name: 'Kevin Hart', rollNumber: 'CS011', status: null },
  { id: 12, name: 'Laura Palmer', rollNumber: 'CS012', status: null },
  { id: 13, name: 'Michael Scott', rollNumber: 'CS013', status: null },
  { id: 14, name: 'Nina Simone', rollNumber: 'CS014', status: null },
  { id: 15, name: 'Oscar Isaac', rollNumber: 'CS015', status: null },
];

export default function Attendance() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('Computer Science 101');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleStatusChange = (id: number, status: 'present' | 'absent' | 'late') => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, status } : student
    ));
  };

  const markAllPresent = () => {
    setStudents(students.map(student => ({ ...student, status: 'present' })));
  };

  const clearAll = () => {
    setStudents(students.map(student => ({ ...student, status: null })));
  };

  const saveAttendance = () => {
    const unmarked = students.filter(s => s.status === null).length;
    if (unmarked > 0) {
      if (!confirm(`${unmarked} students are unmarked. Save anyway?`)) return;
    }
    alert('Attendance saved successfully!');
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: students.length,
    present: students.filter(s => s.status === 'present').length,
    absent: students.filter(s => s.status === 'absent').length,
    late: students.filter(s => s.status === 'late').length,
    unmarked: students.filter(s => s.status === null).length,
  };

  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(135deg, #0F0C29, #302B63, #24243E)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Take Attendance</h1>
          <p className="text-white/60">Mark student attendance with a simple click</p>
        </motion.div>

        {/* Class & Date Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-white/80 text-sm mb-2">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:border-indigo-400 outline-none"
              >
                <option value="Computer Science 101">Computer Science 101</option>
                <option value="Data Structures">Data Structures</option>
                <option value="Algorithms">Algorithms</option>
                <option value="Database Systems">Database Systems</option>
              </select>
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-2">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:border-indigo-400 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-2">Search Students</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="text"
                  placeholder="Name or Roll Number"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:border-indigo-400 outline-none placeholder:text-white/30"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6"
        >
          {[
            { label: 'Total', value: stats.total, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: Users },
            { label: 'Present', value: stats.present, color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: CheckCircle },
            { label: 'Absent', value: stats.absent, color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: XCircle },
            { label: 'Late', value: stats.late, color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: Clock },
            { label: 'Unmarked', value: stats.unmarked, color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', icon: Filter },
          ].map(({ label, value, color, icon: Icon }) => (
            <div key={label} className={`p-4 rounded-xl border ${color}`}>
              <div className="flex items-center gap-2 mb-1">
                <Icon size={16} />
                <span className="text-xs font-medium">{label}</span>
              </div>
              <div className="text-2xl font-bold">{value}</div>
            </div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3 mb-6"
        >
          <button
            onClick={markAllPresent}
            className="px-6 py-3 rounded-xl bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-all font-medium"
          >
            Mark All Present
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-3 rounded-xl bg-gray-500/20 text-gray-400 border border-gray-500/30 hover:bg-gray-500/30 transition-all font-medium"
          >
            Clear All
          </button>
          <button
            onClick={saveAttendance}
            className="ml-auto px-8 py-3 rounded-xl text-white font-semibold"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          >
            Save Attendance
          </button>
        </motion.div>

        {/* Students List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Students ({filteredStudents.length})
            </h2>
            <div className="space-y-2">
              {filteredStudents.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className={`p-4 rounded-xl border transition-all ${
                    student.status === 'present'
                      ? 'bg-green-500/10 border-green-500/30'
                      : student.status === 'absent'
                      ? 'bg-red-500/10 border-red-500/30'
                      : student.status === 'late'
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{student.name}</h3>
                        <p className="text-white/60 text-sm">{student.rollNumber}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange(student.id, 'present')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          student.status === 'present'
                            ? 'bg-green-500 text-white'
                            : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        }`}
                      >
                        <CheckCircle size={18} className="inline mr-1" />
                        Present
                      </button>
                      <button
                        onClick={() => handleStatusChange(student.id, 'late')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          student.status === 'late'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                        }`}
                      >
                        <Clock size={18} className="inline mr-1" />
                        Late
                      </button>
                      <button
                        onClick={() => handleStatusChange(student.id, 'absent')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          student.status === 'absent'
                            ? 'bg-red-500 text-white'
                            : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        }`}
                      >
                        <XCircle size={18} className="inline mr-1" />
                        Absent
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
