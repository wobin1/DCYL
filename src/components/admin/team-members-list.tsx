"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface TeamMember {
    id: string;
    name: string;
    title: string;
    bio: string;
    imageUrl: string | null;
    email: string | null;
    linkedIn: string | null;
    order: number;
}

export function TeamMembersList({ teamMembers: initial }: { teamMembers: TeamMember[] }) {
    const [teamMembers, setTeamMembers] = useState(initial);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this team member?")) return;

        try {
            const response = await fetch(`/api/admin/team/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setTeamMembers(teamMembers.filter((m) => m.id !== id));
                toast.success("Team member deleted successfully");
            } else {
                toast.error("Failed to delete team member");
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
                <Card key={member.id}>
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                            {member.imageUrl ? (
                                <div className="w-24 h-24 rounded-full bg-slate-200 mb-4 overflow-hidden">
                                    <Image
                                        src={member.imageUrl}
                                        alt={member.name}
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-slate-200 mb-4 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-slate-400">
                                        {member.name.charAt(0)}
                                    </span>
                                </div>
                            )}
                            <h3 className="text-lg font-semibold text-slate-900 mb-1">
                                {member.name}
                            </h3>
                            <p className="text-sm text-teal-600 font-medium mb-3">
                                {member.title}
                            </p>
                            <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                                {member.bio}
                            </p>
                            <div className="flex items-center gap-2 w-full">
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => handleDelete(member.id)}
                                >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
