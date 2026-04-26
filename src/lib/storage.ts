import { BeanAnalysis } from "./types";

const KEY = "beandna_history";

export function getHistory(): BeanAnalysis[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveAnalysis(a: BeanAnalysis) {
  const list = getHistory();
  list.unshift(a);
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, 50)));
}

export function getAnalysis(id: string): BeanAnalysis | undefined {
  return getHistory().find((a) => a.id === id);
}