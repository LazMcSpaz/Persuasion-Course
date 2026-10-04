# How a module is written

Each module is one ES module in `content/`, named `mNN-slug.js`, with a
default export. `content/index.js` lists them in order. The app reads
nothing else, so a module is complete when this file is.

```js
export default {
  id: 'm04',                    // matches the file's NN
  title: 'Artfully Vague Language',
  tagline: 'One line: what you will be able to do after this module.',
  part: 'Milton Model',         // a heading the map groups modules under
  lessons: [ /* Lesson */ ],
  drills: [ /* Drill */ ],
  assignments: [ /* Assignment */ ],
  scenarios: [ /* Scenario */ ],
}
```

## Lesson

```js
{
  id: 'm04-l1',
  title: 'Nominalizations',
  body: `…mini-markdown…`,
  techniques: [
    { name: 'Nominalizations', evidence: 'mixed', note: 'One or two sentences.' },
  ],
}
```

`body` is a small markdown subset, and nothing else renders:

- a blank line separates paragraphs
- `## Heading` (level 2 and 3 only)
- `**bold**` and `*italic*`
- lines starting `- ` are a list; `1. ` a numbered list
- `> ` a quoted example (a line someone would actually say)
- `[[cmd]]` marks words delivered as an embedded command; shown underlined

Keep paragraphs short. Second person. Plain words. **No long dashes**
(— or –); use a comma, a full stop or a colon. Examples come from three
places in rotation: face-to-face sales, phone or video calls, and everyday
life (a partner, a friend, a colleague, a landlord).

`evidence` is one of:

- `supported` — direct experimental evidence for the technique itself, or it
  is a straightforward case of a well-replicated effect.
- `mixed` — related findings exist but the technique as taught has not been
  tested, or results go both ways.
- `unproven` — practitioner lore with no controlled test. Taught because the
  learner asked for it; say so plainly and suggest how to test it.

Only cite research from `content/EVIDENCE.md`. Never invent a study, a
number or an author. If nothing there applies, say "no controlled studies"
and stop.

## Drill

Three types.

```js
// Auto-graded. `answer` is the index into options.
{ id: 'm04-d1', type: 'choice',
  prompt: 'Which word is a nominalization?',
  quote: 'optional line under discussion',
  options: ['chair', 'understanding', 'walk', 'blue'],
  answer: 1,
  explain: 'Why, in one or two sentences. Shown after answering.' }

// Auto-graded, several right answers. `answers` are indices.
{ id: 'm04-d2', type: 'multi',
  prompt: 'Tap every unspecified verb.',
  options: ['learn', 'hammer', 'notice', 'drive'],
  answers: [0, 2],
  explain: '…' }

// Self-checked. The learner writes, then sees models and ticks the checklist.
{ id: 'm04-d3', type: 'rewrite',
  prompt: 'Rewrite this so the listener supplies the meaning.',
  given: 'This car has a 300 horsepower engine and leather seats.',
  models: ['You will notice a certain kind of confidence when you drive it.'],
  checklist: ['Uses at least one nominalization', 'Contains no fact they could dispute'] }
```

A module has 10 to 16 drills, at least 6 of them `choice` or `multi`, and
at least 3 `rewrite`. Distractors must be plausible. Every `choice` and
`multi` has an `explain`.

## Assignment

Mastery comes from reps, so a module has **5 to 8** assignments, ordered
from private to public:

```js
{ id: 'm04-a1',
  kind: 'solo',        // solo | everyday | field | chat
  title: 'Short title',
  instructions: `mini-markdown`,
  reps: 5,             // how many logged reps complete it
  required: true,      // counts toward unlocking the next module
  log: ['What did you say?', 'What happened?', 'What would you change?'] }
```

- `solo`: out loud or on paper, nobody else involved (e.g. record yourself)
- `everyday`: low-stakes real conversations (a barista, a friend)
- `field`: a real sale, call or negotiation
- `chat`: a role-play run with Claude; give it a `scenario` id

At least 4 are `required`. At least one is `field` and at least one `chat`.
`log` questions are what the learner answers for each rep. Every module's
log includes a trust question ("Would they be glad they talked to you
tomorrow?") in some wording.

## Scenario

A card the learner copies into a Claude chat to run a role-play.

```js
{ id: 'm04-s1',
  title: 'The undecided buyer',
  setting: 'Phone call. You sell solar panels.',
  you: 'What the learner is trying to do.',
  them: 'Who Claude plays: personality, situation, what they want, what they fear.',
  objections: ['Two or three things they will say'],
  focus: ['Techniques from this module to use'],
  win: 'What counts as success, including the trust side.' }
```

The app builds the prompt from these fields, so do not write a prompt.
Each module has 2 or 3 scenarios.
