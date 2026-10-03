import { dur, ease } from '../motion'

/** Labels stop after each reveal, so a manual next step includes its full message. */
export function revealSteps(tl: gsap.core.Timeline, count: number) {
  tl.addLabel('roles')
  for (let i = 0; i < count; i++) {
    tl.fromTo(`[data-el="message-${i}"]`, { opacity: 0, xPercent: -5 }, {
      opacity: 1, xPercent: 0, duration: dur.base, ease: ease.out,
    }).addLabel(`step-${i}`)
  }
}
