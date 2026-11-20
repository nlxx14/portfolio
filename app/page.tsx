import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import TechMarquee from "@/components/sections/tech-marqueee";
import About from "@/components/sections/about";
import Projects from "@/components/sections/projects";
import Loader from "@/components/ui/loader";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export default function Home() {
  return (
    <>
      <Loader />
      <Navbar />

      <main id="home">
        <Hero />

        {/* About Section */}
        <About />

        {/* Projects & Certificates Section */}
        <Projects />

        {/* Moving tech stack banner */}
        <TechMarquee />

        {/* Contact Section */}
        <section id="contact" className="section-padding border-t border-white/[0.06]">
          <RevealGroup className="container-custom text-center">
            <RevealItem>
              <p className="mb-3 font-mono text-sm text-[#a78bfa]">
                03 / GET IN TOUCH
              </p>
            </RevealItem>

            <RevealItem>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Let&apos;s build something together.
              </h2>
            </RevealItem>

            <RevealItem>
              <p className="mx-auto mt-5 max-w-lg leading-7 text-zinc-400">
                Have an idea, opportunity, or project in mind?
                I&apos;d love to hear from you.
              </p>
            </RevealItem>

            <RevealItem>
              <a
                href="mailto:your.email@example.com"
                className="mt-8 inline-flex rounded-lg bg-[#8b5cf6] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#7c3aed]"
              >
                Say hello
              </a>
            </RevealItem>
          </RevealGroup>
        </section>
      </main>

      <Footer />
    </>
  );
}