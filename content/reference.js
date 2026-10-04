/**
 * The pattern reference: every named technique in one place, for looking
 * something up mid-week without rereading a lesson. `module` is where it is
 * taught; `undo` is the precision question (Module 13) that recovers what
 * the pattern leaves out, which is also how to hear it used on you.
 */
export const reference = [
  {
    group: 'Rapport and reading people',
    items: [
      { name: 'Matching', module: 'm01', evidence: 'supported', what: 'Loosely matching their tempo, volume, energy and posture, late and partly, never on the spot.', example: 'They speak slowly and quietly on the phone; you slow down and drop your volume a notch.' },
      { name: 'Backtracking', module: 'm01', evidence: 'supported', what: 'Giving their key words back exactly, not your paraphrase.', example: 'They said "it keeps fighting me"; you say "so it keeps fighting you".' },
      { name: 'Naming the feeling', module: 'm01', evidence: 'mixed', what: 'Putting the emotion you hear into words, tentatively.', example: 'It sounds like this has been a real headache.' },
      { name: 'Calibration', module: 'm02', evidence: 'mixed', what: 'Learning one person’s baseline and noticing change from it. Never decoding from a chart.', example: 'Their answers got shorter and they stopped asking questions when price came up.' },
    ],
  },
  {
    group: 'Pacing and leading',
    items: [
      { name: 'Truism', module: 'm03', evidence: 'unproven', what: 'A statement they can check is true, right now.', example: 'You’ve driven over from the other side of town, and it’s been a long week.' },
      { name: 'Pace, pace, pace, lead', module: 'm03', evidence: 'mixed', what: 'Several true statements, then one step toward where you are going.', example: 'You’ve looked at three quotes, you’ve read the reviews, you know what you need, so let’s see which fits.' },
      { name: 'Yes set', module: 'm03', evidence: 'unproven', what: 'Three easy agreements before the lead.', example: 'You want it installed before winter? And you’d like one visit, not three? And no mess? Then here’s what I’d suggest.' },
    ],
  },
  {
    group: 'The Milton Model: vague on purpose',
    items: [
      { name: 'Nominalization', module: 'm04', evidence: 'mixed', what: 'A process frozen into a noun: comfort, relief, confidence, security.', example: 'What most people get from it is peace of mind.', undo: 'Peace of mind about what, specifically? How would you know you had it?' },
      { name: 'Unspecified verb', module: 'm04', evidence: 'mixed', what: 'Says something happens without saying how: notice, discover, realize, enjoy.', example: 'You’ll notice the difference in the first week.', undo: 'Notice it how, specifically?' },
      { name: 'Unspecified referential index', module: 'm04', evidence: 'unproven', what: 'Nobody in particular: people, some, they say, a lot of my clients (only if true).', example: 'People often find it takes a weight off.', undo: 'Who, specifically?' },
      { name: 'Deletion / comparative deletion', module: 'm04', evidence: 'unproven', what: 'Leaves out what or than what: easier, better, more.', example: 'You’ll find it’s so much easier.', undo: 'Easier than what?' },
      { name: 'Modal operator of possibility', module: 'm04', evidence: 'mixed', what: 'Can, may, might, could: offering rather than directing.', example: 'You might find it settles once you’ve tried it for a week.', undo: 'What would make it possible? What stops it?' },
    ],
  },
  {
    group: 'The Milton Model: links, causes and readings',
    items: [
      { name: 'Linkage (conjunction)', module: 'm05', evidence: 'unproven', what: 'Joining what is true to what you suggest with "and".', example: 'You’re looking at the blue one, and you can picture it in the hallway.' },
      { name: 'Implied causative', module: 'm05', evidence: 'unproven', what: 'As, while, when, during, before: one thing happening alongside another.', example: 'As you look through the figures, you can see where the saving comes from.' },
      { name: 'Cause and effect', module: 'm05', evidence: 'supported', what: '"Because" and "makes": a reason attached. A real reason for anything larger than a small favor.', example: 'Could we book Thursday, because that’s when the installer is in your area?', undo: 'How does this cause that?' },
      { name: 'Complex equivalence', module: 'm05', evidence: 'unproven', what: '"Which means": treating one thing as meaning another.', example: 'You’ve asked about delivery, which means you’re already thinking about where it goes.', undo: 'How does this mean that?' },
      { name: 'Mind-reading', module: 'm05', evidence: 'mixed', what: 'Claiming to know their inner state, softly, as a guess.', example: 'You might be wondering how long installation takes.', undo: 'How do you know that?' },
      { name: 'Lost performative', module: 'm05', evidence: 'unproven', what: 'A judgment with nobody saying it.', example: 'It’s good to take your time over a decision like this.', undo: 'Good according to whom?' },
      { name: 'Universal quantifier', module: 'm05', evidence: 'unproven', what: 'All, every, always, everyone: only where true.', example: 'Every customer gets the same thirty-day return.', undo: 'Always? Every single one?' },
    ],
  },
  {
    group: 'The Milton Model: NUVI and the run-on sentence',
    items: [
      { name: 'NUVI (Mike Mandel)', module: 'm06', evidence: 'unproven', what: 'Nominalization Unspecified Verb Integration: weaving nominalizations and unspecified verbs into a continuous stream.', example: '…and as you notice that comfort, you can discover a kind of ease…' },
      { name: 'Run-on sentence', module: 'm06', evidence: 'mixed', what: 'Talking without resolving: pause where a period would go, keep the linkage, land on something clear. Never carry a price or a strong argument inside it.', example: 'You’ve had a long week, and you’re sitting down now, and as you let the chair take the weight, you might notice a little more room…' },
    ],
  },
  {
    group: 'The Milton Model: presuppositions and choices',
    items: [
      { name: 'Time presupposition', module: 'm07', evidence: 'mixed', what: 'Before, after, while, when, during: assumes the thing happens.', example: 'Before you decide, take a look at the warranty.' },
      { name: 'Ordinal', module: 'm07', evidence: 'mixed', what: 'First, next, last: assumes a sequence.', example: 'The first thing people notice is how quiet it is.' },
      { name: '"Or" choice', module: 'm07', evidence: 'unproven', what: 'Two options that share the assumption you want.', example: 'Would Tuesday or Thursday suit you for the installation?' },
      { name: 'Awareness predicate', module: 'm07', evidence: 'mixed', what: 'Realize, notice, know, aware: assumes what follows is true. Only for what is true.', example: 'You may already realize how much time this saves.' },
      { name: 'Adverb / adjective', module: 'm07', evidence: 'mixed', what: 'How easily, how quickly: assumes the verb, asks only about manner.', example: 'I’m curious how easily it’ll fit into your morning.' },
      { name: 'Commentary', module: 'm07', evidence: 'unproven', what: 'Fortunately, luckily, happily: comments on what is assumed.', example: 'Fortunately, the old unit comes out the same day.' },
      { name: 'Double bind', module: 'm07', evidence: 'unproven', what: 'Every option leads the same way. Pressure when it hides a whether behind a which.', example: 'You can try it on today, or take the sample home and see how it feels there.' },
    ],
  },
  {
    group: 'The Milton Model: embedded commands, questions and ambiguity',
    items: [
      { name: 'Embedded command', module: 'm08', evidence: 'unproven', what: 'An instruction inside a longer sentence, marked lightly by a tone drop, a pause or a glance.', example: 'You might want to [[take a minute and look it over]].' },
      { name: 'Embedded question', module: 'm08', evidence: 'unproven', what: 'A question said as a statement.', example: 'I’m curious what would make this work for your team.' },
      { name: 'Negative command', module: 'm08', evidence: 'mixed', what: 'A negation still puts the idea in mind (Wegner). Avoid accidental ones like "don’t worry".', example: 'Don’t decide anything today.' },
      { name: 'Conversational postulate', module: 'm08', evidence: 'unproven', what: 'A yes/no question that invites the action.', example: 'Can you picture it in the corner by the window?' },
      { name: 'Tag question', module: 'm08', evidence: 'unproven', what: 'A short question added to a statement, said falling to ask for agreement.', example: 'That’s what you were after, isn’t it?' },
      { name: 'Quote', module: 'm08', evidence: 'unproven', what: 'A line put in someone else’s mouth. Real quotes only.', example: 'My old manager used to say, "just try it for a week".' },
      { name: 'Ambiguity', module: 'm08', evidence: 'unproven', what: 'Words or phrases that carry two readings at once: sound-alikes, grammar, scope or run-together sentences.', example: 'You know/no longer need to put up with the old one. (Heard both ways at once.)' },
    ],
  },
  {
    group: 'The Milton Model: stories and utilization',
    items: [
      { name: 'Client story', module: 'm09', evidence: 'supported', what: 'A true story of a person like them with a problem like theirs: 30 to 90 seconds, no moral stated.', example: 'A couple on your street had the same worry about the noise…' },
      { name: 'Teaching tale / metaphor', module: 'm09', evidence: 'mixed', what: 'A story from elsewhere whose shape matches their situation.', example: 'Learning to ride a bike: wobbling, then one day you just go.' },
      { name: 'Utilization', module: 'm10', evidence: 'unproven', what: 'Using whatever they bring, resistance included, as the path forward.', example: 'You’re right to be careful, and that care is exactly why the trial exists.' },
      { name: '"But you’re free"', module: 'm10', evidence: 'supported', what: 'A sincere reminder that they can say no (Carpenter).', example: 'Take a look at it, and of course it’s entirely your call.' },
    ],
  },
  {
    group: 'Around the Milton Model',
    items: [
      { name: 'Future pacing', module: 'm11', evidence: 'mixed', what: 'Having them picture a specific moment after they have it.', example: 'Picture next Saturday morning, coffee in hand, and the yard work already done.' },
      { name: 'Gain / loss frame', module: 'm12', evidence: 'supported', what: 'The same facts told as what they gain or what they lose.', example: 'You keep $40 a month, or you stop losing $40 a month.' },
      { name: 'Price anchor', module: 'm12', evidence: 'supported', what: 'A real first number sets the reference. Not NLP "anchoring".', example: 'The full system is $4,800; most people start with the $1,900 core.' },
      { name: 'Reframe', module: 'm12', evidence: 'unproven', what: 'Context ("where would this be useful?") or content ("what else could this mean?"). Must be true.', example: 'Fussy? Or someone who won’t pay twice for the same mistake.' },
      { name: 'Disrupt, then reframe', module: 'm12', evidence: 'supported', what: 'A small oddity, then a clear frame (Davis & Knowles).', example: 'It’s 300 pennies, that’s three dollars, it’s a bargain.' },
      { name: 'Precision question', module: 'm13', evidence: 'mixed', what: 'Recovering what was left out, softly: compared to what, who, how, always, what stops you.', example: 'When you say it’s too slow, slower than what you need for what, exactly?' },
      { name: 'Foot in the door', module: 'm14', evidence: 'supported', what: 'A small yes first makes a larger one modestly more likely.', example: 'Could I send you the one-page summary first?' },
      { name: 'The ask', module: 'm14', evidence: 'mixed', what: 'One clear sentence with a real reason, then silence.', example: 'Should we book the install for the 14th, so it’s in before the cold?' },
    ],
  },
]
