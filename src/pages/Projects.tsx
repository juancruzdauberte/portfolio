import { FiFolder } from "react-icons/fi";
import { ProjectCard } from "../common/ProjectCard";
import {
  RiSupabaseFill,
  RiTailwindCssFill,
  RiNextjsFill,
} from "react-icons/ri";
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
import { motion } from "framer-motion";

export const Projects = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const titleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="proyectos"
      className="w-full max-w-5xl flex flex-col gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6"
    >
      {/* Título animado con colores de tema */}
      <motion.section
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex items-center gap-2"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 5,
          }}
        >
          <FiFolder className="text-3xl md:text-4xl text-theme-accent-blue-dark" />
        </motion.div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-theme-accent-blue-dark relative">
          {t("projectCard.title")}
          {/* Subrayado animado con colores de tema */}
          <motion.span
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-theme-accent-blue to-theme-accent-purple"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </h3>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full justify-items-center"
      >
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
            <SiExpress className="text-gray-600 dark:text-gray-400" />,
            <SiJsonwebtokens />,
            <TbBrandOauth />,
            <FaReact className="text-react" />,
            <RiTailwindCssFill className="text-tailwind" />,
            <SiReactquery className="text-red-400" />,
          ]}
        />

        <ProjectCard
          description={t("projectCard.dh.description")}
          title="Dreamhouse Baradero"
          img="https://res.cloudinary.com/dttpgbmdx/image/upload/v1758483307/Screenshot_1_hg1irr.png"
          previewUrl="https://www.dreamhousebaradero.com"
          technologies={[
            <SiNodedotjs className="text-green-500" />,
            <SiTypescript className="text-typescript" />,
            <RiNextjsFill />,
            <FaReact className="text-react" />,
            <RiTailwindCssFill className="text-tailwind" />,
          ]}
        />

        <ProjectCard
          description={t("projectCard.tbs.description")}
          title="The Black Sheep"
          img="https://res.cloudinary.com/dttpgbmdx/image/upload/v1754687196/Screenshot_1_juci2x.png"
          codeUrlFront="https://github.com/franles/tbsfrontend"
          codeUrlBack="https://github.com/franles/TheBlackSheep"
          technologies={[
            <SiNodedotjs className="text-green-500" />,
            <SiMysql />,
            <SiTypescript className="text-typescript" />,
            <SiExpress className="text-gray-600 dark:text-gray-400" />,
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
      </motion.section>
    </section>
  );
};
