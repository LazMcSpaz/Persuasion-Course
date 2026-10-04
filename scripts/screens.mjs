// Screenshots of the app at phone width, and the offline check: load once,
// cut the network, reload, and see the course. Needs `npm run serve` running.
// Run: node scripts/screens.mjs
import { mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'
const require = createRequire('/home/user/Public-Domain-Book-Formatter/package.json')
const { chromium } = require('playwright')

const base = process.env.BASE ?? 'http://localhost:8080/'
mkdirSync('screenshots', { recursive: true })
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' })
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: process.env.SCHEME ?? 'light' })
const page = await ctx.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))

const shots = (process.env.ROUTES ?? '#/,#/m/m00,#/m/m04/l/m04-l2,#/m/m04/drill,#/m/m04/practise,#/m/m04/roleplay,#/log,#/timer,#/settings').split(',')
await page.goto(base)
await page.evaluate(() => localStorage.setItem('persuasion-course.v1', JSON.stringify({ settings: { unlockAll: true } })))
// A change of hash alone does not reload the document, so the stored state
// above would never be read: load each route fresh.
for (const r of shots) {
  await page.goto(base + r)
  await page.reload()
  await page.waitForTimeout(250)
  await page.screenshot({ path: `screenshots/${r.replace(/[#/]+/g, '_').replace(/^_|_$/g, '') || 'home'}.png`, fullPage: process.env.FULL === '1' })
}

// Offline: the service worker must have cached everything on first load.
await page.goto(base)
await page.evaluate(() => navigator.serviceWorker.ready)
await page.waitForTimeout(500)
await ctx.setOffline(true)
await page.reload()
await page.waitForTimeout(500)
const offline = await page.locator('.map').count()
console.log(offline ? 'offline: course renders' : 'offline: FAILED')
console.log(errors.length ? `errors:\n${errors.join('\n')}` : 'no console errors')
await browser.close()
process.exit(offline && !errors.length ? 0 : 1)
