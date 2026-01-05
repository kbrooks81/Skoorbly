type EntryValue = { valueNum?: number; valueInt?: number };

type StoreKey = string;

const store = new Map<StoreKey, EntryValue>();
const listeners = new Set<() => void>();

function key(date: string, slug: string): StoreKey {
    return `${date}|${slug}`;
}

export function getEntry(date: string, slug: string): EntryValue | null {
    return store.get(key(date, slug)) ?? null;
}

export function upsertEntry(date: string, slug: string, value: EntryValue) {
    store.set(key(date, slug), value);
    listeners.forEach((fn) => fn());
}

export function subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
}