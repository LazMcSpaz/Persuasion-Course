export default {
  id: 'm00',
  title: 'How to Practice',
  tagline:
    'Set up the loop that turns reading into skill: drill, role-play, field, log, and a trust check on every rep.',
  part: 'Foundations',
  lessons: [
    {
      id: 'm00-l1',
      title: 'How the course works',
      body: `You can read this whole course in a weekend and still freeze on your next sales call. Reading shows you what a skill looks like. Saying the words out loud, to people, many times, is what makes them come out when you need them. So the course is built on reps.

## How a module is laid out

Every module has four tabs. Work through them left to right.

1. **Learn.** Short lessons. Read one, then say its example lines out loud.
2. **Drill.** Spot the pattern, pick the better line, fix a weak one. Graded drills mark themselves. For a rewrite, you write your own version, compare it with the examples and check off the checklist.
3. **Practice.** The assignments. Each says how many reps it needs and has a **Log a rep** button.
4. **Role-play.** Scenario cards to run with Claude.

## What one rep is

A rep is one go at an assignment, logged: one recording, one conversation, one role-play run. You do it, then press **Log a rep** and answer the questions. A go you do not log does not count, because the log is where you learn from it.

Assignments run from private to public: **solo** (alone, out loud or on paper), **role-play** with Claude, **everyday** (a barista, a friend, a landlord) and **field** (a real sale or call). Get the awkwardness out where it is cheap. Use one new thing per conversation; try five and you will remember none of them.

## Running a role-play

1. On the Role-play tab, copy a scenario card.
2. Paste it into a new Claude chat. Claude sets the scene and plays the other person.
3. Play it out. Say each line out loud before you type it. A sentence that reads well can still trip your tongue.
4. Type **debrief**. Claude steps out of character and scores the outcome and the trust, quotes where you used the techniques, and gives you a better line for your two weakest moments.
5. Back in the app, log the rep under Practice.

A role-play costs nothing, so fail freely and try one moment five ways. But Claude is not a customer: there is no face, and it can be more patient or more stubborn than a real person. The chat is where you find your words. The field is where you test them.

## Passing

A module is **passed**, and the next one opens, when:

- your graded drills stand at **80% or higher**
- every rewrite drill is checked off
- every **required** assignment that is not field work has all its reps logged

Field reps wait on real conversations turning up, so they never hold you back. They keep running while you move on, and the module shows **Mastered** once they are logged. Optional assignments are extra reps for when something has not settled. A pass stays passed: redo the drills as often as you like.

## The rest of the app

- **Log**: every rep you have logged, in one place. More on it in the next lesson.
- **Timer**: a talk timer for the run-on sentence in Module 6.
- **Review**: drills mixed from the modules you have passed. Ten minutes there now and then keeps old patterns sharp, and beats rereading.
- **Reference**: every pattern in the course on one page, for looking something up before a call.`,
      techniques: [
        {
          name: 'The practice loop',
          evidence: 'unproven',
          note: 'No controlled studies of this exact loop. Your log is the test: if the reps are not changing what happens in your conversations, change how you practice.',
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

The second question is the trust ledger. A yes that someone regrets the next morning is a refund, a canceled order or a friend who avoids you. Every log in every module asks some version of it, and you answer it honestly, even when the first answer is a happy one.

The same rule runs through the whole course: be vague about **experience** if you like, but always be exact about **facts**. Price, terms, dates and what the thing does are never fuzzy.

## The field log

Every rep you log under Practice lands on the **Log** page, newest first, and can be filtered by kind. Write each entry within the hour, while you still remember the words. Memory tidies conversations up: within a day you recall what you meant to say, not what you said.

A good entry has:

- **The situation** in one line. "Phone call, second meeting, office manager, renewal."
- **What you said, word for word**, at the moment that mattered.
- **What they did next**: their words, a pause, a laugh, a change in their voice.
- **What you would change.**
- **The trust answer**, and why.

A useless entry says "went well, good rapport". You cannot learn from that next month. A useful one says:

> I said "so reliability matters most", she said "exactly, that's it" and started telling me about the last supplier.

Every week or two, press **Copy as text for a review with Claude** on the Log page, paste it into a Claude chat and read what comes back. It asks what you are doing well, what keeps going wrong and what to practice next. One conversation is a story; twenty are a pattern you can fix.

## Recording yourself

You cannot hear yourself while you talk. A recording can. Most people find, on first listen, that they talk faster than they thought, fill pauses with "um" and "so", and answer questions nobody asked.

Record **yourself**: practicing lines, explaining what you sell, your side of a role-play read aloud. Recording another person needs their permission, and in many places the law requires everyone on a call to agree. When in doubt, record only your own voice, or log the conversation from memory instead.

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
      prompt: 'You have just finished playing a scenario with Claude. What do you do next?',
      options: [
        'Close the chat; the practice is done',
        'Type "debrief" for the scores and better lines, then log the rep under Practice',
        'Start the scenario again right away without looking back',
        'Ask Claude to write a script you can read out on your next call',
      ],
      answer: 1,
      explain: 'The debrief is where Claude steps out of the role and tells you what landed and what felt pushed. Logging it is what makes the run count as a rep, and gives you something to compare next time.',
    },
    {
      id: 'm00-d10',
      type: 'choice',
      prompt: 'Which of these counts as one rep?',
      options: [
        'Reading the lesson twice',
        'Thinking through what you would say on tomorrow’s call',
        'One real conversation where you tried the technique, logged within the hour',
        'A week of trying the technique, logged once at the end',
      ],
      answer: 2,
      explain: 'A rep is one go, done and logged. Reading and planning are not reps, and a week squashed into one entry loses the exact words you need to learn from.',
    },
    {
      id: 'm00-d2',
      type: 'choice',
      prompt: 'In Module 1 your drills are at 87%, the rewrites are checked off and every required non-field assignment is logged. The field assignment has 1 of 5 reps. What happens?',
      options: [
        'Module 2 stays locked until all five field reps are logged',
        'Module 1 is passed and Module 2 opens; the field reps keep running toward Mastered',
        'You lose the pass if a later drill retry drops you below 80%',
        'You must redo the drills to 100% first',
      ],
      answer: 1,
      explain: 'Field work waits on real conversations, so it never blocks you. The module is passed now and shows Mastered once the field reps are in. A pass stays passed, whatever later retries score.',
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
      given: 'Called the gym to cancel. Didn’t really go as planned. She was quite pushy.',
      models: [
        'Phone, gym, canceling my membership. I said "I’d like to cancel, please" and she asked "can I ask what’s made you want to leave?" I started explaining my budget and ended up agreeing to a three-month pause I did not want. Next time: "I’ve decided, I just need the cancellation confirmed by email." Trust: yes, I was polite and clear, and she had no reason to feel misled.',
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
        'Where did you save it, and what is the file called?',
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

1. Open the scenario card on the Role-play tab and press copy.
2. Paste it into a new Claude chat and send it. Claude sets the scene and starts in character.
3. Play the call. Say each line out loud, then type it.
4. When the call ends, type **debrief**. Read the scores, and ask one more question: where did it feel listened to, and where did it feel pushed?
5. Come back here and press **Log a rep**.

Run it twice, in two fresh chats, and change one thing the second time.`,
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
      title: 'Role-play: asking a favor',
      instructions: `Run scenario **The shift swap**. It is an everyday ask with no selling, so you can practice the loop without worrying about technique. Say your lines out loud before you type them.`,
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
      instructions: `Pick three ordinary conversations this week where you wanted something, however small: asking a colleague for a file, booking a table, getting a friend to pick a movie. Use no technique.

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
      setting: 'Phone call. You are following up with someone who filled out a form on your website asking for more information.',
      you: 'Have a natural first conversation, find out what made them get in touch, and agree on a sensible next step if there is one.',
      them: 'A friendly small-business owner who filled out the form late one evening and half forgot about it. Busy but happy to talk for a few minutes. Wants to know if this is worth their time. Fears being trapped in a long sales process.',
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
      them: 'A colleague who is generous but has been asked for favors a lot lately and is starting to feel taken for granted. Has no plans that Saturday but values their weekends. Fears becoming the person everyone asks.',
      objections: [
        'You’re the third person to ask me this month.',
        'What do I get out of it?',
      ],
      focus: ['Making the ask plainly', 'Listening more than you talk', 'Leaving them free to say no'],
      win: 'They agree, or say no without feeling bad about it. Either way the friendship is intact and you would ask them again.',
    },
  ],
}
