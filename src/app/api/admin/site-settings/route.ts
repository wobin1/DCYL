import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // Check if settings exist
        const existing = await prisma.siteSettings.findFirst();

        if (existing) {
            // Update existing
            await prisma.siteSettings.update({
                where: { id: existing.id },
                data,
            });
        } else {
            // Create new
            await prisma.siteSettings.create({
                data,
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Site settings error:", error);
        return NextResponse.json(
            { error: "Failed to update settings" },
            { status: 500 }
        );
    }
}
