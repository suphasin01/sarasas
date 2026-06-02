import { useState } from 'react'
import { Modal, ModalContent, Input, Button } from '@heroui/react'
import { ROLES } from '../data'

const META = {
  teacher: { icon: '👨‍🏫', from: '#0f6b57', to: '#1a9970', hint: '#dcfce7', hintText: '#166534' },
  student: { icon: '👨‍🎓', from: '#2b70b8', to: '#3d8fd4', hint: '#dbeafe', hintText: '#1e40af' },
  parent:  { icon: '👨‍👩‍👦', from: '#b86e10', to: '#d9952a', hint: '#fef3c7', hintText: '#92400e' },
}

export default function LoginModal({ isOpen, onLogin, onClose }) {
  const [role, setRole]         = useState('teacher')
  const [email, setEmail]       = useState(ROLES.teacher.email)
  const [password, setPassword] = useState('1234')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  function pickRole(key) {
    setRole(key)
    setEmail(ROLES[key].email)
    setError('')
  }

  async function submit() {
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      size="sm"
      isDismissable={false}
      hideCloseButton
      classNames={{ base: 'rounded-2xl overflow-hidden', wrapper: 'p-4 items-center' }}
      scrollBehavior="inside"
    >
      <ModalContent>

        {/* ── Header ── */}
        <div
          className="px-6 py-7 text-white text-center relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${m.from}, ${m.to})` }}
        >
          <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-white/10 pointer-events-none" />
          <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 mx-auto flex items-center justify-center text-2xl font-black mb-3">
            S
          </div>
          <p className="font-extrabold text-lg">โรงเรียนสารสาสน์</p>
          <p className="text-white/65 text-sm">Sarasas School Portal</p>
        </div>

        {/* ── Body ── */}
        <div className="px-5 py-5 space-y-4">

          {/* Role selector */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase text-center mb-2">
              เลือกบทบาท
            </p>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(ROLES).map(([key, { label }]) => {
                const mk = META[key]
                const active = role === key
                return (
                  <button
                    key={key}
                    onClick={() => pickRole(key)}
                    className="flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition-all duration-200"
                    style={
                      active
                        ? { background: `linear-gradient(135deg, ${mk.from}, ${mk.to})`, borderColor: 'transparent', color: 'white', transform: 'scale(1.04)' }
                        : { background: '#f9fafb', borderColor: '#e5e7eb', color: '#6b7280' }
                    }
                  >
                    <span className="text-xl leading-none">{mk.icon}</span>
                    <span className="text-[11px] font-semibold">{label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Credential hint */}
          <div
            className="text-xs rounded-xl px-3 py-2.5 leading-relaxed"
            style={{ background: m.hint, color: m.hintText }}
          >
            💡 บัญชีทดสอบ: <span className="font-bold font-mono">{ROLES[role].email}</span>
            {' '}/ <span className="font-bold font-mono">1234</span>
          </div>

          {/* Inputs */}
          <Input
            label="Email"
            type="email"
            value={email}
            onValueChange={(v) => { setEmail(v); setError('') }}
            variant="bordered"
            labelPlacement="outside"
            placeholder="email@example.com"
            classNames={{ label: 'text-xs font-semibold', inputWrapper: 'rounded-xl' }}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onValueChange={(v) => { setPassword(v); setError('') }}
            variant="bordered"
            labelPlacement="outside"
            placeholder="••••••"
            classNames={{ label: 'text-xs font-semibold', inputWrapper: 'rounded-xl' }}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
          />

          {error && (
            <p className="text-red-500 text-xs bg-red-50 rounded-xl px-3 py-2">⚠️ {error}</p>
          )}

          {/* Buttons */}
          <button
            onClick={submit}
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-bold text-sm transition-opacity disabled:opacity-70"
            style={{ background: `linear-gradient(135deg, ${m.from}, ${m.to})` }}
          >
            {loading ? 'กำลังเข้าสู่ระบบ…' : `${m.icon} เข้าสู่ระบบ ${ROLES[role].label}`}
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl text-gray-400 text-sm hover:bg-gray-50 transition-colors"
          >
            ยกเลิก
          </button>
        </div>

      </ModalContent>
    </Modal>
  )
}
