"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

export default function WritePostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "General",
    excerpt: "",
    content: "", // You can type simple HTML here for now (e.g., <p>Text</p>)
    coverImage: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, published: true }),
      });

      if (res.ok) {
        alert("Post published successfully!");
        router.push("/admin"); // Go back to dashboard
      } else {
        alert("Failed to publish");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={20} /> Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold">Write New Insight</h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Article Title</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-lg font-semibold placeholder:font-normal"
                placeholder="e.g., 5 Ways 3D Configurators Boost Sales"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            {/* Category & Image URL */}
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
                  placeholder="https://... (or /assets/image.png)"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Short Summary (Excerpt)</label>
              <textarea
                required
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none resize-none"
                placeholder="A brief 2-sentence summary that appears on the card..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              />
            </div>

            {/* Main Content */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Content (HTML Supported)</label>
              <div className="relative">
                <textarea
                  required
                  rows={15}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none font-mono text-sm leading-relaxed"
                  placeholder="<p>Write your article content here...</p>"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
                <p className="absolute bottom-4 right-4 text-xs text-slate-400 bg-white px-2 rounded">
                  Pro Tip: Use &lt;h2&gt;, &lt;p&gt;, and &lt;ul&gt; tags.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end pt-6 border-t border-slate-100">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                {loading ? "Publishing..." : "Publish Article"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}