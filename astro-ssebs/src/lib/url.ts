interface Entry {
  id: string;
  data: { slug?: string };
}

// Hugo lowercases slugs when building URLs (e.g. slug "MVCTipCalc" -> /projects/mvctipcalc/).
export function entrySlug(e: Entry): string {
  return (e.data.slug ?? e.id).toLowerCase();
}
