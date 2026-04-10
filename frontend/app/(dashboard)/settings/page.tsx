'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Key, Plus, Trash2, Shield, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ApiKeyEntry {
  id: string
  exchange: string
  label: string
  maskedKey: string
  status: 'active' | 'error'
  addedAt: string
}

const mockKeys: ApiKeyEntry[] = [
  { id: '1', exchange: 'CoinSpot', label: 'Main Account', maskedKey: '****...3k9f', status: 'active', addedAt: '2024-01-15' },
  { id: '2', exchange: 'Binance', label: 'Trading Bot', maskedKey: '****...x8m2', status: 'active', addedAt: '2024-02-01' },
]

export default function SettingsPage() {
  const [showForm, setShowForm] = useState(false)
  const [exchange, setExchange] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [showSecret, setShowSecret] = useState(false)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Settings</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage your exchange API keys and preferences
          </p>
        </div>

        {/* API Keys */}
        <Card>
          <CardHeader>
            <CardTitle>Exchange API Keys</CardTitle>
            <Button size="sm" onClick={() => setShowForm(!showForm)}>
              <Plus className="mr-1.5 h-4 w-4" />
              Add Key
            </Button>
          </CardHeader>

          {/* Security notice */}
          <div className="mb-4 flex items-start gap-3 rounded-lg border border-primary-500/20 bg-primary-500/5 p-4">
            <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary-400" />
            <div className="text-sm">
              <p className="font-medium text-primary-300">Encrypted Storage</p>
              <p className="mt-0.5 text-gray-400">
                API keys are encrypted at rest using Fernet symmetric encryption and never leave your server.
              </p>
            </div>
          </div>

          {/* Add key form */}
          {showForm && (
            <div className="mb-4 space-y-3 rounded-lg border border-gray-700/50 bg-gray-800/30 p-4">
              <div>
                <label className="mb-1.5 block text-sm text-gray-400">Exchange</label>
                <select
                  value={exchange}
                  onChange={(e) => setExchange(e.target.value)}
                  className="w-full rounded-lg border border-gray-700/50 bg-gray-900/50 px-4 py-2.5 text-sm text-gray-200 focus:border-primary-500/50 focus:outline-none focus:ring-1 focus:ring-primary-500/30"
                >
                  <option value="">Select exchange</option>
                  <option value="coinspot">CoinSpot</option>
                  <option value="binance">Binance</option>
                  <option value="kraken">Kraken</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-gray-400">API Key</label>
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Paste your API key"
                  className="w-full rounded-lg border border-gray-700/50 bg-gray-900/50 px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:border-primary-500/50 focus:outline-none focus:ring-1 focus:ring-primary-500/30"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-gray-400">API Secret</label>
                <div className="relative">
                  <input
                    type={showSecret ? 'text' : 'password'}
                    value={apiSecret}
                    onChange={(e) => setApiSecret(e.target.value)}
                    placeholder="Paste your API secret"
                    className="w-full rounded-lg border border-gray-700/50 bg-gray-900/50 px-4 py-2.5 pr-10 text-sm text-gray-200 placeholder-gray-500 focus:border-primary-500/50 focus:outline-none focus:ring-1 focus:ring-primary-500/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecret(!showSecret)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm">Save Key</Button>
                <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Existing keys */}
          <div className="space-y-2">
            {mockKeys.map((k) => (
              <div
                key={k.id}
                className="flex items-center justify-between rounded-lg border border-gray-700/30 bg-gray-800/30 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary-500/10 p-2">
                    <Key className="h-4 w-4 text-primary-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-200">
                        {k.exchange}
                      </p>
                      <Badge variant={k.status === 'active' ? 'success' : 'danger'}>
                        {k.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">
                      {k.label} &middot; {k.maskedKey} &middot; Added {k.addedAt}
                    </p>
                  </div>
                </div>
                <button className="rounded-lg p-2 text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
