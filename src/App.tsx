import { useEffect, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Footer } from "./layout/Footer";
import { Navbar } from "./layout/Navbar";
import { Experience } from "./pages/Experience";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { AboutMe } from "./pages/AboutMe";
import { Skills } from "./pages/Skills";

function App() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ThemeProvider>
      <section className="min-h-screen flex flex-col text-md md:text-xl text-black dark:text-white bg-customWhite dark:bg-customDark transition-colors duration-300">
        <header
          className={`fixed top-0 w-full z-40 p-3  transition-colors ${
            scrolled && "bg-white/0 dark:bg-black/0 backdrop-blur-md"
          }`}
        >
          <Navbar />
        </header>
        <main className="flex-1 flex flex-col w-full items-center gap-40 px-4 mb-16">
          <Home />
          <AboutMe />
          <Experience />
          <Projects />
          <Skills />
        </main>
        <footer className="flex justify-center items-center">
          <Footer />
        </footer>
      </section>
    </ThemeProvider>
  );
}

export default App;
