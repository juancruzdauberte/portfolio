import { Link } from "react-scroll";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useState } from "react";
import { HiMiniBars3, HiXMark } from "react-icons/hi2";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const { darkMode, toggleDarkMode } = useTheme();
  console.log(darkMode);
  return (
    <nav className="relative max-w-7xl mx-auto flex items-center justify-between ">
      <button
        onClick={toggleMenu}
        className="md:hidden text-2xl"
        aria-label="Abrir menú"
      >
        {menuOpen ? <HiXMark /> : <HiMiniBars3 />}
      </button>

      <ul
        className={`
          flex flex-col absolute top-10 w-full bg-customMenu  px-6 py-4 gap-4 z-10
          md:flex-row md:w-auto md:p-0 md:gap-6 md:bg-transparent
          md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2
          transition-all duration-300 ease-in-out
          ${menuOpen ? "block" : "hidden md:flex"}
        `}
      >
        <li>
          <Link
            to="proyectos"
            smooth={true}
            duration={500}
            offset={-80}
            className="cursor-pointer hover:text-blue-400 transition"
            onClick={() => setMenuOpen(false)}
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
            onClick={() => setMenuOpen(false)}
          >
            Experiencia
          </Link>
        </li>
        <li>
          <a href="mailto:juandauberte@gmail.com">Contacto</a>
        </li>
      </ul>

      <div className="flex gap-4 ml-auto">
        <a
          href="https://www.linkedin.com/in/juancruzdauberte/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border border-black rounded-full px-2 md:px-4 py-1  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white transition"
        >
          <FaLinkedin />
          <span className="hidden lg:inline">Linkedin</span>
        </a>
        <a
          href="https://github.com/juancruzdauberte"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border border-black rounded-full px-2 md:px-4 py-1  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white transition"
        >
          <FaGithub />
          <span className="hidden lg:inline">GitHub</span>
        </a>

        <button
          onClick={toggleDarkMode}
          className="border border-black rounded-full px-2  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white transition"
        >
          {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </button>
      </div>
    </nav>
  );
};
