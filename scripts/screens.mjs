// Screenshots of the app at phone width, and the offline check: load once,
// cut the network, reload, and see the course. Needs `npm run serve` running.
// Run: node scripts/screens.mjs  (SCHEME=dark, ROUTES='#/,#/timer', FULL=1, OUT=dir)
// STATE=file.json seeds the stored progress instead of an empty course.
import { mkdirSync, readFileSync } from 'node:fs'
import { chromium, executablePath } from './playwright.mjs'

const base = process.env.BASE ?? 'http://localhost:8080/'
const out = process.env.OUT ?? 'screenshots'
mkdirSync(out, { recursive: true })
const browser = await chromium.launch({ executablePath })
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: process.env.SCHEME ?? 'light' })
const page = await ctx.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))

const shots = (process.env.ROUTES ?? '#/,#/m/m00,#/m/m04/l/m04-l2,#/m/m04/drill,#/m/m04/practise,#/m/m04/roleplay,#/log,#/timer,#/settings').split(',')
await page.goto(base)
const seed = process.env.STATE ? JSON.parse(readFileSync(process.env.STATE, 'utf8')) : { settings: { unlockAll: true } }
await page.evaluate((s) => localStorage.setItem('persuasion-course.v1', JSON.stringify(s)), seed)
// A change of hash alone does not reload the document, so the stored state
// above would never be read: load each route fresh.
for (const r of shots) {
  await page.goto(base + r)
  await page.reload()
  await page.waitForTimeout(1100)
  await page.screenshot({ path: `${out}/${r.replace(/[#/]+/g, '_').replace(/^_|_$/g, '') || 'home'}.png`, fullPage: process.env.FULL === '1' })
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
