"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Menu, 
  X, 
  CheckCircle2,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
  BrainCircuit,
  Bot,
  Target,
  MessageSquare,
  BarChart3,
  Rocket,
  Sparkles,
  TrendingUp,
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

const services = [
  {
    icon: BrainCircuit,
    title: "AI Content Strategy",
    description: "AI-powered content planning that analyzes trends, audience behavior, and competitive landscape to create winning strategies that drive engagement and conversions.",
    features: ["Trend prediction & analysis", "Audience behavior insights", "Competitive intelligence", "Content calendar automation", "Performance optimization"],
    highlight: "Most Popular"
  },
  {
    icon: Bot,
    title: "Chatbot & Automation",
    description: "Custom AI chatbots and marketing automation systems that engage customers 24/7, qualify leads automatically, and nurture prospects through personalized journeys.",
    features: ["24/7 customer engagement", "Intelligent lead qualification", "Smart routing & escalation", "Multi-platform integration", "Conversation analytics"],
    highlight: null
  },
  {
    icon: Target,
    title: "Predictive Targeting",
    description: "Machine learning algorithms that identify your ideal customers, predict purchase intent, and optimize ad spend for maximum ROI across all channels.",
    features: ["Lookalike audience modeling", "Predictive bid optimization", "Cross-channel attribution", "Customer lifetime value prediction", "Churn prevention"],
    highlight: null
  },
  {
    icon: MessageSquare,
    title: "AI Copywriting",
    description: "Generate high-converting copy at scale using AI trained on millions of successful campaigns. From ads to emails, we create content that resonates.",
    features: ["A/B testing at scale", "Dynamic personalization", "Multi-language support", "Brand voice consistency", "SEO optimization"],
    highlight: null
  },
  {
    icon: BarChart3,
    title: "Intelligent Analytics",
    description: "Real-time dashboards with AI-powered insights that surface hidden opportunities, detect anomalies, and predict future outcomes with remarkable accuracy.",
    features: ["Real-time anomaly detection", "Predictive forecasting", "Custom report automation", "Data visualization", "Actionable recommendations"],
    highlight: null
  },
  {
    icon: Rocket,
    title: "Growth Engineering",
    description: "Full-stack growth hacking combining AI tools, automation, and human expertise to build sustainable growth systems that compound over time.",
    features: ["Funnel optimization", "Viral loop design", "Retention systems", "Referral programs", "Growth experimentation"],
    highlight: "Best ROI"
  }
];

export default function ServicesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-brand-light/5 rounded-full blur-[150px]" />
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
                      link.href === "/services" ? "text-white" : "text-dark-400 hover:text-white"
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
            <span className="text-brand font-semibold mb-4 block">OUR SERVICES</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
              AI-powered marketing <span className="text-gradient">solutions</span>
            </h1>
            <p className="text-lg text-dark-400">
              We combine cutting-edge artificial intelligence with proven marketing strategies 
              to deliver exceptional results. Every service is designed to scale your business 
              and maximize ROI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 border-y border-dark-800 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: TrendingUp, value: "3.2x", label: "Average ROI" },
              { icon: Zap, value: "3x", label: "Faster Launch" },
              { icon: Target, value: "89%", label: "Targeting Accuracy" },
              { icon: Sparkles, value: "150+", label: "Projects Completed" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-brand mx-auto mb-3" />
                <div className="text-3xl font-display font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-dark-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative p-8 glass rounded-2xl hover:bg-white/10 transition-all duration-300 hover-lift"
              >
                {service.highlight && (
                  <div className="absolute -top-3 right-6 px-3 py-1 bg-brand text-white text-xs font-semibold rounded-full">
                    {service.highlight}
                  </div>
                )}
                
                <div className="w-14 h-14 rounded-xl bg-brand/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand/20 transition-all">
                  <service.icon className="w-7 h-7 text-brand" />
                </div>
                
                <h3 className="text-2xl font-display font-bold mb-4">{service.title}</h3>
                <p className="text-dark-400 mb-6">{service.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-dark-300">
                      <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 text-brand font-semibold hover:gap-3 transition-all"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              Not sure which service is right for you?
            </h2>
            <p className="text-lg text-dark-400 mb-10">
              Let&apos;s have a conversation about your goals. We&apos;ll help you identify 
              the perfect combination of services to achieve maximum impact.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand text-white rounded-xl font-semibold text-lg hover:bg-brand-dark transition-colors"
            >
              Book a Free Consultation
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
