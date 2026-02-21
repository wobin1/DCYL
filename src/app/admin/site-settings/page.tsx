import { AdminLayout } from "@/components/admin/admin-layout";
import { isAuthenticated } from "@/app/actions";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SiteSettingsForm } from "@/components/admin/site-settings-form";

export const dynamic = "force-dynamic";

export default async function SiteSettingsPage() {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        redirect("/admin/login");
    }

    const settings = await prisma.siteSettings.findFirst();

    return (
        <AdminLayout>
            <div className="max-w-4xl">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-slate-900">Site Settings</h2>
                    <p className="text-slate-600 mt-1">
                        Manage your organization's core identity and contact information
                    </p>
                </div>
                <SiteSettingsForm settings={settings} />
            </div>
        </AdminLayout>
    );
}
