import { motion } from "framer-motion";
import { TechIcon } from "./TechIcon";

interface Technology {
  src: string;
  alt: string;
  h?: string;
}

interface InfiniteCarouselProps {
  technologies: Technology[];
  duration?: number;
  direction?: "left" | "right";
}

export const InfiniteCarousel = ({
  technologies,
  duration = 20,
  direction = "left",
}: InfiniteCarouselProps) => {
  return (
    <div className="relative w-full overflow-hidden py-4 md:py-7">
      {/* Gradientes laterales para efecto de fade - reducidos en mobile para más espacio visible */}
      <div className="absolute left-0 top-0 bottom-0 w-3 sm:w-8 md:w-24 bg-gradient-to-r from-customWhite dark:from-gray-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-3 sm:w-8 md:w-24 bg-gradient-to-l from-customWhite dark:from-gray-900 to-transparent z-10 pointer-events-none" />

      {/* Contenedor del carrusel */}
      <div className="flex">
        <motion.div
          className="flex gap-3 sm:gap-4 md:gap-6 items-center"
          animate={{
            x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
          style={{ willChange: "transform" }}
        >
          {/* Primera copia de las tecnologías */}
          {technologies.map((tech, index) => (
            <div key={`tech-1-${index}`} className="flex-shrink-0">
              <TechIcon src={tech.src} alt={tech.alt} h={tech.h} />
            </div>
          ))}

          {/* Segunda copia para el loop infinito */}
          {technologies.map((tech, index) => (
            <div key={`tech-2-${index}`} className="flex-shrink-0">
              <TechIcon src={tech.src} alt={tech.alt} h={tech.h} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
