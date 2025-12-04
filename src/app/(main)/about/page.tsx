'use client';
import Image from 'next/image';



export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-5xl font-bold mb-4">About Us</h1>
                    <p className="text-xl text-blue-100">
                        Innovating 3D solutions for a better tomorrow
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-gray-900">Our Mission</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        At Kaiser 3D Web, we're committed to revolutionizing how businesses
                        leverage 3D technology. Our mission is to empower organizations with
                        cutting-edge tools and expertise to create immersive digital experiences.
                    </p>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-gray-50 py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-gray-900">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow">
                            <h3 className="text-xl font-bold mb-3 text-blue-600">Innovation</h3>
                            <p className="text-gray-700">
                                We continuously push boundaries to deliver next-generation 3D solutions.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow">
                            <h3 className="text-xl font-bold mb-3 text-blue-600">Excellence</h3>
                            <p className="text-gray-700">
                                Quality and precision drive every project we undertake.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow">
                            <h3 className="text-xl font-bold mb-3 text-blue-600">Collaboration</h3>
                            <p className="text-gray-700">
                                We partner closely with clients to achieve their vision.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-gray-900">Our Team</h2>
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                        Our team comprises experienced developers, designers, and 3D specialists
                        dedicated to delivering exceptional results. With a passion for technology
                        and creative problem-solving, we transform ideas into reality.
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-600 text-white py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Work Together?</h2>
                    <p className="text-lg mb-8">
                        Let's discuss how we can help bring your 3D vision to life.
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                        Get In Touch
                    </button>
                </div>
            </section>
        </div>
    );
}