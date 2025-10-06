import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TbMailShare } from "react-icons/tb";
import { motion } from "framer-motion";

export const Footer = () => {
  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/juancruzdauberte/",
      icon: <FaLinkedin />,
      color: "from-blue-500 to-blue-700",
      label: "LinkedIn",
    },
    {
      href: "https://github.com/juancruzdauberte",
      icon: <FaGithub />,
      color: "from-gray-700 to-gray-900",
      label: "GitHub",
    },
    {
      href: "mailto:juandauberte@gmail.com",
      icon: <TbMailShare />,
      color: "from-red-500 to-pink-600",
      label: "Email",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-5 py-5 items-center relative"
    >
      {/* Línea decorativa superior */}
      {/* <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        initial={{ width: 0 }}
        whileInView={{ width: "80%" }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      /> */}

      <motion.section
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.span
          className="font-bold md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
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
        className="flex gap-1 md:gap-2"
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
            className="relative group flex items-center justify-center border border-black rounded-full p-1 md:p-2 dark:border-white overflow-hidden"
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
            {/* Fondo gradiente animado */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-100 rounded-full`}
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Efecto de brillo */}
            <motion.div
              className="absolute inset-0 bg-white rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{
                scale: [0, 1.5, 2],
                opacity: [0, 0.3, 0],
              }}
              transition={{ duration: 0.6 }}
            />

            {/* Ícono */}
            <span className="relative z-10 group-hover:text-white transition-colors">
              {link.icon}
            </span>

            {/* Glow effect */}
            <motion.div
              className={`absolute inset-0 rounded-full blur-xl bg-gradient-to-r ${link.color}`}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.5 }}
              transition={{ duration: 0.3 }}
              style={{ transform: "scale(1.5)" }}
            />
          </motion.a>
        ))}
      </motion.section>

      {/* Partículas decorativas */}
      <motion.div
        className="absolute bottom-4 left-10 w-2 h-2 bg-blue-400 rounded-full"
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
        className="absolute bottom-8 right-10 w-2 h-2 bg-purple-400 rounded-full"
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
