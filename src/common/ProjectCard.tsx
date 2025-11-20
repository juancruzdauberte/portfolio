import { IoIosLink } from "react-icons/io";
import { LuCodeXml } from "react-icons/lu";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState, useMemo } from "react";
import { transitions, hoverScale, tapScale } from "../utils/animations";

type Props = {
  title: string;
  codeUrlFront?: string;
  codeUrlBack?: string;
  previewUrl?: string;
  description: string;
  deployText?: string;
  img: string;
  technologies: React.ReactNode[];
};

export const ProjectCard = ({
  title,
  codeUrlFront,
  codeUrlBack,
  previewUrl,
  description,
  img,
  deployText,
  technologies,
}: Props) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Memoizar variantes para evitar recrearlas
  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 50, scale: 0.9 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: transitions.softSpring,
      },
    }),
    []
  );

  return (
    <motion.section
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "50px" }}
      whileHover={{
        y: -12,
        transition: transitions.fast,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group flex flex-col justify-center w-full max-w-[320px] sm:max-w-[300px] rounded-lg overflow-hidden bg-theme-bg-secondary shadow-theme-lg transition-colors"
      style={{ willChange: isHovered ? "transform" : "auto" }}
    >
      {/* Contenedor de imagen con lazy loading */}
      <div className="relative w-full h-40 sm:h-48 overflow-hidden bg-theme-bg-tertiary">
        {/* Placeholder mientras carga */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-theme-bg-tertiary animate-pulse" />
        )}

        {/* Overlay gradiente en hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={transitions.fast}
        />

        <motion.img
          className="w-full h-full object-cover"
          src={img}
          alt={title}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={transitions.normal}
        />
      </div>

      <div className="relative flex flex-col gap-3 sm:gap-4 px-3 sm:px-4 py-4 sm:py-5 text-center bg-theme-bg-secondary transition-colors">
        <motion.h4
          className="text-lg sm:text-xl font-semibold relative text-theme-text-primary"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {title}
          {/* Subrayado animado con colores de tema */}
          <motion.span
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-theme-accent-blue to-theme-accent-purple"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? "80%" : "0%" }}
            transition={transitions.fast}
          />
        </motion.h4>

        <motion.p
          className="text-xs sm:text-sm text-justify leading-relaxed text-theme-text-secondary"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {description}
        </motion.p>

        <motion.div
          className="flex justify-center gap-2 sm:gap-3 flex-wrap"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {codeUrlFront && (
            <motion.a
              href={codeUrlFront}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group/btn flex items-center gap-1.5 sm:gap-2 border border-theme-border-secondary rounded-full py-0.5 px-3 sm:py-1 sm:px-4 text-xs sm:text-sm font-medium overflow-hidden transition-colors"
              whileHover={hoverScale}
              whileTap={tapScale}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-theme-accent-blue to-theme-accent-cyan"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={transitions.fast}
              />

              <LuCodeXml className="text-base sm:text-xl relative z-10 transition-colors text-theme-text-primary" />
              <span className="relative z-10 transition-colors text-theme-text-primary">
                Front
              </span>
            </motion.a>
          )}

          {codeUrlBack && (
            <motion.a
              href={codeUrlBack}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group/btn flex items-center gap-2 border border-theme-border-secondary rounded-full py-1 px-4 text-sm font-medium overflow-hidden transition-colors"
              whileHover={hoverScale}
              whileTap={tapScale}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-theme-accent-purple to-theme-accent-pink"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={transitions.fast}
              />

              <LuCodeXml className="text-xl relative z-10 transition-colors text-theme-text-primary" />
              <span className="relative z-10 transition-colors text-theme-text-primary">
                Back
              </span>
            </motion.a>
          )}

          {previewUrl && (
            <motion.a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group/btn flex items-center gap-2 border border-theme-border-secondary rounded-full py-1 px-4 text-sm font-medium overflow-hidden transition-colors"
              whileHover={hoverScale}
              whileTap={tapScale}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-theme-accent-green to-emerald-600 dark:to-emerald-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={transitions.fast}
              />

              <IoIosLink className="text-base sm:text-xl relative z-10 transition-colors text-theme-text-primary" />
              <span className="relative z-10 transition-colors text-theme-text-primary">
                {deployText ? deployText : "Deploy"}
              </span>
            </motion.a>
          )}
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-1.5 sm:gap-2"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h6 className="text-xs sm:text-sm font-semibold text-theme-text-primary">
            {t("projectCard.technologies")}
          </h6>
          <div className="flex flex-wrap gap-2 sm:gap-3 text-2xl sm:text-3xl justify-center">
            {technologies.map((TechIcon, index) => (
              <motion.span
                key={index}
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.5 + index * 0.05,
                }}
                whileHover={{
                  scale: 1.3,
                  rotate: 360,
                  transition: transitions.fast,
                }}
              >
                {TechIcon}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
