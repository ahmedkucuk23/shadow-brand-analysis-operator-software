"use client";

import { useState } from "react";
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Clock, 
  ChevronDown, 
  ChevronRight,
  Lightbulb,
  Target,
  Megaphone,
  TrendingUp,
  FileText,
  Users,
  Zap,
  BarChart3,
  Rocket,
  Star,
  Award,
  Flag
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  resources?: string[];
}

interface Day {
  day: number;
  title: string;
  description: string;
  tasks: Task[];
}

interface Phase {
  id: string;
  title: string;
  days: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
  daysList: Day[];
}

export default function DashboardShadowOperatorPage() {
  const [expandedPhase, setExpandedPhase] = useState<string | null>("foundation");
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set(["d1-t1", "d1-t2", "d2-t1"]));

  const phases: Phase[] = [
    {
      id: "foundation",
      title: "Foundation & Strategy",
      days: "Day 1-3",
      icon: Lightbulb,
      color: "blue",
      description: "Build the strategic foundation for your Shadow Operating business",
      daysList: [
        {
          day: 1,
          title: "Business Vision & Goals",
          description: "Define your business vision, mission, and core objectives",
          tasks: [
            {
              id: "d1-t1",
              title: "Define your unique value proposition",
              description: "What makes your Shadow Operating business different? Write a clear, compelling UVP that sets you apart from competitors.",
              completed: true,
              resources: ["UVP Template", "Examples Guide"],
            },
            {
              id: "d1-t2",
              title: "Set SMART business goals",
              description: "Establish Specific, Measurable, Achievable, Relevant, and Time-bound goals for the next 90 days.",
              completed: true,
              resources: ["SMART Goals Worksheet"],
            },
            {
              id: "d1-t3",
              title: "Create your business model canvas",
              description: "Map out all key components of your business including revenue streams, customer segments, and key activities.",
              completed: false,
              resources: ["Business Model Canvas Template"],
            },
          ],
        },
        {
          day: 2,
          title: "Market Research Deep Dive",
          description: "Understand your market landscape and opportunities",
          tasks: [
            {
              id: "d2-t1",
              title: "Identify your target market",
              description: "Define the specific market segment you'll serve. Consider demographics, geography, and psychographics.",
              completed: true,
              resources: ["Market Segmentation Guide"],
            },
            {
              id: "d2-t2",
              title: "Research market size and trends",
              description: "Gather data on your total addressable market, serviceable market, and current trends.",
              completed: false,
              resources: ["Market Research Template"],
            },
            {
              id: "d2-t3",
              title: "Identify market gaps and opportunities",
              description: "Find underserved needs and opportunities that your business can address.",
              completed: false,
              resources: ["Opportunity Analysis Framework"],
            },
          ],
        },
        {
          day: 3,
          title: "Competitive Analysis",
          description: "Analyze competitors to find your strategic advantage",
          tasks: [
            {
              id: "d3-t1",
              title: "Identify top 5 direct competitors",
              description: "List businesses offering similar solutions to your target market.",
              completed: false,
              resources: ["Competitor Tracking Sheet"],
            },
            {
              id: "d3-t2",
              title: "Analyze competitor strengths & weaknesses",
              description: "Deep dive into what competitors do well and where they fall short.",
              completed: false,
              resources: ["Competitor Analysis Matrix"],
            },
            {
              id: "d3-t3",
              title: "Define your competitive advantage",
              description: "Based on your analysis, identify how you'll differentiate and win.",
              completed: false,
              resources: ["Positioning Strategy Guide"],
            },
          ],
        },
      ],
    },
    {
      id: "brand",
      title: "Brand Development",
      days: "Day 4-7",
      icon: Target,
      color: "violet",
      description: "Create a compelling brand identity and messaging",
      daysList: [
        {
          day: 4,
          title: "Customer Persona Creation",
          description: "Build detailed profiles of your ideal customers",
          tasks: [
            {
              id: "d4-t1",
              title: "Create primary customer persona",
              description: "Build a detailed profile including demographics, goals, challenges, and buying behavior.",
              completed: false,
              resources: ["Persona Template", "Interview Guide"],
            },
            {
              id: "d4-t2",
              title: "Map customer pain points",
              description: "Identify the specific problems your customers face that you can solve.",
              completed: false,
              resources: ["Pain Point Mapping Canvas"],
            },
            {
              id: "d4-t3",
              title: "Document customer journey",
              description: "Map the path from awareness to purchase and beyond.",
              completed: false,
              resources: ["Customer Journey Template"],
            },
          ],
        },
        {
          day: 5,
          title: "Brand Identity Foundation",
          description: "Establish your brand's core identity elements",
          tasks: [
            {
              id: "d5-t1",
              title: "Define brand values and personality",
              description: "Establish the core values and personality traits that define your brand.",
              completed: false,
              resources: ["Brand Values Worksheet"],
            },
            {
              id: "d5-t2",
              title: "Develop brand voice guidelines",
              description: "Create guidelines for how your brand communicates across all channels.",
              completed: false,
              resources: ["Voice & Tone Guide"],
            },
            {
              id: "d5-t3",
              title: "Create brand story framework",
              description: "Craft a compelling narrative that connects with your audience emotionally.",
              completed: false,
              resources: ["Brand Story Template"],
            },
          ],
        },
        {
          day: 6,
          title: "Visual Identity System",
          description: "Design the visual elements of your brand",
          tasks: [
            {
              id: "d6-t1",
              title: "Develop logo and visual mark",
              description: "Create or refine your logo and visual identity elements.",
              completed: false,
              resources: ["Logo Design Brief", "Design Resources"],
            },
            {
              id: "d6-t2",
              title: "Establish color palette and typography",
              description: "Define your brand colors, fonts, and visual styling rules.",
              completed: false,
              resources: ["Brand Style Guide Template"],
            },
            {
              id: "d6-t3",
              title: "Create brand guidelines document",
              description: "Compile all brand elements into a comprehensive guidelines document.",
              completed: false,
              resources: ["Brand Guidelines Template"],
            },
          ],
        },
        {
          day: 7,
          title: "Content Strategy Foundation",
          description: "Plan your content approach for market entry",
          tasks: [
            {
              id: "d7-t1",
              title: "Define content pillars",
              description: "Identify the key topics and themes your content will focus on.",
              completed: false,
              resources: ["Content Pillar Framework"],
            },
            {
              id: "d7-t2",
              title: "Create content calendar framework",
              description: "Establish a system for planning and scheduling content.",
              completed: false,
              resources: ["Content Calendar Template"],
            },
            {
              id: "d7-t3",
              title: "Plan initial content pieces",
              description: "Outline the first 10 pieces of content you'll create.",
              completed: false,
              resources: ["Content Planning Worksheet"],
            },
          ],
        },
      ],
    },
    {
      id: "launch",
      title: "Market Launch",
      days: "Day 8-11",
      icon: Megaphone,
      color: "purple",
      description: "Execute your go-to-market strategy and acquire customers",
      daysList: [
        {
          day: 8,
          title: "Online Presence Setup",
          description: "Establish your digital footprint",
          tasks: [
            {
              id: "d8-t1",
              title: "Launch or optimize your website",
              description: "Ensure your website clearly communicates your value proposition and converts visitors.",
              completed: false,
              resources: ["Website Checklist", "Conversion Guide"],
            },
            {
              id: "d8-t2",
              title: "Set up social media profiles",
              description: "Create optimized profiles on platforms where your audience is active.",
              completed: false,
              resources: ["Social Media Setup Guide"],
            },
            {
              id: "d8-t3",
              title: "Implement analytics tracking",
              description: "Set up tools to measure website traffic and user behavior.",
              completed: false,
              resources: ["Analytics Setup Guide"],
            },
          ],
        },
        {
          day: 9,
          title: "Sales Funnel Implementation",
          description: "Build systems to convert visitors into customers",
          tasks: [
            {
              id: "d9-t1",
              title: "Create lead magnet",
              description: "Develop a valuable free resource to capture email addresses.",
              completed: false,
              resources: ["Lead Magnet Ideas", "Creation Guide"],
            },
            {
              id: "d9-t2",
              title: "Set up email marketing system",
              description: "Configure your email platform and create welcome sequence.",
              completed: false,
              resources: ["Email Setup Checklist"],
            },
            {
              id: "d9-t3",
              title: "Build landing page",
              description: "Create a high-converting landing page for your main offer.",
              completed: false,
              resources: ["Landing Page Template"],
            },
          ],
        },
        {
          day: 10,
          title: "Marketing Channel Activation",
          description: "Launch your primary marketing channels",
          tasks: [
            {
              id: "d10-t1",
              title: "Launch content marketing",
              description: "Publish your first content pieces and establish a regular posting schedule.",
              completed: false,
              resources: ["Content Launch Checklist"],
            },
            {
              id: "d10-t2",
              title: "Start social media engagement",
              description: "Begin actively engaging with your target audience on social platforms.",
              completed: false,
              resources: ["Engagement Strategy Guide"],
            },
            {
              id: "d10-t3",
              title: "Implement SEO basics",
              description: "Optimize your content and website for search engines.",
              completed: false,
              resources: ["SEO Checklist"],
            },
          ],
        },
        {
          day: 11,
          title: "Outreach & Networking",
          description: "Proactively reach out to potential customers and partners",
          tasks: [
            {
              id: "d11-t1",
              title: "Launch outreach campaign",
              description: "Start reaching out to potential customers through email and social.",
              completed: false,
              resources: ["Outreach Templates", "Sequence Guide"],
            },
            {
              id: "d11-t2",
              title: "Identify partnership opportunities",
              description: "Find complementary businesses for potential collaborations.",
              completed: false,
              resources: ["Partnership Framework"],
            },
            {
              id: "d11-t3",
              title: "Join relevant communities",
              description: "Become an active member of communities where your audience gathers.",
              completed: false,
              resources: ["Community List", "Engagement Tips"],
            },
          ],
        },
      ],
    },
    {
      id: "scale",
      title: "Scale & Optimize",
      days: "Day 12-14",
      icon: TrendingUp,
      color: "pink",
      description: "Analyze results and prepare for sustainable growth",
      daysList: [
        {
          day: 12,
          title: "Performance Analysis",
          description: "Review initial results and gather insights",
          tasks: [
            {
              id: "d12-t1",
              title: "Analyze traffic and engagement data",
              description: "Review website analytics and social media metrics.",
              completed: false,
              resources: ["Analytics Dashboard Guide"],
            },
            {
              id: "d12-t2",
              title: "Gather customer feedback",
              description: "Collect feedback from early interactions and leads.",
              completed: false,
              resources: ["Feedback Survey Template"],
            },
            {
              id: "d12-t3",
              title: "Identify quick wins and improvements",
              description: "Find immediate optimizations based on data.",
              completed: false,
              resources: ["Optimization Checklist"],
            },
          ],
        },
        {
          day: 13,
          title: "System Optimization",
          description: "Improve and automate your business processes",
          tasks: [
            {
              id: "d13-t1",
              title: "Optimize conversion funnels",
              description: "Improve landing pages, emails, and sales processes based on data.",
              completed: false,
              resources: ["Conversion Optimization Guide"],
            },
            {
              id: "d13-t2",
              title: "Set up automation workflows",
              description: "Automate repetitive tasks to save time and scale.",
              completed: false,
              resources: ["Automation Playbook"],
            },
            {
              id: "d13-t3",
              title: "Document standard procedures",
              description: "Create SOPs for key business processes.",
              completed: false,
              resources: ["SOP Templates"],
            },
          ],
        },
        {
          day: 14,
          title: "Growth Planning",
          description: "Create your roadmap for continued success",
          tasks: [
            {
              id: "d14-t1",
              title: "Create 30-60-90 day growth plan",
              description: "Map out your next three months with specific goals and milestones.",
              completed: false,
              resources: ["Growth Plan Template"],
            },
            {
              id: "d14-t2",
              title: "Set up monitoring dashboards",
              description: "Create systems to track key metrics ongoing.",
              completed: false,
              resources: ["Dashboard Setup Guide"],
            },
            {
              id: "d14-t3",
              title: "Celebrate and review!",
              description: "Acknowledge your progress and set intentions for the future.",
              completed: false,
              resources: ["Reflection Worksheet"],
            },
          ],
        },
      ],
    },
  ];

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => {
      const next = new Set(prev);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      return next;
    });
  };

  const totalTasks = phases.reduce(
    (acc, phase) => acc + phase.daysList.reduce((a, day) => a + day.tasks.length, 0),
    0
  );
  const completedCount = completedTasks.size;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">14-Day Strategic Plan</h1>
          <p className="text-slate-600 mt-1">Your complete roadmap to launching your Shadow Operating business</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-xl px-4 py-3 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Progress</p>
                <p className="text-lg font-bold text-slate-900">{completedCount}/{totalTasks} tasks</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-600">Overall Progress</span>
          <span className="text-sm font-bold text-slate-900">{progressPercent}%</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between mt-3">
          {phases.map((phase, index) => (
            <div key={phase.id} className="flex items-center gap-1 text-xs text-slate-500">
              <div className={`w-2 h-2 rounded-full bg-${phase.color}-500`} />
              <span className="hidden sm:inline">{phase.days}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Phases */}
      <div className="space-y-4">
        {phases.map((phase) => {
          const phaseCompletedTasks = phase.daysList.reduce(
            (acc, day) => acc + day.tasks.filter((t) => completedTasks.has(t.id)).length,
            0
          );
          const phaseTotalTasks = phase.daysList.reduce((acc, day) => acc + day.tasks.length, 0);
          const isExpanded = expandedPhase === phase.id;

          return (
            <div key={phase.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              {/* Phase Header */}
              <button
                onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-${phase.color}-100 flex items-center justify-center`}>
                    <phase.icon className={`w-6 h-6 text-${phase.color}-600`} />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold text-slate-900">{phase.title}</h2>
                      <span className={`text-xs font-medium text-${phase.color}-600 bg-${phase.color}-50 px-2 py-0.5 rounded`}>
                        {phase.days}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">{phase.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-slate-900">
                      {phaseCompletedTasks}/{phaseTotalTasks} tasks
                    </p>
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                      <div
                        className={`h-full bg-${phase.color}-500 rounded-full`}
                        style={{ width: `${(phaseCompletedTasks / phaseTotalTasks) * 100}%` }}
                      />
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Phase Content */}
              {isExpanded && (
                <div className="border-t border-slate-100">
                  {phase.daysList.map((day) => {
                    const isDayExpanded = expandedDay === day.day;
                    const dayCompletedTasks = day.tasks.filter((t) => completedTasks.has(t.id)).length;

                    return (
                      <div key={day.day} className="border-b border-slate-50 last:border-b-0">
                        {/* Day Header */}
                        <button
                          onClick={() => setExpandedDay(isDayExpanded ? null : day.day)}
                          className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                              <Calendar className="w-4 h-4 text-slate-600" />
                            </div>
                            <div className="text-left">
                              <p className="font-medium text-slate-900">Day {day.day}: {day.title}</p>
                              <p className="text-sm text-slate-500">{day.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-slate-500">
                              {dayCompletedTasks}/{day.tasks.length}
                            </span>
                            {isDayExpanded ? (
                              <ChevronDown className="w-4 h-4 text-slate-400" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            )}
                          </div>
                        </button>

                        {/* Day Tasks */}
                        {isDayExpanded && (
                          <div className="px-6 pb-4 space-y-3">
                            {day.tasks.map((task) => {
                              const isCompleted = completedTasks.has(task.id);

                              return (
                                <div
                                  key={task.id}
                                  className={`p-4 rounded-xl border transition-all ${
                                    isCompleted
                                      ? "bg-green-50 border-green-100"
                                      : "bg-slate-50 border-slate-100 hover:border-slate-200"
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <button
                                      onClick={() => toggleTask(task.id)}
                                      className="mt-0.5 flex-shrink-0"
                                    >
                                      {isCompleted ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                      ) : (
                                        <Circle className="w-5 h-5 text-slate-300 hover:text-blue-500 transition-colors" />
                                      )}
                                    </button>
                                    <div className="flex-1">
                                      <p className={`font-medium ${isCompleted ? "text-green-700 line-through" : "text-slate-900"}`}>
                                        {task.title}
                                      </p>
                                      <p className={`text-sm mt-1 ${isCompleted ? "text-green-600" : "text-slate-600"}`}>
                                        {task.description}
                                      </p>
                                      {task.resources && task.resources.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-3">
                                          {task.resources.map((resource, idx) => (
                                            <span
                                              key={idx}
                                              className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded"
                                            >
                                              <FileText className="w-3 h-3" />
                                              {resource}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion CTA */}
      {progressPercent === 100 && (
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-white fill-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Congratulations! 🎉</h2>
          <p className="text-white/80 max-w-md mx-auto">
            You&apos;ve completed the 14-day strategic plan! Your Shadow Operating business is now ready for growth.
          </p>
        </div>
      )}
    </div>
  );
}
