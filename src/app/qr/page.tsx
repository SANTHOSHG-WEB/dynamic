'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { QrCode, AlertCircle, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { QRCode } from '@/lib/types'

function RedirectContent() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const [loading, setLoading] = useState(true)
    const [code, setCode] = useState<QRCode | null>(null)
    const [error, setError] = useState<string | null>(null)
    const supabase = createClient()

    useEffect(() => {
        if (!id) {
            setError('QR Code Not Found')
            setLoading(false)
            return
        }

        const fetchAndRedirect = async () => {
            try {
                // 1. Fetch the QR code record
                const { data, error } = await supabase
                    .from('qr_codes')
                    .select('*')
                    .eq('short_id', id)
                    .single()

                if (error || !data) {
                    setError('QR Code Not Found')
                    setLoading(false)
                    return
                }

                if (!data.is_active) {
                    setError('QR Code Inactive')
                    setCode(data)
                    setLoading(false)
                    return
                }

                // 2. Increment scan count
                await supabase
                    .from('qr_codes')
                    .update({
                        scan_count: (data.scan_count || 0) + 1,
                        last_scanned_at: new Date().toISOString()
                    })
                    .eq('id', data.id)

                // 3. Redirect to current URL
                window.location.href = data.current_url
            } catch (err) {
                console.error('Redirect error:', err)
                setError('An error occurred during redirection')
                setLoading(false)
            }
        }

        fetchAndRedirect()
    }, [id, supabase])

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-muted-foreground animate-pulse">Redirecting you to your destination...</p>
            </div>
        )
    }

    if (error === 'QR Code Not Found' || !id) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 text-center">
                <div className="max-w-md w-full glass p-10 rounded-3xl border border-white/10 space-y-6">
                    <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                        <AlertCircle className="w-10 h-10 text-destructive" />
                    </div>
                    <h1 className="text-2xl font-outfit font-bold">QR Code Not Found</h1>
                    <p className="text-muted-foreground">The QR code you scanned doesn't exist or may have been deleted.</p>
                    <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline">
                        Go to dynQR Home <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        )
    }

    if (error === 'QR Code Inactive' || !code?.is_active) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 text-center">
                <div className="max-w-md w-full glass p-10 rounded-3xl border border-white/10 space-y-6">
                    <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto">
                        <QrCode className="w-10 h-10 text-yellow-500" />
                    </div>
                    <h1 className="text-2xl font-outfit font-bold">QR Code Inactive</h1>
                    <p className="text-muted-foreground">This QR code has been temporarily disabled by the owner.</p>
                    <p className="text-xs text-muted-foreground italic">Try again later or contact the administrator.</p>
                </div>
            </div>
        )
    }

    return null
}

export default function QRRedirectPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
        }>
            <RedirectContent />
        </Suspense>
    )
}
