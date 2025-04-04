import AboutMe from "@/components/AboutMe"
import Features from "@/components/Features"
import Hero from "@/components/Hero"
import NavbarMain from "@/components/NavbarMain"
import CursorGradient from "@/components/CursorGradient";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <CursorGradient />
      <NavbarMain />
      <div className="w-full lg:w-auto flex flex-col items-center justify-center">
        <Hero />
        <AboutMe />
        <Features />
        <Projects />
      </div>
      <Footer />
    </div>
  )
}

export default page
