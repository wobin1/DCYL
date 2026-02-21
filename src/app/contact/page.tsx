import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageSquare, Globe } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-24 bg-dark-teal text-white overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/uploads/hero-bg.png"
                            alt="Contact Us"
                            className="w-full h-full object-cover opacity-10"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-600/60 via-teal-700/80 to-dark-teal"></div>
                    </div>
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Get In Touch</h1>
                        <p className="text-xl md:text-2xl text-teal-50 max-w-2xl mx-auto leading-relaxed">
                            Questions about our programs or interested in collaborating? We'd love to hear from you.
                        </p>
                    </div>
                </section>

                <section className="py-24">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
                            {/* Contact Form Container */}
                            <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-8 md:p-14 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150"></div>

                                <div className="relative z-10">
                                    <div className="mb-10">
                                        <h2 className="text-3xl font-extrabold text-slate-900 mb-3 flex items-center gap-3">
                                            <span className="bg-teal-600 p-2 rounded-lg text-white">
                                                <MessageSquare className="h-6 w-6" />
                                            </span>
                                            Send us a Message
                                        </h2>
                                        <p className="text-slate-600 text-lg">Our team typically responds within 24 hours during business days.</p>
                                    </div>

                                    <form className="space-y-8">
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-sm font-bold text-slate-800 uppercase tracking-wider">Full Name</label>
                                                <Input placeholder="John Doe" className="h-14 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-teal-600 focus-visible:bg-white transition-all shadow-sm" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-sm font-bold text-slate-800 uppercase tracking-wider">Email Address</label>
                                                <Input type="email" placeholder="john@example.com" className="h-14 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-teal-600 focus-visible:bg-white transition-all shadow-sm" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-sm font-bold text-slate-800 uppercase tracking-wider">Subject</label>
                                            <Input placeholder="Mentorship Inquiry / Partnership" className="h-14 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-teal-600 focus-visible:bg-white transition-all shadow-sm" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-sm font-bold text-slate-800 uppercase tracking-wider">Your Message</label>
                                            <Textarea placeholder="Tell us how we can help you..." className="min-h-[180px] bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-teal-600 focus-visible:bg-white transition-all shadow-sm resize-none" />
                                        </div>
                                        <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white h-16 rounded-xl text-lg font-bold shadow-lg shadow-teal-600/20 transition-all hover:-translate-y-1 active:translate-y-0">
                                            Send Message
                                            <Send className="ml-2 h-5 w-5" />
                                        </Button>
                                    </form>
                                </div>
                            </div>

                            {/* Contact Info & Aesthetics */}
                            <div className="flex flex-col justify-center py-8">
                                <div className="space-y-14">
                                    <div>
                                        <div className="inline-block px-4 py-1.5 rounded-full bg-teal-50 text-teal-600 font-bold text-sm tracking-widest uppercase mb-4 shadow-sm border border-teal-100">
                                            Let's Connect
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-[1.1]">
                                            Ready to make an <span className="text-teal-600">impact</span> together?
                                        </h2>
                                        <p className="text-xl text-slate-600 leading-relaxed mb-6">
                                            Whether you're a student looking for guidance, a professional interested in mentoring, or an organization seeking partnership, we're here to bridge the gap.
                                        </p>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-10">
                                        <div className="group cursor-default">
                                            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 mb-4 transition-all group-hover:bg-teal-600 group-hover:text-white group-hover:rotate-6">
                                                <Mail className="h-7 w-7" />
                                            </div>
                                            <h4 className="font-extrabold text-slate-900 text-xl mb-1">Email Us</h4>
                                            <p className="text-slate-600 font-medium">info@gideondunioh.org</p>
                                        </div>

                                        <div className="group cursor-default">
                                            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 mb-4 transition-all group-hover:bg-teal-600 group-hover:text-white group-hover:rotate-6">
                                                <Phone className="h-7 w-7" />
                                            </div>
                                            <h4 className="font-extrabold text-slate-900 text-xl mb-1">Call / WhatsApp</h4>
                                            <p className="text-slate-600 font-medium">+234 800 000 0000</p>
                                        </div>

                                        <div className="group cursor-default">
                                            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 mb-4 transition-all group-hover:bg-teal-600 group-hover:text-white group-hover:rotate-6">
                                                <MapPin className="h-7 w-7" />
                                            </div>
                                            <h4 className="font-extrabold text-slate-900 text-xl mb-1">Our Location</h4>
                                            <p className="text-slate-600 font-medium">Victoria Island, Lagos, Nigeria</p>
                                        </div>

                                        <div className="group cursor-default">
                                            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 mb-4 transition-all group-hover:bg-teal-600 group-hover:text-white group-hover:rotate-6">
                                                <Globe className="h-7 w-7" />
                                            </div>
                                            <h4 className="font-extrabold text-slate-900 text-xl mb-1">Business Hours</h4>
                                            <p className="text-slate-600 font-medium">Mon - Fri, 9am - 5pm WAT</p>
                                        </div>
                                    </div>

                                    {/* Map Integration */}
                                    <div className="mt-12 rounded-[2rem] overflow-hidden h-72 bg-slate-100 relative group shadow-2xl shadow-slate-200">
                                        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
                                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                            <div className="bg-white/95 backdrop-blur-md px-8 py-4 rounded-2xl shadow-2xl border border-teal-100 flex items-center gap-3 transition-transform duration-500 group-hover:scale-110">
                                                <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center">
                                                    <MapPin className="h-5 w-5 text-white animate-bounce" />
                                                </div>
                                                <span className="font-bold text-slate-900 text-lg">Visit Us in Lagos</span>
                                            </div>
                                        </div>
                                        <img
                                            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1200"
                                            alt="Lagos Nigeria"
                                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
