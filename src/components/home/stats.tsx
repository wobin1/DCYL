export function Stats() {
    const stats = [
        { value: "200+", label: "Students Engaged" },
        { value: "50+", label: "Schools Reached" },
        { value: "8", label: "Podcast Episodes" },
        { value: "3", label: "Major Initiatives" },
    ];

    return (
        <div className="bg-teal-600 py-10">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center text-white">
                            <div className="text-3xl sm:text-4xl font-extrabold mb-1">{stat.value}</div>
                            <div className="text-xs sm:text-sm font-medium uppercase tracking-widest opacity-80">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
