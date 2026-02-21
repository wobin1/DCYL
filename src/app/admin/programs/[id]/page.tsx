import { AdminLayout } from "@/components/admin/admin-layout";
import { isAuthenticated } from "@/app/actions";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProgramForm } from "@/components/admin/program-form";

interface EditProgramPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditProgramPage({ params }: EditProgramPageProps) {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        redirect("/admin/login");
    }

    const { id } = await params;

    const program = await prisma.program.findUnique({
        where: { id },
    });

    if (!program) {
        notFound();
    }

    return (
        <AdminLayout>
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-900">Edit Program</h2>
                    <p className="text-slate-600 mt-1">
                        Update the details and content for "{program.name}"
                    </p>
                </div>
                <ProgramForm program={program} />
            </div>
        </AdminLayout>
    );
}
