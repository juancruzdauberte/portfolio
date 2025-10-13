import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { PiFilePdf } from "react-icons/pi";
import { TbMailShare } from "react-icons/tb";
import { MdKeyboardArrowDown } from "react-icons/md";
import { scrollToSection } from "../utils/scrollUtils";

const cv = "/download/Curriculum Vitae Juan Cruz Dauberte.pdf";

export const Hero = () => {
  const { t } = useTranslation();

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

  return (
    <section
      className="w-full min-h-dvh flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 relative px-4 sm:px-6"
    >
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-center gap-5 sm:gap-6 md:gap-20 z-10"
      >
        {/* Imagen de perfil con efectos avanzados */}
        <motion.div
          variants={imageVariants}
          whileHover={{
            scale: 1.1,
            rotate: [0, -5, 5, -5, 0],
            transition: { duration: 0.5 },
          }}
          className="relative w-36 h-36 flex items-center justify-center flex-shrink-0"
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
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-theme-accent-blue/20 rounded-full blur-xl"
          />

          <div className="relative w-full h-full border-2 rounded-full overflow-hidden border-theme-border-secondary shadow-theme-2xl">
            <img
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1745434137/Juann_txw3oo.jpg"
              alt="Foto de perfil de Juan Cruz"
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-1.5 sm:gap-2 text-center md:text-left"
        >
          <h1 className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-base sm:text-lg md:text-xl lg:text-2xl justify-center md:justify-start">
            <motion.p
              className="text-transparent bg-clip-text bg-gradient-primary bg-[length:200%_100%] font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Juan Cruz Dauberte
            </motion.p>
          </h1>
          <motion.span
            variants={itemVariants}
            className="font-semibold text-theme-accent-blue-dark text-xs sm:text-sm md:text-base lg:text-lg"
          >
            {t("home.titles")}
          </motion.span>
        </motion.div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-3 sm:gap-4 text-center max-w-3xl w-full z-10"
      >
        <motion.p
          variants={itemVariants}
          className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-theme-text-primary"
        >
          {t("home.description")}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-2 sm:gap-3 justify-center"
        >
          {[
            {
              href: "https://www.linkedin.com/in/juancruzdauberte/",
              icon: <FaLinkedin />,
              text: "Linkedin",
              colorFrom: "from-theme-accent-blue",
              colorTo: "to-theme-accent-blue-dark",
            },
            {
              href: "https://github.com/juancruzdauberte",
              icon: <FaGithub />,
              text: "GitHub",
              colorFrom: "from-gray-700",
              colorTo: "to-gray-900 dark:from-gray-600 dark:to-gray-800",
            },
            {
              href: "mailto:juandauberte@gmail.com",
              icon: <TbMailShare />,
              text: t("home.contactMe"),
              colorFrom: "from-theme-accent-pink",
              colorTo: "to-theme-accent-pink-light",
            },
            {
              href: cv,
              icon: <PiFilePdf size={20} />,
              text: t("about.download"),
              colorFrom: "from-theme-accent-green",
              colorTo: "to-red-600 dark:to-emerald-500",
            },
          ].map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group flex items-center justify-center gap-1.5 sm:gap-2 border border-theme-border-secondary rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm md:text-base overflow-hidden whitespace-nowrap transition-colors"
              whileHover={{
                scale: 1.05,
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/* Fondo gradiente animado */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${link.colorFrom} ${link.colorTo} opacity-0 group-hover:opacity-100`}
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 bg-white dark:bg-white/20"
                initial={{ x: "-100%", opacity: 0 }}
                whileHover={{
                  x: "100%",
                  opacity: [0, 0.3, 0],
                }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 group-hover:text-white transition-colors text-base sm:text-lg text-theme-text-primary">
                {link.icon}
              </span>
              <span className="relative z-10 group-hover:text-white transition-colors text-theme-text-primary">
                {link.text}
              </span>
              {/* Efecto de brillo */}
            </motion.a>
          ))}
        </motion.div>
      </motion.section>

      {/* Flecha animada con color de tema */}
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
          onClick={() => scrollToSection("sobre-mi", 120)}
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
