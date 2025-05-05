import { useTranslation } from "react-i18next";
import { LiaSuitcaseSolid } from "react-icons/lia";

export const Experience = () => {
  const { t } = useTranslation();
  return (
    <section id="experiencia" className="w-full max-w-4xl flex flex-col">
      <section className="flex items-center gap-2">
        <LiaSuitcaseSolid className="text-3xl md:text-4xl text-blue-950 dark:text-blue-600" />
        <h3 className="text-2xl md:text-3xl font-bold text-blue-950 dark:text-blue-600">
          {t("experience.title")}
        </h3>
      </section>

      <section className="flex flex-col gap-32 mt-10 mx-4">
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h4 className="text-xl md:text-2xl font-semibold">
              Reformam Network 2010 SL - Habitium MDF
            </h4>
            <span>{t("experience.hb.timeLaps")}</span>
          </div>
          <div className="flex flex-col gap-2">
            <p>{t("experience.hb.description")}</p>

            <ul className="list-disc list-inside space-y-1 mx-2">
              <li>Home Office.</li>
              <li>{t("experience.hb.orders")}</li>
              <li>{t("experience.hb.catalog")}</li>
              <li>{t("experience.hb.communication")}</li>
              <li>{t("experience.hb.trelloPresta")}</li>
            </ul>
          </div>
        </section>
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h5 className="text-xl md:text-2xl font-semibold">
              Call Center - Siderman Law
            </h5>
            <span>{t("experience.sl.timeLaps")}</span>
          </div>
          <div className="flex flex-col gap-2">
            <p>{t("experience.sl.description")}</p>
            <ul className="list-disc list-inside space-y-1 mx-2">
              <li>Home Office.</li>
              <li>{t("experience.sl.communication")}</li>
            </ul>
          </div>
        </section>
      </section>
    </section>
  );
};
