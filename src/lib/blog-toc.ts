export interface TocItem {
  id: string;
  level: 2 | 3;
  text: string;
}

interface BodyBlock {
  _key?: string;
  _type: string;
  children?: { text?: string }[];
  style?: string;
}

const HEADING_LEVELS: Record<string, 2 | 3> = { h1: 2, h2: 2, h3: 3 };

export function headingId(key: string) {
  return `h-${key}`;
}

export function extractToc(body?: BodyBlock[]): TocItem[] {
  if (!body) {
    return [];
  }
  const items: TocItem[] = [];
  for (const block of body) {
    const level = block.style ? HEADING_LEVELS[block.style] : undefined;
    if (block._type !== "block" || !level || !block._key) {
      continue;
    }
    const text = (block.children ?? [])
      .map((child) => child.text ?? "")
      .join("")
      .trim();
    if (text) {
      items.push({ id: headingId(block._key), level, text });
    }
  }
  return items;
}
