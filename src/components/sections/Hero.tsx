"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      
      {/* 1. Background Effects */}
      <div className="absolute inset-0 -z-10">
        {/* Radial Gradient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-start/20 rounded-full blur-[100px]" />
        
        {/* CSS Grid Pattern (Optional) */}
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* 2. Text Content with Motion */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-start/30 bg-accent-start/5 text-accent-start text-xs font-bold tracking-wide uppercase mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-start opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-start"></span>
            </span>
            Available for New Projects
          </motion.div>

          {/* --- THE FIX IS HERE --- */}
          {/* We changed 'text-white' to 'text-primary' so it reacts to the theme */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 text-primary"
          >
            Turn Browsers into <br />
            <span className="text-gradient">Showrooms</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted mb-8 leading-relaxed max-w-lg"
          >
            We craft cinematic, interactive 3D experiences that scale. From realtime product configurators to app-less WebAR.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="#contact" className="group relative px-8 py-4 bg-primary text-secondary rounded-full font-semibold overflow-hidden">
               <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-accent-start to-accent-end opacity-100 group-hover:opacity-90 transition-opacity" />
               <span className="relative text-white flex items-center gap-2">
                 Start Project <ArrowRight size={18} />
               </span>
            </Link>
            
            <Link href="#work" className="px-8 py-4 rounded-full border border-border hover:bg-secondary transition-colors font-medium text-primary">
              View Case Studies
            </Link>
          </motion.div>
        </div>

        {/* 3. The 3D Placeholder / Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center"
        >
          {/* This is where your Canvas/3D model will go later. 
              For now, we use a sleek glass card image slider logic or placeholder */}
          <div className="relative w-full h-full bg-gradient-to-tr from-accent-start/10 to-transparent rounded-[2rem] border border-white/10 backdrop-blur-sm flex items-center justify-center p-8 shadow-2xl">
             <img 
               src="/assets/7.png" 
               alt="3D Chair" 
               className="w-full h-full object-contain drop-shadow-2xl animate-float"
             />
          </div>
        </motion.div>
      </div>
    </section>
  );
}