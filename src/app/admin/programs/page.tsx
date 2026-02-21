import { AdminLayout } from "@/components/admin/admin-layout";
import { isAuthenticated } from "@/app/actions";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProgramsList } from "@/components/admin/programs-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProgramsPage() {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        redirect("/admin/login");
    }

    const programs = await prisma.program.findMany({
        orderBy: { order: "asc" },
        include: {
            _count: {
                select: { testimonials: true },
            },
        },
    });

    return (
        <AdminLayout>
            <div>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900">Programs</h2>
                        <p className="text-slate-600 mt-1">
                            Manage your organization's programs and initiatives
                        </p>
                    </div>
                    <Link href="/admin/programs/new">
                        <Button className="bg-teal-600 hover:bg-teal-700 gap-2">
                            <Plus className="h-4 w-4" />
                            Add Program
                        </Button>
                    </Link>
                </div>
                <ProgramsList programs={programs} />
            </div>
        </AdminLayout>
    );
}
