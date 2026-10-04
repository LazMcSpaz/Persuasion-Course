export default {
  id: 'm04',
  title: 'Artfully Vague Language',
  tagline:
    'Speak so the listener fills in the meaning that fits them, and know exactly when not to.',
  part: 'The Milton Model',
  lessons: [
    {
      id: 'm04-l1',
      title: 'Why vague works',
      body: `Most of the time, being clear is a virtue. When you want someone to *imagine* something, it is not, because a precise picture is your picture. The more exactly you describe it, the more places it can be wrong for them.

Milton Erickson noticed that he could say less and have people experience more. "You might notice a certain kind of comfort" lets each listener find their own comfort. "You'll feel your shoulders drop and your breathing slow to six breaths a minute" gives them three things to check and disagree with.

Bandler and Grinder built the Milton Model by writing down the patterns Erickson used. Most of them are the *same* patterns the Meta Model teaches you to question. In the Meta Model, you notice vagueness and ask for the specifics. In the Milton Model, you create vagueness on purpose and let the listener supply the specifics.

## What the research says

People rate vague, general statements as remarkably accurate descriptions of themselves (Forer, 1949). That is the Barnum effect, and it is the honest core of this module: vague language *feels personal*, because the listener does the work of making it fit.

What has not been tested is the stronger claim that vague language puts people into trance. Treat that as a possibility to watch for, not a fact.

## The rule that keeps you honest

Be vague about **experience**. Be exact about **facts**. Price, terms, dates, what the product does and does not do: always precise. "You'll find a real sense of security" is artful. "It's basically covered for everything" is a misrepresentation, and it is the kind that costs you the customer later.`,
      techniques: [
        {
          name: 'Artfully vague language',
          evidence: 'mixed',
          note: 'Vague statements feel personally accurate (Forer, 1949). Its power to induce trance has not been tested.',
        },
      ],
    },
    {
      id: 'm04-l2',
      title: 'Nominalizations',
      body: `A nominalization is a process frozen into a noun. "Understand" is something you do; "understanding" is a thing you can apparently have. Others: confidence, comfort, relief, security, success, curiosity, freedom, progress, peace of mind.

The test: can you put it in a wheelbarrow? A chair, yes. A "decision", no. And can you say "an ongoing ___"? "An ongoing relationship" works, so relationship is a nominalization.

Nominalizations are powerful because each person has their own experience of them. When you say "peace of mind", the listener reaches for *their* version, the specific relief they would feel. You never have to guess what it is.

> And I think what you'll get from this is a kind of **peace of mind**.

> What people tell me they value most is the **freedom** it gives them.

> I can hear there's some **frustration** with how it's been going.

On a call, nominalizations do more of the work because there is no face to read. Give them something to fill in, then listen to *how* they fill it in. That tells you what matters to them.

## Where it goes wrong

Stacking nominalizations with nothing concrete nearby sounds like a brochure. One or two in a sentence, next to something they can verify, is the shape to aim for:

> You've been running this business for twelve years, so you know the value of **reliability**.`,
      techniques: [
        {
          name: 'Nominalizations',
          evidence: 'mixed',
          note: 'A case of the Barnum effect: listeners supply their own meaning. No controlled studies of nominalizations in persuasion as such.',
        },
      ],
    },
    {
      id: 'm04-l3',
      title: 'Unspecified verbs',
      body: `An unspecified verb says that something happens without saying how. *Learn, notice, discover, realise, understand, change, improve, enjoy, feel, wonder, experience.*

"You'll notice a difference" does not say what difference, or how they will notice it. The listener has to search their experience to make sense of it, and whatever they find is theirs.

Compare:

> When you drive it, you'll **feel** how it **handles**.

> When you drive it, you'll find it corners flat at 40 miles an hour.

The second is a claim they can test and argue with. The first is an invitation.

## The pairing that makes NUVI

Unspecified verbs and nominalizations work best together, one doing and one being:

> As you start to **notice** the **difference**, you can **discover** a new kind of **confidence** in how you **handle** it.

That sentence makes no factual claim at all, and almost anyone can find something true in it for themselves. It is the raw material of the run-on sentence you will build in Module 6.`,
      techniques: [
        {
          name: 'Unspecified verbs',
          evidence: 'mixed',
          note: 'Same basis as nominalizations: the listener supplies the meaning. No controlled studies.',
        },
      ],
    },
    {
      id: 'm04-l4',
      title: 'Unnamed people and missing comparisons',
      body: `Two more ways to leave a gap.

## Unspecified referential index

Who, exactly? "People", "some", "one", "they say", "a lot of my clients". The claim is attributed to someone the listener cannot question, and it invites them to imagine being one of those people.

> **People** often find it takes a weight off.

> **Some** of my customers say the first month is when it clicks.

> **One** can learn a lot from a mistake like that.

Use only what is true. "A lot of my clients" must mean a lot of your clients. An invented crowd is a lie, and it is the kind that falls apart with one follow-up question.

## Deletions and comparative deletions

A deletion leaves out part of the meaning. "I know you're curious" (about what?). "You'll be pleased" (with what?).

A comparative deletion leaves out what it is compared to: *better, easier, more, faster, less.*

> It's **easier**.

> You'll find it's **more** comfortable.

Easier than what? The listener picks the comparison that matters to them, usually the thing they are struggling with now.

## The exactness line, again

"It's cheaper" with nothing after it, said to someone comparing quotes, is a factual claim dressed as vagueness, and they will check it. Keep comparative deletions for experience ("it feels easier"), not for numbers ("it costs less").`,
      techniques: [
        {
          name: 'Unspecified referential index',
          evidence: 'unproven',
          note: 'No controlled studies. Effective only while the attribution is true.',
        },
        {
          name: 'Comparative deletions',
          evidence: 'unproven',
          note: 'No controlled studies.',
        },
      ],
    },
  ],
  drills: [
    {
      id: 'm04-d1',
      type: 'choice',
      prompt: 'Which word is a nominalization?',
      options: ['table', 'confidence', 'walk', 'heavy'],
      answer: 1,
      explain: 'Confidence is a process (being confident) turned into a noun. You cannot put it in a wheelbarrow.',
    },
    {
      id: 'm04-d2',
      type: 'multi',
      prompt: 'Tap every nominalization.',
      options: ['relief', 'invoice', 'progress', 'contract', 'security', 'car'],
      answers: [0, 2, 4],
      explain: 'Relief, progress and security are processes frozen into nouns. An invoice, a contract and a car are physical things (a contract can be held as paper).',
    },
    {
      id: 'm04-d3',
      type: 'multi',
      prompt: 'Tap every unspecified verb.',
      options: ['notice', 'hammer', 'discover', 'sign', 'enjoy', 'subtract'],
      answers: [0, 2, 4],
      explain: 'Notice, discover and enjoy say something happens without saying how. Hammer, sign and subtract name a specific action.',
    },
    {
      id: 'm04-d4',
      type: 'choice',
      prompt: 'What does this sentence use?',
      quote: 'People often tell me it took a weight off.',
      options: [
        'A comparative deletion',
        'An unspecified referential index',
        'An unspecified verb',
        'A presupposition',
      ],
      answer: 1,
      explain: '"People" is unnamed: the listener cannot know who, and is invited to imagine being one of them.',
    },
    {
      id: 'm04-d5',
      type: 'choice',
      prompt: 'Which line is artfully vague in the right place?',
      options: [
        '"It’s basically covered for anything that could happen."',
        '"Most people find a real sense of security once it’s set up."',
        '"The premium is somewhere around what you’re paying now."',
        '"It’s cheaper."',
      ],
      answer: 1,
      explain: 'Vague about experience, which is the listener’s to fill in. The others are vague about facts (coverage, price), which is where vagueness becomes misrepresentation.',
    },
    {
      id: 'm04-d6',
      type: 'choice',
      prompt: 'What is missing from this sentence?',
      quote: 'You’ll find it’s so much easier.',
      options: [
        'Who finds it easier',
        'What it is easier than',
        'When they will find it',
        'Nothing; it is fully specified',
      ],
      answer: 1,
      explain: 'A comparative deletion: easier than what? The listener supplies the comparison, usually their current struggle.',
    },
    {
      id: 'm04-d7',
      type: 'choice',
      prompt: 'Which version invites the listener’s own experience?',
      options: [
        '"You’ll save four hours a week on scheduling."',
        '"You’ll notice how much more room there is in your week."',
        '"It reduces scheduling time by 30 percent."',
        '"Scheduling takes 12 minutes on average."',
      ],
      answer: 1,
      explain: 'Unspecified verb (notice), comparative deletion (more room), nominalization-like "room". The others are facts. Facts have their place; this question asked for the invitation.',
    },
    {
      id: 'm04-d8',
      type: 'multi',
      prompt: 'Which of these are deletions (something left out)?',
      options: [
        '"I know you’re curious."',
        '"The car is red."',
        '"You’ll be pleased."',
        '"It arrives on Tuesday."',
      ],
      answers: [0, 2],
      explain: 'Curious about what? Pleased with what? The other two are complete.',
    },
    {
      id: 'm04-d9',
      type: 'choice',
      prompt: 'What does the Barnum effect (Forer, 1949) show?',
      options: [
        'Vague language puts people into trance',
        'People rate vague, general descriptions as accurate about themselves',
        'People remember vague statements better than precise ones',
        'Vague language is more persuasive than facts in every case',
      ],
      answer: 1,
      explain: 'That is all it shows, and it is enough: vague language feels personal. The trance claim has not been tested.',
    },
    {
      id: 'm04-d10',
      type: 'rewrite',
      prompt: 'Rewrite this feature list so the listener supplies the meaning. Keep it true.',
      given: 'This mattress has five zones of pocket springs and a cooling gel top layer.',
      models: [
        'Most people notice a different kind of rest within the first week.',
        'You might be surprised how much easier it is to really settle at night.',
      ],
      checklist: [
        'Uses at least one nominalization or unspecified verb',
        'Makes no claim they could check and find false',
        'Sounds like something you would actually say',
      ],
    },
    {
      id: 'm04-d11',
      type: 'rewrite',
      prompt: 'A friend is nervous about a job interview. Write one encouraging sentence using two nominalizations and one unspecified verb.',
      given: 'I’m dreading tomorrow.',
      models: [
        'You’ve got more experience than you give yourself credit for, and I think you’ll discover a kind of calm once you’re actually in the room.',
      ],
      checklist: [
        'Two nominalizations (e.g. experience, calm, confidence)',
        'One unspecified verb (e.g. discover, notice, find)',
        'Paces them first (acknowledges the dread or the situation)',
      ],
    },
    {
      id: 'm04-d12',
      type: 'rewrite',
      prompt: 'Turn this phone line into one that uses an unspecified referential index, truthfully.',
      given: 'You should switch to the annual plan.',
      models: [
        'A lot of people on the monthly plan move to annual once they see how much they’re using it.',
      ],
      checklist: [
        'Attributes the idea to unnamed others',
        'Only says what is actually true of your customers',
        'Drops the "should"',
      ],
    },
    {
      id: 'm04-d13',
      type: 'rewrite',
      prompt: 'Write a sentence that is vague about experience and exact about the fact, in the same breath.',
      given: 'The service is $49 a month.',
      models: [
        'It’s $49 a month, and what most people tell me they get for that is real peace of mind.',
      ],
      checklist: [
        'States the fact precisely',
        'Adds an experience the listener fills in',
        'The fact comes first or is unmissable',
      ],
    },
  ],
  assignments: [
    {
      id: 'm04-a1',
      kind: 'solo',
      title: 'Nominalization spotting',
      instructions: `Take any advert, sales page or political speech. Underline every nominalization and unspecified verb. Count them per paragraph.

Then rewrite one paragraph with *no* vague words at all, only facts. Read both aloud and notice which one you could argue with.`,
      reps: 3,
      required: true,
      log: [
        'What was the source?',
        'How many vague words did you find in the densest paragraph?',
        'Which version would you rather hear as a buyer, and why?',
      ],
    },
    {
      id: 'm04-a2',
      kind: 'solo',
      title: 'Ten sentences out loud',
      instructions: `Pick something you sell or something you want (a holiday, a new couch). Say ten sentences about it out loud, each using at least one nominalization and one unspecified verb. Record them on your phone.

Listen back. Mark the ones that sound natural and the ones that sound like a brochure. The goal is natural.`,
      reps: 3,
      required: true,
      log: [
        'Best sentence you said',
        'Which ones sounded like a brochure, and what made them sound that way?',
      ],
    },
    {
      id: 'm04-a3',
      kind: 'everyday',
      title: 'Leave a gap and listen',
      instructions: `In three ordinary conversations, use one deliberately vague question or statement and then go quiet:

> What's been the best part of it?

> I imagine there's been a fair bit of change lately.

Notice what they fill the gap with. That is what matters to them.`,
      reps: 5,
      required: true,
      log: [
        'What did you say?',
        'What did they fill the gap with?',
        'What did that tell you about what matters to them?',
        'Did the conversation feel warmer or cooler afterwards?',
      ],
    },
    {
      id: 'm04-a4',
      kind: 'chat',
      title: 'Role-play: the spec-sheet buyer',
      instructions: `Run scenario **The spec-sheet buyer** with Claude. Your job: answer their factual questions exactly, and between the facts, use vague language about the *experience* until they start talking about how they would use it.

Run it twice. The second time, aim to get them describing their own experience within five exchanges.`,
      reps: 2,
      required: true,
      scenario: 'm04-s1',
      log: [
        'How many exchanges until they described their own experience?',
        'Which vague line landed best?',
        'Where did you drift vague about a fact?',
        'Would they trust you tomorrow? Why?',
      ],
    },
    {
      id: 'm04-a5',
      kind: 'field',
      title: 'One vague benefit per conversation',
      instructions: `In five real sales or persuasion conversations, after you have stated the facts, add one sentence that is vague about the experience:

> And beyond the numbers, what most people tell me is it gives them a kind of breathing room.

Watch their face, or listen to their pause. Did they lean in, or glaze over?`,
      reps: 5,
      required: true,
      log: [
        'The situation',
        'Your vague line',
        'Their response (words, pause, face)',
        'Would they be glad tomorrow that they talked to you?',
      ],
    },
    {
      id: 'm04-a6',
      kind: 'chat',
      title: 'Role-play: the anxious friend',
      instructions: `Run scenario **The anxious friend**. No selling. Use nominalizations and unspecified verbs to help them find their own sense of capability, without telling them how to feel.`,
      reps: 1,
      required: false,
      scenario: 'm04-s2',
      log: [
        'What did they find for themselves?',
        'Where did you slip into advice instead?',
        'Would they feel helped tomorrow, or handled?',
      ],
    },
  ],
  scenarios: [
    {
      id: 'm04-s1',
      title: 'The spec-sheet buyer',
      setting: 'In a showroom. You sell mid-range e-bikes.',
      you: 'Answer every factual question exactly, and get them talking about how they would actually use the bike, in their own words.',
      them: 'An engineer in their forties who has read every review. Asks about battery capacity, motor torque, weight. Distrusts salespeople who "talk fluff". Secretly wants to ride to work again after a knee injury but has not said so.',
      objections: [
        'The spec sheet says 500 watt-hours. What does that actually mean in miles?',
        'I don’t need a pitch, I need the numbers.',
        'The other shop’s model is two kilos lighter.',
      ],
      focus: ['Nominalizations', 'Unspecified verbs', 'Comparative deletions', 'Exact facts'],
      win: 'They describe, in their own words, a ride they would take. You never stated a fact vaguely. They would come back to you.',
    },
    {
      id: 'm04-s2',
      title: 'The anxious friend',
      setting: 'Coffee with a friend. Everyday persuasion.',
      you: 'Help them walk into a hard conversation with their manager feeling more capable, without giving advice.',
      them: 'A friend who has to ask their manager for a raise on Monday. Rehearsed it badly twice already. Talks about worst cases. Responds well to being listened to, badly to being told what to do.',
      objections: [
        'Easy for you to say.',
        'What if they just laugh?',
      ],
      focus: ['Nominalizations', 'Unspecified verbs', 'Unspecified referential index'],
      win: 'They say something like "I can do this" in their own words. You gave no instructions.',
    },
    {
      id: 'm04-s3',
      title: 'The renewal call',
      setting: 'Phone call. You manage accounts for a software subscription.',
      you: 'Keep a customer who is thinking of not renewing, by getting them to articulate the value they have had.',
      them: 'An office manager whose team uses the software daily but who has been asked to cut costs. Not hostile, just tired. Will not volunteer what they like about it unless invited.',
      objections: [
        'Honestly, it’s a budget thing.',
        'We could probably manage with spreadsheets.',
      ],
      focus: ['Deletions', 'Unspecified verbs', 'Leaving a gap and listening'],
      win: 'They list, unprompted, two things the team would miss. You quoted the renewal price exactly.',
    },
  ],
}
