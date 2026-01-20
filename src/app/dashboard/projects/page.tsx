import { db } from "@/lib/db";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await db.project.findMany({
    include: {
      service: true,
    },
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Portfolio Projects</h1>
          <p className="text-slate-600 mt-2">Showcase your best work</p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          Add Project
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full bg-white p-8 rounded-lg border text-center text-slate-500">
            No projects yet. Add your first project to get started.
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg border overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                      project.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {project.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                {project.client && (
                  <p className="text-sm text-slate-500 mb-2">Client: {project.client}</p>
                )}
                <p className="text-slate-600 mb-4 line-clamp-2">{project.description}</p>
                {project.service && (
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-700 mb-4">
                    {project.service.title}
                  </span>
                )}
                {project.isFeatured && (
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-purple-100 text-purple-700 mb-4 ml-2">
                    Featured
                  </span>
                )}
                <div className="mt-4">
                  <Link
                    href={`/dashboard/projects/${project.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit Project →
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
