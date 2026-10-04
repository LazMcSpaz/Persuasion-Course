/**
 * Everything the learner does, kept on the device. On an iPhone a web app
 * added to the Home Screen keeps its storage; a Safari tab may lose it after
 * weeks unused, which is why Settings offers an export.
 */
const KEY = 'persuasion-course.v1'

const empty = () => ({ read: {}, drills: {}, rewrites: {}, reps: {}, latched: {}, runs: [], review: {}, settings: {} })

let state = load()

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return empty()
    return { ...empty(), ...JSON.parse(raw) }
  } catch {
    return empty()
  }
}

export function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}

export const get = () => state

export function update(fn) {
  fn(state)
  return save()
}

export function replace(next) {
  state = { ...empty(), ...next }
  return save()
}

export function reset() {
  state = empty()
  return save()
}
