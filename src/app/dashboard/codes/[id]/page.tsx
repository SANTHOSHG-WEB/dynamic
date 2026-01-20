'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LocalDB } from '@/lib/db/local-db'
import { createClient } from '@/lib/supabase/client'
import { sanitizeUrl, validateUrl } from '@/lib/utils/validate-url'
import { ArrowLeft, Save, Globe, Tag, Info, Loader2, Trash2, Power } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { QRCode } from '@/lib/types'
import QRCodeDisplay from '@/components/QRCodeDisplay'
import { cn } from '@/lib/utils'

export default function EditQRCodePage({
    params,
}: {
    params: { id: string }
}) {
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [active, setActive] = useState(true)
    const [code, setCode] = useState<QRCode | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const fetchCode = async () => {
            try {
                const { data, error } = await supabase
                    .from('qr_codes')
                    .select('*')
                    .eq('id', params.id)
                    .single()

                if (error || !data) throw new Error('Code not found')

                setCode(data)
                setName(data.name)
                setUrl(data.current_url)
                setDescription(data.description || '')
                setActive(data.is_active)
            } catch (error: any) {
                console.error('Fetch error:', error)
                toast.error('Failed to load QR code from database')
                router.push('/dashboard/codes')
            } finally {
                setLoading(false)
            }
        }

        fetchCode()
    }, [params.id, router, supabase])

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        const sanitizedUrl = sanitizeUrl(url)
        if (!validateUrl(sanitizedUrl)) {
            toast.error('Please enter a valid URL')
            setSaving(false)
            return
        }

        try {
            const { error } = await supabase
                .from('qr_codes')
                .update({
                    name,
                    current_url: sanitizedUrl,
                    description,
                    is_active: active,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', params.id)

            if (error) throw error

            toast.success('QR Code updated successfully! (Database)')
            router.push('/dashboard/codes')
        } catch (error: any) {
            toast.error(error.message || 'Failed to update QR code')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this QR code?')) return

        try {
            const { error } = await supabase.from('qr_codes').delete().eq('id', params.id)
            if (error) throw error
            toast.success('Deleted successfully (Database)')
            router.push('/dashboard/codes')
        } catch (error: any) {
            toast.error('Failed to delete')
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <Link
                    href="/dashboard/codes"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to My Codes
                </Link>
                <button
                    onClick={handleDelete}
                    className="text-destructive hover:bg-destructive/10 px-4 py-2 rounded-xl transition-colors text-sm font-bold flex items-center gap-2"
                >
                    <Trash2 className="w-4 h-4" />
                    Delete Code
                </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-outfit font-bold">Edit QR Code</h1>
                    <p className="text-muted-foreground">Modify settings for <span className="text-foreground font-semibold">{code?.name}</span></p>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-2 rounded-2xl">
                    <button
                        onClick={() => setActive(!active)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all",
                            active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                        )}
                    >
                        <Power className="w-4 h-4" />
                        {active ? 'Active' : 'Paused'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-7 space-y-6">
                    <form onSubmit={handleUpdate} className="glass p-8 rounded-3xl border border-white/5 shadow-2xl space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                QR Code Name
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                Destination URL
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                <Info className="w-4 h-4" />
                                Description
                            </label>
                            <textarea
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all min-h-[100px] resize-none"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full bg-primary text-primary-foreground rounded-xl py-4 font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-primary/20"
                        >
                            {saving ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="lg:col-span-5 space-y-8">
                    {code && (
                        <QRCodeDisplay
                            url={code.current_url}
                            name={name}
                            shortId={code.short_id}
                        />
                    )}

                    <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
                        <h4 className="font-bold flex items-center gap-2">
                            <Info className="w-4 h-4 text-primary" />
                            Statistics
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-2xl">
                                <p className="text-xs text-muted-foreground mb-1">Total Scans</p>
                                <p className="text-xl font-bold font-outfit">{code?.scan_count || 0}</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl">
                                <p className="text-xs text-muted-foreground mb-1">Created</p>
                                <p className="text-sm font-bold truncate">
                                    {code?.created_at ? new Date(code.created_at).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
