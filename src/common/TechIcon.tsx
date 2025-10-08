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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      {/* Contenedor con tamaño fijo */}
      <div className={`relative ${h || "h-12 w-12"}`}>
        {/* Placeholder mientras carga */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        )}

        {/* Imagen */}
        {!imageError && (
          <motion.img
            src={src}
            alt={alt}
            className={`${
              h || "h-8 w-8 md:h-12 md:w-12"
            } object-contain transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            decoding="async"
            onLoad={handleImageLoad}
            onError={handleImageError}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          />
        )}

        {/* Fallback si falla la carga */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-300 dark:bg-gray-600 rounded-lg text-xs text-gray-600 dark:text-gray-300">
            {alt.substring(0, 2)}
          </div>
        )}
      </div>

      {/* Tooltip con animación */}
      <AnimatePresence>
        {isHovered && imageLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.2 }}
            animate={{ opacity: 1, y: -25, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute top-0 z-20 pointer-events-none"
          >
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white text-xs font-medium px-3 py-1 rounded-lg shadow-lg whitespace-nowrap">
                {alt}
              </div>
              {/* Flecha */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full">
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-blue-800 dark:border-t-blue-700" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Efecto de glow en hover */}
      <AnimatePresence>
        {isHovered && imageLoaded && (
          <motion.div
            className="absolute inset-0 rounded-full blur-xl -z-10 bg-blue-500/20"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 0.3, scale: 1.5 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
