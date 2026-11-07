/**
 * Rules-based NLP parser for natural-language task quick-add.
 * Parses inputs like:
 *   "Pay rent tomorrow 9am high #finance"
 *   "Buy groceries today low #personal"
 *   "Team meeting next week medium"
 */

export interface ParsedTask {
  title: string;
  dueDate?: string;
  dueTime?: string;
  priority: "high" | "medium" | "low";
  tags: string[];
  category: string;
}

const todayStr = () => new Date().toISOString().split("T")[0];
const offsetDay = (n: number) =>
  new Date(Date.now() + n * 86400000).toISOString().split("T")[0];

function nextWeekday(target: number): string {
  const now = new Date();
  const diff = (target - now.getDay() + 7) % 7 || 7;
  return offsetDay(diff);
}

interface DatePattern {
  re: RegExp;
  resolve: (match: RegExpMatchArray) => string;
}

const DATE_PATTERNS: DatePattern[] = [
  { re: /\btoday\b/i, resolve: todayStr },
  { re: /\btomorrow\b/i, resolve: () => offsetDay(1) },
  { re: /\bnext\s+week\b/i, resolve: () => offsetDay(7) },
  { re: /\bnext\s+month\b/i, resolve: () => offsetDay(30) },
  { re: /\bmonday\b/i, resolve: () => nextWeekday(1) },
  { re: /\btuesday\b/i, resolve: () => nextWeekday(2) },
  { re: /\bwednesday\b/i, resolve: () => nextWeekday(3) },
  { re: /\bthursday\b/i, resolve: () => nextWeekday(4) },
  { re: /\bfriday\b/i, resolve: () => nextWeekday(5) },
  { re: /\bsaturday\b/i, resolve: () => nextWeekday(6) },
  { re: /\bsunday\b/i, resolve: () => nextWeekday(0) },
  {
    re: /\b(\d{1,2})\/(\d{1,2})\b/,
    resolve: (m) => {
      const y = new Date().getFullYear();
      return `${y}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}`;
    },
  },
];

const TIME_RE = /\b(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\b/i;

const PRIORITY_PATTERNS: [RegExp, "high" | "medium" | "low"][] = [
  [/\bhigh\b|\burgent\b|\bcritical\b/i, "high"],
  [/\blow\b|\bminor\b/i, "low"],
  [/\bmedium\b|\bnormal\b|\bmid\b/i, "medium"],
];

const CATEGORY_MAP: Record<string, string> = {
  work: "Work",
  job: "Work",
  office: "Work",
  personal: "Personal",
  home: "Personal",
  health: "Health",
  gym: "Health",
  fitness: "Health",
  finance: "Finance",
  money: "Finance",
  bill: "Finance",
  learn: "Learning",
  study: "Learning",
  book: "Learning",
  shop: "Shopping",
  buy: "Shopping",
  groceries: "Shopping",
};

export function parseTask(input: string): ParsedTask {
  let remaining = input.trim();

  // Extract #tags
  const tagMatches = [...remaining.matchAll(/#(\w+)/g)];
  const tags = tagMatches.map((m) => m[1].toLowerCase());
  remaining = remaining.replace(/#\w+/g, "").trim();

  // Determine category from tags or title keywords
  let category = "Personal";
  for (const tag of tags) {
    if (CATEGORY_MAP[tag]) {
      category = CATEGORY_MAP[tag];
      break;
    }
  }
  if (category === "Personal") {
    const lower = remaining.toLowerCase();
    for (const [kw, cat] of Object.entries(CATEGORY_MAP)) {
      if (lower.includes(kw)) {
        category = cat;
        break;
      }
    }
  }

  // Extract priority
  let priority: "high" | "medium" | "low" = "medium";
  for (const [re, p] of PRIORITY_PATTERNS) {
    if (re.test(remaining)) {
      priority = p;
      remaining = remaining.replace(re, "").trim();
      break;
    }
  }

  // Extract time
  let dueTime: string | undefined;
  const timeMatch = remaining.match(TIME_RE);
  if (timeMatch) {
    let h = parseInt(timeMatch[1]);
    const m = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
    const meridiem = timeMatch[3]?.toLowerCase();
    if (meridiem === "pm" && h < 12) h += 12;
    if (meridiem === "am" && h === 12) h = 0;
    dueTime = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    remaining = remaining.replace(TIME_RE, "").trim();
  }

  // Extract date
  let dueDate: string | undefined;
  for (const { re, resolve } of DATE_PATTERNS) {
    const match = remaining.match(re);
    if (match) {
      dueDate = resolve(match);
      remaining = remaining.replace(re, "").trim();
      break;
    }
  }

  // Cleanup leftover whitespace
  const title = remaining.replace(/\s+/g, " ").trim() || "New Task";

  return { title, dueDate, dueTime, priority, tags, category };
}
