interface Sortable {
  data: { weight: number; date: Date };
}

// Hugo's default page order: weight ascending, then date descending.
export function byWeightThenDate(a: Sortable, b: Sortable): number {
  return a.data.weight - b.data.weight || b.data.date.getTime() - a.data.date.getTime();
}
