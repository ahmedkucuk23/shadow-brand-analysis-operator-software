import { db } from "@/lib/db";
import Link from "next/link";

export default async function TeamPage() {
  const teamMembers = await db.teamMember.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Team Members</h1>
          <p className="text-slate-600 mt-2">Manage your team members</p>
        </div>
        <Link
          href="/dashboard/team/new"
          className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          Add Team Member
        </Link>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left p-4 font-medium text-slate-900">Name</th>
              <th className="text-left p-4 font-medium text-slate-900">Role</th>
              <th className="text-left p-4 font-medium text-slate-900">Email</th>
              <th className="text-left p-4 font-medium text-slate-900">Status</th>
              <th className="text-left p-4 font-medium text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  No team members yet. Add your first team member to get started.
                </td>
              </tr>
            ) : (
              teamMembers.map((member) => (
                <tr key={member.id} className="border-b last:border-0">
                  <td className="p-4 font-medium text-slate-900">{member.name}</td>
                  <td className="p-4 text-slate-600">{member.role}</td>
                  <td className="p-4 text-slate-600">{member.email || "-"}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                        member.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {member.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4">
                    <Link
                      href={`/dashboard/team/${member.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
