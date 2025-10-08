// ============================================
// UTILIDADES DE ANIMACIÓN OPTIMIZADAS
// ============================================

import type { Transition, Variants } from "framer-motion";

/**
 * Transiciones predefinidas optimizadas para performance
 */
export const transitions = {
  // Ultra rápida para interacciones inmediatas
  instant: {
    duration: 0.15,
    ease: [0.4, 0, 0.2, 1],
  } as Transition,

  // Rápida para micro-interacciones
  fast: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1],
  } as Transition,

  // Normal para la mayoría de animaciones
  normal: {
    duration: 0.5,
    ease: [0.4, 0, 0.2, 1],
  } as Transition,

  // Suave para elementos importantes
  smooth: {
    duration: 0.8,
    ease: [0.4, 0, 0.2, 1],
  } as Transition,

  // Spring suave
  softSpring: {
    type: "spring",
    stiffness: 100,
    damping: 15,
    mass: 0.8,
  } as Transition,

  // Spring con rebote
  bounceSpring: {
    type: "spring",
    stiffness: 300,
    damping: 20,
    mass: 1,
  } as Transition,

  // Spring rápido
  snappySpring: {
    type: "spring",
    stiffness: 400,
    damping: 25,
    mass: 0.5,
  } as Transition,
} as const;

/**
 * Valores de escala para hover y tap optimizados
 */
export const hoverScale = {
  scale: 1.05,
  transition: transitions.fast,
};

export const tapScale = {
  scale: 0.95,
  transition: transitions.instant,
};

/**
 * Variantes de fade con direcciones
 */
export const fadeVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  } as Variants,

  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  } as Variants,

  fadeInDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  } as Variants,

  fadeInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  } as Variants,

  fadeInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  } as Variants,
} as const;

/**
 * Variantes de escala
 */
export const scaleVariants = {
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  } as Variants,

  scaleInRotate: {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: { opacity: 1, scale: 1, rotate: 0 },
  } as Variants,

  popIn: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: transitions.bounceSpring,
    },
  } as Variants,
} as const;

/**
 * Variantes de stagger para listas
 */
export const staggerVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  } as Variants,

  fastContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  } as Variants,

  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitions.softSpring,
    },
  } as Variants,
} as const;

/**
 * Configuración de viewport optimizada
 */
export const viewportConfig = {
  // Para elementos grandes que ocupan mucho espacio
  large: {
    once: true,
    amount: 0.3,
    margin: "0px 0px -100px 0px",
  },

  // Para elementos medianos
  medium: {
    once: true,
    amount: 0.5,
    margin: "0px 0px -50px 0px",
  },

  // Para elementos pequeños o listas
  small: {
    once: true,
    amount: 0.8,
    margin: "0px",
  },
} as const;

/**
 * Configuración de gestos para elementos interactivos
 */
export const gestureConfig = {
  // Hover para botones y links
  hoverButton: {
    whileHover: hoverScale,
    whileTap: tapScale,
  },

  // Hover para cards
  hoverCard: {
    whileHover: {
      y: -8,
      scale: 1.02,
      transition: transitions.fast,
    },
    whileTap: {
      scale: 0.98,
      transition: transitions.instant,
    },
  },

  // Hover para íconos
  hoverIcon: {
    whileHover: {
      scale: 1.2,
      rotate: 5,
      transition: transitions.fast,
    },
    whileTap: {
      scale: 0.9,
      rotate: -5,
      transition: transitions.instant,
    },
  },
} as const;

/**
 * Animaciones de gradiente
 */
export const gradientAnimations = {
  // Gradiente que se mueve horizontalmente
  shiftHorizontal: {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    },
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "linear",
    },
  },

  // Gradiente que se mueve en diagonal
  shiftDiagonal: {
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
    },
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear",
    },
  },
} as const;

/**
 * Animaciones de rotación
 */
export const rotateAnimations = {
  // Rotación continua lenta
  continuousSlow: {
    animate: { rotate: 360 },
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  },

  // Rotación continua rápida
  continuousFast: {
    animate: { rotate: 360 },
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear",
    },
  },

  // Rotación inversa
  continuousReverse: {
    animate: { rotate: -360 },
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: "linear",
    },
  },

  // Wiggle (sacudida)
  wiggle: {
    animate: { rotate: [0, 10, -10, 10, 0] },
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 5,
    },
  },
} as const;

/**
 * Animaciones de pulsación
 */
export const pulseAnimations = {
  // Pulso de opacidad suave
  opacity: {
    animate: { opacity: [1, 0.7, 1] },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },

  // Pulso de escala
  scale: {
    animate: { scale: [1, 1.05, 1] },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },

  // Pulso de brillo
  glow: {
    animate: {
      boxShadow: [
        "0 0 10px rgba(96, 165, 250, 0.5)",
        "0 0 20px rgba(96, 165, 250, 0.8)",
        "0 0 10px rgba(96, 165, 250, 0.5)",
      ],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
} as const;

/**
 * Animaciones de floating (flotación)
 */
export const floatAnimations = {
  // Float vertical suave
  vertical: {
    animate: { y: [0, -15, 0] },
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },

  // Float vertical rápido
  verticalFast: {
    animate: { y: [0, -10, 0] },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },

  // Float horizontal
  horizontal: {
    animate: { x: [0, 15, 0] },
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
} as const;

/**
 * Helper para crear variantes personalizadas con delay
 */
export const createDelayedVariant = (
  baseVariant: Variants,
  delay: number
): Variants => {
  return {
    hidden: baseVariant.hidden,
    visible: {
      ...baseVariant.visible,
      transition: {
        ...(baseVariant.visible as any).transition,
        delay,
      },
    },
  };
};

/**
 * Helper para optimizar will-change basado en hover
 */
export const optimizeWillChange = (isHovered: boolean) => ({
  willChange: isHovered ? "transform, opacity" : "auto",
});

/**
 * Configuración para elementos que entran desde los bordes
 */
export const edgeEntryVariants = {
  fromLeft: {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: transitions.smooth,
    },
  } as Variants,

  fromRight: {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: transitions.smooth,
    },
  } as Variants,

  fromTop: {
    hidden: { y: "-100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: transitions.smooth,
    },
  } as Variants,

  fromBottom: {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: transitions.smooth,
    },
  } as Variants,
} as const;

/**
 * Variantes para modales y overlays
 */
export const modalVariants = {
  backdrop: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  } as Variants,

  modal: {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: transitions.bounceSpring,
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: transitions.fast,
    },
  } as Variants,
} as const;

/**
 * Configuración de drag constraints
 */
export const dragConfig = {
  // Drag horizontal limitado
  horizontalLimited: {
    drag: "x" as const,
    dragConstraints: { left: -100, right: 100 },
    dragElastic: 0.1,
  },

  // Drag vertical limitado
  verticalLimited: {
    drag: "y" as const,
    dragConstraints: { top: -100, bottom: 100 },
    dragElastic: 0.1,
  },

  // Drag libre con límites
  freeLimited: {
    drag: true,
    dragConstraints: { top: -50, bottom: 50, left: -50, right: 50 },
    dragElastic: 0.2,
  },
} as const;
