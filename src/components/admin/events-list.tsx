"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Calendar, MapPin } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface Event {
    id: string;
    title: string;
    description: string;
    date: Date;
    endDate: Date | null;
    location: string | null;
    active: boolean;
}

export function EventsList({ events: initial }: { events: Event[] }) {
    const [events, setEvents] = useState(initial);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this event?")) return;

        try {
            const response = await fetch(`/api/admin/events/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setEvents(events.filter((e) => e.id !== id));
                toast.success("Event deleted successfully");
            } else {
                toast.error("Failed to delete event");
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    return (
        <div className="space-y-4">
            {events.map((event) => (
                <Card key={event.id}>
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-semibold text-slate-900">
                                        {event.title}
                                    </h3>
                                    <Badge variant={event.active ? "default" : "secondary"}>
                                        {event.active ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                                <p className="text-slate-600 mb-3">{event.description}</p>
                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>{format(new Date(event.date), "MMM d, yyyy")}</span>
                                    </div>
                                    {event.location && (
                                        <>
                                            <span>•</span>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                <span>{event.location}</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                                <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(event.id)}
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
