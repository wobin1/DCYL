import { AdminLayout } from "@/components/admin/admin-layout";
import { isAuthenticated } from "@/app/actions";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Users,
    Briefcase,
    Calendar,
    Award,
    TrendingUp,
    FileText
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        redirect("/admin/login");
    }

    // Fetch stats
    const [
        submissionsCount,
        programsCount,
        eventsCount,
        teamMembersCount,
        partnersCount,
        testimonialsCount,
    ] = await Promise.all([
        prisma.submission.count(),
        prisma.program.count({ where: { active: true } }),
        prisma.event.count({ where: { active: true } }),
        prisma.teamMember.count(),
        prisma.partner.count(),
        prisma.testimonial.count(),
    ]);

    const stats = [
        {
            title: "Essay Submissions",
            value: submissionsCount,
            icon: FileText,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            title: "Active Programs",
            value: programsCount,
            icon: Briefcase,
            color: "text-teal-600",
            bgColor: "bg-teal-50",
        },
        {
            title: "Upcoming Events",
            value: eventsCount,
            icon: Calendar,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
        {
            title: "Team Members",
            value: teamMembersCount,
            icon: Users,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
        },
        {
            title: "Partners",
            value: partnersCount,
            icon: Award,
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
        {
            title: "Success Stories",
            value: testimonialsCount,
            icon: TrendingUp,
            color: "text-pink-600",
            bgColor: "bg-pink-50",
        },
    ];

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
                    <p className="text-slate-600 mt-1">
                        Overview of your NGO website content
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((stat) => (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-slate-600">
                                    {stat.title}
                                </CardTitle>
                                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-slate-900">
                                    {stat.value}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Links</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <a
                                href="/admin/site-settings"
                                className="p-4 border border-slate-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors"
                            >
                                <h3 className="font-semibold text-slate-900">Site Settings</h3>
                                <p className="text-sm text-slate-600 mt-1">
                                    Update mission, vision, and founder message
                                </p>
                            </a>
                            <a
                                href="/admin/programs"
                                className="p-4 border border-slate-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors"
                            >
                                <h3 className="font-semibold text-slate-900">Programs</h3>
                                <p className="text-sm text-slate-600 mt-1">
                                    Manage your organization's programs
                                </p>
                            </a>
                            <a
                                href="/admin/team"
                                className="p-4 border border-slate-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors"
                            >
                                <h3 className="font-semibold text-slate-900">Team Members</h3>
                                <p className="text-sm text-slate-600 mt-1">
                                    Add and manage team member profiles
                                </p>
                            </a>
                            <a
                                href="/admin/events"
                                className="p-4 border border-slate-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors"
                            >
                                <h3 className="font-semibold text-slate-900">Events</h3>
                                <p className="text-sm text-slate-600 mt-1">
                                    Create and manage upcoming events
                                </p>
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
