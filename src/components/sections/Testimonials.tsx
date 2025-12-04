"use client";
import { Quote, Star } from "lucide-react";
import clsx from "clsx";

const testimonials = [
  {
    id: 1,
    quote: "The 3D configurator Kaiser3DWeb built is the centerpiece of our e-commerce strategy. Conversion rates are up 40%.",
    author: "Anna Duval",
    role: "Head of E-commerce, Aura Home",
    rating: 5,
  },
  {
    id: 2,
    quote: "Their obsession with performance is unmatched. We hit 60fps on mobile devices instantly. Truly world-class engineering.",
    author: "Marcus Shaw",
    role: "CMO, AutoVerse",
    rating: 5,
  },
  {
    id: 3,
    quote: "We launched our WebAR campaign in 4 weeks. The ROI was instant, and the user engagement time tripled.",
    author: "Sarah Jenks",
    role: "Director, Kinetix",
    rating: 5,
  },
  {
    id: 4,
    quote: "Finally, an agency that understands both design and code. The transition from Figma to WebGL was flawless.",
    author: "David Chen",
    role: "Product Lead, FutureScale",
    rating: 5,
  },
  {
    id: 5,
    quote: "The virtual showroom allowed us to sell pre-construction units sight unseen. A game changer for real estate.",
    author: "Elena Rodriguez",
    role: "VP Sales, Elysian Props",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden bg-secondary/30 border-t border-border">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent-start/5 to-transparent -z-10" />

      <div className="container mx-auto px-6 mb-12 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Trusted by <span className="accent-text">Industry Leaders</span>
        </h2>
        <p className="text-muted text-lg">
          Don't just take our word for it. See what our partners say.
        </p>
      </div>

      {/* SLIDER CONTAINER 
         - [mask-image] creates the fade effect on left/right edges
      */}
      <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        
        {/* MOVING TRACK 
           - animate-scroll-slow: Moves smoothly
           - hover:paused: Stops moving when user hovers to read
        */}
        <div className="flex animate-scroll-slow hover:[animation-play-state:paused] min-w-full gap-6 pr-6">
          
          {/* We render the list twice to create the infinite loop illusion */}
          {[...testimonials, ...testimonials].map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="relative w-[350px] md:w-[450px] flex-shrink-0 p-8 rounded-3xl border border-white/10 bg-card/50 backdrop-blur-md shadow-xl flex flex-col justify-between hover:border-accent-start/30 transition-colors"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <Quote className="text-accent-start opacity-50" size={32} />
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={clsx(
                          i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
                        )} 
                      />
                    ))}
                  </div>
                </div>
                
                <p className="font-medium mb-8 text-primary text-lg leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-start to-accent-end flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-primary">{item.author}</h4>
                  <p className="text-sm text-muted">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}