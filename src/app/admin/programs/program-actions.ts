"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/app/actions";

export async function createProgram(formData: {
    name: string;
    description: string;
    longDescription?: string;
    impact: string;
    slug: string;
    imageUrl?: string;
    active: boolean;
    order: number;
}) {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        throw new Error("Unauthorized");
    }

    try {
        await prisma.program.create({
            data: {
                ...formData,
                order: Number(formData.order) || 0,
            },
        });
        revalidatePath("/admin/programs");
        revalidatePath("/");
        return { success: true };
    } catch (error: any) {
        console.error("Create program error:", error);
        if (error.code === "P2002") {
            return { success: false, error: "A program with this slug already exists." };
        }
        return { success: false, error: "Failed to create program." };
    }
}

export async function updateProgram(id: string, formData: {
    name: string;
    description: string;
    longDescription?: string;
    impact: string;
    slug: string;
    imageUrl?: string;
    active: boolean;
    order: number;
}) {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        throw new Error("Unauthorized");
    }

    try {
        await prisma.program.update({
            where: { id },
            data: {
                ...formData,
                order: Number(formData.order) || 0,
            },
        });
        revalidatePath("/admin/programs");
        revalidatePath(`/programs/${formData.slug}`);
        revalidatePath("/");
        return { success: true };
    } catch (error: any) {
        console.error("Update program error:", error);
        if (error.code === "P2002") {
            return { success: false, error: "A program with this slug already exists." };
        }
        return { success: false, error: "Failed to update program." };
    }
}

export async function deleteProgram(id: string) {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        throw new Error("Unauthorized");
    }

    try {
        const program = await prisma.program.delete({
            where: { id },
        });
        revalidatePath("/admin/programs");
        revalidatePath(`/programs/${program.slug}`);
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Delete program error:", error);
        return { success: false, error: "Failed to delete program." };
    }
}
