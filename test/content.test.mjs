// The content against content/SCHEMA.md, and the progress rules. node --test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { modules } from '../content/index.js'
import { passed, unlocked, hasPassed, outstanding, rolePlayPrompt, PASS_MARK } from '../src/progress.js'

const EVIDENCE = new Set(['supported', 'mixed', 'unproven'])
const KINDS = new Set(['solo', 'everyday', 'field', 'chat'])

// Every "(Name, 1999)" or "Name (1999)" in the content must be an entry in EVIDENCE.md.
const evidence = readFileSync(new URL('../content/EVIDENCE.md', import.meta.url), 'utf8')
const cited = new Map()
for (const m of evidence.matchAll(/\*\*([^*]+?)\((\d{4})\)/g))
  for (const name of m[1].match(/[A-Z][a-z]+/g) ?? []) cited.set(`${name} ${m[2]}`, true)

const strings = (x) =>
  typeof x === 'string' ? [x] : Array.isArray(x) ? x.flatMap(strings) : x && typeof x === 'object' ? Object.values(x).flatMap(strings) : []

test('the course has sixteen modules in order', () => {
  assert.equal(modules.length, 16)
  modules.forEach((m, i) => assert.equal(m.id, `m${String(i).padStart(2, '0')}`))
})

for (const m of modules) {
  test(`${m.id} ${m.title}: shape`, () => {
    for (const k of ['id', 'title', 'tagline', 'part']) assert.equal(typeof m[k], 'string', k)
    const ids = [m.id, ...m.lessons.map((x) => x.id), ...m.drills.map((x) => x.id), ...m.assignments.map((x) => x.id), ...m.scenarios.map((x) => x.id)]
    assert.equal(new Set(ids).size, ids.length, 'ids are unique')
    for (const id of ids.slice(1)) assert.ok(id.startsWith(`${m.id}-`), `${id} carries the module id`)

    assert.ok(m.lessons.length >= 1)
    for (const l of m.lessons) {
      assert.ok(l.title && l.body, l.id)
      for (const t of l.techniques ?? []) {
        assert.ok(EVIDENCE.has(t.evidence), `${l.id}: evidence "${t.evidence}"`)
        assert.ok(t.name && t.note, `${l.id}: technique needs name and note`)
      }
    }
  })

  test(`${m.id}: drills`, () => {
    const auto = m.drills.filter((d) => d.type === 'choice' || d.type === 'multi')
    const rewrite = m.drills.filter((d) => d.type === 'rewrite')
    const min = m.id === 'm00' ? 4 : 10
    assert.ok(m.drills.length >= min, `${m.drills.length} drills`)
    assert.ok(auto.length >= (m.id === 'm00' ? 3 : 6), `${auto.length} graded drills`)
    if (m.id !== 'm00') assert.ok(rewrite.length >= 3, `${rewrite.length} rewrites`)
    for (const d of m.drills) {
      assert.ok(['choice', 'multi', 'rewrite'].includes(d.type), `${d.id}: type ${d.type}`)
      assert.ok(d.prompt, `${d.id}: prompt`)
      if (d.type === 'choice') {
        assert.ok(Number.isInteger(d.answer) && d.answer >= 0 && d.answer < d.options.length, `${d.id}: answer in range`)
        assert.ok(d.explain, `${d.id}: explain`)
        assert.equal(new Set(d.options).size, d.options.length, `${d.id}: options distinct`)
      }
      if (d.type === 'multi') {
        assert.ok(d.answers.length >= 1 && d.answers.every((a) => Number.isInteger(a) && a >= 0 && a < d.options.length), `${d.id}: answers in range`)
        assert.equal(new Set(d.answers).size, d.answers.length, `${d.id}: answers distinct`)
        assert.ok(d.explain, `${d.id}: explain`)
      }
      if (d.type === 'rewrite') {
        assert.ok(d.models?.length >= 1, `${d.id}: models`)
        assert.ok(d.checklist?.length >= 1, `${d.id}: checklist`)
      }
    }
  })

  test(`${m.id}: assignments and scenarios`, () => {
    const as = m.assignments
    assert.ok(as.length >= 4, `${as.length} assignments`)
    assert.ok(as.filter((a) => a.required).length >= (m.id === 'm00' ? 2 : 4), 'required assignments')
    if (m.id !== 'm00') {
      assert.ok(as.some((a) => a.kind === 'field'), 'a field assignment')
      assert.ok(as.some((a) => a.kind === 'chat'), 'a chat assignment')
    }
    const scen = new Set(m.scenarios.map((s) => s.id))
    for (const a of as) {
      assert.ok(KINDS.has(a.kind), `${a.id}: kind ${a.kind}`)
      assert.ok(Number.isInteger(a.reps) && a.reps >= 1, `${a.id}: reps`)
      assert.ok(a.instructions && a.title, `${a.id}: text`)
      assert.ok(Array.isArray(a.log) && a.log.length >= 1, `${a.id}: log`)
      if (a.kind === 'chat') assert.ok(scen.has(a.scenario), `${a.id}: scenario ${a.scenario} exists here`)
      else if (a.scenario) assert.ok(scen.has(a.scenario), `${a.id}: scenario ${a.scenario}`)
    }
    assert.ok(
      as.some((a) => a.log.some((q) => /glad|trust|feel (handled|pushed|pressured)|pressure/i.test(q))),
      'some log asks the trust question'
    )
    if (m.id !== 'm00') assert.ok(m.scenarios.length >= 2, `${m.scenarios.length} scenarios`)
    for (const s of m.scenarios)
      for (const k of ['title', 'setting', 'you', 'them', 'win']) assert.ok(typeof s[k] === 'string' && s[k], `${s.id}: ${k}`)
    for (const s of m.scenarios) assert.ok(s.objections?.length && s.focus?.length, `${s.id}: objections and focus`)
  })

  test(`${m.id}: house style`, () => {
    for (const s of strings(m)) {
      assert.ok(!/[—–]/.test(s), `long dash in: ${s.slice(0, 80)}`)
      assert.ok(!/<[a-z]/i.test(s), `raw HTML in: ${s.slice(0, 80)}`)
    }
  })

  test(`${m.id}: every citation is in EVIDENCE.md`, () => {
    for (const s of strings(m))
      for (const hit of s.matchAll(/\b(1[89]\d\d|20[0-2]\d)\b(?!s)/g)) {
        const before = s.slice(Math.max(0, hit.index - 70), hit.index)
        const names = before.match(/[A-Z][a-z]+/g) ?? []
        const year = hit[1]
        // A year with no surname near it is a date, not a citation.
        if (!names.length) continue
        const known = names.some((n) => cited.has(`${n} ${year}`))
        const looksCited = /\(\s*$|,\s*$|\(\s*[A-Z][^()]*$|&|and colleagues/.test(before)
        if (looksCited) assert.ok(known, `${m.id}: "${before.slice(-50)}${year}" is not in EVIDENCE.md`)
      }
  })
}

test('passing: drills at the mark, rewrites done, non-field required reps logged', () => {
  const m = {
    id: 'mx',
    drills: [
      { id: 'a', type: 'choice' },
      { id: 'b', type: 'choice' },
      { id: 'c', type: 'choice' },
      { id: 'd', type: 'choice' },
      { id: 'e', type: 'choice' },
      { id: 'r', type: 'rewrite' },
    ],
    assignments: [
      { id: 's', kind: 'solo', reps: 2, required: true },
      { id: 'f', kind: 'field', reps: 5, required: true },
      { id: 'o', kind: 'everyday', reps: 3, required: false },
    ],
  }
  const st = { drills: {}, rewrites: {}, reps: {}, latched: {}, settings: {} }
  for (const id of ['a', 'b', 'c', 'd']) st.drills[id] = { correct: true }
  assert.equal(4 / 5 >= PASS_MARK, true)
  assert.equal(passed(m, st), false, 'rewrite not done')
  st.rewrites.r = { done: true }
  assert.equal(passed(m, st), false, 'solo reps missing')
  assert.ok(outstanding(m, st).some((x) => x.includes('0 of 2')))
  st.reps.s = [{}, {}]
  assert.equal(passed(m, st), true, 'field and optional work do not gate')
  st.drills.d.correct = false
  assert.equal(passed(m, st), false, '3 of 5 is under the mark')
  st.latched.mx = true
  assert.equal(hasPassed(m, st), true, 'a latched pass survives redoing drills')
  assert.equal(unlocked(1, [m, {}], st), true)
  assert.equal(unlocked(1, [m, {}], { ...st, latched: {} }), false)
  assert.equal(unlocked(1, [m, {}], { ...st, latched: {}, settings: { unlockAll: true } }), true)
})

test('the role-play brief carries the card and the debrief', () => {
  const m = modules[4]
  const s = m.scenarios[0]
  const p = rolePlayPrompt(s, m)
  for (const part of [s.setting, s.you, s.them, s.win, ...s.objections, ...s.focus]) assert.ok(p.includes(part), part)
  assert.match(p, /debrief/)
  assert.match(p, /Trust, 0 to 10/)
})
