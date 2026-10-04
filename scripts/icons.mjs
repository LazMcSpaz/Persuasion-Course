// The app's icons: a white spiral on indigo, drawn as SVG and rendered to
// PNG with the Chromium the sandbox provides (see scripts/playwright.mjs).
// Run: node scripts/icons.mjs
import { writeFileSync } from 'node:fs'
import { chromium, executablePath } from './playwright.mjs'

const pts = []
const turns = 3.25
for (let i = 0; i <= 400; i++) {
  const t = (i / 400) * turns * 2 * Math.PI
  const r = 18 + (t / (turns * 2 * Math.PI)) * 168
  pts.push(`${(256 + r * Math.cos(t)).toFixed(1)},${(256 + r * Math.sin(t)).toFixed(1)}`)
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7a78f2"/><stop offset="1" stop-color="#4744c4"/></linearGradient>
<radialGradient id="glow" cx="0.5" cy="0.42" r="0.6"><stop offset="0" stop-color="#ffffff" stop-opacity="0.18"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
</defs>
<rect width="512" height="512" fill="url(#bg)"/>
<rect width="512" height="512" fill="url(#glow)"/>
<polyline points="${pts.join(' ')}" fill="none" stroke="#ffffff" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="256" cy="256" r="17" fill="#ffd27a"/>
</svg>`
writeFileSync('icons/icon.svg', svg)

const browser = await chromium.launch({ executablePath })
const page = await browser.newPage()
for (const [name, size] of [['icon-192.png', 192], ['icon-512.png', 512], ['apple-touch-icon.png', 180]]) {
  await page.setViewportSize({ width: size, height: size })
  await page.setContent(`<style>body{margin:0}</style>${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}`)
  await page.screenshot({ path: `icons/${name}`, omitBackground: false })
}
await browser.close()
console.log('icons written')
