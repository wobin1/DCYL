"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "bridge-essay-secret-key-2026"
);

export async function submitEssay(formData: any) {
    try {
        const submission = await prisma.submission.create({
            data: {
                fullName: formData.fullName,
                phoneNumber: formData.phoneNumber,
                schoolName: formData.schoolName,
                gradeLevel: formData.gradeLevel,
                essayTitle: formData.essayTitle,
                content: formData.content || null,
                status: "PENDING",
            },
        });

        revalidatePath("/admin");
        return { success: true, id: submission.id };
    } catch (error) {
        console.error("Submission error:", error);
        return { success: false, error: "Failed to submit essay" };
    }
}

export async function login(formData: any) {
    const { username, password } = formData;

    const user = await prisma.user.findUnique({
        where: { username },
    });

    if (user && await bcrypt.compare(password, user.password)) {
        const token = await new SignJWT({ userId: user.id, username: user.username, role: "admin" })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("2h")
            .sign(JWT_SECRET);

        const cookieStore = await cookies();
        cookieStore.set("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 2, // 2 hours
        });

        return { success: true };
    }

    // Fallback for first-time use if no users exist
    const userCount = await prisma.user.count();
    if (userCount === 0 && username === "admin" && password === "admin123") {
        const hashedPassword = await bcrypt.hash("admin123", 10);
        const newUser = await prisma.user.create({
            data: { username: "admin", password: hashedPassword }
        });

        const token = await new SignJWT({ userId: newUser.id, username: "admin", role: "admin" })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("2h")
            .sign(JWT_SECRET);

        const cookieStore = await cookies();
        cookieStore.set("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 2, // 2 hours
        });

        return { success: true };
    }

    return { success: false, error: "Invalid username or password" };
}

export async function createAdminUser(formData: any) {
    try {
        const { username, password } = formData;
        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to create user (username might already exist)" };
    }
}

export async function deleteAdminUser(id: string) {
    try {
        await prisma.user.delete({
            where: { id },
        });
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete user" };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_token");
    return { success: true };
}

export async function isAuthenticated() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) return false;

    try {
        await jwtVerify(token, JWT_SECRET);
        return true;
    } catch (error) {
        return false;
    }
}
