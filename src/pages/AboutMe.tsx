import { FiUser } from "react-icons/fi";
import Cv from "../../public/download/Curriculum Vitae Juan Cruz Dauberte.pdf";
import { PiFilePdf } from "react-icons/pi";
import { StudiesCard } from "../common/StudiesCard";
import { motion } from "framer-motion";
import { Technologies } from "../common/Technologies";
import { useTranslation } from "react-i18next";
export const AboutMe = () => {
  const { t } = useTranslation();

  return (
    <section id="sobre-mi" className="w-full max-w-4xl flex flex-col">
      <section className="flex items-center gap-2">
        <FiUser className="text-3xl md:text-4xl text-blue-950 dark:text-blue-600" />
        <h3 className="text-2xl md:text-3xl font-bold text-blue-950 dark:text-blue-600">
          {t("about.title")}
        </h3>
      </section>

      <section className="flex flex-col gap-16 mx-4">
        <section className="flex flex-col gap-5 mt-3">
          <p>{t("about.description")}</p>
          <div className="flex flex-col">
            <p className="text-xl text-blue-400 mb-1 dark:text-blue-200">
              {t("about.besides")}
            </p>
            <p>{t("about.descriptionBesides")}</p>
          </div>

          <div>
            <motion.a
              whileHover={{
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
                scale: 1.03,
              }}
              transition={{ duration: 0.07 }}
              href={Cv}
              download={"Curriculum Vitae Juan Cruz Dauberte"}
              className="flex items-center gap-1 border rounded-full border-black p-0.5 w-40 md:w-48 justify-center  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white"
              rel="noopener noreferrer"
            >
              <PiFilePdf size={25} />
              {t("about.download")}
            </motion.a>
          </div>
        </section>

        <section>
          <div>
            <h5 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
              {t("about.titleStudies")}
            </h5>
          </div>

          <div className="flex flex-wrap gap-10 mt-3">
            <StudiesCard
              title={t("studies.analystIt.title")}
              academy={t("studies.analystIt.academy")}
              timelaps={t("studies.analystIt.timeLaps")}
            />
            <StudiesCard
              title={t("studies.webDevelopment.title")}
              academy="Coderhouse"
              timelaps={t("studies.webDevelopment.timeLaps")}
              description="HTML - CSS - BOOTSTRAP - SASS - SEO - GIT - GITHUB"
              credentialUrl="https://pub.coderhouse.com/certificates/e308b2ba-a656-45eb-bf88-925ee34aa3dd?v=1"
            />
            <StudiesCard
              title="Javascript"
              academy="Coderhouse"
              timelaps={t("studies.js.timeLaps")}
              description={t("studies.js.description")}
              credentialUrl="https://pub.coderhouse.com/certificates/46f837e2-56cf-4135-90a7-ed28201f888e?v=1"
            />
            <StudiesCard
              title="React JS"
              academy="Coderhouse"
              timelaps={t("studies.react.timeLaps")}
              description={t("studies.react.description")}
              credentialUrl="https://pub.coderhouse.com/certificates/99644ed7-538e-477d-adbd-679770553ce8?v=1"
            />
            <StudiesCard
              title={t("studies.backI.title")}
              academy="Coderhouse"
              timelaps={t("studies.backI.timeLaps")}
              description="API REST - EXPRESS - MONGO DB - MONGOOSE - WEBSOCKETS - HANDLEBARS - ROUTER - MULTER"
            />
          </div>
        </section>
        <section className="flex flex-col gap-3">
          <div>
            <h4 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
              {t("about.technologiesTools")}
            </h4>
          </div>
          <Technologies />
        </section>
      </section>
    </section>
  );
};
