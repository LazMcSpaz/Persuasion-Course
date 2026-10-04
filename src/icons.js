/**
 * The app's icons: 24px line drawings in the current text colour, inlined so
 * nothing is fetched. Paths marked pathLength="1" can be drawn on with CSS.
 */
const P = {
  course: '<path d="M12 6.5C10.3 5 8 4.5 3.5 4.5v13c4.5 0 6.8.5 8.5 2 1.7-1.5 4-2 8.5-2v-13C16 4.5 13.7 5 12 6.5Z"/><path d="M12 6.5v13"/>',
  review: '<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8"/><path d="M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14.3 4.9L20 16"/><path d="M20 20v-4h-4"/>',
  log: '<path d="M14 4.5H7A2.5 2.5 0 0 0 4.5 7v10A2.5 2.5 0 0 0 7 19.5h10a2.5 2.5 0 0 0 2.5-2.5v-6"/><path d="M17.6 3.9a1.9 1.9 0 0 1 2.7 2.7L13 13.9l-3.5.9.9-3.5 7.2-7.4Z"/>',
  timer: '<circle cx="12" cy="13.5" r="7.5"/><path d="M12 10v3.8l2.4 1.6"/><path d="M9.5 2.75h5"/><path d="m18.5 6.5 1.2-1.2"/>',
  settings: '<path d="M4 7h9"/><path d="M17 7h3"/><circle cx="15" cy="7" r="2"/><path d="M4 17h3"/><path d="M11 17h9"/><circle cx="9" cy="17" r="2"/>',
  reference: '<path d="M5 4.5h11A2.5 2.5 0 0 1 18.5 7v12.5H7.5A2.5 2.5 0 0 1 5 17V4.5Z"/><path d="M5 17a2.5 2.5 0 0 1 2.5-2.5h11"/><path d="M9 8.5h5.5"/>',
  chev: '<path d="m9 5 7 7-7 7"/>',
  back: '<path d="m15 5-7 7 7 7"/>',
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  check: '<path pathLength="1" d="m5 12.5 4.5 4.5L19 7.5"/>',
  x: '<path pathLength="1" d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
  checkCircle: '<circle cx="12" cy="12" r="8.5"/><path pathLength="1" d="m8.3 12.2 2.5 2.5 5-5"/>',
  xCircle: '<circle cx="12" cy="12" r="8.5"/><path pathLength="1" d="m9.2 9.2 5.6 5.6M14.8 9.2l-5.6 5.6"/>',
  lock: '<rect x="5" y="10.5" width="14" height="9.5" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
  seal: '<path d="m12 3.5 2.1 1.5 2.6-.1.8 2.5 2.1 1.5-.8 2.5.8 2.5-2.1 1.5-.8 2.5-2.6-.1-2.1 1.5-2.1-1.5-2.6.1-.8-2.5-2.1-1.5.8-2.5-.8-2.5 2.1-1.5.8-2.5 2.6.1Z"/><path d="m9.2 12.1 1.9 1.9 3.8-3.8"/>',
  supported: '<circle cx="12" cy="12" r="8.5"/><path d="m8.3 12.2 2.5 2.5 5-5"/>',
  mixed: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17Z" fill="currentColor" stroke="none"/>',
  unproven: '<circle cx="12" cy="12" r="8.5"/><path d="M9.8 9.6a2.3 2.3 0 0 1 4.4.9c0 1.5-2.2 2-2.2 3.2"/><path d="M12 16.6h.01"/>',
  flask: '<path d="M9.5 4h5"/><path d="M10.5 4v5.2L5.3 17.8A1.5 1.5 0 0 0 6.6 20h10.8a1.5 1.5 0 0 0 1.3-2.2l-5.2-8.6V4"/><path d="M7.8 14.5h8.4"/>',
  solo: '<circle cx="12" cy="8.5" r="3.5"/><path d="M5 19.5c.8-3.4 3.6-5.5 7-5.5s6.2 2.1 7 5.5"/>',
  everyday: '<path d="M20 11.5c0 4.1-3.6 7.5-8 7.5-1.2 0-2.3-.2-3.3-.6l-4.2 1.1 1.2-3.5A7.2 7.2 0 0 1 4 11.5C4 7.4 7.6 4 12 4s8 3.4 8 7.5Z"/>',
  field: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".9" fill="currentColor"/>',
  chat: '<path d="M12 3.5c.6 3.9 2.6 5.9 6.5 6.5-3.9.6-5.9 2.6-6.5 6.5-.6-3.9-2.6-5.9-6.5-6.5 3.9-.6 5.9-2.6 6.5-6.5Z"/><path d="M18.5 15.5c.3 1.6 1 2.3 2.5 2.5-1.5.3-2.2 1-2.5 2.5-.3-1.5-1-2.2-2.5-2.5 1.5-.2 2.2-.9 2.5-2.5Z"/>',
  copy: '<rect x="8.5" y="8.5" width="11" height="11" rx="2.5"/><path d="M15.5 8.5V7A2.5 2.5 0 0 0 13 4.5H7A2.5 2.5 0 0 0 4.5 7v6A2.5 2.5 0 0 0 7 15.5h1.5"/>',
  external: '<path d="M8 16 16.5 7.5"/><path d="M9.5 7.5h7v7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  cards: '<rect x="4.5" y="6.5" width="12" height="13" rx="2.5"/><path d="M8 4.5h9a2.5 2.5 0 0 1 2.5 2.5v10"/>',
  retry: '<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3L4.5 9"/><path d="M4.5 4.5V9H9"/>',
  shuffle: '<path d="M4 7h3.5c4 0 5 10 9 10H20"/><path d="M4 17h3.5c1.6 0 2.7-1.6 3.6-3.5M13 10.5c.9-1.9 2-3.5 3.5-3.5H20"/><path d="m17.5 4.5 2.5 2.5-2.5 2.5M17.5 14.5l2.5 2.5-2.5 2.5"/>',
  auto: '<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" stroke="none"/>',
  light: '<circle cx="12" cy="12" r="3.75"/><path d="M12 3v1.5M12 19.5V21M3 12h1.5M19.5 12H21M5.6 5.6l1.1 1.1M17.3 17.3l1.1 1.1M5.6 18.4l1.1-1.1M17.3 6.7l1.1-1.1"/>',
  dark: '<path d="M19.5 14.2A7.5 7.5 0 0 1 9.8 4.5a7.5 7.5 0 1 0 9.7 9.7Z"/>',
  download: '<path d="M12 4.5v10"/><path d="m7.5 10.5 4.5 4.5 4.5-4.5"/><path d="M5 19.5h14"/>',
  restore: '<path d="M12 15V5"/><path d="m7.5 9 4.5-4.5L16.5 9"/><path d="M5 19.5h14"/>',
  trash: '<path d="M4.5 7h15"/><path d="M9.5 7V5.5A1.5 1.5 0 0 1 11 4h2a1.5 1.5 0 0 1 1.5 1.5V7"/><path d="M6.5 7l.8 11.1A2 2 0 0 0 9.3 20h5.4a2 2 0 0 0 2-1.9L17.5 7"/>',
  mic: '<rect x="9" y="3.5" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0"/><path d="M12 18v2.5"/>',
}

export const icon = (name, cls = '') =>
  `<svg class="ic${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" aria-hidden="true">${P[name] ?? ''}</svg>`

/** The spiral from the app icon, for decoration. Drawn once. */
let spiralSvg = null
export function spiral(cls = 'spiral') {
  if (!spiralSvg) {
    const pts = []
    const turns = 3.25
    for (let i = 0; i <= 180; i++) {
      const t = (i / 180) * turns * 2 * Math.PI
      const r = 5 + (t / (turns * 2 * Math.PI)) * 90
      pts.push(`${(100 + r * Math.cos(t)).toFixed(1)},${(100 + r * Math.sin(t)).toFixed(1)}`)
    }
    spiralSvg = `viewBox="0 0 200 200" aria-hidden="true"><polyline points="${pts.join(' ')}"/><circle cx="100" cy="100" r="5"/></svg>`
  }
  return `<svg class="${cls}" ${spiralSvg}`
}
