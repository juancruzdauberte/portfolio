import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TbMailShare } from "react-icons/tb";

export const Footer = () => {
  return (
    <section className="flex py-8 items-center">
      <section>
        <span className="">© Juan Cruz Dauberte</span>
      </section>

      <section className="absolute flex gap-1 md:gap-2 right-1 md:right-4">
        <a
          href="https://www.linkedin.com/in/juancruzdauberte/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center border border-black rounded-full py-1 px-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white transition"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/juancruzdauberte"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center border border-black rounded-full py-1 px-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white transition"
        >
          <FaGithub />
        </a>
        <a
          href="https://github.com/juancruzdauberte"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center border border-black rounded-full py-1 px-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white transition"
        >
          <TbMailShare />
        </a>
      </section>
    </section>
  );
};
