'use client'

import { useEffect, useState } from 'react'
import { Plus, QrCode, TrendingUp, MousePointer2, Activity, ArrowUpRight, BarChart } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { QRCode, DashboardStats } from '@/lib/types'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
    const [stats, setStats] = useState<DashboardStats>({
        totalCodes: 0,
        totalScans: 0,
        activeCodes: 0,
    })
    const [recentCodes, setRecentCodes] = useState<QRCode[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                const { data: { user } } = await supabase.auth.getUser()

                let codes: QRCode[] = []

                if (user) {
                    const { data, error: codesError } = await supabase
                        .from('qr_codes')
                        .select('*')
                        .eq('user_id', user.id)
                        .order('created_at', { ascending: false })

                    if (codesError) throw codesError
                    codes = data || []
                } else {
                    // DEMO MODE: Fallback to mock data
                    const { MOCK_QR_CODES } = await import('@/lib/db/mock-db')
                    codes = MOCK_QR_CODES
                }

                if (codes) {
                    const totalScans = codes.reduce((acc, code) => acc + (code.scan_count || 0), 0)
                    const activeCodes = codes.filter(c => c.is_active).length

                    setStats({
                        totalCodes: codes.length,
                        totalScans,
                        activeCodes,
                    })
                    setRecentCodes(codes.slice(0, 5))
                }
            } catch (error: any) {
                console.error('Error fetching dashboard data:', error)
                toast.error('Failed to load dashboard data')
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [supabase])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="space-y-10">
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-outfit font-bold">Dashboard Overview</h1>
                    <p className="text-muted-foreground">Monitor and manage your dynamic QR performance.</p>
                </div>
                <Link
                    href="/dashboard/codes/new"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                >
                    <Plus className="w-5 h-5" />
                    Create QR Code
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="glass p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <QrCode className="w-20 h-20 text-primary" />
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <QrCode className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Codes</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-outfit font-bold">{stats.totalCodes}</h3>
                        <div className="flex items-center gap-1 text-xs text-green-400 font-medium">
                            <TrendingUp className="w-3 h-3" />
                            <span>+12%</span>
                        </div>
                    </div>
                </div>

                <div className="glass p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <MousePointer2 className="w-20 h-20 text-blue-400" />
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                            <MousePointer2 className="w-6 h-6 text-blue-400" />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Scans</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-outfit font-bold">{stats.totalScans}</h3>
                        <div className="flex items-center gap-1 text-xs text-green-400 font-medium">
                            <TrendingUp className="w-3 h-3" />
                            <span>+5.2%</span>
                        </div>
                    </div>
                </div>

                <div className="glass p-6 rounded-3xl border border-white/5 relative overflow-hidden group sm:col-span-2 lg:col-span-1">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity className="w-20 h-20 text-green-400" />
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center">
                            <Activity className="w-6 h-6 text-green-400" />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active Status</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-outfit font-bold">{stats.activeCodes}</h3>
                        <div className="text-xs font-medium text-muted-foreground">
                            {stats.activeCodes} of {stats.totalCodes} active
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent QR Codes */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-outfit font-bold">Recent QR Codes</h2>
                    <Link href="/dashboard/codes" className="text-sm text-primary hover:underline flex items-center gap-1">
                        View All <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                {recentCodes.length === 0 ? (
                    <div className="glass border border-dashed border-white/10 rounded-3xl p-12 text-center">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <QrCode className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">No QR codes yet</h3>
                        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">Create your first dynamic QR code to start tracking your assets.</p>
                        <Link
                            href="/dashboard/codes/new"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors"
                        >
                            Get Started
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recentCodes.map((code) => (
                            <div
                                key={code.id}
                                className="glass p-6 rounded-3xl border border-white/5 hover:border-primary/20 transition-all group"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="p-3 bg-white rounded-2xl">
                                        <QrCode className="w-8 h-8 text-black" />
                                    </div>
                                    <div className={cn(
                                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                        code.is_active ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                                    )}>
                                        {code.is_active ? 'Active' : 'Inactive'}
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg mb-1 truncate">{code.name}</h3>
                                <p className="text-sm text-muted-foreground truncate mb-4">{code.current_url}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <BarChart className="w-4 h-4" />
                                        <span className="text-sm font-medium">{code.scan_count || 0} scans</span>
                                    </div>
                                    <Link
                                        href={`/dashboard/codes/${code.id}`}
                                        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                                    >
                                        <ArrowUpRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
