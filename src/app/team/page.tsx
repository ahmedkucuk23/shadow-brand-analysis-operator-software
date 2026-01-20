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
  Mail,
  Award,
  Users,
  Target,
  Zap
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

const teamMembers = [
  {
    id: 1,
    name: "Edina Mita",
    role: "Founder & CEO",
    bio: "Visionary leader with 20+ years in marketing, driving MITA's mission to transform businesses through innovative strategies.",
    initials: "EM",
    gradient: "from-brand to-brand-light",
    linkedin: "https://www.linkedin.com/company/mita-group-sarajevo/",
    email: "edina@mita.ba"
  },
  {
    id: 2,
    name: "Amar Hadžić",
    role: "Creative Director",
    bio: "Award-winning creative mind specializing in brand identity and visual storytelling that captures audience attention.",
    initials: "AH",
    gradient: "from-purple-600 to-indigo-600",
    linkedin: "https://www.linkedin.com/company/mita-group-sarajevo/",
    email: "amar@mita.ba"
  },
  {
    id: 3,
    name: "Lejla Kovačević",
    role: "Head of AI Strategy",
    bio: "Tech enthusiast leading our AI initiatives, turning cutting-edge technology into practical marketing solutions.",
    initials: "LK",
    gradient: "from-cyan-600 to-blue-600",
    linkedin: "https://www.linkedin.com/company/mita-group-sarajevo/",
    email: "lejla@mita.ba"
  },
  {
    id: 4,
    name: "Mirza Begović",
    role: "Performance Lead",
    bio: "Data-driven strategist maximizing ROI through precision targeting and continuous campaign optimization.",
    initials: "MB",
    gradient: "from-emerald-600 to-teal-600",
    linkedin: "https://www.linkedin.com/company/mita-group-sarajevo/",
    email: "mirza@mita.ba"
  },
  {
    id: 5,
    name: "Amina Selimović",
    role: "Content Strategist",
    bio: "Storyteller crafting compelling narratives that connect brands with their audiences on a deeper level.",
    initials: "AS",
    gradient: "from-pink-600 to-rose-600",
    linkedin: "https://www.linkedin.com/company/mita-group-sarajevo/",
    email: "amina@mita.ba"
  },
  {
    id: 6,
    name: "Denis Ibrahimović",
    role: "Tech Lead",
    bio: "Full-stack developer building innovative digital experiences and automation solutions for our clients.",
    initials: "DI",
    gradient: "from-amber-600 to-orange-600",
    linkedin: "https://www.linkedin.com/company/mita-group-sarajevo/",
    email: "denis@mita.ba"
  },
  {
    id: 7,
    name: "Sara Mehmedović",
    role: "Social Media Manager",
    bio: "Community builder growing engaged audiences across all major platforms with authentic, impactful content.",
    initials: "SM",
    gradient: "from-violet-600 to-purple-600",
    linkedin: "https://www.linkedin.com/company/mita-group-sarajevo/",
    email: "sara@mita.ba"
  },
  {
    id: 8,
    name: "Kenan Softić",
    role: "Account Director",
    bio: "Client relationship expert ensuring every project exceeds expectations and delivers measurable results.",
    initials: "KS",
    gradient: "from-sky-600 to-cyan-600",
    linkedin: "https://www.linkedin.com/company/mita-group-sarajevo/",
    email: "kenan@mita.ba"
  }
];

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "Every strategy we create is focused on delivering measurable business outcomes."
  },
  {
    icon: Zap,
    title: "Innovation First",
    description: "We embrace new technologies and methodologies to keep our clients ahead of the curve."
  },
  {
    icon: Users,
    title: "Client Partnership",
    description: "We work as an extension of your team, invested in your success as if it were our own."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We hold ourselves to the highest standards in everything we deliver."
  }
];

export default function TeamPage() {
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
              
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className={`transition-colors animated-underline ${
                      link.href === "/team" ? "text-white" : "text-dark-400 hover:text-white"
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
            <span className="text-brand font-semibold mb-4 block">OUR TEAM</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
              Meet the <span className="text-gradient">people</span> behind MITA
            </h1>
            <p className="text-lg text-dark-400">
              A passionate team of marketers, creatives, and technologists united by 
              one goal: helping your business grow through innovative strategies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 glass rounded-2xl text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-brand/20 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-brand" />
                </div>
                <h3 className="font-display font-bold mb-2">{value.title}</h3>
                <p className="text-dark-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              Our Leadership Team
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              Experienced professionals dedicated to delivering exceptional results for every client.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group glass rounded-2xl overflow-hidden hover-lift"
              >
                {/* Avatar with gradient */}
                <div className={`h-48 bg-gradient-to-br ${member.gradient} relative flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-dark-950/20" />
                  <span className="relative text-5xl font-display font-bold text-white/90">
                    {member.initials}
                  </span>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold mb-1 group-hover:text-brand transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-brand text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-dark-400 text-sm mb-4 line-clamp-3">
                    {member.bio}
                  </p>
                  
                  {/* Social Links */}
                  <div className="flex gap-3">
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-dark-800 flex items-center justify-center text-dark-400 hover:text-white hover:bg-brand transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a 
                      href={`mailto:${member.email}`}
                      className="w-9 h-9 rounded-lg bg-dark-800 flex items-center justify-center text-dark-400 hover:text-white hover:bg-brand transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[200px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
              Want to join our team?
            </h2>
            <p className="text-lg text-dark-400 mb-8">
              We&apos;re always looking for talented individuals who share our passion for 
              marketing innovation. Reach out if you&apos;d like to be part of MITA.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand text-white rounded-xl font-semibold text-lg hover:bg-brand-dark transition-colors"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
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
