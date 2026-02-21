"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface Program {
    id: string;
    name: string;
    slug: string;
    description: string;
    impact: string;
    active: boolean;
    order: number;
    _count: {
        testimonials: number;
    };
}

export function ProgramsList({ programs: initialPrograms }: { programs: Program[] }) {
    const [programs, setPrograms] = useState(initialPrograms);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this program?")) return;

        try {
            const response = await fetch(`/api/admin/programs/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setPrograms(programs.filter((p) => p.id !== id));
                toast.success("Program deleted successfully");
            } else {
                toast.error("Failed to delete program");
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    const handleToggleActive = async (id: string, active: boolean) => {
        try {
            const response = await fetch(`/api/admin/programs/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ active: !active }),
            });

            if (response.ok) {
                setPrograms(
                    programs.map((p) => (p.id === id ? { ...p, active: !active } : p))
                );
                toast.success(`Program ${!active ? "activated" : "deactivated"}`);
            } else {
                toast.error("Failed to update program");
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    return (
        <div className="space-y-4">
            {programs.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <p className="text-slate-500">No programs yet. Create your first one!</p>
                    </CardContent>
                </Card>
            ) : (
                programs.map((program) => (
                    <Card key={program.id}>
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-semibold text-slate-900">
                                            {program.name}
                                        </h3>
                                        <Badge variant={program.active ? "default" : "secondary"}>
                                            {program.active ? "Active" : "Inactive"}
                                        </Badge>
                                    </div>
                                    <p className="text-slate-600 mb-2">{program.description}</p>
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <span>Impact: {program.impact}</span>
                                        <span>•</span>
                                        <span>{program._count.testimonials} testimonials</span>
                                        <span>•</span>
                                        <span>Order: {program.order}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleToggleActive(program.id, program.active)}
                                    >
                                        {program.active ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                    <Link href={`/admin/programs/${program.id}`}>
                                        <Button variant="ghost" size="sm">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDelete(program.id)}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
}
