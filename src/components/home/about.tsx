import { CheckCircle2 } from "lucide-react";

export function About() {
    const highlights = [
        "National President, Veritas University Alumni",
        "YALI Network Alumnus",
        "UNDP Youth Engagement Leader",
    ];

    return (
        <section className="py-20 bg-white" id="about">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="flex flex-col gap-6">
                        <h2 className="text-3xl font-extrabold text-dark-teal border-l-4 border-orange-500 pl-6">
                            About Gideon Dunioh
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            A millennial leader navigating the space between Gen Z urgency and older wisdom. As National President of Veritas University Alumni Association, YALI alumnus, and UNDP youth engagement leader, Gideon has unique positioning as a "translator" between generations.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed font-medium">
                            The Gideon Dunioh Leadership & Impact Initiative scales this work from personal practice to institutional impact, creating frameworks and platforms for authentic intergenerational dialogue.
                        </p>
                        <ul className="grid gap-3 pt-2">
                            {highlights.map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                    <CheckCircle2 className="h-5 w-5 text-teal-600" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm self-start">
                        <h3 className="text-xl font-bold text-teal-700 mb-6 uppercase tracking-wider">Our Mission</h3>
                        <p className="text-slate-600 mb-8 italic">
                            "Equipping leaders to bridge generational, cultural, and ideological divides through empathy, dialogue, and actionable frameworks."
                        </p>
                        <h3 className="text-xl font-bold text-teal-700 mb-6 uppercase tracking-wider">Our Values</h3>
                        <ul className="grid gap-4 text-sm font-medium text-slate-700">
                            <li className="flex justify-between border-b pb-2"><span>Empathy as Strategy</span></li>
                            <li className="flex justify-between border-b pb-2"><span>Translation Over Domination</span></li>
                            <li className="flex justify-between border-b pb-2"><span>Listening as Leadership</span></li>
                            <li className="flex justify-between border-b pb-2"><span>Inclusive Innovation</span></li>
                            <li className="flex justify-between"><span>Action Over Ideology</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
