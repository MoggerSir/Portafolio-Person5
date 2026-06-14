export function highlightBioText(
  text: string,
  highlights: readonly string[],
): Array<{ text: string; highlighted: boolean }> {
  const pattern = new RegExp(`(${highlights.join('|')})`, 'gi');
  const parts = text.split(pattern);

  return parts
    .filter((part) => part.length > 0)
    .map((part) => ({
      text: part,
      highlighted: highlights.some(
        (highlight) => highlight.toLowerCase() === part.toLowerCase(),
      ),
    }));
}
