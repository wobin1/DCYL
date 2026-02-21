"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Briefcase,
    UserCircle,
    FileText,
    Shield,
    Settings,
    Heart,
    Award,
    BookOpen,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
    label: string;
    href: string;
    icon: any;
}

const navItems: NavItem[] = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Site Settings", href: "/admin/site-settings", icon: Settings },
    { label: "Programs", href: "/admin/programs", icon: Briefcase },
    { label: "Team Members", href: "/admin/team", icon: UserCircle },
    { label: "Submissions", href: "/admin", icon: FileText },
    { label: "Admin Users", href: "/admin/users", icon: Shield },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 bg-white border-r border-slate-200 h-screen overflow-y-auto">
            <div className="p-4 border-b border-slate-200">
                <h2 className="text-lg font-bold text-dark-teal">Admin CMS</h2>
                <p className="text-xs text-slate-500 mt-1">Content Management</p>
            </div>
            <nav className="p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = item.href === pathname;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors",
                                isActive
                                    ? "bg-teal-50 text-teal-700 font-medium"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
