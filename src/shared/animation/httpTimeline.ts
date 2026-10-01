import { dur, ease } from './motion'

/** Selectors match the data-el attributes rendered by organisms/HttpExchange. */
const el = {
  client: '[data-el=client]', server: '[data-el=server]', work: '[data-el=work]', page: '[data-el=page]',
  req: '[data-el=req]', res: '[data-el=res]',
  reqTrail: '[data-el=req] [data-trail]', resTrail: '[data-el=res] [data-trail]',
  hop1: '[data-el=hop-1]', hop2: '[data-el=hop-2]',
}

// Every tween below is a fromTo with explicit start values, so scrubbing/jumping to any time
// renders the correct frame (lazily-read start values break when the playhead jumps).
// Factories, not shared objects: GSAP may mutate the vars it is given.
const hidden = () => ({ opacity: 0, scale: 0.6 })
const shown = () => ({ opacity: 1, scale: 1 })
const atClient = () => ({ left: '0%', xPercent: 0 })
const atServer = () => ({ left: '100%', xPercent: -100 })
const later = { immediateRender: false } // don't apply this tween's "from" at build time

// While a packet runs it wobbles (rotation 0 → ±3° → 0, whole legs so it ends level).
const WOBBLE = [0, -3, 3, -3, 3, -3, 3, -3, 0]
// Where the packet is (as a share of the trip) when it passes the relay points, for power1.inOut.
const PASS = { first: 0.407, second: 0.593 }

/** A packet "runs" between the two ends: moves, leaves a speed trail, wobbles, and pings relays. */
function run(tl: gsap.core.Timeline, at: string, packet: string, trail: string, from: () => object, to: () => object) {
  tl.fromTo(packet, from(), { ...to(), duration: dur.travel, ease: ease.travel, ...later }, at)
  tl.to(packet, { keyframes: { rotation: WOBBLE, easeEach: ease.wobble }, duration: dur.travel, ease: ease.linear }, at)
  tl.fromTo(trail, { scaleX: 0 }, { scaleX: 1, duration: dur.trail, ease: ease.out, ...later }, at)
  tl.fromTo(trail, { scaleX: 1 }, { scaleX: 0, duration: dur.trail, ...later }, `${at}+=${dur.travel - dur.trail}`)
}

function ping(tl: gsap.core.Timeline, hop: string, at: string, share: number) {
  const t = (dur.travel * share).toFixed(3)
  tl.fromTo(hop, { scale: 1, opacity: 0.7 }, { scale: 1.9, opacity: 1, duration: dur.hop, yoyo: true, repeat: 1, ease: ease.out }, `${at}+=${t}`)
}

/** Labels double as step stops: request → send → process → respond → back → render. */
export function buildHttpTimeline(tl: gsap.core.Timeline) {
  tl.addLabel('request')
    .fromTo(el.req, { ...hidden(), ...atClient() }, { ...shown(), duration: dur.base, ease: ease.pop })
    .fromTo(el.client, { scale: 1 }, { scale: 1.05, duration: dur.fast, yoyo: true, repeat: 1 }, '<')

  tl.addLabel('send')
  run(tl, 'send', el.req, el.reqTrail, atClient, atServer)
  ping(tl, el.hop1, 'send', PASS.first)
  ping(tl, el.hop2, 'send', PASS.second)

  tl.addLabel('process')
    .fromTo(el.req, shown(), { ...hidden(), duration: dur.fast, ...later })
    .fromTo(el.server, { scale: 1 }, { scale: 1.05, duration: dur.fast, yoyo: true, repeat: 3 }, '<')
    .fromTo(el.work, { scaleX: 0 }, { scaleX: 1, duration: dur.work, ease: ease.linear }, '<')

  tl.addLabel('respond')
    .fromTo(el.res, { ...hidden(), ...atServer() }, { ...shown(), duration: dur.base, ease: ease.pop })
  tl.addLabel('back')
  run(tl, 'back', el.res, el.resTrail, atServer, atClient)
  ping(tl, el.hop2, 'back', PASS.first)
  ping(tl, el.hop1, 'back', PASS.second)

  tl.addLabel('render')
    .fromTo(el.res, shown(), { ...hidden(), duration: dur.fast, ...later })
    .fromTo(el.page, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: dur.base }, '<')
    .to({}, { duration: 0.6 }) // hold the final frame briefly
}
