import { useState, useEffect } from 'react'
import { Progress, Chip, Button } from '@heroui/react'
import Shell from '../components/Shell'
import { ROLES, GRADES, PARENT_MESSAGES, BUS_STOPS, FEES } from '../data'

const roleInfo = ROLES.parent

const MENU = [
  { section: '🏠 ภาพรวม', items: ['หน้าหลัก', 'ข้อมูลบุตรหลาน', 'การแจ้งเตือน'] },
  {
    section: '📊 ผลการเรียน',
    items: ['คะแนนและเกรด', 'การมาเรียน', 'คะแนนความประพฤติ', 'รายงานผลการเรียน'],
  },
  {
    section: '💬 สื่อสาร',
    items: ['ข้อความจากครู', 'ติดต่อครู', 'ประกาศโรงเรียน'],
  },
  { section: '📅 กิจกรรม', items: ['ปฏิทินกิจกรรม', 'นัดพบครู'] },
  { section: '🚌 รถโรงเรียน', items: ['ติดตามรถสด', 'ประวัติการรับส่ง'] },
  { section: '💳 การเงิน', items: ['ค่าธรรมเนียม', 'ประวัติชำระ'] },
  { section: '👤 บัญชี', items: ['โปรไฟล์', 'ตั้งค่า'] },
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
                      ? { background: 'linear-gradient(90deg, rgba(184,110,16,0.12), rgba(217,149,42,0.04))', color: '#b86e10', borderLeft: '3px solid #b86e10', paddingLeft: '9px' }
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
  { label: 'GPA บุตรหลาน', value: '3.7', unit: '', icon: '⭐', from: '#059669', to: '#10b981', glow: 'rgba(5,150,105,0.22)' },
  { label: 'มาเรียน', value: '18', unit: '/19', icon: '📅', from: '#b86e10', to: '#d9952a', glow: 'rgba(184,110,16,0.22)' },
  { label: 'ข้อความใหม่', value: '2', unit: '', icon: '💬', from: '#2563eb', to: '#3b82f6', glow: 'rgba(37,99,235,0.22)' },
  { label: 'ค้างชำระ', value: '1', unit: 'รายการ', icon: '💳', from: '#dc2626', to: '#ef4444', glow: 'rgba(220,38,38,0.22)' },
]

const QUICK = [
  { label: 'ติดต่อครู', icon: '📞', from: '#b86e10', to: '#d9952a', glow: 'rgba(184,110,16,0.38)' },
  { label: 'ดูผลการเรียน', icon: '📊', from: '#059669', to: '#10b981', glow: 'rgba(5,150,105,0.38)' },
  { label: 'ชำระค่าธรรมเนียม', icon: '💳', from: '#dc2626', to: '#ef4444', glow: 'rgba(220,38,38,0.38)' },
  { label: 'นัดพบครู', icon: '📅', from: '#7c3aed', to: '#8b5cf6', glow: 'rgba(124,58,237,0.38)' },
]

function gradeColor(grade) {
  if (grade === 'A') return 'success'
  if (grade.startsWith('B')) return 'primary'
  if (grade.startsWith('C')) return 'warning'
  return 'danger'
}

const GRADE_STYLE = {
  A: { bg: '#f0fdf4', text: '#166534' },
  B: { bg: '#eff6ff', text: '#1e40af' },
  C: { bg: '#fffbeb', text: '#92400e' },
  D: { bg: '#fff5f5', text: '#c53030' },
}

function gradeStyle(grade) {
  if (grade === 'A') return GRADE_STYLE.A
  if (grade.startsWith('B')) return GRADE_STYLE.B
  if (grade.startsWith('C')) return GRADE_STYLE.C
  return GRADE_STYLE.D
}

function BusTracker() {
  const [eta, setEta] = useState(12)

  useEffect(() => {
    const id = setInterval(() => setEta((n) => Math.max(0, n - 1)), 60000)
    return () => clearInterval(id)
  }, [])

  const arrivalMin = (10 + eta) % 60
  const arrivalHour = arrivalMin < 10 ? 8 : 7
  const arrivalTime = `${arrivalHour}:${String(arrivalMin % 60).padStart(2, '0')}`

  return (
    <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: cs }}>
      <div className="px-6 pt-5 pb-0 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base font-bold text-gray-900">ติดตามรถโรงเรียนสด</h2>
            <Chip size="sm" color="danger" variant="flat" className="animate-pulse font-bold">● LIVE</Chip>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">รถสาย 3 · ทะเบียน 40-1234 กท · คนขับ สมชาย ใจดี</p>
        </div>
        <span className="text-xs text-gray-400 shrink-0 ml-2 mt-0.5">อัปเดต 07:09 น.</span>
      </div>
      <div className="h-px bg-gray-100 mx-6 mt-4" />
      <div className="p-5 space-y-4">
        <div
          className="rounded-2xl p-5 flex items-center justify-between text-white relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0a5c4a, #0f6b57, #1a8a6f)',
            boxShadow: '0 6px 24px rgba(15,107,87,0.3)',
          }}>
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          <div className="relative">
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>📍 จุดรับ: หน้าปากซอยสุขุมวิท 71</p>
            <p className="text-xl font-black mt-2">
              รถจะถึงใน <span className="text-yellow-300">{eta} นาที</span>
            </p>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>ประมาณ {arrivalTime} น.</p>
          </div>
          <span className="text-6xl relative">🚌</span>
        </div>

        <Progress value={40} color="success" size="sm" label="ความคืบหน้าเส้นทาง" className="mb-1" />

        <div className="space-y-2">
          {BUS_STOPS.map(({ name, time, status }) => (
            <div
              key={name}
              className="flex items-start gap-3 p-3 rounded-xl transition-colors"
              style={{
                background: status === 'mine' ? '#fffbeb' : status === 'active' ? '#f0fdf4' : status === 'done' ? '#f9fafb' : 'white',
                border: status === 'mine' ? '1.5px solid #fcd34d' : status === 'active' ? '1.5px solid #86efac' : '1px solid rgba(0,0,0,0.04)',
                opacity: status === 'done' ? 0.6 : 1,
              }}>
              <div
                className={`mt-1.5 w-3 h-3 rounded-full shrink-0 ring-2 ${
                  status === 'done' ? 'bg-green-500 ring-green-200'
                  : status === 'active' ? 'bg-amber-400 ring-amber-200'
                  : status === 'mine' ? 'bg-amber-500 ring-amber-200'
                  : 'bg-gray-300 ring-gray-100'
                }`} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${status === 'mine' ? 'text-amber-700' : 'text-gray-700'}`}>
                  {status === 'mine' ? '⭐ ' : ''}{name}{status === 'mine' ? ' (จุดรับของคุณ)' : ''}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{time}</p>
              </div>
              {status === 'done' && <Chip size="sm" variant="flat" color="default">ผ่านแล้ว</Chip>}
              {status === 'active' && <Chip size="sm" variant="flat" color="success">🚌 ใกล้แล้ว</Chip>}
              {status === 'mine' && <Chip size="sm" variant="flat" color="warning" className="font-semibold">อีก {eta} นาที</Chip>}
            </div>
          ))}
        </div>

        <div
          className="flex items-center gap-3 p-4 rounded-2xl"
          style={{ background: '#f8fafc', border: '1px solid rgba(0,0,0,0.05)' }}>
          <div
            className="w-12 h-12 rounded-full text-white flex items-center justify-center font-bold text-lg shrink-0"
            style={{ background: 'linear-gradient(135deg, #0f6b57, #1a9970)', boxShadow: '0 4px 12px rgba(15,107,87,0.3)' }}>
            ส
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800">สมชาย ใจดี</p>
            <p className="text-xs text-gray-400">คนขับ · 02-000-1111</p>
          </div>
          <Button size="sm" color="success" variant="flat">📞 โทร</Button>
          <Button size="sm" color="danger" variant="flat">⚠️ แจ้ง</Button>
        </div>
      </div>
    </div>
  )
}

export default function ParentPage({ onLogout }) {
  return (
    <Shell roleInfo={roleInfo} onLogout={onLogout} sidebar={<Sidebar />}>
      <div className="space-y-5">

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
            background: 'linear-gradient(135deg, #9a5c0a 0%, #b86e10 45%, #d9952a 100%)',
            boxShadow: '0 8px 32px rgba(184,110,16,0.35), 0 2px 8px rgba(0,0,0,0.1)',
          }}>
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="absolute -top-14 -right-14 w-52 h-52 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }} />
          <div className="absolute -bottom-10 right-36 w-36 h-36 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <div className="relative flex flex-row items-center justify-between p-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3"
                style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
                👨‍👩‍👦 Parent Portal
              </div>
              <h1 className="text-2xl font-black leading-tight">สวัสดี คุณวิไล 👋</h1>
              <p className="mt-1.5 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                กานต์พิชชา มาเรียน 18/19 วัน · GPA 3.7 · ข้อความใหม่จากครู 2 รายการ
              </p>
            </div>
            <div className="hidden sm:block text-right shrink-0 ml-6 p-4 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}>
              <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>บุตรหลาน</p>
              <p className="font-black text-xl">กานต์พิชชา</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>ป.6/1 · รหัส SR001</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: cs }}>
          <div className="px-6 pt-5 pb-0">
            <h2 className="text-base font-bold text-gray-900">Quick Actions</h2>
            <p className="text-xs text-gray-400 mt-0.5">จัดการทุกอย่างได้ในคลิกเดียว</p>
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

        {/* Attendance + Messages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: cs }}>
            <div className="px-6 pt-5 pb-0 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">การมาเรียนสัปดาห์นี้</h2>
              <button className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: '#fffbeb', color: '#b86e10' }}>
                ดูประวัติ →
              </button>
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
                      border: `1px solid ${present ? 'rgba(22,163,74,0.15)' : 'rgba(220,38,38,0.15)'}`,
                    }}>
                    <p className="text-xs font-bold">{day}</p>
                    <p className="text-lg font-black">{present ? '✓' : 'ลา'}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { v: '18', l: 'วันที่มา', color: '#059669' },
                  { v: '1', l: 'วันลา', color: '#d97706' },
                  { v: '0', l: 'ขาด', color: '#dc2626' },
                  { v: '97%', l: 'เวลาเรียน', color: '#2563eb' },
                ].map(({ v, l, color }) => (
                  <div key={l} className="p-2 rounded-xl text-center" style={{ background: `${color}0a`, border: `1px solid ${color}18` }}>
                    <p className="text-xl font-black" style={{ color }}>{v}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: cs }}>
            <div className="px-6 pt-5 pb-0 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">ข้อความจากครู</h2>
              <button className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: '#fffbeb', color: '#b86e10' }}>
                ติดต่อครู →
              </button>
            </div>
            <div className="h-px bg-gray-100 mx-6 mt-4" />
            <div className="p-5 space-y-3">
              {PARENT_MESSAGES.map(({ from, msg }) => (
                <div
                  key={from}
                  className="p-3 rounded-xl"
                  style={{
                    background: '#fffbeb',
                    borderLeft: '3px solid #d97706',
                  }}>
                  <p className="text-sm font-bold" style={{ color: '#b86e10' }}>{from}</p>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{msg}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grades */}
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: cs }}>
          <div className="px-6 pt-5 pb-0 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">ผลการเรียน · กานต์พิชชา</h2>
            <button className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: '#fffbeb', color: '#b86e10' }}>
              รายงานเต็ม →
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
                background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
                border: '1px solid rgba(184,110,16,0.15)',
              }}>
              <div className="text-center">
                <p className="text-4xl font-black" style={{ color: '#b86e10' }}>3.7</p>
                <p className="text-xs text-gray-400 mt-0.5 font-medium">GPA</p>
              </div>
              <div className="w-px h-12 bg-amber-200" />
              <div>
                <p className="text-sm font-bold" style={{ color: '#92400e' }}>ผลการเรียนดีเยี่ยม</p>
                <p className="text-xs text-gray-400 mt-0.5">ภาคเรียนที่ 1 ปีการศึกษา 2569</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fees */}
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: cs }}>
          <div className="px-6 pt-5 pb-0 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">ค่าธรรมเนียมการศึกษา</h2>
            <button className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: '#fffbeb', color: '#b86e10' }}>
              ประวัติชำระ →
            </button>
          </div>
          <div className="h-px bg-gray-100 mx-6 mt-4" />
          <div className="p-5">
            <div className="space-y-2">
              <div className="grid grid-cols-3 text-xs font-bold text-gray-400 px-3 pb-2">
                <span>รายการ</span><span>จำนวน</span><span>สถานะ</span>
              </div>
              {FEES.map(({ item, amount, status }) => (
                <div
                  key={item}
                  className="grid grid-cols-3 items-center p-3 rounded-xl text-sm transition-all hover:-translate-y-px duration-150"
                  style={{
                    background: status === 'paid' ? '#f0fdf4' : '#fff5f5',
                    border: `1px solid ${status === 'paid' ? 'rgba(22,163,74,0.1)' : 'rgba(220,38,38,0.1)'}`,
                  }}>
                  <span className="font-semibold text-gray-800">{item}</span>
                  <span className="text-gray-500 text-sm">{amount}</span>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-lg w-fit"
                    style={{
                      background: status === 'paid' ? '#dcfce7' : '#fee2e2',
                      color: status === 'paid' ? '#166534' : '#c53030',
                    }}>
                    {status === 'paid' ? 'ชำระแล้ว' : 'ค้างชำระ'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <BusTracker />

      </div>
    </Shell>
  )
}
