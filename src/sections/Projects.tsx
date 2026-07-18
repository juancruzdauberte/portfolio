import { FiFolder } from "react-icons/fi";
import { ProjectCard } from "../common/ProjectCard";
import { RiTailwindCssFill, RiNextjsFill } from "react-icons/ri";
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
import { useReducedMotion, motionSafe } from "../hooks/usePerformance";
import { TechIcon } from "../common/TechIcon";
import { cloudinaryOptimize } from "../utils/cloudinary";

export const Projects = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

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
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <section
      className="w-full max-w-5xl flex flex-col gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6"
      aria-label="Projects"
    >
      {/* Título animado con colores de tema */}
      <motion.div
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex items-center gap-2"
      >
        <motion.div
          {...motionSafe(
            { rotate: [0, 10, -10, 10, 0] },
            { duration: 2, repeat: Infinity, repeatDelay: 5 },
            prefersReducedMotion,
          )}
          aria-hidden="true"
        >
          <FiFolder className="text-3xl md:text-4xl text-theme-accent-blue-dark" />
        </motion.div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-theme-accent-blue-dark relative">
          {t("projectCard.title")}
          {/* Subrayado animado con colores de tema */}
          <motion.span
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-theme-accent-blue to-theme-accent-purple"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full justify-items-center"
      >
        <ProjectCard
          description={t("projectCard.cec.description")}
          title="Como En Casa"
          img={cloudinaryOptimize(
            "https://res.cloudinary.com/dttpgbmdx/image/upload/v1754500072/Screenshot_3_xi7may.png",
          )}
          codeUrlFront="https://github.com/juancruzdauberte/ComoEnCasa-front"
          codeUrlBack="https://github.com/juancruzdauberte/comoencasa-back"
          previewUrl="https://como-en-casa-front.vercel.app/login"
          technologies={[
            <span aria-label="Node.js">
              <SiNodedotjs className="text-green-500" aria-hidden="true" />
            </span>,
            <span aria-label="MySQL">
              <SiMysql aria-hidden="true" />
            </span>,
            <span aria-label="TypeScript">
              <SiTypescript className="text-typescript" aria-hidden="true" />
            </span>,
            <span aria-label="Express.js">
              <SiExpress
                className="text-gray-600 dark:text-gray-400"
                aria-hidden="true"
              />
            </span>,
            <span aria-label="JSON Web Tokens">
              <SiJsonwebtokens aria-hidden="true" />
            </span>,
            <span aria-label="OAuth">
              <TbBrandOauth aria-hidden="true" />
            </span>,
            <span aria-label="React">
              <FaReact className="text-react" aria-hidden="true" />
            </span>,
            <span aria-label="Tailwind CSS">
              <RiTailwindCssFill className="text-tailwind" aria-hidden="true" />
            </span>,
            <span aria-label="React Query">
              <SiReactquery className="text-red-400" aria-hidden="true" />
            </span>,
          ]}
        />

        <ProjectCard
          description={t("projectCard.dh.description")}
          title="Dreamhouse Baradero"
          img={cloudinaryOptimize(
            "https://res.cloudinary.com/dttpgbmdx/image/upload/v1758483307/Screenshot_1_hg1irr.png",
          )}
          previewUrl="https://www.dreamhousebaradero.com"
          technologies={[
            <span aria-label="Node.js">
              <SiNodedotjs className="text-green-500" aria-hidden="true" />
            </span>,
            <span aria-label="TypeScript">
              <SiTypescript className="text-typescript" aria-hidden="true" />
            </span>,
            <span aria-label="Next.js">
              <RiNextjsFill aria-hidden="true" />
            </span>,
            <span aria-label="React">
              <FaReact className="text-react" aria-hidden="true" />
            </span>,
            <span aria-label="Tailwind CSS">
              <RiTailwindCssFill className="text-tailwind" aria-hidden="true" />
            </span>,
          ]}
        />

        <ProjectCard
          description={t("projectCard.dhBo.description")}
          title="Dreamhouse Baradero Back Office"
          img={cloudinaryOptimize(
            "https://res.cloudinary.com/dttpgbmdx/image/upload/v1764358463/dh-back-office_exhfx6.png",
          )}
          codeUrlFront="https://github.com/juancruzdauberte/dreamhouse-back-office"
          technologies={[
            <span aria-label="Node.js">
              <SiNodedotjs className="text-green-500" aria-hidden="true" />
            </span>,
            <span aria-label="TypeScript">
              <SiTypescript className="text-typescript" aria-hidden="true" />
            </span>,
            <span aria-label="Next.js">
              <RiNextjsFill aria-hidden="true" />
            </span>,
            <span aria-label="MySQL">
              <SiMysql aria-hidden="true" />
            </span>,
            <span aria-label="JSON Web Tokens">
              <SiJsonwebtokens aria-hidden="true" />
            </span>,
            <span aria-label="OAuth">
              <TbBrandOauth aria-hidden="true" />
            </span>,
            <span aria-label="React">
              <FaReact className="text-react" aria-hidden="true" />
            </span>,
            <span aria-label="Tailwind CSS">
              <RiTailwindCssFill className="text-tailwind" aria-hidden="true" />
            </span>,
          ]}
        />

        <ProjectCard
          description={t("projectCard.tbs.description")}
          title="The Black Sheep"
          img={cloudinaryOptimize(
            "https://res.cloudinary.com/dttpgbmdx/image/upload/v1754687196/Screenshot_1_juci2x.png",
          )}
          codeUrlFront="https://github.com/franles/tbsfrontend"
          codeUrlBack="https://github.com/franles/TheBlackSheep"
          technologies={[
            <span aria-label="Node.js">
              <SiNodedotjs className="text-green-500" aria-hidden="true" />
            </span>,
            <span aria-label="MySQL">
              <SiMysql aria-hidden="true" />
            </span>,
            <span aria-label="TypeScript">
              <SiTypescript className="text-typescript" aria-hidden="true" />
            </span>,
            <span aria-label="Express.js">
              <SiExpress
                className="text-gray-600 dark:text-gray-400"
                aria-hidden="true"
              />
            </span>,
            <span aria-label="JSON Web Tokens">
              <SiJsonwebtokens aria-hidden="true" />
            </span>,
            <span aria-label="OAuth">
              <TbBrandOauth aria-hidden="true" />
            </span>,
            <span aria-label="React">
              <FaReact className="text-react" aria-hidden="true" />
            </span>,
            <span aria-label="Tailwind CSS">
              <RiTailwindCssFill className="text-tailwind" aria-hidden="true" />
            </span>,
            <span aria-label="React Query">
              <SiReactquery className="text-red-400" aria-hidden="true" />
            </span>,
          ]}
        />

        <ProjectCard
          description={t("projectCard.cabaVehicleVolume.description")}
          previewUrl="https://github.com/juancruzdauberte/volumen-vehiular-caba-2024"
          title={t("projectCard.cabaVehicleVolume.title")}
          img={cloudinaryOptimize(
            "https://res.cloudinary.com/dttpgbmdx/image/upload/v1784400029/Screenshot_1_grkh8r.png",
          )}
          technologies={[
            <TechIcon
              src="https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/files/python-logo-only.svg"
              alt="Python"
              h="h-8"
            />,
            <TechIcon
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1784399595/scikit-learn_irdvwn.png"
              alt="Scikit-learn"
              h="h-8"
            />,
            <TechIcon
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1763391325/pandas_jk8hyh.png"
              alt="Pandas"
              h="h-8"
            />,
            <TechIcon
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1763480391/Matplotlib_2_a36sxe.png"
              alt="Matplotlib"
              h="h-8"
            />,
            <TechIcon
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1764125473/geopandas_mgphju.png"
              alt="Geopandas"
              h="h-8"
            />,
          ]}
          deployText={t("projectCard.cabaVehicleVolume.deployText")}
        />

        <ProjectCard
          description={t("projectCard.wooded.description")}
          title={t("projectCard.wooded.title")}
          img={cloudinaryOptimize(
            "https://res.cloudinary.com/dttpgbmdx/image/upload/v1764126201/arbolado_hkkrqe.png",
          )}
          previewUrl="https://github.com/juancruzdauberte/arbolado_caba_espacios_verdes/blob/main/README.md"
          technologies={[
            <TechIcon
              src="https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/files/python-logo-only.svg"
              alt="Python"
              h="h-8"
            />,
            <TechIcon
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1763391325/pandas_jk8hyh.png"
              alt="Pandas"
              h="h-8"
            />,
            <TechIcon
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1764125473/geopandas_mgphju.png"
              alt="Geopandas"
              h="h-8"
            />,
            <TechIcon
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1763480391/Matplotlib_2_a36sxe.png"
              alt="Matplotlib"
              h="h-8"
            />,
            <TechIcon
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1764125381/Ploty_fqoynk.png"
              alt="Plotly"
              h="h-7"
            />,
          ]}
          deployText={t("projectCard.wooded.deployText")}
        />
      </motion.div>
    </section>
  );
};
