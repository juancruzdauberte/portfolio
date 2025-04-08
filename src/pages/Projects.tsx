import { FiFolder } from "react-icons/fi";

export const Projects = () => {
  return (
    <section id="proyectos" className="w-full max-w-4xl flex flex-col">
      <section className="flex items-center gap-2">
        <FiFolder className="text-2xl" />
        <h3 className="text-xl font-semibold">Proyectos</h3>
      </section>
    </section>
  );
};
