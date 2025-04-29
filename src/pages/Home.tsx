import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TbMailShare } from "react-icons/tb";

export const Home = () => {
  return (
    <section className="w-full max-w-4xl flex flex-col gap-12">
      <section className="flex items-center gap-10">
        <motion.div
          whileHover={{ scale: 1.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="w-24 h-24 md:w-32 md:h-32 min-w-24 min-h-24 flex items-center justify-center border-2 rounded-full overflow-hidden "
        >
          <img
            src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1745434137/Juann_txw3oo.jpg"
            alt="Foto de perfil de Juan Cruz"
          />
        </motion.div>
        <div className="flex flex-col gap-2">
          <h1 className="flex gap-2 md:text-xl">
            Hola, soy
            <motion.p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-100 to-blue-400 bg-[length:200%_100%] animate-shine font-bold text-lg md:text-2xl">
              Juan Cruz Dauberte
            </motion.p>
          </h1>
          <span className="font-semibold text-blue-900 dark:text-blue-100">
            Analista en Informática - Desarrollador Software
          </span>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <section>
          <p className="">
            Analista en Informática y Desarrollador Web. Creo soluciones
            tecnológicas a los desafios o problemas que se propongan.
          </p>
        </section>
        <section className="flex flex-col sm:flex-row">
          <div className="flex flex-wrap gap-3">
            <motion.a
              whileHover={{
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
                scale: 1.03,
              }}
              transition={{ duration: 0.07 }}
              href="https://www.linkedin.com/in/juancruzdauberte/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border  border-black rounded-full px-2 md:px-4 py-1  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white"
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
              className="flex items-center justify-center gap-2 border border-black rounded-full px-2 md:px-4 py-1  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white"
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
              className="flex items-center justify-center gap-2 border border-black rounded-full px-2 md:px-4 py-1  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white "
            >
              <TbMailShare />
              <span>Contáctame</span>
            </motion.a>
          </div>
        </section>
      </section>
    </section>
  );
};
