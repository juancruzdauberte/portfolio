import { GoArrowUpRight } from "react-icons/go";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";

type Props = {
  title: string;
  timelaps: string;
  academy: string;
  description?: string;
  credentialUrl?: string;
};

export const StudiesCard = ({
  title,
  timelaps,
  academy,
  description,
  credentialUrl,
}: Props) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative p-1 w-full max-w-[400px] h-full group"
    >
      {/* Borde gradiente animado */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-lg"
        animate={{
          backgroundPosition: isHovered ? ["0% 50%", "100% 50%"] : "0% 50%",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
        transition={{
          duration: 2,
          ease: "linear",
        }}
      />

      {/* Efecto de brillo en los bordes */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={{
          boxShadow: isHovered
            ? [
                "0 0 20px rgba(96, 165, 250, 0.3)",
                "0 0 40px rgba(168, 85, 247, 0.4)",
                "0 0 20px rgba(96, 165, 250, 0.3)",
              ]
            : "0 0 0px rgba(96, 165, 250, 0)",
        }}
        transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
      />

      <div className="relative bg-white dark:bg-black px-4 sm:px-6 py-3 sm:py-4 flex flex-col gap-2 sm:gap-3 w-full h-full rounded-lg">
        {/* Partículas decorativas */}
        <motion.div
          className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.h5
          className="text-blue-500 font-semibold text-lg sm:text-xl relative"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {title}
          {/* Subrayado animado */}
          <motion.span
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.h5>

        <motion.span
          className="text-base sm:text-lg"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {timelaps}
        </motion.span>

        <motion.span
          className="text-base sm:text-lg font-semibold"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {academy}
        </motion.span>

        {description && (
          <motion.p
            className="text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {description}
          </motion.p>
        )}

        {credentialUrl && (
          <motion.a
            className="relative group/btn flex text-xs sm:text-sm max-w-32 sm:max-w-36 gap-1 items-center justify-center border border-black rounded-full p-0.5 sm:p-1 dark:border-white overflow-hidden"
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Fondo animado */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />

            {/* Efecto de brillo */}
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ x: "-100%", opacity: 0 }}
              whileHover={{
                x: "100%",
                opacity: [0, 0.3, 0],
              }}
              transition={{ duration: 0.6 }}
            />

            <span className="relative z-10 group-hover/btn:text-white transition-colors">
              {t("studies.certificate")}
            </span>
            <GoArrowUpRight
              size={16}
              className="relative z-10 group-hover/btn:text-white transition-colors"
            />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};
