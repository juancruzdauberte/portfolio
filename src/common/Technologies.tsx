import { useTranslation } from "react-i18next";
import { InfiniteCarousel } from "./InfiniteCarousel";

export const Technologies = () => {
  const { t } = useTranslation();

  const frontEndTechnologies = [
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      alt: "React.js",
    },
    {
      src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1758482854/nextjs-icon-svgrepo-com_pkvcfh.png",
      alt: "Next.js",
    },
    {
      src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1745432721/react-query-seeklogo_axk8ly.png",
      alt: "TanStack",
    },
    {
      src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1754677841/zustand_pnlukv.png",
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
      src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1745926364/nodejsicon_dioqsc.png",
      alt: "Node.js",
    },

    {
      src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1762707744/Nest.js_npsh4b.png",
      alt: "NestJS",
    },
    {
      src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1745953822/icon-express_foa4dc.png",
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
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      alt: "PostgreSQL",
    },
    {
      src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1747828893/sql-server_fsqzxk.png",
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
      src: "https://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png",
      alt: "Mongoose",
    },
    {
      src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1745927113/supabase-icon_w2upjk.png",
      alt: "Supabase",
    },
    {
      src: "https://www.svgrepo.com/show/375433/firestore.svg",
      alt: "Firestore",
    },

    {
      src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1763480653/Firebase_p4vykc.png",
      alt: "Firebase",
    },
  ];

  const dataAnalyticsTechnologies = [
    {
      src: "https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/files/python-logo-only.svg",
      alt: "Python",
    },

    {
      src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1763480303/Jupyter_mnsmd4.png",
      alt: "Jupyter ",
    },
    {
      src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1763391325/pandas_jk8hyh.png",
      alt: "Pandas",
      h: "h-10",
    },
    {
      src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1763391596/powerBi_jhknwp.png",
      alt: "Power BI",
    },
    {
      src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1763480391/Matplotlib_2_a36sxe.png",
      alt: "Matplotlib",
    },
    {
      src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1763480304/NumPy_vb72ih.png",
      alt: "NumPy",
    },
    {
      src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1764125473/geopandas_mgphju.png",
      alt: "Geopandas",
    },
    {
      src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1764125381/Ploty_fqoynk.png",
      alt: "Plotly",
    },
  ];

  const othersTechnologies = [
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      alt: "Git",
    },
    {
      src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1745926580/githubicon_om10uz.png",
      alt: "GitHub",
    },
    {
      src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1763480513/AWS_b9fhva.png",
      alt: "AWS",
    },
    {
      src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1763480581/Docker_hnvejl.png",
      alt: "Docker",
    },
    {
      src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1763480425/Swagger_jaghlj.png",
      alt: "Swagger",
    },
    {
      src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1763480246/GitHub_Actions_fvdjik.png",
      alt: "GitHub Actions",
    },
  ];

  return (
    <section className="flex flex-col gap-10">
      {/* Front-End Carousel */}
      <section className="flex flex-col gap-3">
        <p className="font-semibold text-lg">Front-End</p>
        <InfiniteCarousel
          technologies={frontEndTechnologies}
          duration={25}
          direction="left"
        />
      </section>

      {/* Back-End Carousel */}
      <section className="flex flex-col gap-3">
        <p className="font-semibold text-lg">Back-End - BaaS</p>
        <InfiniteCarousel
          technologies={backEndTechnologies}
          duration={30}
          direction="right"
        />
      </section>

      <section className="flex flex-col gap-3">
        <p className="font-semibold text-lg">{t("dataAnalytics")}</p>
        <InfiniteCarousel
          technologies={dataAnalyticsTechnologies}
          duration={30}
          direction="right"
        />
      </section>

      {/* Version Control Carousel */}
      <section className="flex flex-col gap-3">
        <p className="font-semibold text-lg">{t("others")}</p>
        <InfiniteCarousel
          technologies={othersTechnologies}
          duration={15}
          direction="left"
        />
      </section>
    </section>
  );
};
