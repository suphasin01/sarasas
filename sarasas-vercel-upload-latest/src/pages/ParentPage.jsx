import { useState, useEffect } from 'react'
import {
  Card, CardBody, CardHeader, Chip, Button, Divider, Progress,
} from '@heroui/react'
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
      {MENU.map(({ section, items }) => (
        <div key={section}>
          <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase px-2 mb-1.5">{section}</p>
          <ul className="space-y-0.5">
            {items.map((label) => (
              <li key={label}>
                <button className="w-full text-left px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors font-medium">
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
    <Card className="shadow-sm">
      <CardHeader className="flex items-start justify-between pb-0">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base font-semibold">ติดตามรถโรงเรียนสด</h2>
            <Chip
              size="sm"
              color="danger"
              variant="flat"
              className="animate-pulse font-bold"
            >
              ● LIVE
            </Chip>
          </div>
          <p className="text-xs text-default-500 mt-0.5">
            รถสาย 3 · ทะเบียน 40-1234 กท · คนขับ สมชาย ใจดี
          </p>
        </div>
        <span className="text-xs text-default-400 shrink-0 ml-2">อัปเดต 07:09 น.</span>
      </CardHeader>
      <Divider className="mt-3" />
      <CardBody className="space-y-4">
        {/* ETA Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-[#0f6b57] to-[#1a8a6f] text-white p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-green-200">📍 จุดรับ: หน้าปากซอยสุขุมวิท 71</p>
            <p className="text-xl font-bold mt-2">
              รถจะถึงใน{' '}
              <span className="text-yellow-300">{eta} นาที</span>
            </p>
            <p className="text-green-200 text-sm mt-1">ประมาณ {arrivalTime} น.</p>
          </div>
          <span className="text-6xl">🚌</span>
        </div>

        {/* Progress bar */}
        <div>
          <Progress
            value={40}
            color="success"
            size="sm"
            label="ความคืบหน้าเส้นทาง"
            className="mb-3"
          />
        </div>

        {/* Route stops */}
        <div className="space-y-2">
          {BUS_STOPS.map(({ name, time, status }) => (
            <div
              key={name}
              className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                status === 'mine'
                  ? 'bg-amber-50 border-2 border-amber-200'
                  : status === 'active'
                  ? 'bg-green-50 border border-green-200'
                  : status === 'done'
                  ? 'opacity-60'
                  : ''
              }`}
            >
              <div
                className={`mt-1.5 w-3 h-3 rounded-full shrink-0 ring-2 ${
                  status === 'done'
                    ? 'bg-success-500 ring-success-200'
                    : status === 'active'
                    ? 'bg-warning-500 ring-warning-200 animate-ping-slow'
                    : status === 'mine'
                    ? 'bg-amber-500 ring-amber-200'
                    : 'bg-default-300 ring-default-100'
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${status === 'mine' ? 'text-amber-700' : ''}`}>
                  {status === 'mine' ? '⭐ ' : ''}
                  {name}
                  {status === 'mine' ? ' (จุดรับของคุณ)' : ''}
                </p>
                <p className="text-xs text-default-500 mt-0.5">{time}</p>
              </div>
              {status === 'done' && (
                <Chip size="sm" variant="flat" color="default">ผ่านแล้ว</Chip>
              )}
              {status === 'active' && (
                <Chip size="sm" variant="flat" color="success">🚌 ใกล้แล้ว</Chip>
              )}
              {status === 'mine' && (
                <Chip size="sm" variant="flat" color="warning" className="font-semibold">
                  อีก {eta} นาที
                </Chip>
              )}
            </div>
          ))}
        </div>

        {/* Driver info */}
        <div className="flex items-center gap-3 p-4 bg-default-50 rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-[#0f6b57] text-white flex items-center justify-center font-bold text-lg shrink-0">
            ส
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">สมชาย ใจดี</p>
            <p className="text-xs text-default-500">คนขับ · 02-000-1111</p>
          </div>
          <Button size="sm" color="success" variant="flat">📞 โทร</Button>
          <Button size="sm" color="danger" variant="flat">⚠️ แจ้ง</Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default function ParentPage({ onLogout }) {
  return (
    <Shell roleInfo={roleInfo} onLogout={onLogout} sidebar={<Sidebar />}>
      <div className="space-y-6">
        {/* Hero */}
        <Card className="bg-gradient-to-r from-[#d7952a] to-[#e8a83c] text-white shadow-lg">
          <CardBody className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-amber-100 text-sm font-medium">Parent Portal</p>
              <h1 className="text-2xl font-bold mt-1">สวัสดี คุณวิไล 👋</h1>
              <p className="text-amber-100 mt-1 text-sm leading-relaxed">
                กานต์พิชชา มาเรียน 18/19 วัน · GPA 3.7 · ข้อความใหม่จากครู 2 รายการ
              </p>
            </div>
            <div className="hidden sm:block text-right bg-white/10 rounded-xl p-4 shrink-0 ml-4">
              <p className="text-amber-100 text-xs">บุตรหลาน</p>
              <p className="font-bold text-lg">กานต์พิชชา</p>
              <p className="text-amber-100 text-xs">ป.6/1 · รหัส SR001</p>
            </div>
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-sm">
          <CardHeader className="pb-0">
            <h2 className="text-base font-semibold">Quick Actions</h2>
          </CardHeader>
          <Divider className="mt-3" />
          <CardBody>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['ติดต่อครู', 'ดูผลการเรียน', 'ชำระค่าธรรมเนียม', 'นัดพบครู'].map((label) => (
                <Button
                  key={label}
                  variant="bordered"
                  color="warning"
                  className="h-16 text-sm font-medium"
                >
                  {label}
                </Button>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Attendance + Messages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader className="flex justify-between items-center pb-0">
              <h2 className="text-base font-semibold">การมาเรียนสัปดาห์นี้</h2>
              <Button size="sm" color="warning" variant="light">ดูประวัติ →</Button>
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
                    className={`flex-1 rounded-xl p-3 text-center ${
                      present ? 'bg-success-50 text-success-700' : 'bg-danger-50 text-danger-700'
                    }`}
                  >
                    <p className="text-xs font-semibold">{day}</p>
                    <p className="text-lg font-bold">{present ? '✓' : 'ลา'}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { v: '18', l: 'วันที่มา', c: 'text-success-600' },
                  { v: '1', l: 'วันลา', c: 'text-warning-600' },
                  { v: '0', l: 'ขาด', c: 'text-danger-600' },
                  { v: '97%', l: 'เวลาเรียน', c: 'text-primary-600' },
                ].map(({ v, l, c }) => (
                  <div key={l} className="p-2 bg-default-50 rounded-xl">
                    <p className={`text-xl font-bold ${c}`}>{v}</p>
                    <p className="text-xs text-default-500">{l}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex justify-between items-center pb-0">
              <h2 className="text-base font-semibold">ข้อความจากครู</h2>
              <Button size="sm" color="warning" variant="light">ติดต่อครู →</Button>
            </CardHeader>
            <Divider className="mt-3" />
            <CardBody>
              <div className="space-y-3">
                {PARENT_MESSAGES.map(({ from, msg }) => (
                  <div key={from} className="p-3 bg-default-50 rounded-xl">
                    <p className="text-sm font-semibold text-warning-700">{from}</p>
                    <p className="text-sm text-default-600 mt-1 leading-relaxed">{msg}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Grades */}
        <Card className="shadow-sm">
          <CardHeader className="flex justify-between items-center pb-0">
            <h2 className="text-base font-semibold">ผลการเรียน · กานต์พิชชา</h2>
            <Button size="sm" color="warning" variant="light">รายงานเต็ม →</Button>
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
              <div className="mt-4 p-4 bg-warning-50 rounded-xl flex items-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-warning-600">3.7</p>
                  <p className="text-xs text-default-500 mt-0.5">GPA</p>
                </div>
                <Divider orientation="vertical" className="h-10" />
                <div>
                  <p className="text-sm font-semibold text-warning-700">ผลการเรียนดีเยี่ยม</p>
                  <p className="text-xs text-default-500 mt-0.5">ภาคเรียนที่ 1 ปีการศึกษา 2569</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Fees */}
        <Card className="shadow-sm">
          <CardHeader className="flex justify-between items-center pb-0">
            <h2 className="text-base font-semibold">ค่าธรรมเนียมการศึกษา</h2>
            <Button size="sm" color="warning" variant="light">ประวัติชำระ →</Button>
          </CardHeader>
          <Divider className="mt-3" />
          <CardBody>
            <div className="space-y-2">
              <div className="grid grid-cols-3 text-xs font-semibold text-default-400 px-3 pb-1">
                <span>รายการ</span><span>จำนวน</span><span>สถานะ</span>
              </div>
              {FEES.map(({ item, amount, status }) => (
                <div
                  key={item}
                  className="grid grid-cols-3 items-center p-3 rounded-xl bg-default-50 text-sm"
                >
                  <span className="font-medium">{item}</span>
                  <span className="text-default-600">{amount}</span>
                  <Chip
                    size="sm"
                    color={status === 'paid' ? 'success' : 'danger'}
                    variant="flat"
                  >
                    {status === 'paid' ? 'ชำระแล้ว' : 'ค้างชำระ'}
                  </Chip>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Bus Tracker */}
        <BusTracker />
      </div>
    </Shell>
  )
}
