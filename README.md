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
```
