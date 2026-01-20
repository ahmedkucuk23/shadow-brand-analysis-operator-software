import Link from "next/link";
import { ArrowRight, Zap, Target, BarChart3, Calendar, Sparkles, Shield, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: Calendar,
      title: "14-Day Strategic Plan",
      description: "A comprehensive day-by-day action plan to launch and grow your Shadow Operating business from scratch.",
    },
    {
      icon: Target,
      title: "Brand Analysis",
      description: "Deep-dive analysis tools to understand your market position, competitors, and opportunities.",
    },
    {
      icon: BarChart3,
      title: "Performance Tracking",
      description: "Monitor your progress with intuitive dashboards and actionable insights.",
    },
    {
      icon: Zap,
      title: "Quick Implementation",
      description: "Step-by-step guidance that makes complex strategies simple to execute.",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Insights",
      description: "Leverage intelligent recommendations tailored to your specific business goals.",
    },
    {
      icon: Shield,
      title: "Proven Framework",
      description: "Built on battle-tested methodologies that have helped hundreds of businesses succeed.",
    },
  ];

  const benefits = [
    "Complete A-Z business launch roadmap",
    "Daily actionable tasks and milestones",
    "Brand positioning strategies",
    "Competitor analysis framework",
    "Market opportunity identification",
    "Customer persona development",
    "Revenue optimization tactics",
    "Growth scaling playbook",
  ];

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-mesh">
        <div className="absolute inset-0 bg-grid-light opacity-50" />
        
        {/* Floating gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-400/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: "-3s" }} />
        
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
          <div className="text-center max-w-4xl mx-auto stagger-children">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Launch Your Business in 14 Days</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight mb-6">
              Master Your
              <span className="text-gradient"> Shadow Operating </span>
              Business
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              From zero to launch in 14 days. Our comprehensive strategic planning and brand 
              analysis tools give you everything you need to build a successful business.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard" className="btn-primary text-lg flex items-center gap-2">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/pricing" className="btn-secondary text-lg">
                View Pricing
              </Link>
            </div>
            
            {/* Social Proof */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 border-2 border-white"
                    />
                  ))}
                </div>
                <span>500+ businesses launched</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1">4.9/5 rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Everything You Need to
              <span className="text-gradient"> Succeed</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our platform provides all the tools and guidance you need to launch, 
              grow, and scale your Shadow Operating business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / What We Offer Section */}
      <section id="about" className="py-24 bg-gradient-mesh">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Your Complete
                <span className="text-gradient"> Business Blueprint</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We&apos;ve distilled years of business expertise into a comprehensive 14-day 
                tweak plan specifically designed for Shadow Operating businesses. Combined 
                with our powerful brand analysis tools, you&apos;ll have everything you need.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link href="/shadow-operator" className="btn-primary inline-flex items-center gap-2">
                Explore the 14-Day Plan
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-500 rounded-3xl blur-3xl opacity-20" />
              <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Day 1-3</h4>
                      <p className="text-slate-500 text-sm">Foundation & Strategy</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                      <Target className="w-6 h-6 text-violet-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Day 4-7</h4>
                      <p className="text-slate-500 text-sm">Brand Development</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Day 8-11</h4>
                      <p className="text-slate-500 text-sm">Market Launch</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Day 12-14</h4>
                      <p className="text-slate-500 text-sm">Scale & Optimize</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Simple,
              <span className="text-gradient"> Transparent</span> Pricing
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              One plan, everything included. No hidden fees, no surprises.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="pricing-featured rounded-3xl p-8 text-white">
              <div className="text-center mb-8">
                <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm font-medium mb-4">
                  Full Access
                </span>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold">$99</span>
                  <span className="text-white/60">/month</span>
                </div>
                <p className="text-white/70 mt-2">Everything you need to succeed</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Complete 14-Day Strategic Plan",
                  "Full Brand Analysis Tools",
                  "Competitor Research Framework",
                  "Customer Persona Builder",
                  "Progress Tracking Dashboard",
                  "Priority Email Support",
                  "Weekly Strategy Updates",
                  "Community Access",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/dashboard"
                className="block w-full py-4 bg-white text-slate-900 rounded-xl font-semibold text-center hover:bg-slate-100 transition-colors"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-mesh relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-light opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-400/20 rounded-full blur-[150px]" />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Join hundreds of entrepreneurs who have successfully launched their 
            Shadow Operating businesses with our proven methodology.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="btn-primary text-lg flex items-center gap-2">
              Start Your 14-Day Plan
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="btn-secondary text-lg">
              Have Questions?
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
