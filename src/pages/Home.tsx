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

  return (
    <section className="w-full min-h-dvh flex flex-col items-center justify-center gap-10 relative">
      <section className="max-w-4xl flex flex-col md:flex-row items-center gap-6 md:gap-20">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="w-28 h-28 md:w-36 md:h-36 flex items-center justify-center border-2 rounded-full overflow-hidden"
        >
          <img
            src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1745434137/Juann_txw3oo.jpg"
            alt="Foto de perfil de Juan Cruz"
            className="object-cover w-full h-full"
          />
        </motion.div>
        <div className="flex flex-col gap-2">
          <h1 className="flex flex-wrap items-center gap-2 text-lg sm:text-xl md:text-2xl justify-center md:justify-start">
            <motion.p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-100 to-blue-400 bg-[length:200%_100%] animate-shine font-bold text-xl sm:text-2xl md:text-3xl">
              Juan Cruz Dauberte
            </motion.p>
          </h1>
          <span className="font-semibold text-blue-900 dark:text-blue-100 text-sm sm:text-base md:text-lg">
            {t("home.titles")}
          </span>
        </div>
      </section>

      <section className="flex flex-col gap-4 text-center px-2 sm:px-4 max-w-3xl">
        <p className="text-sm sm:text-base md:text-lg">
          {t("home.description")}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <motion.a
            whileHover={{
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
              scale: 1.03,
            }}
            transition={{ duration: 0.07 }}
            href="https://www.linkedin.com/in/juancruzdauberte/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-black dark:border-white rounded-full px-3 py-1 text-sm sm:text-base hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          >
            <FaLinkedin />
            <span>Linkedin</span>
          </motion.a>

          <motion.a
            whileHover={{
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
              scale: 1.03,
            }}
            transition={{ duration: 0.07 }}
            href="https://github.com/juancruzdauberte"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-black dark:border-white rounded-full px-3 py-1 text-sm sm:text-base hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          >
            <FaGithub />
            <span>GitHub</span>
          </motion.a>

          <motion.a
            whileHover={{
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
              scale: 1.03,
            }}
            transition={{ duration: 0.07 }}
            href="mailto:juandauberte@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-black dark:border-white rounded-full px-3 py-1 text-sm sm:text-base hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          >
            <TbMailShare />
            <span>{t("home.contactMe")}</span>
          </motion.a>

          <motion.a
            whileHover={{
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
              scale: 1.03,
            }}
            transition={{ duration: 0.07 }}
            href={cv}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-black dark:border-white rounded-full px-3 py-1 text-sm sm:text-base hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          >
            <PiFilePdf size={20} />
            <span>{t("about.download")}</span>
          </motion.a>
        </div>
      </section>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="cursor-pointer lg:absolute lg:bottom-14"
      >
        <Link to="sobre-mi" smooth={true} duration={500} offset={-80}>
          <MdKeyboardArrowDown size={35} className="text-blue-500" />
        </Link>
      </motion.div>
    </section>
  );
};
