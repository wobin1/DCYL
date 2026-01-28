import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { About } from "@/components/home/about";
import { CompetitionPreview } from "@/components/home/competition-preview";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <About />
        <CompetitionPreview />

        {/* Contact CTA Section */}
        <section className="py-20 bg-slate-50" id="contact">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-extrabold text-dark-teal mb-6">Get In Touch</h2>
            <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
              Have questions about the essay competition or want to learn more about our leadership initiatives? Let's build bridges together.
            </p>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 w-full max-w-sm">
                <div className="text-teal-600 font-bold mb-2 uppercase tracking-tight">Email</div>
                <p className="text-slate-700">info@gideondunioh.org</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 w-full max-w-sm">
                <div className="text-teal-600 font-bold mb-2 uppercase tracking-tight">Phone / WhatsApp</div>
                <p className="text-slate-700">+234 XXX XXX XXXX</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
