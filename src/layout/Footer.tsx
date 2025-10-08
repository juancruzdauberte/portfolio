import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TbMailShare } from "react-icons/tb";
import { motion } from "framer-motion";

export const Footer = () => {
  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/juancruzdauberte/",
      icon: <FaLinkedin />,
      colorFrom: "from-theme-accent-blue",
      colorTo: "to-theme-accent-blue-dark",
      label: "LinkedIn",
    },
    {
      href: "https://github.com/juancruzdauberte",
      icon: <FaGithub />,
      colorFrom: "from-gray-700 dark:from-gray-600",
      colorTo: "to-gray-900 dark:to-gray-800",
      label: "GitHub",
    },
    {
      href: "mailto:juandauberte@gmail.com",
      icon: <TbMailShare />,
      colorFrom: "from-theme-accent-pink",
      colorTo: "to-theme-accent-pink-light",
      label: "Email",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-3 sm:gap-4 md:gap-5 py-4 sm:py-5 items-center relative px-4"
    >
      <motion.section
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.span
          className="font-bold text-lg sm:text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-primary"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          © Juan Cruz Dauberte
        </motion.span>
      </motion.section>

      <motion.section
        className="flex gap-2 sm:gap-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group flex items-center justify-center border border-theme-border-secondary rounded-full p-1 md:p-2 overflow-hidden transition-colors"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.5 + index * 0.1,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            whileHover={{
              scale: 1.15,
              rotate: 360,
              transition: { duration: 0.5 },
            }}
            whileTap={{ scale: 0.9 }}
            aria-label={link.label}
          >
            {/* Fondo gradiente animado con colores de tema */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${link.colorFrom} ${link.colorTo} opacity-0 group-hover:opacity-100 rounded-full`}
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Efecto de brillo */}
            <motion.div
              className="absolute inset-0 bg-white dark:bg-white/20 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{
                scale: [0, 1.5, 2],
                opacity: [0, 0.3, 0],
              }}
              transition={{ duration: 0.6 }}
            />

            {/* Ícono con color de tema */}
            <span className="relative z-10 group-hover:text-white transition-colors text-theme-text-primary">
              {link.icon}
            </span>

            {/* Glow effect con colores de tema */}
            <motion.div
              className={`absolute inset-0 rounded-full blur-xl bg-gradient-to-r ${link.colorFrom} ${link.colorTo}`}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.5 }}
              transition={{ duration: 0.3 }}
              style={{ transform: "scale(1.5)" }}
            />
          </motion.a>
        ))}
      </motion.section>

      {/* Partículas decorativas con colores de tema */}
      <motion.div
        className="absolute bottom-4 left-10 w-2 h-2 bg-theme-accent-blue rounded-full"
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-8 right-10 w-2 h-2 bg-theme-accent-purple rounded-full"
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </motion.section>
  );
};
