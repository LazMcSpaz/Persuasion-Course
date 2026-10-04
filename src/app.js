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
import { reference } from '../content/reference.js'
import { icon, spiral } from './icons.js'

const $app = document.getElementById('app')
const st = () => store.get()
const byId = new Map(modules.map((m, i) => [m.id, { m, i }]))

const KIND = {
  solo: 'On your own',
  everyday: 'Everyday',
  field: 'Real stakes',
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
  t.setAttribute('role', 'status')
  t.textContent = text
  document.body.appendChild(t)
  setTimeout(() => t.remove(), 3200)
}

/** A small burst of colour for a module passed. Decoration only. */
function celebrate() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const b = document.createElement('div')
  b.className = 'burst'
  b.setAttribute('aria-hidden', 'true')
  const n = 22
  b.innerHTML = Array.from(
    { length: n },
    (_, k) => `<i style="--a:${Math.round((k / n) * 360 + Math.random() * 12)}deg;--d:${70 + Math.round(Math.random() * 70)}px;--s:${0.7 + Math.random() * 0.6};--c:var(--fx${k % 4})"></i>`
  ).join('')
  document.body.appendChild(b)
  setTimeout(() => b.remove(), 1600)
}

// The drill just answered and the assignment just logged, so a re-render can
// mark them for a moment of feedback. Read once, then cleared.
let justAnswered = null
let justLogged = null

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

/** The same figure as a ring, which starts at twelve o'clock. */
function ring(f) {
  const p = Math.round(f * 100)
  return `<svg class="ring" viewBox="0 0 36 36" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100"><g transform="rotate(-90 18 18)"><circle class="track" cx="18" cy="18" r="15"/>${
    p ? `<circle class="fill" cx="18" cy="18" r="15" pathLength="100" stroke-dasharray="${p} 100"/>` : ''
  }</g></svg>`
}

const KICON = { solo: 'solo', everyday: 'everyday', field: 'field', chat: 'chat' }
const chip = (ev) => `<span class="chip ${ev}">${icon(ev)}${EVIDENCE[ev] ?? ev}</span>`

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

  let html = `<header class="hero home">
    <div class="art">${spiral()}</div>
    <p class="eyebrow">Conversational hypnosis and influence</p>
    <h1>The Course</h1>
    <div class="summary">${ring(done / modules.length)}<p><strong>${done} of ${modules.length}</strong> modules passed</p></div>
  </header>`

  if (next) {
    const f = fraction(next, s)
    const r = lessonsRead(next, s)
    html += `<a class="card continue" href="#/m/${next.id}">
      <span class="go">${icon('arrow')}</span>
      <p class="eyebrow">Continue · Module ${modules.indexOf(next)}</p>
      <h2>${esc(next.title)}</h2>
      <p class="muted">${esc(next.tagline)}</p>
      ${bar(f)}
      <p class="meta"><span>${r.done} of ${r.total} lessons read</span><span>${Math.round(f * 100)}%</span></p>
    </a>`
  }

  html += `<div class="twin"><a class="card mini" href="#/review"><span class="icw">${icon('review')}</span><strong>Review</strong><span class="muted">Ten drills from passed modules</span></a><a class="card mini" href="#/reference"><span class="icw">${icon('reference')}</span><strong>Pattern reference</strong><span class="muted">Every technique on one page</span></a></div>`

  if (fieldOpen.length)
    html += `<section class="card field">
      <div class="cardhead"><span class="icw warn">${icon('field')}</span><h2 class="small">Real-stakes reps running</h2></div>
      <p class="muted">These wait on real conversations: a sale of your own, a friend, a group. Keep logging them as you go on.</p>
      <ul class="plain">${fieldOpen
        .map(({ m, a }) => `<li><a href="#/m/${m.id}/practise"><span>${esc(a.title)}</span><span class="count">${repsOf(a, s)}/${a.reps}</span>${icon('chev', 'chev')}</a></li>`)
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
      <span class="title">${esc(m.title)}</span>
      <span class="tag">${esc(m.tagline)}</span>
      ${k === 'locked' ? '' : bar(fraction(m, s))}
      <span class="end"><span class="badge ${k}">${k === 'locked' ? icon('lock') : ''}${STATUS[k]}</span>${k === 'locked' ? '' : icon('chev', 'chev')}</span>`
    html += k === 'locked' ? `<li class="locked">${inner}</li>` : `<li class="${k}"><a href="#/m/${m.id}">${inner}</a></li>`
  })
  html += '</ol>'
  $app.innerHTML = html
}

// ── Module ───────────────────────────────────────────────────────────

const TABS = [
  ['learn', 'Learn'],
  ['drill', 'Drill'],
  ['practise', 'Practice'],
  ['roleplay', 'Role-play'],
]

function moduleHeader(m, i, tab) {
  const s = st()
  const left = outstanding(m, s)
  const k = status(m, i)
  const summary =
    k === 'mastered'
      ? `<p class="ok">${icon('seal')}Mastered. Every required rep is logged.</p>`
      : hasPassed(m, s)
        ? `<p class="ok">${icon('checkCircle')}Passed. The next module is open.</p>${
            m.assignments.some((a) => a.required && !assignmentDone(a, s))
              ? '<p class="muted">Real-stakes reps still running toward mastery.</p>'
              : ''
          }`
        : `<details class="left"><summary>To pass: ${left.length} thing${left.length === 1 ? '' : 's'} left${icon('chev', 'disc')}</summary><ul>${left
            .map((l) => `<li>${esc(l)}</li>`)
            .join('')}</ul></details>`
  const f = fraction(m, s)
  return `<header class="modhead">
    <a class="back" href="#/">${icon('back')}Course</a>
    <p class="eyebrow">Module ${i} · ${esc(m.part)}</p>
    <h1>${esc(m.title)}</h1>
    <p class="muted tagline">${esc(m.tagline)}</p>
    <div class="card status ${k}">
      <div class="dial">${ring(f)}<span>${Math.round(f * 100)}<small>%</small></span></div>
      <div class="said">${summary}</div>
    </div>
    ${m.id === 'm06' ? `<a class="button ghost wide" href="#/timer">${icon('timer')}Open the talk timer</a>` : ''}
  </header>
  <nav class="tabs seg">${TABS.map(
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
  return `<p class="muted note">${r.done} of ${r.total} lessons read</p>
  <ol class="lessons">${m.lessons
    .map(
      (l, n) => `<li class="${s.read[l.id] ? 'read' : ''}"><a href="#/m/${m.id}/l/${l.id}"><span class="num">${n + 1}</span><span class="title">${esc(l.title)}</span>${
        s.read[l.id] ? `<span class="tick" aria-label="read">${icon('checkCircle')}</span>` : ''
      }${icon('chev', 'chev')}</a></li>`
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
  const s = st()
  $app.innerHTML = `<div class="readbar" aria-hidden="true"></div><article class="lesson">
    <a class="back" href="#/m/${m.id}">${icon('back')}${esc(m.title)}</a>
    <p class="eyebrow">Lesson ${n + 1} of ${m.lessons.length}</p>
    <div class="steps" aria-hidden="true">${m.lessons
      .map((x, k) => `<i class="${k === n ? 'on' : s.read[x.id] ? 'read' : ''}"></i>`)
      .join('')}</div>
    <h1>${esc(l.title)}</h1>
    <div class="prose">${render(l.body)}</div>
    ${
      l.techniques?.length
        ? `<aside class="evidence card"><h3>${icon('flask')}What the evidence says</h3>${l.techniques
            .map(
              (t) => `<div class="tech"><p class="techname"><strong>${esc(t.name)}</strong> ${chip(t.evidence)}</p><p class="muted">${inline(t.note)}</p></div>`
            )
            .join('')}</aside>`
        : ''
    }
    <div class="row">
      <button class="button wide" id="readnext">${next ? 'Done, next lesson' : 'Done, go to the drills'}${icon('arrow')}</button>
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
  return `<div class="scorebox card">
      <p class="score"><strong>${Math.round(score * 100)}%</strong> of graded drills right <span class="muted">(pass at ${Math.round(PASS_MARK * 100)}%)</span></p>
      <div class="meter ${score >= PASS_MARK ? 'pass' : ''}" aria-hidden="true"><span style="width:${Math.round(score * 100)}%"></span><i style="left:${Math.round(PASS_MARK * 100)}%"></i></div>
      <p class="muted">${rw.done} of ${rw.total} rewrites checked off</p>
      <div class="row">
        ${wrong ? `<button class="button ghost" data-act="retry">${icon('retry')}Retry the ${wrong} wrong</button>` : ''}
        <button class="button ghost" data-act="redo">${icon('review')}Run them all again</button>
      </div>
    </div>
    ${m.drills.map((d, n) => drillCard(d, n, s)).join('')}`
}

/**
 * Options are shown in an order fixed by the drill's id, so the right
 * answer's position carries no pattern (writers favor the second slot)
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

function drillCard(d, n, s, result, label) {
  const head = `<p class="eyebrow">${label ?? `Drill ${n + 1}`}${d.type === 'rewrite' ? ' · rewrite' : ''}</p>
    <p class="prompt">${inline(d.prompt)}</p>
    ${d.quote ? `<blockquote>${inline(d.quote)}</blockquote>` : ''}`
  const just = justAnswered === d.id ? ' just' : ''
  if (d.type === 'rewrite') {
    const r = s.rewrites[d.id] ?? {}
    const checks = r.checks ?? []
    return `<div class="card drill rewrite${r.done ? ' done' : ''}${just}" data-id="${d.id}">${head}
      ${d.given ? `<p class="given"><span class="muted">Start from:</span> ${inline(d.given)}</p>` : ''}
      <textarea rows="3" placeholder="Write yours, then say it out loud." data-rw="${d.id}">${esc(r.text ?? '')}</textarea>
      <details ${r.shown ? 'open' : ''} data-show="${d.id}"><summary>Compare and check off${icon('chev', 'disc')}</summary>
        <p class="muted">Examples:</p>
        <ul class="models">${d.models.map((x) => `<li>${inline(x)}</li>`).join('')}</ul>
        <p class="muted">Does yours…</p>
        ${d.checklist
          .map(
            (c, k) => `<label class="check"><input type="checkbox" data-ck="${d.id}" data-k="${k}" ${checks[k] ? 'checked' : ''}> <span>${inline(c)}</span></label>`
          )
          .join('')}
        ${r.done ? `<p class="ok verdict">${icon('checkCircle')}Checked off.</p>` : ''}
      </details>
    </div>`
  }
  const res = result === undefined ? s.drills[d.id] : result
  const answered = !!res
  const multi = d.type === 'multi'
  const right = multi ? d.answers : [d.answer]
  const chosen = res ? (multi ? res.answer : [res.answer]) : []
  const opts = orderFor(d)
    .map((k) => {
      const o = d.options[k]
      let cls = ''
      if (answered) {
        if (right.includes(k)) cls = chosen.includes(k) || !multi ? 'right' : 'right missed'
        else if (chosen.includes(k)) cls = 'wrong'
      }
      const mark = cls.startsWith('right') ? icon('check', 'mark') : cls === 'wrong' ? icon('x', 'mark') : ''
      return multi
        ? `<label class="opt ${cls}"><input type="checkbox" data-opt="${k}" ${chosen.includes(k) ? 'checked' : ''} ${answered ? 'disabled' : ''}> <span class="t">${inline(o)}</span>${mark}</label>`
        : `<button class="opt ${cls}" data-opt="${k}" ${answered ? 'disabled' : ''}><span class="t">${inline(o)}</span>${mark}</button>`
    })
    .join('')
  return `<div class="card drill${answered ? ' answered' : ''}${just}" data-id="${d.id}">${head}
    <div class="opts">${opts}</div>
    ${multi && !answered ? '<button class="button wide" data-act="check">Check</button>' : ''}
    ${answered ? `<p class="verdict ${res.correct ? 'ok' : 'bad'}">${icon(res.correct ? 'checkCircle' : 'xCircle')}${res.correct ? 'Right.' : 'Not quite.'}</p><p class="explain">${inline(d.explain)}</p>` : ''}
  </div>`
}

function wireDrills(m) {
  const root = $app.querySelector('.tabbody')
  const rerender = () => {
    const y = window.scrollY
    viewModule(m.id, 'drill')
    justAnswered = null
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
      justAnswered = d.id
      return rerender()
    }
    if (d.type === 'multi' && t.dataset.act === 'check') {
      const ks = [...card.querySelectorAll('input[data-opt]:checked')].map((x) => Number(x.dataset.opt))
      if (!ks.length) return toast('Tap at least one.')
      const want = [...d.answers].sort().join()
      commit((s) => (s.drills[d.id] = { answer: ks, correct: [...ks].sort().join() === want, at: new Date().toISOString() }))
      justAnswered = d.id
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
    const done = checks.length === d.checklist.length && checks.every(Boolean)
    if (done && !st().rewrites[id]?.done) justAnswered = id
    commit((s) => (s.rewrites[id] = { ...(s.rewrites[id] ?? {}), text, shown: true, checks, done }))
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
      const dots = Array.from(
        { length: a.reps },
        (_, k) => `<i class="${k < reps.length ? 'on' : ''}${justLogged === a.id && k === Math.min(reps.length, a.reps) - 1 ? ' new' : ''}"></i>`
      ).join('')
      return `<div class="card assign ${done ? 'done' : ''}" data-id="${a.id}">
        <p class="eyebrow">${icon(KICON[a.kind] ?? 'solo')}${KIND[a.kind] ?? a.kind}${a.required ? ' · required' : ' · optional'}</p>
        <h3>${esc(a.title)}</h3>
        <div class="repline">
          <span class="dots" role="progressbar" aria-valuenow="${Math.round(Math.min(1, reps.length / a.reps) * 100)}" aria-valuemin="0" aria-valuemax="100">${dots}</span>
          <p class="reps"><strong>${reps.length}</strong> of ${a.reps} reps ${done ? '<span class="ok">done</span>' : ''}</p>
        </div>
        <div class="prose">${render(a.instructions)}</div>
        ${a.scenario ? `<a class="button ghost wide" href="#/m/${m.id}/roleplay#${a.scenario}">${icon('cards')}Open the scenario card</a>` : ''}
        <button class="button wide" data-act="log">${icon('plus')}Log a rep</button>
        <form class="logform" hidden>
          ${a.log.map((q, k) => `<label>${inline(q)}<textarea rows="2" name="q${k}"></textarea></label>`).join('')}
          <div class="row"><button class="button" type="submit">Save rep</button><button class="button ghost" type="button" data-act="cancel">Cancel</button></div>
        </form>
        ${
          reps.length
            ? `<details class="past"><summary>Past reps (${reps.length})${icon('chev', 'disc')}</summary>${reps
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
    if (!was && hasPassed(m, st())) {
      toast('Module passed. The next one is open.')
      celebrate()
    } else toast('Rep saved.')
    const y = window.scrollY
    justLogged = a.id
    viewModule(m.id, 'practise')
    justLogged = null
    window.scrollTo(0, y)
  })
}

// ── Role-play ────────────────────────────────────────────────────────

function roleplayHtml(m) {
  return `<div class="tip">${icon('chat')}<p>Copy a card, paste it into a chat with Claude, and play it out. Type <strong>debrief</strong> at the end for your scores, then log the rep under Practice.</p></div>
  ${m.scenarios
    .map(
      (sc) => `<div class="card scenario" id="${sc.id}">
      <h3>${esc(sc.title)}</h3>
      <p><span class="label">Setting</span>${inline(sc.setting)}</p>
      <p><span class="label">Your aim</span>${inline(sc.you)}</p>
      <p><span class="label">Who Claude plays</span>${inline(sc.them)}</p>
      <p><span class="label">Expect</span></p><ul class="says">${sc.objections.map((o) => `<li>${inline(o)}</li>`).join('')}</ul>
      <p><span class="label">Practice</span></p><p class="pills">${sc.focus.map((x) => `<span>${esc(x)}</span>`).join('')}</p>
      <p class="win"><span class="label">A win</span>${inline(sc.win)}</p>
      <div class="row"><button class="button" data-copy="${sc.id}">${icon('copy')}Copy for Claude</button><a class="button ghost" href="https://claude.ai/new" target="_blank" rel="noopener">Open Claude${icon('external')}</a></div>
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
    <nav class="tabs chips">${[['all', 'All'], ...Object.entries(KIND)]
      .map(([k, label]) => `<a href="#/log/${k}" class="${k === kind ? 'on' : ''}">${label}</a>`)
      .join('')}</nav>
    <div class="row"><button class="button ghost" id="copylog">Copy as text for a review with Claude</button></div>
    ${
      reps.length
        ? reps
            .map(
              ({ m, a, r }) => `<div class="card logged"><p class="eyebrow">${icon(KICON[a.kind] ?? 'solo')}${esc(m.title)} · ${KIND[a.kind]}</p><h3>${esc(a.title)}</h3>${repHtml(a, r)}</div>`
            )
            .join('')
        : `<div class="empty"><span class="art">${icon('log')}</span><p class="muted">Nothing logged yet. Reps are logged from each module’s Practice tab.</p></div>`
    }`
  document.getElementById('copylog').onclick = async () => {
    const text = reps
      .map(({ m, a, r }) => [`## ${when(r.at)}: ${a.title} (${m.title}, ${KIND[a.kind]})`, ...a.log.map((q, k) => (r.answers[k] ? `- ${q} ${r.answers[k]}` : '')).filter(Boolean)].join('\n'))
      .join('\n\n')
    toast((await copyText(`Here is my practice log. Review it: what am I doing well, what patterns do you see in what goes wrong, and what should I practice next?\n\n${text}`)) ? 'Copied.' : 'Copy failed.')
  }
}

// ── Review ───────────────────────────────────────────────────────────

/**
 * Spaced practice. Graded drills from every passed module, ten at a time,
 * the ones missed before and the ones not seen for longest first. Answers
 * here never change a module's score: a pass is a pass.
 */
let reviewSet = null
let reviewAnswers = {}

function pickReview() {
  const s = st()
  const now = Date.now()
  const pool = modules
    .filter((m) => hasPassed(m, s))
    .flatMap((m) => m.drills.filter(isAuto).map((d) => ({ d, m })))
  const weight = ({ d }) => {
    const r = s.review?.[d.id]
    if (!r) return 3 + Math.random()
    const days = (now - Date.parse(r.last)) / 864e5
    return r.wrong * 2 - r.right * 0.5 + Math.min(days / 3, 4) + Math.random() * 1.5
  }
  return pool
    .map((x) => ({ x, w: weight(x) }))
    .sort((a, b) => b.w - a.w)
    .slice(0, 10)
    .map(({ x }) => x)
}

function viewReview() {
  setNav('review')
  if (!reviewSet) {
    reviewSet = pickReview()
    reviewAnswers = {}
  }
  const s = st()
  const done = reviewSet.filter(({ d }) => reviewAnswers[d.id]).length
  const right = reviewSet.filter(({ d }) => reviewAnswers[d.id]?.correct).length
  $app.innerHTML = `<header class="hero"><h1>Review</h1>
    <p class="muted">Ten drills from the modules you have passed, the ones you missed and the ones you have not seen for a while first. Nothing here changes a module’s score.</p></header>
    ${
      reviewSet.length
        ? `<div class="scorebox card"><p><strong>${right}</strong> of ${done} right so far, ${reviewSet.length - done} to go</p>
           <div class="segs" aria-hidden="true">${reviewSet
             .map(({ d }) => `<i class="${reviewAnswers[d.id] ? (reviewAnswers[d.id].correct ? 'ok' : 'bad') : ''}"></i>`)
             .join('')}</div>
           <div class="row"><button class="button ghost" data-act="newset">${icon('shuffle')}New set</button></div></div>
           ${reviewSet.map(({ d, m }, n) => drillCard(d, n, s, reviewAnswers[d.id] ?? null, `${esc(m.title)}`)).join('')}`
        : `<div class="card empty"><span class="art">${spiral('spiral still')}</span><p>Pass your first module and its drills start turning up here.</p></div>`
    }`
  const root = $app
  const rerender = () => {
    const y = window.scrollY
    viewReview()
    justAnswered = null
    window.scrollTo(0, y)
  }
  const record = (d, answer, correct) => {
    reviewAnswers[d.id] = { answer, correct }
    justAnswered = d.id
    commit((x) => {
      x.review ??= {}
      const r = x.review[d.id] ?? { right: 0, wrong: 0 }
      x.review[d.id] = { right: r.right + (correct ? 1 : 0), wrong: r.wrong + (correct ? 0 : 1), last: new Date().toISOString() }
    })
    rerender()
  }
  root.querySelector('[data-act=newset]')?.addEventListener('click', () => {
    reviewSet = null
    viewReview()
    window.scrollTo(0, 0)
  })
  for (const card of root.querySelectorAll('.drill')) {
    const d = reviewSet.find(({ d }) => d.id === card.dataset.id).d
    card.addEventListener('click', (e) => {
      const t = e.target.closest('button')
      if (!t || reviewAnswers[d.id]) return
      if (d.type === 'choice' && t.dataset.opt !== undefined) {
        const k = Number(t.dataset.opt)
        record(d, k, k === d.answer)
      }
      if (d.type === 'multi' && t.dataset.act === 'check') {
        const ks = [...card.querySelectorAll('input[data-opt]:checked')].map((x) => Number(x.dataset.opt))
        if (!ks.length) return toast('Tap at least one.')
        record(d, ks, [...ks].sort().join() === [...d.answers].sort().join())
      }
    })
  }
}

// ── Reference ────────────────────────────────────────────────────────

function viewReference() {
  setNav('reference')
  const s = st()
  $app.innerHTML = `<header class="hero"><h1>Pattern reference</h1>
    <p class="muted">Every technique in the course on one page: what it is, a line you could say, and the question that undoes it (which is also how to hear it used on you).</p></header>
    ${reference
      .map(
        (g) => `<h2 class="part">${esc(g.group)}</h2>${g.items
          .map((it) => {
            const hit = byId.get(it.module)
            const open = hit && unlocked(hit.i, modules, s)
            return `<div class="card ref">
              <p class="eyebrow">${open ? `<a href="#/m/${it.module}">Module ${hit.i}${icon('chev')}</a>` : `<span>${icon('lock')}Module ${hit?.i ?? ''}</span>`} ${chip(it.evidence)}</p>
              <h3>${esc(it.name)}</h3>
              <p>${inline(it.what)}</p>
              <blockquote>${inline(it.example)}</blockquote>
              ${it.undo ? `<p class="muted undo"><strong>Undo it:</strong> ${inline(it.undo)}</p>` : ''}
            </div>`
          })
          .join('')}`
      )
      .join('')}`
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
      <div class="lengths seg">${[30, 60, 120, 180].map((n) => `<button class="opt" data-len="${n}">${n < 60 ? n + ' s' : n / 60 + ' min'}</button>`).join('')}</div>
      <div class="face">
        <svg viewBox="0 0 120 120" aria-hidden="true"><circle class="track" cx="60" cy="60" r="54"/><circle class="fill" id="dial" cx="60" cy="60" r="54" pathLength="100"/></svg>
        <p class="clock" id="clock">0:30</p>
      </div>
      <div class="cards" id="cards" aria-live="polite"></div>
      <div class="row"><button class="button" id="go">Start</button><button class="button ghost" id="newtopic">${icon('shuffle')}New topic</button></div>
      <label class="check switchrow">${icon('mic')}<span>Record myself (stays on this device, gone when you leave)</span><input type="checkbox" id="rec" class="switch"></label>
      <audio id="play" controls hidden></audio>
    </div>
    <p class="muted">${runs.length} runs logged${best ? `, longest ${best} s` : ''}.</p>`
  let len = 30
  const clock = document.getElementById('clock')
  const face = $app.querySelector('.timer')
  const dial = document.getElementById('dial')
  const fmt = (n) => `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`
  // The ring empties as the time runs down: 0 is full, 100 is empty.
  const setDial = (gone) => (dial.style.strokeDashoffset = String(gone * 100))
  const pickLen = (n) => {
    len = n
    clock.textContent = fmt(n)
    setDial(0)
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
    // Stop belongs to the run that started the timer, not to this click.
    if (timer) return viewTimer.stop(false)
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
    face.classList.remove('finished')
    face.classList.add('running')
    let tick = 0
    timer = setInterval(() => {
      left -= 1
      tick += 1
      clock.textContent = fmt(left)
      setDial(1 - left / len)
      if (tick % 8 === 0) deal()
      if (left <= 0) stop(true)
    }, 1000)
    function stop(finished) {
      clearInterval(timer)
      timer = null
      recorder?.state === 'recording' && recorder.stop()
      const btn = document.getElementById('go')
      if (btn) btn.textContent = 'Start'
      face.classList.remove('running')
      face.classList.toggle('finished', finished)
      setDial(0)
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
  <section class="group">
    <h3>Appearance</h3>
    <div class="card"><div class="seg themes">${['auto', 'light', 'dark'].map((t) => `<button class="opt ${(s.settings.theme ?? 'auto') === t ? 'right' : ''}" data-theme="${t}">${icon(t)}${t[0].toUpperCase() + t.slice(1)}</button>`).join('')}</div></div>
  </section>
  <section class="group">
    <h3>Unlocking</h3>
    <div class="card"><label class="check switchrow"><span>Open every module now (for browsing ahead; passing still counts)</span><input type="checkbox" class="switch" id="unlockall" ${s.settings.unlockAll ? 'checked' : ''}></label></div>
  </section>
  <section class="group">
    <h3>Backup</h3>
    <div class="card">
      <p class="muted">Your progress lives on this device only. Copy a backup now and then, and paste it back on a new phone.</p>
      <div class="row"><button class="button" id="export">${icon('copy')}Copy backup</button><button class="button ghost" id="download">${icon('download')}Download file</button></div>
      <textarea id="importtext" rows="3" placeholder="Paste a backup here to restore it"></textarea>
      <button class="button ghost wide" id="import">${icon('restore')}Restore from pasted backup</button>
    </div>
  </section>
  <section class="group">
    <h3>Start over</h3>
    <div class="card"><button class="button danger wide" id="reset">${icon('trash')}Erase all progress</button></div>
  </section>
  <p class="muted small version">${spiral('spiral still')}Content version ${esc(document.documentElement.dataset.version ?? '')}</p>`
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

const THEME_BG = { light: '#f2f2f7', dark: '#000000' }

function applyTheme() {
  const t = st().settings.theme ?? 'auto'
  if (t === 'auto') delete document.documentElement.dataset.theme
  else document.documentElement.dataset.theme = t
  // Keep the status bar in step with a theme chosen by hand.
  for (const meta of document.querySelectorAll('meta[name="theme-color"]'))
    meta.content = THEME_BG[t === 'auto' ? (meta.media.includes('dark') ? 'dark' : 'light') : t]
}

/**
 * A new screen rises into place; a new tab of the same module only fades its
 * body. Only the elements there on arrival are marked, so re-rendering after
 * a tap (a drill answered, a rep saved) never replays the entrance, and
 * progress rings and bars fill once.
 */
let lastKey = null
function enter(key) {
  const tab = key === lastKey && key.startsWith('m/')
  lastKey = key
  if (tab) return $app.querySelector('.tabbody')?.classList.add('in-tab')
  ;[...$app.children]
    .filter((el) => !el.classList.contains('readbar'))
    .forEach((el, i) => {
      el.style.setProperty('--i', Math.min(i, 5))
      el.classList.add('in')
    })
}

function route() {
  if (timer) viewTimer.stop?.(false)
  const parts = location.hash.replace(/^#\/?/, '').split('#')[0].split('/').filter(Boolean)
  if (parts[0] === 'm' && parts[2] === 'l') viewLesson(parts[1], parts[3])
  else if (parts[0] === 'm') viewModule(parts[1], parts[2])
  else if (parts[0] === 'log') viewLog(parts[1])
  else if (parts[0] === 'timer') viewTimer()
  else if (parts[0] === 'review') viewReview()
  else if (parts[0] === 'reference') viewReference()
  else if (parts[0] === 'settings') viewSettings()
  else viewHome()
  if (!(parts[0] === 'm' && parts[2] === 'roleplay')) window.scrollTo(0, 0)
  enter(parts[0] === 'm' && parts[2] !== 'l' ? `m/${parts[1]}` : parts.join('/'))
}

applyTheme()
window.addEventListener('hashchange', route)
route()

if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost'))
  navigator.serviceWorker.register('./sw.js').catch(() => {})
