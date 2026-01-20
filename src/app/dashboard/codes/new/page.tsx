'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { generateShortId } from '@/lib/utils/generate-short-id'
import { sanitizeUrl, validateUrl } from '@/lib/utils/validate-url'
import { ArrowLeft, Save, Sparkles, Globe, Tag, Info, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function NewQRCodePage() {
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const sanitizedUrl = sanitizeUrl(url)
        if (!validateUrl(sanitizedUrl)) {
            toast.error('Please enter a valid URL')
            setLoading(false)
            return
        }
        try {
            const shortId = generateShortId()
            const user = { id: 'guest-user-123' }

            const { error } = await supabase
                .from('qr_codes')
                .insert({
                    user_id: user.id,
                    name,
                    current_url: sanitizedUrl,
                    description,
                    short_id: shortId,
                    scan_count: 0,
                    is_active: true,
                })

            if (error) throw error

            toast.success('QR Code created successfully! (Database)')
            router.push('/dashboard/codes')
        } catch (error: any) {
            console.error('Error creating QR code:', error)
            toast.error(error.message || 'Failed to create QR code')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
            </Link>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-outfit font-bold">Create Dynamic QR</h1>
                    <p className="text-muted-foreground">Setup your new updatable QR code.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-6">
                    <form onSubmit={handleCreate} className="glass p-8 rounded-3xl border border-white/5 shadow-2xl space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                QR Code Name
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Marketing Campaign Summer 2026"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <p className="text-[10px] text-muted-foreground italic px-1">A descriptive name to help you identify this QR code later.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                Destination URL
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="https://example.com/promo"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                            <p className="text-[10px] text-muted-foreground italic px-1">Where the user will be redirected when they scan the code.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                <Info className="w-4 h-4" />
                                Description (Optional)
                            </label>
                            <textarea
                                placeholder="Add some notes about this campaign..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all min-h-[100px] resize-none"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-primary-foreground rounded-xl py-4 font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-primary/20 mt-4"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Generate Dynamic QR
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="glass p-8 rounded-3xl border border-primary/20 bg-primary/5 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                            <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold font-outfit mb-2">Pro Tip</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Dynamic QR codes use a short link that redirects to your URL. This allows you to update the destination anytime without changing the QR image!
                        </p>
                    </div>

                    <div className="glass p-6 rounded-3xl border border-white/5">
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                            <Info className="w-4 h-4 text-blue-400" />
                            Summary
                        </h4>
                        <ul className="space-y-3 text-xs text-muted-foreground">
                            <li className="flex justify-between">
                                <span>Type</span>
                                <span className="text-foreground font-medium">Dynamic Redirect</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Tracking</span>
                                <span className="text-foreground font-medium">Enabled</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Short ID</span>
                                <span className="text-foreground font-medium font-mono">Auto-generated</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
