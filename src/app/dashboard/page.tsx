import Link from "next/link";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  // Get counts for dashboard overview
  const [teamCount, servicesCount, projectsCount, blogCount, contactsCount] = await Promise.all([
    db.teamMember.count({ where: { isActive: true } }),
    db.service.count({ where: { isActive: true } }),
    db.project.count({ where: { isActive: true } }),
    db.blogPost.count({ where: { isPublished: true } }),
    db.contactSubmission.count({ where: { status: "new" } }),
  ]);

  const stats = [
    { name: "Team Members", value: teamCount, href: "/dashboard/team" },
    { name: "Services", value: servicesCount, href: "/dashboard/services" },
    { name: "Projects", value: projectsCount, href: "/dashboard/projects" },
    { name: "Published Posts", value: blogCount, href: "/dashboard/blog" },
    { name: "New Messages", value: contactsCount, href: "/dashboard/contacts" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">Welcome to the Mita Agency CMS</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow"
          >
            <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-slate-600 mt-1">{stat.name}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg border">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/dashboard/team"
            className="px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-center font-medium"
          >
            Add Team Member
          </Link>
          <Link
            href="/dashboard/services"
            className="px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-center font-medium"
          >
            Add Service
          </Link>
          <Link
            href="/dashboard/projects"
            className="px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-center font-medium"
          >
            Add Project
          </Link>
          <Link
            href="/dashboard/blog"
            className="px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-center font-medium"
          >
            Write Post
          </Link>
        </div>
      </div>
    </div>
  );
}
