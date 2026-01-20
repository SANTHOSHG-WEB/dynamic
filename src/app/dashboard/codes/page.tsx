'use client'

import { useEffect, useState } from 'react'
import { Plus, Search, Filter, MoreVertical, QrCode, ArrowUpRight, Copy, Download, Trash2, Edit2, BarChart3, Globe } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { QRCode } from '@/lib/types'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function MyCodesPage() {
    const [codes, setCodes] = useState<QRCode[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const supabase = createClient()

    useEffect(() => {
        fetchCodes()
    }, [supabase])

    const fetchCodes = async () => {
        try {
            // Use guest ID for free mode
            const userId = 'guest-user-123'

            const { data, error } = await supabase
                .from('qr_codes')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })

            if (error) throw error
            setCodes(data || [])
        } catch (error: any) {
            console.error('Fetch error:', error)
            toast.error('Failed to load QR codes from database')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this QR code?')) return

        try {
            const { error } = await supabase.from('qr_codes').delete().eq('id', id)
            if (error) throw error
            toast.success('Deleted successfully (Database)')
            setCodes(codes.filter(c => c.id !== id))
        } catch (error: any) {
            toast.error('Failed to delete from database')
        }
    }

    const toggleStatus = async (code: QRCode) => {
        try {
            const { error } = await supabase
                .from('qr_codes')
                .update({ is_active: !code.is_active })
                .eq('id', code.id)

            if (error) throw error
            toast.success(`QR code ${!code.is_active ? 'activated' : 'deactivated'} (Database)`)
            setCodes(codes.map(c => c.id === code.id ? { ...c, is_active: !c.is_active } : c))
        } catch (error: any) {
            toast.error('Failed to update status in database')
        }
    }

    const copyLink = (shortId: string) => {
    }

    const filteredCodes = codes.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.current_url.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-outfit font-bold">My QR Codes</h1>
                    <p className="text-muted-foreground">Manage and track your dynamic links.</p>
                </div>
                <Link
                    href="/dashboard/codes/new"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                >
                    <Plus className="w-5 h-5" />
                    Create New Code
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search by name or URL..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-primary/50 transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-medium flex items-center gap-2 hover:bg-white/10 transition-colors">
                    <Filter className="w-5 h-5" />
                    Filter
                </button>
            </div>

            {filteredCodes.length === 0 ? (
                <div className="glass border border-dashed border-white/10 rounded-3xl p-20 text-center">
                    <QrCode className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-bold mb-2">No codes found</h3>
                    <p className="text-muted-foreground mb-6">Try a different search or create a new QR code.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {filteredCodes.map((code) => (
                        <div
                            key={code.id}
                            className="glass p-6 rounded-3xl border border-white/5 hover:border-primary/10 transition-all group relative overflow-hidden"
                        >
                            {/* Card Decoration */}
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />

                            <div className="flex flex-col md:flex-row gap-6">
                                {/* QR Preview Side */}
                                <div className="flex flex-col items-center gap-4 bg-white p-4 rounded-2xl w-full md:w-32 h-32 flex-shrink-0">
                                    <QrCode className="w-full h-full text-black" />
                                </div>

                                {/* Info Side */}
                                <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-bold text-lg truncate pr-4">{code.name}</h3>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => toggleStatus(code)}
                                                    className={cn(
                                                        "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border",
                                                        code.is_active
                                                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                                                            : "bg-red-500/10 text-red-400 border-red-500/20"
                                                    )}
                                                >
                                                    {code.is_active ? 'Active' : 'Paused'}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                                            <Globe className="w-3 h-3 flex-shrink-0" />
                                            <p className="truncate italic">{code.current_url}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <BarChart3 className="w-3.5 h-3.5" />
                                            <span className="font-medium">{code.scan_count} scans</span>
                                        </div>

                                        <div className="flex items-center gap-2 ml-auto">
                                            <button
                                                onClick={() => copyLink(code.short_id)}
                                                className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
                                                title="Copy Short Link"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </button>
                                            <Link
                                                href={`/dashboard/codes/${code.id}`}
                                                className="p-2 hover:bg-blue-500/10 hover:text-blue-400 rounded-lg transition-colors"
                                                title="Edit Code"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(code.id)}
                                                className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
                                                title="Delete Code"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
