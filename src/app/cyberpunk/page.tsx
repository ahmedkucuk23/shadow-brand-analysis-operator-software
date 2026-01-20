"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Menu, 
  X, 
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
  Maximize2,
  Minimize2
} from "lucide-react";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/cyberpunk", label: "Cyberpunk" },
  { href: "/blog", label: "Insights" },
  { href: "/team", label: "Team" },
];

const socialLinks = [
  { href: "https://www.facebook.com/MITAgroupBiH", icon: Facebook, label: "Facebook" },
  { href: "https://twitter.com/MITAGroup", icon: Twitter, label: "X (Twitter)" },
  { href: "https://www.youtube.com/user/mitaedina", icon: Youtube, label: "YouTube" },
  { href: "https://www.instagram.com/mita_group/", icon: Instagram, label: "Instagram" },
  { href: "https://www.linkedin.com/company/mita-group-sarajevo/", icon: Linkedin, label: "LinkedIn" },
];

export default function CyberpunkPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      {/* Navigation - Hidden in fullscreen */}
      {!isFullscreen && (
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <div className="container mx-auto px-4 pt-4">
            <nav className="px-6 py-4 glass rounded-2xl">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/logo-red.png"
                    alt="MITA Agency"
                    width={220}
                    height={55}
                    className="h-10 md:h-12 w-auto brightness-0 invert"
                    priority
                  />
                </Link>
                
                <div className="hidden md:flex items-center gap-8">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href}
                      href={link.href} 
                      className={`transition-colors animated-underline ${
                        link.href === "/cyberpunk" ? "text-white" : "text-dark-400 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="hidden md:flex items-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white rounded-xl font-semibold hover:bg-brand-dark transition-colors"
                  >
                    Let&apos;s Talk
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="md:hidden p-2 rounded-xl glass hover:bg-white/10 transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </nav>
          </div>
        </motion.header>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] md:hidden"
          >
            <div 
              className="absolute inset-0 bg-dark-950"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative h-full flex flex-col"
            >
              <div className="container mx-auto px-4 pt-4">
                <div className="px-6 py-4 flex items-center justify-between">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                    <Image
                      src="/logo-red.png"
                      alt="MITA Agency"
                      width={180}
                      height={45}
                      className="h-10 w-auto brightness-0 invert"
                    />
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl glass hover:bg-white/10 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center px-8">
                <nav className="space-y-2">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-4 text-4xl font-display font-bold text-white hover:text-brand transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="mt-12"
                >
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-8 py-4 bg-brand text-white rounded-xl font-semibold text-lg hover:bg-brand-dark transition-colors"
                  >
                    Let&apos;s Talk
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                className="px-8 pb-8 text-center"
              >
                <p className="text-dark-500 text-sm">info@mita.ba</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive System Container */}
      <div className={`${isFullscreen ? 'fixed inset-0 z-40' : 'pt-24 pb-8 px-4'}`}>
        <div className={`${isFullscreen ? 'w-full h-full' : 'container mx-auto'}`}>
          {/* Header bar for non-fullscreen */}
          {!isFullscreen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 pt-8"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                  Cyberpunk
                </span>
                {" "}Interactive System
              </h1>
              <p className="text-dark-400 text-lg mb-6">
                Use your hands to interact with 12,000 particles
              </p>
            </motion.div>
          )}

          {/* Instructions - Above the container */}
          {!isFullscreen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid md:grid-cols-3 gap-6 mb-8"
            >
              <div className="p-6 glass rounded-xl border border-cyan-500/20">
                <h3 className="text-cyan-400 font-display font-bold mb-3">Left Hand Control</h3>
                <ul className="space-y-2 text-sm text-dark-400">
                  <li><span className="text-cyan-400">1 finger:</span> &quot;Mita Agency&quot; (Blue)</li>
                  <li><span className="text-yellow-400">2 fingers:</span> &quot;The best&quot; (Yellow)</li>
                  <li><span className="text-pink-400">3 fingers:</span> &quot;Marketing&quot; (Pink)</li>
                  <li><span className="text-green-400">4 fingers:</span> &quot;Agency.&quot; (Green)</li>
                  <li><span className="text-white">5 fingers:</span> Catch Mode</li>
                </ul>
              </div>

              <div className="p-6 glass rounded-xl border border-purple-500/20">
                <h3 className="text-purple-400 font-display font-bold mb-3">Right Hand Physics</h3>
                <ul className="space-y-2 text-sm text-dark-400">
                  <li><span className="text-white">Point/Fist:</span> Scatter particles</li>
                  <li><span className="text-white">Open Hand:</span> Nebula mode</li>
                  <li><span className="text-white">Move through:</span> Water ripple effect</li>
                </ul>
              </div>

              <div className="p-6 glass rounded-xl border border-pink-500/20">
                <h3 className="text-pink-400 font-display font-bold mb-3">Ultimate Combo</h3>
                <ul className="space-y-2 text-sm text-dark-400">
                  <li><span className="text-white">Both hands open:</span></li>
                  <li>Particles form a rotating 3D basketball in your left hand!</li>
                  <li className="text-orange-400 text-lg">🏀 Basketball Mode</li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Fullscreen button */}
          {!isFullscreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center mb-6"
            >
              <button
                onClick={toggleFullscreen}
                className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-xl hover:bg-white/10 transition-colors text-cyan-400"
                aria-label="Enter fullscreen"
              >
                <Maximize2 className="w-5 h-5" />
                <span className="text-sm font-medium">Enter Fullscreen</span>
              </button>
            </motion.div>
          )}

          {/* Iframe container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`relative ${isFullscreen ? 'w-full h-full' : 'aspect-video rounded-2xl overflow-hidden border-2 border-cyan-500/30'}`}
            style={!isFullscreen ? { boxShadow: '0 0 60px rgba(0, 255, 255, 0.15)' } : {}}
          >
            <iframe
              src="/cyberpunk-system.html"
              className="w-full h-full border-0"
              allow="camera; microphone"
              title="Cyberpunk Interactive System"
            />

            {/* Fullscreen exit button */}
            {isFullscreen && (
              <button
                onClick={toggleFullscreen}
                className="fixed top-4 right-4 z-50 p-3 glass rounded-xl hover:bg-white/10 transition-colors"
                aria-label="Exit fullscreen"
              >
                <Minimize2 className="w-5 h-5 text-cyan-400" />
              </button>
            )}
          </motion.div>

        </div>
      </div>

      {/* Footer - Hidden in fullscreen */}
      {!isFullscreen && (
        <footer className="py-16 border-t border-dark-800 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              <div>
                <Link href="/" className="inline-block mb-6">
                  <Image
                    src="/logo-red.png"
                    alt="MITA Agency"
                    width={200}
                    height={50}
                    className="h-11 w-auto"
                  />
                </Link>
                <p className="text-dark-500 mb-6">
                  AI-powered marketing agency for companies that want to stay ahead.
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a 
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center text-dark-400 hover:text-white hover:bg-brand transition-colors"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-display font-bold mb-6">Get in Touch</h4>
                <ul className="space-y-3 text-dark-400">
                  <li>Maršala Tita 22</li>
                  <li>Sarajevo 71000</li>
                  <li>Bosnia i Hercegovina</li>
                  <li className="pt-2">Email: info@mita.ba</li>
                  <li>Tel: +387 33 27 85 00</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-display font-bold mb-6">Company</h4>
                <ul className="space-y-3 text-dark-400">
                  <li><Link href="/team" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/portfolio" className="hover:text-white transition-colors">Case Studies</Link></li>
                  <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-display font-bold mb-6">Services</h4>
                <ul className="space-y-3 text-dark-400">
                  <li><Link href="/services" className="hover:text-white transition-colors">AI Content Strategy</Link></li>
                  <li><Link href="/services" className="hover:text-white transition-colors">Marketing Automation</Link></li>
                  <li><Link href="/services" className="hover:text-white transition-colors">Performance Marketing</Link></li>
                  <li><Link href="/services" className="hover:text-white transition-colors">Brand Development</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-dark-800 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-dark-500 text-sm">
                © 2026 MITA Agency. All rights reserved.
              </p>
              <p className="text-dark-600 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                Crafted with code, not WordPress
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
