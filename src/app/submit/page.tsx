"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Editor } from "@/components/ui/editor";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { submitEssay } from "@/app/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { FileUp, Info } from "lucide-react";

const formSchema = z.object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
    schoolName: z.string().min(2, { message: "School name is required." }),
    gradeLevel: z.string().min(1, "Please select your grade level."),
    phoneNumber: z.string().min(10, { message: "Valid phone number is required." }),
    essayTitle: z.string().min(5, { message: "Essay title is required." }),
    content: z.string().optional(),
});

export default function SubmitPage() {
    const [submissionMethod, setSubmissionMethod] = useState<"editor" | "upload">("editor");
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            schoolName: "",
            gradeLevel: "",
            phoneNumber: "",
            essayTitle: "",
            content: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            let res;

            if (submissionMethod === "upload" && file) {
                // Create FormData for file upload
                const formData = new FormData();
                formData.append("fullName", values.fullName);
                formData.append("phoneNumber", values.phoneNumber);
                formData.append("schoolName", values.schoolName);
                formData.append("gradeLevel", values.gradeLevel);
                formData.append("essayTitle", values.essayTitle);
                formData.append("file", file);

                res = await submitEssay(formData);
            } else {
                // Submit HTML content
                res = await submitEssay(values);
            }

            if (res.success) {
                toast.success("Submission successful!", {
                    description: "Your essay has been received. Good luck!",
                });
                form.reset();
                setFile(null);
            } else {
                toast.error("Submission failed", {
                    description: res.error,
                });
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-12 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-extrabold text-dark-teal tracking-tight mb-2">Submit Your Entry</h1>
                        <p className="text-slate-600">Fill out the form below to participate in The Bridge Essay Competition.</p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <Card className="border-0 shadow-sm">
                                <CardHeader>
                                    <CardTitle>Student Information</CardTitle>
                                    <CardDescription>Basic details for us to identify you.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-6 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John Doe" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phoneNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+234..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="schoolName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>School Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Federal Government College..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="gradeLevel"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Grade Level</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select your grade" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="jss1">JSS 1</SelectItem>
                                                        <SelectItem value="jss2">JSS 2</SelectItem>
                                                        <SelectItem value="jss3">JSS 3</SelectItem>
                                                        <SelectItem value="sss1">SSS 1</SelectItem>
                                                        <SelectItem value="sss2">SSS 2</SelectItem>
                                                        <SelectItem value="sss3">SSS 3</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-sm">
                                <CardHeader>
                                    <CardTitle>Essay Content</CardTitle>
                                    <CardDescription>
                                        Choose how you want to submit your essay.
                                    </CardDescription>
                                    <div className="flex gap-4 mt-4">
                                        <Button
                                            type="button"
                                            variant={submissionMethod === "editor" ? "default" : "outline"}
                                            onClick={() => setSubmissionMethod("editor")}
                                            className="rounded-full flex-1"
                                        >
                                            Write in Browser
                                        </Button>
                                        <Button
                                            type="button"
                                            variant={submissionMethod === "upload" ? "default" : "outline"}
                                            onClick={() => setSubmissionMethod("upload")}
                                            className="rounded-full flex-1"
                                        >
                                            Upload File
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="essayTitle"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Essay Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your essay title" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {submissionMethod === "editor" ? (
                                        <FormField
                                            control={form.control}
                                            name="content"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Essay Body</FormLabel>
                                                    <FormControl>
                                                        <Editor content={field.value || ""} onChange={field.onChange} />
                                                    </FormControl>
                                                    <FormDescription>Your essay will be automatically saved as you write.</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ) : (
                                        <div className="space-y-4">
                                            <FormLabel>Upload Document (PDF or DOCX)</FormLabel>
                                            <div
                                                className="border-2 border-dashed border-slate-200 rounded-xl p-12 text-center hover:border-teal-500 transition-colors bg-slate-50/50 cursor-pointer"
                                                onClick={() => document.getElementById("file-upload")?.click()}
                                            >
                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    className="hidden"
                                                    accept=".pdf,.docx"
                                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                                />
                                                <div className="flex flex-col items-center">
                                                    <FileUp className="h-10 w-10 text-slate-400 mb-4" />
                                                    <p className="text-slate-600 font-medium">
                                                        {file ? `Selected: ${file.name}` : "Click to select or drag and drop your file here"}
                                                    </p>
                                                    <p className="text-xs text-slate-400 mt-2">Maximum file size: 10MB</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="bg-orange-50 p-4 rounded-lg flex gap-3 items-start border border-orange-100 mt-4">
                                        <Info className="h-5 w-5 text-orange-600 mt-0.5" />
                                        <p className="text-sm text-orange-800">
                                            <strong>Submission Guidelines:</strong> Ensure your essay is between 500 and 1000 words.
                                            Only one entry per student is allowed.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={isSubmitting}
                                    className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-12 h-14 text-lg shadow-lg"
                                >
                                    {isSubmitting ? "Submitting..." : "Submit Entry"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
