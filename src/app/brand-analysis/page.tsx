import Link from "next/link";
import { 
  ArrowRight, 
  Lock, 
  Search, 
  Users, 
  TrendingUp, 
  BarChart3, 
  Eye,
  Layers,
  Target,
  Lightbulb,
  CheckCircle2,
  Crosshair
} from "lucide-react";

export const metadata = {
  title: "Brand Analysis Tools | Shadow Operator",
  description: "Powerful brand analysis tools to understand your market, competitors, and opportunities. Make data-driven decisions for your business.",
};

export default function BrandAnalysisPage() {
  const tools = [
    {
      icon: Search,
      title: "Competitor Analysis",
      description: "Deep-dive into your competitors' strategies, strengths, and weaknesses to find your edge.",
      features: [
        "Competitor identification framework",
        "Strengths & weaknesses mapping",
        "Pricing comparison matrix",
        "Marketing channel analysis",
      ],
    },
    {
      icon: Users,
      title: "Customer Persona Builder",
      description: "Create detailed customer profiles to target your ideal audience with precision.",
      features: [
        "Demographic profiling",
        "Psychographic analysis",
        "Pain points identification",
        "Buying behavior mapping",
      ],
    },
    {
      icon: Target,
      title: "Market Positioning",
      description: "Find your unique position in the market and craft messaging that resonates.",
      features: [
        "Position mapping canvas",
        "Differentiation strategy",
        "Value proposition design",
        "Messaging framework",
      ],
    },
    {
      icon: Eye,
      title: "Opportunity Finder",
      description: "Identify untapped market opportunities and gaps you can capitalize on.",
      features: [
        "Market gap analysis",
        "Trend identification",
        "Blue ocean strategy",
        "Growth opportunity scoring",
      ],
    },
    {
      icon: Layers,
      title: "SWOT Analysis",
      description: "Comprehensive analysis of your business's strengths, weaknesses, opportunities, and threats.",
      features: [
        "Internal strength audit",
        "Weakness mitigation plans",
        "Opportunity prioritization",
        "Threat assessment matrix",
      ],
    },
    {
      icon: BarChart3,
      title: "Performance Metrics",
      description: "Track and measure your brand's performance against industry benchmarks.",
      features: [
        "KPI dashboard",
        "Industry benchmarking",
        "Progress tracking",
        "ROI analysis tools",
      ],
    },
  ];

  const benefits = [
    {
      icon: Crosshair,
      title: "Data-Driven Decisions",
      description: "Make strategic choices backed by solid research and analysis.",
    },
    {
      icon: TrendingUp,
      title: "Competitive Advantage",
      description: "Stay ahead of competitors with deep market insights.",
    },
    {
      icon: Lightbulb,
      title: "Clear Direction",
      description: "Know exactly where to focus your resources for maximum impact.",
    },
  ];

  return (
    <main className="pt-32 pb-20">
      {/* Hero */}
      <section className="bg-gradient-mesh pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-100 mb-8">
              <BarChart3 className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-medium text-violet-700">Brand Analysis Suite</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Understand Your
              <span className="text-gradient"> Market</span> Deeply
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Powerful analysis tools to research your market, understand competitors, 
              and identify opportunities for your Shadow Operating business.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard" className="btn-primary text-lg flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Access Analysis Tools
              </Link>
              <Link href="/pricing" className="btn-secondary text-lg">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-white/60 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Comprehensive
              <span className="text-gradient"> Analysis Tools</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to understand your market and make informed strategic decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <div key={index} className="feature-card group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{tool.title}</h3>
                <p className="text-slate-600 mb-6">{tool.description}</p>
                
                <ul className="space-y-2">
                  {tool.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm">
                      <Lock className="w-3 h-3 text-slate-400" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              How Brand Analysis
              <span className="text-gradient"> Works</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our structured approach helps you gather insights and make strategic decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Research",
                description: "Gather data about your market, competitors, and target audience.",
              },
              {
                step: "02",
                title: "Analyze",
                description: "Use our frameworks to identify patterns, opportunities, and threats.",
              },
              {
                step: "03",
                title: "Strategize",
                description: "Develop actionable strategies based on your analysis insights.",
              },
              {
                step: "04",
                title: "Execute",
                description: "Implement your strategies with confidence and track results.",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-slate-100 mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 right-0 w-8 h-0.5 bg-slate-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration with 14-Day Plan */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-mesh rounded-3xl p-8">
                <div className="space-y-4">
                  {[
                    { day: "Day 1-2", task: "Competitor Analysis", status: "Complete market research" },
                    { day: "Day 3", task: "Customer Personas", status: "Define target audience" },
                    { day: "Day 4-5", task: "Positioning", status: "Find your market position" },
                    { day: "Day 6-7", task: "SWOT Analysis", status: "Assess opportunities" },
                  ].map((item, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-600">{item.day}</span>
                          <span className="text-xs text-slate-400">{item.status}</span>
                        </div>
                        <p className="font-semibold text-slate-900">{item.task}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Integrated with Your
                <span className="text-gradient"> 14-Day Plan</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Brand Analysis isn&apos;t a separate tool — it&apos;s woven directly into your 
                14-day strategic plan. The first week focuses heavily on research and 
                analysis to ensure your business is built on solid foundations.
              </p>
              <p className="text-slate-600 mb-8">
                Each analysis framework connects to specific action items in your plan, 
                so you&apos;re never just gathering data — you&apos;re building something real.
              </p>

              <Link href="/shadow-operator" className="btn-primary inline-flex items-center gap-2">
                View the 14-Day Plan
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-mesh">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Start Analyzing Your Market
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Get access to all brand analysis tools and the complete 14-day strategic plan 
            with a single subscription.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="btn-primary text-lg flex items-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="btn-secondary text-lg">
              Have Questions?
            </Link>
          </div>
          <p className="mt-6 text-slate-500 text-sm">
            $99/month · Cancel anytime · 7-day money-back guarantee
          </p>
        </div>
      </section>
    </main>
  );
}
