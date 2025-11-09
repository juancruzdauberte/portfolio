import { useTranslation } from "react-i18next";
import { LiaSuitcaseSolid } from "react-icons/lia";
import { motion } from "framer-motion";

export const Experience = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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

  const listItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  return (
    <section className="w-full max-w-5xl flex flex-col px-4 sm:px-6">
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
            rotate: [0, -10, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 5,
          }}
        >
          <LiaSuitcaseSolid className="text-3xl md:text-4xl text-theme-accent-blue-dark" />
        </motion.div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-theme-accent-blue-dark">
          {t("experience.title")}
        </h3>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col gap-16 sm:gap-24 md:gap-32 mt-6 sm:mt-8 md:mt-10"
      >
        {/* Experiencia 1 - Habitium */}
        <motion.section
          variants={itemVariants}
          className="relative flex flex-col gap-8"
        >
          {/* Línea vertical decorativa con colores de tema */}
          <motion.div
            className="absolute -left-4 sm:-left-6 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-theme-accent-blue via-theme-accent-purple to-transparent rounded-full"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          />

          {/* Punto decorativo con color de tema */}
          <motion.div
            className="absolute -left-6 sm:-left-8 top-0 w-3 h-3 sm:w-4 sm:h-4 bg-theme-accent-blue rounded-full"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-theme-accent-blue rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </motion.div>

          <div className="flex flex-col gap-2">
            <motion.h4
              className="text-lg sm:text-xl md:text-2xl font-semibold relative inline-block text-theme-text-primary"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Reformam Network 2010 SL - Habitium MDF
              {/* Subrayado animado con colores de tema */}
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-theme-accent-blue to-theme-accent-purple"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.h4>

            <motion.span
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-theme-accent-blue font-medium text-sm sm:text-base"
            >
              {t("experience.hb.timeLaps")}
            </motion.span>
          </div>

          <div className="flex flex-col gap-2">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-theme-text-secondary"
            >
              {t("experience.hb.description")}
            </motion.p>

            <motion.ul
              className="list-none space-y-2 mx-1 sm:mx-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                "Home Office.",
                t("experience.hb.orders"),
                t("experience.hb.catalog"),
                t("experience.hb.communication"),
                t("experience.hb.trelloPresta"),
              ].map((item, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  variants={listItemVariants}
                  className="flex items-start gap-1.5 sm:gap-2 text-sm sm:text-base text-theme-text-secondary"
                >
                  <motion.span
                    className="text-theme-accent-blue font-bold mt-1"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                  >
                    ▹
                  </motion.span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.section>

        {/* Experiencia 2 - Siderman Law */}
        <motion.section
          variants={itemVariants}
          className="relative flex flex-col gap-8"
        >
          {/* Línea vertical decorativa con colores de tema */}
          <motion.div
            className="absolute -left-4 sm:-left-6 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-theme-accent-purple via-theme-accent-pink to-transparent rounded-full"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          />

          {/* Punto decorativo con color de tema */}
          <motion.div
            className="absolute -left-6 sm:-left-8 top-0 w-3 h-3 sm:w-4 sm:h-4 bg-theme-accent-purple rounded-full"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-theme-accent-purple rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </motion.div>

          <div className="flex flex-col gap-2">
            <motion.h5
              className="text-xl md:text-2xl font-semibold relative inline-block text-theme-text-primary"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Call Center - Siderman Law
              {/* Subrayado animado con colores de tema */}
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-theme-accent-purple to-theme-accent-pink"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.h5>

            <motion.span
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-theme-accent-purple font-medium text-sm sm:text-base"
            >
              {t("experience.sl.timeLaps")}
            </motion.span>
          </div>

          <div className="flex flex-col gap-2">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-theme-text-secondary"
            >
              {t("experience.sl.description")}
            </motion.p>

            <motion.ul
              className="list-none space-y-2 mx-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                "Home Office.",
                t("experience.sl.communication"),
                t("experience.sl.ic"),
              ].map((item, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  variants={listItemVariants}
                  className="flex items-start gap-2 text-theme-text-secondary"
                >
                  <motion.span
                    className="text-theme-accent-purple font-bold mt-1"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                  >
                    ▹
                  </motion.span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.section>
      </motion.section>
    </section>
  );
};
