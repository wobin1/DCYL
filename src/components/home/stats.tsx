import { GraduationCap, Award, MapPin, Users } from "lucide-react";

interface ImpactMetric {
    id: string;
    label: string;
    value: string;
    icon: string;
}

interface StatsProps {
    metrics?: ImpactMetric[];
}

const iconMap: Record<string, any> = {
    GraduationCap,
    Award,
    MapPin,
    Users,
};

export function Stats({ metrics = [] }: StatsProps) {
    return (
        <section className="py-16 bg-gradient-to-r from-teal-600 to-dark-teal">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {metrics.map((metric) => {
                        const Icon = iconMap[metric.icon] || GraduationCap;
                        return (
                            <div key={metric.id} className="text-center text-white">
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                        <Icon className="h-8 w-8" />
                                    </div>
                                </div>
                                <div className="text-4xl md:text-5xl font-extrabold mb-2">
                                    {metric.value}
                                </div>
                                <div className="text-teal-100 text-lg font-medium">
                                    {metric.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
