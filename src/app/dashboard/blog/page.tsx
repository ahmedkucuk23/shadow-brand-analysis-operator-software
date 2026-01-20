import { db } from "@/lib/db";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await db.blogPost.findMany({
    include: {
      author: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Blog Posts</h1>
          <p className="text-slate-600 mt-2">Manage your blog content</p>
        </div>
        <Link
          href="/dashboard/blog/new"
          className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          New Post
        </Link>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left p-4 font-medium text-slate-900">Title</th>
              <th className="text-left p-4 font-medium text-slate-900">Author</th>
              <th className="text-left p-4 font-medium text-slate-900">Category</th>
              <th className="text-left p-4 font-medium text-slate-900">Status</th>
              <th className="text-left p-4 font-medium text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  No blog posts yet. Create your first post to get started.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b last:border-0">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-slate-900">{post.title}</div>
                      {post.excerpt && (
                        <div className="text-sm text-slate-500 mt-1 line-clamp-1">
                          {post.excerpt}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-slate-600">
                    {post.author?.name || "Unknown"}
                  </td>
                  <td className="p-4 text-slate-600">{post.category || "-"}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                        post.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {post.isPublished ? "Published" : "Draft"}
                    </span>
                    {post.isFeatured && (
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-purple-100 text-purple-700 ml-2">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <Link
                      href={`/dashboard/blog/${post.id}`}
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
