import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, Trophy, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";

export function CompetitionPreview() {
    return (
        <section className="bg-orange-500 py-16 lg:py-24 text-white overflow-hidden relative" id="rules">
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-12">
                    <Badge className="bg-white text-orange-600 hover:bg-white/90 mb-4 px-4 py-1">NOW OPEN</Badge>
                    <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
                        The Bridge Essay Competition
                    </h2>
                    <p className="text-xl font-medium opacity-90 max-w-2xl mx-auto">
                        Young Voices, Future Leaders <br />
                        <span className="text-sm">SS1-SS3 students across Lagos: Share what leadership means to your generation</span>
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
                    {[
                        {
                            icon: <FileText className="h-8 w-8 text-orange-600" />,
                            title: "Theme",
                            desc: '"The Tolerant Leader: What Leadership Means to My Generation"',
                        },
                        {
                            icon: <Trophy className="h-8 w-8 text-orange-600" />,
                            title: "Prizes",
                            desc: "1st, 2nd, 3rd place winners + Top 20 recognition",
                        },
                        {
                            icon: <Calendar className="h-8 w-8 text-orange-600" />,
                            title: "Deadline",
                            desc: "February 28, 2026",
                        },
                    ].map((item, i) => (
                        <Card key={i} className="flex flex-col items-center p-8 text-center bg-white border-0 shadow-xl transition-transform hover:scale-105">
                            <div className="mb-4 rounded-full bg-orange-100 p-4">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 uppercase mb-2">{item.title}</h3>
                            <p className="text-slate-600 font-medium">{item.desc}</p>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/submit"
                        className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:gap-4 shadow-2xl"
                    >
                        Submit Your Entry <ChevronRight className="h-6 w-6" />
                    </Link>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-orange-400 opacity-20 blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-orange-600 opacity-20 blur-3xl" />
        </section>
    );
}
