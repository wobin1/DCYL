"use client";

import { useState } from "react";
import { createAdminUser, deleteAdminUser } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Trash2, UserPlus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function UserManagement({ users }: { users: any[] }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleCreateUser(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        const res = await createAdminUser({ username, password });
        if (res.success) {
            toast.success("Admin user created successfully");
            setIsDialogOpen(false);
            setUsername("");
            setPassword("");
        } else {
            toast.error(res.error || "Failed to create user");
        }
        setIsLoading(false);
    }

    async function handleDeleteUser(id: string) {
        if (!confirm("Are you sure you want to delete this user?")) return;

        const res = await deleteAdminUser(id);
        if (res.success) {
            toast.success("User deleted");
        } else {
            toast.error(res.error || "Failed to delete user");
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-dark-teal">Admin Personnel</h2>
                    <p className="text-slate-600 font-sm">Manage users who can access this dashboard.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-teal-600 hover:bg-teal-700 gap-2 rounded-full">
                            <UserPlus className="h-4 w-4" /> Add Admin
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={handleCreateUser}>
                            <DialogHeader>
                                <DialogTitle>Add Admin User</DialogTitle>
                                <DialogDescription>
                                    Create new credentials for dashboard access.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="new-username">Username</Label>
                                    <Input
                                        id="new-username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="e.g. gideon_admin"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="new-password">Password</Label>
                                    <Input
                                        id="new-password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={isLoading} className="bg-teal-600">
                                    {isLoading ? "Creating..." : "Create User"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="border-0 shadow-sm">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Username</TableHead>
                                <TableHead>User ID</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.username}</TableCell>
                                    <TableCell className="text-xs text-slate-400 font-mono">{user.id}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                            onClick={() => handleDeleteUser(user.id)}
                                            disabled={users.length <= 1} // Prevent deleting the last user
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            {users.length <= 1 && (
                <p className="text-xs text-slate-400 italic">
                    Tip: You must have at least one admin user. You cannot delete the last account.
                </p>
            )}
        </div>
    );
}
