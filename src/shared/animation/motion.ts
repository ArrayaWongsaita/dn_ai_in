/** Shared timing vocabulary for GSAP timelines (seconds). Keep in step with --dur in tokens.css. */
export const dur = { fast: 0.25, base: 0.5, travel: 1.2, work: 1.2, hop: 0.15, trail: 0.3, wobble: 0.15 } as const

export const ease = { travel: 'power1.inOut', pop: 'back.out(2)', linear: 'none', wobble: 'sine.inOut', out: 'power2.out' } as const
