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
    <nav className="relative w-full max-w-7xl mx-auto flex items-center justify-center px-4 sm:px-6 md:px-8 py-2">
      {/* Botón de menú móvil - IZQUIERDA */}
      <AnimatePresence mode="wait">
        {!menuOpen && (
          <motion.button
            key="menu-button"
            onClick={openModal}
            className="md:hidden absolute left-2 z-50 p-2 rounded-lg hover:bg-theme-bg-tertiary/50 text-theme-text-primary transition-colors"
            aria-label="Abrir menú"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <HiMiniBars3 className="text-2xl" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Menú desktop - CENTRO */}
      <motion.ul
        className="hidden md:flex flex-row gap-6 lg:gap-8 items-center text-sm lg:text-base font-medium"
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
              spy={true}
              smooth={true}
              duration={500}
              offset={-100}
              className="relative cursor-pointer group block"
              activeClass="text-theme-accent-blue"
            >
              <motion.span
                className="relative z-10 text-theme-text-primary hover:text-theme-accent-blue transition-colors duration-200"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.span>

              {/* Subrayado animado */}
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-theme-accent-blue to-theme-accent-purple"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
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
            className="relative cursor-pointer group block"
          >
            <motion.span
              className="relative z-10 text-theme-text-primary hover:text-theme-accent-blue transition-colors duration-200"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {t("navbar.contact")}
            </motion.span>

            <motion.span
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-theme-accent-blue to-theme-accent-purple"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </a>
        </motion.li>
      </motion.ul>

      {/* Controles (tema e idioma) - DERECHA */}
      <motion.div
        className="absolute right-2 flex items-center md:gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={toggleDarkMode}
          className="relative rounded-lg hover:bg-theme-bg-tertiary/50 text-theme-text-primary transition-colors flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          aria-label="Cambiar tema"
        >
          <motion.div
            animate={{ rotate: darkMode ? 180 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {darkMode ? (
              <MdOutlineLightMode className="text-xl sm:text-2xl" />
            ) : (
              <MdOutlineDarkMode className="text-xl sm:text-2xl" />
            )}
          </motion.div>
        </motion.button>

        <LanguageSelector />
      </motion.div>

      {/* Modal móvil mejorado */}
      <Modal
        isOpen={menuOpen}
        onRequestClose={closeModal}
        contentLabel="Menú móvil"
        className="fixed left-0 top-0 h-full w-[280px] sm:w-[320px] bg-theme-bg-overlay/98 backdrop-blur-xl shadow-theme-2xl border-r border-theme-border-primary/30 transition-colors z-[100] outline-none overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99]"
        closeTimeoutMS={300}
      >
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full h-full flex flex-col p-6 sm:p-8 gap-8"
        >
          {/* Partícula decorativa */}
          <motion.div
            className="absolute top-20 right-6 w-20 h-20 bg-theme-accent-blue/10 rounded-full blur-2xl pointer-events-none"
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

          {/* Botón cerrar */}
          <motion.button
            onClick={closeModal}
            className="self-start p-2 rounded-lg bg-theme-bg-tertiary/50 hover:bg-theme-bg-tertiary transition-colors text-theme-text-primary"
            aria-label="Cerrar menú"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <HiXMark className="text-2xl sm:text-3xl" />
          </motion.button>

          {/* Lista de navegación */}
          <motion.ul
            className="flex flex-col gap-6"
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
            {navItems.map((item, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { x: -50, opacity: 0 },
                  visible: { x: 0, opacity: 1 },
                }}
                whileHover={{ x: 8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Link
                  to={item.to}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-100}
                  className="relative group cursor-pointer block py-2 text-xl sm:text-2xl font-medium"
                  onClick={closeModal}
                  activeClass="text-theme-accent-blue"
                >
                  <span className="relative z-10 text-theme-text-primary group-hover:text-theme-accent-blue transition-colors">
                    {item.label}
                  </span>
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-theme-accent-blue to-theme-accent-purple rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.li>
            ))}

            {/* Separador */}
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-theme-border-primary to-transparent my-2"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />

            {/* Contacto */}
            <motion.li
              variants={{
                hidden: { x: -50, opacity: 0 },
                visible: { x: 0, opacity: 1 },
              }}
              whileHover={{ x: 8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <a
                href="mailto:juandauberte@gmail.com"
                className="relative group cursor-pointer block py-2 text-xl sm:text-2xl font-medium"
                onClick={closeModal}
              >
                <span className="relative z-10 text-theme-text-primary group-hover:text-theme-accent-blue transition-colors">
                  {t("navbar.contact")}
                </span>
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-theme-accent-blue to-theme-accent-purple rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </a>
            </motion.li>
          </motion.ul>
        </motion.div>
      </Modal>
    </nav>
  );
};
