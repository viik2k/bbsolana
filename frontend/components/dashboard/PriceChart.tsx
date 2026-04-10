'use client'

import { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const timeRanges = ['1H', '1D', '1W', '1M', '3M', '1Y'] as const

// Generate demo chart data
function generateData(points: number, base: number, volatility: number) {
  const data = []
  let price = base
  const now = Date.now()
  for (let i = 0; i < points; i++) {
    price += (Math.random() - 0.47) * volatility
    price = Math.max(price * 0.95, price)
    data.push({
      time: new Date(now - (points - i) * 3600000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      price: Math.round(price * 100) / 100,
      prediction: i > points * 0.75
        ? Math.round((price + (Math.random() - 0.4) * volatility * 2) * 100) / 100
        : undefined,
    })
  }
  return data
}

const chartData = generateData(48, 145.5, 3.2)

interface TooltipPayloadItem {
  name: string
  value: number
  color: string
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-3 shadow-xl">
      <p className="text-xs text-gray-400">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name}: ${entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export function PriceChart() {
  const [activeRange, setActiveRange] = useState<typeof timeRanges[number]>('1D')

  return (
    <Card className="col-span-2">
      <CardHeader>
        <div>
          <CardTitle>SOL / USD</CardTitle>
          <div className="mt-1 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-100">$145.67</span>
            <span className="text-sm font-medium text-green-400">+5.23%</span>
          </div>
        </div>
        <div className="flex gap-1">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={cn(
                'rounded-md px-3 py-1 text-xs font-medium transition-colors',
                activeRange === range
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </CardHeader>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00FFA3" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00FFA3" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="predictionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="time"
              stroke="#6B7280"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#6B7280"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `$${val}`}
              domain={['auto', 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              name="Price"
              stroke="#00FFA3"
              strokeWidth={2}
              fill="url(#priceGradient)"
            />
            <Area
              type="monotone"
              dataKey="prediction"
              name="AI Prediction"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="url(#predictionGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 bg-crypto-solana" />
          <span>Price</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 border-t-2 border-dashed border-blue-500" />
          <span>Kronos AI Prediction</span>
        </div>
      </div>
    </Card>
  )
}
