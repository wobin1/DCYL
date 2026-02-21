import Image from "next/image";

interface TeamMember {
    id: string;
    name: string;
    title: string;
    bio: string;
    imageUrl: string | null;
}

interface TeamSectionProps {
    teamMembers?: TeamMember[];
}

export function TeamSection({ teamMembers = [] }: TeamSectionProps) {
    return (
        <section className="py-20 bg-white" id="team">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-dark-teal mb-4">
                        Meet Our Team
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Dedicated professionals committed to empowering Nigerian youth
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member) => (
                        <div
                            key={member.id}
                            className="bg-slate-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            {member.imageUrl ? (
                                <div className="h-64 bg-gradient-to-br from-teal-400 to-teal-600 relative">
                                    <Image
                                        src={member.imageUrl}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="h-64 bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                                    <span className="text-6xl font-bold text-white">
                                        {member.name.charAt(0)}
                                    </span>
                                </div>
                            )}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-1">
                                    {member.name}
                                </h3>
                                <p className="text-teal-600 font-semibold mb-3">
                                    {member.title}
                                </p>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {member.bio}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
