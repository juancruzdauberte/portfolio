import { GoArrowUpRight } from "react-icons/go";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { MouseEvent, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

type Credential = {
  label: string;
  url: string;
};

type Props = {
  title: string;
  timelaps: string;
  academy: string;
  description?: string;
  credentialUrl?: string; // Legacy support
  credentials?: Credential[]; // New support
};

export const StudiesCard = ({
  title,
  timelaps,
  academy,
  description,
  credentialUrl,
  credentials = [],
}: Props) => {
  const { t } = useTranslation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Combine legacy and new credentials
  const allCredentials = [
    ...(credentialUrl
      ? [{ label: t("studies.certificate"), url: credentialUrl }]
      : []),
    ...credentials,
  ];

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      className="group relative w-full h-full overflow-visible rounded-xl border border-white/10 bg-theme-bg-secondary/30 backdrop-blur-md transition-shadow hover:shadow-2xl hover:shadow-theme-accent-purple/10"
    >
      {/* Spotlight Effect - Gradient follower (Desktop) */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 rounded-xl overflow-hidden hidden sm:block"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(120, 119, 198, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Mobile Ambience - Subtle moving gradient (Mobile only) */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 block sm:hidden rounded-xl overflow-hidden"
        style={{
          background:
            "linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.05) 50%, transparent 80%)",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["100% 0%", "-100% 0%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 3,
        }}
      />

      {/* Decorative Blur blob 1 */}
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-theme-accent-purple/30 blur-3xl transition-all duration-500 group-hover:bg-theme-accent-purple/40 pointer-events-none" />
      {/* Decorative Blur blob 2 */}
      <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-theme-accent-blue/30 blur-3xl transition-all duration-500 group-hover:bg-theme-accent-blue/40 pointer-events-none" />

      <div className="relative flex h-full flex-col p-6">
        {/* Header Section */}
        <div className="mb-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-2 flex items-center justify-between"
          >
            <span className="inline-block rounded-full bg-theme-accent-blue/10 px-3 py-1 text-xs font-semibold text-theme-accent-blue ring-1 ring-inset ring-theme-accent-blue/20">
              {timelaps}
            </span>
            <motion.div
              whileHover={{ rotate: 90 }}
              className="rounded-full p-1 text-theme-text-tertiary transition-colors group-hover:text-theme-text-primary"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-current" />
            </motion.div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-theme-text-primary to-theme-text-primary/70 group-hover:to-theme-accent-purple transition-all duration-300"
          >
            {title}
          </motion.h3>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-1 text-sm font-medium text-theme-accent-purple"
          >
            {academy}
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col justify-between gap-4">
          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm leading-relaxed text-theme-text-secondary/90"
            >
              {description}
            </motion.p>
          )}

          {/* Footer / Action */}
          {allCredentials.length > 0 && (
            <div className="mt-2 pt-4 border-t border-white/5 relative z-20">
              {allCredentials.length === 1 ? (
                <motion.a
                  href={allCredentials[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 text-sm font-medium text-theme-text-primary transition-colors hover:text-theme-accent-blue"
                  whileHover={{ x: 5 }}
                >
                  <span>
                    {allCredentials[0].label || t("studies.certificate")}
                  </span>
                  <GoArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                </motion.a>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    onBlur={() => setTimeout(() => setIsMenuOpen(false), 200)}
                    className="group/btn inline-flex items-center gap-2 text-sm font-medium text-theme-text-primary transition-colors hover:text-theme-accent-blue outline-none"
                  >
                    <span>{t("studies.certificate")}s</span>
                    <FiChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-0 mb-2 w-48 rounded-lg border border-white/10 bg-theme-bg-secondary/95 backdrop-blur-xl shadow-xl p-1 flex flex-col gap-1 overflow-hidden z-50"
                      >
                        {allCredentials.map((cred, idx) => (
                          <a
                            key={idx}
                            href={cred.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between rounded-md px-3 py-3 text-sm text-theme-text-secondary hover:bg-white/5 hover:text-theme-text-primary transition-colors active:bg-white/10"
                          >
                            <span className="truncate">
                              {cred.label ||
                                `${t("studies.certificate")} ${idx + 1}`}
                            </span>
                            <GoArrowUpRight className="h-3 w-3 opacity-50" />
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
