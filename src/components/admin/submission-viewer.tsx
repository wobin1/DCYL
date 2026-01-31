"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Download, Calendar, Phone, School, FileText } from "lucide-react";

interface Submission {
    id: string;
    fullName: string;
    phoneNumber: string;
    schoolName: string;
    gradeLevel: string;
    essayTitle: string;
    content?: string | null;
    filePath?: string | null;
    createdAt: Date;
    status: string;
}

interface SubmissionViewerProps {
    submission: Submission;
}

export function SubmissionViewer({ submission }: SubmissionViewerProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleDownload = () => {
        if (submission.filePath) {
            // Extract filename from path (e.g., /uploads/essay-123.pdf -> essay-123.pdf)
            const filename = submission.filePath.split("/").pop();
            // Open download link
            window.open(`/api/download/${filename}`, "_blank");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-dark-teal">
                        {submission.essayTitle}
                    </DialogTitle>
                    <DialogDescription>
                        Submission details and essay content
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    {/* Student Information */}
                    <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-slate-500" />
                                <div>
                                    <p className="text-xs text-slate-500">Student Name</p>
                                    <p className="font-semibold">{submission.fullName}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-slate-500" />
                                <div>
                                    <p className="text-xs text-slate-500">Phone Number</p>
                                    <p className="font-semibold">{submission.phoneNumber}</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <School className="h-4 w-4 text-slate-500" />
                                <div>
                                    <p className="text-xs text-slate-500">School</p>
                                    <p className="font-semibold">{submission.schoolName}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-slate-500" />
                                <div>
                                    <p className="text-xs text-slate-500">Grade Level</p>
                                    <p className="font-semibold uppercase">{submission.gradeLevel}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submission Metadata */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-500" />
                            <div>
                                <p className="text-xs text-slate-500">Submitted On</p>
                                <p className="font-semibold">
                                    {new Date(submission.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 mb-1">Status</p>
                            <Badge
                                variant={submission.status === "PENDING" ? "outline" : "default"}
                                className="rounded-full"
                            >
                                {submission.status}
                            </Badge>
                        </div>
                    </div>

                    {/* Essay Content */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-dark-teal">Essay Content</h3>

                        {submission.content ? (
                            <div
                                className="prose prose-slate max-w-none p-6 bg-white border rounded-lg"
                                dangerouslySetInnerHTML={{ __html: submission.content }}
                            />
                        ) : submission.filePath ? (
                            <div className="p-6 bg-slate-50 border-2 border-dashed rounded-lg text-center">
                                <FileText className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                                <p className="text-sm text-slate-600 mb-3">
                                    Essay submitted as file: <span className="font-semibold">{submission.filePath}</span>
                                </p>
                                <Button className="bg-teal-600 hover:bg-teal-700 gap-2" onClick={handleDownload}>
                                    <Download className="h-4 w-4" />
                                    Download Essay
                                </Button>
                            </div>
                        ) : (
                            <div className="p-6 bg-slate-50 border rounded-lg text-center text-slate-500">
                                No essay content available
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button variant="outline" onClick={() => setIsOpen(false)}>
                            Close
                        </Button>
                        <Button className="bg-teal-600 hover:bg-teal-700">
                            Update Status
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
