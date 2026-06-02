import { Button } from '@heroui/react'

const ROLE_CARDS = [
  {
    icon: '👨‍🏫', title: 'สำหรับครู', subtitle: 'Teacher Portal',
    features: ['จัดตารางสอน', 'เช็กชื่อ & ตรวจงาน', 'ส่งประกาศ', 'AI ช่วยสอน'],
    from: '#0f6b57', to: '#1a9970',
  },
  {
    icon: '👨‍🎓', title: 'สำหรับนักเรียน', subtitle: 'Student Portal',
    features: ['ตารางเรียน & การบ้าน', 'คะแนน & เกรด GPA', 'ห้องเรียนออนไลน์', 'แชทกับครู'],
    from: '#2b70b8', to: '#3d8fd4',
  },
  {
    icon: '👨‍👩‍👦', title: 'สำหรับผู้ปกครอง', subtitle: 'Parent Portal',
    features: ['ติดตามผลการเรียน', 'รถรับส่ง Live GPS', 'ข้อความจากครู', 'ชำระค่าธรรมเนียม'],
    from: '#b86e10', to: '#d9952a',
  },
]

export default function PublicPage({ onLoginClick }) {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0f6b57] flex items-center justify-center text-white font-black text-base shrink-0">S</div>
            <div className="leading-tight">
              <p className="font-extrabold text-[#0f6b57] text-sm">โรงเรียนสารสาสน์</p>
              <p className="text-[10px] text-gray-400 tracking-widest uppercase">Bilingual Education</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden md:flex items-center gap-4 text-sm text-gray-400 font-medium">
              <span>ครู</span><span className="text-gray-200">|</span>
              <span>นักเรียน</span><span className="text-gray-200">|</span>
              <span>ผู้ปกครอง</span>
            </div>
            <button onClick={onLoginClick}
              className="bg-[#0f6b57] hover:bg-[#0a5544] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors shadow-sm">
              เข้าสู่ระบบ
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero (2-column on xl) ── */}
      <section className="relative overflow-hidden text-white"
        style={{ background: 'linear-gradient(135deg, #042d1e 0%, #0f6b57 60%, #1a7a60 100%)' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, white, transparent)', transform: 'translate(30%,-30%)' }} />

        <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div className="text-center xl:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block animate-pulse" />
              Sarasas School Portal · ปีการศึกษา 2569
            </div>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-black leading-tight mb-5">
              พื้นที่กลาง<br />
              <span className="text-[#a8e6cf]">ครู · นักเรียน</span><br />
              <span className="text-[#a8e6cf]">· ผู้ปกครอง</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-md mx-auto xl:mx-0 mb-8 leading-relaxed">
              ติดตามประกาศ ดูผลการเรียน ตรวจสอบรถรับส่งแบบ Live
              และบริหารจัดการชั้นเรียนได้ในที่เดียว
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center xl:justify-start">
              <button onClick={onLoginClick}
                className="bg-white text-[#0f6b57] font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                เข้าสู่ระบบ →
              </button>
              <button onClick={onLoginClick}
                className="border border-white/40 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors">
                ดูข้อมูลโรงเรียน
              </button>
            </div>
            {/* Mini stats */}
            <div className="mt-10 flex gap-8 justify-center xl:justify-start">
              {[['2,480', 'นักเรียน'], ['186', 'ครู'], ['3', 'หลักสูตร']].map(([n, l]) => (
                <div key={l}>
                  <p className="text-2xl font-black">{n}</p>
                  <p className="text-white/55 text-xs mt-0.5">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: compact role tiles (xl only) */}
          <div className="hidden xl:flex flex-col gap-4">
            {ROLE_CARDS.map(({ icon, title, subtitle, features, from, to }) => (
              <div key={title} onClick={onLoginClick}
                className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-2xl px-5 py-4 cursor-pointer hover:bg-white/20 transition-colors backdrop-blur-sm group">
                <div className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center text-2xl"
                  style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm">{title}</p>
                  <p className="text-white/50 text-xs">{features.slice(0, 2).join(' · ')}</p>
                </div>
                <span className="text-white/40 group-hover:text-white/80 transition-colors text-lg">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats (visible on mobile since hero stats are xl-only) ── */}
      <section className="xl:hidden bg-gray-50 border-b border-gray-100 py-8 px-4">
        <div className="max-w-xl mx-auto grid grid-cols-3 gap-4 text-center">
          {[['2,480', 'นักเรียน', '👨‍🎓'], ['186', 'ครู & บุคลากร', '👨‍🏫'], ['3', 'หลักสูตร', '📚']].map(([n, l, icon]) => (
            <div key={l} className="bg-white rounded-2xl py-5 shadow-sm">
              <div className="text-2xl mb-1">{icon}</div>
              <p className="text-2xl font-black text-[#0f6b57]">{n}</p>
              <p className="text-xs text-gray-500 mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Role cards ── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-2">เลือกบทบาท</p>
            <h2 className="text-3xl font-black text-gray-900">ระบบออกแบบมาเพื่อทุกคน</h2>
            <p className="text-gray-500 mt-2 text-sm">คลิกที่การ์ดเพื่อเข้าสู่ระบบ</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROLE_CARDS.map(({ icon, title, subtitle, features, from, to }) => (
              <div key={title} onClick={onLoginClick}
                className="relative overflow-hidden rounded-2xl cursor-pointer text-white p-7 hover:-translate-y-1 hover:shadow-2xl transition-all duration-200 group"
                style={{ background: `linear-gradient(140deg, ${from}, ${to})` }}>
                <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10 pointer-events-none" />
                <div className="relative space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">{icon}</div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-white/60 mb-0.5">{subtitle}</p>
                    <h3 className="text-xl font-black">{title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/85">
                        <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center text-[10px] shrink-0 font-bold">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-bold group-hover:underline pt-1">เข้าใช้งาน →</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calendar & News ── */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-8">ข้อมูลโรงเรียน</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center text-base">📅</div>
                <h3 className="font-bold text-gray-800">ปฏิทินการศึกษา</h3>
              </div>
              <div className="space-y-3">
                {[
                  { date: '18 พ.ค.', event: 'เปิดภาคเรียนที่ 1', color: 'bg-green-100 text-green-700' },
                  { date: '5 มิ.ย.', event: 'วันไหว้ครู', color: 'bg-blue-100 text-blue-700' },
                  { date: '24 ก.ค.', event: 'ประชุมผู้ปกครอง', color: 'bg-amber-100 text-amber-700' },
                ].map(({ date, event, color }) => (
                  <div key={date} className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 ${color}`}>{date}</span>
                    <span className="text-sm text-gray-700">{event}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center text-base">📢</div>
                <h3 className="font-bold text-gray-800">ข่าวล่าสุด</h3>
              </div>
              <div className="space-y-3">
                {[
                  { date: '12 May 2026', title: 'ทีมภาษาอังกฤษคว้ารางวัล speech contest ระดับเขต' },
                  { date: '9 May 2026', title: 'กิจกรรม Open House สำหรับผู้ปกครองและนักเรียนใหม่' },
                ].map(({ date, title }) => (
                  <div key={date} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <p className="text-[11px] text-gray-400 font-medium">{date}</p>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5 leading-snug">{title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Programmes ── */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-gray-900">หลักสูตรของเรา</h2>
            <p className="text-gray-500 mt-1 text-sm">ออกแบบเพื่อการเรียนรู้แบบสองภาษา</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: 'Bilingual Programme', desc: 'ภาษาอังกฤษเข้มข้น ควบคู่พื้นฐานวิชาการไทย', icon: '🌍' },
              { name: 'ASEAN Bilingual', desc: 'เสริมทักษะสื่อสารและความเข้าใจวัฒนธรรมอาเซียน', icon: '🤝' },
              { name: 'Mini Bilingual', desc: 'เริ่มต้นสองภาษาอย่างมั่นใจสำหรับเด็กเล็ก', icon: '⭐' },
            ].map(({ name, desc, icon }) => (
              <div key={name} className="p-6 rounded-2xl border-2 border-gray-100 hover:border-[#0f6b57] hover:shadow-md transition-all cursor-pointer">
                <div className="text-2xl mb-3">{icon}</div>
                <h3 className="font-bold text-[#0f6b57] mb-1">{name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-6 text-center text-white"
        style={{ background: 'linear-gradient(135deg, #0f6b57, #22a07a)' }}>
        <h2 className="text-2xl md:text-3xl font-black mb-2">พร้อมเริ่มต้นแล้วหรือยัง?</h2>
        <p className="text-white/70 mb-7 text-base">เข้าสู่ระบบเพื่อดูข้อมูลของคุณ</p>
        <button onClick={onLoginClick}
          className="bg-white text-[#0f6b57] font-bold px-10 py-3.5 rounded-xl shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all">
          เข้าสู่ระบบ →
        </button>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-[#0f6b57] flex items-center justify-center font-black">S</div>
            <div>
              <p className="font-bold">โรงเรียนสารสาสน์</p>
              <p className="text-xs text-green-400">Bilingual Education</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-xs text-green-400 uppercase tracking-wider mb-3">ที่อยู่</h3>
              <p className="text-sm text-white/50 leading-relaxed">99 ถนนตัวอย่าง แขวงการศึกษา<br />กรุงเทพฯ 10260</p>
            </div>
            <div>
              <h3 className="font-bold text-xs text-green-400 uppercase tracking-wider mb-3">ติดต่อ</h3>
              <p className="text-sm text-white/50">02-000-0000<br />contact@sarasas.example</p>
            </div>
            <div>
              <h3 className="font-bold text-xs text-green-400 uppercase tracking-wider mb-3">Social Media</h3>
              <p className="text-sm text-white/50">Facebook · LINE OA · YouTube</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
