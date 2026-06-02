import {
  Card, CardBody, CardHeader, Chip, Button, Divider,
} from '@heroui/react'
import Shell from '../components/Shell'
import { ROLES, TEACHER_SCHEDULE, TEACHER_TASKS } from '../data'

const roleInfo = ROLES.teacher

const MENU = [
  {
    section: '🏠 Dashboard',
    items: ['ภาพรวมวันนี้', 'ตารางสอนวันนี้', 'แจ้งเตือน', 'งานที่ต้องตรวจ', 'ข่าวสารโรงเรียน'],
  },
  {
    section: '📚 การสอน',
    items: ['จัดตารางสอน', 'จัดการรายวิชา', 'แผนการสอน', 'ห้องเรียนออนไลน์', 'เอกสารประกอบการสอน'],
  },
  {
    section: '👨‍🎓 นักเรียน',
    items: ['รายชื่อนักเรียน', 'เช็กชื่อเข้าเรียน', 'พฤติกรรมนักเรียน', 'ติดต่อผู้ปกครอง'],
  },
  {
    section: '📝 งานและการประเมิน',
    items: ['สั่งการบ้าน', 'ตรวจงาน', 'สร้างข้อสอบ', 'ระบบเกรด', 'ส่งผลการเรียน'],
  },
  {
    section: '💬 การสื่อสาร',
    items: ['ประกาศในห้องเรียน', 'แชทกับนักเรียน', 'แชทผู้ปกครอง', 'ส่งข้อความกลุ่ม'],
  },
  {
    section: '📊 รายงาน',
    items: ['สถิติการเข้าเรียน', 'คะแนนเฉลี่ย', 'ผลการเรียนรายห้อง', 'Export PDF / Excel'],
  },
  {
    section: '⚙️ ตั้งค่า',
    items: ['โปรไฟล์', 'เปลี่ยนรหัสผ่าน', 'การแจ้งเตือน'],
  },
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
                <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-default-700 hover:bg-success-50 hover:text-success-700 transition-colors">
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

export default function TeacherPage({ onLogout }) {
  return (
    <Shell roleInfo={roleInfo} onLogout={onLogout} sidebar={<Sidebar />}>
      <div className="space-y-6">
        {/* Hero */}
        <Card className="bg-gradient-to-r from-[#0f6b57] to-[#1a8a6f] text-white shadow-lg">
          <CardBody className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-green-200 text-sm font-medium">Teacher Panel</p>
              <h1 className="text-2xl font-bold mt-1">หน้าหลักสำหรับคุณครู</h1>
              <p className="text-green-100 mt-1 text-sm leading-relaxed">
                จัดตารางสอน เช็กชื่อ ตรวจงาน ส่งประกาศ และดูแจ้งเตือนสำคัญได้จากหน้าเดียว
              </p>
            </div>
            <div className="hidden sm:block text-right bg-white/10 backdrop-blur-sm rounded-xl p-4 shrink-0 ml-4">
              <p className="text-green-200 text-xs">วันนี้</p>
              <p className="font-bold text-lg">13 พ.ค. 2026</p>
              <p className="text-green-100 text-xs">มีสอน 4 คาบ / งานรอตรวจ 18 ชิ้น</p>
            </div>
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-sm">
          <CardHeader className="pb-0">
            <div>
              <h2 className="text-base font-semibold">Quick Actions</h2>
              <p className="text-xs text-default-500">ลดจำนวนคลิกสำหรับงานที่ใช้บ่อย</p>
            </div>
          </CardHeader>
          <Divider className="mt-3" />
          <CardBody>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['เช็กชื่อด่วน', 'เพิ่มการบ้าน', 'เพิ่มคะแนน', 'ส่งประกาศ'].map((label) => (
                <Button
                  key={label}
                  variant="bordered"
                  color="success"
                  className="h-16 text-sm font-medium"
                >
                  {label}
                </Button>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Schedule + Notifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader className="flex justify-between items-center pb-0">
              <h2 className="text-base font-semibold">ตารางสอนวันนี้</h2>
              <Chip size="sm" color="success" variant="flat">4 คาบ</Chip>
            </CardHeader>
            <Divider className="mt-3" />
            <CardBody>
              <div className="space-y-4">
                {TEACHER_SCHEDULE.map(({ time, subject, room }) => (
                  <div key={time} className="flex items-center gap-3">
                    <span className="text-sm font-mono text-success-600 font-bold w-12 shrink-0">
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
              <h2 className="text-base font-semibold">Notification Center</h2>
            </CardHeader>
            <Divider className="mt-3" />
            <CardBody>
              <div className="space-y-3">
                {[
                  { title: 'นักเรียนขาดเรียน', desc: 'ป.6/1 ขาด 2 คนในคาบเช้า', color: 'danger' },
                  { title: 'งานยังไม่ตรวจ', desc: 'แบบฝึกหัดบทที่ 4 เหลือ 18 ชิ้น', color: 'warning' },
                  { title: 'ผู้ปกครองส่งข้อความ', desc: 'มีข้อความใหม่ 3 รายการ', color: 'primary' },
                  { title: 'ใกล้วันสอบ', desc: 'สอบกลางภาคอีก 9 วัน', color: 'secondary' },
                ].map(({ title, desc, color }) => (
                  <div key={title} className="flex items-start gap-3 p-2 rounded-lg hover:bg-default-50">
                    <Chip size="sm" color={color} variant="flat" className="shrink-0 mt-0.5">
                      {title}
                    </Chip>
                    <p className="text-xs text-default-500 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Tasks */}
        <Card className="shadow-sm">
          <CardHeader className="flex justify-between items-center pb-0">
            <h2 className="text-base font-semibold">งานและการประเมิน</h2>
            <Button size="sm" color="success" variant="light">ตรวจงาน →</Button>
          </CardHeader>
          <Divider className="mt-3" />
          <CardBody>
            <div className="space-y-2">
              <div className="grid grid-cols-3 text-xs font-semibold text-default-400 px-3 pb-1">
                <span>รายการ</span><span>ห้อง</span><span>สถานะ</span>
              </div>
              {TEACHER_TASKS.map(({ task, room, status, urgent }) => (
                <div
                  key={task}
                  className="grid grid-cols-3 items-center p-3 rounded-xl bg-default-50 hover:bg-default-100 transition-colors text-sm"
                >
                  <span className="font-medium">{task}</span>
                  <span className="text-default-600 text-xs">{room}</span>
                  <Chip size="sm" color={urgent ? 'danger' : 'success'} variant="flat">
                    {status}
                  </Chip>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Weekly schedule builder */}
        <Card className="shadow-sm">
          <CardHeader className="pb-0">
            <h2 className="text-base font-semibold">จัดตารางสอนของฉัน</h2>
          </CardHeader>
          <Divider className="mt-3" />
          <CardBody>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { day: 'จันทร์', subj: 'คณิต ป.6/1', time: '08:30 - 09:20' },
                { day: 'อังคาร', subj: 'Math G7', time: '10:20 - 11:10' },
                { day: 'พุธ', subj: 'แผนการสอน', time: '13:00 - 14:00' },
                { day: 'พฤหัส', subj: 'ห้องเรียนออนไลน์', time: '14:15 - 15:00' },
                { day: 'ศุกร์', subj: 'สรุปคะแนน', time: '15:00 - 15:40' },
              ].map(({ day, subj, time }) => (
                <div key={day} className="rounded-xl bg-success-50 p-3 text-center">
                  <p className="text-xs text-success-600 font-semibold mb-1">{day}</p>
                  <p className="text-sm font-bold text-success-800">{subj}</p>
                  <p className="text-xs text-success-600 mt-1">{time}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* AI Features */}
        <Card className="shadow-sm border-l-4 border-l-primary">
          <CardHeader className="pb-0">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold">AI Features</h2>
              <Chip size="sm" variant="flat" color="primary">ตัวช่วยสมัยใหม่</Chip>
            </div>
          </CardHeader>
          <Divider className="mt-3" />
          <CardBody>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                'AI ช่วยสร้างข้อสอบ',
                'AI สรุปผลการเรียน',
                'AI วิเคราะห์นักเรียนเสี่ยงตก',
                'AI ช่วยเขียนแผนการสอน',
              ].map((f) => (
                <div
                  key={f}
                  className="p-3 rounded-xl bg-primary-50 text-primary-700 text-sm font-medium text-center hover:bg-primary-100 cursor-pointer transition-colors"
                >
                  {f}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </Shell>
  )
}
