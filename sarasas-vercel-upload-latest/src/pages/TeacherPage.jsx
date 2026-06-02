import Shell from '../components/Shell'
import { ROLES, TEACHER_SCHEDULE, TEACHER_TASKS } from '../data'
import { useLang } from '../context/LanguageContext'
import { t } from '../i18n'

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
                      ? { background: 'linear-gradient(90deg, rgba(15,107,87,0.12), rgba(26,153,112,0.04))', color: '#0f6b57', borderLeft: '3px solid #0f6b57', paddingLeft: '9px' }
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

const NOTIF_COLORS = { danger: '#dc2626', warning: '#d97706', primary: '#2563eb', secondary: '#7c3aed' }

export default function TeacherPage({ onLogout }) {
  const { lang } = useLang()

  const STATS = [
    { label: t('statStudents', lang), value: '142', unit: lang === 'th' ? 'คน' : 'students', icon: '👥', from: '#0f6b57', to: '#1a9970', glow: 'rgba(15,107,87,0.22)' },
    { label: t('statPeriods', lang), value: '4', unit: lang === 'th' ? 'คาบ' : 'periods', icon: '📚', from: '#2563eb', to: '#3b82f6', glow: 'rgba(37,99,235,0.22)' },
    { label: t('statPending', lang), value: '18', unit: lang === 'th' ? 'ชิ้น' : 'items', icon: '📋', from: '#d97706', to: '#f59e0b', glow: 'rgba(217,119,6,0.22)' },
    { label: t('statAvgGPA', lang), value: '3.4', unit: 'GPA', icon: '🏆', from: '#7c3aed', to: '#8b5cf6', glow: 'rgba(124,58,237,0.22)' },
  ]

  const QUICK = [
    { label: t('quickAttendance', lang), icon: '✅', from: '#0f6b57', to: '#1a9970', glow: 'rgba(15,107,87,0.38)' },
    { label: t('quickHomework', lang), icon: '📝', from: '#2563eb', to: '#3b82f6', glow: 'rgba(37,99,235,0.38)' },
    { label: t('quickScore', lang), icon: '⭐', from: '#7c3aed', to: '#8b5cf6', glow: 'rgba(124,58,237,0.38)' },
    { label: t('quickAnnounce', lang), icon: '📢', from: '#d97706', to: '#f59e0b', glow: 'rgba(217,119,6,0.38)' },
  ]

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
            background: 'linear-gradient(135deg, #0a5c4a 0%, #0f6b57 45%, #1a8a6f 100%)',
            boxShadow: '0 8px 32px rgba(15,107,87,0.35), 0 2px 8px rgba(0,0,0,0.1)',
          }}>
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="absolute -top-14 -right-14 w-52 h-52 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }} />
          <div className="absolute -bottom-10 right-36 w-36 h-36 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <div className="relative flex flex-row items-center justify-between p-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3"
                style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
                🟢 Teacher Panel
              </div>
              <h1 className="text-2xl font-black leading-tight">{t('teacherHeroTitle', lang)}</h1>
              <p className="mt-1.5 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {t('teacherHeroDesc', lang)}
              </p>
            </div>
            <div className="hidden sm:block text-right shrink-0 ml-6 p-4 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}>
              <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>{t('todayLabel', lang)}</p>
              <p className="font-black text-xl">{t('dateStr', lang)}</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>{t('teacherInfoBox', lang)}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: cs }}>
          <div className="px-6 pt-5 pb-0">
            <h2 className="text-base font-bold text-gray-900">{t('quickActions', lang)}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{t('quickActionsSub', lang)}</p>
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

        {/* Schedule + Notifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: cs }}>
            <div className="px-6 pt-5 pb-0 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">{t('scheduleToday', lang)}</h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: '#f0fdf4', color: '#166534' }}>4 คาบ</span>
            </div>
            <div className="h-px bg-gray-100 mx-6 mt-4" />
            <div className="p-5 space-y-3">
              {TEACHER_SCHEDULE.map(({ time, subject, room }) => (
                <div key={time} className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center text-white text-[10px] font-black text-center leading-tight"
                    style={{ background: 'linear-gradient(135deg, #0f6b57, #1a9970)', boxShadow: '0 3px 10px rgba(15,107,87,0.3)' }}>
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
              <h2 className="text-base font-bold text-gray-900">{t('notifCenter', lang)}</h2>
            </div>
            <div className="h-px bg-gray-100 mx-6 mt-4" />
            <div className="p-5 space-y-3">
              {[
                { title: t('notifAbsent', lang), desc: t('notifAbsentDesc', lang), color: 'danger', icon: '⚠️' },
                { title: t('notifUngraded', lang), desc: t('notifUngradedDesc', lang), color: 'warning', icon: '📋' },
                { title: t('notifParentMsg', lang), desc: t('notifParentMsgDesc', lang), color: 'primary', icon: '💬' },
                { title: t('notifExam', lang), desc: t('notifExamDesc', lang), color: 'secondary', icon: '📅' },
              ].map(({ title, desc, color, icon }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{
                    background: `${NOTIF_COLORS[color]}09`,
                    borderLeft: `3px solid ${NOTIF_COLORS[color]}`,
                  }}>
                  <span className="text-base shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-sm font-bold" style={{ color: NOTIF_COLORS[color] }}>{title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: cs }}>
          <div className="px-6 pt-5 pb-0 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">{t('taskSection', lang)}</h2>
            <button className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: '#f0fdf4', color: '#0f6b57' }}>
              {t('reviewTask', lang)}
            </button>
          </div>
          <div className="h-px bg-gray-100 mx-6 mt-4" />
          <div className="p-5">
            <div className="space-y-2">
              <div className="grid grid-cols-3 text-xs font-bold text-gray-400 px-3 pb-2">
                <span>รายการ</span><span>ห้อง</span><span>สถานะ</span>
              </div>
              {TEACHER_TASKS.map(({ task, room, status, urgent }) => (
                <div
                  key={task}
                  className="grid grid-cols-3 items-center p-3 rounded-xl text-sm transition-all duration-150 hover:-translate-y-px"
                  style={{ background: urgent ? '#fff5f5' : '#f8fafc', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.03)' }}>
                  <span className="font-semibold text-gray-800">{task}</span>
                  <span className="text-gray-400 text-xs">{room}</span>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-lg w-fit"
                    style={{
                      background: urgent ? '#fee2e2' : '#f0fdf4',
                      color: urgent ? '#c53030' : '#166534',
                    }}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Schedule */}
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: cs }}>
          <div className="px-6 pt-5 pb-0">
            <h2 className="text-base font-bold text-gray-900">{t('weeklySchedule', lang)}</h2>
          </div>
          <div className="h-px bg-gray-100 mx-6 mt-4" />
          <div className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { day: 'จันทร์', subj: 'คณิต ป.6/1', time: '08:30–09:20', from: '#0f6b57', to: '#1a9970' },
                { day: 'อังคาร', subj: 'Math G7', time: '10:20–11:10', from: '#2563eb', to: '#3b82f6' },
                { day: 'พุธ', subj: 'แผนการสอน', time: '13:00–14:00', from: '#7c3aed', to: '#8b5cf6' },
                { day: 'พฤหัส', subj: 'ออนไลน์', time: '14:15–15:00', from: '#d97706', to: '#f59e0b' },
                { day: 'ศุกร์', subj: 'สรุปคะแนน', time: '15:00–15:40', from: '#be185d', to: '#ec4899' },
              ].map(({ day, subj, time, from, to }) => (
                <div
                  key={day}
                  className="rounded-xl p-3 text-center transition-all duration-150 hover:-translate-y-0.5"
                  style={{
                    background: `linear-gradient(160deg, ${from}16, ${to}0a)`,
                    border: `1px solid ${from}28`,
                    boxShadow: `0 2px 8px ${from}14`,
                  }}>
                  <p className="text-xs font-bold mb-1.5" style={{ color: from }}>{day}</p>
                  <p className="text-sm font-black" style={{ color: from }}>{subj}</p>
                  <p className="text-[10px] mt-1 font-medium" style={{ color: `${from}99` }}>{time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Features */}
        <div
          className="bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: cs, borderTop: '3px solid #3b82f6' }}>
          <div className="px-6 pt-5 pb-0 flex items-center gap-2">
            <h2 className="text-base font-bold text-gray-900">{t('aiFeatures', lang)}</h2>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: '#eff6ff', color: '#1e40af' }}>
              {t('aiSub', lang)}
            </span>
          </div>
          <div className="h-px bg-gray-100 mx-6 mt-4" />
          <div className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'AI ช่วยสร้างข้อสอบ', from: '#2563eb', to: '#3b82f6', icon: '🧪' },
                { label: 'AI สรุปผลการเรียน', from: '#059669', to: '#10b981', icon: '📊' },
                { label: 'AI วิเคราะห์นักเรียนเสี่ยงตก', from: '#d97706', to: '#f59e0b', icon: '⚠️' },
                { label: 'AI ช่วยเขียนแผนการสอน', from: '#7c3aed', to: '#8b5cf6', icon: '📝' },
              ].map(({ label, from, to, icon }) => (
                <button
                  key={label}
                  className="p-4 rounded-xl text-sm font-semibold text-left transition-all duration-150 hover:-translate-y-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${from}12, ${to}08)`,
                    border: `1px solid ${from}22`,
                    color: from,
                    boxShadow: `0 2px 8px ${from}10`,
                  }}>
                  <span className="text-xl block mb-2">{icon}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </Shell>
  )
}
