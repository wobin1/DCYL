import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import archiver from "archiver";
import { Readable } from "stream";
import fs from "fs/promises";
import path from "path";

export async function GET(request: NextRequest) {
    try {
        const submissions = await prisma.submission.findMany({
            orderBy: { createdAt: "desc" },
        });

        if (submissions.length === 0) {
            return NextResponse.json({ error: "No submissions found" }, { status: 404 });
        }

        // Create a custom stream to collect ZIP data
        const stream = new Readable({
            read() { }
        });

        const archive = archiver("zip", {
            zlib: { level: 9 }, // Maximum compression
        });

        archive.on("error", (err) => {
            throw err;
        });

        // Use a PassThrough stream for the response
        const { readable, writable } = new TransformStream();
        const writer = writable.getWriter();

        // Connect archiver to the response writer
        archive.on("data", (chunk) => {
            writer.write(chunk);
        });

        archive.on("end", () => {
            writer.close();
        });

        // Process submissions
        (async () => {
            for (const sub of submissions) {
                const safeStudentName = sub.fullName.replace(/[^a-z0-9]/gi, "_");
                const safeSchoolName = sub.schoolName.replace(/[^a-z0-9]/gi, "_");

                if (sub.filePath) {
                    // It's an uploaded file
                    const absolutePath = path.join(process.cwd(), "public", sub.filePath);
                    try {
                        const fileBuffer = await fs.readFile(absolutePath);
                        const ext = path.extname(sub.filePath) || ".docx";
                        const entryName = `${safeStudentName}-${safeSchoolName}${ext}`;
                        archive.append(fileBuffer, { name: entryName });
                    } catch (e) {
                        console.error(`Error reading file for submission ${sub.id}:`, e);
                    }
                } else if (sub.content) {
                    // It's a text submission - generate professional .docx content
                    const entryName = `${safeStudentName}-${safeSchoolName}.docx`;

                    const htmlContent = `
                        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                        <head>
                            <meta charset="utf-8">
                            <title>${sub.essayTitle}</title>
                            <style>
                                body { font-family: 'Times New Roman', serif; padding: 40px; }
                                .header { border-bottom: 2px solid #008080; margin-bottom: 30px; padding-bottom: 10px; }
                                h1 { color: #008080; text-align: center; }
                                .info { margin-bottom: 40px; }
                                .content { white-space: pre-wrap; margin-top: 20px; }
                            </style>
                        </head>
                        <body>
                            <div class="header"><h1>${sub.essayTitle}</h1></div>
                            <div class="info">
                                <strong>Student:</strong> ${sub.fullName}<br>
                                <strong>School:</strong> ${sub.schoolName}<br>
                                <strong>Grade:</strong> ${sub.gradeLevel}<br>
                                <strong>Date:</strong> ${new Date(sub.createdAt).toLocaleDateString()}
                            </div>
                            <div class="content">${sub.content}</div>
                        </body>
                        </html>
                    `;
                    archive.append(htmlContent, { name: entryName });
                }
            }
            await archive.finalize();
        })().catch(err => {
            console.error("ZIP Generation error:", err);
            writer.abort(err);
        });

        const filename = `all_essays_${new Date().toISOString().split('T')[0]}.zip`;

        return new NextResponse(readable, {
            headers: {
                "Content-Type": "application/zip",
                "Content-Disposition": `attachment; filename="${filename}"`,
                "Cache-Control": "no-cache",
            },
        });

    } catch (error) {
        console.error("Bulk download error:", error);
        return NextResponse.json({ error: "Failed to generate ZIP archive" }, { status: 500 });
    }
}
