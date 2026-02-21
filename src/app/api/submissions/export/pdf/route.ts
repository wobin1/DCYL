import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

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

        // Create PDF
        const doc = new jsPDF();

        // Add header
        doc.setFontSize(22);
        doc.setTextColor(0, 128, 128); // Dark Teal
        doc.text("The Bridge Essay Competition", 105, 20, { align: "center" });

        doc.setFontSize(16);
        doc.setTextColor(100);
        doc.text("Submissions Assessment Report", 105, 30, { align: "center" });

        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 37, { align: "center" });

        // Define Table Data
        const tableColumn = ["Student Name", "School", "Grade", "Title", "Score", "Status"];
        const tableRows = (submissions as any[]).map(sub => [
            sub.fullName,
            sub.schoolName,
            sub.gradeLevel,
            sub.essayTitle,
            sub.score !== null ? sub.score.toString() : "N/A",
            sub.status
        ]);

        console.log("PDF Generation: Submissions found:", submissions.length);
        console.log("autoTable type:", typeof autoTable);

        // Add Table using the functional import
        if (typeof autoTable === "function") {
            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 45,
                theme: "striped",
                headStyles: { fillColor: [0, 128, 128], textColor: 255 },
                alternateRowStyles: { fillColor: [240, 250, 250] },
                margin: { top: 45 },
            });
        } else if ((doc as any).autoTable) {
            console.log("Using prototype autoTable fallback");
            (doc as any).autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 45,
                theme: "striped",
                headStyles: { fillColor: [0, 128, 128], textColor: 255 },
                alternateRowStyles: { fillColor: [240, 250, 250] },
                margin: { top: 45 },
            });
        } else {
            console.error("autoTable is not available in any form");
            throw new Error("PDF Table generator not initialized");
        }

        // Add Footer on each page
        const pageCount = (doc as any).internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150);
            const pageSize = doc.internal.pageSize;
            const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
            doc.text(
                `The Bridge Essay Portal - Page ${i} of ${pageCount}`,
                pageWidth / 2,
                pageHeight - 10,
                { align: "center" }
            );
        }

        // Output as Buffer - crucial for Node.js environments
        const pdfOutput = doc.output("arraybuffer");
        const buffer = Buffer.from(pdfOutput);

        // Return PDF as download
        const filename = `essay_assessment_report_${new Date().toISOString().split('T')[0]}.pdf`;

        return new NextResponse(buffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${filename}"`,
                "Cache-Control": "no-cache",
            },
        });
    } catch (error) {
        console.error("PDF Export error:", error);
        return NextResponse.json(
            { error: "Failed to export PDF" },
            { status: 500 }
        );
    }
}
