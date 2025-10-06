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
      className="relative group flex flex-col justify-center w-[300px] rounded-lg overflow-hidden bg-white dark:bg-slate-700 shadow-lg"
      style={{ willChange: isHovered ? "transform" : "auto" }}
    >
      {/* Contenedor de imagen con lazy loading */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
        {/* Placeholder mientras carga */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 animate-pulse" />
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

      <div className="relative flex flex-col gap-4 px-4 py-5 text-center bg-white dark:bg-slate-700">
        <motion.h4
          className="text-xl font-semibold relative"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {title}
          {/* Subrayado animado */}
          <motion.span
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? "80%" : "0%" }}
            transition={transitions.fast}
          />
        </motion.h4>

        <motion.p
          className="text-sm text-justify leading-relaxed"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {description}
        </motion.p>

        <motion.div
          className="flex justify-center gap-3 flex-wrap"
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
              className="relative group/btn flex items-center gap-2 border border-black dark:border-white rounded-full py-1 px-4 text-sm font-medium overflow-hidden"
              whileHover={hoverScale}
              whileTap={tapScale}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={transitions.fast}
              />

              <LuCodeXml className="text-xl relative z-10 group-hover/btn:text-white transition-colors" />
              <span className="relative z-10 group-hover/btn:text-white transition-colors">
                Front
              </span>
            </motion.a>
          )}

          {codeUrlBack && (
            <motion.a
              href={codeUrlBack}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group/btn flex items-center gap-2 border border-black dark:border-white rounded-full py-1 px-4 text-sm font-medium overflow-hidden"
              whileHover={hoverScale}
              whileTap={tapScale}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={transitions.fast}
              />

              <LuCodeXml className="text-xl relative z-10 group-hover/btn:text-white transition-colors" />
              <span className="relative z-10 group-hover/btn:text-white transition-colors">
                Back
              </span>
            </motion.a>
          )}

          {previewUrl && (
            <motion.a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group/btn flex items-center gap-2 border border-black dark:border-white rounded-full py-1 px-4 text-sm font-medium overflow-hidden"
              whileHover={hoverScale}
              whileTap={tapScale}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={transitions.fast}
              />

              <IoIosLink className="text-xl relative z-10 group-hover/btn:text-white transition-colors" />
              <span className="relative z-10 group-hover/btn:text-white transition-colors">
                Deploy
              </span>
            </motion.a>
          )}
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h6 className="text-sm font-semibold">
            {t("projectCard.technologies")}
          </h6>
          <div className="flex flex-wrap gap-3 text-3xl justify-center">
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
