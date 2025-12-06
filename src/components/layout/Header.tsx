"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

// Define your menu items here
const navLinks = [
  { name: "About", href: "/about" },           // Points to src/app/(main)/about/page.tsx
  { name: "Services", href: "/services" },     // Points to src/app/(main)/services/page.tsx
  { name: "Process", href: "/process" },      // Anchor link to Home Page section
  { name: "Work", href: "/work" },             // Points to src/app/(main)/work/page.tsx
  { name: "Expertise", href: "/expertise" },  // Anchor link to Home Page section
  { name: "FAQs", href: "/#faq" },              // Anchor link to Home Page section
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname(); // Get current route to show active state

  useEffect(() => setMounted(true), []);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        // HYBRID STYLE: Dark background when scrolled, Transparent when top
        isScrolled 
          ? "py-3 bg-slate-900/95 backdrop-blur-md border-b border-white/10 shadow-xl" 
          : "py-5 bg-transparent border-transparent"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
           {/* Optional: Add your logo image here if you have one */}
           <img src="/assets/logo.png" className="w-16 h-16 object-contain" alt="Logo" />
           <span className={clsx(
             "text-2xl font-bold tracking-tighter transition-colors group-hover:opacity-80",
             // Logo text turns white when scrolled (Hybrid mode), matches theme otherwise
             isScrolled ? "text-white" : "text-primary"
           )}>
             Kaiser<span className="accent-text">3DWeb</span>
           </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={clsx(
                  "text-sm font-medium transition-colors hover:text-accent-start",
                  isActive ? "text-accent-start font-bold" : "",
                  // Text turns light gray when scrolled (readable on dark), muted otherwise
                  isScrolled ? "text-slate-300" : "text-muted"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className={clsx(
                "p-2 rounded-full transition",
                // Toggle icon adapts to header background
                isScrolled ? "text-slate-300 hover:bg-white/10" : "text-muted hover:bg-black/5 dark:hover:bg-white/10"
              )}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}

          {/* Contact Button (CTA) */}
          <Link 
            href="/contact" 
            className={clsx(
              "px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 transform hover:-translate-y-0.5 text-white",
              "accent-bg shadow-lg shadow-accent-start/20 hover:shadow-accent-start/40"
            )}
          >
            Start Project
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={clsx("lg:hidden p-2", isScrolled ? "text-white" : "text-primary")}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay - FORCED DARK THEME */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            // Changed bg-primary to bg-slate-950 (Dark) and text-white
            className="fixed top-0 left-0 w-full bg-slate-950 text-white z-40 overflow-hidden flex flex-col pt-24 px-6"
          >
            {/* Close button inside overlay for better UX */}
            <button 
              className="absolute top-6 right-6 p-2 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>

            <div className="flex flex-col items-center justify-center h-full gap-8 pb-20">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-bold text-white hover:text-accent-start transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              
              <Link 
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 px-8 py-3 rounded-full text-xl font-bold accent-bg text-white"
              >
                Start Project
              </Link>

              {/* Mobile Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="mt-4 p-3 rounded-full border border-white/20 text-white"
                >
                  {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}