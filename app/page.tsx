import AboutMe from "@/components/AboutMe"
import Features from "@/components/Features"
import Hero from "@/components/Hero"
import NavbarMain from "@/components/NavbarMain"
import CursorGradient from "@/components/CursorGradient";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <>
      <CursorGradient />
      <NavbarMain/>
      <div className="overflow-hidden">
        <Hero/>
        <AboutMe/>
        <Features/>
        <Projects/>
      </div>
      <Footer/>
    </>
  )
}

export default page
