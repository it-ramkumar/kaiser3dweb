"use client";
import { useEffect, useState, use } from "react"; // 'use' is needed for Next.js 15 params
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Trash2 } from "lucide-react";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const { id } = use(params);
  
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "General",
    excerpt: "",
    content: "",
    coverImage: "",
  });

  // Fetch Data on Load
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/admin/posts/${id}`);
        const data = await res.json();
        if (res.ok) {
          setFormData({
            title: data.title,
            category: data.category,
            excerpt: data.excerpt,
            content: data.content,
            coverImage: data.coverImage || "",
          });
        } else {
          alert("Post not found");
          router.push("/admin");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Post updated successfully!");
        router.push("/admin");
      } else {
        alert("Failed to update");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-20 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 hover:text-slate-900">
            <ArrowLeft size={20} /> Cancel
          </button>
          <h1 className="text-2xl font-bold">Edit Insight</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Article Title</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none text-lg font-semibold"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="General">General</option>
                  <option value="Technical">Technical Deep Dive</option>
                  <option value="Strategy">E-commerce Strategy</option>
                  <option value="Case Study">Case Study</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Cover Image URL</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Short Summary</label>
              <textarea
                required
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none resize-none"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Content (HTML)</label>
              <textarea
                required
                rows={15}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none font-mono text-sm leading-relaxed"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-end pt-6 border-t border-slate-100">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all disabled:opacity-50"
              >
                {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                {saving ? "Saving..." : "Update Article"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}