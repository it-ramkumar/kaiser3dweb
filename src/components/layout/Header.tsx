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
  { name: "FAQ", href: "/#faq" },              // Anchor link to Home Page section
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
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b",
        isScrolled 
          ? "py-3 bg-card/80 backdrop-blur-md border-border shadow-sm" 
          : "py-5 bg-transparent border-transparent"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
           {/* Optional: Add your logo image here if you have one */}
           {/* <img src="/assets/logo.png" className="w-8 h-8" alt="Logo" /> */}
           <span className="text-2xl font-bold tracking-tighter text-primary group-hover:opacity-80 transition-opacity">
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
                  isActive ? "text-accent-start font-semibold" : "text-muted"
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
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-input transition text-muted hover:text-primary"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}

          {/* Contact Button (CTA) */}
          <Link 
            href="/contact" 
            className={clsx(
              "px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 transform hover:-translate-y-0.5",
              "accent-bg shadow-lg shadow-accent-start/20 hover:shadow-accent-start/40"
            )}
          >
            Start Project
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[60px] left-0 w-full bg-primary z-40 overflow-hidden flex flex-col"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 pb-20">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-bold text-primary hover:text-accent-start transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              
              <Link 
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 px-8 py-3 rounded-full text-xl font-bold accent-bg"
              >
                Start Project
              </Link>

              {/* Mobile Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="mt-4 p-3 rounded-full border border-border"
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