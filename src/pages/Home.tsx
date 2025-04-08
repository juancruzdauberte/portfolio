import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TbMailShare } from "react-icons/tb";

export const Home = () => {
  return (
    <section className="w-full max-w-4xl flex flex-col gap-4">
      <section className="flex items-center gap-10">
        <div className="w-24 h-24 min-w-24 min-h-24 flex items-center justify-center border-2 rounded-full overflow-hidden ">
          <img
            src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1744068618/juan_zktnyx.png"
            alt="Foto de perfil de Juan Cruz"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1>Hola, soy Juan Cruz Dauberte</h1>
          <span>Analista en Informática - Desarrollador Web</span>
        </div>
      </section>

      <div className="">
        <p className="">
          Analista en Informática y Desarrollador Web. Creo soluciones
          tecnológicas a los desafios o problemas que se propongan
        </p>
      </div>
      <div className="flex flex-col sm:flex-row  gap-4">
        <div className="flex flex-wrap gap-4">
          <a
            href="https://www.linkedin.com/in/juancruzdauberte/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border  border-black rounded-full px-2 md:px-4 py-1  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white transition"
          >
            <FaLinkedin />
            <span className="">Linkedin</span>
          </a>
          <a
            href="https://github.com/juancruzdauberte"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-black rounded-full px-2 md:px-4 py-1  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white transition"
          >
            <FaGithub />
            <span className=" ">GitHub</span>
          </a>
          <a
            href="mailto:juandauberte@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-black rounded-full px-2 md:px-4 py-1  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white transition"
          >
            <TbMailShare />
            <span className="">Contáctame</span>
          </a>
        </div>
      </div>
    </section>
  );
};
