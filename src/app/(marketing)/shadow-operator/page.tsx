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
  Star,
  MessageCircle,
  Heart,
  Zap,
  ShoppingCart,
  FileText,
  Sparkles
} from "lucide-react";

export const metadata = {
  title: "14-Day Story Launch System | Creator Monetization",
  description: "A psychological, story-based launch framework for selling digital products through Instagram Stories. From warm-up to close cart in 14 days.",
};

export default function ShadowOperatorPage() {
  const phases = [
    {
      days: "Days 1-3",
      title: "Warm Up Phase",
      icon: MessageCircle,
      color: "amber",
      description: "Build connection through listening. Ask questions, make your audience feel heard, and gather real problems. NO product mention.",
      tasks: [
        "Day 1: The Survey — polls, sliders, question stickers",
        "Day 2: Validation & Curiosity — share responses, hint at solution",
        "Day 3: Commitment Activation — announce free week, get 🔥 commits",
      ],
    },
    {
      days: "Days 4-7",
      title: "Value Delivery Phase",
      icon: Lightbulb,
      color: "emerald",
      description: "Deliver massive free value. Show transformation, share frameworks, and build reciprocity. Make them think: 'If free is this good...'",
      tasks: [
        "Day 4: Opportunity — show what's possible, establish authority",
        "Day 5: Integration — answer DMs, build relationships",
        "Day 6: Transformation — deliver your 3-5 step framework",
        "Day 7: Amplification — share wins and social proof",
      ],
    },
    {
      days: "Days 8-9",
      title: "Transition Phase",
      icon: Zap,
      color: "orange",
      description: "Bridge from free value to paid offer. Create mental ownership and handle objections before they become blockers.",
      tasks: [
        "Day 8: Ownership Experience — 'Imagine having the complete system...'",
        "Day 9: Pre-Cart Q&A — address doubts, announce exact launch time",
      ],
    },
    {
      days: "Days 10-14",
      title: "Open Cart Phase",
      icon: ShoppingCart,
      color: "rose",
      description: "Launch with energy and urgency. Create buying momentum through social proof, handle last objections, and close with scarcity.",
      tasks: [
        "Day 10: Launch Day 🚀 — doors open, FOMO energy",
        "Day 11: Social Proof — share buyer DMs and momentum",
        "Day 12: FAQ Day — remove remaining barriers",
        "Day 13: 24-Hour Warning ⚠️ — maximum urgency",
        "Day 14: Close Cart 🔒 — final countdown, actual close",
      ],
    },
  ];

  const systemPhases = [
    {
      number: "01",
      title: "Monetization Gameplan",
      description: "Creator analysis, market opportunity, revenue projections",
    },
    {
      number: "02",
      title: "Personality DNA",
      description: "Brand voice, credentials, communication style",
    },
    {
      number: "03",
      title: "Audience DNA",
      description: "Ideal client psychology, pain points, desires",
    },
    {
      number: "04",
      title: "UVZ Analysis",
      description: "20 unique value propositions, scored and ranked",
    },
    {
      number: "05",
      title: "Coaching Offer",
      description: "5-week action plan, worksheets, program outline",
    },
    {
      number: "06",
      title: "Coaching Charter",
      description: "Complete offer summary document",
    },
    {
      number: "07",
      title: "Product DNA",
      description: "Problem-solution-offer framework, M.O.D.E.A analysis",
    },
    {
      number: "08",
      title: "14-Day Launch",
      description: "14 individual daily playbooks with scripts",
    },
  ];

  const benefits = [
    {
      icon: Calendar,
      title: "Daily Playbooks",
      description: "Exact scripts, story structures, and DM strategies for each day.",
    },
    {
      icon: Users,
      title: "Psychology-Based",
      description: "Every day designed around proven psychological triggers.",
    },
    {
      icon: Rocket,
      title: "30-40% Last Day",
      description: "More sales in final 2 hours than previous 4 days combined.",
    },
    {
      icon: BarChart3,
      title: "Complete System",
      description: "From DNA analysis to launch — everything builds sequentially.",
    },
  ];

  return (
    <main className="pt-32 pb-20">
      {/* Hero */}
      <section className="bg-gradient-mesh pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Creator Monetization System</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              14-Day Story
              <span className="text-gradient"> Launch System</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              A psychological, story-based framework for selling digital products through Instagram Stories.
              From warm-up to close cart — every day scripted for maximum conversions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login" className="btn-primary text-lg flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Access Full System
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

      {/* The Complete System */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              The Complete
              <span className="text-blue-400"> 8-Phase</span> System
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Each phase builds on the previous one. Sequential building ensures cohesion from analysis to launch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemPhases.map((phase, index) => (
              <div key={index} className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-4xl font-bold text-blue-400/30 mb-2">{phase.number}</div>
                <h3 className="text-lg font-semibold mb-2">{phase.title}</h3>
                <p className="text-white/60 text-sm">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14-Day Launch Overview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              The
              <span className="text-gradient"> 14-Day</span> Launch
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Four psychological phases designed to warm up your audience, deliver value, and convert followers into buyers.
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
                    <div className="space-y-3">
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

      {/* Psychology Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Built on
                <span className="text-gradient"> Psychology</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Every day is designed around proven psychological principles.
                From commitment activation to loss aversion — the system leverages how people actually make decisions.
              </p>

              <ul className="space-y-4">
                {[
                  "Listening creates trust faster than talking",
                  "Small public commitments lead to larger purchases",
                  "Mental ownership precedes physical purchase",
                  "Social proof from peers outweighs self-promotion 10:1",
                  "Loss aversion is 2x more powerful than desire for gain",
                  "Specificity (exact times) increases compliance",
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
                  <span className="font-semibold">Key Success Factor</span>
                </div>
                <blockquote className="text-lg mb-6 text-white/90 leading-relaxed">
                  &quot;30-40% of all sales happen in the last 2 hours of Day 14.
                  More than the previous 4 days combined. The countdown creates
                  real urgency that eliminates procrastination.&quot;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Day 14 Effect</p>
                    <p className="text-white/60 text-sm">Last-minute buying psychology</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              What You Get
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Complete deliverables for every phase of the monetization system.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: FileText, title: "Monetization Gameplan", desc: "Revenue projections & product ladder" },
              { icon: Heart, title: "Personality DNA", desc: "Your brand voice & authority positioning" },
              { icon: Users, title: "Audience DNA", desc: "Ideal client psychology & pain points" },
              { icon: Target, title: "UVZ Analysis", desc: "20 unique value propositions ranked" },
              { icon: Megaphone, title: "Coaching Offer", desc: "5-week plan, 10 worksheets, 5 modules" },
              { icon: FileText, title: "Coaching Charter", desc: "Complete offer summary document" },
              { icon: Lightbulb, title: "Product DNA", desc: "Problem-solution framework & M.O.D.E.A" },
              { icon: Calendar, title: "14 Daily Playbooks", desc: "Scripts, story structures, DM strategies" },
              { icon: BarChart3, title: "Tracking Templates", desc: "Hot leads list & conversion tracking" },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-slate-100">
                <item.icon className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-mesh">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Ready to Launch?
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Get the complete Creator Monetization System. From DNA analysis to
            14-day launch playbooks — everything you need to monetize your following.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="btn-primary text-lg flex items-center gap-2">
              Get Full Access
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="btn-secondary text-lg">
              Have Questions?
            </Link>
          </div>
          <p className="mt-6 text-slate-500 text-sm">
            Complete system · Sequential building · Proven psychology
          </p>
        </div>
      </section>
    </main>
  );
}
