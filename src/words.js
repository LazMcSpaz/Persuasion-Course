/** Cards for the talk timer: material to keep a run-on sentence going. */
export const nominalizations = [
  'comfort', 'curiosity', 'confidence', 'relief', 'security', 'freedom', 'progress', 'understanding',
  'peace of mind', 'clarity', 'momentum', 'trust', 'calm', 'satisfaction', 'possibility', 'change',
  'learning', 'experience', 'ease', 'focus', 'balance', 'certainty', 'enjoyment', 'growth',
  'appreciation', 'decision', 'relaxation', 'awareness', 'connection', 'success',
]

export const verbs = [
  'notice', 'discover', 'realise', 'wonder', 'learn', 'feel', 'enjoy', 'find', 'imagine',
  'understand', 'begin', 'allow', 'appreciate', 'consider', 'explore', 'recognise', 'experience',
  'settle', 'remember', 'sense',
]

export const linkages = [
  'and as', 'while', 'because', 'although', 'and when', 'and if', 'and yet', 'which means',
  'so that', 'as soon as', 'and the more', 'even as', 'before', 'during', 'and maybe',
]

export const topics = [
  'a holiday you would like to take',
  'the first week of using something you sell',
  'what it feels like to finish a hard project',
  'a walk by the sea',
  'settling into a new home',
  'the moment a difficult decision becomes easy',
  'learning to ride a bike',
  'a customer who has just solved their problem',
  'a quiet Sunday morning',
  'getting better at something slowly, then suddenly',
  'the drive home after a good day',
  'a friend walking into an interview calm',
]

export const pick = (xs) => xs[Math.floor(Math.random() * xs.length)]
