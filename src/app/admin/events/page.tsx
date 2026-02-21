import { AdminLayout } from "@/components/admin/admin-layout";
import { isAuthenticated } from "@/app/actions";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { EventsList } from "@/components/admin/events-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        redirect("/admin/login");
    }

    const events = await prisma.event.findMany({
        orderBy: { date: "asc" },
    });

    return (
        <AdminLayout>
            <div>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900">Events</h2>
                        <p className="text-slate-600 mt-1">
                            Manage upcoming events and activities
                        </p>
                    </div>
                    <Button className="bg-teal-600 hover:bg-teal-700 gap-2">
                        <Plus className="h-4 w-4" />
                        Add Event
                    </Button>
                </div>
                <EventsList events={events} />
            </div>
        </AdminLayout>
    );
}
