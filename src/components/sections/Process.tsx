"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    id: 1,
    title: "Discovery & Strategy",
    desc: "We dive deep into your brand DNA. We define KPIs, target audience, and the technical scope to ensure the 3D experience solves real business problems.",
    color: "from-blue-400 to-blue-600",
    number: "01"
  },
  {
    id: 2,
    title: "3D Asset Creation",
    desc: "Our artists craft low-poly, photorealistic models optimized for the web. We obsess over textures, lighting, and baking shadows to ensure 60fps performance.",
    color: "from-cyan-400 to-cyan-600",
    number: "02"
  },
  {
    id: 3,
    title: "Development & Integration",
    desc: "We build the interactive logic using React Three Fiber. We integrate the 3D scene seamlessly with your existing e-commerce backend (Shopify, WooCommerce).",
    color: "from-indigo-400 to-indigo-600",
    number: "03"
  },
  {
    id: 4,
    title: "Launch & Optimization",
    desc: "We deploy to the edge. We monitor performance metrics and user interaction heatmaps to refine the experience post-launch for maximum conversion.",
    color: "from-purple-400 to-purple-600",
    number: "04"
  },
];

export default function Process() {
  const containerRef = useRef(null);
  
  // This tracks the scroll progress of the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} id="process" className="relative bg-secondary/30 pt-24 pb-48">
      <div className="container mx-auto px-6 mb-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          The <span className="text-gradient">Process</span>
        </h2>
        <p className="text-muted max-w-2xl mx-auto text-lg">
          A streamlined workflow designed to take your project from concept to a high-performance 3D reality.
        </p>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-8 md:gap-0">
          {steps.map((step, index) => {
            // Dynamic Sticky Calculation
            // Each card sticks 40px lower than the previous one, creating a "stacked deck" look
            const topOffset = 120 + index * 20; 

            return (
              <Card 
                key={step.id} 
                step={step} 
                index={index} 
                top={topOffset} 
                total={steps.length}
                parentProgress={scrollYProgress}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Sub-component for individual cards
function Card({ step, index, top, total, parentProgress }: any) {
  // Optional: Add a subtle scale effect as cards stack
  // We map the card's index to a scroll range
  const rangeStart = index * 0.25;
  const rangeEnd = 1;
  const scale = useTransform(parentProgress, [rangeStart, rangeEnd], [1, 1 - (total - index) * 0.05]);

  return (
    <motion.div
      style={{ 
        top: `${top}px`, // This makes it sticky at the calculated position
        scale: index === total - 1 ? 1 : scale, // Don't scale the last card
      }} 
      className="sticky flex flex-col md:flex-row h-[400px] md:h-[500px] w-full bg-card border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-12 last:mb-0 backdrop-blur-xl"
    >
      {/* Visual Side (Left) */}
      <div className={`w-full md:w-1/2 h-48 md:h-full bg-gradient-to-br ${step.color} p-8 flex items-center justify-center relative overflow-hidden group`}>
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-20 mix-blend-overlay" />
        <span className="text-[12rem] font-bold text-white opacity-20 absolute -bottom-20 -right-10 select-none group-hover:scale-110 transition-transform duration-700">
          {step.number}
        </span>
        <div className="relative z-10 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
             {/* Replace with an actual icon or 3D image if you have one */}
             <div className="text-6xl text-white font-bold">{step.number}</div>
        </div>
      </div>

      {/* Content Side (Right) */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
        <h3 className="text-3xl font-bold mb-6 text-primary">{step.title}</h3>
        <p className="text-lg text-muted leading-relaxed">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}