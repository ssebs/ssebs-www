// Hugo title-cases taxonomy terms per hyphen/space-separated word
// (e.g. "3d-printing" -> "3d-Printing", "godot" -> "Godot").
export function tagTitle(tag: string): string {
  return tag.replace(/(^|[-\s])(\S)/g, (_, sep, ch) => sep + ch.toUpperCase());
}
