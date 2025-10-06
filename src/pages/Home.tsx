import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { PiFilePdf } from "react-icons/pi";
import { TbMailShare } from "react-icons/tb";
import { MdKeyboardArrowDown } from "react-icons/md";
import cv from "../../public/download/Curriculum Vitae Juan Cruz Dauberte.pdf";
import { Link } from "react-scroll";

export const Home = () => {
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
    <section className="w-full min-h-dvh flex flex-col items-center justify-center gap-10 relative">
      {/* Partículas flotantes de fondo - Contenidas */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-6 md:gap-20 z-10 px-4"
      >
        {/* Imagen de perfil con efectos avanzados */}
        <motion.div
          variants={imageVariants}
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -5, 5, -5, 0],
            transition: { duration: 0.5 }
          }}
          className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center flex-shrink-0"
        >
          {/* Anillo animado detrás de la imagen */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 border-2 border-transparent border-t-blue-500 border-r-purple-500 rounded-full"
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
            className="absolute inset-0 border-2 border-transparent border-b-cyan-500 border-l-pink-500 rounded-full"
          />

          {/* Glow effect */}
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
            className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"
          />

          <div className="relative w-full h-full border-2 rounded-full overflow-hidden border-white dark:border-gray-700 shadow-2xl">
            <img
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1745434137/Juann_txw3oo.jpg"
              alt="Foto de perfil de Juan Cruz"
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-2 text-center md:text-left">
          <h1 className="flex flex-wrap items-center gap-2 text-lg sm:text-xl md:text-2xl justify-center md:justify-start">
            <motion.p 
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-[length:200%_100%] font-bold text-xl sm:text-2xl md:text-3xl"
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
            className="font-semibold text-blue-900 dark:text-blue-100 text-sm sm:text-base md:text-lg"
          >
            {t("home.titles")}
          </motion.span>
        </motion.div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-4 text-center px-4 sm:px-6 max-w-3xl w-full z-10"
      >
        <motion.p 
          variants={itemVariants}
          className="text-sm sm:text-base md:text-lg"
        >
          {t("home.description")}
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap gap-3 justify-center"
        >
          {[
            { 
              href: "https://www.linkedin.com/in/juancruzdauberte/", 
              icon: <FaLinkedin />, 
              text: "Linkedin",
              color: "from-blue-500 to-blue-700"
            },
            { 
              href: "https://github.com/juancruzdauberte", 
              icon: <FaGithub />, 
              text: "GitHub",
              color: "from-gray-700 to-gray-900"
            },
            { 
              href: "mailto:juandauberte@gmail.com", 
              icon: <TbMailShare />, 
              text: t("home.contactMe"),
              color: "from-red-500 to-pink-600"
            },
            { 
              href: cv, 
              icon: <PiFilePdf size={20} />, 
              text: t("about.download"),
              color: "from-green-500 to-emerald-600"
            },
          ].map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group flex items-center justify-center gap-2 border border-black dark:border-white rounded-full px-3 py-1 text-sm sm:text-base overflow-hidden whitespace-nowrap"
              whileHover={{ 
                scale: 1.05,
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/* Fondo gradiente animado */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-100`}
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

              <span className="relative z-10 group-hover:text-white transition-colors">
                {link.icon}
              </span>
              <span className="relative z-10 group-hover:text-white transition-colors">
                {link.text}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </motion.section>

      {/* Flecha animada */}
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
            ease: "easeInOut"
          }
        }}
        className="cursor-pointer lg:absolute lg:bottom-14 z-10"
      >
        <Link to="sobre-mi" smooth={true} duration={500} offset={-80}>
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <MdKeyboardArrowDown size={35} className="text-blue-500" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
};
