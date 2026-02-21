import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        // Fetch all submissions
        const submissions = await prisma.submission.findMany({
            orderBy: { createdAt: "desc" },
        });

        if (submissions.length === 0) {
            return NextResponse.json(
                { error: "No submissions found to export" },
                { status: 404 }
            );
        }

        // Define CSV headers
        const headers = [
            "Student Name",
            "Phone Number",
            "School",
            "Grade",
            "Essay Title",
            "Score",
            "Status",
            "Feedback",
            "Submitted Date"
        ];

        // Format data rows
        const rows = (submissions as any[]).map(sub => [
            `"${sub.fullName.replace(/"/g, '""')}"`,
            `"${sub.phoneNumber.replace(/"/g, '""')}"`,
            `"${sub.schoolName.replace(/"/g, '""')}"`,
            `"${sub.gradeLevel.replace(/"/g, '""')}"`,
            `"${sub.essayTitle.replace(/"/g, '""')}"`,
            sub.score !== null ? sub.score : "N/A",
            `"${sub.status}"`,
            `"${(sub.feedback || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
            `"${new Date(sub.createdAt).toLocaleString()}"`
        ]);

        // Combine headers and rows
        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.join(","))
        ].join("\n");

        // Return CSV as download
        const filename = `essay_submissions_export_${new Date().toISOString().split('T')[0]}.csv`;

        return new NextResponse(csvContent, {
            headers: {
                "Content-Type": "text/csv; charset=utf-8",
                "Content-Disposition": `attachment; filename="${filename}"`,
                "Cache-Control": "no-cache",
            },
        });
    } catch (error) {
        console.error("Export error:", error);
        return NextResponse.json(
            { error: "Failed to export submissions" },
            { status: 500 }
        );
    }
}
