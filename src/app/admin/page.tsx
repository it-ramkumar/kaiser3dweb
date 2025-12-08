"use client";
import { useEffect, useState } from "react";
import { Trash2, Mail, Phone, Calendar, RefreshCcw, CheckCircle } from "lucide-react";
import clsx from "clsx";

// Define the shape of our data
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

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Leads
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      setLeads(data);
    } catch (error) {
      console.error("Failed to fetch", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Handle Status Update
  const updateStatus = async (id: string, newStatus: string) => {
    // Optimistic Update (Update UI immediately)
    setLeads(leads.map(l => l._id === id ? { ...l, status: newStatus as any } : l));
    
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: newStatus }),
    });
  };

  // Handle Delete
  const deleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    
    setLeads(leads.filter(l => l._id !== id));
    await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Lead Dashboard</h1>
            <p className="text-slate-500">Manage your incoming client requests.</p>
          </div>
          <button 
            onClick={fetchLeads}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
          >
            <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard label="Total Leads" value={leads.length} color="bg-blue-600" />
          <StatCard label="New Leads" value={leads.filter(l => l.status === 'new').length} color="bg-green-600" />
          <StatCard label="Pending Action" value={leads.filter(l => l.status !== 'closed').length} color="bg-orange-500" />
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                  <th className="p-6">Client</th>
                  <th className="p-6">Contact Info</th>
                  <th className="p-6 w-1/3">Message</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-slate-50/50 transition-colors group">
                    {/* Client Name & Company */}
                    <td className="p-6 align-top">
                      <div className="font-bold text-slate-900">{lead.name}</div>
                      {lead.company && (
                        <div className="text-sm text-slate-500 font-medium">{lead.company}</div>
                      )}
                      <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                        <Calendar size={12} />
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td className="p-6 align-top">
                      <div className="flex flex-col gap-2">
                        <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                          <Mail size={14} /> {lead.email}
                        </a>
                        {lead.phone && (
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Phone size={14} /> {lead.phone}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Message */}
                    <td className="p-6 align-top">
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 hover:line-clamp-none transition-all">
                        {lead.message}
                      </p>
                    </td>

                    {/* Status Select */}
                    <td className="p-6 align-top">
                      <select 
                        value={lead.status}
                        onChange={(e) => updateStatus(lead._id, e.target.value)}
                        className={clsx(
                          "px-3 py-1 rounded-full text-xs font-bold border-none outline-none cursor-pointer appearance-none pl-4 pr-8",
                          lead.status === 'new' && "bg-green-100 text-green-700",
                          lead.status === 'contacted' && "bg-blue-100 text-blue-700",
                          lead.status === 'closed' && "bg-slate-100 text-slate-500 line-through",
                        )}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="p-6 align-top text-right">
                      <button 
                        onClick={() => deleteLead(lead._id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                        title="Delete Lead"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}

                {leads.length === 0 && !loading && (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-slate-400">
                      No leads found yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Small helper component for stats
function StatCard({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">{label}</p>
        <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
      </div>
      <div className={`w-3 h-3 rounded-full ${color} animate-pulse`} />
    </div>
  );
}