/** ₹ Crore formatting used across finance/budget displays. */
export function cr(n: number): string {
  return `₹${n}Cr`;
}

export function pct(n: number): string {
  return `${Math.round(n)}%`;
}

/** Utilisation as a rounded percent, guarding divide-by-zero. */
export function utilisation(spent: number, planned: number): number {
  return planned > 0 ? Math.round((spent / planned) * 100) : 0;
}

/** Short timestamp used for artifact save labels. */
export function nowStamp(): string {
  return new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
