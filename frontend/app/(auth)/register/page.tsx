'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { TrendingUp, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { authApi } from '@/lib/api'

export default function RegisterPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await authApi.register(email, password, username)
      const res = await authApi.login(email, password)
      localStorage.setItem('token', res.data.access_token)
      router.push('/')
    } catch {
      setError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-crypto-solana to-primary-500">
            <TrendingUp className="h-7 w-7 text-gray-900" />
          </div>
          <h1 className="text-2xl font-bold">
            BB<span className="text-crypto-solana">Solana</span>
          </h1>
          <p className="mt-1 text-sm text-gray-400">Create your trading account</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-gray-700/50 bg-gray-800/50 p-8 backdrop-blur-sm"
        >
          {error && (
            <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Choose a username"
                  className="w-full rounded-lg border border-gray-700/50 bg-gray-900/50 py-2.5 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-500 focus:border-primary-500/50 focus:outline-none focus:ring-1 focus:ring-primary-500/30"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-700/50 bg-gray-900/50 py-2.5 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-500 focus:border-primary-500/50 focus:outline-none focus:ring-1 focus:ring-primary-500/30"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="Min 8 characters"
                  className="w-full rounded-lg border border-gray-700/50 bg-gray-900/50 py-2.5 pl-10 pr-10 text-sm text-gray-200 placeholder-gray-500 focus:border-primary-500/50 focus:outline-none focus:ring-1 focus:ring-primary-500/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <Button type="submit" loading={loading} className="mt-6 w-full">
            Create Account
          </Button>

          <p className="mt-4 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary-400 hover:text-primary-300">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
