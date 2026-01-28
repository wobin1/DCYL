"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-8">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold tracking-tighter text-teal-600">
                            Gideon <span className="text-dark-teal">Dunioh</span>
                        </span>
                        <span className="hidden sm:inline-block h-6 w-[1px] bg-border mx-2" />
                        <span className="hidden sm:inline-block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                            Leadership & Impact
                        </span>
                    </Link>
                </div>
                <nav className="flex items-center gap-4 text-sm font-medium">
                    <Link href="/#about" className="transition-colors hover:text-teal-600">
                        About
                    </Link>
                    <Link href="/#initiatives" className="transition-colors hover:text-teal-600">
                        Initiatives
                    </Link>
                    <Link href="/#podcast" className="transition-colors hover:text-teal-600">
                        Podcast
                    </Link>
                    <Link href="/#contact" className="transition-colors hover:text-teal-600">
                        Contact
                    </Link>
                    <div className="h-6 w-[1px] bg-border mx-2 hidden md:block" />
                    <Link href="/admin/login" className="text-sm font-medium text-muted-foreground hover:text-teal-600 transition-colors">
                        Admin Login
                    </Link>
                    <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6">
                        <Link href="/submit">Apply Now</Link>
                    </Button>
                </nav>
            </div>
        </header>
    );
}
