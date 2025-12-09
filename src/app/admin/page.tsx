"use client";
import { useEffect, useState } from "react";
import { Trash2, Mail, Phone, Calendar, RefreshCcw, Plus, Edit, FileText, Users } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

// Types
interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

interface Post {
  _id: string;
  title: string;
  category: string;
  createdAt: string;
  published: boolean;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"leads" | "posts">("leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data
  const fetchData = async () => {
    setLoading(true);
    try {
      // Parallel fetch for speed
      const [leadsRes, postsRes] = await Promise.all([
        fetch("/api/admin/leads"),
        fetch("/api/admin/posts") // Note: This uses the GET we made earlier
      ]);
      
      const leadsData = await leadsRes.json();
      const postsData = await postsRes.json();
      
      setLeads(leadsData);
      setPosts(postsData);
    } catch (error) {
      console.error("Failed to fetch", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- ACTIONS ---
  
  // Leads: Update Status
  const updateLeadStatus = async (id: string, newStatus: string) => {
    setLeads(leads.map(l => l._id === id ? { ...l, status: newStatus as any } : l));
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: newStatus }),
    });
  };

  // Leads: Delete
  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    setLeads(leads.filter(l => l._id !== id));
    await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
  };

  // Posts: Delete
  const deletePost = async (id: string) => {
    if (!confirm("Delete this article? This cannot be undone.")) return;
    setPosts(posts.filter(p => p._id !== id));
    await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500">Welcome back, Admin.</p>
          </div>
          
          <div className="flex gap-3">
            <Link 
              href="/admin/write"
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-lg"
            >
              <Plus size={18} />
              <span className="font-bold">Write New</span>
            </Link>
            <button 
              onClick={fetchData}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
            >
              <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-6 mb-8 border-b border-slate-200">
          <button 
            onClick={() => setActiveTab("leads")}
            className={clsx(
              "pb-4 flex items-center gap-2 font-bold transition-all relative",
              activeTab === "leads" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <Users size={20} /> Customer Leads
            <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs">{leads.length}</span>
            {activeTab === "leads" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />}
          </button>

          <button 
            onClick={() => setActiveTab("posts")}
            className={clsx(
              "pb-4 flex items-center gap-2 font-bold transition-all relative",
              activeTab === "posts" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <FileText size={20} /> Blog Posts
            <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs">{posts.length}</span>
            {activeTab === "posts" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />}
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden min-h-[400px]">
          
          {/* --- LEADS TABLE --- */}
          {activeTab === "leads" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                    <th className="p-6">Client</th>
                    <th className="p-6">Contact</th>
                    <th className="p-6 w-1/3">Message</th>
                    <th className="p-6">Status</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-6">
                        <div className="font-bold text-slate-900">{lead.name}</div>
                        {lead.company && <div className="text-sm text-slate-500">{lead.company}</div>}
                        <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                          <Calendar size={12} /> {new Date(lead.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col gap-1 text-sm">
                          <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline flex items-center gap-2"><Mail size={14}/> {lead.email}</a>
                          {lead.phone && <div className="text-slate-600 flex items-center gap-2"><Phone size={14}/> {lead.phone}</div>}
                        </div>
                      </td>
                      <td className="p-6 text-sm text-slate-600 line-clamp-2">{lead.message}</td>
                      <td className="p-6">
                        <select 
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead._id, e.target.value)}
                          className={clsx(
                            "px-3 py-1 rounded-full text-xs font-bold border-none outline-none cursor-pointer appearance-none",
                            lead.status === 'new' && "bg-green-100 text-green-700",
                            lead.status === 'contacted' && "bg-blue-100 text-blue-700",
                            lead.status === 'closed' && "bg-slate-100 text-slate-500 line-through"
                          )}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="p-6 text-right">
                        <button onClick={() => deleteLead(lead._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {leads.length === 0 && !loading && <tr><td colSpan={5} className="p-12 text-center text-slate-400">No leads yet.</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {/* --- POSTS TABLE --- */}
          {activeTab === "posts" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                    <th className="p-6">Title</th>
                    <th className="p-6">Category</th>
                    <th className="p-6">Date</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {posts.map((post) => (
                    <tr key={post._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-6">
                        <div className="font-bold text-slate-900 text-lg">{post.title}</div>
                        <a href={`/insights/${post.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}`} target="_blank" className="text-xs text-blue-500 hover:underline">
                          View Live
                        </a>
                      </td>
                      <td className="p-6">
                        <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
                          {post.category}
                        </span>
                      </td>
                      <td className="p-6 text-sm text-slate-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-6 text-right flex justify-end gap-2">
                        <Link href={`/admin/posts/${post._id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full">
                          <Edit size={18} />
                        </Link>
                        <button onClick={() => deletePost(post._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {posts.length === 0 && !loading && <tr><td colSpan={4} className="p-12 text-center text-slate-400">No posts yet. Write one!</td></tr>}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}