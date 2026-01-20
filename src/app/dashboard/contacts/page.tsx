import { db } from "@/lib/db";

export default async function ContactsPage() {
  const contacts = await db.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Contact Submissions</h1>
        <p className="text-slate-600 mt-2">Messages from your contact form</p>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left p-4 font-medium text-slate-900">Name</th>
              <th className="text-left p-4 font-medium text-slate-900">Email</th>
              <th className="text-left p-4 font-medium text-slate-900">Company</th>
              <th className="text-left p-4 font-medium text-slate-900">Type</th>
              <th className="text-left p-4 font-medium text-slate-900">Status</th>
              <th className="text-left p-4 font-medium text-slate-900">Date</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">
                  No contact submissions yet.
                </td>
              </tr>
            ) : (
              contacts.map((contact) => (
                <tr key={contact.id} className="border-b last:border-0 hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-900">{contact.name}</td>
                  <td className="p-4 text-slate-600">{contact.email}</td>
                  <td className="p-4 text-slate-600">{contact.company || "-"}</td>
                  <td className="p-4 text-slate-600">{contact.type}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                        contact.status === "new"
                          ? "bg-blue-100 text-blue-700"
                          : contact.status === "read"
                          ? "bg-slate-100 text-slate-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {contact.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 text-sm">
                    {new Date(contact.createdAt).toLocaleDateString()}
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
