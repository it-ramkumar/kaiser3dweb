"use client"; // Required for interactivity (useState)
import { useState } from "react";
import clsx from "clsx";

const services = [
  { id: 1, title: "3D Product Configurators", desc: "Empower your customers...", video: "/assets/configurator.mp4" },
  { id: 2, title: "Virtual Showrooms", desc: "Create immersive spaces...", video: "/assets/showroom.mp4" },
  // ... other services
];

export default function Services() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <section id="services" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Tabs List */}
          <div className="w-full md:w-1/3">
            <ul className="flex md:flex-col overflow-x-auto">
              {services.map((service) => (
                <li 
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={clsx(
                    "cursor-pointer p-4 border-l-4 transition-all",
                    activeTab === service.id 
                      ? "border-accent-start bg-blue-500/10 font-bold" 
                      : "border-transparent text-gray-500"
                  )}
                >
                  {service.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Content Pane */}
          <div className="w-full md:w-2/3">
            {services.map((service) => (
              activeTab === service.id && (
                <div key={service.id} className="animate-fadeIn">
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="mb-6 text-gray-600 dark:text-gray-300">{service.desc}</p>
                  <div className="rounded-xl overflow-hidden shadow-lg h-72 bg-gray-200">
                     {/* Use HTML video tag or Next.js CldVideoPlayer */}
                    <video src={service.video} autoPlay loop muted className="w-full h-full object-cover" />
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}