import { Progress } from '@heroui/react'
import Shell from '../components/Shell'
import { ROLES, STUDENT_SCHEDULE, GRADES, HOMEWORK } from '../data'

const roleInfo = ROLES.student

const MENU = [
  { section: '🏠 ภาพรวม', items: ['หน้าหลัก', 'ตารางวันนี้', 'การแจ้งเตือน'] },
  {
    section: '📚 การเรียน',
    items: ['ตารางเรียน', 'การบ้าน / งาน', 'ตารางสอบ', 'ห้องเรียนออนไลน์', 'เอกสารประกอบการสอน'],
  },
  {
    section: '📊 ผลการเรียน',
    items: ['คะแนนและเกรด', 'การมาเรียน', 'คะแนนความประพฤติ'],
  },
  {
    section: '💬 สื่อสาร',
    items: ['แชทกับครู', 'ประกาศห้องเรียน', 'ข่าวสารโรงเรียน'],
  },
  { section: '👤 ตัวฉัน', items: ['โปรไฟล์', 'ตั้งค่า'] },
]

function Sidebar() {
  return (
    <div className="px-3 py-2 space-y-4">
      {MENU.map(({ section, items }, si) => (
        <div key={section}>
          <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase px-2 mb-1.5">{section}</p>
          <ul className="space-y-0.5">
            {items.map((label, i) => {
              const active = si === 0 && i === 0
              return (
                <li key={label}>
                  <button
                    className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150"
                    style={active
                      ? { background: 'linear-gradient(90deg, rgba(43,112,184,0.12), rgba(61,143,212,0.04))', color: '#2b70b8', borderLeft: '3px solid #2b70b8', paddingLeft: '9px' }
                      : { color: '#6b7280' }
                    }
                    onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = '#f3f4f6'; e.currentTarget.style.color = '#111827' } }}
                    onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = ''; e.currentTarget.style.color = '#6b7280' } }}
                  >
                    {label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

const cs = '0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)'

const STATS = [
  { label: 'คาบเรียนวันนี้', value: '5', unit: 'คาบ', icon: '📖', from: '#2b70b8', to: '#3d8fd4', glow: 'rgba(43,112,184,0.22)' },
  { label: 'GPA ปัจจุบัน', value: '3.7', unit: '', icon: '⭐', from: '#059669', to: '#10b981', glow: 'rgba(5,150,105,0.22)' },
  { label: 'การบ้านค้างส่ง', value: '2', unit: 'ชิ้น', icon: '📝', from: '#dc2626', to: '#ef4444', glow: 'rgba(220,38,38,0.22)' },
  { label: 'เวลาเรียน', value: '97', unit: '%', icon: '✅', from: '#7c3aed', to: '#8b5cf6', glow: 'rgba(124,58,237,0.22)' },
]

const QUICK = [
  { label: 'ส่งการบ้าน', icon: '📤', from: '#2b70b8', to: '#3d8fd4', glow: 'rgba(43,112,184,0.38)' },
  { label: 'ดูคะแนน', icon: '📊', from: '#059669', to: '#10b981', glow: 'rgba(5,150,105,0.38)' },
  { label: 'แชทครู', icon: '💬', from: '#7c3aed', to: '#8b5cf6', glow: 'rgba(124,58,237,0.38)' },
  { label: 'ดูตารางสอบ', icon: '📅', from: '#d97706', to: '#f59e0b', glow: 'rgba(217,119,6,0.38)' },
]

const GRADE_MAP = {
  A: { from: '#059669', to: '#10b981', bg: '#f0fdf4', text: '#166534' },
  B: { from: '#2563eb', to: '#3b82f6', bg: '#eff6ff', text: '#1e40af' },
  C: { from: '#d97706', to: '#f59e0b', bg: '#fffbeb', text: '#92400e' },
  D: { from: '#dc2626', to: '#ef4444', bg: '#fff5f5', text: '#c53030' },
}

function gradeStyle(grade) {
  if (grade === 'A') return GRADE_MAP.A
  if (grade.startsWith('B')) return GRADE_MAP.B
  if (grade.startsWith('C')) return GRADE_MAP.C
  return GRADE_MAP.D
}

function gradeColor(grade) {
  if (grade === 'A') return 'success'
  if (grade.startsWith('B')) return 'primary'
  if (grade.startsWith('C')) return 'warning'
  return 'danger'
}

export default function StudentPage({ onLogout }) {
  return (
    <Shell roleInfo={roleInfo} onLogout={onLogout} sidebar={<Sidebar />}>
      <div className="space-y-4">

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(({ label, value, unit, icon, from, to, glow }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-4 relative overflow-hidden hover:-translate-y-0.5 transition-transform duration-200 cursor-default"
              style={{ boxShadow: cs }}>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-base mb-3 shrink-0"
                style={{ background: `linear-gradient(135deg, ${from}, ${to})`, boxShadow: `0 4px 12px ${glow}` }}>
                {icon}
              </div>
              <p className="text-2xl font-black text-gray-900 leading-none">
                {value}<span className="text-sm font-semibold text-gray-400 ml-1">{unit}</span>
              </p>
              <p className="text-xs text-gray-500 font-medium mt-1">{label}</p>
              <div className="absolute -right-3 -bottom-3 w-14 h-14 rounded-full bg-black opacity-[0.025]" />
            </div>
          ))}
        </div>

        {/* Hero */}
        <div
          className="rounded-2xl text-white relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1a5ea3 0%, #2b70b8 45%, #3a8fd0 100%)',
            boxShadow: '0 8px 32px rgba(43,112,184,0.35), 0 2px 8px rgba(0,0,0,0.1)',
          }}>
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="absolute -top-14 -right-14 w-52 h-52 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }} />
          <div className="absolute -bottom-10 right-36 w-36 h-36 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <div className="relative flex flex-row items-center justify-between p-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3"
                style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
                🎒 Student Portal
              </div>
              <h1 className="text-2xl font-black leading-tight">สวัสดี กานต์พิชชา 👋</h1>
              <p className="mt-1.5 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                วันนี้มีเรียน 5 คาบ · การบ้านค้างส่ง 2 ชิ้น · คะแนนเฉลี่ย 3.7 GPA
              </p>
            </div>
            <div className="hidden sm:block text-right shrink-0 ml-6 p-4 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}>
              <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>วันนี้</p>
              <p className="font-black text-xl">13 พ.ค. 2026</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>จันทร์ · ภาคเรียนที่ 1</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: cs }}>
          <div className="px-6 pt-5 pb-0">
            <h2 className="text-base font-bold text-gray-900">Quick Actions</h2>
            <p className="text-xs text-gray-400 mt-0.5">ทำได้เลยในคลิกเดียว</p>
          </div>
          <div className="h-px bg-gray-100 mx-6 mt-4" />
          <div className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {QUICK.map(({ label, icon, from, to, glow }) => (
                <button
                  key={label}
                  className="h-16 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all duration-150 hover:-translate-y-0.5"
                  style={{ background: `linear-gradient(135deg, ${from}, ${to})`, boxShadow: `0 4px 14px ${glow}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 6px 22px ${glow}` }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 4px 14px ${glow}` }}>
                  <span>{icon}</span> {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Schedule + Homework */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: cs }}>
            <div className="px-6 pt-5 pb-0 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">ตารางเรียนวันนี้</h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: '#eff6ff', color: '#1e40af' }}>5 คาบ</span>
            </div>
            <div className="h-px bg-gray-100 mx-6 mt-4" />
            <div className="p-5 space-y-3">
              {STUDENT_SCHEDULE.map(({ time, subject, room }) => (
                <div key={time} className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center text-white text-[10px] font-black text-center leading-tight"
                    style={{ background: 'linear-gradient(135deg, #2b70b8, #3d8fd4)', boxShadow: '0 3px 10px rgba(43,112,184,0.3)' }}>
                    {time}
                  </div>
                  <div className="flex-1 p-3 rounded-xl" style={{ background: '#f8fafc' }}>
                    <p className="text-sm font-semibold text-gray-800">{subject}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{room}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: cs }}>
            <div className="px-6 pt-5 pb-0">
              <h2 className="text-base font-bold text-gray-900">การบ้านที่รอส่ง</h2>
            </div>
            <div className="h-px bg-gray-100 mx-6 mt-4" />
            <div className="p-5 space-y-3">
              {HOMEWORK.map(({ title, subject, due, urgent, done }) => (
                <div
                  key={title}
                  className="p-3 rounded-xl transition-all duration-150"
                  style={{
                    background: done ? '#f0fdf4' : urgent ? '#fff5f5' : '#f8fafc',
                    borderLeft: `3px solid ${done ? '#16a34a' : urgent ? '#dc2626' : '#94a3b8'}`,
                  }}>
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold ${done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                      {title}
                    </p>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-lg shrink-0"
                      style={{
                        background: done ? '#dcfce7' : urgent ? '#fee2e2' : '#f1f5f9',
                        color: done ? '#166534' : urgent ? '#c53030' : '#64748b',
                      }}>
                      {due}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{subject}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grades */}
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: cs }}>
          <div className="px-6 pt-5 pb-0 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">ผลการเรียนล่าสุด</h2>
            <button className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: '#eff6ff', color: '#1e40af' }}>
              ดูรายงานเต็ม →
            </button>
          </div>
          <div className="h-px bg-gray-100 mx-6 mt-4" />
          <div className="p-6 space-y-4">
            {GRADES.map(({ subject, score, total, grade }) => {
              const g = gradeStyle(grade)
              return (
                <div key={subject} className="flex items-center gap-4">
                  <span className="text-sm w-28 shrink-0 font-semibold text-gray-700">{subject}</span>
                  <Progress value={score} maxValue={total} color={gradeColor(grade)} size="sm" className="flex-1" aria-label={subject} />
                  <span className="text-xs text-gray-400 w-12 text-right shrink-0">{score}/{total}</span>
                  <span
                    className="text-xs font-black w-10 text-center py-1 rounded-lg shrink-0"
                    style={{ background: g.bg, color: g.text }}>
                    {grade}
                  </span>
                </div>
              )
            })}

            <div
              className="mt-2 p-4 rounded-2xl flex items-center gap-4"
              style={{
                background: 'linear-gradient(135deg, #eff6ff, #e0ecff)',
                border: '1px solid rgba(43,112,184,0.15)',
              }}>
              <div className="text-center">
                <p className="text-4xl font-black" style={{ color: '#2b70b8' }}>3.7</p>
                <p className="text-xs text-gray-400 mt-0.5 font-medium">GPA</p>
              </div>
              <div className="w-px h-12 bg-blue-200" />
              <div>
                <p className="text-sm font-bold" style={{ color: '#1e40af' }}>ผลการเรียนดีเยี่ยม</p>
                <p className="text-xs text-gray-400 mt-0.5">ภาคเรียนที่ 1 ปีการศึกษา 2569</p>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance */}
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: cs }}>
          <div className="px-6 pt-5 pb-0">
            <h2 className="text-base font-bold text-gray-900">การมาเรียน</h2>
          </div>
          <div className="h-px bg-gray-100 mx-6 mt-4" />
          <div className="p-5">
            <div className="flex gap-2 mb-4">
              {[
                { day: 'จ.', present: true },
                { day: 'อ.', present: true },
                { day: 'พ.', present: true },
                { day: 'พฤ.', present: false },
                { day: 'ศ.', present: true },
              ].map(({ day, present }) => (
                <div
                  key={day}
                  className="flex-1 rounded-xl p-3 text-center transition-all hover:-translate-y-0.5 duration-150"
                  style={{
                    background: present ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)' : 'linear-gradient(135deg, #fff5f5, #fee2e2)',
                    color: present ? '#166534' : '#c53030',
                    boxShadow: present ? '0 2px 8px rgba(22,163,74,0.12)' : '0 2px 8px rgba(220,38,38,0.12)',
                    border: `1px solid ${present ? 'rgba(22,163,74,0.15)' : 'rgba(220,38,38,0.15)'}`,
                  }}>
                  <p className="text-xs font-bold">{day}</p>
                  <p className="text-lg font-black">{present ? '✓' : 'ลา'}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { v: '18', l: 'วันที่มา', from: '#059669', to: '#10b981', glow: 'rgba(5,150,105,0.2)' },
                { v: '1', l: 'วันลา', from: '#d97706', to: '#f59e0b', glow: 'rgba(217,119,6,0.2)' },
                { v: '97%', l: 'เวลาเรียน', from: '#2b70b8', to: '#3d8fd4', glow: 'rgba(43,112,184,0.2)' },
              ].map(({ v, l, from, to, glow }) => (
                <div
                  key={l}
                  className="p-3 rounded-xl text-center"
                  style={{
                    background: `linear-gradient(135deg, ${from}10, ${to}08)`,
                    border: `1px solid ${from}18`,
                    boxShadow: `0 2px 8px ${glow}`,
                  }}>
                  <p className="text-2xl font-black" style={{ color: from }}>{v}</p>
                  <p className="text-xs text-gray-500 mt-0.5 font-medium">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </Shell>
  )
}
