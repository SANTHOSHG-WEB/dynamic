import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
    title: string
    value: string | number
    icon: LucideIcon
    description?: string
    trend?: {
        value: string
        positive: boolean
    }
    color?: string
}

export default function StatsCard({
    title,
    value,
    icon: Icon,
    description,
    trend,
    color = "text-primary"
}: StatsCardProps) {
    return (
        <div className="glass p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon className={cn("w-20 h-20", color)} />
            </div>
            <div className="flex items-center gap-4 mb-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", color.replace('text-', 'bg-').concat('/10'))}>
                    <Icon className={cn("w-6 h-6", color)} />
                </div>
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</span>
            </div>
            <div className="flex items-end justify-between">
                <h3 className="text-4xl font-outfit font-bold">{value}</h3>
                {trend && (
                    <div className={cn(
                        "flex items-center gap-1 text-xs font-medium",
                        trend.positive ? "text-green-400" : "text-red-400"
                    )}>
                        <span>{trend.value}</span>
                    </div>
                )}
            </div>
            {description && (
                <p className="mt-2 text-xs text-muted-foreground">{description}</p>
            )}
        </div>
    )
}
