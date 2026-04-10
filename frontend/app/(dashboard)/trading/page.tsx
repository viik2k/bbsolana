'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ArrowRightLeft, TrendingUp, TrendingDown, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/utils'

const recentTrades = [
  { id: '1', type: 'buy' as const, pair: 'SOL/USD', amount: 10, price: 142.30, total: 1423.00, time: '2 min ago' },
  { id: '2', type: 'sell' as const, pair: 'BTC/USD', amount: 0.05, price: 67100.00, total: 3355.00, time: '15 min ago' },
  { id: '3', type: 'buy' as const, pair: 'ETH/USD', amount: 2, price: 3420.50, total: 6841.00, time: '1 hr ago' },
  { id: '4', type: 'sell' as const, pair: 'SOL/USD', amount: 5, price: 148.90, total: 744.50, time: '3 hr ago' },
]

export default function TradingPage() {
  const [side, setSide] = useState<'buy' | 'sell'>('buy')
  const [amount, setAmount] = useState('')
  const [pair] = useState('SOL/USD')

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Paper Trading</h1>
          <p className="mt-1 text-sm text-gray-400">
            Practice trading with virtual funds
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Order form */}
          <Card>
            <CardHeader>
              <CardTitle>Place Order</CardTitle>
              <Badge variant="info">Paper</Badge>
            </CardHeader>

            <div className="space-y-4">
              {/* Buy/Sell toggle */}
              <div className="flex rounded-lg border border-gray-700/50 p-1">
                <button
                  onClick={() => setSide('buy')}
                  className={cn(
                    'flex-1 rounded-md py-2 text-sm font-medium transition-colors',
                    side === 'buy'
                      ? 'bg-green-500/20 text-green-400'
                      : 'text-gray-400 hover:text-gray-200'
                  )}
                >
                  Buy
                </button>
                <button
                  onClick={() => setSide('sell')}
                  className={cn(
                    'flex-1 rounded-md py-2 text-sm font-medium transition-colors',
                    side === 'sell'
                      ? 'bg-red-500/20 text-red-400'
                      : 'text-gray-400 hover:text-gray-200'
                  )}
                >
                  Sell
                </button>
              </div>

              {/* Pair */}
              <div>
                <label className="mb-1.5 block text-sm text-gray-400">Pair</label>
                <div className="rounded-lg border border-gray-700/50 bg-gray-900/50 px-4 py-2.5 text-sm text-gray-200">
                  {pair}
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="mb-1.5 block text-sm text-gray-400">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full rounded-lg border border-gray-700/50 bg-gray-900/50 px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:border-primary-500/50 focus:outline-none focus:ring-1 focus:ring-primary-500/30"
                />
              </div>

              {/* Price */}
              <div>
                <label className="mb-1.5 block text-sm text-gray-400">Market Price</label>
                <div className="rounded-lg border border-gray-700/50 bg-gray-900/50 px-4 py-2.5 text-sm text-gray-200">
                  $145.67
                </div>
              </div>

              {/* Total */}
              <div className="rounded-lg border border-gray-700/30 bg-gray-800/30 p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Estimated Total</span>
                  <span className="font-semibold text-gray-200">
                    {formatCurrency(Number(amount || 0) * 145.67)}
                  </span>
                </div>
              </div>

              <Button
                className="w-full"
                variant={side === 'buy' ? 'primary' : 'danger'}
              >
                {side === 'buy' ? 'Buy' : 'Sell'} SOL
              </Button>
            </div>
          </Card>

          {/* Recent trades */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Trades</CardTitle>
                <Badge variant="neutral">Paper Portfolio</Badge>
              </CardHeader>

              <div className="space-y-2">
                {recentTrades.map((trade) => (
                  <div
                    key={trade.id}
                    className="flex items-center justify-between rounded-lg border border-gray-700/30 bg-gray-800/30 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'rounded-lg p-2',
                          trade.type === 'buy'
                            ? 'bg-green-500/10'
                            : 'bg-red-500/10'
                        )}
                      >
                        {trade.type === 'buy' ? (
                          <TrendingUp className="h-4 w-4 text-green-400" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-200">
                          {trade.type.toUpperCase()} {trade.pair}
                        </p>
                        <p className="text-xs text-gray-500">
                          {trade.amount} @ {formatCurrency(trade.price)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-200">
                        {formatCurrency(trade.total)}
                      </p>
                      <div className="flex items-center justify-end gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {trade.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
