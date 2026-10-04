import { modules } from '../content/index.js'
import { render, inline, esc } from './md.js'
import * as store from './store.js'
import {
  PASS_MARK,
  isAuto,
  drillScore,
  rewritesDone,
  repsOf,
  assignmentDone,
  lessonsRead,
  passed,
  hasPassed,
  mastered,
  unlocked,
  outstanding,
  fraction,
  rolePlayPrompt,
} from './progress.js'
import { nominalizations, verbs, linkages, topics, pick } from './words.js'

const $app = document.getElementById('app')
const st = () => store.get()
const byId = new Map(modules.map((m, i) => [m.id, { m, i }]))

const KIND = {
  solo: 'On your own',
  everyday: 'Everyday',
  field: 'In the field',
  chat: 'Role-play',
}
const EVIDENCE = {
  supported: 'Supported by research',
  mixed: 'Mixed evidence',
  unproven: 'Unproven: test it yourself',
}

/** Latch every module that has just been passed, so practice never re-locks. */
function commit(fn) {
  const ok = store.update((s) => {
    fn?.(s)
    for (const m of modules) if (passed(m, s)) s.latched[m.id] = true
  })
  if (!ok) toast('Could not save on this device. Export a backup from Settings.')
  return ok
}

function toast(text) {
  const t = document.createElement('div')
  t.className = 'toast'
  t.textContent = text
  document.body.appendChild(t)
  setTimeout(() => t.remove(), 3200)
}

function status(m, i) {
  const s = st()
  if (!unlocked(i, modules, s)) return 'locked'
  if (mastered(m, s)) return 'mastered'
  if (hasPassed(m, s)) return 'passed'
  return 'open'
}
const STATUS = { locked: 'Locked', open: 'In progress', passed: 'Passed', mastered: 'Mastered' }

const bar = (f) =>
  `<div class="bar" role="progressbar" aria-valuenow="${Math.round(f * 100)}" aria-valuemin="0" aria-valuemax="100"><span style="width:${Math.round(f * 100)}%"></span></div>`

const when = (iso) =>
  new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })

function setNav(which) {
  for (const a of document.querySelectorAll('.nav a'))
    a.classList.toggle('on', a.dataset.nav === which)
}

// ── Home ─────────────────────────────────────────────────────────────

function viewHome() {
  setNav('course')
  const s = st()
  const next = modules.find((m, i) => unlocked(i, modules, s) && !hasPassed(m, s))
  const done = modules.filter((m) => hasPassed(m, s)).length
  const fieldOpen = modules
    .filter((m) => hasPassed(m, s))
    .flatMap((m) => m.assignments.filter((a) => a.required && a.kind === 'field' && !assignmentDone(a, s)).map((a) => ({ m, a })))

  let html = `<header class="hero">
    <p class="eyebrow">Conversational hypnosis and influence</p>
    <h1>The Course</h1>
    <p class="muted">${done} of ${modules.length} modules passed</p>
    ${bar(done / modules.length)}
  </header>`

  if (next)
    html += `<a class="card continue" href="#/m/${next.id}">
      <p class="eyebrow">Continue</p>
      <h2>${esc(next.title)}</h2>
      <p class="muted">${esc(next.tagline)}</p>
      ${bar(fraction(next, s))}
    </a>`

  if (fieldOpen.length)
    html += `<section class="card">
      <h2 class="small">Field work running</h2>
      <p class="muted">These wait on real conversations. Keep logging them as you go on.</p>
      <ul class="plain">${fieldOpen
        .map(({ m, a }) => `<li><a href="#/m/${m.id}/practise">${esc(a.title)}</a> <span class="muted">${repsOf(a, s)}/${a.reps}</span></li>`)
        .join('')}</ul>
    </section>`

  let part = null
  modules.forEach((m, i) => {
    if (m.part !== part) {
      if (part !== null) html += '</ol>'
      part = m.part
      html += `<h2 class="part">${esc(part)}</h2><ol class="map">`
    }
    const k = status(m, i)
    const inner = `<span class="num">${i}</span>
      <span class="body"><span class="title">${esc(m.title)}</span>
      <span class="muted tag">${esc(m.tagline)}</span>
      ${k === 'locked' ? '' : bar(fraction(m, s))}</span>
      <span class="badge ${k}">${STATUS[k]}</span>`
    html += k === 'locked' ? `<li class="locked">${inner}</li>` : `<li><a href="#/m/${m.id}">${inner}</a></li>`
  })
  html += '</ol>'
  $app.innerHTML = html
}

// ── Module ───────────────────────────────────────────────────────────

const TABS = [
  ['learn', 'Learn'],
  ['drill', 'Drill'],
  ['practise', 'Practise'],
  ['roleplay', 'Role-play'],
]

function moduleHeader(m, i, tab) {
  const s = st()
  const left = outstanding(m, s)
  const k = status(m, i)
  const summary =
    k === 'mastered'
      ? '<p class="ok">Mastered. Every required rep is logged.</p>'
      : hasPassed(m, s)
        ? `<p class="ok">Passed. The next module is open.</p>${
            m.assignments.some((a) => a.required && !assignmentDone(a, s))
              ? '<p class="muted">Field work still running toward mastery.</p>'
              : ''
          }`
        : `<details class="left"><summary>To pass: ${left.length} thing${left.length === 1 ? '' : 's'} left</summary><ul>${left
            .map((l) => `<li>${esc(l)}</li>`)
            .join('')}</ul></details>`
  return `<header class="modhead">
    <a class="back" href="#/">‹ Course</a>
    <p class="eyebrow">Module ${i} · ${esc(m.part)}</p>
    <h1>${esc(m.title)}</h1>
    <p class="muted">${esc(m.tagline)}</p>
    ${bar(fraction(m, s))}
    ${summary}
    ${m.id === 'm06' ? '<a class="button ghost" href="#/timer">Open the talk timer</a>' : ''}
  </header>
  <nav class="tabs">${TABS.map(
    ([id, label]) => `<a href="#/m/${m.id}/${id}" class="${tab === id ? 'on' : ''}">${label}</a>`
  ).join('')}</nav>`
}

function viewModule(id, tab = 'learn') {
  setNav('course')
  const hit = byId.get(id)
  if (!hit) return viewHome()
  const { m, i } = hit
  if (!unlocked(i, modules, st())) return viewHome()
  const body =
    tab === 'drill' ? drillsHtml(m) : tab === 'practise' ? practiseHtml(m) : tab === 'roleplay' ? roleplayHtml(m) : learnHtml(m)
  $app.innerHTML = moduleHeader(m, i, tab) + `<section class="tabbody">${body}</section>`
  if (tab === 'drill') wireDrills(m)
  if (tab === 'practise') wirePractise(m)
  if (tab === 'roleplay') wireRoleplay(m)
}

function learnHtml(m) {
  const s = st()
  const r = lessonsRead(m, s)
  return `<p class="muted">${r.done} of ${r.total} lessons read</p>
  <ol class="lessons">${m.lessons
    .map(
      (l, n) => `<li><a href="#/m/${m.id}/l/${l.id}"><span class="num">${n + 1}</span><span>${esc(l.title)}</span>${
        s.read[l.id] ? '<span class="tick" aria-label="read">✓</span>' : ''
      }</a></li>`
    )
    .join('')}</ol>`
}

function viewLesson(mid, lid) {
  setNav('course')
  const hit = byId.get(mid)
  if (!hit) return viewHome()
  const { m } = hit
  const n = m.lessons.findIndex((l) => l.id === lid)
  if (n < 0) return viewModule(mid)
  const l = m.lessons[n]
  const next = m.lessons[n + 1]
  $app.innerHTML = `<article class="lesson">
    <a class="back" href="#/m/${m.id}">‹ ${esc(m.title)}</a>
    <p class="eyebrow">Lesson ${n + 1} of ${m.lessons.length}</p>
    <h1>${esc(l.title)}</h1>
    <div class="prose">${render(l.body)}</div>
    ${
      l.techniques?.length
        ? `<aside class="evidence"><h3>What the evidence says</h3>${l.techniques
            .map(
              (t) => `<div class="tech"><p><strong>${esc(t.name)}</strong> <span class="chip ${t.evidence}">${EVIDENCE[t.evidence] ?? t.evidence}</span></p><p class="muted">${inline(t.note)}</p></div>`
            )
            .join('')}</aside>`
        : ''
    }
    <div class="row">
      <button class="button" id="readnext">${next ? 'Done, next lesson' : 'Done, go to the drills'}</button>
    </div>
  </article>`
  window.scrollTo(0, 0)
  document.getElementById('readnext').onclick = () => {
    commit((s) => (s.read[l.id] = true))
    location.hash = next ? `#/m/${m.id}/l/${next.id}` : `#/m/${m.id}/drill`
  }
}

// ── Drills ───────────────────────────────────────────────────────────

function drillsHtml(m) {
  const s = st()
  const score = drillScore(m, s)
  const rw = rewritesDone(m, s)
  const auto = m.drills.filter(isAuto)
  const wrong = auto.filter((d) => s.drills[d.id] && !s.drills[d.id].correct).length
  return `<div class="scorebox">
      <p><strong>${Math.round(score * 100)}%</strong> of graded drills right <span class="muted">(pass at ${Math.round(PASS_MARK * 100)}%)</span></p>
      <p class="muted">${rw.done} of ${rw.total} rewrites checked off</p>
      <div class="row">
        ${wrong ? `<button class="button ghost" data-act="retry">Retry the ${wrong} wrong</button>` : ''}
        <button class="button ghost" data-act="redo">Run them all again</button>
      </div>
    </div>
    ${m.drills.map((d, n) => drillCard(d, n, s)).join('')}`
}

/**
 * Options are shown in an order fixed by the drill's id, so the right
 * answer's position carries no pattern (writers favour the second slot)
 * and stays put between visits. Answers are still stored by original index.
 */
function orderFor(d) {
  let h = 2166136261
  for (const c of d.id) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  const idx = d.options.map((_, k) => k)
  for (let k = idx.length - 1; k > 0; k--) {
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0
    const j = h % (k + 1)
    ;[idx[k], idx[j]] = [idx[j], idx[k]]
  }
  return idx
}

function drillCard(d, n, s) {
  const head = `<p class="eyebrow">Drill ${n + 1}${d.type === 'rewrite' ? ' · rewrite' : ''}</p>
    <p class="prompt">${inline(d.prompt)}</p>
    ${d.quote ? `<blockquote>${inline(d.quote)}</blockquote>` : ''}`
  if (d.type === 'rewrite') {
    const r = s.rewrites[d.id] ?? {}
    const checks = r.checks ?? []
    return `<div class="card drill" data-id="${d.id}">${head}
      ${d.given ? `<p class="given"><span class="muted">Start from:</span> ${inline(d.given)}</p>` : ''}
      <textarea rows="3" placeholder="Write yours, then say it out loud." data-rw="${d.id}">${esc(r.text ?? '')}</textarea>
      <details ${r.shown ? 'open' : ''} data-show="${d.id}"><summary>Compare and check off</summary>
        <p class="muted">Examples:</p>
        <ul>${d.models.map((x) => `<li>${inline(x)}</li>`).join('')}</ul>
        <p class="muted">Does yours…</p>
        ${d.checklist
          .map(
            (c, k) => `<label class="check"><input type="checkbox" data-ck="${d.id}" data-k="${k}" ${checks[k] ? 'checked' : ''}> ${inline(c)}</label>`
          )
          .join('')}
        ${r.done ? '<p class="ok">Checked off.</p>' : ''}
      </details>
    </div>`
  }
  const res = s.drills[d.id]
  const answered = !!res
  const multi = d.type === 'multi'
  const right = multi ? d.answers : [d.answer]
  const chosen = res ? (multi ? res.answer : [res.answer]) : []
  const opts = orderFor(d)
    .map((k) => {
      const o = d.options[k]
      let cls = ''
      if (answered) {
        if (right.includes(k)) cls = 'right'
        else if (chosen.includes(k)) cls = 'wrong'
      }
      return multi
        ? `<label class="opt ${cls}"><input type="checkbox" data-opt="${k}" ${chosen.includes(k) ? 'checked' : ''} ${answered ? 'disabled' : ''}> ${inline(o)}</label>`
        : `<button class="opt ${cls}" data-opt="${k}" ${answered ? 'disabled' : ''}>${inline(o)}</button>`
    })
    .join('')
  return `<div class="card drill" data-id="${d.id}">${head}
    <div class="opts">${opts}</div>
    ${multi && !answered ? '<button class="button" data-act="check">Check</button>' : ''}
    ${answered ? `<p class="${res.correct ? 'ok' : 'bad'}">${res.correct ? 'Right.' : 'Not quite.'}</p><p class="explain">${inline(d.explain)}</p>` : ''}
  </div>`
}

function wireDrills(m) {
  const root = $app.querySelector('.tabbody')
  const rerender = () => {
    const y = window.scrollY
    viewModule(m.id, 'drill')
    window.scrollTo(0, y)
  }
  root.addEventListener('click', (e) => {
    const t = e.target.closest('button')
    if (!t) return
    const card = t.closest('.drill')
    if (t.dataset.act === 'retry') {
      commit((s) => {
        for (const d of m.drills.filter(isAuto)) if (s.drills[d.id] && !s.drills[d.id].correct) delete s.drills[d.id]
      })
      return rerender()
    }
    if (t.dataset.act === 'redo') {
      commit((s) => {
        for (const d of m.drills) {
          delete s.drills[d.id]
          delete s.rewrites[d.id]
        }
      })
      return rerender()
    }
    if (!card) return
    const d = m.drills.find((x) => x.id === card.dataset.id)
    if (d.type === 'choice' && t.dataset.opt !== undefined) {
      const k = Number(t.dataset.opt)
      commit((s) => (s.drills[d.id] = { answer: k, correct: k === d.answer, at: new Date().toISOString() }))
      return rerender()
    }
    if (d.type === 'multi' && t.dataset.act === 'check') {
      const ks = [...card.querySelectorAll('input[data-opt]:checked')].map((x) => Number(x.dataset.opt))
      if (!ks.length) return toast('Tap at least one.')
      const want = [...d.answers].sort().join()
      commit((s) => (s.drills[d.id] = { answer: ks, correct: [...ks].sort().join() === want, at: new Date().toISOString() }))
      return rerender()
    }
  })
  root.addEventListener('input', (e) => {
    const id = e.target.dataset.rw
    if (id) store.update((s) => (s.rewrites[id] = { ...(s.rewrites[id] ?? {}), text: e.target.value }))
  })
  root.addEventListener('toggle', (e) => {
    const id = e.target.dataset?.show
    if (id && e.target.open) store.update((s) => (s.rewrites[id] = { ...(s.rewrites[id] ?? {}), shown: true }))
  }, true)
  root.addEventListener('change', (e) => {
    const id = e.target.dataset.ck
    if (!id) return
    const d = m.drills.find((x) => x.id === id)
    const card = e.target.closest('.drill')
    const checks = [...card.querySelectorAll('input[data-ck]')].map((x) => x.checked)
    const text = card.querySelector('textarea').value.trim()
    if (checks.every(Boolean) && !text) {
      e.target.checked = false
      return toast('Write your version first.')
    }
    commit((s) => (s.rewrites[id] = { ...(s.rewrites[id] ?? {}), text, shown: true, checks, done: checks.length === d.checklist.length && checks.every(Boolean) }))
    rerender()
  })
}

// ── Assignments ──────────────────────────────────────────────────────

function practiseHtml(m) {
  const s = st()
  return m.assignments
    .map((a) => {
      const reps = s.reps[a.id] ?? []
      const done = reps.length >= a.reps
      return `<div class="card assign ${done ? 'done' : ''}" data-id="${a.id}">
        <p class="eyebrow">${KIND[a.kind] ?? a.kind}${a.required ? ' · required' : ' · optional'}</p>
        <h3>${esc(a.title)}</h3>
        <p class="reps"><strong>${reps.length}</strong> of ${a.reps} reps ${done ? '<span class="ok">done</span>' : ''}</p>
        ${bar(Math.min(1, reps.length / a.reps))}
        <div class="prose">${render(a.instructions)}</div>
        ${a.scenario ? `<a class="button ghost" href="#/m/${m.id}/roleplay#${a.scenario}">Open the scenario card</a>` : ''}
        <button class="button" data-act="log">Log a rep</button>
        <form class="logform" hidden>
          ${a.log.map((q, k) => `<label>${inline(q)}<textarea rows="2" name="q${k}"></textarea></label>`).join('')}
          <div class="row"><button class="button" type="submit">Save rep</button><button class="button ghost" type="button" data-act="cancel">Cancel</button></div>
        </form>
        ${
          reps.length
            ? `<details><summary>Past reps (${reps.length})</summary>${reps
                .slice()
                .reverse()
                .map((r) => repHtml(a, r))
                .join('')}</details>`
            : ''
        }
      </div>`
    })
    .join('')
}

function repHtml(a, r) {
  return `<div class="rep"><p class="muted">${when(r.at)}</p>${a.log
    .map((q, k) => (r.answers[k] ? `<p><span class="muted">${inline(q)}</span><br>${esc(r.answers[k])}</p>` : ''))
    .join('')}</div>`
}

function wirePractise(m) {
  const root = $app.querySelector('.tabbody')
  root.addEventListener('click', (e) => {
    const t = e.target.closest('button')
    if (!t) return
    const card = t.closest('.assign')
    const form = card?.querySelector('.logform')
    if (t.dataset.act === 'log') {
      form.hidden = false
      t.hidden = true
      form.querySelector('textarea')?.focus()
    }
    if (t.dataset.act === 'cancel') {
      form.hidden = true
      card.querySelector('[data-act=log]').hidden = false
    }
  })
  root.addEventListener('submit', (e) => {
    e.preventDefault()
    const card = e.target.closest('.assign')
    const a = m.assignments.find((x) => x.id === card.dataset.id)
    const answers = a.log.map((_, k) => e.target.elements[`q${k}`].value.trim())
    if (!answers.some(Boolean)) return toast('Write at least one answer.')
    const was = hasPassed(m, st())
    commit((s) => (s.reps[a.id] = [...(s.reps[a.id] ?? []), { at: new Date().toISOString(), answers }]))
    if (!was && hasPassed(m, st())) toast('Module passed. The next one is open.')
    else toast('Rep saved.')
    const y = window.scrollY
    viewModule(m.id, 'practise')
    window.scrollTo(0, y)
  })
}

// ── Role-play ────────────────────────────────────────────────────────

function roleplayHtml(m) {
  return `<p class="muted">Copy a card, paste it into a chat with Claude, and play it out. Type <strong>debrief</strong> at the end for your scores, then log the rep under Practise.</p>
  ${m.scenarios
    .map(
      (sc) => `<div class="card scenario" id="${sc.id}">
      <h3>${esc(sc.title)}</h3>
      <p><span class="muted">Setting</span><br>${inline(sc.setting)}</p>
      <p><span class="muted">Your aim</span><br>${inline(sc.you)}</p>
      <p><span class="muted">Who Claude plays</span><br>${inline(sc.them)}</p>
      <p><span class="muted">Expect</span></p><ul>${sc.objections.map((o) => `<li>${inline(o)}</li>`).join('')}</ul>
      <p><span class="muted">Practise</span><br>${sc.focus.map(esc).join(' · ')}</p>
      <p><span class="muted">A win</span><br>${inline(sc.win)}</p>
      <div class="row"><button class="button" data-copy="${sc.id}">Copy for Claude</button><a class="button ghost" href="https://claude.ai/new" target="_blank" rel="noopener">Open Claude</a></div>
    </div>`
    )
    .join('')}`
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    document.body.appendChild(ta)
    ta.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {}
    ta.remove()
    return ok
  }
}

function wireRoleplay(m) {
  const target = location.hash.split('#')[2]
  if (target) document.getElementById(target)?.scrollIntoView()
  $app.querySelector('.tabbody').addEventListener('click', async (e) => {
    const id = e.target.dataset?.copy
    if (!id) return
    const sc = m.scenarios.find((x) => x.id === id)
    toast((await copyText(rolePlayPrompt(sc, m))) ? 'Copied. Paste it into Claude.' : 'Copy failed: long-press to select instead.')
  })
}

// ── Field log ────────────────────────────────────────────────────────

function allReps() {
  const s = st()
  const out = []
  for (const m of modules)
    for (const a of m.assignments) for (const r of s.reps[a.id] ?? []) out.push({ m, a, r })
  return out.sort((x, y) => y.r.at.localeCompare(x.r.at))
}

function viewLog(kind = 'all') {
  setNav('log')
  const reps = allReps().filter((x) => kind === 'all' || x.a.kind === kind)
  $app.innerHTML = `<header class="hero"><h1>Log</h1><p class="muted">Every rep you have logged, newest first.</p></header>
    <nav class="tabs">${[['all', 'All'], ...Object.entries(KIND)]
      .map(([k, label]) => `<a href="#/log/${k}" class="${k === kind ? 'on' : ''}">${label}</a>`)
      .join('')}</nav>
    <div class="row"><button class="button ghost" id="copylog">Copy as text for a review with Claude</button></div>
    ${
      reps.length
        ? reps
            .map(
              ({ m, a, r }) => `<div class="card"><p class="eyebrow">${esc(m.title)} · ${KIND[a.kind]}</p><h3>${esc(a.title)}</h3>${repHtml(a, r)}</div>`
            )
            .join('')
        : '<p class="muted">Nothing logged yet. Reps are logged from each module’s Practise tab.</p>'
    }`
  document.getElementById('copylog').onclick = async () => {
    const text = reps
      .map(({ m, a, r }) => [`## ${when(r.at)}: ${a.title} (${m.title}, ${KIND[a.kind]})`, ...a.log.map((q, k) => (r.answers[k] ? `- ${q} ${r.answers[k]}` : '')).filter(Boolean)].join('\n'))
      .join('\n\n')
    toast((await copyText(`Here is my practice log. Review it: what am I doing well, what patterns do you see in what goes wrong, and what should I practise next?\n\n${text}`)) ? 'Copied.' : 'Copy failed.')
  }
}

// ── Talk timer ───────────────────────────────────────────────────────

let timer = null

function viewTimer() {
  setNav('timer')
  const s = st()
  const runs = s.runs ?? []
  const best = runs.reduce((b, r) => Math.max(b, r.secs), 0)
  $app.innerHTML = `<header class="hero"><h1>Talk timer</h1>
    <p class="muted">For the run-on sentence (Module 6). Pick a length, press start, and talk without ending a sentence until the bell. Use the cards when you run dry: a nominalization, a verb, a linkage.</p></header>
    <div class="card timer">
      <p class="topic" id="topic">Topic: ${esc(pick(topics))}</p>
      <div class="lengths">${[30, 60, 120, 180].map((n) => `<button class="opt" data-len="${n}">${n < 60 ? n + ' s' : n / 60 + ' min'}</button>`).join('')}</div>
      <p class="clock" id="clock">0:30</p>
      <div class="cards" id="cards" aria-live="polite"></div>
      <label class="check"><input type="checkbox" id="rec"> Record myself (stays on this device, gone when you leave)</label>
      <div class="row"><button class="button" id="go">Start</button><button class="button ghost" id="newtopic">New topic</button></div>
      <audio id="play" controls hidden></audio>
    </div>
    <p class="muted">${runs.length} runs logged${best ? `, longest ${best} s` : ''}.</p>`
  let len = 30
  const clock = document.getElementById('clock')
  const fmt = (n) => `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`
  const pickLen = (n) => {
    len = n
    clock.textContent = fmt(n)
    for (const b of $app.querySelectorAll('[data-len]')) b.classList.toggle('right', Number(b.dataset.len) === n)
  }
  pickLen(30)
  $app.querySelectorAll('[data-len]').forEach((b) => (b.onclick = () => !timer && pickLen(Number(b.dataset.len))))
  document.getElementById('newtopic').onclick = () => (document.getElementById('topic').textContent = `Topic: ${pick(topics)}`)
  const cards = document.getElementById('cards')
  const deal = () =>
    (cards.innerHTML = `<span>${esc(pick(nominalizations))}</span><span>${esc(pick(verbs))}</span><span>${esc(pick(linkages))}</span>`)
  deal()
  document.getElementById('go').onclick = async (e) => {
    if (timer) return stop(false)
    let recorder = null
    let chunks = []
    if (document.getElementById('rec').checked) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        recorder = new MediaRecorder(stream)
        recorder.ondataavailable = (ev) => chunks.push(ev.data)
        recorder.onstop = () => {
          stream.getTracks().forEach((t) => t.stop())
          const audio = document.getElementById('play')
          if (!audio) return
          audio.src = URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType }))
          audio.hidden = false
        }
        recorder.start()
      } catch {
        toast('No microphone access; timing without recording.')
      }
    }
    let left = len
    e.target.textContent = 'Stop'
    let tick = 0
    timer = setInterval(() => {
      left -= 1
      tick += 1
      clock.textContent = fmt(left)
      if (tick % 8 === 0) deal()
      if (left <= 0) stop(true)
    }, 1000)
    function stop(finished) {
      clearInterval(timer)
      timer = null
      recorder?.state === 'recording' && recorder.stop()
      const btn = document.getElementById('go')
      if (btn) btn.textContent = 'Start'
      if (finished) {
        navigator.vibrate?.(200)
        commit((s) => (s.runs = [...(s.runs ?? []), { at: new Date().toISOString(), secs: len }]))
        toast(`${len} seconds. Logged.`)
      }
      clock.textContent = fmt(len)
    }
    viewTimer.stop = stop
  }
}

// ── Settings ─────────────────────────────────────────────────────────

function viewSettings() {
  setNav('settings')
  const s = st()
  $app.innerHTML = `<header class="hero"><h1>Settings</h1></header>
  <div class="card">
    <h3>Appearance</h3>
    <div class="row">${['auto', 'light', 'dark'].map((t) => `<button class="opt ${(s.settings.theme ?? 'auto') === t ? 'right' : ''}" data-theme="${t}">${t[0].toUpperCase() + t.slice(1)}</button>`).join('')}</div>
  </div>
  <div class="card">
    <h3>Unlocking</h3>
    <label class="check"><input type="checkbox" id="unlockall" ${s.settings.unlockAll ? 'checked' : ''}> Open every module now (for browsing ahead; passing still counts)</label>
  </div>
  <div class="card">
    <h3>Backup</h3>
    <p class="muted">Your progress lives on this device only. Copy a backup now and then, and paste it back on a new phone.</p>
    <div class="row"><button class="button" id="export">Copy backup</button><button class="button ghost" id="download">Download file</button></div>
    <textarea id="importtext" rows="3" placeholder="Paste a backup here to restore it"></textarea>
    <button class="button ghost" id="import">Restore from pasted backup</button>
  </div>
  <div class="card">
    <h3>Start over</h3>
    <button class="button danger" id="reset">Erase all progress</button>
  </div>
  <p class="muted small">Content version ${esc(document.documentElement.dataset.version ?? '')}</p>`
  $app.querySelectorAll('[data-theme]').forEach(
    (b) =>
      (b.onclick = () => {
        commit((x) => (x.settings.theme = b.dataset.theme))
        applyTheme()
        viewSettings()
      })
  )
  document.getElementById('unlockall').onchange = (e) => commit((x) => (x.settings.unlockAll = e.target.checked))
  const backup = () => JSON.stringify({ app: 'persuasion-course', savedAt: new Date().toISOString(), state: st() })
  document.getElementById('export').onclick = async () => toast((await copyText(backup())) ? 'Backup copied.' : 'Copy failed.')
  document.getElementById('download').onclick = () => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([backup()], { type: 'application/json' }))
    a.download = `persuasion-course-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
  }
  document.getElementById('import').onclick = () => {
    try {
      const parsed = JSON.parse(document.getElementById('importtext').value)
      if (parsed.app !== 'persuasion-course' || !parsed.state) throw new Error()
      if (!confirm('Replace everything on this device with the backup?')) return
      store.replace(parsed.state)
      applyTheme()
      toast('Restored.')
      viewSettings()
    } catch {
      toast('That is not a backup from this course.')
    }
  }
  document.getElementById('reset').onclick = () => {
    if (!confirm('Erase every drill, rep and log entry on this device?')) return
    store.reset()
    applyTheme()
    toast('Erased.')
    viewSettings()
  }
}

// ── Shell ────────────────────────────────────────────────────────────

function applyTheme() {
  const t = st().settings.theme ?? 'auto'
  if (t === 'auto') delete document.documentElement.dataset.theme
  else document.documentElement.dataset.theme = t
}

function route() {
  if (timer) viewTimer.stop?.(false)
  const parts = location.hash.replace(/^#\/?/, '').split('#')[0].split('/').filter(Boolean)
  if (parts[0] === 'm' && parts[2] === 'l') viewLesson(parts[1], parts[3])
  else if (parts[0] === 'm') viewModule(parts[1], parts[2])
  else if (parts[0] === 'log') viewLog(parts[1])
  else if (parts[0] === 'timer') viewTimer()
  else if (parts[0] === 'settings') viewSettings()
  else viewHome()
  if (!(parts[0] === 'm' && parts[2] === 'roleplay')) window.scrollTo(0, 0)
}

applyTheme()
window.addEventListener('hashchange', route)
route()

if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost'))
  navigator.serviceWorker.register('./sw.js').catch(() => {})
