import { useState } from 'react'
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem,
  Button, Avatar,
} from '@heroui/react'

export default function Shell({ roleInfo, onLogout, sidebar, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-default-50">
      <Navbar
        maxWidth="full"
        className="border-b border-divider bg-white shadow-sm"
        isBordered
        height="64px"
      >
        <NavbarContent>
          <Button
            isIconOnly
            variant="light"
            className="md:hidden text-xl"
            onPress={() => setSidebarOpen(!sidebarOpen)}
            aria-label="เปิดเมนู"
          >
            ☰
          </Button>
          <NavbarBrand>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#0f6b57] flex items-center justify-center text-white font-bold text-base shrink-0">
                S
              </div>
              <div className="hidden sm:block leading-tight">
                <p className="font-bold text-[#0f6b57] text-sm">โรงเรียนสารสาสน์</p>
                <p className="text-xs text-default-500">Bilingual Education</p>
              </div>
            </div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold leading-tight">{roleInfo.name}</p>
                <p className="text-xs text-default-500">{roleInfo.subtitle}</p>
              </div>
              <Avatar
                name={roleInfo.initial}
                color={roleInfo.color}
                size="sm"
                isBordered
              />
              <Button size="sm" variant="flat" color="danger" onPress={onLogout}>
                ออกจากระบบ
              </Button>
            </div>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div className="flex relative">
        {/* Sidebar */}
        <aside
          className={`
            fixed md:sticky top-[64px] left-0 z-30
            h-[calc(100vh-64px)] w-64 xl:w-72 bg-white border-r border-divider
            overflow-y-auto shrink-0
            transition-transform duration-200 md:translate-x-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          {sidebar}
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 overflow-x-hidden bg-default-50">
          <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
