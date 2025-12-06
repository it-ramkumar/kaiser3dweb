"use client";
import Process from "@/components/sections/Process"; // Import the detailed text steps we made earlier
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ProcessPage() {
  return (
    <div className="pt-24">
      
      {/* 1. Intro Hero */}
      <section className="container mx-auto px-6 text-center mb-20">
        <h1 className="text-5xl font-bold mb-6">
          From Concept to <span className="accent-text">Reality</span>
        </h1>
        <p className="text-xl text-muted max-w-3xl mx-auto">
          We have refined a streamlined pipeline that takes abstract ideas and turns them into 
          interactive, revenue-generating 3D assets.
        </p>
      </section>

      {/* 2. The Detailed Steps Component (Reused) */}
      {/* This renders the cards with text (Discovery, Asset Creation, etc.) */}
      <Process />

      {/* 3. The "Visual Pipeline" (Recreated from your HTML #process-3d) */}
      <PipelineVisuals />

      {/* 4. Closing */}
      <section className="py-24 text-center">
        <h2 className="text-3xl font-bold mb-6">Transparent & Agile</h2>
        <p className="text-muted max-w-2xl mx-auto mb-8">
            We work in two-week sprints, providing you with preview links at every stage. 
            You never have to guess what your project looks like.
        </p>
        <a href="/contact" className="px-8 py-3 rounded-full border border-border hover:bg-secondary font-medium transition-colors">
            Start a Project
        </a>
      </section>
    </div>
  );
}

// --- Sub-Component for the "Sticky Layers" Visual ---
function PipelineVisuals() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="py-24 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Visual Pipeline</h2>
            <p className="text-muted">See how a product evolves through our workflow.</p>
        </div>

        <div className="relative max-w-5xl mx-auto min-h-[100vh]">
            {/* Layer 1: Wireframe */}
            <PipelineLayer 
                img="/assets/img/step-one.jpg" 
                label="Step 1: Wireframe & Blueprint" 
                index={0} 
                progress={scrollYProgress} 
            />
            
            {/* Layer 2: Clay Model */}
            <PipelineLayer 
                img="/assets/8.png" 
                label="Step 2: High-Fidelity Modeling" 
                index={1} 
                progress={scrollYProgress} 
            />

            {/* Layer 3: Final Render */}
            <PipelineLayer 
                img="/assets/9.png" 
                label="Step 3: WebGL Integration & Lighting" 
                index={2} 
                progress={scrollYProgress} 
            />
        </div>
      </div>
    </section>
  );
}

function PipelineLayer({ img, label, index, progress }: { img: string, label: string, index: number, progress: any }) {
    // Parallax logic: Elements move at different speeds to create stacking effect
    const y = useTransform(progress, [0, 1], [100 * (index + 1), -100 * (index + 1)]);
    const opacity = useTransform(progress, [0, 0.2 + (index * 0.1), 0.8], [0, 1, 1]);

    return (
        <motion.div 
            style={{ y, opacity }}
            className={`sticky top-32 mb-24 w-full aspect-video rounded-2xl overflow-hidden border border-border shadow-2xl z-${index * 10}`}
        >
            <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm z-10 flex items-end p-8">
                <span className="bg-accent-start text-white px-4 py-2 rounded-lg font-bold text-lg shadow-lg">
                    {label}
                </span>
            </div>
            <img src={img} alt={label} className="w-full h-full object-cover" />
        </motion.div>
    );
}