import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

interface ProgramPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ProgramDetailPage({ params }: ProgramPageProps) {
    const { slug } = await params;

    const program = await prisma.program.findUnique({
        where: { slug, active: true },
    });

    if (!program) {
        notFound();
    }

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />
            <main className="flex-1">
                {/* Hero Section */}
                <div className="bg-slate-900 text-white py-24">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                                {program.name}
                            </h1>
                            <p className="text-xl text-slate-300 leading-relaxed mb-8">
                                {program.description}
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="px-4 py-2 bg-teal-600/20 border border-teal-500/30 rounded-full text-teal-400 font-semibold">
                                    {program.impact}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                {program.imageUrl && (
                                    <div className="mb-12 rounded-2xl overflow-hidden shadow-lg aspect-video">
                                        <img
                                            src={program.imageUrl}
                                            alt={program.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <div className="prose prose-lg max-w-none prose-slate prose-teal">
                                    {program.longDescription ? (
                                        <div dangerouslySetInnerHTML={{ __html: program.longDescription }} />
                                    ) : (
                                        <p>{program.description}</p>
                                    )}
                                </div>
                            </div>

                            {/* Sidebar CTA */}
                            <div className="lg:col-span-1">
                                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 sticky top-24">
                                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                                        Interested in this program?
                                    </h3>
                                    <p className="text-slate-600 mb-6">
                                        Learn more about how you can participate, volunteer, or support our efforts in this area.
                                    </p>
                                    <div className="space-y-4">
                                        <a
                                            href="/contact"
                                            className="block text-center w-full py-3 px-6 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-colors"
                                        >
                                            Contact Us
                                        </a>
                                        <a
                                            href="/#programs"
                                            className="block text-center w-full py-3 px-6 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-lg border border-slate-300 transition-colors"
                                        >
                                            View Other Programs
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
