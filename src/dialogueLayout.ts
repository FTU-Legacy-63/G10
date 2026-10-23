/** Preserve every word while presenting one readable line, including large text on narrow screens. */
export function dialogueLines(text: string, width: number, measure: (text: string) => number): string[] {
  if (width <= 0) return [text];
  const lines: string[] = []; let line = '';
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (line && measure(next) > width) { lines.push(line); line = word; }
    else line = next;
  }
  if (line) lines.push(line);
  return lines;
}
