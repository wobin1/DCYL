import { Shield, Award, Users, Lightbulb } from "lucide-react";

interface Value {
    id: string;
    title: string;
    description: string;
    icon: string;
}

interface ValuesProps {
    vision?: string;
    values?: Value[];
}

const iconMap: Record<string, any> = {
    Shield,
    Award,
    Users,
    Lightbulb,
};

export function ValuesSection({ vision, values = [] }: ValuesProps) {
    return (
        <section className="py-20 bg-white" id="values">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-dark-teal mb-6">
                        Our Vision & Values
                    </h2>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        {vision || "A Nigeria where every young person has the opportunity to reach their full potential and contribute meaningfully to society."}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value) => {
                        const Icon = iconMap[value.icon] || Shield;
                        return (
                            <div
                                key={value.id}
                                className="bg-slate-50 p-8 rounded-xl hover:shadow-lg transition-shadow"
                            >
                                <div className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                                    <Icon className="h-7 w-7 text-teal-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
