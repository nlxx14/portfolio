import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Projects from "@/components/sections/projects";
import Contact from "@/components/sections/contact";
import Loader from "@/components/ui/loader";

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

        {/* Contact Section */}
        <Contact />
      </main>

      <Footer />
    </>
  );
}
