import { FiFolder } from "react-icons/fi";
import { ProjectCard } from "../common/ProjectCard";
import { RiSupabaseFill, RiTailwindCssFill } from "react-icons/ri";
import {
  SiReactquery,
  SiTypescript,
  SiExpress,
  SiJsonwebtokens,
  SiNodedotjs,
  SiMysql,
} from "react-icons/si";
import { TbBrandOauth } from "react-icons/tb";

import { FaReact } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export const Projects = () => {
  const { t } = useTranslation();
  return (
    <section id="proyectos" className="w-full max-w-4xl flex flex-col gap-10">
      <section className="flex items-center gap-2">
        <FiFolder className="text-3xl md:text-4xl text-blue-950 dark:text-blue-600" />
        <h3 className="text-2xl md:text-3xl font-bold text-blue-950 dark:text-blue-600">
          {t("projectCard.title")}
        </h3>
      </section>

      <section className="flex flex-col items-center gap-10 ms-4 sm:items-start md:flex-row md:gap-16">
        <ProjectCard
          description={t("projectCard.cec.description")}
          title="Como En Casa"
          img="https://res.cloudinary.com/dttpgbmdx/image/upload/v1754500072/Screenshot_3_xi7may.png"
          codeUrlFront="https://github.com/juancruzdauberte/ComoEnCasa-front"
          codeUrlBack="https://github.com/juancruzdauberte/comoencasa-back"
          previewUrl="https://como-en-casa-front.vercel.app/login"
          technologies={[
            <SiNodedotjs className="text-green-500" />,
            <SiMysql />,
            <SiTypescript className="text-typescript" />,
            <SiExpress className="text-gray-600" />,
            <SiJsonwebtokens />,
            <TbBrandOauth />,
            <FaReact className="text-react" />,
            <RiTailwindCssFill className="text-tailwind" />,
            <SiReactquery className="text-red-400" />,
          ]}
        />
        <ProjectCard
          description={t("projectCard.hb.description")}
          title="Habits Record"
          img="https://res.cloudinary.com/dttpgbmdx/image/upload/v1745010998/Screenshot_1_equkwa.jpg"
          codeUrlFront="https://github.com/juancruzdauberte/habits-record"
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
