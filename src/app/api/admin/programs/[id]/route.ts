import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const program = await prisma.program.findUnique({ where: { id } });
        if (!program) {
            return NextResponse.json({ error: "Program not found" }, { status: 404 });
        }
        return NextResponse.json(program);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch program" }, { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const data = await request.json();
        const program = await prisma.program.update({
            where: { id },
            data,
        });
        return NextResponse.json(program);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update program" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.program.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete program" }, { status: 500 });
    }
}
