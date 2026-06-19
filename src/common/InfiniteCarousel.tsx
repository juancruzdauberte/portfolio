import { motion, useMotionValue, animate } from "framer-motion";
import type { AnimationPlaybackControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/usePerformance";
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
  label?: string;
}

export const InfiniteCarousel = ({
  technologies,
  duration = 20,
  direction = "left",
  label,
}: InfiniteCarouselProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  const x = useMotionValue(direction === "left" ? "0%" : "-50%");
  const animRef = useRef<AnimationPlaybackControls | null>(null);

  // Start animation on mount; skip entirely when reducedMotion is on
  useEffect(() => {
    if (prefersReducedMotion) return;

    animRef.current?.stop();
    animRef.current = animate(
      x,
      direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
      { duration, repeat: Infinity, ease: "linear", repeatType: "loop" }
    );

    return () => { animRef.current?.stop(); };
  }, [direction, duration, prefersReducedMotion]); // eslint-disable-line react-hooks/exhaustive-deps

  // Pause / resume without restart — no visual jump
  useEffect(() => {
    if (!animRef.current) return;
    paused ? animRef.current.pause() : animRef.current.play();
  }, [paused]);

  return (
    <div
      className="relative w-full overflow-hidden py-4 md:py-7"
      role="region"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-24 bg-gradient-to-r from-customWhite dark:from-gray-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-24 bg-gradient-to-l from-customWhite dark:from-gray-900 to-transparent z-10 pointer-events-none" />

      <div className="flex">
        <motion.div
          className="flex gap-5 sm:gap-6 md:gap-8 items-center"
          style={{ x }}
        >
          {technologies.map((tech, index) => (
            <div key={`tech-1-${index}`} className="flex-shrink-0">
              <TechIcon src={tech.src} alt={tech.alt} h={tech.h} />
            </div>
          ))}
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
