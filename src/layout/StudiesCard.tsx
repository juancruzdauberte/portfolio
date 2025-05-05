import { GoArrowUpRight } from "react-icons/go";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

type Props = {
  title: string;
  timelaps: string;
  academy: string;
  description?: string;
  credentialUrl?: string;
};

export const StudiesCard = ({
  title,
  timelaps,
  academy,
  description,
  credentialUrl,
}: Props) => {
  const { t } = useTranslation();
  return (
    <motion.div
      whileHover={{ rotate: 1.5 }}
      transition={{ duration: 0.2 }}
      className="p-1 bg-gradient-to-r from-blue-300 via-white to-blue-300 bg-[length:200%_100%] animate-shine w-[400px] h-full"
    >
      <div className="bg-white dark:bg-black px-6 py-4 flex flex-col gap-3 w-full ">
        <h5 className="text-blue-500 font-semibold text-xl">{title}</h5>
        <span className="text-lg">{timelaps}</span>
        <span className="text-lg font-semibold">{academy}</span>

        {description && <p className="text-lg ">{description}</p>}

        {credentialUrl && (
          <motion.a
            whileHover={{
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
            }}
            transition={{ duration: 0.07 }}
            className="flex text-sm max-w-36 gap-1 items-center justify-center border border-black rounded-full p-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white transition"
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("studies.certificate")} <GoArrowUpRight size={16} />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};
