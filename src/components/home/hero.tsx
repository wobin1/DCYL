import { Button } from "@/components/ui/button";
import { Mic, Play } from "lucide-react";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-dark-teal py-20 lg:py-32">
            <div className="container mx-auto grid gap-12 px-4 md:px-8 lg:grid-cols-2 lg:items-center">
                <div className="flex flex-col gap-6 text-white">
                    <div className="inline-flex items-center rounded-full bg-teal-600/20 px-3 py-1 text-sm font-medium text-teal-400 ring-1 ring-inset ring-teal-600/30">
                        Bridging Leadership Gaps
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                        Bridging Generations, <br />
                        <span className="text-teal-400 text-balance">Building Understanding</span>
                    </h1>
                    <p className="max-w-[600px] text-lg text-slate-300">
                        Equipping leaders to bridge generational, cultural, and ideological divides through empathy, dialogue, and actionable frameworks.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8">
                            <Link href="/submit">Join Essay Competition</Link>
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full border-teal-600/30 bg-white/5 text-white hover:bg-white/10 px-8">
                            <Play className="mr-2 h-4 w-4" /> Listen to Podcast
                        </Button>
                    </div>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-white/5 lg:aspect-square">
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-teal-600/20 to-dark-teal p-8 text-center ring-1 ring-inset ring-white/10">
                        <div className="mb-6 rounded-full bg-white/10 p-6 backdrop-blur-sm">
                            <Mic className="h-12 w-12 text-teal-400" />
                        </div>
                        <h2 className="mb-2 text-3xl font-bold text-white uppercase tracking-tighter">Talk Across Time</h2>
                        <p className="text-sm font-medium text-teal-400">Leadership Dialogue Across Generations</p>
                        <Button className="mt-8 bg-white text-dark-teal hover:bg-slate-200 rounded-lg px-6 font-semibold shadow-lg transition-all hover:scale-105">
                            Listen Now
                        </Button>
                    </div>
                </div>
            </div>
            {/* Decorative background elements */}
            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-teal-600/10 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        </section>
    );
}
