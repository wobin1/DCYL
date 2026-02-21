import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Program {
    id: string;
    name: string;
    slug: string;
    description: string;
    impact: string;
    imageUrl: string | null;
}

interface ProgramsProps {
    programs?: Program[];
}

export function ProgramsOverview({ programs = [] }: ProgramsProps) {
    return (
        <section className="py-20 bg-slate-50" id="programs">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-dark-teal mb-4">
                        Our Programs
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Comprehensive initiatives designed to empower Nigerian youth through education, mentorship, and community engagement.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {programs.map((program) => (
                        <div
                            key={program.id}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
                        >
                            {program.imageUrl && (
                                <div className="h-48 relative">
                                    <img
                                        src={program.imageUrl}
                                        alt={program.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>
                            )}
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                                    {program.name}
                                </h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    {program.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="text-sm font-semibold text-teal-600">
                                        {program.impact}
                                    </div>
                                    <Link href={`/programs/${program.slug}`}>
                                        <Button variant="ghost" className="gap-2">
                                            Learn More
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
