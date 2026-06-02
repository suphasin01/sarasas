import { useState } from 'react'
import LoginModal from './components/LoginModal'
import PublicPage from './pages/PublicPage'
import TeacherPage from './pages/TeacherPage'
import StudentPage from './pages/StudentPage'
import ParentPage from './pages/ParentPage'

export default function App() {
  const [role, setRole] = useState(null)
  const [loginOpen, setLoginOpen] = useState(true)

  function handleLogin(r) {
    setRole(r)
    setLoginOpen(false)
  }

  function handleLogout() {
    setRole(null)
    setLoginOpen(true)
  }

  return (
    <>
      {!role && <PublicPage onLoginClick={() => setLoginOpen(true)} />}
      {role === 'teacher' && <TeacherPage onLogout={handleLogout} />}
      {role === 'student' && <StudentPage onLogout={handleLogout} />}
      {role === 'parent' && <ParentPage onLogout={handleLogout} />}
      <LoginModal
        isOpen={loginOpen}
        onLogin={handleLogin}
        onClose={() => setLoginOpen(false)}
      />
    </>
  )
}
