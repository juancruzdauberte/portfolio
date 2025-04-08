import { FiFolder } from "react-icons/fi";

export const Projects = () => {
  return (
    <section id="proyectos" className="w-full max-w-4xl flex flex-col">
      <section className="flex items-center gap-2">
        <FiFolder className="text-3xl md:text-4xl text-blue-950 dark:text-blue-600" />
        <h3 className="text-2xl md:text-3xl font-bold text-blue-950 dark:text-blue-600">
          Proyectos
        </h3>
      </section>
    </section>
  );
};
