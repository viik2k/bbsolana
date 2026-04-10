'use client'

import { TrendingUp, TrendingDown, Star } from 'lucide-react'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import { formatCurrency, formatPercent, formatCompact } from '@/lib/utils'

interface MarketRow {
  rank: number
  name: string
  symbol: string
  price: number
  change24h: number
  change7d: number
  marketCap: number
  volume24h: number
  color: string
  starred: boolean
}

const markets: MarketRow[] = [
  { rank: 1, name: 'Bitcoin', symbol: 'BTC', price: 67234.56, change24h: 2.34, change7d: 5.67, marketCap: 1320000000000, volume24h: 28000000000, color: '#F7931A', starred: true },
  { rank: 2, name: 'Ethereum', symbol: 'ETH', price: 3456.78, change24h: -1.23, change7d: 3.45, marketCap: 415000000000, volume24h: 15000000000, color: '#627EEA', starred: true },
  { rank: 3, name: 'Solana', symbol: 'SOL', price: 145.67, change24h: 5.23, change7d: 12.34, marketCap: 63000000000, volume24h: 3200000000, color: '#00FFA3', starred: true },
  { rank: 4, name: 'Cardano', symbol: 'ADA', price: 0.62, change24h: -0.87, change7d: -2.34, marketCap: 22000000000, volume24h: 890000000, color: '#0033AD', starred: false },
  { rank: 5, name: 'Polkadot', symbol: 'DOT', price: 8.45, change24h: 1.56, change7d: -1.23, marketCap: 11000000000, volume24h: 450000000, color: '#E6007A', starred: false },
  { rank: 6, name: 'Avalanche', symbol: 'AVAX', price: 38.92, change24h: 3.12, change7d: 8.45, marketCap: 14500000000, volume24h: 620000000, color: '#E84142', starred: false },
]

function ChangeCell({ value }: { value: number }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 text-sm font-medium',
        value >= 0 ? 'text-green-400' : 'text-red-400'
      )}
    >
      {value >= 0 ? (
        <TrendingUp className="h-3.5 w-3.5" />
      ) : (
        <TrendingDown className="h-3.5 w-3.5" />
      )}
      {formatPercent(value)}
    </span>
  )
}

export function MarketTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Markets</CardTitle>
        <Badge variant="neutral">Live</Badge>
      </CardHeader>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700/50">
              <th className="pb-3 pr-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
              <th className="pb-3 pr-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="pb-3 pr-3 text-right text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="pb-3 pr-3 text-right text-xs font-medium text-gray-500 uppercase">24h</th>
              <th className="pb-3 pr-3 text-right text-xs font-medium text-gray-500 uppercase hidden md:table-cell">7d</th>
              <th className="pb-3 pr-3 text-right text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Market Cap</th>
              <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Volume (24h)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/30">
            {markets.map((m) => (
              <tr
                key={m.symbol}
                className="group transition-colors hover:bg-gray-800/40 cursor-pointer"
              >
                <td className="py-4 pr-3">
                  <div className="flex items-center gap-2">
                    <Star
                      className={cn(
                        'h-3.5 w-3.5 cursor-pointer transition-colors',
                        m.starred
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-600 group-hover:text-gray-400'
                      )}
                    />
                    <span className="text-sm text-gray-500">{m.rank}</span>
                  </div>
                </td>
                <td className="py-4 pr-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-8 w-8 rounded-full"
                      style={{ backgroundColor: m.color + '20', border: `2px solid ${m.color}` }}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-200">{m.name}</p>
                      <p className="text-xs text-gray-500">{m.symbol}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 pr-3 text-right">
                  <span className="text-sm font-semibold text-gray-200">
                    {formatCurrency(m.price)}
                  </span>
                </td>
                <td className="py-4 pr-3 text-right">
                  <ChangeCell value={m.change24h} />
                </td>
                <td className="py-4 pr-3 text-right hidden md:table-cell">
                  <ChangeCell value={m.change7d} />
                </td>
                <td className="py-4 pr-3 text-right hidden lg:table-cell">
                  <span className="text-sm text-gray-400">${formatCompact(m.marketCap)}</span>
                </td>
                <td className="py-4 text-right hidden lg:table-cell">
                  <span className="text-sm text-gray-400">${formatCompact(m.volume24h)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
