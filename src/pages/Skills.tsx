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
    <section id="habilidades" className="w-full max-w-4xl flex flex-col">
      {/* Título animado */}
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
          <GiSkills className="text-3xl md:text-4xl text-blue-950 dark:text-blue-600" />
        </motion.div>
        <h5 className="text-2xl md:text-3xl font-bold text-blue-950 dark:text-blue-600 relative">
          {t("skills.title")}
          {/* Subrayado animado */}
          <motion.span
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
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
        className="flex flex-col gap-10 mx-4 mt-5"
      >
        {/* Soft Skills */}
        <motion.section variants={itemVariants} className="relative">
          {/* Línea decorativa lateral */}

          <motion.h6
            className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-1 relative inline-block"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t("skills.softSkills.title")}
            {/* Subrayado animado */}
            <motion.span
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"
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
          >
            {t("skills.softSkills.description")}
          </motion.p>
        </motion.section>

        {/* Tech Skills */}
        <motion.section variants={itemVariants} className="relative">
          {/* Línea decorativa lateral */}

          <motion.p
            className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-1 relative inline-block"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t("skills.techSkills.title")}
            {/* Subrayado animado */}
            <motion.span
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
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
