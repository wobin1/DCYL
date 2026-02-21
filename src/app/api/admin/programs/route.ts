import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const programs = await prisma.program.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(programs);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const program = await prisma.program.create({ data });
        return NextResponse.json(program);
    } catch (error) {
        console.error("Program creation error:", error);
        return NextResponse.json({ error: "Failed to create program" }, { status: 500 });
    }
}
