"use client";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/actions";
import { LogOut, ChevronLeft } from "lucide-react";
import Link from "next/link";

export function AdminLayout({ children }: { children: React.ReactNode }) {
    const handleLogout = async () => {
        await logout();
        window.location.href = "/admin/login";
    };

    return (
        <div className="flex h-screen bg-slate-50">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild className="gap-1 -ml-2 text-slate-600">
                            <Link href="/admin">
                                <ChevronLeft className="h-4 w-4" />
                                Back to Admin
                            </Link>
                        </Button>
                        <div className="h-6 w-[1px] bg-slate-200" />
                        <h1 className="text-2xl font-bold text-dark-teal">Gideon Dunioh Foundation</h1>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLogout}
                        className="gap-2"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                </header>
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
}
