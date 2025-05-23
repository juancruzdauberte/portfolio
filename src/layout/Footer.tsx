import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TbMailShare } from "react-icons/tb";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <section className="flex flex-col gap-5 py-8 items-center">
      <section>
        <span className="font-bold md:text-2xl">© Juan Cruz Dauberte</span>
      </section>

      <section className="flex gap-1 md:gap-2 right-1 md:right-4">
        <motion.a
          whileHover={{
            boxShadow: "0 0 10px rgba(59, 130, 246, 0.6)",
            scale: 1.08,
          }}
          transition={{ duration: 0.02 }}
          href="https://www.linkedin.com/in/juancruzdauberte/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center border border-black rounded-full p-1 md:p-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white transition"
        >
          <FaLinkedin />
        </motion.a>
        <motion.a
          whileHover={{
            boxShadow: "0 0 10px rgba(59, 130, 246, 0.6)",
            scale: 1.08,
          }}
          transition={{ duration: 0.02 }}
          href="https://github.com/juancruzdauberte"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center border border-black rounded-full p-1 md:p-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white transition"
        >
          <FaGithub />
        </motion.a>
        <motion.a
          whileHover={{
            boxShadow: "0 0 10px rgba(59, 130, 246, 0.6)",
            scale: 1.08,
          }}
          transition={{ duration: 0.02 }}
          href="https://github.com/juancruzdauberte"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center border border-black rounded-full p-1 md:p-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white transition"
        >
          <TbMailShare />
        </motion.a>
      </section>
    </section>
  );
};
