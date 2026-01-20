"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Bot, 
  BarChart3, 
  Megaphone, 
  Zap,
  Play,
  CheckCircle2,
  ArrowUpRight,
  MessageSquare,
  TrendingUp,
  Target,
  Cpu,
  BrainCircuit,
  Rocket,
  Menu,
  X,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Linkedin
} from "lucide-react";

const socialLinks = [
  { href: "https://www.facebook.com/MITAgroupBiH", icon: Facebook, label: "Facebook" },
  { href: "https://twitter.com/MITAGroup", icon: Twitter, label: "X (Twitter)" },
  { href: "https://www.youtube.com/user/mitaedina", icon: Youtube, label: "YouTube" },
  { href: "https://www.instagram.com/mita_group/", icon: Instagram, label: "Instagram" },
  { href: "https://www.linkedin.com/company/mita-group-sarajevo/", icon: Linkedin, label: "LinkedIn" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/cyberpunk", label: "Cyberpunk" },
  { href: "/blog", label: "Insights" },
  { href: "/team", label: "Team" },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-950 text-white overflow-x-hidden">
      {/* Ambient background effects - hidden on mobile for performance */}
      <div className="fixed inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-brand-light/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-brand/3 rounded-full blur-[150px]" />
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
                {/* White logo version for dark glass background */}
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
            {/* Background overlay - solid on mobile for performance */}
            <div 
              className="absolute inset-0 bg-dark-950"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative h-full flex flex-col"
            >
              {/* Mobile Header */}
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

              {/* Mobile Navigation Links */}
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

                {/* Mobile CTA Button */}
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

              {/* Mobile Footer */}
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
      <section className="relative min-h-screen flex items-center pt-32 pb-20">
        <div className="absolute inset-0 bg-grid opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-5xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8">
              <span className="w-2 h-2 bg-brand rounded-full animate-pulse" />
              <span className="text-sm text-dark-300">AI-Powered Marketing Agency</span>
            </motion.div>

            {/* Main headline */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] tracking-tight mb-6"
            >
              Marketing that
              <br />
              <span className="text-gradient">thinks ahead</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl text-dark-400 max-w-2xl mx-auto mb-10"
            >
              We combine human creativity with artificial intelligence to deliver 
              marketing campaigns that predict trends, personalize at scale, and 
              drive unprecedented growth.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand text-white rounded-xl font-semibold text-lg hover:bg-brand-dark transition-colors"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 glass rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                <Play className="w-5 h-5" />
                View Our Work
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {[
                { value: "150+", label: "Projects Delivered" },
                { value: "3.2x", label: "Average ROI" },
                { value: "50M+", label: "Reach Generated" },
                { value: "98%", label: "Client Satisfaction" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl sm:text-4xl font-display font-bold text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-dark-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-dark-700 flex items-start justify-center p-2">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-brand rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Marquee Section */}
      <section className="py-8 border-y border-dark-800 overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center gap-12 mx-6">
              {[
                "AI Strategy", "Content Creation", "Performance Marketing", 
                "Brand Development", "Social Media", "Analytics", 
                "Automation", "Lead Generation"
              ].map((item, i) => (
                <span key={i} className="text-2xl font-display font-bold text-dark-700 flex items-center gap-4">
                  {item}
                  <Sparkles className="w-6 h-6 text-brand/50" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* AI Services Section */}
      <section className="py-24 sm:py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <span className="text-brand font-semibold mb-4 block">WHAT WE DO</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
              AI-driven services for the <span className="text-gradient">modern era</span>
            </h2>
            <p className="text-lg text-dark-400">
              We leverage cutting-edge AI technology to transform your marketing efforts. 
              From predictive analytics to automated content creation, we&apos;re at the forefront of innovation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: BrainCircuit,
                title: "AI Content Strategy",
                description: "AI-powered content planning that analyzes trends, audience behavior, and competitive landscape to create winning strategies.",
                features: ["Trend prediction", "Audience insights", "Content calendar"]
              },
              {
                icon: Bot,
                title: "Chatbot & Automation",
                description: "Custom AI chatbots and marketing automation that engage customers 24/7 and nurture leads automatically.",
                features: ["24/7 engagement", "Lead qualification", "Smart routing"]
              },
              {
                icon: Target,
                title: "Predictive Targeting",
                description: "Machine learning algorithms that identify your ideal customers and optimize ad spend for maximum ROI.",
                features: ["Lookalike audiences", "Bid optimization", "Attribution modeling"]
              },
              {
                icon: MessageSquare,
                title: "AI Copywriting",
                description: "Generate high-converting copy at scale using AI trained on millions of successful campaigns.",
                features: ["A/B testing at scale", "Personalization", "Multi-language"]
              },
              {
                icon: BarChart3,
                title: "Intelligent Analytics",
                description: "Real-time dashboards with AI-powered insights that surface opportunities and predict outcomes.",
                features: ["Anomaly detection", "Forecasting", "Custom reports"]
              },
              {
                icon: Rocket,
                title: "Growth Engineering",
                description: "Full-stack growth hacking combining AI tools, automation, and human expertise for explosive results.",
                features: ["Funnel optimization", "Viral loops", "Retention systems"]
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 glass rounded-2xl hover:bg-white/10 transition-all duration-300 hover-lift"
              >
                <div className="w-14 h-14 rounded-xl bg-brand/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand/20 transition-all">
                  <service.icon className="w-7 h-7 text-brand" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{service.title}</h3>
                <p className="text-dark-400 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-dark-500">
                      <CheckCircle2 className="w-4 h-4 text-brand" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link 
              href="/services"
              className="inline-flex items-center gap-2 text-brand font-semibold hover:gap-3 transition-all"
            >
              Explore all services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 sm:py-32 bg-dark-900/50 relative">
        <div className="absolute inset-0 bg-grid-dense opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          >
            <div>
              <span className="text-brand-light font-semibold mb-4 block">SELECTED WORK</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold">
                Projects that <span className="text-gradient">deliver</span>
              </h2>
            </div>
            <Link 
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 glass rounded-xl font-semibold hover:bg-white/10 transition-colors"
            >
              View all projects
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "TechFlow SaaS Launch",
                category: "AI Campaign",
                metrics: "+340% signups",
                gradient: "from-brand to-brand-light"
              },
              {
                title: "GreenLeaf Rebrand",
                category: "Brand Strategy",
                metrics: "2M reach",
                gradient: "from-emerald-600 to-teal-600"
              },
              {
                title: "FinanceHub Growth",
                category: "Performance Marketing",
                metrics: "4.5x ROAS",
                gradient: "from-amber-600 to-orange-600"
              },
              {
                title: "HealthPlus Automation",
                category: "Marketing Automation",
                metrics: "78% time saved",
                gradient: "from-violet-600 to-indigo-600"
              }
            ].map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer hover-lift"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90`} />
                <div className="absolute inset-0 bg-dark-950/40" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="text-sm font-medium text-white/70 mb-2">{project.category}</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold mb-3">{project.title}</h3>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-white" />
                    <span className="font-semibold text-white">{project.metrics}</span>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-dark-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="flex items-center gap-2 font-semibold">
                    View Case Study
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us / Process */}
      <section className="py-24 sm:py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-brand font-semibold mb-4 block">WHY MITA</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
              Not your average agency
            </h2>
            <p className="text-lg text-dark-400">
              We&apos;re engineers, data scientists, and creative strategists who believe 
              marketing should be measurable, automated, and constantly improving.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Cpu,
                title: "AI-First Approach",
                description: "Every strategy is enhanced with AI tools we build and customize for your needs."
              },
              {
                icon: Zap,
                title: "Speed to Market",
                description: "Launch campaigns 3x faster with our automated workflows and AI assistance."
              },
              {
                icon: BarChart3,
                title: "Data Obsessed",
                description: "Real-time analytics and weekly optimization ensure continuous improvement."
              },
              {
                icon: Megaphone,
                title: "Full Transparency",
                description: "Access to all data, clear reporting, and no hidden fees. Ever."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-dark-800 flex items-center justify-center mx-auto mb-6 border border-dark-700">
                  <item.icon className="w-8 h-8 text-brand" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{item.title}</h3>
                <p className="text-dark-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 sm:py-32 bg-dark-900/50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-brand-light font-semibold mb-4 block">TESTIMONIALS</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold">
              Trusted by <span className="text-gradient">innovators</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "MITA transformed our entire marketing approach. Their AI tools helped us identify opportunities we never knew existed.",
                author: "Sarah Chen",
                role: "CMO, TechFlow",
                avatar: "SC"
              },
              {
                quote: "The ROI we've seen since partnering with MITA has been incredible. They don't just run campaigns—they engineer growth systems.",
                author: "Marcus Webb",
                role: "Founder, GreenLeaf",
                avatar: "MW"
              },
              {
                quote: "Finally, an agency that speaks our language. Their technical expertise and creative thinking are unmatched.",
                author: "Lisa Park",
                role: "VP Marketing, FinanceHub",
                avatar: "LP"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 glass rounded-2xl"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Sparkles key={j} className="w-5 h-5 text-brand" />
                  ))}
                </div>
                <p className="text-lg mb-6 text-dark-200">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center font-bold text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-dark-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/10 rounded-full blur-[200px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              Ready to outperform your competition?
            </h2>
            <p className="text-xl text-dark-400 mb-10 max-w-2xl mx-auto">
              Let&apos;s discuss how AI-powered marketing can transform your business. 
              Book a free strategy call today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand text-white rounded-xl font-semibold text-lg hover:bg-brand-dark transition-colors"
              >
                Book Strategy Call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="mailto:info@mita.ba"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 glass rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                info@mita.ba
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-dark-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <Link href="/" className="inline-block mb-6">
                {/* Red logo for footer (dark background) */}
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
