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
  Calendar,
  Clock,
  ArrowUpRight,
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

const blogPosts = [
  {
    id: 1,
    title: "How AI is Revolutionizing Marketing in 2026",
    excerpt: "Discover the latest AI tools and strategies that are transforming how businesses connect with their audiences.",
    category: "AI & Technology",
    author: "Mita Team",
    date: "Jan 8, 2026",
    readTime: "5 min read",
    featured: true,
    gradient: "from-brand to-brand-light"
  },
  {
    id: 2,
    title: "The Complete Guide to Marketing Automation",
    excerpt: "Learn how to set up automated workflows that nurture leads and drive conversions while you sleep.",
    category: "Automation",
    author: "Mita Team",
    date: "Jan 5, 2026",
    readTime: "8 min read",
    featured: false,
    gradient: "from-purple-600 to-indigo-600"
  },
  {
    id: 3,
    title: "Predictive Analytics: The Future of Customer Targeting",
    excerpt: "How machine learning algorithms can identify your ideal customers before they even know they need you.",
    category: "Analytics",
    author: "Mita Team",
    date: "Jan 2, 2026",
    readTime: "6 min read",
    featured: false,
    gradient: "from-cyan-600 to-blue-600"
  },
  {
    id: 4,
    title: "Building a Brand That Resonates in the Digital Age",
    excerpt: "Key principles for creating a memorable brand identity that cuts through the noise online.",
    category: "Branding",
    author: "Mita Team",
    date: "Dec 28, 2025",
    readTime: "7 min read",
    featured: false,
    gradient: "from-emerald-600 to-teal-600"
  },
  {
    id: 5,
    title: "Social Media Trends to Watch This Year",
    excerpt: "From AI-generated content to immersive experiences, here's what's shaping social media marketing.",
    category: "Social Media",
    author: "Mita Team",
    date: "Dec 22, 2025",
    readTime: "4 min read",
    featured: false,
    gradient: "from-pink-600 to-rose-600"
  },
  {
    id: 6,
    title: "Maximizing ROI with Performance Marketing",
    excerpt: "Data-driven strategies to optimize your ad spend and achieve measurable business results.",
    category: "Performance",
    author: "Mita Team",
    date: "Dec 18, 2025",
    readTime: "6 min read",
    featured: false,
    gradient: "from-amber-600 to-orange-600"
  }
];

const categories = ["All", "AI & Technology", "Automation", "Analytics", "Branding", "Social Media", "Performance"];

export default function BlogPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured || activeCategory !== "All");

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
                      link.href === "/blog" ? "text-white" : "text-dark-400 hover:text-white"
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
            <span className="text-brand font-semibold mb-4 block">INSIGHTS & ARTICLES</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
              Marketing <span className="text-gradient">insights</span> for growth
            </h1>
            <p className="text-lg text-dark-400">
              Stay ahead with the latest trends, strategies, and insights from our 
              marketing experts. Learn how AI is transforming the industry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  activeCategory === category 
                    ? "bg-brand text-white" 
                    : "glass text-dark-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {activeCategory === "All" && featuredPost && (
        <section className="py-8 relative z-10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer hover-lift"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${featuredPost.gradient} opacity-90`} />
              <div className="absolute inset-0 bg-dark-950/40" />
              
              <div className="relative p-8 md:p-12 min-h-[400px] flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 glass rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 max-w-2xl">
                  {featuredPost.title}
                </h2>
                <p className="text-lg text-white/80 mb-6 max-w-2xl">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center gap-6 text-sm text-white/70">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <div className="absolute top-8 right-8 w-12 h-12 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {regularPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group glass rounded-2xl overflow-hidden hover-lift cursor-pointer"
                >
                  {/* Gradient header */}
                  <div className={`h-32 bg-gradient-to-br ${post.gradient} relative`}>
                    <div className="absolute inset-0 bg-dark-950/20" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 glass rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold mb-3 group-hover:text-brand transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-dark-400 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-dark-500">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[200px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
              Get insights delivered to your inbox
            </h2>
            <p className="text-lg text-dark-400 mb-8">
              Subscribe to our newsletter for the latest marketing trends, AI insights, and growth strategies.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-dark-900 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-brand text-white rounded-xl font-semibold hover:bg-brand-dark transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
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
