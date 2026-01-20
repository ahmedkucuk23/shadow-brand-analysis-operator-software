import { db } from "@/lib/db";
import Link from "next/link";

export default async function ServicesPage() {
  const services = await db.service.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Services</h1>
          <p className="text-slate-600 mt-2">Manage your agency services</p>
        </div>
        <Link
          href="/dashboard/services/new"
          className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          Add Service
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length === 0 ? (
          <div className="col-span-full bg-white p-8 rounded-lg border text-center text-slate-500">
            No services yet. Add your first service to get started.
          </div>
        ) : (
          services.map((service) => (
            <div key={service.id} className="bg-white p-6 rounded-lg border">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                    service.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {service.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-slate-600 mb-4 line-clamp-3">{service.description}</p>
              {service.isFeatured && (
                <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-purple-100 text-purple-700 mb-4">
                  Featured
                </span>
              )}
              <Link
                href={`/dashboard/services/${service.id}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Edit Service →
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
