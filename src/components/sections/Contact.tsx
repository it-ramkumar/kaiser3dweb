'use client';
import React, { useState } from 'react';

// Options matching your Mongoose Schema Enums
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

interface FormData {
    clientName: string;
    companyName: string;
    email: string;
    phone: string;
    projectType: string;
    budgetRange: string;
    projectDescription: string;
}

export default function Contact() {
    const [formData, setFormData] = useState<FormData>({
        clientName: '',
        companyName: '',
        email: '',
        phone: '',
        projectType: PROJECT_TYPES[0], // Default to first option
        budgetRange: 'Not Disclosed',
        projectDescription: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | '';
        message: string;
    }>({ type: '', message: '' });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: '', message: '' });

        try {
            // Updated endpoint to match the new API route
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus({ type: 'success', message: 'Project request sent successfully! We will be in touch.' });
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
                // Use the specific error message from the backend (e.g. "Email already exists")
                setSubmitStatus({ type: 'error', message: data.error || 'Failed to send message.' });
            }
        } catch (error) {
            setSubmitStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-12 px-4 md:px-8 lg:px-16">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">Start a Project</h1>
                <p className="text-gray-600 mb-8">
                    Tell us about your 3D needs. We specialize in high-fidelity visualizations and interactive experiences.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Row 1: Name & Company */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">Name *</label>
                            <input
                                type="text"
                                name="clientName"
                                value={formData.clientName}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">Company Name *</label>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                                placeholder="Acme Studios"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Row 2: Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="john@company.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">Phone (Optional)</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 (555) 000-0000"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Row 3: Project Type & Budget */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">Project Type *</label>
                            <div className="relative">
                                <select
                                    name="projectType"
                                    value={formData.projectType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-gray"
                                >
                                    {PROJECT_TYPES.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700 ">Budget Range</label>
                            <div className="relative">
                                <select
                                    name="budgetRange"
                                    value={formData.budgetRange}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-gray"
                                >
                                    {BUDGET_RANGES.map((range) => (
                                        <option key={range} value={range}>{range}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Project Description *</label>
                        <textarea
                            name="projectDescription"
                            value={formData.projectDescription}
                            onChange={handleChange}
                            required
                            rows={5}
                            placeholder="Tell us about the project scope, timeline, and technical requirements..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 shadow-md"
                    >
                        {isSubmitting ? 'Submitting Request...' : 'Submit Project Request'}
                    </button>
                </form>

                {submitStatus.message && (
                    <div
                        className={`mt-6 p-4 rounded-lg text-center ${
                            submitStatus.type === 'success'
                                ? 'bg-green-100 text-green-800 border border-green-200'
                                : 'bg-red-100 text-red-800 border border-red-200'
                        }`}
                    >
                        {submitStatus.message}
                    </div>
                )}
            </div>
        </section>
    );
}