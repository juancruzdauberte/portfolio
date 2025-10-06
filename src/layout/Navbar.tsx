import { Link } from "react-scroll";
import { useEffect, useState } from "react";
import { HiMiniBars3, HiXMark } from "react-icons/hi2";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "../common/LanguageSelector";

Modal.setAppElement("#root");

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const openModal = (): void => setMenuOpen(true);
  const closeModal = (): void => setMenuOpen(false);

  const { t } = useTranslation();
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const navItems = [
    { to: "sobre-mi", label: t("navbar.aboutMe") },
    { to: "experiencia", label: t("navbar.experience") },
    { to: "proyectos", label: t("navbar.projects") },
    { to: "habilidades", label: t("navbar.skills") },
  ];

  return (
    <nav className="relative max-w-7xl mx-auto flex items-center justify-center">
      <AnimatePresence mode="wait">
        {!menuOpen && (
          <motion.button
            key="menu-button"
            onClick={openModal}
            className="md:hidden text-2xl absolute left-0 z-50"
            aria-label="Abrir menú"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <HiMiniBars3 className="relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Menú desktop - CENTRO */}
      <motion.ul
        className="hidden md:flex md:flex-row md:gap-8 md:items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {navItems.map((item, index) => (
          <motion.li
            key={item.to}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={item.to}
              smooth={true}
              duration={500}
              offset={-80}
              className="relative cursor-pointer group"
            >
              <motion.span
                className="relative z-10 hover:text-blue-500 transition-colors"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.span>

              {/* Subrayado animado */}
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />

              {/* Efecto de glow */}
              <motion.span
                className="absolute inset-0 bg-blue-400/20 rounded blur-md -z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.li>
        ))}

        <motion.li
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: navItems.length * 0.1 }}
        >
          <a
            href="mailto:juandauberte@gmail.com"
            className="relative cursor-pointer group"
          >
            <motion.span
              className="relative z-10 hover:text-blue-500 transition-colors"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {t("navbar.contact")}
            </motion.span>

            <motion.span
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />

            <motion.span
              className="absolute inset-0 bg-blue-400/20 rounded blur-md -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </a>
        </motion.li>
      </motion.ul>

      {/* Controles (tema e idioma) - DERECHA */}
      <motion.div
        className="absolute right-0 flex items-center gap-2 md:gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={toggleDarkMode}
          className="relative border border-black rounded-full p-1 dark:border-white overflow-hidden group"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          aria-label="Cambiar tema"
        >
          {/* Fondo animado */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ x: "-100%" }}
            whileHover={{ x: "0%" }}
            transition={{ duration: 0.3 }}
          />

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-blue-400/50 rounded-full blur-md"
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{ opacity: 1, scale: 1.5 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="relative z-10 group-hover:text-white transition-colors"
            animate={{ rotate: darkMode ? 180 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {darkMode ? (
              <MdOutlineLightMode className="text-xl" />
            ) : (
              <MdOutlineDarkMode className="text-xl" />
            )}
          </motion.div>
        </motion.button>

        <LanguageSelector />
      </motion.div>

      {/* Modal móvil con animaciones mejoradas */}
      <Modal
        isOpen={menuOpen}
        onRequestClose={closeModal}
        contentLabel="Menú móvil"
        className="z-60 text-black dark:text-white bg-white dark:bg-zinc-900 h-full absolute flex left-0 top-0 p-4 w-64 max-w-md mx-auto outline-none md:hidden shadow-2xl"
        overlayClassName="z-50 inset-0 fixed bg-black bg-opacity-50 flex md:hidden"
      >
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full h-full flex flex-col gap-10 relative"
        >
          {/* Partículas decorativas */}
          <motion.div
            className="absolute top-20 right-4 w-16 h-16 bg-blue-400/20 rounded-full blur-2xl"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.button
            onClick={closeModal}
            className="text-2xl cursor-pointer relative z-10 w-fit"
            aria-label="Cerrar menú"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-red-500/20 rounded-full blur-lg"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <HiXMark className="relative z-10" />
          </motion.button>

          <motion.ul
            className="flex flex-col items-start gap-6 text-xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {[
              ...navItems,
              {
                to: "",
                label: t("navbar.contact"),
                href: "mailto:juandauberte@gmail.com",
              },
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { x: -50, opacity: 0 },
                  visible: { x: 0, opacity: 1 },
                }}
                whileHover={{ x: 10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-full"
              >
                <Link
                  to={item.to}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="relative group cursor-pointer block"
                  onClick={closeModal}
                >
                  <span className="relative z-10">{item.label}</span>
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </Modal>
    </nav>
  );
};
