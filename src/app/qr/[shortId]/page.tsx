import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { QrCode, AlertCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function QRRedirectPage({
    params,
}: {
    params: { shortId: string }
}) {
    const { shortId } = params
    const supabase = await createClient()

    // 1. Fetch the QR code record
    const { data: code, error } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('short_id', shortId)
        .single()

    if (error || !code) {
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

    // 2. Check if active
    if (!code.is_active) {
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

    // 3. Increment scan count (asynchronously)
    // We can use a RPC or just an update since we are in a server component
    await supabase
        .from('qr_codes')
        .update({
            scan_count: (code.scan_count || 0) + 1,
            last_scanned_at: new Date().toISOString()
        })
        .eq('id', code.id)

    // 4. Redirect to current URL
    redirect(code.current_url)
}
