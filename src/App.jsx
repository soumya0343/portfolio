import { useState, useCallback } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import ContactSidebar from "./components/ContactSidebar";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Blog from "./sections/Blog";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <LoadingScreen onComplete={handleLoadingComplete} />
      {loaded && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Blog />
            <Skills />
            <Contact />
          </main>
          <Footer />
          <ContactSidebar />
          <BackToTop />
        </>
      )}
    </>
  );
}
