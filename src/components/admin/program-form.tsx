"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Editor } from "@/components/ui/editor";
import { toast } from "sonner";
import { createProgram, updateProgram } from "@/app/admin/programs/program-actions";

interface ProgramFormProps {
    program?: {
        id: string;
        name: string;
        slug: string;
        description: string;
        longDescription?: string | null;
        impact: string;
        imageUrl?: string | null;
        active: boolean;
        order: number;
    };
}

export function ProgramForm({ program }: ProgramFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [longDescription, setLongDescription] = useState(program?.longDescription || "");
    const [active, setActive] = useState(program?.active ?? true);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            slug: formData.get("slug") as string,
            description: formData.get("description") as string,
            impact: formData.get("impact") as string,
            imageUrl: formData.get("imageUrl") as string,
            active: active,
            order: Number(formData.get("order")),
            longDescription,
        };

        try {
            const result = program
                ? await updateProgram(program.id, data)
                : await createProgram(data);

            if (result.success) {
                toast.success(program ? "Program updated" : "Program created");
                router.push("/admin/programs");
                router.refresh();
            } else {
                toast.error(result.error || "Failed to save program");
            }
        } catch (error) {
            toast.error("An error occurred while saving");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-xl border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Program Name</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={program?.name}
                            required
                            placeholder="e.g. Leadership Training"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug (URL identifier)</Label>
                        <Input
                            id="slug"
                            name="slug"
                            defaultValue={program?.slug}
                            required
                            placeholder="e.g. leadership-training"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="impact">Impact Summary</Label>
                        <Input
                            id="impact"
                            name="impact"
                            defaultValue={program?.impact}
                            required
                            placeholder="e.g. 500+ students reached"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input
                            id="imageUrl"
                            name="imageUrl"
                            defaultValue={program?.imageUrl || ""}
                            placeholder="/uploads/programs/example.png"
                        />
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="space-y-2">
                            <Label htmlFor="order">Display Order</Label>
                            <Input
                                id="order"
                                name="order"
                                type="number"
                                defaultValue={program?.order || 0}
                                required
                                className="w-24"
                            />
                        </div>
                        <div className="flex items-center gap-2 pt-8">
                            <Switch
                                id="active"
                                checked={active}
                                onCheckedChange={setActive}
                            />
                            <Label htmlFor="active">Active (Visible on website)</Label>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="description">Short Description (Cards)</Label>
                        <Textarea
                            id="description"
                            name="description"
                            defaultValue={program?.description}
                            required
                            rows={4}
                            placeholder="A brief summary for the preview card..."
                            className="resize-none"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label>Detailed Content (Rich Text)</Label>
                <div className="min-h-[400px]">
                    <Editor content={longDescription} onChange={setLongDescription} />
                </div>
            </div>

            <div className="flex justify-end gap-4 border-t pt-6">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/programs")}
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={loading}>
                    {loading ? "Saving..." : program ? "Update Program" : "Create Program"}
                </Button>
            </div>
        </form>
    );
}
