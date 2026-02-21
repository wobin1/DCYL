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
import { Eye, Download, Calendar, Phone, School, FileText, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updateSubmissionScore } from "@/app/actions";
import { toast } from "sonner";

interface Submission {
    id: string;
    fullName: string;
    phoneNumber: string;
    schoolName: string;
    gradeLevel: string;
    essayTitle: string;
    content?: string | null;
    filePath?: string | null;
    score?: number | null;
    feedback?: string | null;
    createdAt: Date;
    status: string;
}

interface SubmissionViewerProps {
    submission: Submission;
}

export function SubmissionViewer({ submission }: SubmissionViewerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [score, setScore] = useState<string>(submission.score?.toString() || "");
    const [feedback, setFeedback] = useState<string>(submission.feedback || "");
    const [isSaving, setIsSaving] = useState(false);

    const handleDownload = () => {
        window.open(`/api/submissions/${submission.id}/download`, "_blank");
    };

    const handleSaveScore = async () => {
        if (!score) {
            toast.error("Please enter a score");
            return;
        }

        setIsSaving(true);
        try {
            const result = await updateSubmissionScore(submission.id, {
                score: parseInt(score),
                feedback,
            });

            if (result.success) {
                toast.success("Assessment saved successfully");
                setIsOpen(false);
            } else {
                toast.error(result.error || "Failed to save assessment");
            }
        } catch (error) {
            toast.error("An error occurred while saving");
        } finally {
            setIsSaving(false);
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

                    {/* Assessment Section */}
                    <div className="space-y-4 pt-4 border-t">
                        <h3 className="text-lg font-semibold text-dark-teal flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5" />
                            Assessor's Evaluation
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="score">Score (0-100)</Label>
                                <Input
                                    id="score"
                                    type="number"
                                    min="0"
                                    max="100"
                                    placeholder="Enter score"
                                    value={score}
                                    onChange={(e) => setScore(e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-3 space-y-2">
                                <Label htmlFor="feedback">Feedback / Comments</Label>
                                <Textarea
                                    id="feedback"
                                    placeholder="Add notes for the student..."
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-4 border-t">
                        <Button variant="outline" className="gap-2" onClick={handleDownload}>
                            <Download className="h-4 w-4" />
                            Download Professional Copy
                        </Button>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => setIsOpen(false)}>
                                Close
                            </Button>
                            <Button
                                className="bg-teal-600 hover:bg-teal-700"
                                onClick={handleSaveScore}
                                disabled={isSaving}
                            >
                                {isSaving ? "Saving..." : "Save Assessment"}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
