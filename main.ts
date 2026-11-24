import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The Funniest Out-of-Office — one line, written fresh for this entry.
// An auto-reply that takes its job too seriously: it escalates the
// sender's email to itself, the only colleague it can reach.
const ENTRY =
  "I'm away until Monday. My auto-reply is covering my inbox, and it has already escalated your email to itself.";

function validateEntry(line: string): void {
  // The sealed gate: /output/entry.txt must be UTF-8 text of 1 to 140
  // characters, not only white space, and a single line. Fail loudly
  // here rather than shipping an entry the gate would reject.
  const chars = [...line];
  if (chars.length < 1 || chars.length > 140) {
    throw new Error(`entry is ${chars.length} characters, gate needs 1-140`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function outputPath(): string {
  // The harness sandbox mounts /output; locally, ENTRY_OUTPUT_DIR lets
  // the run write into the repo's own output/ directory instead.
  const dir = process.env.ENTRY_OUTPUT_DIR ?? "/output";
  return join(dir, "entry.txt");
}

function main(): void {
  validateEntry(ENTRY);
  const path = outputPath();
  mkdirSync(dirname(path), { recursive: true });
  // No trailing newline: the gate counts the file's characters, so the
  // file holds exactly the one line, byte for byte.
  writeFileSync(path, ENTRY, "utf8");
}

main();
