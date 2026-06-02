import { useState } from 'react'

const ROLE_COLORS = {
  success: { from: '#0f6b57', to: '#1a9970', light: '#f0fdf4', text: '#166534' },
  primary: { from: '#2b70b8', to: '#3d8fd4', light: '#eff6ff', text: '#1e40af' },
  warning: { from: '#b86e10', to: '#d9952a', light: '#fffbeb', text: '#92400e' },
}

export default function Shell({ roleInfo, onLogout, sidebar, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const c = ROLE_COLORS[roleInfo.color] ?? ROLE_COLORS.success

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ── Top Navbar ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm"
        style={{ height: '72px' }}>
        <div className="h-full flex items-center justify-between px-5 gap-4">

          {/* Left: hamburger + logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-xl"
            >
              ☰
            </button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0"
                style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}>
                S
              </div>
              <div className="leading-tight hidden sm:block">
                <p className="font-extrabold text-gray-900 text-sm">โรงเรียนสารสาสน์</p>
                <p className="text-[10px] text-gray-400 tracking-wider">Bilingual Education</p>
              </div>
            </div>
          </div>

          {/* Right: role badge + bell + date */}
          <div className="flex items-center gap-3">
            {/* Current date */}
            <div className="hidden lg:block text-right">
              <p className="text-xs font-semibold text-gray-700">13 พ.ค. 2026</p>
              <p className="text-[10px] text-gray-400">จันทร์ · ภาคเรียนที่ 1</p>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-8 bg-gray-200" />

            {/* Notification bell */}
            <button className="relative w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>

            {/* User chip */}
            <div className="flex items-center gap-2.5 pl-1 pr-4 py-1.5 rounded-2xl border border-gray-200 bg-gray-50">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0"
                style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}>
                {roleInfo.initial}
              </div>
              <div className="hidden sm:block leading-tight">
                <p className="text-xs font-bold text-gray-800">{roleInfo.name}</p>
                <p className="text-[10px] text-gray-400">{roleInfo.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ── */}
        <aside
          className={`
            fixed md:sticky top-[72px] left-0 z-30
            h-[calc(100vh-72px)] bg-white border-r border-gray-100
            flex flex-col shrink-0
            transition-transform duration-200 md:translate-x-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            w-64 xl:w-72
          `}
        >
          {/* Profile card */}
          <div className="shrink-0 p-4 border-b border-gray-100"
            style={{ background: `linear-gradient(135deg, ${c.from}15, ${c.to}10)` }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shrink-0 shadow-md"
                style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}>
                {roleInfo.initial}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-gray-900 text-sm truncate">{roleInfo.name}</p>
                <p className="text-xs text-gray-500 truncate">{roleInfo.subtitle}</p>
                <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                  style={{ background: c.light, color: c.text }}>
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: c.from }} />
                  {roleInfo.label ?? roleInfo.name.split(' ')[0]}
                </div>
              </div>
            </div>
          </div>

          {/* Menu (scrollable) */}
          <div className="flex-1 overflow-y-auto py-3">
            {sidebar}
          </div>

          {/* Logout button (pinned at bottom) */}
          <div className="shrink-0 p-4 border-t border-gray-100">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group"
              style={{ background: '#fef2f2', color: '#b91c1c' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#fee2e2' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#fef2f2' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              ออกจากระบบ
            </button>
          </div>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-20 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)} />
        )}

        {/* ── Main content ── */}
        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
          <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
