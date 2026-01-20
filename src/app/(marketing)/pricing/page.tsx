import Link from "next/link";
import { CheckCircle2, Zap, Shield, HeadphonesIcon, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Pricing | Shadow Operator",
  description: "Simple, transparent pricing for Shadow Operator. Get full access to our 14-day strategic plan and brand analysis tools for $99/month.",
};

export default function PricingPage() {
  const features = [
    {
      category: "Shadow Operator",
      items: [
        "Complete 14-Day Strategic Plan",
        "Day-by-day action items",
        "Business foundation templates",
        "Market positioning guides",
        "Revenue model frameworks",
        "Scaling playbook",
      ],
    },
    {
      category: "Brand Analysis",
      items: [
        "Competitor analysis tools",
        "Market opportunity finder",
        "Customer persona builder",
        "Brand positioning matrix",
        "SWOT analysis framework",
        "Trend identification",
      ],
    },
    {
      category: "Platform Features",
      items: [
        "Progress tracking dashboard",
        "Interactive checklists",
        "Resource library access",
        "Strategy templates",
        "Export & share reports",
        "Mobile-friendly access",
      ],
    },
    {
      category: "Support & Community",
      items: [
        "Priority email support",
        "Weekly strategy updates",
        "Community forum access",
        "Monthly Q&A sessions",
        "Success stories library",
        "Partner discounts",
      ],
    },
  ];

  const faqs = [
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.",
    },
    {
      question: "Is there a free trial?",
      answer: "We offer a 7-day money-back guarantee. If you're not satisfied within the first week, we'll refund your payment in full.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal.",
    },
    {
      question: "Can I share my account with my team?",
      answer: "The standard plan is for individual use. Contact us for team pricing if you need multiple seats.",
    },
  ];

  return (
    <main className="pt-32 pb-20">
      {/* Hero */}
      <section className="bg-gradient-mesh pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Simple,
              <span className="text-gradient"> Transparent</span> Pricing
            </h1>
            <p className="text-xl text-slate-600">
              One plan, full access. Everything you need to launch and grow your 
              Shadow Operating business.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Main Pricing Card */}
            <div className="lg:col-span-3">
              <div className="pricing-featured rounded-3xl p-8 md:p-12 text-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                  <div>
                    <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm font-medium mb-4">
                      Full Access
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-bold">$99</span>
                      <span className="text-white/60 text-xl">/month</span>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>

                <div className="grid sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Instant Access</p>
                      <p className="text-white/60 text-sm">Start immediately</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">7-Day Guarantee</p>
                      <p className="text-white/60 text-sm">Full refund</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <HeadphonesIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Priority Support</p>
                      <p className="text-white/60 text-sm">We&apos;re here to help</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-4">Why choose us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5" />
                    <span className="text-slate-600">Proven methodology used by 500+ businesses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5" />
                    <span className="text-slate-600">Step-by-step guidance from day one</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5" />
                    <span className="text-slate-600">Regular updates and new features</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <p className="text-blue-900 font-medium mb-2">Need a custom plan?</p>
                <p className="text-blue-700 text-sm mb-4">
                  Contact us for team pricing or enterprise solutions.
                </p>
                <Link
                  href="/contact"
                  className="text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors"
                >
                  Get in touch →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything Included
            </h2>
            <p className="text-lg text-slate-600">
              Full access to all features, no limitations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-slate-900 mb-4">{section.category}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-slate-100">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-mesh">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Join hundreds of entrepreneurs building successful Shadow Operating businesses.
          </p>
          <Link href="/dashboard" className="btn-primary text-lg inline-flex items-center gap-2">
            Start Your Journey
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
