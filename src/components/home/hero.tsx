"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroProps {
    mission?: string;
}

export function Hero({ mission }: HeroProps) {
    return (
        <section className="relative overflow-hidden bg-dark-teal text-white py-24 md:py-32">
            <div className="absolute inset-0 z-0">
                <img
                    src="/uploads/hero-bg.png"
                    alt="Nigerian Students"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-teal-600/60 via-teal-700/70 to-dark-teal/90"></div>
            </div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Empowering the Next Generation of Nigerian Leaders
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-teal-50 leading-relaxed">
                        {mission || "Through education, mentorship, and community engagement, we're building a brighter future for Nigeria."}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/submit">
                            <Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50 text-lg px-8 py-6">
                                Join Our Programs
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="#programs">
                            <Button
                                size="lg"
                                className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                            >
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
