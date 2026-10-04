// The app's icons: a spiral on teal, drawn as SVG and rendered to PNG with
// the Chromium the sandbox provides (Playwright from the formatter checkout).
// Run: node scripts/icons.mjs
import { writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const pts = []
const turns = 3.25
for (let i = 0; i <= 400; i++) {
  const t = (i / 400) * turns * 2 * Math.PI
  const r = 18 + (t / (turns * 2 * Math.PI)) * 168
  pts.push(`${(256 + r * Math.cos(t)).toFixed(1)},${(256 + r * Math.sin(t)).toFixed(1)}`)
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<rect width="512" height="512" fill="#1f5f5b"/>
<polyline points="${pts.join(' ')}" fill="none" stroke="#f6f1e8" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="256" cy="256" r="16" fill="#e7b75f"/>
</svg>`
writeFileSync('icons/icon.svg', svg)

const require = createRequire('/home/user/Public-Domain-Book-Formatter/package.json')
const { chromium } = require('playwright')
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' })
const page = await browser.newPage()
for (const [name, size] of [['icon-192.png', 192], ['icon-512.png', 512], ['apple-touch-icon.png', 180]]) {
  await page.setViewportSize({ width: size, height: size })
  await page.setContent(`<style>body{margin:0}</style>${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}`)
  await page.screenshot({ path: `icons/${name}`, omitBackground: false })
}
await browser.close()
console.log('icons written')
