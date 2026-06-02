import {
  Card, CardBody, CardHeader, Chip, Button, Divider, Progress,
} from '@heroui/react'
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
    <div className="p-4 space-y-5">
      {MENU.map(({ section, items }) => (
        <div key={section}>
          <p className="text-xs font-bold text-default-400 mb-2 px-2">{section}</p>
          <ul className="space-y-0.5">
            {items.map((label) => (
              <li key={label}>
                <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-default-700 hover:bg-primary-50 hover:text-primary-700 transition-colors">
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
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
      <div className="space-y-6">
        {/* Hero */}
        <Card className="bg-gradient-to-r from-[#2b70b8] to-[#3b8bd0] text-white shadow-lg">
          <CardBody className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-blue-200 text-sm font-medium">Student Portal</p>
              <h1 className="text-2xl font-bold mt-1">สวัสดี กานต์พิชชา 👋</h1>
              <p className="text-blue-100 mt-1 text-sm leading-relaxed">
                วันนี้มีเรียน 5 คาบ · การบ้านค้างส่ง 2 ชิ้น · คะแนนเฉลี่ย 3.7 GPA
              </p>
            </div>
            <div className="hidden sm:block text-right bg-white/10 rounded-xl p-4 shrink-0 ml-4">
              <p className="text-blue-200 text-xs">วันนี้</p>
              <p className="font-bold text-lg">13 พ.ค. 2026</p>
              <p className="text-blue-100 text-xs">จันทร์ · ภาคเรียนที่ 1</p>
            </div>
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-sm">
          <CardHeader className="pb-0">
            <div>
              <h2 className="text-base font-semibold">Quick Actions</h2>
              <p className="text-xs text-default-500">ทำได้เลยในคลิกเดียว</p>
            </div>
          </CardHeader>
          <Divider className="mt-3" />
          <CardBody>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['ส่งการบ้าน', 'ดูคะแนน', 'แชทครู', 'ดูตารางสอบ'].map((label) => (
                <Button
                  key={label}
                  variant="bordered"
                  color="primary"
                  className="h-16 text-sm font-medium"
                >
                  {label}
                </Button>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Schedule + Homework */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader className="flex justify-between items-center pb-0">
              <h2 className="text-base font-semibold">ตารางเรียนวันนี้</h2>
              <Chip size="sm" color="primary" variant="flat">5 คาบ</Chip>
            </CardHeader>
            <Divider className="mt-3" />
            <CardBody>
              <div className="space-y-4">
                {STUDENT_SCHEDULE.map(({ time, subject, room }) => (
                  <div key={time} className="flex items-center gap-3">
                    <span className="text-sm font-mono text-primary-600 font-bold w-12 shrink-0">
                      {time}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{subject}</p>
                      <p className="text-xs text-default-500">{room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-0">
              <h2 className="text-base font-semibold">การบ้านที่รอส่ง</h2>
            </CardHeader>
            <Divider className="mt-3" />
            <CardBody>
              <div className="space-y-3">
                {HOMEWORK.map(({ title, subject, due, urgent, done }) => (
                  <div
                    key={title}
                    className={`p-3 rounded-xl ${done ? 'bg-success-50' : urgent ? 'bg-danger-50' : 'bg-default-50'}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-medium ${done ? 'line-through text-default-400' : ''}`}>
                        {title}
                      </p>
                      <Chip
                        size="sm"
                        color={done ? 'success' : urgent ? 'danger' : 'default'}
                        variant="flat"
                        className="shrink-0"
                      >
                        {due}
                      </Chip>
                    </div>
                    <p className="text-xs text-default-500 mt-1">{subject}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Grades with progress bars */}
        <Card className="shadow-sm">
          <CardHeader className="flex justify-between items-center pb-0">
            <h2 className="text-base font-semibold">ผลการเรียนล่าสุด</h2>
            <Button size="sm" color="primary" variant="light">ดูรายงานเต็ม →</Button>
          </CardHeader>
          <Divider className="mt-3" />
          <CardBody>
            <div className="space-y-4">
              {GRADES.map(({ subject, score, total, grade }) => (
                <div key={subject} className="flex items-center gap-4">
                  <span className="text-sm w-28 shrink-0 font-medium">{subject}</span>
                  <Progress
                    value={score}
                    maxValue={total}
                    color={gradeColor(grade)}
                    size="sm"
                    className="flex-1"
                    aria-label={subject}
                  />
                  <span className="text-xs text-default-500 w-14 text-right shrink-0">
                    {score}/{total}
                  </span>
                  <Chip size="sm" color={gradeColor(grade)} variant="flat" className="shrink-0 w-12 justify-center">
                    {grade}
                  </Chip>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-primary-50 rounded-xl flex items-center gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">3.7</p>
                <p className="text-xs text-default-500 mt-0.5">GPA</p>
              </div>
              <Divider orientation="vertical" className="h-10" />
              <div>
                <p className="text-sm font-semibold text-primary">ผลการเรียนดีเยี่ยม</p>
                <p className="text-xs text-default-500 mt-0.5">ภาคเรียนที่ 1 ปีการศึกษา 2569</p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Attendance summary */}
        <Card className="shadow-sm">
          <CardHeader className="pb-0">
            <h2 className="text-base font-semibold">การมาเรียน</h2>
          </CardHeader>
          <Divider className="mt-3" />
          <CardBody>
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
                  className={`flex-1 rounded-xl p-3 text-center ${present ? 'bg-success-50 text-success-700' : 'bg-danger-50 text-danger-700'}`}
                >
                  <p className="text-xs font-semibold">{day}</p>
                  <p className="text-lg font-bold">{present ? '✓' : 'ลา'}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { v: '18', l: 'วันที่มา', color: 'text-success-600' },
                { v: '1', l: 'วันลา', color: 'text-warning-600' },
                { v: '97%', l: 'เวลาเรียน', color: 'text-primary-600' },
              ].map(({ v, l, color }) => (
                <div key={l} className="p-3 bg-default-50 rounded-xl">
                  <p className={`text-2xl font-bold ${color}`}>{v}</p>
                  <p className="text-xs text-default-500 mt-0.5">{l}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </Shell>
  )
}
