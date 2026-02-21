"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
    id: string;
    name: string;
    location: string | null;
    quote: string;
    imageUrl: string | null;
}

interface SuccessStoriesProps {
    testimonials?: Testimonial[];
}

export function SuccessStories({ testimonials = [] }: SuccessStoriesProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (testimonials.length === 0) return null;

    const current = testimonials[currentIndex];

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-dark-teal mb-4">
                        Success Stories
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Hear from the young leaders we've empowered
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-teal-50 to-slate-50 rounded-2xl p-12 relative">
                        <Quote className="h-16 w-16 text-teal-200 absolute top-8 left-8" />

                        <div className="relative z-10">
                            <p className="text-2xl text-slate-700 italic mb-8 leading-relaxed">
                                "{current.quote}"
                            </p>

                            <div className="flex items-center gap-4">
                                {current.imageUrl && (
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-teal-200 shadow-sm flex-shrink-0">
                                        <img
                                            src={current.imageUrl}
                                            alt={current.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <div>
                                    <div className="font-bold text-slate-900 text-lg">
                                        {current.name}
                                    </div>
                                    {current.location && (
                                        <div className="text-slate-600">{current.location}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {testimonials.length > 1 && (
                            <div className="flex items-center justify-center gap-4 mt-8">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={prev}
                                    className="rounded-full"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>
                                <div className="flex gap-2">
                                    {testimonials.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentIndex(index)}
                                            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-teal-600" : "bg-slate-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={next}
                                    className="rounded-full"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
