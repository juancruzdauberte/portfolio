import { Transition, Variant } from 'framer-motion';

/**
 * Configuraciones de animación optimizadas para rendimiento
 * Usando GPU acceleration y reduciendo reflows
 */

// Transiciones optimizadas
export const transitions = {
  // Spring suave y rápido
  spring: {
    type: 'spring' as const,
    stiffness: 260,
    damping: 20,
  },
  // Spring más suave
  softSpring: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 15,
  },
  // Ease out rápido
  fast: {
    duration: 0.2,
    ease: 'easeOut' as const,
  },
  // Ease out normal
  normal: {
    duration: 0.3,
    ease: 'easeOut' as const,
  },
  // Ease out lento
  slow: {
    duration: 0.5,
    ease: 'easeOut' as const,
  },
} as const;

// Variantes de entrada optimizadas
export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

export const slideInLeft = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

export const slideInRight = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

// Variantes de stagger para listas
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.softSpring,
  },
};

// Hover optimizado (solo transform y opacity para GPU)
export const hoverScale = {
  scale: 1.05,
  transition: transitions.fast,
};

export const hoverLift = {
  y: -8,
  transition: transitions.fast,
};

// Tap feedback
export const tapScale = {
  scale: 0.95,
};

/**
 * Función para crear animaciones condicionales basadas en reducedMotion
 */
export const conditionalAnimation = (
  animation: Variant,
  reducedMotion: boolean
): Variant => {
  if (reducedMotion) {
    return {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    };
  }
  return animation;
};

/**
 * Función para simplificar animaciones en móviles
 */
export const mobileOptimizedAnimation = (
  desktopAnimation: Variant,
  isMobile: boolean
): Variant => {
  if (isMobile) {
    // En móviles, reducir complejidad
    return {
      ...desktopAnimation,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    };
  }
  return desktopAnimation;
};

/**
 * Layout IDs para animaciones compartidas optimizadas
 */
export const layoutTransition: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
};

/**
 * Configuración para will-change automático
 * Solo en elementos que realmente lo necesitan
 */
export const willChange = {
  transform: 'transform',
  opacity: 'opacity',
};
