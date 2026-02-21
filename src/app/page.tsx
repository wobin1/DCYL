import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { ValuesSection } from "@/components/home/values-section";
import { Stats } from "@/components/home/stats";
import { ProgramsOverview } from "@/components/home/programs-overview";
import { SuccessStories } from "@/components/home/success-stories";
import { TeamSection } from "@/components/home/team-section";
import { FoundersMessage } from "@/components/home/founders-message";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch all content from database
  const [siteSettings, values, metrics, programs, testimonials, teamMembers] =
    await Promise.all([
      prisma.siteSettings.findFirst(),
      prisma.value.findMany({ orderBy: { order: "asc" } }),
      prisma.impactMetric.findMany({ orderBy: { order: "asc" } }),
      prisma.program.findMany({
        where: { active: true },
        orderBy: { order: "asc" },
      }),
      prisma.testimonial.findMany({
        where: { featured: true },
        orderBy: { order: "asc" },
      }),
      prisma.teamMember.findMany({ orderBy: { order: "asc" } }),
    ]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero mission={siteSettings?.mission} />
        <Stats metrics={metrics} />
        <ValuesSection vision={siteSettings?.vision} values={values} />
        <ProgramsOverview programs={programs} />
        <SuccessStories testimonials={testimonials} />
        <TeamSection teamMembers={teamMembers} />
        <FoundersMessage
          founderName={siteSettings?.founderName}
          founderTitle={siteSettings?.founderTitle}
          founderMessage={siteSettings?.founderMessage}
          founderImageUrl={siteSettings?.founderImageUrl}
        />

        {/* Contact CTA Section */}
        <section className="py-20 bg-slate-50" id="contact">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-extrabold text-dark-teal mb-6">
              Get In Touch
            </h2>
            <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
              Have questions about our programs or want to get involved? Let's
              build a brighter future together.
            </p>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 w-full max-w-sm">
                <div className="text-teal-600 font-bold mb-2 uppercase tracking-tight">
                  Email
                </div>
                <p className="text-slate-700">
                  {siteSettings?.contactEmail || "info@gideondunioh.org"}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 w-full max-w-sm">
                <div className="text-teal-600 font-bold mb-2 uppercase tracking-tight">
                  Phone / WhatsApp
                </div>
                <p className="text-slate-700">
                  {siteSettings?.contactPhone || "+234 XXX XXX XXXX"}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
