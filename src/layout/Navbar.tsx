import { Link } from "react-scroll";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useState } from "react";
import { HiMiniBars3, HiXMark } from "react-icons/hi2";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";
import Modal from "react-modal";
Modal.setAppElement("#root");

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const openModal = (): void => setMenuOpen(true);
  const closeModal = (): void => setMenuOpen(false);

  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="relative max-w-7xl mx-auto flex items-center justify-between">
      {menuOpen ? (
        <button
          onClick={closeModal}
          className="md:hidden text-2xl"
          aria-label="Abrir menú"
        >
          <HiXMark />
        </button>
      ) : (
        <button
          onClick={openModal}
          className="md:hidden text-2xl"
          aria-label="Abrir menú"
        >
          <HiMiniBars3 />
        </button>
      )}

      <ul
        className="hidden md:flex md:flex-row md:w-auto md:p-0 md:gap-6 md:bg-transparent 
        md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
      >
        <li>
          <Link
            to="proyectos"
            smooth={true}
            duration={500}
            offset={-80}
            className="cursor-pointer hover:text-blue-400 transition"
          >
            Proyectos
          </Link>
        </li>
        <li>
          <Link
            to="experiencia"
            smooth={true}
            duration={500}
            offset={-80}
            className="cursor-pointer hover:text-blue-400 transition"
          >
            Experiencia
          </Link>
        </li>
        <li>
          <Link
            to="sobre-mi"
            smooth={true}
            duration={500}
            offset={-80}
            className="cursor-pointer hover:text-blue-400 transition"
          >
            Sobre Mi
          </Link>
        </li>
        <li>
          <a href="mailto:juandauberte@gmail.com">Contacto</a>
        </li>
      </ul>

      <div className="flex gap-2 md:gap-4 ml-auto">
        <a
          href="https://www.linkedin.com/in/juancruzdauberte/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border border-black rounded-full  py-1 px-2 lg:px-4 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white transition"
        >
          <FaLinkedin />
          <span className="hidden lg:inline">Linkedin</span>
        </a>
        <a
          href="https://github.com/juancruzdauberte"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border border-black rounded-full py-1 px-2 lg:px-4 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white transition"
        >
          <FaGithub />
          <span className="hidden lg:inline">GitHub</span>
        </a>

        <button
          onClick={toggleDarkMode}
          className="border border-black rounded-full p-1.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white transition"
        >
          {darkMode ? (
            <MdOutlineLightMode className="text-xl" />
          ) : (
            <MdOutlineDarkMode className="text-xl" />
          )}
        </button>
      </div>

      <Modal
        isOpen={menuOpen}
        onRequestClose={closeModal}
        contentLabel="Menú móvil"
        className=" text-black dark:text-white bg-white dark:bg-zinc-900 absolute flex left-0 top-16 p-6 w-52 max-w-md mx-auto outline-none md:hidden"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex md:hidden"
      >
        <ul className="flex flex-col items-start gap-4 text-center">
          <li>
            <Link
              to="proyectos"
              smooth={true}
              duration={500}
              offset={-80}
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={closeModal}
            >
              Proyectos
            </Link>
          </li>
          <li>
            <Link
              to="experiencia"
              smooth={true}
              duration={500}
              offset={-80}
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={closeModal}
            >
              Experiencia
            </Link>
          </li>
          <li>
            <a
              href="mailto:juandauberte@gmail.com"
              className="hover:text-blue-400 transition"
              onClick={closeModal}
            >
              Contacto
            </a>
          </li>
        </ul>
      </Modal>
    </nav>
  );
};
