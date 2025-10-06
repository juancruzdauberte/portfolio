import { useEffect, useState, lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Footer } from "./layout/Footer";
import { Navbar } from "./layout/Navbar";
import { Home } from "./pages/Home";
import { motion, useScroll, useSpring } from "framer-motion";

// Lazy loading de secciones para mejor performance inicial
const AboutMe = lazy(() =>
  import("./pages/AboutMe").then((module) => ({ default: module.AboutMe }))
);
const Experience = lazy(() =>
  import("./pages/Experience").then((module) => ({ default: module.Experience }))
);
const Projects = lazy(() =>
  import("./pages/Projects").then((module) => ({ default: module.Projects }))
);
const Skills = lazy(() =>
  import("./pages/Skills").then((module) => ({ default: module.Skills }))
);

// Componente de loading optimizado
const SectionLoader = () => (
  <div className="w-full max-w-4xl h-96 flex items-center justify-center">
    <motion.div
      className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

function App() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { scrollYProgress } = useScroll();
  
  // Usar useSpring para animación más suave
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ThemeProvider>
      <section className="min-h-screen flex flex-col text-md md:text-xl text-black dark:text-white bg-customWhite dark:bg-customDark transition-colors duration-300 relative overflow-x-hidden">
        {/* Partículas de fondo con menor complejidad */}
        <div className="fixed top-10 left-10 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed top-1/3 right-10 w-72 h-72 bg-purple-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-20 left-1/4 w-80 h-80 bg-pink-400/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header optimizado */}
        <motion.header
          className={`fixed top-0 w-full z-40 transition-all duration-300 ${
            scrolled && "bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-lg"
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          {/* Barra de progreso optimizada */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left"
            style={{ scaleX, willChange: "transform" }}
          />

          <div className="p-3">
            <Navbar />
          </div>
        </motion.header>

        <main className="flex-1 flex flex-col w-full items-center gap-40 px-4 mb-16 relative">
          {/* Home Section - Siempre cargada */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Home />
          </motion.div>

          {/* Separador */}
          <motion.div
            className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 1 }}
          />

          {/* About Me - Lazy loaded */}
          <Suspense fallback={<SectionLoader />}>
            <AboutMe />
          </Suspense>

          <motion.div
            className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 1 }}
          />

          {/* Experience - Lazy loaded */}
          <Suspense fallback={<SectionLoader />}>
            <Experience />
          </Suspense>

          <motion.div
            className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 1 }}
          />

          {/* Projects - Lazy loaded */}
          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>

          <motion.div
            className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 1 }}
          />

          {/* Skills - Lazy loaded */}
          <Suspense fallback={<SectionLoader />}>
            <Skills />
          </Suspense>

          <motion.div
            className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 1 }}
          />
        </main>

        <footer className="flex justify-center items-center relative z-10">
          <Footer />
        </footer>

        {/* Botón de scroll to top optimizado */}
        <motion.button
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full shadow-lg z-40"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: scrolled ? 1 : 0,
            scale: scrolled ? 1 : 0,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Volver arriba"
          style={{ willChange: scrolled ? "transform, opacity" : "auto" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      </section>
    </ThemeProvider>
  );
}

export default App;
