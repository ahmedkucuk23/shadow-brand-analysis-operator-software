"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Menu, 
  X, 
  Mail, 
  Phone, 
  MapPin,
  Send,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
  Sparkles
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

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-brand-light/5 rounded-full blur-[150px]" />
      </div>

      {/* Navigation */}
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
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className="text-dark-400 hover:text-white transition-colors animated-underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Desktop CTA button */}
              <div className="hidden md:flex items-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white rounded-xl font-semibold hover:bg-brand-dark transition-colors"
                >
                  Let&apos;s Talk
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Mobile Hamburger Button */}
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

      {/* Mobile Full-Screen Menu */}
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

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-brand font-semibold mb-4 block">GET IN TOUCH</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
              Let&apos;s create something <span className="text-gradient">amazing</span> together
            </h1>
            <p className="text-lg text-dark-400">
              Ready to transform your marketing with AI? We&apos;d love to hear about your project 
              and discuss how we can help you achieve your goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-8 glass rounded-2xl">
                <h2 className="text-2xl font-display font-bold mb-6">Send us a message</h2>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-dark-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-dark-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-dark-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-dark-300 mb-2">
                      What service are you interested in?
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                    >
                      <option value="">Select a service</option>
                      <option value="ai-content">AI Content Strategy</option>
                      <option value="automation">Marketing Automation</option>
                      <option value="performance">Performance Marketing</option>
                      <option value="brand">Brand Development</option>
                      <option value="analytics">Intelligent Analytics</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-dark-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand text-white rounded-xl font-semibold text-lg hover:bg-brand-dark transition-colors"
                  >
                    Send Message
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-display font-bold mb-6">Contact Information</h2>
                <p className="text-dark-400 mb-8">
                  Prefer to reach out directly? Here&apos;s how you can get in touch with us.
                </p>
                
                <div className="space-y-6">
                  <a 
                    href="mailto:info@mita.ba" 
                    className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                      <Mail className="w-6 h-6 text-brand" />
                    </div>
                    <div>
                      <div className="text-sm text-dark-500">Email</div>
                      <div className="font-semibold">info@mita.ba</div>
                    </div>
                  </a>
                  
                  <a 
                    href="tel:+38733278500" 
                    className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                      <Phone className="w-6 h-6 text-brand" />
                    </div>
                    <div>
                      <div className="text-sm text-dark-500">Phone</div>
                      <div className="font-semibold">+387 33 27 85 00</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 glass rounded-xl">
                    <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-brand" />
                    </div>
                    <div>
                      <div className="text-sm text-dark-500">Fax</div>
                      <div className="font-semibold">+387 33 27 85 10</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 glass rounded-xl">
                    <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-brand" />
                    </div>
                    <div>
                      <div className="text-sm text-dark-500">Location</div>
                      <div className="font-semibold">Maršala Tita 22</div>
                      <div className="text-dark-400 text-sm">Sarajevo 71000, Bosnia i Hercegovina</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-display font-bold mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a 
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-12 h-12 rounded-xl bg-dark-800 flex items-center justify-center text-dark-400 hover:text-white hover:bg-brand transition-colors"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Response */}
              <div className="p-6 glass rounded-2xl border-l-4 border-brand">
                <h3 className="font-display font-bold mb-2">Quick Response Guarantee</h3>
                <p className="text-dark-400 text-sm">
                  We typically respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please call us directly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
}
