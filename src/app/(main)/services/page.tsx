"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import clsx from "clsx";

const services = [
  {
    id: "configurators",
    title: "3D Product Configurators",
    subtitle: "Empower customers to customize in real-time.",
    desc: "We build lightning-fast 3D configurators that allow users to customize products, from colors and textures to accessories. Perfect for e-commerce, increasing conversion by up to 40%.",
    features: ["Real-time material changes", "Price calculation integration", "Mobile-optimized controls"],
    image: "/assets/11.png", // Ensure this exists in public/assets
    video: "/assets/configurator.mp4" 
  },
  {
    id: "showrooms",
    title: "Virtual Showrooms",
    subtitle: "Immersive spaces accessible from anywhere.",
    desc: "Create immersive digital spaces. We design and develop virtual showrooms, art galleries, and real estate tours that users can explore from any device 24/7.",
    features: ["Multi-user support", "Hotspot interactions", "VR Headset compatible"],
    image: "/assets/25.png",
    video: "/assets/showroom.mp4"
  },
  {
    id: "webgl",
    title: "Interactive WebGL",
    subtitle: "Storytelling pushed to the limit.",
    desc: "Push the boundaries of branding. We create bespoke WebGL sites, data visualizations, and gamified experiences that tell your brand's story in a truly unforgettable way.",
    features: ["Custom shaders", "Physics simulations", "Award-winning visuals"],
    image: "/assets/9.png",
    video: "/assets/webgl.mp4"
  },
  {
    id: "webar",
    title: "Web AR Integration",
    subtitle: "App-less Augmented Reality.",
    desc: "Bring your products into your customer's world. We integrate markerless Web AR, allowing users to place 3D models in their own space using just their phone's camera.",
    features: ["No app download required", "iOS & Android compatible", "True-to-scale placement"],
    image: "/assets/22.png",
    video: "/assets/ar.mp4"
  },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="pt-24 pb-20 min-h-screen">
      
      {/* Hero */}
      <section className="container mx-auto px-6 mb-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Our <span className="accent-text">Services</span>
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          We don't just build websites; we build immersive engines that drive sales and engagement.
        </p>
      </section>

      {/* Interactive Tabs Section */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Tabs */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setActiveTab(index)}
                className={clsx(
                  "text-left p-6 rounded-2xl transition-all duration-300 border group relative overflow-hidden",
                  activeTab === index 
                    ? "bg-accent-start/5 border-accent-start shadow-lg" 
                    : "bg-card border-border hover:border-accent-start/50"
                )}
              >
                <div className="relative z-10">
                  <h3 className={clsx("text-xl font-bold mb-1 transition-colors", activeTab === index ? "text-accent-start" : "text-primary")}>
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted">{service.subtitle}</p>
                </div>
                {/* Active Indicator Bar */}
                {activeTab === index && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent-start" 
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right Column: Content Display */}
          <div className="w-full lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-8 rounded-3xl h-full flex flex-col"
              >
                {/* Media Preview (Video/Image) */}
                <div className="w-full h-[300px] lg:h-[400px] rounded-xl overflow-hidden mb-8 bg-black/5 relative group">
                   {/* Fallback Image */}
                   <img 
                      src={services[activeTab].image} 
                      alt={services[activeTab].title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                   />
                   
                   {/* Optional: Overlay Play Button or Badge */}
                   <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                      </div>
                   </div>
                </div>

                {/* Text Content */}
                <div>
                  <h2 className="text-3xl font-bold mb-4">{services[activeTab].title}</h2>
                  <p className="text-muted text-lg leading-relaxed mb-8">
                    {services[activeTab].desc}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {services[activeTab].features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <CheckCircle2 className="text-accent-start shrink-0" size={20} />
                        <span className="text-primary font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a 
                    href="/contact" 
                    className="inline-flex items-center gap-2 text-accent-start font-bold hover:gap-4 transition-all"
                  >
                    Discuss this solution <ArrowRight size={20} />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>
    </div>
  );
}