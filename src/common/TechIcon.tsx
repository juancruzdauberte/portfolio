import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const TechIcon = ({
  src,
  alt,
  h,
}: {
  src: string;
  alt: string;
  h?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={src} alt={alt} className={h || "h-12"} />

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: -25 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-0 z-10 bg-black text-white text-xs px-2 py-1 rounded shadow-md"
          >
            {alt}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
