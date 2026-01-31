import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ filename: string }> }
) {
    try {
        // Await params in Next.js 15+
        const { filename } = await params;

        // Security: Prevent directory traversal attacks
        if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
            return NextResponse.json(
                { error: "Invalid filename" },
                { status: 400 }
            );
        }

        // Validate file extension
        const allowedExtensions = [".pdf", ".docx"];
        const hasValidExtension = allowedExtensions.some(ext => filename.toLowerCase().endsWith(ext));

        if (!hasValidExtension) {
            return NextResponse.json(
                { error: "Invalid file type" },
                { status: 400 }
            );
        }

        // Construct file path
        const filePath = join(process.cwd(), "public", "uploads", filename);

        // Check if file exists
        if (!existsSync(filePath)) {
            return NextResponse.json(
                { error: "File not found" },
                { status: 404 }
            );
        }

        // Read file
        const fileBuffer = await readFile(filePath);

        // Determine content type
        const contentType = filename.toLowerCase().endsWith(".pdf")
            ? "application/pdf"
            : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

        // Return file with appropriate headers
        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": contentType,
                "Content-Disposition": `attachment; filename="${filename}"`,
                "Cache-Control": "no-cache",
            },
        });
    } catch (error) {
        console.error("Download error:", error);
        return NextResponse.json(
            { error: "Failed to download file" },
            { status: 500 }
        );
    }
}
