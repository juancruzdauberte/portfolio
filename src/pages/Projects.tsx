import { FiFolder } from "react-icons/fi";
import { ProjectCard } from "../layout/ProjectCard";
import { RiSupabaseFill, RiTailwindCssFill } from "react-icons/ri";
import { SiReactquery, SiTypescript } from "react-icons/si";
import { FaReact } from "react-icons/fa";

export const Projects = () => {
  return (
    <section id="proyectos" className="w-full max-w-4xl flex flex-col gap-10">
      <section className="flex items-center gap-2">
        <FiFolder className="text-3xl md:text-4xl text-blue-950 dark:text-blue-600" />
        <h3 className="text-2xl md:text-3xl font-bold text-blue-950 dark:text-blue-600">
          Proyectos
        </h3>
      </section>

      <section className="flex flex-col items-center gap-10 ms-4 sm:items-start md:flex-row md:gap-16">
        <ProjectCard
          description="   E-commerce realizada para una persona de mi entorno. Aún falta la
          implementación de métodos de pago. El software está implementado para
          la venta de productos fabricados en macramé y cerámica."
          title="Tierra de nudos"
          img="https://res.cloudinary.com/dttpgbmdx/image/upload/v1745010629/Screenshot_2_l01new.jpg"
          codeUrl="https://github.com/juancruzdauberte/Tierra-de-Nudos"
          previewUrl="https://tierra-de-nudos.vercel.app/"
          technologies={[
            <FaReact className="text-react" />,
            <SiTypescript className="text-typescript" />,
            <RiSupabaseFill className="text-supabase" />,
            <RiTailwindCssFill className="text-tailwind" />,
            <SiReactquery className="text-red-400" />,
          ]}
        />
        <ProjectCard
          description="Sitio web basado en el libro Habitos Átomicos de James Clear. La aplicación permite registrar tus hábitos y chequear si los has cumplido o no. Aún se encuentra en desarrollo."
          title="Habits Record"
          img="https://res.cloudinary.com/dttpgbmdx/image/upload/v1745010998/Screenshot_1_equkwa.jpg"
          codeUrl="https://github.com/juancruzdauberte/habits-record"
          previewUrl="https://habits-record-sable.vercel.app/"
          technologies={[
            <FaReact className="text-react" />,
            <SiTypescript className="text-typescript" />,
            <RiSupabaseFill className="text-supabase" />,
            <RiTailwindCssFill className="text-tailwind" />,
            <SiReactquery className="text-red-400" />,
          ]}
        />
      </section>
    </section>
  );
};
