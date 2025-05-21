import { GiSkills } from "react-icons/gi";
import { Technologies } from "../common/Technologies";
import { useTranslation } from "react-i18next";

export const Skills = () => {
  const { t } = useTranslation();
  return (
    <section id="habilidades" className="w-full max-w-4xl flex flex-col ">
      <section className="flex items-center gap-2">
        <GiSkills className="text-3xl md:text-4xl text-blue-950 dark:text-blue-600" />
        <h5 className="text-2xl md:text-3xl font-bold text-blue-950 dark:text-blue-600">
          {t("skills.title")}
        </h5>
      </section>

      <section className="flex flex-col gap-10 mx-4 mt-5">
        <section>
          <h6 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-1">
            {t("skills.softSkills.title")}
          </h6>

          <p>{t("skills.softSkills.description")}</p>
        </section>

        <section>
          <p className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-1">
            {t("skills.techSkills.title")}
          </p>

          <Technologies />
        </section>
      </section>
    </section>
  );
};
