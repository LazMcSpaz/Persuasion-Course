# The Course

A self-paced course in conversational hypnosis and influence, built as a
web app you add to your phone's Home Screen. Sixteen modules on a skill
ladder: rapport and calibration, then the Milton Model in depth (vague
language, linkage, Mike Mandel's NUVI run-on sentence, presuppositions,
embedded commands, stories, utilization), then imagery, framing,
precision questions and commitment, ending in whole conversations.

Each module has short lessons, drills (graded, plus rewrites you check
against examples), assignments you log rep by rep (on your own, in
everyday conversations, in the field, and role-plays with Claude), and
scenario cards that copy a role-play brief for a Claude chat. A module
opens when the one before it is passed; field work keeps running toward
mastery while you move on.

Every technique carries an honest evidence tag: supported, mixed, or
unproven. The only research cited is in `content/EVIDENCE.md`.

## Install on iPhone

Open the site in Safari, tap Share, then **Add to Home Screen**. It runs
full screen and works offline. Progress is stored on the device: use
Settings → Copy backup now and then.

## Working on it

No build step and no dependencies. Content is plain ES modules in
`content/`, written to `content/SCHEMA.md`.

```bash
npm run serve          # http://localhost:8080
npm test               # content against the schema, and the progress rules
npm run build          # regenerate sw.js and the version stamp; run before committing
npm run check          # what CI would ask: build is current and tests pass
node scripts/icons.mjs # redraw the icons
node scripts/screens.mjs  # 390px screenshots and the offline check (needs serve)
```

The look is an iPhone app's: system grays, one indigo accent, grouped
lists and a floating tab bar, all as custom properties at the top of
`src/styles.css`, with a dark set. On Apple devices the type is SF Pro and
New York; elsewhere it falls back to Inter and Source Serif, bundled in
`fonts/` (SIL Open Font License) so nothing is fetched. Icons are inline
SVG in `src/icons.js`. Motion is light and switches off under Reduce
Motion.

The screenshot script takes `SCHEME=dark`, `ROUTES='#/,#/timer'`, `FULL=1`,
`OUT=dir`, and `STATE=file.json` to seed progress. Playwright is not a
dependency: `scripts/playwright.mjs` finds it next door, in
`node_modules`, or in the global npm install.
