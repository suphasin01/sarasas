import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem,
  Button, Card, CardBody, Chip,
} from '@heroui/react'

export default function PublicPage({ onLoginClick }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f9f6] to-white">
      {/* Navbar */}
      <Navbar maxWidth="xl" className="bg-white border-b border-divider" isBordered>
        <NavbarBrand>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#0f6b57] flex items-center justify-center text-white font-bold shrink-0">
              S
            </div>
            <div>
              <p className="font-bold text-[#0f6b57] leading-tight text-sm">โรงเรียนสารสาสน์</p>
              <p className="text-xs text-default-500">Bilingual Education</p>
            </div>
          </div>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button color="success" variant="solid" className="text-white font-semibold" onPress={onLoginClick}>
              เข้าสู่ระบบ
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 py-16 text-center">
        <Chip color="success" variant="flat" className="mb-4 text-sm">Sarasas School Portal</Chip>
        <h1 className="text-4xl md:text-5xl font-bold text-[#0f6b57] leading-tight mb-4">
          พื้นที่กลางสำหรับ
          <br />
          ข่าวสาร การเรียน และบริการ
        </h1>
        <p className="text-default-600 text-lg max-w-xl mx-auto mb-8">
          ติดตามประกาศสำคัญ ดูปฏิทินโรงเรียน ตรวจสอบเส้นทางรถ
          <br />
          และค้นหาสถานะนักเรียนได้ในหน้าเดียว
        </p>
        <Button
          size="lg"
          color="success"
          className="text-white font-semibold px-8"
          onPress={onLoginClick}
        >
          เข้าสู่ระบบ →
        </Button>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-3 gap-4">
          {[
            { n: '2,480', l: 'นักเรียน' },
            { n: '186', l: 'ครูและบุคลากร' },
            { n: '3', l: 'หลักสูตรสองภาษา' },
          ].map(({ n, l }) => (
            <Card key={l} className="text-center shadow-sm">
              <CardBody className="py-6">
                <p className="text-3xl md:text-4xl font-bold text-[#0f6b57]">{n}</p>
                <p className="text-sm text-default-500 mt-1">{l}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Role cards */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold text-center mb-8 text-default-800">เข้าใช้งานสำหรับ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: '👨‍🏫',
              title: 'ครู',
              desc: 'จัดตารางสอน เช็กชื่อ ตรวจงาน และส่งประกาศ',
              bg: 'bg-green-50',
              border: 'border-green-200',
            },
            {
              icon: '👨‍🎓',
              title: 'นักเรียน',
              desc: 'ดูตารางเรียน การบ้าน คะแนน และแชทกับครู',
              bg: 'bg-blue-50',
              border: 'border-blue-200',
            },
            {
              icon: '👨‍👩‍👦',
              title: 'ผู้ปกครอง',
              desc: 'ติดตามผลการเรียน รถรับส่ง และข้อความจากครู',
              bg: 'bg-amber-50',
              border: 'border-amber-200',
            },
          ].map(({ icon, title, desc, bg, border }) => (
            <div
              key={title}
              className={`rounded-2xl border-2 p-8 text-center cursor-pointer hover:scale-105 transition-transform duration-200 ${bg} ${border}`}
              onClick={onLoginClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onLoginClick()}
            >
              <div className="text-5xl mb-4">{icon}</div>
              <h3 className="text-xl font-bold mb-2 text-default-800">{title}</h3>
              <p className="text-sm text-default-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Calendar & News */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardBody>
              <h2 className="text-lg font-bold mb-4">📅 ปฏิทินการศึกษา</h2>
              <div className="space-y-3">
                {[
                  { date: '18 พ.ค.', event: 'เปิดภาคเรียนที่ 1' },
                  { date: '5 มิ.ย.', event: 'วันไหว้ครู' },
                  { date: '24 ก.ค.', event: 'ประชุมผู้ปกครอง' },
                ].map(({ date, event }) => (
                  <div key={date} className="flex items-center gap-3">
                    <Chip size="sm" color="success" variant="flat">{date}</Chip>
                    <span className="text-sm">{event}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-sm">
            <CardBody>
              <h2 className="text-lg font-bold mb-4">📢 ข่าวล่าสุด</h2>
              <div className="space-y-3">
                {[
                  { date: '12 May 2026', title: 'ทีมภาษาอังกฤษคว้ารางวัล speech contest' },
                  { date: '9 May 2026', title: 'กิจกรรม Open House สำหรับผู้ปกครอง' },
                ].map(({ date, title }) => (
                  <div key={date} className="p-3 bg-default-50 rounded-xl">
                    <p className="text-xs text-default-500">{date}</p>
                    <p className="text-sm font-medium mt-1">{title}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Programmes */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold text-center mb-8 text-default-800">หลักสูตรของเรา</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Bilingual Programme', desc: 'ภาษาอังกฤษเข้มข้น ควบคู่พื้นฐานวิชาการไทย' },
            { name: 'ASEAN Bilingual', desc: 'เสริมทักษะสื่อสารและความเข้าใจวัฒนธรรมอาเซียน' },
            { name: 'Mini Bilingual', desc: 'เริ่มต้นสองภาษาอย่างมั่นใจสำหรับเด็กเล็ก' },
          ].map(({ name, desc }) => (
            <Card key={name} className="border-l-4 border-l-[#0f6b57] shadow-sm">
              <CardBody>
                <h3 className="font-bold text-[#0f6b57] mb-1">{name}</h3>
                <p className="text-sm text-default-600">{desc}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f6b57] text-white py-10">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold mb-2">ติดต่อโรงเรียน</h3>
            <p className="text-sm text-green-200 leading-relaxed">
              99 ถนนตัวอย่าง แขวงการศึกษา<br />กรุงเทพฯ 10260
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">ช่องทางหลัก</h3>
            <p className="text-sm text-green-200">
              02-000-0000<br />contact@sarasas.example
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Social Media</h3>
            <p className="text-sm text-green-200">Facebook / LINE OA / YouTube</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
