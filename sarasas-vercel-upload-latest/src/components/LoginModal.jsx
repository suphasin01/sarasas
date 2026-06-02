import { useState } from 'react'
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, Input, Tab, Tabs,
} from '@heroui/react'
import { ROLES } from '../data'

export default function LoginModal({ isOpen, onLogin, onClose }) {
  const [selectedRole, setSelectedRole] = useState('teacher')
  const [email, setEmail] = useState(ROLES.teacher.email)
  const [password, setPassword] = useState('1234')
  const [error, setError] = useState('')

  function handleRoleChange(key) {
    setSelectedRole(key)
    setEmail(ROLES[key].email)
    setError('')
  }

  function handleSubmit() {
    const cfg = ROLES[selectedRole]
    if (email === cfg.email && password === '1234') {
      onLogin(selectedRole)
      setError('')
    } else {
      setError('Email หรือ Password ไม่ถูกต้อง ลองใช้บัญชีตัวอย่างด้านบน')
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      size="md"
      isDismissable={false}
      hideCloseButton={false}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 pb-0">
          <span className="text-xl font-bold">เข้าสู่ระบบ</span>
          <span className="text-sm text-default-500 font-normal">โรงเรียนสารสาสน์ School Portal</span>
        </ModalHeader>
        <ModalBody className="gap-4 pt-4">
          <Tabs
            selectedKey={selectedRole}
            onSelectionChange={handleRoleChange}
            fullWidth
            color="success"
            variant="bordered"
            aria-label="เลือกบทบาท"
          >
            <Tab key="teacher" title="👨‍🏫 ครู" />
            <Tab key="student" title="👨‍🎓 นักเรียน" />
            <Tab key="parent" title="👨‍👩‍👦 ผู้ปกครอง" />
          </Tabs>

          <div className="text-sm text-default-600 bg-default-100 rounded-xl p-3 leading-relaxed">
            บัญชีตัวอย่าง:{' '}
            <code className="text-success-600 font-semibold bg-success-50 px-1 rounded">
              {ROLES[selectedRole].email}
            </code>
            {' '}/ <code className="font-semibold">1234</code>
          </div>

          <Input
            label="Email"
            type="email"
            value={email}
            onValueChange={(v) => { setEmail(v); setError('') }}
            variant="bordered"
            labelPlacement="outside"
            placeholder="กรอก email"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onValueChange={(v) => { setPassword(v); setError('') }}
            variant="bordered"
            labelPlacement="outside"
            placeholder="กรอก password"
            onKeyDown={handleKeyDown}
          />

          {error && (
            <p className="text-danger text-sm px-1">{error}</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>ยกเลิก</Button>
          <Button color="success" onPress={handleSubmit} className="text-white font-semibold">
            เข้าสู่ระบบ {ROLES[selectedRole].label}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
