'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

// Stats Data
const stats = [
    { label: 'Years of Innovation', value: '5+' },
    { label: 'Projects Delivered', value: '100+' },
    { label: '3D Specialists', value: '15' },
    { label: 'Client Satisfaction', value: '100%' },
];

// Values Data
const values = [
    {
        title: 'Innovation First',
        desc: 'We don’t just follow trends; we set them. Experimenting with WebGL, VR, and AR is in our DNA.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        )
    },
    {
        title: 'Pixel Perfection',
        desc: 'In the 3D world, details matter. We obsess over lighting, textures, and polygon counts.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
        )
    },
    {
        title: 'Collaborative Spirit',
        desc: 'We are not just vendors; we are your technical partners, working side-by-side to realize your vision.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        )
    }
];

export default function AboutPage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        <div className="min-h-screen bg-primary text-primary transition-colors duration-300">
            

            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
                <div className="max-w-6xl mx-auto text-center">
                    <span className="text-accent-start font-semibold tracking-wider text-sm uppercase mb-4 block">
                        About Kaiser 3D Web
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-primary">
                        We Build The <br />
                        <span className="text-gradient">
                            Digital Reality
                        </span>
                    </h1>
                    <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
                        We are a team of creative technologists redefining how brands interact with the world through immersive 3D web experiences.
                    </p>
                </div>
            </section>

            {/* --- STATS SECTION --- */}
            <section className="py-10 px-4 border-y border-border bg-secondary/50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl font-bold text-accent-start mb-1">{stat.value}</div>
                                <div className="text-sm text-muted font-medium uppercase tracking-wide">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- MISSION SPLIT SECTION --- */}
            <section className="py-24 px-4">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="aspect-square rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 relative overflow-hidden shadow-2xl">
                             <div className="absolute inset-0 flex items-center justify-center text-muted">
                                <span className="font-medium">Company Image</span>
                             </div>
                        </div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-start/20 rounded-full blur-2xl -z-10" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-primary">Our Mission</h2>
                        <div className="space-y-6 text-lg text-muted leading-relaxed">
                            <p>
                                At Kaiser 3D Web, we believe the web is evolving beyond flat screens. Our mission is to bridge the gap between imagination and digital reality.
                            </p>
                            <p>
                                Whether it's a high-fidelity product configurator or a full-scale WebGL environment, we empower businesses to tell their stories in three dimensions. We combine artistic vision with engineering precision to create experiences that don't just look good—they perform.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- VALUES GRID --- */}
            <section className="py-24 px-4 bg-slate-900 dark:bg-black text-white">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16 md:text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Driven by Core Values</h2>
                        <p className="text-slate-400 text-lg">
                            We operate at the intersection of art and engineering. These core principles guide every line of code we write.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {values.map((item, i) => (
                            <div key={i} className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-start hover:bg-white/10 transition-all duration-300">
                                <div className="w-12 h-12 bg-accent-start rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-white">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- TECH STACK STRIP (UPDATED WITH GLOW) --- */}
            <section className="py-20 px-4 border-b border-border bg-primary">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-muted font-medium mb-8 uppercase tracking-widest text-sm">Powered by modern technology</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="text-2xl font-bold text-primary hover:text-accent-start hover:drop-shadow-[0_0_15px_rgba(37,99,235,0.6)] transition-all duration-300 cursor-default">Next.js</span>
                        <span className="text-2xl font-bold text-primary hover:text-accent-start hover:drop-shadow-[0_0_15px_rgba(37,99,235,0.6)] transition-all duration-300 cursor-default">Three.js</span>
                        <span className="text-2xl font-bold text-primary hover:text-accent-start hover:drop-shadow-[0_0_15px_rgba(37,99,235,0.6)] transition-all duration-300 cursor-default">WebGL</span>
                        <span className="text-2xl font-bold text-primary hover:text-accent-start hover:drop-shadow-[0_0_15px_rgba(37,99,235,0.6)] transition-all duration-300 cursor-default">React Three Fiber</span>
                        <span className="text-2xl font-bold text-primary hover:text-accent-start hover:drop-shadow-[0_0_15px_rgba(37,99,235,0.6)] transition-all duration-300 cursor-default">Blender</span>
                    </div>
                </div>
            </section>

            {/* --- CTA SECTION --- */}
            <section className="py-24 px-4">
                <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-accent-start to-accent-end rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-white/10 blur-3xl scale-150 pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to start your project?</h2>
                        <p className="text-blue-50 text-lg mb-8 max-w-2xl mx-auto">
                            Let's discuss how 3D web technology can transform your user engagement and conversion rates.
                        </p>
                        <a 
                            href="/contact" 
                            className="inline-block bg-white text-accent-start px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
                        >
                            Get a Free Consultation
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}