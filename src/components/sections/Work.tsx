"use client";
import { useState } from "react";

// Mock Data
const projects = [
  { id: 1, title: "Aura Home", category: "ecommerce", img: "/assets/27.png" },
  { id: 2, title: "AutoVerse EV", category: "automotive", img: "/assets/2.png" },
  { id: 3, title: "Elysian Props", category: "real-estate", img: "/assets/22.png" },
];

export default function Work() {
  const [filter, setFilter] = useState("all");

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="work" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Our Work</h2>
        
        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {["all", "ecommerce", "automotive", "real-estate"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full capitalize border transition ${
                filter === cat ? "accent-bg text-white border-transparent" : "border-gray-200 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="border border-white/10 rounded-xl overflow-hidden hover:-translate-y-2 transition duration-300 shadow-lg">
              <img src={project.img} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6 bg-card">
                <span className="text-accent-start text-sm font-bold uppercase">{project.category}</span>
                <h3 className="text-xl font-bold mt-2">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}