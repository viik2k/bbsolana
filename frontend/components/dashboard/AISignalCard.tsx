'use client'

import { Brain, TrendingUp, TrendingDown, Minus, Clock } from 'lucide-react'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

interface Signal {
  token: string
  symbol: string
  signal: 'buy' | 'sell' | 'hold'
  confidence: number
  predictedChange: number
  timeframe: string
  model: string
}

const signals: Signal[] = [
  {
    token: 'Solana',
    symbol: 'SOL',
    signal: 'buy',
    confidence: 87,
    predictedChange: 8.4,
    timeframe: '24h',
    model: 'Kronos-mini',
  },
  {
    token: 'Bitcoin',
    symbol: 'BTC',
    signal: 'hold',
    confidence: 72,
    predictedChange: 1.2,
    timeframe: '24h',
    model: 'Kronos-mini',
  },
  {
    token: 'Ethereum',
    symbol: 'ETH',
    signal: 'buy',
    confidence: 78,
    predictedChange: 5.1,
    timeframe: '24h',
    model: 'Kronos-mini',
  },
  {
    token: 'Cardano',
    symbol: 'ADA',
    signal: 'sell',
    confidence: 65,
    predictedChange: -3.8,
    timeframe: '24h',
    model: 'Kronos-mini',
  },
]

const signalConfig = {
  buy: { color: 'text-green-400', bg: 'bg-green-500/10', icon: TrendingUp, badge: 'success' as const },
  sell: { color: 'text-red-400', bg: 'bg-red-500/10', icon: TrendingDown, badge: 'danger' as const },
  hold: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', icon: Minus, badge: 'warning' as const },
}

export function AISignalCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Signals</CardTitle>
        <Badge variant="info">
          <Brain className="mr-1 h-3 w-3" />
          Kronos
        </Badge>
      </CardHeader>

      <div className="space-y-3">
        {signals.map((signal) => {
          const config = signalConfig[signal.signal]
          const Icon = config.icon
          return (
            <div
              key={signal.symbol}
              className="flex items-center justify-between rounded-lg border border-gray-700/30 bg-gray-800/30 p-3 transition-colors hover:bg-gray-800/60"
            >
              <div className="flex items-center gap-3">
                <div className={cn('rounded-lg p-2', config.bg)}>
                  <Icon className={cn('h-4 w-4', config.color)} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-200">{signal.token}</p>
                  <p className="text-xs text-gray-500">{signal.symbol}</p>
                </div>
              </div>

              <div className="text-right">
                <Badge variant={config.badge}>
                  {signal.signal.toUpperCase()}
                </Badge>
                <div className="mt-1 flex items-center justify-end gap-1">
                  <span className="text-xs text-gray-500">Confidence:</span>
                  <span className={cn('text-xs font-semibold', config.color)}>
                    {signal.confidence}%
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-500">
        <Clock className="h-3 w-3" />
        <span>Updated 2 min ago</span>
      </div>
    </Card>
  )
}
