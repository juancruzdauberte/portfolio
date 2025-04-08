import { useEffect, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Footer } from "./layout/Footer";
import { Navbar } from "./layout/Navbar";
import { Experience } from "./pages/Experience";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";

function App() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  console.log(scrolled);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ThemeProvider>
      <section className="min-h-screen flex flex-col text-black bg-customBlue dark:text-white dark:bg-customDark transition-colors duration-300">
        <header
          className={`fixed top-0 w-full z-50 p-4  transition-colors duration-300 ${
            scrolled
              ? "bg-white/10 dark:bg-black/10 backdrop-blur-md"
              : "bg-customBlue dark:bg-customDark"
          }`}
        >
          <Navbar />
        </header>
        <main className="flex-1 flex flex-col w-full items-center pt-40 gap-44 px-4">
          <Home />
          <Experience />
          <Projects />
        </main>
        <footer className="flex justify-center items-center">
          <Footer />
        </footer>
      </section>
    </ThemeProvider>
  );
}

export default App;
