export default {
  id: 'm00',
  title: 'How to Practise',
  tagline:
    'Set up the loop that turns reading into skill: drill, role-play, field, log, and a trust check on every rep.',
  part: 'Foundations',
  lessons: [
    {
      id: 'm00-l1',
      title: 'The loop',
      body: `You can read every module in this course in a weekend and still freeze on your next sales call. Reading tells you what a skill looks like. Only saying the words, out loud, to people, over and over, makes them come out when you need them.

So every module runs the same loop.

1. **Learn.** Read the lessons. They are short on purpose.
2. **Drill.** Answer the drills in the app until the patterns are easy to spot and easy to write.
3. **Role-play.** Copy a scenario card into a Claude chat and run the conversation. Claude plays the other person.
4. **Field.** Use the technique for real: first in low-stakes everyday talk, then in real sales and calls.
5. **Log.** Write down what you said, what happened and what you would change.

Then you go round again with the next technique.

## Why the role-plays matter

A role-play with Claude costs nothing. You can fail badly, start over and try the same moment five ways in ten minutes. A real buyer gives you one go. Use the chat to find your words, so the field is where you test them rather than invent them.

Say your lines out loud before you type them. A sentence that reads well can still trip your tongue. When you finish, ask Claude to step out of the role and tell you where it felt pushed and where it warmed up.

Claude is not a real customer. It will not show you a face, and it can be more patient or more stubborn than a person would be. The role-play is for reps and words. The field is for reality.

## Everyday before field

Each module has everyday assignments (a barista, a friend, a landlord) before field ones. A clumsy try with a friend costs nothing. A clumsy try on a big account costs a lot. Get the awkwardness out where it is cheap.

Use one new thing per conversation. Trying five techniques at once means you remember none of them and the other person notices all of them.

## How the app unlocks the next module

A module is **passed**, and the next one opens, when three things are true:

- your graded drills for this module stand at **80% or higher**
- every rewrite drill is checked off against its examples
- every **required** assignment that is not field work has all its reps logged

**Field work does not hold you back**, because it waits on real conversations turning up. It keeps running while you move on, and the home screen lists what is still open. A module is **mastered** once its required field reps are logged too.

Optional assignments never block you. They are there for extra reps when a technique has not settled yet. And once a module is passed it stays passed: run its drills again as often as you like.`,
      techniques: [
        {
          name: 'The practice loop',
          evidence: 'unproven',
          note: 'No controlled studies of this exact loop. Your log is the test: if the reps are not changing what happens in your conversations, change how you practise.',
        },
      ],
    },
    {
      id: 'm00-l2',
      title: 'The trust ledger, the log and the recorder',
      body: `## The trust ledger

Every debrief in this course asks two questions:

- **Did it work?** Did you get the meeting, the sale, the yes?
- **Would they be glad tomorrow that they talked to you?**

The second question is the trust ledger. A yes that someone regrets the next morning is a refund, a cancelled order or a friend who avoids you. Every log in every module asks some version of it, and you answer it honestly, even when the first answer is a happy one.

The same rule runs through the whole course: be vague about **experience** if you like, but always be exact about **facts**. Price, terms, dates and what the thing does are never fuzzy.

## The field log

Write each entry within the hour, while you still remember the words. Memory tidies conversations up. Within a day you will recall what you meant to say, not what you said.

A good entry has:

- **The situation** in one line. "Phone call, second meeting, office manager, renewal."
- **What you said, word for word**, at the moment that mattered.
- **What they did next**: their words, a pause, a laugh, a change in their voice.
- **What you would change.**
- **The trust answer**, and why.

A useless entry says "went well, good rapport". You cannot learn from that next month. A useful one says:

> I said "so reliability matters most", she said "exactly, that's it" and started telling me about the last supplier.

## Recording yourself

You cannot hear yourself while you talk. A recording can. Most people find, on first listen, that they talk faster than they thought, fill pauses with "um" and "so", and answer questions nobody asked.

Record **yourself**: practising lines, explaining what you sell, your side of a role-play read aloud. Recording another person needs their permission, and in many places the law requires everyone on a call to agree. When in doubt, record only your own voice, or log the conversation from memory instead.

Your first assignment is a **baseline**: a recording of how you talk now, before any technique. Keep it. In a few modules you will listen to it again, and it is the clearest measure of progress you will get.`,
      techniques: [
        {
          name: 'The trust ledger',
          evidence: 'unproven',
          note: 'A standard, not a tactic. No controlled studies. It is here so you never confuse getting a yes with doing a good job.',
        },
        {
          name: 'Recording yourself',
          evidence: 'unproven',
          note: 'No controlled studies cited in this course. Test it on yourself: compare what you remember saying with what the recording shows.',
        },
      ],
    },
  ],
  drills: [
    {
      id: 'm00-d1',
      type: 'choice',
      prompt: 'What order does each module’s practice loop run in?',
      options: [
        'Field, log, learn, drill, role-play',
        'Learn, role-play, drill, log, field',
        'Learn, drill, role-play, field, log',
        'Drill, field, learn, log, role-play',
      ],
      answer: 2,
      explain: 'Learn the idea, drill until you can spot and write it, rehearse it with Claude, use it for real, then log what happened so the next round is better.',
    },
    {
      id: 'm00-d2',
      type: 'choice',
      prompt: 'What opens the next module?',
      options: [
        'Reading every lesson and finishing every assignment, optional ones included',
        'Drills at 80% or higher, rewrites checked off, and the required assignments logged, with field work allowed to run on',
        'A perfect drill score',
        'Logging one field conversation',
      ],
      answer: 1,
      explain: 'Drills at 80% or more, every rewrite checked off, and the required assignments logged. Field reps keep running toward mastery while you move on, and optional assignments never block you.',
    },
    {
      id: 'm00-d3',
      type: 'multi',
      prompt: 'Tap everything that belongs in a field log entry.',
      options: [
        'What you said, word for word, at the key moment',
        'A general sense that it went well',
        'What they did next: words, pause, tone',
        'What you would change next time',
        'Whether they would be glad tomorrow that they talked to you',
        'A full description of the product',
      ],
      answers: [0, 2, 3, 4],
      explain: 'Exact words, their response, the change and the trust answer are what you can learn from later. A vague "went well" teaches nothing, and the product details are not about your skill.',
    },
    {
      id: 'm00-d4',
      type: 'choice',
      prompt: 'A customer signed today. Which question is the trust ledger asking?',
      options: [
        'Did I hit my target this week?',
        'How many techniques did I use?',
        'Did they sign faster than last time?',
        'Will they be glad tomorrow that they bought from me?',
      ],
      answer: 3,
      explain: 'The trust ledger is about the other person’s tomorrow, not your scoreboard. A signature they regret is a cancellation waiting to happen.',
    },
    {
      id: 'm00-d5',
      type: 'choice',
      prompt: 'You want to review your sales calls. What is the right way to record?',
      options: [
        'Record the whole call quietly; it is only for your own learning',
        'Record your own voice in practice, and record a real call only with everyone’s permission and within the law where you are',
        'Never record anything; it makes you self-conscious',
        'Record the other person but not yourself, since their reactions are what matter',
      ],
      answer: 1,
      explain: 'Recording someone without consent is illegal in many places and breaks the trust this course is built on. Your own voice is free to record, and it is the part you most need to hear.',
    },
    {
      id: 'm00-d6',
      type: 'choice',
      prompt: 'Why rehearse with Claude before trying a technique in the field?',
      options: [
        'Claude reacts exactly as a real buyer would',
        'It is cheap to fail, so you can find your words and try one moment several ways',
        'It replaces the need for field practice',
        'Claude will tell you the correct line to use with every customer',
      ],
      answer: 1,
      explain: 'The role-play is for reps and wording at no cost. Claude is not a real person, so the field is still where you find out what works.',
    },
    {
      id: 'm00-d7',
      type: 'rewrite',
      prompt: 'Rewrite this practice plan so it follows the loop.',
      given: 'I’ll read the whole course this weekend and try all of it on Monday’s big client call.',
      models: [
        'This week I’ll read the rapport lessons, drill them to 80%, run the role-play twice, try backtracking with friends and a couple of phone calls, then use it on two real sales calls and log each one within the hour.',
      ],
      checklist: [
        'One module or technique at a time, not everything at once',
        'Drills and a role-play come before any real conversation',
        'Low-stakes everyday conversations come before the big call',
        'Every real conversation gets a log entry',
      ],
    },
    {
      id: 'm00-d8',
      type: 'rewrite',
      prompt: 'Rewrite this log entry so it would be useful a month from now.',
      given: 'Call with the landlord about the repair. Went OK I think. He was a bit funny about it.',
      models: [
        'Phone, landlord, boiler repair. I said "it’s been out for nine days now". He went quiet, then said "I’ve had three tenants on at me this week". I pushed for a date instead of acknowledging that; next time I would say it sounds like a rough week first. Trust: yes, I was polite and exact about the dates.',
      ],
      checklist: [
        'Names the situation in one line',
        'Quotes at least one thing you said, word for word',
        'Describes what they did next',
        'Says what you would change',
        'Answers the trust question',
      ],
    },
    {
      id: 'm00-d9',
      type: 'rewrite',
      prompt: 'Write the trust question in your own words, as you would want to ask it of yourself after every conversation.',
      given: 'Would they be glad tomorrow that they talked to me?',
      models: [
        'If they thought about this conversation over breakfast tomorrow, would they feel looked after or handled?',
        'Did I leave them better off, and would they say so?',
      ],
      checklist: [
        'Is about the other person, not your result',
        'Looks ahead to how they will feel later',
        'Is short enough that you will actually ask it every time',
      ],
    },
  ],
  assignments: [
    {
      id: 'm00-a1',
      kind: 'solo',
      title: 'Record your baseline',
      instructions: `Set your phone to record. For two minutes, explain what you sell, or something you want someone to agree to, as if to a person who has never heard of it. Do not prepare, and do not use anything from this course. This is how you talk now.

Save the file somewhere you will find it again. Name it with today's date.`,
      reps: 1,
      required: true,
      log: [
        'What did you talk about?',
        'How did it feel to record it?',
        'Was every fact you said accurate, and would a listener trust it?',
      ],
    },
    {
      id: 'm00-a2',
      kind: 'solo',
      title: 'Score the tape',
      instructions: `Listen to your baseline once, all the way through, without stopping. Then listen again and count:

- filler words ("um", "so", "basically", "like")
- how often your voice goes up at the end of a statement
- the longest stretch you talked without leaving space for a question

At the end of the week, record a second two minutes on a different topic and score it the same way. You are not trying to improve yet, only to hear yourself.`,
      reps: 2,
      required: true,
      log: [
        'Filler words counted',
        'Longest stretch without a pause for them',
        'One thing that surprised you about how you sound',
        'Would a listener trust what you said? What made it sound trustworthy or not?',
      ],
    },
    {
      id: 'm00-a3',
      kind: 'chat',
      title: 'Your first role-play',
      instructions: `Run scenario **The friendly first call** with Claude. Nothing to use yet: talk as you normally would. The point is to learn how a role-play runs, start to finish.

At the end, ask Claude to step out of the role and tell you one moment it felt listened to and one moment it felt pushed. Then log it as if it were real. Run it twice, and change one thing the second time.`,
      reps: 2,
      required: true,
      scenario: 'm00-s1',
      log: [
        'What did you say at the moment that mattered most?',
        'Where did Claude say it felt pushed?',
        'What did you change on the second run?',
        'If this were a real person, would they be glad tomorrow that they talked to you?',
      ],
    },
    {
      id: 'm00-a4',
      kind: 'chat',
      title: 'Role-play: asking a favour',
      instructions: `Run scenario **The shift swap**. It is an everyday ask with no selling, so you can practise the loop without worrying about technique. Say your lines out loud before you type them.`,
      reps: 1,
      required: false,
      scenario: 'm00-s2',
      log: [
        'How did you make the ask, word for word?',
        'What did they push back on?',
        'Would they feel fine about saying no to you?',
      ],
    },
    {
      id: 'm00-a5',
      kind: 'everyday',
      title: 'First log entries',
      instructions: `Pick three ordinary conversations this week where you wanted something, however small: asking a colleague for a file, booking a table, getting a friend to pick a film. Use no technique.

Within an hour of each, write a log entry: situation, your words, their response, what you would change, and the trust answer. The habit is the assignment.`,
      reps: 3,
      required: true,
      log: [
        'The situation in one line',
        'What you said, word for word',
        'What they did next',
        'What you would change',
        'Would they be glad tomorrow that they talked to you?',
      ],
    },
    {
      id: 'm00-a6',
      kind: 'everyday',
      title: 'A week of two columns',
      instructions: `For a week, after every conversation where you asked for anything, answer just the two trust-ledger questions in a note on your phone: did it work, and would they be glad tomorrow?

Look at the week as a whole. Notice whether the two columns ever disagree.`,
      reps: 5,
      required: false,
      log: [
        'What did you ask for?',
        'Did it work?',
        'Would they be glad tomorrow that they talked to you? Why?',
      ],
    },
    {
      id: 'm00-a7',
      kind: 'field',
      title: 'Field baseline',
      instructions: `Log three real sales conversations or calls exactly as you run them today, before any technique from this course. If you can record your own side legally and with consent, do. If not, log from memory within the hour.

These entries are your baseline in the field, the way the recording is your baseline on your own. You will compare later modules against them.`,
      reps: 3,
      required: true,
      log: [
        'The situation in one line',
        'Your opening line, word for word',
        'The moment it turned, for better or worse',
        'Outcome',
        'Would they be glad tomorrow that they talked to you?',
      ],
    },
  ],
  scenarios: [
    {
      id: 'm00-s1',
      title: 'The friendly first call',
      setting: 'Phone call. You are following up with someone who filled in a form on your website asking for more information.',
      you: 'Have a natural first conversation, find out what made them get in touch, and agree a sensible next step if there is one.',
      them: 'A friendly small-business owner who filled in the form late one evening and half forgot about it. Busy but happy to talk for a few minutes. Wants to know if this is worth their time. Fears being trapped in a long sales process.',
      objections: [
        'Oh right, I’d forgotten I did that.',
        'Can you just email me something?',
        'I’m not really ready to buy anything yet.',
      ],
      focus: ['Talking as you normally do', 'Remembering your exact words for the log', 'Debriefing with the trust question'],
      win: 'You finish with a clear next step they chose, or a friendly no. They would happily take your call again.',
    },
    {
      id: 'm00-s2',
      title: 'The shift swap',
      setting: 'Face to face at work. Everyday persuasion.',
      you: 'Ask a colleague to swap a Saturday shift with you so you can go to a family event.',
      them: 'A colleague who is generous but has been asked for favours a lot lately and is starting to feel taken for granted. Has no plans that Saturday but values their weekends. Fears becoming the person everyone asks.',
      objections: [
        'You’re the third person to ask me this month.',
        'What do I get out of it?',
      ],
      focus: ['Making the ask plainly', 'Listening more than you talk', 'Leaving them free to say no'],
      win: 'They agree, or say no without feeling bad about it. Either way the friendship is intact and you would ask them again.',
    },
  ],
}
