import Hero from "@/components/sections/Hero";
import TechStack from "@/components/sections/TechStack";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials"; // New
import FAQ from "@/components/sections/FAQ"; // New
import Services from "@/components/sections/Services"; 
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TechStack />
      <Services />
      <Process />
      <Work />
      <Testimonials /> {/* Adds social proof */}
      <FAQ />          {/* Adds objection handling */}
      <Contact />
    </>
  );
}