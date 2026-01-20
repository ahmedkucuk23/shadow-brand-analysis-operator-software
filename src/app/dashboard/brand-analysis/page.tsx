"use client";

import { useState } from "react";
import { 
  Search, 
  Users, 
  Target, 
  Eye, 
  Layers, 
  BarChart3,
  ChevronRight,
  Plus,
  Trash2,
  Save,
  Download,
  Lightbulb
} from "lucide-react";

type ToolId = "competitors" | "personas" | "positioning" | "opportunities" | "swot" | "metrics";

interface Tool {
  id: ToolId;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function DashboardBrandAnalysisPage() {
  const [activeTool, setActiveTool] = useState<ToolId>("competitors");

  const tools: Tool[] = [
    {
      id: "competitors",
      title: "Competitor Analysis",
      description: "Analyze your competition",
      icon: Search,
      color: "blue",
    },
    {
      id: "personas",
      title: "Customer Personas",
      description: "Define your ideal customers",
      icon: Users,
      color: "violet",
    },
    {
      id: "positioning",
      title: "Market Positioning",
      description: "Find your unique position",
      icon: Target,
      color: "purple",
    },
    {
      id: "opportunities",
      title: "Opportunity Finder",
      description: "Identify market gaps",
      icon: Eye,
      color: "pink",
    },
    {
      id: "swot",
      title: "SWOT Analysis",
      description: "Strategic assessment",
      icon: Layers,
      color: "amber",
    },
    {
      id: "metrics",
      title: "Performance Metrics",
      description: "Track your progress",
      icon: BarChart3,
      color: "green",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Brand Analysis</h1>
        <p className="text-slate-600 mt-1">Research your market and make data-driven decisions</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Tool Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-100 p-4 sticky top-24">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
              Analysis Tools
            </h2>
            <nav className="space-y-1">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-left ${
                    activeTool === tool.id
                      ? `bg-${tool.color}-50 text-${tool.color}-700`
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeTool === tool.id
                      ? `bg-${tool.color}-100`
                      : "bg-slate-100"
                  }`}>
                    <tool.icon className={`w-4 h-4 ${
                      activeTool === tool.id
                        ? `text-${tool.color}-600`
                        : "text-slate-500"
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{tool.title}</p>
                    <p className="text-xs text-slate-500">{tool.description}</p>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tool Content */}
        <div className="lg:col-span-3">
          {activeTool === "competitors" && <CompetitorAnalysisTool />}
          {activeTool === "personas" && <CustomerPersonasTool />}
          {activeTool === "positioning" && <MarketPositioningTool />}
          {activeTool === "opportunities" && <OpportunityFinderTool />}
          {activeTool === "swot" && <SwotAnalysisTool />}
          {activeTool === "metrics" && <PerformanceMetricsTool />}
        </div>
      </div>
    </div>
  );
}

// Competitor Analysis Tool
function CompetitorAnalysisTool() {
  const [competitors, setCompetitors] = useState([
    { id: 1, name: "Competitor A", strengths: "Strong brand, large market share", weaknesses: "Slow to innovate, high prices", pricing: "$199/mo" },
    { id: 2, name: "Competitor B", strengths: "Good features, active community", weaknesses: "Poor customer support", pricing: "$149/mo" },
  ]);

  const addCompetitor = () => {
    setCompetitors([...competitors, { id: Date.now(), name: "", strengths: "", weaknesses: "", pricing: "" }]);
  };

  const removeCompetitor = (id: number) => {
    setCompetitors(competitors.filter(c => c.id !== id));
  };

  const updateCompetitor = (id: number, field: string, value: string) => {
    setCompetitors(competitors.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Competitor Analysis</h2>
          <p className="text-slate-600 text-sm">Track and analyze your competitors</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary text-sm flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="btn-primary text-sm flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {competitors.map((competitor, index) => (
          <div key={competitor.id} className="bg-slate-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-500">Competitor {index + 1}</span>
              <button
                onClick={() => removeCompetitor(competitor.id)}
                className="p-1 text-slate-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={competitor.name}
                  onChange={(e) => updateCompetitor(competitor.id, "name", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder="Enter competitor name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pricing</label>
                <input
                  type="text"
                  value={competitor.pricing}
                  onChange={(e) => updateCompetitor(competitor.id, "pricing", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder="e.g., $99/mo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Strengths</label>
                <textarea
                  value={competitor.strengths}
                  onChange={(e) => updateCompetitor(competitor.id, "strengths", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                  rows={2}
                  placeholder="What do they do well?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Weaknesses</label>
                <textarea
                  value={competitor.weaknesses}
                  onChange={(e) => updateCompetitor(competitor.id, "weaknesses", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                  rows={2}
                  placeholder="Where do they fall short?"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addCompetitor}
          className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Competitor
        </button>
      </div>
    </div>
  );
}

// Customer Personas Tool
function CustomerPersonasTool() {
  const [personas, setPersonas] = useState([
    {
      id: 1,
      name: "Startup Sarah",
      age: "28-35",
      role: "Founder/CEO",
      goals: "Launch successful business, grow revenue",
      challenges: "Limited time, tight budget, need guidance",
      channels: "LinkedIn, Twitter, podcasts",
    },
  ]);

  const addPersona = () => {
    setPersonas([...personas, { id: Date.now(), name: "", age: "", role: "", goals: "", challenges: "", channels: "" }]);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Customer Personas</h2>
          <p className="text-slate-600 text-sm">Create detailed profiles of your ideal customers</p>
        </div>
        <button className="btn-primary text-sm flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save
        </button>
      </div>

      <div className="space-y-6">
        {personas.map((persona, index) => (
          <div key={persona.id} className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6 border border-violet-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                {persona.name?.[0] || "?"}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={persona.name}
                  onChange={(e) => setPersonas(personas.map(p => p.id === persona.id ? { ...p, name: e.target.value } : p))}
                  className="text-xl font-semibold text-slate-900 bg-transparent border-none outline-none w-full"
                  placeholder="Persona Name"
                />
                <div className="flex gap-4 mt-1">
                  <input
                    type="text"
                    value={persona.age}
                    onChange={(e) => setPersonas(personas.map(p => p.id === persona.id ? { ...p, age: e.target.value } : p))}
                    className="text-sm text-slate-600 bg-transparent border-none outline-none"
                    placeholder="Age range"
                  />
                  <input
                    type="text"
                    value={persona.role}
                    onChange={(e) => setPersonas(personas.map(p => p.id === persona.id ? { ...p, role: e.target.value } : p))}
                    className="text-sm text-slate-600 bg-transparent border-none outline-none"
                    placeholder="Job role"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Goals</label>
                <textarea
                  value={persona.goals}
                  onChange={(e) => setPersonas(personas.map(p => p.id === persona.id ? { ...p, goals: e.target.value } : p))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none resize-none bg-white"
                  rows={3}
                  placeholder="What are they trying to achieve?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Challenges</label>
                <textarea
                  value={persona.challenges}
                  onChange={(e) => setPersonas(personas.map(p => p.id === persona.id ? { ...p, challenges: e.target.value } : p))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none resize-none bg-white"
                  rows={3}
                  placeholder="What obstacles do they face?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Channels</label>
                <textarea
                  value={persona.channels}
                  onChange={(e) => setPersonas(personas.map(p => p.id === persona.id ? { ...p, channels: e.target.value } : p))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none resize-none bg-white"
                  rows={3}
                  placeholder="Where do they spend time online?"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addPersona}
          className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-violet-300 hover:text-violet-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Persona
        </button>
      </div>
    </div>
  );
}

// Market Positioning Tool
function MarketPositioningTool() {
  const [positioning, setPositioning] = useState({
    category: "Shadow Operating Software",
    targetAudience: "Entrepreneurs and small business owners",
    uniqueValue: "Complete 14-day launch system with brand analysis",
    competitors: "Traditional business consultants, generic planning tools",
    differentiation: "Step-by-step daily guidance, integrated brand tools",
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Market Positioning</h2>
          <p className="text-slate-600 text-sm">Define your unique position in the market</p>
        </div>
        <button className="btn-primary text-sm flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save
        </button>
      </div>

      <div className="space-y-6">
        {/* Positioning Statement Builder */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-purple-500" />
            Your Positioning Statement
          </h3>
          <p className="text-slate-700 leading-relaxed">
            For <span className="font-semibold text-purple-600">{positioning.targetAudience || "[target audience]"}</span> who need{" "}
            <span className="font-semibold text-purple-600">{positioning.category || "[category]"}</span>,{" "}
            Shadow Operator provides <span className="font-semibold text-purple-600">{positioning.uniqueValue || "[unique value]"}</span>.
            Unlike <span className="font-semibold text-purple-600">{positioning.competitors || "[competitors]"}</span>,
            we offer <span className="font-semibold text-purple-600">{positioning.differentiation || "[key differentiation]"}</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Market Category</label>
            <input
              type="text"
              value={positioning.category}
              onChange={(e) => setPositioning({ ...positioning, category: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
              placeholder="What category do you compete in?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
            <input
              type="text"
              value={positioning.targetAudience}
              onChange={(e) => setPositioning({ ...positioning, targetAudience: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
              placeholder="Who is your ideal customer?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Unique Value</label>
            <textarea
              value={positioning.uniqueValue}
              onChange={(e) => setPositioning({ ...positioning, uniqueValue: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none resize-none"
              rows={2}
              placeholder="What unique value do you provide?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Key Competitors</label>
            <textarea
              value={positioning.competitors}
              onChange={(e) => setPositioning({ ...positioning, competitors: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none resize-none"
              rows={2}
              placeholder="Who do you compete against?"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Key Differentiation</label>
            <textarea
              value={positioning.differentiation}
              onChange={(e) => setPositioning({ ...positioning, differentiation: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none resize-none"
              rows={2}
              placeholder="What makes you different from competitors?"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Opportunity Finder Tool
function OpportunityFinderTool() {
  const [opportunities, setOpportunities] = useState([
    { id: 1, opportunity: "Underserved niche: Solo founders", impact: "High", effort: "Medium", priority: 1 },
    { id: 2, opportunity: "Content gap: Step-by-step video tutorials", impact: "Medium", effort: "High", priority: 2 },
  ]);

  const addOpportunity = () => {
    setOpportunities([...opportunities, { id: Date.now(), opportunity: "", impact: "Medium", effort: "Medium", priority: opportunities.length + 1 }]);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Opportunity Finder</h2>
          <p className="text-slate-600 text-sm">Identify and prioritize market opportunities</p>
        </div>
        <button className="btn-primary text-sm flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-12 gap-4 px-4 text-sm font-medium text-slate-500">
          <div className="col-span-1">#</div>
          <div className="col-span-5">Opportunity</div>
          <div className="col-span-2">Impact</div>
          <div className="col-span-2">Effort</div>
          <div className="col-span-2">Actions</div>
        </div>

        {opportunities.map((opp, index) => (
          <div key={opp.id} className="grid grid-cols-12 gap-4 items-center bg-slate-50 rounded-xl p-4">
            <div className="col-span-1">
              <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 text-sm font-medium flex items-center justify-center">
                {index + 1}
              </span>
            </div>
            <div className="col-span-5">
              <input
                type="text"
                value={opp.opportunity}
                onChange={(e) => setOpportunities(opportunities.map(o => o.id === opp.id ? { ...o, opportunity: e.target.value } : o))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none text-sm"
                placeholder="Describe the opportunity"
              />
            </div>
            <div className="col-span-2">
              <select
                value={opp.impact}
                onChange={(e) => setOpportunities(opportunities.map(o => o.id === opp.id ? { ...o, impact: e.target.value } : o))}
                className="w-full px-2 py-2 rounded-lg border border-slate-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none text-sm bg-white"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div className="col-span-2">
              <select
                value={opp.effort}
                onChange={(e) => setOpportunities(opportunities.map(o => o.id === opp.id ? { ...o, effort: e.target.value } : o))}
                className="w-full px-2 py-2 rounded-lg border border-slate-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none text-sm bg-white"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div className="col-span-2">
              <button
                onClick={() => setOpportunities(opportunities.filter(o => o.id !== opp.id))}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addOpportunity}
          className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-pink-300 hover:text-pink-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Opportunity
        </button>
      </div>
    </div>
  );
}

// SWOT Analysis Tool
function SwotAnalysisTool() {
  const [swot, setSwot] = useState({
    strengths: ["Unique 14-day framework", "Integrated brand tools", "Affordable pricing"],
    weaknesses: ["New to market", "Small team", "Limited brand awareness"],
    opportunities: ["Growing demand for business tools", "Remote work trend", "Underserved solo founder market"],
    threats: ["Established competitors", "Economic uncertainty", "Changing market needs"],
  });

  const addItem = (category: keyof typeof swot) => {
    setSwot({ ...swot, [category]: [...swot[category], ""] });
  };

  const updateItem = (category: keyof typeof swot, index: number, value: string) => {
    const updated = [...swot[category]];
    updated[index] = value;
    setSwot({ ...swot, [category]: updated });
  };

  const removeItem = (category: keyof typeof swot, index: number) => {
    setSwot({ ...swot, [category]: swot[category].filter((_, i) => i !== index) });
  };

  const categories = [
    { key: "strengths" as const, title: "Strengths", color: "green", description: "Internal positive factors" },
    { key: "weaknesses" as const, title: "Weaknesses", color: "red", description: "Internal negative factors" },
    { key: "opportunities" as const, title: "Opportunities", color: "blue", description: "External positive factors" },
    { key: "threats" as const, title: "Threats", color: "amber", description: "External negative factors" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">SWOT Analysis</h2>
          <p className="text-slate-600 text-sm">Strategic assessment of your business</p>
        </div>
        <button className="btn-primary text-sm flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div key={cat.key} className={`bg-${cat.color}-50 rounded-xl p-4 border border-${cat.color}-100`}>
            <h3 className={`font-semibold text-${cat.color}-700 mb-1`}>{cat.title}</h3>
            <p className={`text-xs text-${cat.color}-600 mb-3`}>{cat.description}</p>
            <div className="space-y-2">
              {swot[cat.key].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateItem(cat.key, index, e.target.value)}
                    className={`flex-1 px-3 py-2 rounded-lg border border-${cat.color}-200 focus:border-${cat.color}-400 focus:ring-1 focus:ring-${cat.color}-400 outline-none text-sm bg-white`}
                    placeholder={`Add ${cat.title.toLowerCase().slice(0, -1)}`}
                  />
                  <button
                    onClick={() => removeItem(cat.key, index)}
                    className="p-1 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addItem(cat.key)}
                className={`w-full py-2 text-${cat.color}-600 hover:bg-${cat.color}-100 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1`}
              >
                <Plus className="w-3 h-3" />
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Performance Metrics Tool
function PerformanceMetricsTool() {
  const metrics = [
    { name: "Website Visitors", value: "1,234", change: "+12%", trend: "up" },
    { name: "Email Subscribers", value: "456", change: "+8%", trend: "up" },
    { name: "Conversion Rate", value: "2.4%", change: "-0.3%", trend: "down" },
    { name: "Revenue", value: "$4,567", change: "+23%", trend: "up" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Performance Metrics</h2>
          <p className="text-slate-600 text-sm">Track your key business metrics</p>
        </div>
        <select className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-slate-50 rounded-xl p-4">
            <p className="text-sm text-slate-500 mb-1">{metric.name}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
              <span className={`text-sm font-medium ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 rounded-xl p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Add Custom Metric</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Metric name"
            className="px-3 py-2 rounded-lg border border-slate-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
          />
          <input
            type="text"
            placeholder="Current value"
            className="px-3 py-2 rounded-lg border border-slate-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
          />
          <button className="btn-primary">Add Metric</button>
        </div>
      </div>
    </div>
  );
}
