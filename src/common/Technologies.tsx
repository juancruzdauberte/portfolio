import { useTranslation } from "react-i18next";
import { TechIcon } from "./TechIcon";

export const Technologies = () => {
  const { t } = useTranslation();
  return (
    <section className="flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <p className="font-semibold">Front-End</p>

        <div className="flex flex-wrap gap-2">
          <TechIcon
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
            alt="React Js"
          />
          <TechIcon
            src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1745432721/react-query-seeklogo_axk8ly.png"
            alt="TanStack"
          />
          <TechIcon
            src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1754677841/zustand_pnlukv.png"
            alt="Zustand"
          />

          <TechIcon
            src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg"
            alt="Tailwind"
          />

          <TechIcon
            src="https://axios-http.com/assets/logo.svg"
            alt="Axios"
            h="h-12 w-12"
          />
          <TechIcon
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
            alt="HTML"
          />
          <TechIcon
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
            alt="CSS"
          />
          <TechIcon
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg"
            alt="Bootstrap"
          />
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <p className="font-semibold">Back-End - BaaS</p>
        <div className="flex flex-wrap gap-2">
          <TechIcon
            src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1745926364/nodejsicon_dioqsc.png"
            alt="Node Js"
          />
          <TechIcon
            src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1745953822/icon-express_foa4dc.png"
            alt="Express"
          />
          <TechIcon
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
            alt="TypeScript"
          />
          <TechIcon
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
            alt="JavaScript"
          />
          <TechIcon
            src="https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/files/python-logo-only.svg"
            alt="Python"
          />
          <TechIcon
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
            alt="MongoDB"
          />
          <TechIcon
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
            alt="PostgreSQL"
          />
          <TechIcon
            src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1747828893/sql-server_fsqzxk.png"
            alt="SQL Server"
          />
          <TechIcon
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
            alt="MySQL"
          />
          <TechIcon
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
            alt="Java"
          />
          <TechIcon
            src="https://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png"
            alt="Mongoose"
          />

          <TechIcon
            src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1745927113/supabase-icon_w2upjk.png"
            alt="Supabase"
          />
          <TechIcon
            src="https://www.svgrepo.com/show/375433/firestore.svg"
            alt="Firestore"
          />
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <p className="font-semibold">{t("versionControl")}</p>

        <div className="flex flex-wrap gap-2">
          <TechIcon
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
            alt="Git"
          />
          <TechIcon
            src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1745926580/githubicon_om10uz.png"
            alt="GitHub"
          />
        </div>
      </section>
    </section>
  );
};
