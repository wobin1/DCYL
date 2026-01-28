import Link from "next/link";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-slate-50">
            <div className="container mx-auto px-4 py-12 md:px-8">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold tracking-tighter text-teal-600">
                                Gideon <span className="text-dark-teal">Dunioh</span>
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Equipping leaders to bridge generational, cultural, and ideological divides through empathy, dialogue, and actionable frameworks.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-teal-600">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-teal-600">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-teal-600">
                                <Twitter className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Quick Links</h3>
                        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <li><Link href="/#about" className="hover:text-teal-600 transition-colors">About the Event</Link></li>
                            <li><Link href="/#rules" className="hover:text-teal-600 transition-colors">Rules & Guidelines</Link></li>
                            <li><Link href="/#timeline" className="hover:text-teal-600 transition-colors">Event Schedule</Link></li>
                            <li><Link href="/submit" className="hover:text-teal-600 transition-colors">Submit Essay</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Contact</h3>
                        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <li>info@gideondunioh.org</li>
                            <li>essays@gideondunioh.org</li>
                            <li>+234 XXX XXX XXXX</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Stay Connected</h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                            Get leadership insights and competition updates delivered to your inbox.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Gideon Dunioh. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
