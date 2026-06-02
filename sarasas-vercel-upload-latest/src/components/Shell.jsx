import { useState } from 'react'

const ROLE_COLORS = {
  success: { from: '#0f6b57', to: '#1a9970', light: '#f0fdf4', text: '#166534', glow: 'rgba(15,107,87,0.28)' },
  primary: { from: '#2b70b8', to: '#3d8fd4', light: '#eff6ff', text: '#1e40af', glow: 'rgba(43,112,184,0.28)' },
  warning: { from: '#b86e10', to: '#d9952a', light: '#fffbeb', text: '#92400e', glow: 'rgba(184,110,16,0.28)' },
}

export default function Shell({ roleInfo, onLogout, sidebar, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const c = ROLE_COLORS[roleInfo.color] ?? ROLE_COLORS.success

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(160deg, #eef2fb 0%, #f2f5fa 40%, #edf0f7 100%)' }}>

      {/* Navbar */}
      <header
        className="sticky top-0 z-40"
        style={{
          height: '72px',
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 1px 0 rgba(0,0,0,0.06), 0 4px 24px rgba(0,0,0,0.06)',
        }}>
        <div className="h-full flex items-center justify-between px-6 gap-4">

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-xl"
            >☰</button>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-sm shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
                  boxShadow: `0 4px 16px ${c.glow}`,
                }}>S</div>
              <div className="leading-tight hidden sm:block">
                <p className="font-extrabold text-gray-900 text-sm">โรงเรียนสารสาสน์</p>
                <p className="text-[10px] text-gray-400 tracking-widest font-semibold">BILINGUAL EDUCATION</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden lg:block text-right mr-1">
              <p className="text-xs font-bold text-gray-700">13 พ.ค. 2026</p>
              <p className="text-[10px] text-gray-400">จันทร์ · ภาคเรียนที่ 1</p>
            </div>
            <div className="hidden lg:block w-px h-8 bg-gray-200" />

            <button
              className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 hover:scale-105"
              style={{ background: 'rgba(0,0,0,0.035)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span
                className="absolute top-2 right-2 w-2 h-2 rounded-full"
                style={{ background: '#ef4444', boxShadow: '0 0 0 2px white, 0 0 8px rgba(239,68,68,0.5)' }} />
            </button>

            <div
              className="flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-2xl cursor-pointer select-none"
              style={{
                background: 'white',
                boxShadow: '0 2px 12px rgba(0,0,0,0.09), 0 0 0 1px rgba(0,0,0,0.05)',
              }}>
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
                  boxShadow: `0 2px 8px ${c.glow}`,
                }}>
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

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside
          className={`
            fixed md:sticky top-[72px] left-0 z-30
            h-[calc(100vh-72px)] flex flex-col shrink-0
            transition-transform duration-200 md:translate-x-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            w-64 xl:w-72
          `}
          style={{ background: 'white', boxShadow: '4px 0 32px rgba(0,0,0,0.08)' }}>

          {/* Profile header */}
          <div
            className="shrink-0 px-4 py-4 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${c.from} 0%, ${c.to} 100%)` }}>
            <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full" style={{ background: 'rgba(255,255,255,0.09)' }} />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <div className="relative flex items-center gap-3">
              <div
                className="shrink-0 rounded-2xl flex items-center justify-center text-white font-black text-xl"
                style={{
                  width: '52px', height: '52px',
                  background: 'rgba(255,255,255,0.18)',
                  border: '2px solid rgba(255,255,255,0.35)',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
                }}>
                {roleInfo.initial}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-white text-sm truncate">{roleInfo.name}</p>
                <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.7)' }}>{roleInfo.subtitle}</p>
                <div
                  className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                  style={{ background: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.95)', border: '1px solid rgba(255,255,255,0.25)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80 inline-block" />
                  {roleInfo.label ?? roleInfo.name.split(' ')[0]}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-3">
            {sidebar}
          </div>

          {/* Logout */}
          <div className="shrink-0 p-4" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-150"
              style={{
                background: 'linear-gradient(135deg, #fff5f5, #ffecec)',
                color: '#c53030',
                boxShadow: '0 2px 8px rgba(197,48,48,0.12), 0 0 0 1px rgba(197,48,48,0.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #ffecec, #ffd5d5)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(197,48,48,0.22), 0 0 0 1px rgba(197,48,48,0.1)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #fff5f5, #ffecec)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(197,48,48,0.12), 0 0 0 1px rgba(197,48,48,0.08)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(197,48,48,0.1)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </div>
              ออกจากระบบ
            </button>
          </div>
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 z-20 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
          <div className="max-w-6xl mx-auto p-4 md:p-5">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
