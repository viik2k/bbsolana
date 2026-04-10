'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { MarketTable } from '@/components/dashboard/MarketTable'
import { PriceChart } from '@/components/dashboard/PriceChart'
import { AISignalCard } from '@/components/dashboard/AISignalCard'

export default function MarketsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Markets</h1>
          <p className="mt-1 text-sm text-gray-400">
            Real-time market data with AI predictions
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <PriceChart />
          <AISignalCard />
        </div>

        <MarketTable />
      </div>
    </DashboardLayout>
  )
}
