import { useState } from 'react'
import { Modal, ModalContent, Button, Input } from '@heroui/react'
import { ROLES } from '../data'

const ROLE_META = {
  teacher: {
    icon: '👨‍🏫',
    gradient: 'from-[#0f6b57] to-[#22a07a]',
    ring: 'ring-[#0f6b57]',
    bg: 'bg-[#0f6b57]',
    light: 'bg-green-50 text-green-700',
  },
  student: {
    icon: '👨‍🎓',
    gradient: 'from-[#2b70b8] to-[#4a9fd4]',
    ring: 'ring-[#2b70b8]',
    bg: 'bg-[#2b70b8]',
    light: 'bg-blue-50 text-blue-700',
  },
  parent: {
    icon: '👨‍👩‍👦',
    gradient: 'from-[#c97d1a] to-[#e8a83c]',
    ring: 'ring-[#c97d1a]',
    bg: 'bg-[#c97d1a]',
    light: 'bg-amber-50 text-amber-700',
  },
}

export default function LoginModal({ isOpen, onLogin, onClose }) {
  const [selectedRole, setSelectedRole] = useState('teacher')
  const [email, setEmail] = useState(ROLES.teacher.email)
  const [password, setPassword] = useState('1234')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleRoleChange(key) {
    setSelectedRole(key)
    setEmail(ROLES[key].email)
    setError('')
  }

  async function handleSubmit() {
    const cfg = ROLES[selectedRole]
    setLoading(true)
    await new Promise((r) => setTimeout(r, 400))
    setLoading(false)
    if (email === cfg.email && password === '1234') {
      onLogin(selectedRole)
      setError('')
    } else {
      setError('Email หรือ Password ไม่ถูกต้อง')
    }
  }

  const meta = ROLE_META[selectedRole]

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      size="md"
      isDismissable={false}
      hideCloseButton
      classNames={{
        base: 'rounded-3xl overflow-hidden shadow-2xl',
        wrapper: 'p-4',
      }}
    >
      <ModalContent>
        {/* ── Gradient header ── */}
        <div className={`relative overflow-hidden bg-gradient-to-br ${meta.gradient} px-6 py-8 text-white text-center`}>
          {/* Decorative circles */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full" />

          <div className="relative">
            <div className="w-16 h-16 bg-white/20 border border-white/30 rounded-2xl mx-auto flex items-center justify-center text-3xl font-black mb-4 backdrop-blur-sm shadow-lg">
              S
            </div>
            <p className="font-extrabold text-lg tracking-wide">โรงเรียนสารสาสน์</p>
            <p className="text-white/70 text-sm font-medium mt-0.5">Sarasas School Portal</p>
          </div>
        </div>

        {/* ── Role selector ── */}
        <div className="px-6 pt-5 pb-1">
          <p className="text-[11px] font-bold text-default-400 tracking-widest uppercase text-center mb-3">
            เลือกบทบาทของคุณ
          </p>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(ROLES).map(([key, { label }]) => {
              const m = ROLE_META[key]
              const active = selectedRole === key
              return (
                <button
                  key={key}
                  onClick={() => handleRoleChange(key)}
                  className={`
                    flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl
                    border-2 transition-all duration-200 font-semibold
                    ${active
                      ? `bg-gradient-to-br ${m.gradient} text-white border-transparent shadow-lg scale-105`
                      : 'bg-default-50 text-default-500 border-default-200 hover:border-default-300 hover:bg-default-100'
                    }
                  `}
                >
                  <span className="text-2xl leading-none">{m.icon}</span>
                  <span className="text-[11px]">{label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Form ── */}
        <div className="px-6 pt-4 pb-1 space-y-4">
          {/* Credential hint */}
          <div className={`flex items-start gap-2 rounded-xl px-3 py-2.5 text-xs ${meta.light}`}>
            <span className="mt-0.5 shrink-0">💡</span>
            <span>
              บัญชีทดสอบ:{' '}
              <span className="font-bold font-mono">{ROLES[selectedRole].email}</span>
              {' '}/ <span className="font-bold font-mono">1234</span>
            </span>
          </div>

          <Input
            label="Email"
            type="email"
            value={email}
            onValueChange={(v) => { setEmail(v); setError('') }}
            variant="bordered"
            labelPlacement="outside"
            placeholder="email@example.com"
            classNames={{
              label: 'text-xs font-semibold text-default-600',
              input: 'text-sm',
              inputWrapper: 'rounded-xl',
            }}
            startContent={<span className="text-default-400 text-sm">✉️</span>}
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onValueChange={(v) => { setPassword(v); setError('') }}
            variant="bordered"
            labelPlacement="outside"
            placeholder="••••••"
            classNames={{
              label: 'text-xs font-semibold text-default-600',
              input: 'text-sm',
              inputWrapper: 'rounded-xl',
            }}
            startContent={<span className="text-default-400 text-sm">🔒</span>}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />

          {error && (
            <div className="flex items-center gap-2 text-danger text-xs bg-danger-50 rounded-xl px-3 py-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* ── Actions ── */}
        <div className="px-6 pb-6 pt-4 space-y-2.5">
          <Button
            fullWidth
            size="lg"
            isLoading={loading}
            className={`bg-gradient-to-r ${meta.gradient} text-white font-bold text-sm rounded-xl shadow-md`}
            onPress={handleSubmit}
          >
            {!loading && <span className="mr-1">{meta.icon}</span>}
            เข้าสู่ระบบ {ROLES[selectedRole].label}
          </Button>
          <Button
            fullWidth
            variant="light"
            size="sm"
            color="default"
            className="rounded-xl text-default-400"
            onPress={onClose}
          >
            ยกเลิก
          </Button>
        </div>
      </ModalContent>
    </Modal>
  )
}
