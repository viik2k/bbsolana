'use client'

import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useAppStore()

  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar />
      <Header />
      <main
        className={cn(
          'pt-16 transition-all duration-300',
          sidebarOpen ? 'ml-64' : 'ml-20'
        )}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
