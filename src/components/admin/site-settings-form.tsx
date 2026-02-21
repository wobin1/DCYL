"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface SiteSettings {
    id: string;
    mission: string;
    vision: string;
    foundingStory: string;
    founderName: string;
    founderTitle: string;
    founderMessage: string;
    founderImageUrl: string | null;
    contactEmail: string;
    contactPhone: string;
}

export function SiteSettingsForm({ settings }: { settings: SiteSettings | null }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        mission: settings?.mission || "",
        vision: settings?.vision || "",
        foundingStory: settings?.foundingStory || "",
        founderName: settings?.founderName || "",
        founderTitle: settings?.founderTitle || "",
        founderMessage: settings?.founderMessage || "",
        founderImageUrl: settings?.founderImageUrl || "",
        contactEmail: settings?.contactEmail || "",
        contactPhone: settings?.contactPhone || "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/admin/site-settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success("Settings updated successfully");
            } else {
                toast.error("Failed to update settings");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Mission & Vision</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="mission">Mission Statement</Label>
                        <Textarea
                            id="mission"
                            value={formData.mission}
                            onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                            rows={3}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="vision">Vision Statement</Label>
                        <Textarea
                            id="vision"
                            value={formData.vision}
                            onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                            rows={3}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="foundingStory">Founding Story</Label>
                        <Textarea
                            id="foundingStory"
                            value={formData.foundingStory}
                            onChange={(e) => setFormData({ ...formData, foundingStory: e.target.value })}
                            rows={5}
                            required
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Founder Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="founderName">Founder Name</Label>
                            <Input
                                id="founderName"
                                value={formData.founderName}
                                onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="founderTitle">Founder Title</Label>
                            <Input
                                id="founderTitle"
                                value={formData.founderTitle}
                                onChange={(e) => setFormData({ ...formData, founderTitle: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="founderMessage">Founder's Message</Label>
                        <Textarea
                            id="founderMessage"
                            value={formData.founderMessage}
                            onChange={(e) => setFormData({ ...formData, founderMessage: e.target.value })}
                            rows={5}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="founderImageUrl">Founder Image URL</Label>
                        <Input
                            id="founderImageUrl"
                            value={formData.founderImageUrl}
                            onChange={(e) => setFormData({ ...formData, founderImageUrl: e.target.value })}
                            placeholder="/uploads/founder/photo.jpg"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="contactEmail">Contact Email</Label>
                            <Input
                                id="contactEmail"
                                type="email"
                                value={formData.contactEmail}
                                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="contactPhone">Contact Phone</Label>
                            <Input
                                id="contactPhone"
                                value={formData.contactPhone}
                                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting} className="bg-teal-600 hover:bg-teal-700">
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Settings
                </Button>
            </div>
        </form>
    );
}
