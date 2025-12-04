"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import clsx from "clsx";

const faqs = [
  { question: "How long does a 3D project take?", answer: "A typical 3D product configurator takes 6-8 weeks, while a simpler WebGL experience might take 4-6 weeks." },
  { question: "Does this slow down my website?", answer: "No. We use Draco compression and lazy loading. Your 3D assets load asynchronously, ensuring your Core Web Vitals remain green." },
  { question: "Can you integrate with Shopify?", answer: "Yes. We specialize in headless commerce. We can push configuration data directly to Shopify, WooCommerce, or Magento cart sessions." },
  { question: "Do I need to provide 3D models?", answer: "Ideally yes (STEP/CAD files). If not, our in-house modeling team can create photorealistic assets from your reference photos." },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h2>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={index} 
                onClick={() => setActiveIndex(isOpen ? null : index)}
                className="group cursor-pointer rounded-2xl border border-white/10 bg-card overflow-hidden transition-all duration-300 hover:border-accent-start/40"
              >
                {/* Header */}
                <div className="p-6 flex items-center justify-between">
                  <h3 className={clsx("font-semibold text-lg transition-colors", isOpen ? "text-accent-start" : "text-primary")}>
                    {faq.question}
                  </h3>
                  <motion.div 
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Plus className="text-muted group-hover:text-accent-start" />
                  </motion.div>
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
                      <p className="px-6 pb-6 text-muted leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}