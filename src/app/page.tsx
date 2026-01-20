'use client'

import Link from "next/link";
import { ArrowRight, QrCode, BarChart3, Zap, Shield, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <QrCode className="w-6 h-6 text-primary" />
            </div>
            <span className="font-outfit font-bold text-xl tracking-tight">dynQR</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
              Open Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-[100%] blur-[120px] -z-10 opacity-30 animate-pulse" />

        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
            <Sparkles className="w-3 h-3" />
            <span>Modern Dynamic QR Codes</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-outfit font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1]">
            Transform Every Scan into a <span className="gradient-text">Dynamic Experience</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Create QR codes that change their destination instantly. No sign up required. Just create and share.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-10 py-4 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-primary/20 transition-all font-outfit text-lg"
            >
              Start Creating Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Floating Preview (Simplified) */}
          <div className="mt-20 relative max-w-4xl mx-auto">
            <div className="gradient-border">
              <div className="gradient-border-content p-4 md:p-8 bg-black/40">
                <div className="aspect-[16/9] bg-gradient-to-br from-white/5 to-transparent rounded-lg border border-white/10 flex items-center justify-center overflow-hidden">
                  <div className="relative">
                    <div className="p-8 bg-white rounded-3xl shadow-2xl relative z-10 animate-float">
                      <QrCode className="w-32 h-32 text-black" />
                    </div>
                    <div className="absolute inset-0 bg-primary/40 blur-3xl -z-10 animate-pulse" />
                  </div>
                  <div className="absolute top-10 right-10 p-4 glass rounded-2xl border border-white/10 animate-float-delayed">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-muted-foreground">Recent Scans</p>
                        <p className="font-bold">12,402</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-black/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-outfit font-bold text-center mb-16">
            Everything you need for <span className="text-primary">QR Management</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl glass border border-white/5 hover:border-primary/20 transition-colors group">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-outfit mb-4">Instant Updates</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Changed your destination URL? Update it in seconds without printing new QR codes. Perfect for menus, links, and campaigns.
              </p>
            </div>

            <div className="p-8 rounded-3xl glass border border-white/5 hover:border-primary/20 transition-colors group">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold font-outfit mb-4">Detailed Analytics</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Track how many scans your codes get, when they happened, and from which devices. Data-driven decisions made easy.
              </p>
            </div>

            <div className="p-8 rounded-3xl glass border border-white/5 hover:border-primary/20 transition-colors group">
              <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold font-outfit mb-4">Secure & Reliable</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Powered by enterprise-grade infrastructure. Your QR codes are always online and your data is always protected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 mt-auto">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-primary" />
            <span className="font-outfit font-bold tracking-tight">dynQR</span>
          </div>
          <p className="text-sm text-muted-foreground">&copy; 2026 dynQR. Built for the modern web.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Twitter</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">GitHub</Link>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(15px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
