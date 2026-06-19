import { GiSkills } from "react-icons/gi";
import { Technologies } from "../common/Technologies";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useReducedMotion, motionSafe } from "../hooks/usePerformance";

export const Skills = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const titleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <section className="w-full max-w-5xl flex flex-col" aria-label="Skills">
      {/* Título animado con colores de tema */}
      <motion.div
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex items-center gap-2 px-3 sm:px-4 md:px-6"
      >
        <motion.div
          {...motionSafe(
            { rotate: [0, 15, -15, 15, 0], scale: [1, 1.1, 1, 1.1, 1] },
            { duration: 2, repeat: Infinity, repeatDelay: 5 },
            prefersReducedMotion
          )}
          aria-hidden="true"
        >
          <GiSkills className="text-3xl md:text-4xl text-theme-accent-blue-dark" />
        </motion.div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-theme-accent-blue-dark relative">
          {t("skills.title")}
          {/* Subrayado animado con colores de tema */}
          <motion.span
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-theme-accent-blue to-theme-accent-purple"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col gap-6 sm:gap-8 md:gap-10 mt-4 sm:mt-5"
      >
        {/* Soft Skills */}
        <motion.div variants={itemVariants} className="relative px-3 sm:px-4 md:px-6">
          <motion.h3
            className="text-lg sm:text-xl md:text-2xl font-semibold text-theme-accent-blue mb-1 relative inline-block"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t("skills.softSkills.title")}
            {/* Subrayado animado con colores de tema */}
            <motion.span
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-theme-accent-blue to-theme-accent-cyan"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-theme-text-secondary"
          >
            {t("skills.softSkills.description")}
          </motion.p>
        </motion.div>

        {/* Tech Skills */}
        <motion.div variants={itemVariants} className="relative">
          <div className="px-3 sm:px-4 md:px-6">
          <motion.h3
            className="text-lg sm:text-xl md:text-2xl font-semibold text-theme-accent-blue mb-1 relative inline-block"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t("skills.techSkills.title")}
            {/* Subrayado animado con colores de tema */}
            <motion.span
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-theme-accent-purple to-theme-accent-pink"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
          </motion.h3>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Technologies />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
