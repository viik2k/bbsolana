'use client'

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { formatCurrency, formatPercent } from '@/lib/utils'

const holdings = [
  { name: 'SOL', value: 12450, color: '#00FFA3', pct: 50.7 },
  { name: 'BTC', value: 6780, color: '#F7931A', pct: 27.6 },
  { name: 'ETH', value: 3890, color: '#627EEA', pct: 15.8 },
  { name: 'ADA', value: 980, color: '#0033AD', pct: 4.0 },
  { name: 'Other', value: 463, color: '#6B7280', pct: 1.9 },
]

interface TooltipPayloadItem {
  name: string
  value: number
  payload: { color: string; pct: number }
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayloadItem[] }) {
  if (!active || !payload?.length) return null
  const d = payload[0]
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 shadow-xl">
      <p className="text-sm font-medium text-gray-200">{d.name}</p>
      <p className="text-xs text-gray-400">
        {formatCurrency(d.value)} ({d.payload.pct}%)
      </p>
    </div>
  )
}

export function PortfolioCard() {
  const total = holdings.reduce((sum, h) => sum + h.value, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Allocation</CardTitle>
      </CardHeader>

      <div className="flex items-center gap-6">
        <div className="h-48 w-48 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={holdings}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {holdings.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-3">
          {holdings.map((h) => (
            <div key={h.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: h.color }}
                />
                <span className="text-sm text-gray-300">{h.name}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-200">
                  {formatCurrency(h.value)}
                </span>
                <span className="ml-2 text-xs text-gray-500">{h.pct}%</span>
              </div>
            </div>
          ))}

          <div className="border-t border-gray-700/50 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-400">Total</span>
              <span className="text-sm font-bold text-gray-100">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
