"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import clsx from "clsx";

const faqs = [
  { 
    question: "How long does a 3D project take?", 
    answer: "Timelines depend on complexity. A standard 3D product configurator typically takes 4-6 weeks. Complex WebGL environments or Virtual Showrooms usually range from 8-12 weeks, including modeling, development, and QA testing." 
  },
  { 
    question: "Does 3D slow down my website?", 
    answer: "Not with us. We are performance-obsessed. We use Draco compression to reduce file sizes by up to 90% and implement 'lazy loading', meaning 3D assets only load when they enter the viewport. Your Core Web Vitals will remain green." 
  },
  { 
    question: "Can you integrate with my existing store?", 
    answer: "Yes. We specialize in headless commerce integrations. We can push configuration data (color, parts, price) directly to the cart sessions of Shopify, WooCommerce, Magento, or custom enterprise ERPs." 
  },
  { 
    question: "Do I own the 3D assets you create?", 
    answer: "Absolutely. Once the project is paid for, you own 100% of the Intellectual Property, including the 3D models (GLTF/GLB files), textures, and source code. We do not hold your assets hostage." 
  },
  { 
    question: "Do I need to provide the 3D models?", 
    answer: "Ideally, yes (CAD or STEP files). However, if you don't have them, our in-house 3D artists can model your products from scratch using reference photos and measurements. We aim for photorealistic accuracy." 
  },
  { 
    question: "What is the cost of a 3D Configurator?", 
    answer: "Costs vary based on the number of products and customization logic. A simple viewer starts in the low thousands, while full-scale configurators with complex logic are a larger investment. We provide fixed-price proposals after a brief discovery call." 
  },
  { 
    question: "Do you offer post-launch support?", 
    answer: "Yes. We offer monthly maintenance packages to keep your dependencies updated, monitor performance, and make minor content updates. We ensure your 3D experience remains future-proof as browsers evolve." 
  },
  { 
    question: "Does this work on Mobile phones?", 
    answer: "Yes. In fact, we develop 'Mobile First'. Our Touch controls are optimized for thumbs, and we ensure high frame rates (60fps) on iOS and Android devices without draining battery life excessively." 
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      
      {/* Background Decor: Subtle Gradient Glow behind the list */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-start/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="accent-text">Questions</span>
          </h2>
          <p className="text-muted text-lg">
            Everything you need to know about our process and technology.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            
            return (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={index} 
                onClick={() => setActiveIndex(isOpen ? null : index)}
                className={clsx(
                  "group cursor-pointer rounded-2xl border transition-all duration-500 overflow-hidden relative",
                  // Glassmorphism & Active State Logic
                  isOpen 
                    ? "bg-card border-accent-start shadow-[0_0_40px_-10px_rgba(var(--accent-start-rgb),0.3)]" 
                    : "bg-card/40 hover:bg-card border-border hover:border-accent-start/30 backdrop-blur-sm"
                )}
              >
                {/* Active Indicator Bar on Left */}
                <div className={clsx(
                    "absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-start to-accent-end transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0"
                )} />

                {/* Header */}
                <div className="p-6 md:p-8 flex items-center gap-6">
                  {/* Index Number (Editorial Look) */}
                  <span className={clsx(
                    "text-xl font-mono font-bold transition-colors duration-300 hidden md:block",
                    isOpen ? "text-accent-start" : "text-muted/30"
                  )}>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="flex-grow flex items-center justify-between">
                    <h3 className={clsx(
                      "font-bold text-lg md:text-xl transition-colors duration-300", 
                      isOpen ? "text-primary" : "text-muted group-hover:text-primary"
                    )}>
                      {faq.question}
                    </h3>
                    
                    {/* Animated Icon */}
                    <div className={clsx(
                      "w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300",
                      isOpen 
                        ? "bg-accent-start border-accent-start text-white rotate-180" 
                        : "bg-transparent border-border text-muted group-hover:border-accent-start group-hover:text-accent-start"
                    )}>
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                  </div>
                </div>

                {/* Body (Animated Height) */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8 pl-6 md:pl-20">
                        <p className="text-muted text-lg leading-relaxed border-l-2 border-border pl-6">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}