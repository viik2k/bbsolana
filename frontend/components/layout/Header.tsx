'use client'

import { Menu, Bell, Search, ChevronDown } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export function Header() {
  const { sidebarOpen, toggleSidebar, user } = useAppStore()

  return (
    <header
      className={cn(
        'fixed top-0 z-30 flex h-16 items-center justify-between border-b border-gray-700/50 bg-gray-900/80 backdrop-blur-md px-6 transition-all duration-300',
        sidebarOpen ? 'left-64' : 'left-20',
        'right-0'
      )}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search markets, tokens..."
            className="w-80 rounded-lg border border-gray-700/50 bg-gray-800/50 py-2 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-500 focus:border-primary-500/50 focus:outline-none focus:ring-1 focus:ring-primary-500/30"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Live indicator */}
        <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-medium text-green-400">Live</span>
        </div>

        {/* Notifications */}
        <button className="relative rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary-500" />
        </button>

        {/* User menu */}
        <button className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-800 transition-colors">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary-500 to-crypto-solana" />
          <span className="hidden md:inline">{user?.username || 'Trader'}</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
      </div>
    </header>
  )
}
