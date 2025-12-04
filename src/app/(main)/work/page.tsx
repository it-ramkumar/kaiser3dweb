"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";

// Categories for filter
const categories = ["all", "ecommerce", "automotive", "real-estate"];

// Project Data (Matching your HTML images)
const projects = [
  {
    id: 1,
    title: "Aura Home Configurator",
    category: "ecommerce",
    image: "/assets/27.png", // Sofa Image
    desc: "A real-time 3D configurator that led to a 40% increase in conversion rates.",
    tags: ["WebGL", "Shopify", "React"]
  },
  {
    id: 2,
    title: "AutoVerse EV Launch",
    category: "automotive",
    image: "/assets/2.png", // Car Image
    desc: "Immersive launch experience driving 90% user engagement.",
    tags: ["Three.js", "GSAP", "Marketing"]
  },
  {
    id: 3,
    title: "Elysian Virtual Tour",
    category: "real-estate",
    image: "/assets/22.png", // Interior/Chair Image
    desc: "Multi-user virtual tour accelerating off-plan sales by 60%.",
    tags: ["Virtual Tour", "WebXR", "Real Estate"]
  },
  {
    id: 4,
    title: "Kinetix AR Try-On",
    category: "ecommerce",
    image: "/assets/7.png", // Sneaker/Chair Image
    desc: "App-less AR try-on feature reducing product returns by 22%.",
    tags: ["WebAR", "8th Wall", "Mobile"]
  },
  // Added a duplicate to fill grid for demo
  {
    id: 5,
    title: "Luxe Watch Builder",
    category: "ecommerce",
    image: "/assets/9.png", 
    desc: "High-fidelity textures for luxury watch customization.",
    tags: ["PBR", "Configurator"]
  }
];

export default function WorkPage() {
  const [filter, setFilter] = useState("all");

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="pt-24 pb-20 min-h-screen">
      
      {/* Hero */}
      <section className="container mx-auto px-6 mb-16 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Selected <span className="accent-text">Work</span>
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto mb-12">
          Explore how we help leading brands solve complex problems with 3D technology.
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={clsx(
                "px-6 py-2 rounded-full capitalize font-medium transition-all duration-300 border",
                filter === cat
                  ? "accent-bg border-transparent text-white shadow-lg shadow-accent-start/25"
                  : "bg-card border-border text-muted hover:border-accent-start/50 hover:text-primary"
              )}
            >
              {cat.replace("-", " ")}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-6">
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="group relative"
              >
                {/* Card Container */}
                <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col hover:border-accent-start/50 transition-colors duration-300">
                  
                  {/* Image Area */}
                  <div className="relative h-64 overflow-hidden bg-secondary">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-bold flex items-center gap-2">
                        View Case Study <ArrowRight size={18} />
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-accent-start bg-accent-start/10 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-accent-start transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted text-sm mb-6 flex-grow">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs text-muted font-medium bg-secondary px-2 py-1 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State if no projects found */}
        {filteredProjects.length === 0 && (
           <div className="text-center py-20">
              <p className="text-muted text-lg">No projects found in this category.</p>
           </div>
        )}
      </section>
    </div>
  );
}