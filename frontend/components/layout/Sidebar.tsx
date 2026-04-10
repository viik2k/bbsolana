'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  BarChart3,
  ArrowRightLeft,
  Settings,
  Brain,
  Wallet,
  TrendingUp,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/lib/store'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Markets', href: '/markets', icon: BarChart3 },
  { name: 'Trading', href: '/trading', icon: ArrowRightLeft },
  { name: 'AI Signals', href: '/markets#signals', icon: Brain },
  { name: 'Portfolio', href: '/#portfolio', icon: Wallet },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarOpen } = useAppStore()

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r border-gray-700/50 bg-gray-900/95 backdrop-blur-md transition-all duration-300',
        sidebarOpen ? 'w-64' : 'w-20'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-gray-700/50 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-crypto-solana to-primary-500">
            <TrendingUp className="h-5 w-5 text-gray-900" />
          </div>
          {sidebarOpen && (
            <span className="text-lg font-bold tracking-tight">
              BB<span className="text-crypto-solana">Solana</span>
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-primary-600/10 text-primary-400 border border-primary-500/20'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200 border border-transparent'
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-700/50 p-3">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition-colors">
            <LogOut className="h-5 w-5 shrink-0" />
            {sidebarOpen && <span>Log out</span>}
          </button>
        </div>
      </div>
    </aside>
  )
}
