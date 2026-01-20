import Link from "next/link";
import {
  ArrowRight,
  Lock,
  FileText,
  Users,
  Heart,
  Target,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Download,
  Lightbulb,
  Star
} from "lucide-react";

export const metadata = {
  title: "Brand Analysis | Personality DNA & Audience DNA Generator",
  description: "Generate your Personality DNA and Audience DNA PDFs. Define your brand voice, credentials, and deeply understand your ideal customer psychology.",
};

export default function BrandAnalysisPage() {
  const dnaTypes = [
    {
      icon: Heart,
      title: "Personality DNA",
      subtitle: "Your Brand Identity",
      description: "Define your unique brand voice, credentials, and communication style that will be used across all content and offers.",
      sections: [
        {
          title: "Brand Identity Core",
          items: ["Brand archetype (Expert, Coach, Rebel, Friend...)", "Core values (3-5 principles)", "Mission statement formula"],
        },
        {
          title: "Credentials & Authority",
          items: ["Professional background & certifications", "Social proof & achievements", "Unique expertise & proprietary methods"],
        },
        {
          title: "Communication Style",
          items: ["Voice characteristics spectrum", "Language patterns & signature phrases", "Content personality & tone"],
        },
        {
          title: "Content Pillars",
          items: ["3-4 primary topic pillars", "Content mix ratio", "Differentiators & unique perspective"],
        },
      ],
      output: "4-6 page PDF",
      color: "rose",
    },
    {
      icon: Users,
      title: "Audience DNA",
      subtitle: "Your Ideal Customer",
      description: "Deep psychological profile of your ideal customer that informs all messaging, content, and offer positioning.",
      sections: [
        {
          title: "Demographic Profile",
          items: ["Age, location, income, occupation", "Platform behavior & patterns", "Life stage & context"],
        },
        {
          title: "Psychographic Profile",
          items: ["Identity & self-perception", "Values & priorities", "Lifestyle & aspirations"],
        },
        {
          title: "Pain Points Analysis",
          items: ["Surface-level pain (what they say)", "Deep pain (what they feel)", "Emotional triggers framework"],
        },
        {
          title: "Desires & Objections",
          items: ["Immediate & ultimate desires", "Common objections with reframes", "Hidden fears to address"],
        },
      ],
      output: "6-8 page PDF",
      color: "blue",
    },
  ];

  const workflow = [
    {
      step: "01",
      title: "Fill Out Form",
      description: "Answer guided questions about yourself and your ideal customer.",
    },
    {
      step: "02",
      title: "AI Processing",
      description: "Our system analyzes your inputs and generates comprehensive DNA profiles.",
    },
    {
      step: "03",
      title: "Download PDFs",
      description: "Get your Personality DNA and Audience DNA as beautifully designed PDFs.",
    },
    {
      step: "04",
      title: "Use in Launch",
      description: "Apply your DNA profiles in the 14-Day Story Launch System.",
    },
  ];

  return (
    <main className="pt-32 pb-20">
      {/* Hero */}
      <section className="bg-gradient-mesh pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-100 mb-8">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-medium text-violet-700">Brand Analysis Tool</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Generate Your
              <span className="text-gradient"> DNA Profiles</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Create your <strong>Personality DNA</strong> and <strong>Audience DNA</strong> documents.
              The foundation for all your content, offers, and the 14-Day Launch.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login" className="btn-primary text-lg flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Start Generating
              </Link>
              <Link href="/shadow-operator" className="btn-secondary text-lg">
                View 14-Day Plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Two DNA Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Two Essential
              <span className="text-gradient"> DNA Documents</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything in the Creator Monetization System builds on these two foundational documents.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {dnaTypes.map((dna, index) => (
              <div key={index} className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-${dna.color}-100 flex items-center justify-center`}>
                    <dna.icon className={`w-7 h-7 text-${dna.color}-600`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{dna.title}</h3>
                    <p className="text-slate-500">{dna.subtitle}</p>
                  </div>
                </div>

                <p className="text-slate-600 mb-6">{dna.description}</p>

                <div className="space-y-4 mb-6">
                  {dna.sections.map((section, sIndex) => (
                    <div key={sIndex} className="bg-white rounded-xl p-4">
                      <h4 className="font-semibold text-slate-900 mb-2">{section.title}</h4>
                      <ul className="space-y-1">
                        {section.items.map((item, iIndex) => (
                          <li key={iIndex} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-white rounded-lg px-4 py-3">
                  <Download className="w-4 h-4" />
                  Output: {dna.output}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It
              <span className="text-blue-400"> Works</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Simple 4-step process to generate your DNA profiles.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {workflow.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-white/10 mb-4">{step.step}</div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm">{step.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 right-0 w-8 h-0.5 bg-white/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why DNA Matters */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Why DNA Documents
                <span className="text-gradient"> Matter</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Without clear Personality and Audience DNA, your content feels generic,
                your offers miss the mark, and your launch falls flat. These documents
                ensure every word you write resonates.
              </p>

              <ul className="space-y-4">
                {[
                  "Content sounds like YOU, not generic advice",
                  "Sales copy hits real pain points and desires",
                  "Objections handled before they arise",
                  "14-Day Launch scripts feel authentic",
                  "DMs connect on a deeper level",
                  "Offers positioned perfectly for your audience",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-blue-500 rounded-3xl blur-3xl opacity-20" />
              <div className="relative bg-slate-900 rounded-3xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                  <span className="font-semibold">Sequential Building</span>
                </div>
                <blockquote className="text-lg mb-6 text-white/90 leading-relaxed">
                  &quot;The 14-Day Story Launch System REQUIRES both Personality DNA
                  and Audience DNA. Without them, the scripts lack cohesion and
                  authenticity. Build the foundation first.&quot;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-blue-400 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Required for Launch</p>
                    <p className="text-white/60 text-sm">Foundation of the system</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Questions */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Questions We&apos;ll Ask
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Get a preview of the inputs needed to generate your DNA profiles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-rose-500" />
                <h3 className="text-lg font-semibold">Personality DNA Questions</h3>
              </div>
              <ul className="space-y-3 text-slate-600 text-sm">
                <li className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 text-slate-400 mt-0.5" />
                  What&apos;s your brand archetype? (Expert, Coach, Rebel, Friend...)
                </li>
                <li className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 text-slate-400 mt-0.5" />
                  What are your 3-5 core values?
                </li>
                <li className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 text-slate-400 mt-0.5" />
                  What certifications/experience do you have?
                </li>
                <li className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 text-slate-400 mt-0.5" />
                  How would you describe your communication style?
                </li>
                <li className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 text-slate-400 mt-0.5" />
                  What makes you different from others in your niche?
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-blue-500" />
                <h3 className="text-lg font-semibold">Audience DNA Questions</h3>
              </div>
              <ul className="space-y-3 text-slate-600 text-sm">
                <li className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 text-slate-400 mt-0.5" />
                  Who is your ideal customer? (age, occupation, life stage)
                </li>
                <li className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 text-slate-400 mt-0.5" />
                  What problems do they SAY they have?
                </li>
                <li className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 text-slate-400 mt-0.5" />
                  What do they really FEEL deep down?
                </li>
                <li className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 text-slate-400 mt-0.5" />
                  What transformation do they desire?
                </li>
                <li className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 text-slate-400 mt-0.5" />
                  What objections stop them from buying?
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-mesh">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Ready to Build Your Foundation?
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Generate your Personality DNA and Audience DNA documents.
            The essential first step before your 14-Day Launch.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="btn-primary text-lg flex items-center gap-2">
              Generate DNA Profiles
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/shadow-operator" className="btn-secondary text-lg">
              View 14-Day Plan
            </Link>
          </div>
          <p className="mt-6 text-slate-500 text-sm">
            Personality DNA + Audience DNA · Required for 14-Day Launch
          </p>
        </div>
      </section>
    </main>
  );
}
