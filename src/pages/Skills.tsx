import { GiSkills } from "react-icons/gi";
import { Technologies } from "../common/Technologies";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export const Skills = () => {
  const { t } = useTranslation();

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
        type: "spring",
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
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="habilidades"
      className="w-full max-w-5xl flex flex-col px-4 sm:px-6"
    >
      {/* Título animado con colores de tema */}
      <motion.section
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex items-center gap-2"
      >
        <motion.div
          animate={{
            rotate: [0, 15, -15, 15, 0],
            scale: [1, 1.1, 1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 5,
          }}
        >
          <GiSkills className="text-3xl md:text-4xl text-theme-accent-blue-dark" />
        </motion.div>
        <h5 className="text-xl sm:text-2xl md:text-3xl font-bold text-theme-accent-blue-dark relative">
          {t("skills.title")}
          {/* Subrayado animado con colores de tema */}
          <motion.span
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-theme-accent-blue to-theme-accent-purple"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </h5>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col gap-6 sm:gap-8 md:gap-10 mt-4 sm:mt-5"
      >
        {/* Soft Skills */}
        <motion.section variants={itemVariants} className="relative">
          <motion.h6
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
          </motion.h6>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-theme-text-secondary"
          >
            {t("skills.softSkills.description")}
          </motion.p>
        </motion.section>

        {/* Tech Skills */}
        <motion.section variants={itemVariants} className="relative">
          <motion.p
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
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Technologies />
          </motion.div>
        </motion.section>
      </motion.section>
    </section>
  );
};
