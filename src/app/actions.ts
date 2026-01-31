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
        let filePath: string | null = null;
        let content: string | null = null;

        // Check if formData is FormData (file upload) or regular object (HTML content)
        if (formData instanceof FormData) {
            const file = formData.get("file") as File | null;

            if (file && file.size > 0) {
                // Validate file type
                const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
                if (!allowedTypes.includes(file.type)) {
                    return { success: false, error: "Invalid file type. Only PDF and DOCX files are allowed." };
                }

                // Validate file size (10MB limit)
                const maxSize = 10 * 1024 * 1024; // 10MB in bytes
                if (file.size > maxSize) {
                    return { success: false, error: "File size exceeds 10MB limit." };
                }

                // Generate unique filename
                const timestamp = Date.now();
                const randomId = Math.random().toString(36).substring(2, 9);
                const extension = file.name.split(".").pop();
                const filename = `essay-${timestamp}-${randomId}.${extension}`;

                // Save file to public/uploads directory
                const fs = await import("fs/promises");
                const path = await import("path");
                const uploadsDir = path.join(process.cwd(), "public", "uploads");
                const filepath = path.join(uploadsDir, filename);

                const buffer = Buffer.from(await file.arrayBuffer());
                await fs.writeFile(filepath, buffer);

                filePath = `/uploads/${filename}`;
            }

            // Extract form fields from FormData
            const submission = await prisma.submission.create({
                data: {
                    fullName: formData.get("fullName") as string,
                    phoneNumber: formData.get("phoneNumber") as string,
                    schoolName: formData.get("schoolName") as string,
                    gradeLevel: formData.get("gradeLevel") as string,
                    essayTitle: formData.get("essayTitle") as string,
                    content: formData.get("content") as string || null,
                    filePath: filePath,
                    status: "PENDING",
                },
            });

            revalidatePath("/admin");
            return { success: true, id: submission.id };
        } else {
            // Handle regular object (HTML content only)
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
        }
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
