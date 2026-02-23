import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { PiFilePdf } from "react-icons/pi";
import { TbMailShare } from "react-icons/tb";
import { MdKeyboardArrowDown } from "react-icons/md";
import { scrollToSection } from "../utils/scrollUtils";

const cvEs = "/download/Curriculum Vitae Juan Cruz Dauberte.pdf";
const cvEn = "/download/Curriculum Vitae Juan Cruz Dauberte Inglés.pdf";

export const Hero = () => {
  const { t, i18n } = useTranslation();

  const currentCv = i18n.language === "en" ? cvEn : cvEs;

  // Variantes de animación para los elementos
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section className="w-full min-h-dvh flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 relative px-4 sm:px-6">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-16 z-10"
      >
        {/* Imagen de perfil con efectos avanzados */}
        <motion.div
          variants={imageVariants}
          whileHover={{
            scale: 1.05,
            rotate: [0, -2, 2, -2, 0],
            transition: { duration: 0.5 },
          }}
          className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 flex items-center justify-center flex-shrink-0"
        >
          {/* Anillo animado con colores de tema */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 border-2 border-transparent border-t-theme-accent-blue border-r-theme-accent-purple rounded-full"
          />

          {/* Segundo anillo */}
          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 border-2 border-transparent border-b-theme-accent-cyan border-l-theme-accent-pink rounded-full"
          />

          {/* Glow effect con color de tema */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-theme-accent-blue/30 rounded-full blur-2xl"
          />

          <div className="relative w-full h-full border-2 rounded-full overflow-hidden border-theme-bg-secondary shadow-theme-2xl ring-2 ring-theme-border-primary/50">
            <img
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1771854226/juan_kg7knw.jpg"
              alt="Foto de perfil de Juan Cruz"
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>

        <motion.div
          variants={textContainerVariants}
          className="flex flex-col gap-3 sm:gap-4 text-center md:text-left items-center md:items-start"
        >
          <div className="flex flex-col gap-1 sm:gap-2">
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
            >
              <span className="text-transparent bg-clip-text bg-gradient-primary bg-[length:200%_auto] animate-gradient-shift">
                Juan Cruz Dauberte
              </span>
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl font-medium text-theme-accent-blue dark:text-theme-accent-blue-light"
            >
              {t("home.titles")}
            </motion.h2>
          </div>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-lg text-theme-text-secondary max-w-xl leading-relaxed mt-2 sm:mt-4 text-center md:text-left px-4 sm:px-0"
          >
            {t("home.description")}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-2.5 sm:gap-4 justify-center md:justify-start mt-4 sm:mt-6"
          >
            {[
              {
                href: "https://www.linkedin.com/in/juancruzdauberte/",
                icon: <FaLinkedin />,
                text: "Linkedin",
              },
              {
                href: "https://github.com/juancruzdauberte",
                icon: <FaGithub />,
                text: "GitHub",
              },
              {
                href: "mailto:juandauberte@gmail.com",
                icon: <TbMailShare />,
                text: t("home.contactMe"),
              },
              {
                href: currentCv,
                icon: <PiFilePdf size={20} />,
                text: t("about.download"),
              },
            ].map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group flex items-center justify-center gap-1.5 sm:gap-2 border border-theme-border-secondary rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-base font-medium overflow-hidden whitespace-nowrap transition-all shadow-sm hover:shadow-md from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800"
                whileHover={{
                  scale: 1.05,
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {/* Fondo gradiente animado */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <span className="relative z-10 transition-colors duration-300 text-theme-text-secondary group-hover:text-white flex items-center gap-1.5 sm:gap-2">
                  <span className="text-base sm:text-lg">{link.icon}</span>
                  <span>{link.text}</span>
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, 15, 0],
        }}
        transition={{
          opacity: { delay: 1, duration: 0.5 },
          y: {
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          },
        }}
        className="cursor-pointer absolute bottom-14 lg:bottom-12 z-10 mt-2 sm:mt-0"
      >
        <button
          type="button"
          onClick={() => scrollToSection("experiencia", 120)}
          className="cursor-pointer"
          aria-label="Scroll to About Me section"
        >
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <MdKeyboardArrowDown className="text-theme-accent-blue text-3xl sm:text-4xl md:text-5xl" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};
