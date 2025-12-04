import clsx from "clsx";

// Simple SVG Icons for the logos (You can replace these with <img> tags later)
const technologies = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "TS" },
  { name: "Tailwind", icon: "🎨" },
  { name: "Three.js", icon: "🧊" },
  { name: "WebGL", icon: "🕸️" },
  { name: "Shopify", icon: "🛍️" },
  { name: "Framer", icon: "⚡" },
];

export default function TechStack() {
  return (
    <section className="py-20 overflow-hidden bg-primary/50 border-y border-white/5">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-sm font-semibold text-accent-start tracking-widest uppercase">
          Powered by modern tech
        </p>
      </div>

      {/* The "mask" class creates the fade effect on the left and right edges. 
         We use `mask-image` with a linear gradient.
      */}
      <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        
        {/* Wrapper for the moving track */}
        <div className="flex animate-scroll hover:[animation-play-state:paused] min-w-full gap-8 md:gap-16 pr-8 md:pr-16">
          
          {/* RENDER 1: Original List */}
          {technologies.map((tech, index) => (
            <div 
              key={`tech-1-${index}`}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-secondary/50 border border-white/5 backdrop-blur-sm whitespace-nowrap transition-colors hover:border-accent-start/30"
            >
              <span className="text-2xl">{tech.icon}</span>
              <span className="text-lg font-medium text-muted">{tech.name}</span>
            </div>
          ))}

          {/* RENDER 2: Duplicate List (For the seamless loop) */}
          {technologies.map((tech, index) => (
            <div 
              key={`tech-2-${index}`}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-secondary/50 border border-white/5 backdrop-blur-sm whitespace-nowrap transition-colors hover:border-accent-start/30"
            >
              <span className="text-2xl">{tech.icon}</span>
              <span className="text-lg font-medium text-muted">{tech.name}</span>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}