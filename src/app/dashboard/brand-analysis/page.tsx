"use client";

import { useState } from "react";
import {
  Heart,
  Users,
  Sparkles,
  Download,
  Loader2,
  ChevronRight,
  ChevronDown,
  FileText,
  CheckCircle2,
} from "lucide-react";

type ActiveTab = "personality" | "audience";

export default function DashboardBrandAnalysisPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("personality");
  const [personalityGenerated, setPersonalityGenerated] = useState(false);
  const [audienceGenerated, setAudienceGenerated] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Brand Analysis</h1>
        <p className="text-slate-600 mt-1">
          Generate your Personality DNA and Audience DNA documents
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("personality")}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
            activeTab === "personality"
              ? "border-rose-500 text-rose-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <Heart className="w-5 h-5" />
          <span className="font-medium">Personality DNA</span>
          {personalityGenerated && (
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("audience")}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
            activeTab === "audience"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="font-medium">Audience DNA</span>
          {audienceGenerated && (
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "personality" && (
        <PersonalityDNAForm onGenerated={() => setPersonalityGenerated(true)} />
      )}
      {activeTab === "audience" && (
        <AudienceDNAForm onGenerated={() => setAudienceGenerated(true)} />
      )}
    </div>
  );
}

// Personality DNA Form Component
function PersonalityDNAForm({ onGenerated }: { onGenerated: () => void }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>("identity");

  const [formData, setFormData] = useState({
    brandArchetype: "The Coach",
    secondaryArchetype: "",
    coreValues: "",
    missionWho: "",
    missionWhat: "",
    missionHow: "",
    missionBenefit: "",
    certifications: "",
    yearsExperience: "",
    achievements: "",
    clientCount: "",
    uniqueExpertise: "",
    voiceFormalCasual: "5",
    voiceSeriousPlayful: "5",
    voiceTechnicalSimple: "5",
    signaturePhrases: "",
    wordsToAvoid: "",
    emojiUsage: "Moderate",
    contentPillars: "",
    differentiator: "",
    contraryBelief: "",
    originStory: "",
  });

  const archetypes = [
    "The Expert",
    "The Coach",
    "The Rebel",
    "The Friend",
    "The Transformer",
    "The Motivator",
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate/personality-dna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || "Failed to generate");
      }

      setGeneratedContent(data.content);
      onGenerated();
    } catch (error) {
      console.error("Error:", error);
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      alert(`Failed to generate: ${errorMsg}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!generatedContent) return;

    // Parse markdown to styled HTML
    const formatContent = (content: string) => {
      let html = content
        // Headers
        .replace(/^### (.+)$/gm, '<h3 class="subsection">$1</h3>')
        .replace(/^## (\d+)\. (.+)$/gm, '<div class="section-header"><span class="section-num">$1</span><h2>$2</h2></div>')
        .replace(/^## (.+)$/gm, '<h2 class="section-title">$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        // Lists
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        .replace(/^→ (.+)$/gm, '<li class="arrow">$1</li>')
        // Quotes
        .replace(/^"(.+)"$/gm, '<blockquote>"$1"</blockquote>')
        // Line breaks
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');

      // Wrap consecutive li elements in ul
      html = html.replace(/(<li[^>]*>.*?<\/li>)(\s*<li)/g, '$1$2');
      html = html.replace(/(<li[^>]*>.*?<\/li>)(?!\s*<li)/g, '<ul>$1</ul>');
      html = html.replace(/<\/ul>\s*<ul>/g, '');

      return html;
    };

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Personality DNA</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

            * { box-sizing: border-box; margin: 0; padding: 0; }

            body {
              font-family: 'Inter', system-ui, -apple-system, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 0;
              line-height: 1.7;
              color: #1e293b;
              font-size: 14px;
            }

            /* Cover Page */
            .cover {
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding: 60px;
              page-break-after: always;
            }

            .cover-label {
              font-size: 14px;
              font-weight: 600;
              color: #b45309;
              letter-spacing: 2px;
              margin-bottom: 16px;
            }

            .cover-title {
              font-size: 48px;
              font-weight: 700;
              color: #1e293b;
              margin-bottom: 8px;
              position: relative;
              display: inline-block;
            }

            .cover-title::after {
              content: '';
              position: absolute;
              bottom: -4px;
              left: 0;
              width: 60%;
              height: 4px;
              background: linear-gradient(90deg, #b45309, #d97706);
            }

            .cover-subtitle {
              font-size: 16px;
              color: #64748b;
              margin-top: 24px;
              margin-bottom: 60px;
            }

            .cover-meta {
              border-collapse: collapse;
              width: 100%;
              max-width: 400px;
            }

            .cover-meta td {
              padding: 12px 0;
              border-bottom: 1px solid #e2e8f0;
            }

            .cover-meta td:first-child {
              font-weight: 600;
              color: #b45309;
              width: 140px;
            }

            .cover-footer {
              margin-top: auto;
              padding-top: 40px;
              font-size: 12px;
              color: #94a3b8;
            }

            /* Content */
            .content {
              padding: 40px 60px;
            }

            .section-header {
              display: flex;
              align-items: baseline;
              gap: 16px;
              margin-top: 48px;
              margin-bottom: 24px;
              padding-bottom: 12px;
              border-bottom: 2px solid #1e293b;
            }

            .section-num {
              font-size: 14px;
              font-weight: 600;
              color: #b45309;
            }

            .section-header h2 {
              font-size: 24px;
              font-weight: 700;
              color: #1e293b;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }

            .section-title {
              font-size: 20px;
              font-weight: 700;
              color: #1e293b;
              margin-top: 32px;
              margin-bottom: 16px;
              padding-bottom: 8px;
              border-bottom: 2px solid #b45309;
            }

            h3.subsection {
              font-size: 16px;
              font-weight: 600;
              color: #334155;
              margin-top: 24px;
              margin-bottom: 12px;
            }

            p {
              margin-bottom: 16px;
            }

            strong {
              color: #1e293b;
              font-weight: 600;
            }

            ul {
              list-style: none;
              margin: 16px 0;
            }

            li {
              padding: 8px 0 8px 24px;
              position: relative;
            }

            li::before {
              content: '•';
              position: absolute;
              left: 8px;
              color: #b45309;
              font-weight: bold;
            }

            li.arrow::before {
              content: '→';
            }

            blockquote {
              background: #fef3c7;
              border-left: 4px solid #b45309;
              padding: 16px 20px;
              margin: 20px 0;
              font-style: italic;
              color: #92400e;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }

            th {
              background: linear-gradient(135deg, #92400e, #b45309);
              color: white;
              font-weight: 600;
              text-align: left;
              padding: 12px 16px;
            }

            td {
              padding: 12px 16px;
              border-bottom: 1px solid #e2e8f0;
            }

            tr:nth-child(even) {
              background: #f8fafc;
            }

            .highlight-box {
              background: #f1f5f9;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
            }

            @media print {
              body { padding: 0; }
              .cover { min-height: auto; page-break-after: always; }
              .content { padding: 20px 40px; }
            }
          </style>
        </head>
        <body>
          <div class="cover">
            <div class="cover-label">CREATOR DNA</div>
            <h1 class="cover-title">PERSONALITY DNA</h1>
            <p class="cover-subtitle">Complete brand voice, identity, and credentials profile</p>

            <table class="cover-meta">
              <tr><td>DOCUMENT</td><td>Personality DNA</td></tr>
              <tr><td>TYPE</td><td>Brand Identity Profile</td></tr>
              <tr><td>GENERATED</td><td>${new Date().toLocaleDateString()}</td></tr>
            </table>

            <div class="cover-footer">Document 1 of 2 | Creator DNA Framework</div>
          </div>

          <div class="content">
            ${formatContent(generatedContent)}
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const sections = [
    { id: "identity", title: "Brand Identity Core", icon: Heart },
    { id: "credentials", title: "Credentials & Authority", icon: FileText },
    { id: "voice", title: "Communication Style", icon: Sparkles },
    { id: "content", title: "Content & Differentiators", icon: ChevronRight },
  ];

  if (generatedContent) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
                <Heart className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Personality DNA Generated
                </h2>
                <p className="text-sm text-slate-500">
                  Your brand identity document is ready
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setGeneratedContent(null)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Edit Inputs
              </button>
              <button
                onClick={handleDownloadPDF}
                className="btn-primary flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>

          <div className="prose prose-slate max-w-none bg-slate-50 rounded-xl p-6 overflow-auto max-h-[600px]">
            <pre className="whitespace-pre-wrap font-sans text-sm">
              {generatedContent}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
            <Heart className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Personality DNA
            </h2>
            <p className="text-sm text-slate-500">
              Define your brand voice and identity
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className="border border-slate-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedSection(
                    expandedSection === section.id ? null : section.id
                  )
                }
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <section.icon className="w-5 h-5 text-rose-500" />
                  <span className="font-medium text-slate-900">
                    {section.title}
                  </span>
                </div>
                {expandedSection === section.id ? (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                )}
              </button>

              {expandedSection === section.id && (
                <div className="p-4 space-y-4">
                  {section.id === "identity" && (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Primary Brand Archetype
                          </label>
                          <select
                            value={formData.brandArchetype}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                brandArchetype: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none"
                          >
                            {archetypes.map((a) => (
                              <option key={a} value={a}>
                                {a}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Secondary Archetype (optional)
                          </label>
                          <select
                            value={formData.secondaryArchetype}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                secondaryArchetype: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none"
                          >
                            <option value="">None</option>
                            {archetypes.map((a) => (
                              <option key={a} value={a}>
                                {a}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Core Values (3-5 values, comma separated)
                        </label>
                        <input
                          type="text"
                          value={formData.coreValues}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              coreValues: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none"
                          placeholder="e.g., Authenticity, Growth, Simplicity, Impact"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            I help... (WHO)
                          </label>
                          <input
                            type="text"
                            value={formData.missionWho}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                missionWho: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none"
                            placeholder="e.g., busy women over 30"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Achieve... (WHAT)
                          </label>
                          <input
                            type="text"
                            value={formData.missionWhat}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                missionWhat: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none"
                            placeholder="e.g., sustainable fat loss"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Through... (HOW)
                          </label>
                          <input
                            type="text"
                            value={formData.missionHow}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                missionHow: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none"
                            placeholder="e.g., simple home workouts and flexible nutrition"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            So they can... (BENEFIT)
                          </label>
                          <input
                            type="text"
                            value={formData.missionBenefit}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                missionBenefit: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none"
                            placeholder="e.g., feel confident in their body"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {section.id === "credentials" && (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Certifications/Training
                          </label>
                          <textarea
                            value={formData.certifications}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                certifications: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none resize-none"
                            rows={3}
                            placeholder="e.g., Certified Personal Trainer, Nutrition Coach..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Notable Achievements
                          </label>
                          <textarea
                            value={formData.achievements}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                achievements: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none resize-none"
                            rows={3}
                            placeholder="e.g., Featured in Forbes, 10k followers..."
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Years of Experience
                          </label>
                          <input
                            type="text"
                            value={formData.yearsExperience}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                yearsExperience: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none"
                            placeholder="e.g., 5 years"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Number of Clients/Transformations
                          </label>
                          <input
                            type="text"
                            value={formData.clientCount}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                clientCount: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none"
                            placeholder="e.g., 200+ clients"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Unique Expertise (what you know that others don&apos;t)
                        </label>
                        <textarea
                          value={formData.uniqueExpertise}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              uniqueExpertise: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none resize-none"
                          rows={3}
                          placeholder="Your proprietary methods, unique insights..."
                        />
                      </div>
                    </>
                  )}

                  {section.id === "voice" && (
                    <>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Formal ←→ Casual: {formData.voiceFormalCasual}/10
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={formData.voiceFormalCasual}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                voiceFormalCasual: e.target.value,
                              })
                            }
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-slate-500">
                            <span>Very Formal</span>
                            <span>Very Casual</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Serious ←→ Playful: {formData.voiceSeriousPlayful}/10
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={formData.voiceSeriousPlayful}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                voiceSeriousPlayful: e.target.value,
                              })
                            }
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-slate-500">
                            <span>Very Serious</span>
                            <span>Very Playful</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Technical ←→ Simple: {formData.voiceTechnicalSimple}/10
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={formData.voiceTechnicalSimple}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                voiceTechnicalSimple: e.target.value,
                              })
                            }
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-slate-500">
                            <span>Very Technical</span>
                            <span>Very Simple</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Signature Phrases
                          </label>
                          <textarea
                            value={formData.signaturePhrases}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                signaturePhrases: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none resize-none"
                            rows={2}
                            placeholder="Phrases you use often..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Words to Avoid
                          </label>
                          <textarea
                            value={formData.wordsToAvoid}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                wordsToAvoid: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none resize-none"
                            rows={2}
                            placeholder="Words that don't fit your brand..."
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Emoji Usage
                        </label>
                        <select
                          value={formData.emojiUsage}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              emojiUsage: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none"
                        >
                          <option>None</option>
                          <option>Minimal</option>
                          <option>Moderate</option>
                          <option>Heavy</option>
                        </select>
                      </div>
                    </>
                  )}

                  {section.id === "content" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Content Pillars (3-4 main topics, comma separated)
                        </label>
                        <textarea
                          value={formData.contentPillars}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              contentPillars: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none resize-none"
                          rows={2}
                          placeholder="e.g., Nutrition tips, Home workouts, Mindset, Client stories"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          What makes you different from others in your niche?
                        </label>
                        <textarea
                          value={formData.differentiator}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              differentiator: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none resize-none"
                          rows={3}
                          placeholder="Your unique angle, approach, or perspective..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Contrarian Belief (what do you disagree with mainstream about?)
                        </label>
                        <textarea
                          value={formData.contraryBelief}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              contraryBelief: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none resize-none"
                          rows={3}
                          placeholder="What industry 'truth' do you challenge?"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Origin Story (why you do what you do)
                        </label>
                        <textarea
                          value={formData.originStory}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              originStory: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none resize-none"
                          rows={4}
                          placeholder="Your journey, the struggle you overcame..."
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Generate Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="btn-primary flex items-center gap-2 px-6"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Personality DNA
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Audience DNA Form Component
function AudienceDNAForm({ onGenerated }: { onGenerated: () => void }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>("demographics");

  const [formData, setFormData] = useState({
    ageRange: "",
    gender: "Female",
    location: "",
    incomeLevel: "",
    occupation: "",
    lifeStage: "",
    platformBehavior: "",
    selfIdentity: "",
    desiredIdentity: "",
    groupBelonging: "",
    topValues: "",
    dailyRoutine: "",
    hobbies: "",
    surfacePain1: "",
    surfacePain2: "",
    surfacePain3: "",
    deepPain1: "",
    deepPain2: "",
    embarrassedAbout: "",
    immediateDesires: "",
    ultimateTransformation: "",
    dreamOutcome: "",
    objection1: "",
    objection2: "",
    objection3: "",
    hiddenFears: "",
    currentBelief: "",
    newBelief: "",
    enemyExternal: "",
    enemyInternal: "",
    avatarName: "",
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate/audience-dna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || "Failed to generate");
      }

      setGeneratedContent(data.content);
      onGenerated();
    } catch (error) {
      console.error("Error:", error);
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      alert(`Failed to generate: ${errorMsg}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!generatedContent) return;

    // Parse markdown to styled HTML
    const formatContent = (content: string) => {
      let html = content
        // Headers
        .replace(/^### (.+)$/gm, '<h3 class="subsection">$1</h3>')
        .replace(/^## (\d+)\. (.+)$/gm, '<div class="section-header"><span class="section-num">$1</span><h2>$2</h2></div>')
        .replace(/^## (.+)$/gm, '<h2 class="section-title">$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        // Lists
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        .replace(/^→ (.+)$/gm, '<li class="arrow">$1</li>')
        // Quotes
        .replace(/^"(.+)"$/gm, '<blockquote>"$1"</blockquote>')
        // Line breaks
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');

      // Wrap consecutive li elements in ul
      html = html.replace(/(<li[^>]*>.*?<\/li>)(\s*<li)/g, '$1$2');
      html = html.replace(/(<li[^>]*>.*?<\/li>)(?!\s*<li)/g, '<ul>$1</ul>');
      html = html.replace(/<\/ul>\s*<ul>/g, '');

      return html;
    };

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Audience DNA</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

            * { box-sizing: border-box; margin: 0; padding: 0; }

            body {
              font-family: 'Inter', system-ui, -apple-system, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 0;
              line-height: 1.7;
              color: #1e293b;
              font-size: 14px;
            }

            /* Cover Page */
            .cover {
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding: 60px;
              page-break-after: always;
            }

            .cover-label {
              font-size: 14px;
              font-weight: 600;
              color: #2563eb;
              letter-spacing: 2px;
              margin-bottom: 16px;
            }

            .cover-title {
              font-size: 48px;
              font-weight: 700;
              color: #1e293b;
              margin-bottom: 8px;
              position: relative;
              display: inline-block;
            }

            .cover-title::after {
              content: '';
              position: absolute;
              bottom: -4px;
              left: 0;
              width: 60%;
              height: 4px;
              background: linear-gradient(90deg, #2563eb, #3b82f6);
            }

            .cover-subtitle {
              font-size: 16px;
              color: #64748b;
              margin-top: 24px;
              margin-bottom: 60px;
            }

            .cover-meta {
              border-collapse: collapse;
              width: 100%;
              max-width: 400px;
            }

            .cover-meta td {
              padding: 12px 0;
              border-bottom: 1px solid #e2e8f0;
            }

            .cover-meta td:first-child {
              font-weight: 600;
              color: #2563eb;
              width: 140px;
            }

            .cover-footer {
              margin-top: auto;
              padding-top: 40px;
              font-size: 12px;
              color: #94a3b8;
            }

            /* Content */
            .content {
              padding: 40px 60px;
            }

            .section-header {
              display: flex;
              align-items: baseline;
              gap: 16px;
              margin-top: 48px;
              margin-bottom: 24px;
              padding-bottom: 12px;
              border-bottom: 2px solid #1e293b;
            }

            .section-num {
              font-size: 14px;
              font-weight: 600;
              color: #2563eb;
            }

            .section-header h2 {
              font-size: 24px;
              font-weight: 700;
              color: #1e293b;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }

            .section-title {
              font-size: 20px;
              font-weight: 700;
              color: #1e293b;
              margin-top: 32px;
              margin-bottom: 16px;
              padding-bottom: 8px;
              border-bottom: 2px solid #2563eb;
            }

            h3.subsection {
              font-size: 16px;
              font-weight: 600;
              color: #334155;
              margin-top: 24px;
              margin-bottom: 12px;
            }

            p {
              margin-bottom: 16px;
            }

            strong {
              color: #1e293b;
              font-weight: 600;
            }

            ul {
              list-style: none;
              margin: 16px 0;
            }

            li {
              padding: 8px 0 8px 24px;
              position: relative;
            }

            li::before {
              content: '•';
              position: absolute;
              left: 8px;
              color: #2563eb;
              font-weight: bold;
            }

            li.arrow::before {
              content: '→';
            }

            blockquote {
              background: #dbeafe;
              border-left: 4px solid #2563eb;
              padding: 16px 20px;
              margin: 20px 0;
              font-style: italic;
              color: #1e40af;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }

            th {
              background: linear-gradient(135deg, #1d4ed8, #2563eb);
              color: white;
              font-weight: 600;
              text-align: left;
              padding: 12px 16px;
            }

            td {
              padding: 12px 16px;
              border-bottom: 1px solid #e2e8f0;
            }

            tr:nth-child(even) {
              background: #f8fafc;
            }

            .highlight-box {
              background: #f1f5f9;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
            }

            @media print {
              body { padding: 0; }
              .cover { min-height: auto; page-break-after: always; }
              .content { padding: 20px 40px; }
            }
          </style>
        </head>
        <body>
          <div class="cover">
            <div class="cover-label">CREATOR DNA</div>
            <h1 class="cover-title">AUDIENCE DNA</h1>
            <p class="cover-subtitle">Complete ideal customer psychology and behavior profile</p>

            <table class="cover-meta">
              <tr><td>DOCUMENT</td><td>Audience DNA</td></tr>
              <tr><td>TYPE</td><td>Customer Psychology Profile</td></tr>
              <tr><td>GENERATED</td><td>${new Date().toLocaleDateString()}</td></tr>
            </table>

            <div class="cover-footer">Document 2 of 2 | Creator DNA Framework</div>
          </div>

          <div class="content">
            ${formatContent(generatedContent)}
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const sections = [
    { id: "demographics", title: "Demographics", icon: Users },
    { id: "psychographics", title: "Psychographics", icon: Heart },
    { id: "pain", title: "Pain Points", icon: FileText },
    { id: "desires", title: "Desires & Objections", icon: Sparkles },
    { id: "beliefs", title: "Beliefs & Enemy", icon: ChevronRight },
  ];

  if (generatedContent) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Audience DNA Generated
                </h2>
                <p className="text-sm text-slate-500">
                  Your ideal customer profile is ready
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setGeneratedContent(null)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Edit Inputs
              </button>
              <button
                onClick={handleDownloadPDF}
                className="btn-primary flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>

          <div className="prose prose-slate max-w-none bg-slate-50 rounded-xl p-6 overflow-auto max-h-[600px]">
            <pre className="whitespace-pre-wrap font-sans text-sm">
              {generatedContent}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Audience DNA
            </h2>
            <p className="text-sm text-slate-500">
              Define your ideal customer psychology
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className="border border-slate-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedSection(
                    expandedSection === section.id ? null : section.id
                  )
                }
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <section.icon className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-slate-900">
                    {section.title}
                  </span>
                </div>
                {expandedSection === section.id ? (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                )}
              </button>

              {expandedSection === section.id && (
                <div className="p-4 space-y-4">
                  {section.id === "demographics" && (
                    <>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Age Range
                          </label>
                          <input
                            type="text"
                            value={formData.ageRange}
                            onChange={(e) =>
                              setFormData({ ...formData, ageRange: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                            placeholder="e.g., 25-40"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Gender
                          </label>
                          <select
                            value={formData.gender}
                            onChange={(e) =>
                              setFormData({ ...formData, gender: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                          >
                            <option>Female</option>
                            <option>Male</option>
                            <option>All</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) =>
                              setFormData({ ...formData, location: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                            placeholder="e.g., USA, urban areas"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Income Level
                          </label>
                          <input
                            type="text"
                            value={formData.incomeLevel}
                            onChange={(e) =>
                              setFormData({ ...formData, incomeLevel: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                            placeholder="e.g., $50k-$100k"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Occupation
                          </label>
                          <input
                            type="text"
                            value={formData.occupation}
                            onChange={(e) =>
                              setFormData({ ...formData, occupation: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                            placeholder="e.g., Professional, Office worker"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Life Stage
                          </label>
                          <input
                            type="text"
                            value={formData.lifeStage}
                            onChange={(e) =>
                              setFormData({ ...formData, lifeStage: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                            placeholder="e.g., Working mom, Young professional"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Platform Behavior (how they use Instagram)
                        </label>
                        <textarea
                          value={formData.platformBehavior}
                          onChange={(e) =>
                            setFormData({ ...formData, platformBehavior: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                          rows={2}
                          placeholder="When they're active, what they engage with..."
                        />
                      </div>
                    </>
                  )}

                  {section.id === "psychographics" && (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            How they see themselves
                          </label>
                          <textarea
                            value={formData.selfIdentity}
                            onChange={(e) =>
                              setFormData({ ...formData, selfIdentity: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                            rows={2}
                            placeholder="Their current self-image..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            How they want to be seen
                          </label>
                          <textarea
                            value={formData.desiredIdentity}
                            onChange={(e) =>
                              setFormData({ ...formData, desiredIdentity: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                            rows={2}
                            placeholder="Their aspirational identity..."
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Group they want to belong to
                        </label>
                        <input
                          type="text"
                          value={formData.groupBelonging}
                          onChange={(e) =>
                            setFormData({ ...formData, groupBelonging: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                          placeholder="e.g., Fit moms, Successful entrepreneurs..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Top Values
                        </label>
                        <input
                          type="text"
                          value={formData.topValues}
                          onChange={(e) =>
                            setFormData({ ...formData, topValues: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                          placeholder="e.g., Family, Health, Freedom..."
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Daily Routine
                          </label>
                          <textarea
                            value={formData.dailyRoutine}
                            onChange={(e) =>
                              setFormData({ ...formData, dailyRoutine: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                            rows={2}
                            placeholder="How their typical day looks..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Hobbies & Interests
                          </label>
                          <textarea
                            value={formData.hobbies}
                            onChange={(e) =>
                              setFormData({ ...formData, hobbies: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                            rows={2}
                            placeholder="What they do in their free time..."
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {section.id === "pain" && (
                    <>
                      <p className="text-sm text-slate-500 mb-4">
                        Surface pain = what they SAY. Deep pain = what they FEEL.
                      </p>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Surface Pain #1
                          </label>
                          <input
                            type="text"
                            value={formData.surfacePain1}
                            onChange={(e) =>
                              setFormData({ ...formData, surfacePain1: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                            placeholder="e.g., I can't lose weight"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Surface Pain #2
                          </label>
                          <input
                            type="text"
                            value={formData.surfacePain2}
                            onChange={(e) =>
                              setFormData({ ...formData, surfacePain2: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                            placeholder="e.g., I don't have time to work out"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Surface Pain #3
                          </label>
                          <input
                            type="text"
                            value={formData.surfacePain3}
                            onChange={(e) =>
                              setFormData({ ...formData, surfacePain3: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                            placeholder="e.g., I've tried everything"
                          />
                        </div>
                      </div>
                      <div className="space-y-3 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Deep Pain #1 (what they really feel)
                          </label>
                          <input
                            type="text"
                            value={formData.deepPain1}
                            onChange={(e) =>
                              setFormData({ ...formData, deepPain1: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                            placeholder="e.g., I feel invisible and unworthy"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Deep Pain #2
                          </label>
                          <input
                            type="text"
                            value={formData.deepPain2}
                            onChange={(e) =>
                              setFormData({ ...formData, deepPain2: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                            placeholder="e.g., I'm scared I'll never feel confident"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            What they&apos;re embarrassed about
                          </label>
                          <input
                            type="text"
                            value={formData.embarrassedAbout}
                            onChange={(e) =>
                              setFormData({ ...formData, embarrassedAbout: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                            placeholder="What they'd never admit publicly..."
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {section.id === "desires" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Immediate Desires (quick wins they want)
                        </label>
                        <textarea
                          value={formData.immediateDesires}
                          onChange={(e) =>
                            setFormData({ ...formData, immediateDesires: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                          rows={2}
                          placeholder="What they want right now..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Ultimate Transformation
                        </label>
                        <textarea
                          value={formData.ultimateTransformation}
                          onChange={(e) =>
                            setFormData({ ...formData, ultimateTransformation: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                          rows={2}
                          placeholder="Who they want to become..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Dream Outcome (vivid visual description)
                        </label>
                        <textarea
                          value={formData.dreamOutcome}
                          onChange={(e) =>
                            setFormData({ ...formData, dreamOutcome: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                          rows={3}
                          placeholder="What their ideal life looks like..."
                        />
                      </div>
                      <div className="space-y-3 mt-4">
                        <p className="text-sm font-medium text-slate-700">Common Objections</p>
                        <input
                          type="text"
                          value={formData.objection1}
                          onChange={(e) =>
                            setFormData({ ...formData, objection1: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                          placeholder="Objection #1 (e.g., I don't have time)"
                        />
                        <input
                          type="text"
                          value={formData.objection2}
                          onChange={(e) =>
                            setFormData({ ...formData, objection2: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                          placeholder="Objection #2 (e.g., It's too expensive)"
                        />
                        <input
                          type="text"
                          value={formData.objection3}
                          onChange={(e) =>
                            setFormData({ ...formData, objection3: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                          placeholder="Objection #3 (e.g., It won't work for me)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Hidden Fears
                        </label>
                        <textarea
                          value={formData.hiddenFears}
                          onChange={(e) =>
                            setFormData({ ...formData, hiddenFears: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                          rows={2}
                          placeholder="Fear of failure, success, judgment..."
                        />
                      </div>
                    </>
                  )}

                  {section.id === "beliefs" && (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Current Belief (what they think now)
                          </label>
                          <textarea
                            value={formData.currentBelief}
                            onChange={(e) =>
                              setFormData({ ...formData, currentBelief: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                            rows={2}
                            placeholder="e.g., I need to eat less to lose weight"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            New Belief Needed
                          </label>
                          <textarea
                            value={formData.newBelief}
                            onChange={(e) =>
                              setFormData({ ...formData, newBelief: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                            rows={2}
                            placeholder="e.g., I need to eat right for my body"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            External Enemy (who/what to blame)
                          </label>
                          <textarea
                            value={formData.enemyExternal}
                            onChange={(e) =>
                              setFormData({ ...formData, enemyExternal: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                            rows={2}
                            placeholder="e.g., Diet industry, misinformation..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Internal Enemy (habits/approach)
                          </label>
                          <textarea
                            value={formData.enemyInternal}
                            onChange={(e) =>
                              setFormData({ ...formData, enemyInternal: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                            rows={2}
                            placeholder="e.g., All-or-nothing thinking..."
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Avatar Name (give your ideal customer a name)
                        </label>
                        <input
                          type="text"
                          value={formData.avatarName}
                          onChange={(e) =>
                            setFormData({ ...formData, avatarName: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                          placeholder="e.g., Struggling Sarah, Busy Mom Maria"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Generate Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="btn-primary flex items-center gap-2 px-6"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Audience DNA
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
