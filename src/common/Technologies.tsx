import { useTranslation } from "react-i18next";
import { InfiniteCarousel } from "./InfiniteCarousel";
import { cloudinaryOptimize } from "../utils/cloudinary";
export const Technologies = () => {
  const { t } = useTranslation();

  const frontEndTechnologies = [
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      alt: "React.js & Native",
    },
    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1758482854/nextjs-icon-svgrepo-com_pkvcfh.png"),
      alt: "Next.js",
    },
    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1745432721/react-query-seeklogo_axk8ly.png"),
      alt: "TanStack",
    },
    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1754677841/zustand_pnlukv.png"),
      alt: "Zustand",
      h: "h-11",
    },
    {
      src: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
      alt: "Tailwind",
    },
    {
      src: "https://axios-http.com/assets/logo.svg",
      alt: "Axios",
      h: "h-12 w-12",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      alt: "HTML",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      alt: "CSS",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
      alt: "Bootstrap",
    },
  ];

  const backEndTechnologies = [
    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1745926364/nodejsicon_dioqsc.png"),
      alt: "Node.js",
    },

    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1762707744/Nest.js_npsh4b.png"),
      alt: "NestJS",
    },
    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1745953822/icon-express_foa4dc.png"),
      alt: "Express.js",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      alt: "TypeScript",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      alt: "JavaScript",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      alt: "MongoDB",
    },
    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1776277365/mongoose_icon_oaoklw.png"),
      alt: "Mongoose",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      alt: "PostgreSQL",
    },
    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1747828893/sql-server_fsqzxk.png"),
      alt: "SQL Server",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      alt: "MySQL",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      alt: "Java",
    },
    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1776277117/spring_framework_t6nzee.png"),
      alt: "Spring",
    },

    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1745927113/supabase-icon_w2upjk.png"),
      alt: "Supabase",
    },
    {
      src: "https://www.svgrepo.com/show/375433/firestore.svg",
      alt: "Firestore",
    },

    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1763480653/Firebase_p4vykc.png"),
      alt: "Firebase",
    },
  ];

  const dataAnalyticsTechnologies = [
    {
      src: "https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/files/python-logo-only.svg",
      alt: "Python",
    },

    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1763480303/Jupyter_mnsmd4.png"),
      alt: "Jupyter ",
    },
    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1763391325/pandas_jk8hyh.png"),
      alt: "Pandas",
      h: "h-10",
    },
    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1763391596/powerBi_jhknwp.png"),
      alt: "Power BI",
    },
    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1765845410/tableau-icon_gysxda.png"),
      alt: "Tableau",
    },
    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1763480391/Matplotlib_2_a36sxe.png"),
      alt: "Matplotlib",
    },
    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1763480304/NumPy_vb72ih.png"),
      alt: "NumPy",
    },
    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1764125473/geopandas_mgphju.png"),
      alt: "Geopandas",
    },
    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1764125381/Ploty_fqoynk.png"),
      alt: "Plotly",
    },
  ];

  const othersTechnologies = [
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      alt: "Git",
    },
    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1745926580/githubicon_om10uz.png"),
      alt: "GitHub",
    },
    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1763480246/GitHub_Actions_fvdjik.png"),
      alt: "GitHub Actions",
    },
    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1776571328/linux_qoc6rv.png"),
      alt: "Linux",
    },
    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1763480513/AWS_b9fhva.png"),
      alt: "AWS",
    },
    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1763480581/Docker_hnvejl.png"),
      alt: "Docker",
    },
    {
      src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1763480425/Swagger_jaghlj.png"),
      alt: "Swagger",
    },
  ];

  return (
    <section className="flex flex-col gap-10" aria-label="Technologies">
      {/* Front-End Carousel */}
      <div className="flex flex-col gap-3 -mx-4 sm:-mx-6 md:mx-0">
        <h3 className="font-semibold text-lg px-7 sm:px-10 md:px-6">Front-End</h3>
        <InfiniteCarousel
          technologies={frontEndTechnologies}
          duration={25}
          direction="left"
          label="Front-End technologies"
        />
      </div>

      {/* Back-End Carousel */}
      <div className="flex flex-col gap-3 -mx-4 sm:-mx-6 md:mx-0">
        <h3 className="font-semibold text-lg px-7 sm:px-10 md:px-6">
          Back-End - BaaS
        </h3>
        <InfiniteCarousel
          technologies={backEndTechnologies}
          duration={30}
          direction="right"
          label="Back-End and BaaS technologies"
        />
      </div>

      <div className="flex flex-col gap-3 -mx-4 sm:-mx-6 md:mx-0">
        <h3 className="font-semibold text-lg px-7 sm:px-10 md:px-6">
          {t("dataAnalytics")}
        </h3>
        <InfiniteCarousel
          technologies={dataAnalyticsTechnologies}
          duration={30}
          direction="right"
          label="Data analytics technologies"
        />
      </div>

      {/* Others Carousel */}
      <div className="flex flex-col gap-3 -mx-4 sm:-mx-6 md:mx-0">
        <h3 className="font-semibold text-lg px-7 sm:px-10 md:px-6">
          {t("others")}
        </h3>
        <InfiniteCarousel
          technologies={othersTechnologies}
          duration={15}
          direction="left"
          label="Other tools and technologies"
        />
      </div>
    </section>
  );
};
