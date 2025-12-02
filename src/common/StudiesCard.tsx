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
        transition: { duration: 0.3 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative p-1 w-full max-w-[400px] h-full group"
    >
      {/* Borde gradiente animado con colores de tema */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-theme-accent-blue via-theme-accent-purple to-theme-accent-pink rounded-lg"
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
                "0 0 20px rgba(var(--accent-blue), 0.3)",
                "0 0 40px rgba(var(--accent-purple), 0.4)",
                "0 0 20px rgba(var(--accent-blue), 0.3)",
              ]
            : "0 0 0px rgba(var(--accent-blue), 0)",
        }}
        transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
      />

      <div className="relative bg-theme-bg-secondary px-4 sm:px-6 py-3 sm:py-4 flex flex-col gap-2 sm:gap-3 w-full h-full rounded-lg transition-colors">
        {/* Partículas decorativas con color de tema */}
        <motion.div
          className="absolute top-2 right-2 w-2 h-2 bg-theme-accent-blue rounded-full"
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
          className="text-theme-accent-blue font-semibold text-lg sm:text-xl relative"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {title}
          {/* Subrayado animado con colores de tema */}
          <motion.span
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-theme-accent-blue to-theme-accent-purple"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.h5>

        <motion.span
          className="text-base sm:text-lg text-theme-text-secondary"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {timelaps}
        </motion.span>

        <motion.span
          className="text-base sm:text-lg font-semibold text-theme-text-primary"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {academy}
        </motion.span>

        {description && (
          <motion.p
            className="text-sm text-theme-text-tertiary"
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
            className="relative group/btn flex text-xs sm:text-sm max-w-32 sm:max-w-36 gap-1 items-center justify-center border border-theme-border-secondary rounded-full p-0.5 sm:p-1 overflow-hidden transition-colors"
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
            {/* Fondo animado con colores de tema */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-theme-accent-blue to-theme-accent-purple"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />

            {/* Efecto de brillo */}
            <motion.div
              className="absolute inset-0 bg-white dark:bg-white/20"
              initial={{ x: "-100%", opacity: 0 }}
              whileHover={{
                x: "100%",
                opacity: [0, 0.3, 0],
              }}
              transition={{ duration: 0.6 }}
            />

            <span className="relative z-10 transition-colors text-theme-text-primary">
              {t("studies.certificate")}
            </span>
            <GoArrowUpRight
              size={16}
              className="relative z-10 transition-colors text-theme-text-primary"
            />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};
