import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, Download, Search, Settings, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { isAuthenticated, logout } from "@/app/actions";
import { redirect } from "next/navigation";

import { UserManagement } from "@/components/admin/user-management";

export default async function AdminPage() {
    const auth = await isAuthenticated();
    if (!auth) {
        redirect("/admin/login");
    }

    const [submissions, users] = await Promise.all([
        prisma.submission.findMany({ orderBy: { createdAt: "desc" } }),
        prisma.user.findMany({ select: { id: true, username: true } })
    ]);

    const handleLogout = async () => {
        "use server";
        await logout();
        redirect("/admin/login");
    };

    const competitionOpen = true; // This would come from DB in a real scenario

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-12 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-dark-teal tracking-tight">Admin Dashboard</h1>
                        <p className="text-slate-600">Manage entries and platform users.</p>
                    </div>
                    <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm border">
                        <div className="flex items-center space-x-2">
                            <Switch id="competition-mode" checked={competitionOpen} />
                            <Label htmlFor="competition-mode" className="font-bold text-dark-teal">
                                Competition: {competitionOpen ? "OPEN" : "CLOSED"}
                            </Label>
                        </div>
                        <div className="h-6 w-[1px] bg-slate-200" />
                        <Button variant="outline" size="sm" className="gap-2">
                            <Download className="h-4 w-4" /> Export All
                        </Button>
                        <form action={handleLogout}>
                            <Button type="submit" variant="ghost" size="sm" className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10">
                                <LogOut className="h-4 w-4" /> Logout
                            </Button>
                        </form>
                    </div>
                </div>

                <Tabs defaultValue="submissions" className="space-y-6">
                    <TabsList className="bg-white p-1 border shadow-sm rounded-full h-12">
                        <TabsTrigger value="submissions" className="gap-2 rounded-full px-6">
                            <Eye className="h-4 w-4" /> Submissions
                        </TabsTrigger>
                        <TabsTrigger value="users" className="gap-2 rounded-full px-6">
                            <Settings className="h-4 w-4" /> Admin Users
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="gap-2 rounded-full px-6">
                            <Settings className="h-4 w-4" /> Competition Rules
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="submissions">
                        <Card className="border-0 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                                <div>
                                    <CardTitle>Total Entries: {submissions.length}</CardTitle>
                                    <CardDescription>Review and manage student essay submissions.</CardDescription>
                                </div>
                                <div className="relative w-full max-w-sm">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <Input placeholder="Search students or schools..." className="pl-10" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Student Name</TableHead>
                                            <TableHead>School & Grade</TableHead>
                                            <TableHead>Essay Title</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Applied Date</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {submissions.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="h-48 text-center text-slate-500">
                                                    No submissions found yet.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            submissions.map((sub: any) => (
                                                <TableRow key={sub.id}>
                                                    <TableCell className="font-semibold">{sub.fullName}</TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">{sub.schoolName}</div>
                                                        <div className="text-xs text-slate-400 uppercase">{sub.gradeLevel}</div>
                                                    </TableCell>
                                                    <TableCell className="max-w-[200px] truncate">{sub.essayTitle}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={sub.status === "PENDING" ? "outline" : "default"} className="rounded-full">
                                                            {sub.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-sm text-slate-500">
                                                        {new Date(sub.createdAt).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="sm">View</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="users">
                        <UserManagement users={users} />
                    </TabsContent>

                    <TabsContent value="settings">
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card className="border-0 shadow-sm">
                                <CardHeader>
                                    <CardTitle>Deadline & Schedule</CardTitle>
                                    <CardDescription>Update important dates for the competition.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Submission Deadline</Label>
                                        <Input type="date" defaultValue="2026-02-28" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Judging Ends</Label>
                                        <Input type="date" defaultValue="2026-03-15" />
                                    </div>
                                    <Button className="w-full bg-teal-600">Save Changes</Button>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-sm">
                                <CardHeader>
                                    <CardTitle>Competition Parameters</CardTitle>
                                    <CardDescription>Set word counts and requirements.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Min Word Count</Label>
                                            <Input type="number" defaultValue="500" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Max Word Count</Label>
                                            <Input type="number" defaultValue="1000" />
                                        </div>
                                    </div>
                                    <Button className="w-full bg-teal-600">Save Changes</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
            <Footer />
        </div>
    );
}
