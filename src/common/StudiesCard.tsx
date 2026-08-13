import { GoArrowUpRight } from "react-icons/go";
import { MdSchool } from "react-icons/md";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { MouseEvent, useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

type Credential = {
  label: string;
  url: string;
};

type Props = {
  title: string;
  timelaps?: string;
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
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Combine legacy and new credentials
  const allCredentials = [
    ...(credentialUrl
      ? [{ label: t("studies.certificate"), url: credentialUrl }]
      : []),
    ...credentials,
  ];

  // Imperatively focus the item when focusedIndex changes
  useEffect(() => {
    if (isMenuOpen && focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex, isMenuOpen]);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const handleContainerBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setIsMenuOpen(false);
      setFocusedIndex(-1);
    }
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsMenuOpen(true);
      setFocusedIndex(0);
    } else if (e.key === "Escape") {
      setIsMenuOpen(false);
      setFocusedIndex(-1);
    }
  };

  const handleItemKeyDown =
    (idx: number) => (e: React.KeyboardEvent<HTMLAnchorElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((prev) =>
          Math.min(prev + 1, allCredentials.length - 1),
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (idx === 0) {
          setIsMenuOpen(false);
          setFocusedIndex(-1);
          triggerRef.current?.focus();
        } else {
          setFocusedIndex((prev) => prev - 1);
        }
      } else if (e.key === "Escape") {
        setIsMenuOpen(false);
        setFocusedIndex(-1);
        triggerRef.current?.focus();
      } else if (e.key === "Tab") {
        setIsMenuOpen(false);
        setFocusedIndex(-1);
      }
    };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      className="group relative w-full h-full overflow-hidden sm:overflow-visible rounded-xl border border-theme-border-primary/40 bg-theme-bg-secondary/60 backdrop-blur-md transition-shadow hover:shadow-2xl hover:shadow-theme-accent-blue/10"
    >
      {/* Top gradient accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-theme-accent-blue/40 to-transparent transition-all duration-500 group-hover:via-theme-accent-blue/70" />

      {/* Mouse radial gradient (desktop) */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 rounded-xl overflow-hidden hidden sm:block"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(120, 119, 198, 0.12),
              transparent 80%
            )
          `,
        }}
      />

      {/* Shimmer for mobile */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 block sm:hidden rounded-xl overflow-hidden"
        style={{
          background:
            "linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.04) 50%, transparent 80%)",
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

      {/* Ambient orbs — theme-safe */}
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-theme-accent-blue/15 blur-3xl transition-all duration-500 group-hover:bg-theme-accent-blue/25 pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-theme-accent-purple/15 blur-3xl transition-all duration-500 group-hover:bg-theme-accent-purple/25 pointer-events-none" />

      <div className="relative flex h-full flex-col p-6">
        {/* Header block */}
        <div className="mb-4">
          {/* Timelaps badge — only when present */}
          {timelaps && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-3"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-theme-accent-blue/10 px-3 py-1 text-xs font-semibold text-theme-accent-blue ring-1 ring-inset ring-theme-accent-blue/25">
                <span className="h-1 w-1 rounded-full bg-theme-accent-blue/70" />
                {timelaps}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: timelaps ? 0.2 : 0.1 }}
            className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-theme-text-primary to-theme-text-primary/70 group-hover:to-theme-accent-blue transition-all duration-300"
          >
            {title}
          </motion.h3>

          {/* Academy with icon */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: timelaps ? 0.3 : 0.2 }}
            className="mt-2 flex items-center gap-1.5"
          >
            <MdSchool className="h-3.5 w-3.5 shrink-0 text-theme-accent-blue/70" />
            <span className="text-sm font-medium text-theme-text-tertiary">
              {academy}
            </span>
          </motion.div>
        </div>

        {/* Content section */}
        <div className="flex flex-1 flex-col justify-between gap-4">
          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: timelaps ? 0.4 : 0.3 }}
              className="text-sm leading-relaxed text-theme-text-secondary/90"
            >
              {description}
            </motion.p>
          )}

          {/* Footer / Credentials */}
          {allCredentials.length > 0 && (
            <div className="mt-2 pt-4 border-t border-theme-border-primary/25 relative z-20">
              {allCredentials.length === 1 ? (
                <motion.a
                  href={allCredentials[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 text-sm font-medium text-theme-text-secondary transition-colors hover:text-theme-accent-blue"
                  whileHover={{ x: 5 }}
                >
                  <span>
                    {allCredentials[0].label || t("studies.certificate")}
                  </span>
                  <GoArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                </motion.a>
              ) : (
                <div
                  ref={containerRef}
                  onBlur={handleContainerBlur}
                  className="relative"
                >
                  <button
                    ref={triggerRef}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    onKeyDown={handleTriggerKeyDown}
                    aria-haspopup="listbox"
                    aria-expanded={isMenuOpen}
                    className="group/btn inline-flex items-center gap-2 text-sm font-medium text-theme-text-secondary transition-colors hover:text-theme-accent-blue focus-visible:ring-2 focus-visible:ring-theme-border-focus rounded"
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
                      <motion.ul
                        role="listbox"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-0 mb-2 w-48 rounded-lg border border-theme-border-primary/40 bg-theme-bg-secondary/95 backdrop-blur-xl shadow-theme-xl p-1 flex flex-col gap-1 overflow-hidden z-50 list-none"
                      >
                        {allCredentials.map((cred, idx) => (
                          <li key={idx} role="option" aria-selected={false}>
                            <a
                              ref={(el) => {
                                itemRefs.current[idx] = el;
                              }}
                              href={cred.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              tabIndex={isMenuOpen ? 0 : -1}
                              onKeyDown={handleItemKeyDown(idx)}
                              className="flex items-center justify-between rounded-md px-3 py-3 text-sm text-theme-text-secondary hover:bg-theme-bg-tertiary/50 hover:text-theme-text-primary transition-colors active:bg-theme-bg-tertiary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-border-focus"
                            >
                              <span className="truncate">
                                {cred.label ||
                                  `${t("studies.certificate")} ${idx + 1}`}
                              </span>
                              <GoArrowUpRight className="h-3 w-3 opacity-50 shrink-0" />
                            </a>
                          </li>
                        ))}
                      </motion.ul>
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
