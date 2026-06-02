import { useState } from 'react'
import { ROLES } from '../data'

const META = {
  teacher: { icon: '👨‍🏫', label: 'ครู',       from: '#0f6b57', to: '#1a9970' },
  student: { icon: '👨‍🎓', label: 'นักเรียน',  from: '#2b70b8', to: '#3d8fd4' },
  parent:  { icon: '👨‍👩‍👦', label: 'ผู้ปกครอง', from: '#b86e10', to: '#d9952a' },
}

export default function LoginModal({ isOpen, onLogin, onClose }) {
  const [role, setRole]         = useState('teacher')
  const [email, setEmail]       = useState(ROLES.teacher.email)
  const [password, setPassword] = useState('1234')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  if (!isOpen) return null

  function pickRole(key) {
    setRole(key)
    setEmail(ROLES[key].email)
    setError('')
  }

  async function submit() {
    setError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 350))
    setLoading(false)
    if (email === ROLES[role].email && password === '1234') {
      onLogin(role)
    } else {
      setError('Email หรือ Password ไม่ถูกต้อง')
    }
  }

  const m = META[role]

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* ── Header ── */}
        <div
          className="relative px-6 py-8 text-white text-center overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${m.from} 0%, ${m.to} 100%)` }}
        >
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full"
            style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div className="relative">
            <div
              className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-2xl font-black mb-3"
              style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              S
            </div>
            <p className="font-extrabold text-lg leading-tight">โรงเรียนสารสาสน์</p>
            <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.65)' }}>Sarasas School Portal</p>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="px-6 py-5 space-y-4">

          {/* Role selector */}
          <div>
            <p className="text-center text-xs font-bold text-gray-400 tracking-widest uppercase mb-3">
              เลือกบทบาท
            </p>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(META).map(([key, { icon, label, from, to }]) => {
                const active = role === key
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => pickRole(key)}
                    className="flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 transition-all duration-150"
                    style={active
                      ? { background: `linear-gradient(135deg, ${from}, ${to})`, borderColor: 'transparent', color: 'white', transform: 'scale(1.04)' }
                      : { background: '#f9fafb', borderColor: '#e5e7eb', color: '#6b7280' }
                    }
                  >
                    <span className="text-xl leading-none">{icon}</span>
                    <span className="text-xs font-semibold leading-none">{label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Credential hint */}
          <div
            className="rounded-xl px-3 py-2.5 text-xs leading-relaxed"
            style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' }}
          >
            💡 บัญชีทดสอบ:{' '}
            <span className="font-bold font-mono">{ROLES[role].email}</span>
            {' '}/ <span className="font-bold font-mono">1234</span>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError('') }}
              placeholder="email@example.com"
              className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm text-gray-800 outline-none transition-colors"
              style={{ fontFamily: 'inherit' }}
              onFocus={(e) => e.target.style.borderColor = m.from}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder="••••••"
              className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm text-gray-800 outline-none transition-colors"
              style={{ fontFamily: 'inherit' }}
              onFocus={(e) => e.target.style.borderColor = m.from}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl px-3 py-2.5 text-xs"
              style={{ background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' }}>
              ⚠️ {error}
            </div>
          )}

          {/* Login button */}
          <button
            type="button"
            onClick={submit}
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-bold text-sm transition-opacity"
            style={{
              background: `linear-gradient(135deg, ${m.from}, ${m.to})`,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'กำลังเข้าสู่ระบบ…' : `${m.icon} เข้าสู่ระบบ ${m.label}`}
          </button>

          {/* Cancel */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  )
}
