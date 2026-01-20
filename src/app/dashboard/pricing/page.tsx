'use client'

import { Check, Sparkles, Zap, Shield, Crown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const plans = [
    {
        id: 'FREE',
        name: 'Free',
        price: '₹0',
        description: 'Perfect for individuals starting out.',
        features: [
            '5 Dynamic QR Codes',
            'Basic Analytics',
            'Standard Support',
            'dynQR Branding',
        ],
        icon: Zap,
        color: 'text-blue-400',
        bg: 'bg-blue-400/10',
        border: 'border-blue-400/20',
    },
    {
        id: 'PRO',
        name: 'Pro',
        price: '₹299',
        period: '/month',
        description: 'Advanced features for power users.',
        features: [
            'Unlimited QR Codes',
            'Advanced Analytics',
            'Priority Support',
            'Custom QR Styling',
            'No dynQR Branding',
            'API Access (Early)',
        ],
        icon: Crown,
        color: 'text-primary',
        bg: 'bg-primary/10',
        border: 'border-primary/20',
        popular: true,
    },
    {
        id: 'BUSINESS',
        name: 'Business',
        price: '₹999',
        period: '/month',
        description: 'Scalable solutions for teams.',
        features: [
            'Everything in Pro',
            'Team Collaboration',
            'White-label Solution',
            'Dedicated Manager',
            'Bulk Operations',
            'SLA Guarantee',
        ],
        icon: Shield,
        color: 'text-green-400',
        bg: 'bg-green-400/10',
        border: 'border-green-400/20',
    },
]

export default function PricingPage() {
    const handleUpgrade = (planId: string) => {
        if (planId === 'FREE') {
            toast.info('You are already on the Free plan.')
            return
        }
        toast.success(`Redirecting to payment for ${planId} plan... (Prepared for Razorpay)`)
    }

    return (
        <div className="space-y-12 pb-20">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-outfit font-bold">Pick your <span className="gradient-text">Power Plan</span></h1>
                <p className="text-muted-foreground max-w-2xl mx-auto italic">
                    Choose the plan that fits your needs. Upgrade or downgrade anytime.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className={cn(
                            "glass p-8 rounded-[2.5rem] border transition-all hover:scale-[1.02] duration-300 relative overflow-hidden flex flex-col",
                            plan.popular ? "border-primary/50 shadow-2xl shadow-primary/10 ring-1 ring-primary/20" : "border-white/5",
                            plan.popular ? "bg-primary/5" : ""
                        )}
                    >
                        {plan.popular && (
                            <div className="absolute top-6 right-6 px-3 py-1 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                Most Popular
                            </div>
                        )}

                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", plan.bg)}>
                            <plan.icon className={cn("w-7 h-7", plan.color)} />
                        </div>

                        <h3 className="text-2xl font-bold font-outfit mb-2">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{plan.description}</p>

                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-4xl font-outfit font-extrabold">{plan.price}</span>
                            {plan.period && <span className="text-muted-foreground font-medium">{plan.period}</span>}
                        </div>

                        <ul className="space-y-4 flex-1 mb-8">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm">
                                    <div className={cn("mt-1 p-0.5 rounded-full flex-shrink-0", plan.bg)}>
                                        <Check className={cn("w-3 h-3", plan.color)} />
                                    </div>
                                    <span className="text-foreground/80">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handleUpgrade(plan.id)}
                            className={cn(
                                "w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group",
                                plan.popular
                                    ? "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20"
                                    : "bg-white/5 border border-white/10 hover:bg-white/10"
                            )}
                        >
                            {plan.id === 'FREE' ? 'Current Plan' : `Upgrade to ${plan.name}`}
                            {plan.id !== 'FREE' && <Zap className="w-4 h-4 group-hover:fill-current transition-all" />}
                        </button>
                    </div>
                ))}
            </div>

            <div className="max-w-3xl mx-auto glass p-8 rounded-3xl border border-white/5 text-center mt-20">
                <h3 className="text-xl font-bold mb-4">Enterprise Needs?</h3>
                <p className="text-muted-foreground text-sm mb-6">
                    If you need more than our standard plans offer, contact our sales team for custom solutions, bulk pricing, and white-labeled services.
                </p>
                <button className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors">
                    Contact Sales
                </button>
            </div>
        </div>
    )
}
