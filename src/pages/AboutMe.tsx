import { FiUser } from "react-icons/fi";

export const AboutMe = () => {
  return (
    <section id="sobre-mi" className="w-full max-w-4xl flex flex-col">
      <section className="flex items-center gap-2">
        <FiUser className="text-2xl" />
        <h3 className="text-xl font-semibold">Sobre Mi</h3>
      </section>
    </section>
  );
};
