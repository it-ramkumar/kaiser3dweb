import Link from "next/link";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tighter mb-6 block">
              Kaiser<span className="text-gradient">3DWeb</span>
            </Link>
            <p className="text-muted max-w-sm mb-6">
              Transforming digital commerce with immersive, high-performance 3D and AR experiences. 
              We build the future of the web.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-full bg-white/5 hover:bg-accent-start hover:text-white transition-colors text-muted">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="font-bold text-primary mb-6">Explore</h4>
            <ul className="space-y-4 text-muted">
              <li><Link href="services" className="hover:text-accent-start transition">Services</Link></li>
              <li><Link href="work" className="hover:text-accent-start transition">Case Studies</Link></li>
              <li><Link href="process" className="hover:text-accent-start transition">Our Process</Link></li>
              <li><Link href="#faq" className="hover:text-accent-start transition">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-bold text-primary mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-muted">
              <li>Big Bear, CA</li>
              <li><a href="mailto:hello@kaiser3dweb.com" className="hover:text-accent-start">hello@kaiser3dweb.com</a></li>
              <li>+1 (951) 441-9719</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-sm text-muted">
          &copy; {new Date().getFullYear()} Kaiser3DWeb. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}