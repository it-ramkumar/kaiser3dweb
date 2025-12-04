'use client';
import { useState } from 'react';
// Changed to named imports to fix the "No matching export for default" error
import  Input  from '@/components/ui/Input';     
import  Textarea  from '@/components/ui/TextArea'; 
import { Button } from '@/components/ui/Button';   

// Enums matching your backend Schema
const PROJECT_TYPES = [
    '3D Modeling',
    'Unreal Engine Dev',
    'Unity Dev',
    'WebGL/Three.js',
    'VR/AR Experience',
    'Architectural Visualization',
    'Other'
];

const BUDGET_RANGES = [
    'Under $5k',
    '$5k - $15k',
    '$15k - $50k',
    '$50k+',
    'Not Disclosed'
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        clientName: '',
        companyName: '',
        email: '',
        phone: '', // Added phone
        projectType: PROJECT_TYPES[0],
        budgetRange: 'Not Disclosed',
        projectDescription: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus({ type: 'success', message: 'Message sent! We will contact you shortly.' });
                // Reset form
                setFormData({
                    clientName: '',
                    companyName: '',
                    email: '',
                    phone: '',
                    projectType: PROJECT_TYPES[0],
                    budgetRange: 'Not Disclosed',
                    projectDescription: '',
                });
            } else {
                setStatus({ type: 'error', message: data.error || 'Something went wrong. Please try again.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to connect to the server.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent-start/10 blur-[120px] rounded-full -z-10" />
            
            <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-6">Ready to Build Your <span className="accent-text">3D Future?</span></h1>
                    <p className="text-xl text-muted">Let's talk. We can provide a complimentary consultation and audit.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {/* Info Sidebar */}
                    <div className="md:col-span-1 space-y-8 sticky top-32">
                        <div>
                            <h3 className="font-bold text-lg mb-2">Email Us</h3>
                            <a href="mailto:contact@kaiser3dweb.com" className="text-muted hover:text-accent-start transition">
                                contact@kaiser3dweb.com
                            </a>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-2">Call Us</h3>
                            <p className="text-muted">+1 (951) 441-9719</p>
                        </div>
                        <div className="p-6 rounded-xl bg-accent-start/5 border border-accent-start/10">
                            <p className="text-sm text-accent-start font-semibold">"Kaiser3DWeb transformed our conversion rates."</p>
                        </div>
                    </div>

                    {/* The Functional Glass Form */}
                    <div className="md:col-span-2 glass-card p-8 rounded-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Name & Company Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input 
                                    // label="Full Name *"  <-- Removed label prop if ShadCN input doesn't support it directly
                                    name="clientName" 
                                    value={formData.clientName}
                                    placeholder="Full Name *" 
                                    onChange={handleChange} 
                                    required
                                    className="bg-input border-border focus:border-accent-start w-full"
                                />
                                <Input 
                                    // label="Company Name *" 
                                    name="companyName" 
                                    value={formData.companyName}
                                    placeholder="Company Name *" 
                                    onChange={handleChange} 
                                    required
                                    className="bg-input border-border focus:border-accent-start w-full"
                                />
                            </div>

                            {/* Email & Phone Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input 
                                    // label="Email Address *" 
                                    name="email" 
                                    type="email" 
                                    value={formData.email}
                                    placeholder="Email Address *" 
                                    onChange={handleChange} 
                                    required
                                    className="bg-input border-border focus:border-accent-start w-full"
                                />
                                <Input 
                                    // label="Phone (Optional)" 
                                    name="phone" 
                                    type="tel"
                                    value={formData.phone}
                                    placeholder="Phone (Optional)" 
                                    onChange={handleChange} 
                                    className="bg-input border-border focus:border-accent-start w-full"
                                />
                            </div>

                            {/* Project Type & Budget Row (Custom Selects) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium">Project Type</label>
                                    <select 
                                        name="projectType"
                                        value={formData.projectType}
                                        onChange={handleChange}
                                        className="h-11 px-3 rounded-md bg-input border border-border focus:border-accent-start focus:ring-1 focus:ring-accent-start outline-none transition-colors"
                                    >
                                        {PROJECT_TYPES.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium">Budget Range</label>
                                    <select 
                                        name="budgetRange"
                                        value={formData.budgetRange}
                                        onChange={handleChange}
                                        className="h-11 px-3 rounded-md bg-input border border-border focus:border-accent-start focus:ring-1 focus:ring-accent-start outline-none transition-colors"
                                    >
                                        {BUDGET_RANGES.map(range => (
                                            <option key={range} value={range}>{range}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <Textarea 
                                // label="Project Details *" 
                                name="projectDescription" 
                                value={formData.projectDescription}
                                rows={5} 
                                placeholder="Project Details... Tell us about your goals, technical requirements, and timeline." 
                                onChange={handleChange} 
                                required
                                className="bg-input border-border focus:border-accent-start"
                            />
                            
                            <Button 
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 text-lg font-bold accent-bg shadow-lg shadow-accent-start/25 hover:shadow-accent-start/40 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending Request...' : 'Request Consultation'}
                            </Button>

                            {/* Status Messages */}
                            {status.message && (
                                <div className={`p-4 rounded-lg text-center ${status.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                    {status.message}
                                </div>
                            )}

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}