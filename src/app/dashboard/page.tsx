import Link from "next/link";
import { auth } from "@/auth";
import { 
  Calendar, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2,
  Clock,
  Target,
  TrendingUp,
  Sparkles
} from "lucide-react";

export const metadata = {
  title: "Dashboard | Shadow Operator",
  description: "Access your Shadow Operator dashboard to manage your 14-day plan and brand analysis tools.",
};

export default async function DashboardPage() {
  const session = await auth();

  // Mock progress data - in production, this would come from the database
  const progress = {
    shadowOperator: {
      currentDay: 3,
      totalDays: 14,
      completedTasks: 8,
      totalTasks: 42,
    },
    brandAnalysis: {
      completedTools: 2,
      totalTools: 6,
    },
  };

  const quickActions = [
    {
      title: "Shadow Operator",
      description: "Continue your 14-day strategic plan",
      icon: Calendar,
      href: "/dashboard/shadow-operator",
      color: "blue",
      progress: Math.round((progress.shadowOperator.currentDay / progress.shadowOperator.totalDays) * 100),
      status: `Day ${progress.shadowOperator.currentDay} of ${progress.shadowOperator.totalDays}`,
    },
    {
      title: "Brand Analysis",
      description: "Access your market research tools",
      icon: BarChart3,
      href: "/dashboard/brand-analysis",
      color: "violet",
      progress: Math.round((progress.brandAnalysis.completedTools / progress.brandAnalysis.totalTools) * 100),
      status: `${progress.brandAnalysis.completedTools} of ${progress.brandAnalysis.totalTools} tools used`,
    },
  ];

  const upcomingTasks = [
    { day: "Day 3", task: "Complete competitor analysis framework", status: "in_progress" },
    { day: "Day 3", task: "Identify 5 direct competitors", status: "pending" },
    { day: "Day 4", task: "Build customer persona profiles", status: "pending" },
    { day: "Day 4", task: "Map customer pain points", status: "pending" },
  ];

  const recentActivity = [
    { action: "Completed market research template", time: "2 hours ago" },
    { action: "Started competitor analysis", time: "Yesterday" },
    { action: "Set up business goals", time: "2 days ago" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-light opacity-5" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/20 rounded-full blur-[100px]" />
        
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Welcome back!</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {session?.user?.name || session?.user?.email?.split("@")[0] || "Operator"}
          </h1>
          <p className="text-white/60 max-w-lg">
            You&apos;re on Day {progress.shadowOperator.currentDay} of your 14-day journey. 
            Keep up the great work!
          </p>
          
          {/* Progress Bar */}
          <div className="mt-6 max-w-md">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/60">Overall Progress</span>
              <span className="text-white font-medium">
                {Math.round((progress.shadowOperator.completedTasks / progress.shadowOperator.totalTasks) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-500"
                style={{ width: `${(progress.shadowOperator.completedTasks / progress.shadowOperator.totalTasks) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-${action.color}-100 flex items-center justify-center`}>
                <action.icon className={`w-6 h-6 text-${action.color}-600`} />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
            </div>
            
            <h3 className="text-xl font-semibold text-slate-900 mb-1">{action.title}</h3>
            <p className="text-slate-600 text-sm mb-4">{action.description}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">{action.status}</span>
                <span className="text-slate-700 font-medium">{action.progress}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-${action.color}-500 rounded-full`}
                  style={{ width: `${action.progress}%` }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Tasks */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Upcoming Tasks</h2>
            <Link 
              href="/dashboard/shadow-operator"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View all →
            </Link>
          </div>
          
          <div className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  task.status === "in_progress" 
                    ? "bg-blue-100" 
                    : "bg-slate-200"
                }`}>
                  {task.status === "in_progress" ? (
                    <Clock className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Target className="w-4 h-4 text-slate-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {task.day}
                    </span>
                    {task.status === "in_progress" && (
                      <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="text-slate-700">{task.task}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-slate-700 text-sm">{activity.action}</p>
                  <p className="text-slate-400 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-violet-50 rounded-xl">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-slate-900">Great progress!</p>
                <p className="text-xs text-slate-600">You&apos;re ahead of schedule</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
