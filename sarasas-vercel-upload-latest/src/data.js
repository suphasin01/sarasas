export const ROLES = {
  teacher: {
    email: 'teacher@sarasas.test',
    label: 'ครู',
    name: 'ครูกานต์พิชชา',
    subtitle: 'Mathematics Teacher',
    initial: 'K',
    color: 'success',
  },
  student: {
    email: 'student@sarasas.test',
    label: 'นักเรียน',
    name: 'กานต์พิชชา วงศ์สวัสดิ์',
    subtitle: 'ป.6/1 · รหัส SR001',
    initial: 'ก',
    color: 'primary',
  },
  parent: {
    email: 'parent@sarasas.test',
    label: 'ผู้ปกครอง',
    name: 'คุณวิไล วงศ์สวัสดิ์',
    subtitle: 'ผู้ปกครองของ กานต์พิชชา',
    initial: 'ว',
    color: 'warning',
  },
}

export const TEACHER_SCHEDULE = [
  { time: '08:30', subject: 'คณิตศาสตร์ ป.6/1', room: 'ห้อง 603' },
  { time: '10:20', subject: 'Mathematics G7', room: 'Online Classroom' },
  { time: '13:00', subject: 'Homeroom ม.1/2', room: 'ห้อง 412' },
  { time: '14:15', subject: 'ตรวจงานกลุ่ม', room: 'Teacher Room' },
]

export const STUDENT_SCHEDULE = [
  { time: '08:30', subject: 'คณิตศาสตร์', room: 'ห้อง 603 · ครูกานต์' },
  { time: '09:30', subject: 'ภาษาอังกฤษ', room: 'ห้อง 502 · Mr. James' },
  { time: '10:20', subject: 'วิทยาศาสตร์', room: 'LAB 1 · ครูนภา' },
  { time: '13:00', subject: 'ภาษาไทย', room: 'ห้อง 603 · ครูสมฤดี' },
  { time: '14:00', subject: 'สังคมศึกษา', room: 'ห้อง 603 · ครูวีระ' },
]

export const GRADES = [
  { subject: 'คณิตศาสตร์', score: 88, total: 100, grade: 'A' },
  { subject: 'ภาษาอังกฤษ', score: 92, total: 100, grade: 'A' },
  { subject: 'วิทยาศาสตร์', score: 78, total: 100, grade: 'B+' },
  { subject: 'ภาษาไทย', score: 85, total: 100, grade: 'A' },
  { subject: 'สังคมศึกษา', score: 80, total: 100, grade: 'B+' },
]

export const HOMEWORK = [
  { title: 'แบบฝึกหัด Fractions', subject: 'คณิตศาสตร์', due: 'พรุ่งนี้', urgent: true, done: false },
  { title: 'Essay "My Dream Job"', subject: 'ภาษาอังกฤษ', due: '16 พ.ค.', urgent: false, done: false },
  { title: 'รายงานระบบสุริยะ', subject: 'วิทยาศาสตร์', due: 'ส่งแล้ว', urgent: false, done: true },
]

export const TEACHER_TASKS = [
  { task: 'การบ้าน Fractions', room: 'ป.6/1', status: 'รอตรวจ 18', urgent: true },
  { task: 'Quiz Algebra', room: 'ม.1/2', status: 'ให้คะแนนแล้ว', urgent: false },
  { task: 'ส่งผลการเรียน', room: 'ป.6/2', status: 'กำหนดพรุ่งนี้', urgent: true },
]

export const PARENT_MESSAGES = [
  { from: 'ครูกานต์พิชชา (คณิตฯ)', msg: 'กานต์พิชชาทำแบบฝึกหัดได้ดีมาก ช่วยเตือนเรื่องส่งการบ้านด้วยนะคะ' },
  { from: 'Mr. James (English)', msg: 'Please remind your child to submit the essay by Friday.' },
]

export const BUS_STOPS = [
  { name: 'โรงเรียนสารสาสน์ (ออกเดินทาง)', time: 'ออก 06:40 น.', status: 'done' },
  { name: 'สี่แยกบางนา', time: '06:55 น.', status: 'done' },
  { name: 'ศรีนครินทร์ ซอย 5', time: '07:10 น. · กำลังเข้าใกล้', status: 'active' },
  { name: 'หน้าปากซอยสุขุมวิท 71', time: 'ประมาณ 07:22 น.', status: 'mine' },
  { name: 'อ่อนนุช ซอย 10', time: 'ประมาณ 07:35 น.', status: 'upcoming' },
  { name: 'สุขุมวิท 77 (ปลายทาง)', time: 'ประมาณ 07:45 น.', status: 'upcoming' },
]

export const FEES = [
  { item: 'ค่าเล่าเรียนภาค 1', amount: '28,000 ฿', status: 'paid' },
  { item: 'ค่ากิจกรรม', amount: '2,500 ฿', status: 'unpaid' },
  { item: 'ค่าอาหาร (พ.ค.)', amount: '1,800 ฿', status: 'paid' },
]
