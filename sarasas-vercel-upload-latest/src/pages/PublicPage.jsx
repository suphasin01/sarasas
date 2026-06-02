import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem,
  Button, Card, CardBody, Chip,
} from '@heroui/react'

const ROLE_CARDS = [
  {
    icon: '👨‍🏫',
    title: 'สำหรับครู',
    subtitle: 'Teacher Portal',
    features: ['จัดตารางสอน', 'เช็กชื่อ & ตรวจงาน', 'ส่งประกาศ', 'AI ช่วยสอน'],
    gradient: 'from-[#0f6b57] to-[#22a07a]',
    shadow: 'shadow-green-200',
    chipColor: 'success',
  },
  {
    icon: '👨‍🎓',
    title: 'สำหรับนักเรียน',
    subtitle: 'Student Portal',
    features: ['ตารางเรียน & การบ้าน', 'คะแนน & เกรด GPA', 'ห้องเรียนออนไลน์', 'แชทกับครู'],
    gradient: 'from-[#2b70b8] to-[#4a9fd4]',
    shadow: 'shadow-blue-200',
    chipColor: 'primary',
  },
  {
    icon: '👨‍👩‍👦',
    title: 'สำหรับผู้ปกครอง',
    subtitle: 'Parent Portal',
    features: ['ติดตามผลการเรียน', 'รถรับส่ง Live GPS', 'ข้อความจากครู', 'ชำระค่าธรรมเนียม'],
    gradient: 'from-[#c97d1a] to-[#e8a83c]',
    shadow: 'shadow-amber-200',
    chipColor: 'warning',
  },
]

export default function PublicPage({ onLoginClick }) {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Navbar ── */}
      <Navbar
        maxWidth="xl"
        className="bg-white/80 backdrop-blur-md border-b border-default-100"
        isBordered
      >
        <NavbarBrand>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0f6b57] to-[#22a07a] flex items-center justify-center text-white font-black text-lg shadow-md shrink-0">
              S
            </div>
            <div className="leading-tight">
              <p className="font-extrabold text-[#0f6b57] text-sm tracking-wide">โรงเรียนสารสาสน์</p>
              <p className="text-[10px] text-default-400 font-medium tracking-widest uppercase">Bilingual Education</p>
            </div>
          </div>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem className="hidden sm:flex gap-2 items-center text-sm text-default-500 font-medium">
            <span>ครู</span><span className="text-default-300">·</span>
            <span>นักเรียน</span><span className="text-default-300">·</span>
            <span>ผู้ปกครอง</span>
          </NavbarItem>
          <NavbarItem>
            <Button
              color="success"
              className="text-white font-bold px-6 shadow-md shadow-green-200"
              onPress={onLoginClick}
            >
              เข้าสู่ระบบ
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#042d1e] via-[#0f6b57] to-[#1a5e4a] text-white">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-[#22a07a]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 py-24 text-center">
          {/* Logo emblem */}
          <div className="mx-auto mb-8 w-24 h-24 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
            <span className="text-5xl font-black text-white">S</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Sarasas School Portal · ปีการศึกษา 2569
          </div>

          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5 tracking-tight">
            พื้นที่กลาง
            <br />
            <span className="text-[#a8e6cf]">ครู · นักเรียน · ผู้ปกครอง</span>
          </h1>

          <p className="text-white/70 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            ติดตามประกาศ ดูผลการเรียน ตรวจสอบรถรับส่งแบบ Live
            และบริหารจัดการชั้นเรียนได้ในที่เดียว
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              className="bg-white text-[#0f6b57] font-bold px-8 shadow-xl hover:scale-105 transition-transform"
              onPress={onLoginClick}
            >
              เข้าสู่ระบบ →
            </Button>
            <Button
              size="lg"
              variant="bordered"
              className="text-white border-white/40 font-semibold px-8 hover:bg-white/10 transition-colors"
              onPress={onLoginClick}
            >
              ดูข้อมูลโรงเรียน
            </Button>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,64 C480,0 960,0 1440,64 L1440,64 L0,64 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="max-w-4xl mx-auto px-4 -mt-2 mb-16">
        <div className="grid grid-cols-3 gap-4">
          {[
            { n: '2,480', l: 'นักเรียน', icon: '👨‍🎓' },
            { n: '186', l: 'ครูและบุคลากร', icon: '👨‍🏫' },
            { n: '3', l: 'หลักสูตรสองภาษา', icon: '📚' },
          ].map(({ n, l, icon }) => (
            <Card key={l} className="shadow-md hover:shadow-lg transition-shadow">
              <CardBody className="py-6 text-center">
                <div className="text-3xl mb-2">{icon}</div>
                <p className="text-3xl md:text-4xl font-black text-[#0f6b57]">{n}</p>
                <p className="text-xs text-default-500 mt-1 font-medium">{l}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Role cards ── */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <div className="text-center mb-10">
          <Chip color="success" variant="flat" className="mb-3">เลือกบทบาท</Chip>
          <h2 className="text-3xl font-black text-default-900">ระบบออกแบบมาเพื่อทุกคน</h2>
          <p className="text-default-500 mt-2">คลิกที่การ์ดเพื่อเข้าสู่ระบบ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ROLE_CARDS.map(({ icon, title, subtitle, features, gradient, shadow, chipColor }) => (
            <div
              key={title}
              onClick={onLoginClick}
              className={`
                group relative overflow-hidden rounded-3xl cursor-pointer
                bg-gradient-to-br ${gradient}
                shadow-xl ${shadow}
                hover:scale-105 hover:shadow-2xl
                transition-all duration-300
                text-white p-7
              `}
            >
              {/* BG decoration */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-full" />

              <div className="relative">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl mb-5 backdrop-blur-sm">
                  {icon}
                </div>

                <Chip size="sm" variant="flat" color={chipColor} className="mb-3 bg-white/20 text-white border-0 text-[10px] font-semibold uppercase tracking-wider">
                  {subtitle}
                </Chip>

                <h3 className="text-xl font-black mb-4">{title}</h3>

                <ul className="space-y-2 mb-6">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/90">
                      <span className="w-4 h-4 rounded-full bg-white/30 flex items-center justify-center text-[10px] shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-1 text-sm font-bold text-white group-hover:gap-2 transition-all">
                  เข้าใช้งาน
                  <span className="text-base">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Calendar & News ── */}
      <section className="bg-default-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-default-900">ข้อมูลโรงเรียน</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-md">
              <CardBody className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-success-100 flex items-center justify-center text-lg">📅</div>
                  <h2 className="font-bold text-default-800">ปฏิทินการศึกษา</h2>
                </div>
                <div className="space-y-3">
                  {[
                    { date: '18 พ.ค.', event: 'เปิดภาคเรียนที่ 1', color: 'bg-success-50 text-success-700' },
                    { date: '5 มิ.ย.', event: 'วันไหว้ครู', color: 'bg-primary-50 text-primary-700' },
                    { date: '24 ก.ค.', event: 'ประชุมผู้ปกครอง', color: 'bg-warning-50 text-warning-700' },
                  ].map(({ date, event, color }) => (
                    <div key={date} className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg shrink-0 ${color}`}>{date}</span>
                      <span className="text-sm text-default-700">{event}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            <Card className="shadow-md">
              <CardBody className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-danger-100 flex items-center justify-center text-lg">📢</div>
                  <h2 className="font-bold text-default-800">ข่าวล่าสุด</h2>
                </div>
                <div className="space-y-3">
                  {[
                    { date: '12 May 2026', title: 'ทีมภาษาอังกฤษคว้ารางวัล speech contest ระดับเขต' },
                    { date: '9 May 2026', title: 'กิจกรรม Open House สำหรับผู้ปกครองและนักเรียนใหม่' },
                  ].map(({ date, title }) => (
                    <div key={date} className="p-3 bg-default-50 rounded-2xl hover:bg-default-100 transition-colors cursor-pointer">
                      <p className="text-[11px] text-default-400 font-medium">{date}</p>
                      <p className="text-sm font-semibold text-default-800 mt-0.5 leading-snug">{title}</p>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Programmes ── */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-default-900">หลักสูตรของเรา</h2>
          <p className="text-default-500 mt-2">ออกแบบเพื่อการเรียนรู้แบบสองภาษา</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { name: 'Bilingual Programme', desc: 'ภาษาอังกฤษเข้มข้น ควบคู่พื้นฐานวิชาการไทย', icon: '🌍' },
            { name: 'ASEAN Bilingual', desc: 'เสริมทักษะสื่อสารและความเข้าใจวัฒนธรรมอาเซียน', icon: '🤝' },
            { name: 'Mini Bilingual', desc: 'เริ่มต้นสองภาษาอย่างมั่นใจสำหรับเด็กเล็ก', icon: '⭐' },
          ].map(({ name, desc, icon }) => (
            <div key={name} className="group p-5 rounded-2xl border-2 border-default-100 hover:border-[#0f6b57] hover:shadow-lg transition-all duration-200 cursor-pointer">
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-bold text-[#0f6b57] mb-1 text-sm">{name}</h3>
              <p className="text-sm text-default-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="bg-gradient-to-r from-[#0f6b57] to-[#22a07a] py-14 text-center text-white">
        <h2 className="text-3xl font-black mb-3">พร้อมเริ่มต้นแล้วหรือยัง?</h2>
        <p className="text-white/70 mb-7 text-lg">เข้าสู่ระบบเพื่อดูข้อมูลของคุณ</p>
        <Button
          size="lg"
          className="bg-white text-[#0f6b57] font-bold px-10 shadow-xl hover:scale-105 transition-transform"
          onPress={onLoginClick}
        >
          เข้าสู่ระบบ →
        </Button>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#042d1e] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#0f6b57] flex items-center justify-center font-black text-lg">S</div>
            <div>
              <p className="font-bold">โรงเรียนสารสาสน์</p>
              <p className="text-xs text-green-400">Bilingual Education</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
            <div>
              <h3 className="font-bold mb-2 text-sm text-green-300">ที่อยู่</h3>
              <p className="text-sm text-white/60 leading-relaxed">99 ถนนตัวอย่าง แขวงการศึกษา<br />กรุงเทพฯ 10260</p>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-sm text-green-300">ติดต่อ</h3>
              <p className="text-sm text-white/60">02-000-0000<br />contact@sarasas.example</p>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-sm text-green-300">Social Media</h3>
              <p className="text-sm text-white/60">Facebook · LINE OA · YouTube</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
