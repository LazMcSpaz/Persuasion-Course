// Playwright is not a dependency of the app. The scripts that drive a
// browser find it in the formatter checkout next door, in this folder's
// node_modules, or in the global npm install, whichever comes first.
import { createRequire } from 'node:module'
import { execSync } from 'node:child_process'
import { join } from 'node:path'

function globalRoot() {
  try {
    return execSync('npm root -g', { encoding: 'utf8' }).trim()
  } catch {
    return null
  }
}

const places = [
  process.env.PLAYWRIGHT_FROM,
  '/home/user/Public-Domain-Book-Formatter/package.json',
  new URL('../package.json', import.meta.url).pathname,
  globalRoot() && join(globalRoot(), 'noop.js'),
].filter(Boolean)

let found = null
for (const p of places) {
  try {
    found = createRequire(p)('playwright')
    break
  } catch {}
}
if (!found) throw new Error('Playwright not found: npm i --no-save playwright, or set PLAYWRIGHT_FROM')
export const { chromium } = found
export const executablePath = process.env.CHROMIUM ?? '/opt/pw-browsers/chromium'
