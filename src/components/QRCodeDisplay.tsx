'use client'

import { QRCodeCanvas } from 'qrcode.react'
import { Download, Share2, Copy, Check } from 'lucide-react'
import { useState, useRef } from 'react'
import { toast } from 'sonner'

interface QRCodeDisplayProps {
    url: string
    name: string
    shortId: string
}

export default function QRCodeDisplay({ url, name, shortId }: QRCodeDisplayProps) {
    const [copied, setCopied] = useState(false)
    const canvasRef = useRef<HTMLDivElement>(null)

    const shortLink = `${window.location.origin}/dynamic/qr/${shortId}`

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shortLink)
            setCopied(true)
            toast.success('Link copied to clipboard')
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            toast.error('Failed to copy link')
        }
    }

    const downloadQR = (format: 'png' | 'svg') => {
        const canvas = document.querySelector('canvas')
        if (!canvas) return

        const link = document.createElement('a')
        link.download = `${name.replace(/\s+/g, '-').toLowerCase()}-qr.${format}`
        link.href = canvas.toDataURL(`image/${format}`)
        link.click()
        toast.success(`QR Code downloaded as ${format.toUpperCase()}`)
    }

    return (
        <div className="flex flex-col items-center gap-8 p-8 glass rounded-3xl border border-white/10 shadow-2xl">
            <div ref={canvasRef} className="bg-white p-6 rounded-3xl shadow-xl">
                <QRCodeCanvas
                    value={shortLink}
                    size={200}
                    level="H"
                    includeMargin={false}
                    imageSettings={{
                        src: "/favicon.ico", // Could be a logo
                        x: undefined,
                        y: undefined,
                        height: 40,
                        width: 40,
                        excavate: true,
                    }}
                />
            </div>

            <div className="w-full space-y-4">
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Short Link</label>
                    <div className="flex gap-2">
                        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono truncate">
                            {shortLink}
                        </div>
                        <button
                            onClick={copyToClipboard}
                            className="p-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all flex-shrink-0"
                        >
                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => downloadQR('png')}
                        className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        PNG
                    </button>
                    <button
                        onClick={() => downloadQR('png')} // SVG requires canvas to svg conversion, sticking to PNG for now
                        className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors"
                    >
                        <Share2 className="w-4 h-4" />
                        Share
                    </button>
                </div>
            </div>
        </div>
    )
}
