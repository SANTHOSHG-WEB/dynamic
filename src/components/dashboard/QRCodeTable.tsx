'use client'

import { QRCode } from '@/lib/types'
import {
    MoreVertical,
    Copy,
    Edit2,
    Trash2,
    BarChart3,
    Globe,
    ExternalLink,
    QrCode
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface QRCodeTableProps {
    codes: QRCode[]
    onDelete: (id: string) => void
    onCopy: (shortId: string) => void
    onToggle: (code: QRCode) => void
}

export default function QRCodeTable({ codes, onDelete, onCopy, onToggle }: QRCodeTableProps) {
    return (
        <div className="w-full overflow-x-auto glass rounded-3xl border border-white/5">
            <table className="w-full text-left border-collapse">
                <thead className="bg-white/5">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Destination</th>
                        <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Scans</th>
                        <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {codes.map((code) => (
                        <tr key={code.id} className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                                        <QrCode className="w-6 h-6 text-black" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold truncate max-w-[150px]">{code.name}</p>
                                        <p className="text-[10px] text-muted-foreground font-mono">/{code.short_id}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Globe className="w-3 h-3 flex-shrink-0" />
                                    <span className="truncate max-w-[200px]">{code.current_url}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => onToggle(code)}
                                    className={cn(
                                        "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border",
                                        code.is_active
                                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                                            : "bg-red-500/10 text-red-400 border-red-500/20"
                                    )}
                                >
                                    {code.is_active ? 'Active' : 'Paused'}
                                </button>
                            </td>
                            <td className="px-6 py-4 font-outfit font-bold">
                                {code.scan_count}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => onCopy(code.short_id)}
                                        className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                    <Link
                                        href={`/dashboard/codes/${code.id}`}
                                        className="p-2 hover:bg-blue-500/10 hover:text-blue-400 rounded-lg transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => onDelete(code.id)}
                                        className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
