import { FiUser } from "react-icons/fi";
import Cv from "../../public/download/Curriculum Vitae Juan Cruz Dauberte.pdf";

export const AboutMe = () => {
  return (
    <section id="sobre-mi" className="w-full max-w-4xl flex flex-col">
      <section className="flex items-center gap-2">
        <FiUser className="text-3xl md:text-4xl text-blue-950 dark:text-blue-600" />
        <h3 className="text-2xl md:text-3xl font-bold text-blue-950 dark:text-blue-600">
          Sobre Mi
        </h3>
      </section>
      <section className="">
        <a
          href={Cv}
          download={"Curriculum Vitae Juan Cruz Dauberte"}
          className="border rounded-full border-black px-4 py-1  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white"
        >
          Descargar Cv
        </a>
      </section>
    </section>
  );
};
