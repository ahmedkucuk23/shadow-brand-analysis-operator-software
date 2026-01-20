import Link from "next/link";
import { 
  ArrowRight, 
  Lock, 
  Calendar, 
  Target, 
  Lightbulb, 
  Users, 
  Megaphone, 
  TrendingUp, 
  Rocket, 
  BarChart3,
  CheckCircle2,
  Star
} from "lucide-react";

export const metadata = {
  title: "14-Day Strategic Plan | Shadow Operator",
  description: "Master your Shadow Operating business with our comprehensive 14-day strategic plan. From foundation to scale, we guide you every step of the way.",
};

export default function ShadowOperatorPage() {
  const phases = [
    {
      days: "Day 1-3",
      title: "Foundation & Strategy",
      icon: Lightbulb,
      color: "blue",
      description: "Establish your business foundation with clear goals, market research, and strategic positioning.",
      tasks: [
        "Define your unique value proposition",
        "Identify your target market and ideal customer",
        "Conduct competitor landscape analysis",
        "Set measurable goals and KPIs",
        "Create your brand identity framework",
        "Establish your business model canvas",
      ],
    },
    {
      days: "Day 4-7",
      title: "Brand Development",
      icon: Target,
      color: "violet",
      description: "Build a compelling brand that resonates with your audience and stands out in the market.",
      tasks: [
        "Develop your brand voice and messaging",
        "Create customer personas",
        "Design your visual identity system",
        "Build your content strategy foundation",
        "Set up your online presence",
        "Create your brand guidelines document",
      ],
    },
    {
      days: "Day 8-11",
      title: "Market Launch",
      icon: Megaphone,
      color: "purple",
      description: "Execute your go-to-market strategy and start acquiring your first customers.",
      tasks: [
        "Launch your marketing channels",
        "Implement your sales funnel",
        "Create your lead generation system",
        "Set up email marketing automation",
        "Launch social media presence",
        "Begin outreach campaigns",
      ],
    },
    {
      days: "Day 12-14",
      title: "Scale & Optimize",
      icon: TrendingUp,
      color: "pink",
      description: "Analyze results, optimize processes, and prepare for sustainable growth.",
      tasks: [
        "Analyze initial performance data",
        "Optimize conversion funnels",
        "Implement feedback loops",
        "Create scaling roadmap",
        "Set up monitoring systems",
        "Plan for month 2 and beyond",
      ],
    },
  ];

  const benefits = [
    {
      icon: Calendar,
      title: "Day-by-Day Guidance",
      description: "Clear, actionable tasks for each day of the 14-day program.",
    },
    {
      icon: Users,
      title: "Proven Framework",
      description: "Battle-tested methodology used by hundreds of successful businesses.",
    },
    {
      icon: Rocket,
      title: "Fast Results",
      description: "Go from zero to launch-ready in just two weeks.",
    },
    {
      icon: BarChart3,
      title: "Measurable Progress",
      description: "Track your progress with built-in milestones and checkpoints.",
    },
  ];

  return (
    <main className="pt-32 pb-20">
      {/* Hero */}
      <section className="bg-gradient-mesh pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">14-Day Strategic Plan</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Your Complete
              <span className="text-gradient"> Business Launch</span> Roadmap
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              A comprehensive A-to-Z guide to launching your Shadow Operating business. 
              Every day, every task, every milestone — all mapped out for success.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard" className="btn-primary text-lg flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Access Full Plan
              </Link>
              <Link href="/pricing" className="btn-secondary text-lg">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-slate-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14-Day Plan Overview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              The
              <span className="text-gradient"> 14-Day</span> Journey
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Four strategic phases designed to take you from idea to launch-ready business.
            </p>
          </div>

          <div className="space-y-8">
            {phases.map((phase, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-sm">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-${phase.color}-100 flex items-center justify-center`}>
                        <phase.icon className={`w-6 h-6 text-${phase.color}-600`} />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-blue-600">{phase.days}</span>
                        <h3 className="text-xl font-bold text-slate-900">{phase.title}</h3>
                      </div>
                    </div>
                    <p className="text-slate-600">{phase.description}</p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid md:grid-cols-2 gap-4">
                      {phase.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="flex items-start gap-3 bg-slate-50 rounded-xl p-4">
                          <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Lock className="w-3 h-3 text-slate-500" />
                          </div>
                          <span className="text-slate-700 text-sm">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Achieve */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                What You&apos;ll Achieve in
                <span className="text-gradient"> 14 Days</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                By the end of this program, you&apos;ll have a fully operational Shadow Operating 
                business with all the systems, strategies, and momentum needed for growth.
              </p>

              <ul className="space-y-4">
                {[
                  "A clear, differentiated market position",
                  "Professional brand identity and messaging",
                  "Active marketing channels generating leads",
                  "Sales funnel converting visitors to customers",
                  "Systems for sustainable growth",
                  "Roadmap for scaling beyond launch",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-500 rounded-3xl blur-3xl opacity-20" />
              <div className="relative bg-slate-900 rounded-3xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                  <span className="font-semibold">Success Story</span>
                </div>
                <blockquote className="text-lg mb-6 text-white/90 leading-relaxed">
                  &quot;The 14-day plan gave me the structure I needed to finally launch my business. 
                  Within a month, I had my first paying customers. The step-by-step approach 
                  made everything feel achievable.&quot;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-violet-400" />
                  <div>
                    <p className="font-semibold">Sarah M.</p>
                    <p className="text-white/60 text-sm">Shadow Operating Business Owner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-mesh">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Get instant access to the complete 14-day strategic plan and start 
            building your Shadow Operating business today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="btn-primary text-lg flex items-center gap-2">
              Get Full Access
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
