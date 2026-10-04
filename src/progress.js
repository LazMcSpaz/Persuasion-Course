/**
 * What counts as done. Pure, so the rules can be tested without a browser.
 *
 * A module is **passed**, and the next one opens, when its auto-graded drills
 * stand at 80% or better, every rewrite drill has been checked off, and every
 * required assignment that does not depend on a real sale or a real
 * conversation partner turning up has its reps logged. Field assignments run
 * on while later modules are studied, because they wait on life; a module is
 * **mastered** when those are logged too.
 */
export const PASS_MARK = 0.8

export const isAuto = (d) => d.type === 'choice' || d.type === 'multi'

export function drillScore(m, st) {
  const auto = m.drills.filter(isAuto)
  if (!auto.length) return 1
  return auto.filter((d) => st.drills[d.id]?.correct).length / auto.length
}

export function rewritesDone(m, st) {
  const rw = m.drills.filter((d) => d.type === 'rewrite')
  return { done: rw.filter((d) => st.rewrites[d.id]?.done).length, total: rw.length }
}

export const repsOf = (a, st) => (st.reps[a.id] ?? []).length

export const assignmentDone = (a, st) => repsOf(a, st) >= a.reps

export function lessonsRead(m, st) {
  return { done: m.lessons.filter((l) => st.read[l.id]).length, total: m.lessons.length }
}

const gating = (a) => a.required && a.kind !== 'field'

export function passed(m, st) {
  const rw = rewritesDone(m, st)
  return (
    drillScore(m, st) >= PASS_MARK &&
    rw.done === rw.total &&
    m.assignments.filter(gating).every((a) => assignmentDone(a, st))
  )
}

export function mastered(m, st) {
  return passed(m, st) && m.assignments.filter((a) => a.required).every((a) => assignmentDone(a, st))
}

/**
 * Once a module has been passed it stays passed: redoing its drills for
 * practice must not lock the modules after it.
 */
export const hasPassed = (m, st) => !!st.latched?.[m.id] || passed(m, st)

export function unlocked(i, modules, st) {
  return i === 0 || !!st.settings.unlockAll || hasPassed(modules[i - 1], st)
}

/** What stands between this module and passing, in words, for the module page. */
export function outstanding(m, st) {
  const left = []
  const score = drillScore(m, st)
  if (score < PASS_MARK)
    left.push(`Drills at ${Math.round(score * 100)}%, need ${Math.round(PASS_MARK * 100)}%`)
  const rw = rewritesDone(m, st)
  if (rw.done < rw.total) left.push(`${rw.total - rw.done} rewrite drill(s) to check off`)
  for (const a of m.assignments.filter(gating))
    if (!assignmentDone(a, st)) left.push(`${a.title}: ${repsOf(a, st)} of ${a.reps} reps`)
  return left
}

/** A 0 to 1 figure for the map: lessons, drills and every required rep. */
export function fraction(m, st) {
  const l = lessonsRead(m, st)
  const rw = rewritesDone(m, st)
  const req = m.assignments.filter((a) => a.required)
  const repsNeeded = req.reduce((n, a) => n + a.reps, 0)
  const repsDone = req.reduce((n, a) => n + Math.min(repsOf(a, st), a.reps), 0)
  const parts = [
    l.total ? l.done / l.total : 1,
    Math.min(1, drillScore(m, st) / PASS_MARK),
    rw.total ? rw.done / rw.total : 1,
    repsNeeded ? repsDone / repsNeeded : 1,
  ]
  return (parts[0] + parts[1] + parts[2] + 2 * parts[3]) / 5
}

/** The role-play brief a learner pastes into a Claude chat. */
export function rolePlayPrompt(s, m) {
  return [
    `Let's run a sales and persuasion role-play. I'm practising "${m.title}" from my course.`,
    '',
    `Setting: ${s.setting}`,
    `What I'm trying to do: ${s.you}`,
    '',
    `You play: ${s.them}`,
    '',
    `Raise these naturally, in your own words, when they fit: ${s.objections.map((o) => `"${o}"`).join('; ')}.`,
    '',
    'Stay in character and react the way this person really would: warmer when I earn it, cooler or shorter when I push, condescend, or say something that sounds like a scripted technique. Keep your turns short, as in real conversation. Do not coach me during the role-play.',
    '',
    `When I type "debrief", step out of character and give me:`,
    '1. Outcome, 0 to 10: did I get where I was trying to go?',
    '2. Trust, 0 to 10: would this person be glad tomorrow that they talked to me? Did anything feel like pressure or a trick?',
    `3. Techniques I was practising (${s.focus.join(', ')}): quote each place I used one and say whether it landed.`,
    '4. The two weakest moments, each with a line I could have said instead.',
    `5. What counts as a win here: ${s.win} Did I get it?`,
    '',
    'Start by setting the scene in one line, then begin in character.',
  ].join('\n')
}
