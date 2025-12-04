"use client";
import { motion } from "framer-motion";
import { Zap, Layers, Monitor, Code, Database, Globe } from "lucide-react";
import TechStack from "@/components/sections/TechStack"; // Reuse your existing component

const features = [
  {
    icon: Layers,
    title: "Photorealistic Quality",
    desc: "We combine advanced 3D artistry with PBR (Physically Based Rendering) shading. Our models aren't just shapes; they feature realistic imperfections, light refraction, and texture depth that mimic reality.",
  },
  {
    icon: Zap,
    title: "Performance Obsessed",
    desc: "A beautiful site is useless if it's slow. We use Draco compression, texture atlasing, and instance mesh optimization to ensure 60fps performance even on mobile networks.",
  },
  {
    icon: Monitor,
    title: "Multi-platform Ready",
    desc: "Build once, deploy everywhere. Our WebGL experiences work flawlessly across 4K desktops, tablets, mobile phones, and even VR/AR headsets via WebXR.",
  },
  {
    icon: Code,
    title: "Clean Architecture",
    desc: "We don't just write code; we build scalable systems. Using Next.js and TypeScript, we ensure your 3D application is maintainable, type-safe, and ready for future growth.",
  },
  {
    icon: Database,
    title: "Headless Integration",
    desc: "We specialize in connecting 3D frontends with headless backends like Shopify, Contentful, or Sanity. Your 3D configurator talks directly to your inventory system.",
  },
  {
    icon: Globe,
    title: "Global CDN Delivery",
    desc: "We deploy assets to the edge. Your heavy 3D models are served from the server closest to your user, reducing latency and load times globally.",
  },
];

export default function ExpertisePage() {
  return (
    <div className="pt-24 pb-20">
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Our Technical <span className="accent-text">Edge</span>
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          We bridge the gap between cinematic 3D visuals and high-performance web engineering.
        </p>
      </section>

      {/* Grid of Expertise */}
      <section className="container mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-2xl hover:border-accent-start/30 transition-colors group"
            >
              <div className="w-14 h-14 rounded-full bg-accent-start/10 flex items-center justify-center mb-6 group-hover:bg-accent-start/20 transition-colors">
                <feature.icon className="text-accent-start" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section (Reused) */}
      <div className="bg-secondary/50 border-y border-border">
        <TechStack />
      </div>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24 text-center">
        <div className="glass-card p-12 rounded-3xl max-w-4xl mx-auto bg-gradient-to-br from-card to-accent-start/5">
          <h2 className="text-3xl font-bold mb-6">Ready to upgrade your web presence?</h2>
          <p className="text-muted mb-8 text-lg">
            Leverage our expertise to build the next generation of the web for your brand.
          </p>
          <a href="/contact" className="px-8 py-4 rounded-full accent-bg font-bold shadow-lg hover:shadow-accent-start/40 transition-all">
            Get a Technical Audit
          </a>
        </div>
      </section>
    </div>
  );
}