// AVORA Design System — Motion Tokens
// Reference: TASK_002_DESIGN_SYSTEM.md Section 7 动效系统

export const EASING = {
  standard: [0.4, 0, 0.2, 1],      // ease-standard
  enter: [0, 0, 0.2, 1],           // ease-enter
  exit: [0.4, 0, 1, 1],            // ease-exit
  luxury: [0.16, 1, 0.3, 1],       // ease-luxury (hero, collection banners)
} as const

export const DURATION = {
  instant: 0.1,
  fast: 0.15,
  default: 0.25,
  slow: 0.4,
  luxury: 0.6,
  cinematic: 1.0,
} as const

export const SPRING = {
  default: { stiffness: 300, damping: 30 },
  smooth: { stiffness: 200, damping: 25 },
  card: { stiffness: 400, damping: 32 },
  drawer: { stiffness: 350, damping: 35 },
} as const

// ---- Reusable variants ----

export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.luxury, ease: EASING.luxury },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.default, ease: EASING.standard },
  },
}

export const fadeInWithDelay = (delay: number) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.luxury,
      ease: EASING.luxury,
      delay,
    },
  },
})

export const staggerContainer = (staggerDelay = 0.08) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
})

export const cardHover = {
  rest: { y: 0 },
  hover: {
    y: -6,
    transition: { duration: 0.3, ...SPRING.card },
  },
}

export const imageHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.04,
    transition: { duration: 0.5, ease: EASING.standard },
  },
}
