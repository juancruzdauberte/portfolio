import { lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Footer } from "./layout/Footer";
import { Navbar } from "./layout/Navbar";
import { Hero } from "./pages/Hero";
import { motion, useScroll, useSpring } from "framer-motion";

// Lazy loading de secciones para mejor performance inicial
const AboutMe = lazy(() =>
  import("./pages/AboutMe").then((module) => ({ default: module.AboutMe }))
);
const Experience = lazy(() =>
  import("./pages/Experience").then((module) => ({
    default: module.Experience,
  }))
);
const Projects = lazy(() =>
  import("./pages/Projects").then((module) => ({ default: module.Projects }))
);
const Skills = lazy(() =>
  import("./pages/Skills").then((module) => ({ default: module.Skills }))
);

// Componente de loading optimizado con tema
const SectionLoader = () => (
  <div className="w-full max-w-4xl h-96 flex items-center justify-center">
    <motion.div
      className="w-12 h-12 border-4 border-theme-accent-blue border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

function App() {
  const { scrollYProgress } = useScroll();

  // Usar useSpring para animación más suave
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col text-sm sm:text-base md:text-lg lg:text-xl text-theme-text-primary bg-theme-bg-primary transition-colors duration-300 relative">
        {/* Header optimizado y responsivo */}
        <motion.header
          className={`fixed top-0 left-0 right-0 w-full z-[90] transition-all duration-300 bg-transparent backdrop-blur-sm`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          {/* Barra de progreso mejorada */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-primary origin-left z-10"
            style={{ scaleX, willChange: "transform" }}
          />

          {/* Contenedor del Navbar con padding responsivo */}
          <div className="w-full py-3 md:py-1.5">
            <Navbar />
          </div>
        </motion.header>

        {/* Espaciador para compensar el header fijo */}

        {/* Main content */}
        <main className="flex-1 flex flex-col w-full items-center gap-20 sm:gap-28 md:gap-40 px-4 sm:px-6 md:px-8 mb-12 relative">
          {/* Home Section - Siempre cargada */}
          <motion.div
            id="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full"
          >
            <Hero />
          </motion.div>

          {/* Separador con colores de tema */}
          <motion.div
            className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-theme-accent-blue to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ duration: 0.8 }}
          />

          {/* About Me - Lazy loaded */}
          <section id="sobre-mi" className="w-full flex justify-center">
            <Suspense fallback={<SectionLoader />}>
              <AboutMe />
            </Suspense>
          </section>

          <motion.div
            className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-theme-accent-purple to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ duration: 0.8 }}
          />

          {/* Experience - Lazy loaded */}
          <section id="experiencia" className="w-full flex justify-center">
            <Suspense fallback={<SectionLoader />}>
              <Experience />
            </Suspense>
          </section>

          <motion.div
            className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-theme-accent-pink to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ duration: 0.8 }}
          />

          {/* Projects - Lazy loaded */}
          <section id="proyectos" className="w-full flex justify-center">
            <Suspense fallback={<SectionLoader />}>
              <Projects />
            </Suspense>
          </section>

          <motion.div
            className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-theme-accent-cyan to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ duration: 0.8 }}
          />

          {/* Skills - Lazy loaded */}
          <section id="habilidades" className="w-full flex justify-center">
            <Suspense fallback={<SectionLoader />}>
              <Skills />
            </Suspense>
          </section>

          <motion.div
            className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-theme-accent-blue to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ duration: 0.8 }}
          />
        </main>

        {/* Footer */}
        <footer className="flex justify-center items-center relative z-10">
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
