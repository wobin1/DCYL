import Image from "next/image";

interface FoundersMessageProps {
    founderName?: string;
    founderTitle?: string;
    founderMessage?: string;
    founderImageUrl?: string | null;
}

export function FoundersMessage({
    founderName = "Gideon Dunioh",
    founderTitle = "Founder & Executive Director",
    founderMessage = "",
    founderImageUrl,
}: FoundersMessageProps) {
    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 to-teal-50">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-dark-teal mb-4">
                            A Message from Our Founder
                        </h2>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="grid md:grid-cols-5 gap-8">
                            <div className="md:col-span-2 bg-gradient-to-br from-teal-600 to-dark-teal p-8 flex items-center justify-center">
                                {founderImageUrl ? (
                                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white">
                                        <Image
                                            src={founderImageUrl}
                                            alt={founderName}
                                            width={192}
                                            height={192}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-48 h-48 rounded-full bg-white/20 flex items-center justify-center border-4 border-white">
                                        <span className="text-6xl font-bold text-white">
                                            {founderName.charAt(0)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="md:col-span-3 p-8 md:p-12">
                                <p className="text-lg text-slate-700 leading-relaxed mb-6 italic">
                                    {founderMessage}
                                </p>
                                <div className="border-t border-slate-200 pt-6">
                                    <div className="font-bold text-xl text-slate-900">
                                        {founderName}
                                    </div>
                                    <div className="text-teal-600 font-medium">
                                        {founderTitle}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
