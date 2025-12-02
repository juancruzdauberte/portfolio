import { FiUser } from "react-icons/fi";
const Cv = "/download/Curriculum Vitae Juan Cruz Dauberte.pdf";
import { PiFilePdf } from "react-icons/pi";
import { StudiesCard } from "../common/StudiesCard";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const AboutMe = () => {
  const { t } = useTranslation();

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className="w-full max-w-5xl flex flex-col px-4 sm:px-6">
      {/* Título con animación y colores de tema */}
      <motion.section
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex items-center gap-2"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 5,
          }}
        >
          <FiUser className="text-3xl md:text-4xl text-theme-accent-blue-dark" />
        </motion.div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-theme-accent-blue-dark">
          {t("about.title")}
        </h3>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col gap-10 sm:gap-12 md:gap-16"
      >
        {/* Descripción personal */}
        <motion.section
          variants={itemVariants}
          className="flex flex-col gap-3 sm:gap-4 md:gap-5 mt-3"
        >
          <motion.p
            variants={itemVariants}
            className="relative text-theme-text-primary"
          >
            {/* Efecto de subrayado animado con colores de tema */}
            <motion.span
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-theme-accent-blue to-theme-accent-purple"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            {t("about.description")}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col relative"
          >
            {/* Línea decorativa lateral con color de tema */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-theme-accent-blue to-theme-accent-blue-dark rounded-full"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <p className="text-base sm:text-lg md:text-xl text-theme-accent-blue mb-1 pl-3 sm:pl-4">
              {t("about.besides")}
            </p>
            <p className="pl-3 sm:pl-4 text-sm sm:text-base text-theme-text-secondary">
              {t("about.descriptionBesides")}
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.a
              href={Cv}
              download={"Curriculum Vitae Juan Cruz Dauberte"}
              className="relative group flex items-center gap-1 border rounded-full border-theme-border-secondary p-0.5 w-36 sm:w-40 md:w-48 justify-center overflow-hidden text-sm sm:text-base transition-colors"
              rel="noopener noreferrer"
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

              <PiFilePdf className="relative z-10 transition-colors text-xl sm:text-2xl text-theme-text-primary" />
              <span className="relative z-10 transition-colors text-theme-text-primary">
                {t("about.download")}
              </span>
            </motion.a>
          </motion.div>
        </motion.section>

        {/* Sección de estudios */}
        <motion.section variants={itemVariants}>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h5 className="text-lg sm:text-xl md:text-2xl font-semibold text-theme-accent-blue relative inline-block">
              {t("about.titleStudies")}
              {/* Subrayado animado con color de tema */}
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-theme-accent-blue"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </h5>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-6 sm:gap-8 md:gap-10 mt-3 justify-center lg:justify-start"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {[
              {
                title: t("studies.analystIt.title"),
                academy: t("studies.analystIt.academy"),
                timelaps: t("studies.analystIt.timeLaps"),
              },
              {
                title: t("studies.webDevelopment.title"),
                academy: "Coderhouse",
                timelaps: t("studies.webDevelopment.timeLaps"),
                description:
                  "HTML - CSS - BOOTSTRAP - SASS - SEO - GIT - GITHUB",
                credentialUrl:
                  "https://pub.coderhouse.com/certificates/e308b2ba-a656-45eb-bf88-925ee34aa3dd?v=1",
              },
              {
                title: "Javascript",
                academy: "Coderhouse",
                timelaps: t("studies.js.timeLaps"),
                description: t("studies.js.description"),
                credentialUrl:
                  "https://pub.coderhouse.com/certificates/46f837e2-56cf-4135-90a7-ed28201f888e?v=1",
              },
              {
                title: "React JS",
                academy: "Coderhouse",
                timelaps: t("studies.react.timeLaps"),
                description: t("studies.react.description"),
                credentialUrl:
                  "https://pub.coderhouse.com/certificates/99644ed7-538e-477d-adbd-679770553ce8?v=1",
              },
              {
                title: t("studies.backI.title"),
                academy: "Coderhouse",
                timelaps: t("studies.backI.timeLaps"),
                description:
                  "API REST - EXPRESS - MONGODB - MONGOOSE - WEBSOCKETS - HANDLEBARS - ROUTER - MULTER",
                credentialUrl:
                  "https://pub.coderhouse.com/certificates/48cd567f-32a6-46a1-93b5-fe4a0bda97e4?v=1",
              },
              {
                title: t("studies.data.title"),
                academy: t("studies.data.academy"),
                timelaps: t("studies.data.timeLaps"),
                description: t("studies.data.description"),
              },
              {
                title: t("studies.data2.title"),
                academy: t("studies.data2.academy"),
                timelaps: t("studies.data2.timeLaps"),
                description: t("studies.data2.description"),
              },
            ].map((study, index) => (
              <motion.div key={index} variants={itemVariants}>
                <StudiesCard {...study} />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </motion.section>
    </section>
  );
};
