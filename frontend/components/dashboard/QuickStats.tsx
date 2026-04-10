'use client'

import { TrendingUp, TrendingDown, DollarSign, BarChart3, Brain, Zap } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import { formatCurrency, formatPercent } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string
  change?: number
  icon: React.ElementType
  iconColor: string
}

function StatCard({ title, value, change, icon: Icon, iconColor }: StatCardProps) {
  return (
    <Card hover>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-100">{value}</p>
          {change !== undefined && (
            <div className="mt-2 flex items-center gap-1">
              {change >= 0 ? (
                <TrendingUp className="h-3.5 w-3.5 text-green-400" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-red-400" />
              )}
              <span
                className={cn(
                  'text-sm font-medium',
                  change >= 0 ? 'text-green-400' : 'text-red-400'
                )}
              >
                {formatPercent(change)}
              </span>
              <span className="text-xs text-gray-500">24h</span>
            </div>
          )}
        </div>
        <div className={cn('rounded-lg p-2.5', iconColor)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  )
}

// Demo data for initial UI
const stats = [
  {
    title: 'Portfolio Value',
    value: formatCurrency(24563.89),
    change: 5.23,
    icon: DollarSign,
    iconColor: 'bg-green-500/10 text-green-400',
  },
  {
    title: 'Total P&L',
    value: formatCurrency(3241.56),
    change: 12.4,
    icon: TrendingUp,
    iconColor: 'bg-blue-500/10 text-blue-400',
  },
  {
    title: '24h Volume',
    value: '$1.2T',
    change: -2.1,
    icon: BarChart3,
    iconColor: 'bg-purple-500/10 text-purple-400',
  },
  {
    title: 'AI Confidence',
    value: '87%',
    change: 3.2,
    icon: Brain,
    iconColor: 'bg-crypto-solana/10 text-crypto-solana',
  },
]

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}
