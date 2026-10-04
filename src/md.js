/**
 * The mini-markdown the lessons are written in (content/SCHEMA.md), and
 * nothing more: paragraphs, ## and ### headings, **bold**, *italic*, lists,
 * > quoted lines, and [[embedded commands]]. Everything is escaped first,
 * so a lesson can never inject markup.
 */
const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function inline(s) {
  return esc(s)
    .replace(/\[\[(.+?)\]\]/g, '<span class="cmd">$1</span>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
}

export function render(md) {
  const out = []
  const blocks = md.trim().split(/\n\s*\n/)
  for (const block of blocks) {
    const lines = block.split('\n')
    const first = lines[0]
    if (/^###\s/.test(first)) out.push(`<h4>${inline(first.slice(4))}</h4>`)
    else if (/^##\s/.test(first)) out.push(`<h3>${inline(first.slice(3))}</h3>`)
    else if (lines.every((l) => /^>\s?/.test(l)))
      out.push(
        `<blockquote>${lines.map((l) => inline(l.replace(/^>\s?/, ''))).join('<br>')}</blockquote>`
      )
    else if (lines.every((l) => /^- /.test(l)))
      out.push(`<ul>${lines.map((l) => `<li>${inline(l.slice(2))}</li>`).join('')}</ul>`)
    else if (lines.every((l) => /^\d+\.\s/.test(l)))
      out.push(`<ol>${lines.map((l) => `<li>${inline(l.replace(/^\d+\.\s/, ''))}</li>`).join('')}</ol>`)
    else out.push(`<p>${lines.map(inline).join(' ')}</p>`)
  }
  return out.join('\n')
}

export { esc }
