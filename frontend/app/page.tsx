'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { QuickStats } from '@/components/dashboard/QuickStats'
import { PriceChart } from '@/components/dashboard/PriceChart'
import { AISignalCard } from '@/components/dashboard/AISignalCard'
import { MarketTable } from '@/components/dashboard/MarketTable'
import { PortfolioCard } from '@/components/dashboard/PortfolioCard'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-400">
            AI-powered crypto insights at a glance
          </p>
        </div>

        {/* Quick stats row */}
        <QuickStats />

        {/* Main content grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Chart takes 2 cols */}
          <PriceChart />
          {/* AI signals takes 1 col */}
          <AISignalCard />
        </div>

        {/* Portfolio and Market table */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MarketTable />
          </div>
          <PortfolioCard />
        </div>
      </div>
    </DashboardLayout>
  )
}
