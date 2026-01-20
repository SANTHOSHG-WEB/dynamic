'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    QrCode,
    BarChart3,
    Settings,
    CreditCard,
    LogOut,
    Menu,
    X,
    PlusCircle,
    ChevronRight
} from 'lucide-react'
import { useAuth } from '@/lib/auth/auth-context'
import { cn } from '@/lib/utils'

const sidebarItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Codes', href: '/dashboard/codes', icon: QrCode },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const pathname = usePathname()
    const { user, signOut } = useAuth()

    const displayEmail = user?.email || 'demo@dynqr.com'
    const displayInitial = displayEmail.charAt(0).toUpperCase()

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex w-72 border-r border-white/5 flex-col sticky top-0 h-screen bg-black/20 backdrop-blur-sm">
                <div className="p-8 flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <QrCode className="w-6 h-6" />
                    </div>
                    <span className="font-outfit font-bold text-xl tracking-tight">dynQR</span>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                                    isActive
                                        ? "bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5", isActive ? "" : "group-hover:text-primary transition-colors")} />
                                {item.name}
                                {isActive && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-white/5 space-y-4">
                    <Link
                        href="/dashboard/codes/new"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors shadow-lg"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Create New
                    </Link>

                    {/* Sign Out removed for Free Mode */}
                </div>
            </aside >

            {/* Main Content */}
            < main className="flex-1 flex flex-col min-h-screen" >
                {/* Mobile Header */}
                < header className="lg:hidden h-16 border-b border-white/5 flex items-center justify-between px-4 bg-background/80 backdrop-blur-md sticky top-0 z-40" >
                    <div className="flex items-center gap-2">
                        <QrCode className="w-6 h-6 text-primary" />
                        <span className="font-outfit font-bold text-lg tracking-tight">dynQR</span>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-muted-foreground hover:text-foreground"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </header >

                {/* Desktop Header / Top Bar */}
                < header className="hidden lg:flex h-20 items-center justify-between px-10 border-b border-white/5 bg-background/50 backdrop-blur-sm sticky top-0 z-40" >
                    <h2 className="text-xl font-outfit font-bold capitalize">
                        {sidebarItems.find(i => i.href === pathname)?.name || 'Dashboard'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium">{displayEmail}</p>
                            <p className="text-xs text-primary font-bold px-2 py-0.5 bg-primary/10 rounded-full inline-block">Pro Unlimited</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-500 border border-white/10 flex items-center justify-center font-bold text-white shadow-lg">
                            {displayInitial}
                        </div>
                    </div>
                </header >

                <div className="flex-1 p-6 md:p-10 container mx-auto">
                    {children}
                </div>
            </main >

            {/* Mobile Sidebar Overlay */}
            {
                isSidebarOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
                        <aside className="absolute left-0 top-0 bottom-0 w-80 bg-background border-r border-white/10 p-6 flex flex-col animate-in slide-in-from-left duration-300">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2">
                                    <QrCode className="w-6 h-6 text-primary" />
                                    <span className="font-outfit font-bold text-xl tracking-tight">dynQR</span>
                                </div>
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="p-2 text-muted-foreground hover:text-foreground"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <nav className="flex-1 space-y-1">
                                {sidebarItems.map((item) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsSidebarOpen(false)}
                                            className={cn(
                                                "flex items-center gap-3 px-4 py-4 rounded-xl transition-all",
                                                isActive
                                                    ? "bg-primary text-primary-foreground font-semibold"
                                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                            )}
                                        >
                                            <item.icon className="w-5 h-5" />
                                            {item.name}
                                        </Link>
                                    )
                                })}
                            </nav>

                            <div className="border-t border-white/10 pt-6 mt-6">
                                <button
                                    onClick={signOut}
                                    className="flex items-center gap-3 w-full px-4 py-4 text-muted-foreground hover:text-destructive transition-colors rounded-xl hover:bg-destructive/5"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Sign Out
                                </button>
                            </div>
                        </aside>
                    </div>
                )
            }
        </div >
    )
}
