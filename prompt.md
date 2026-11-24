# Build notes — The Funniest Out-of-Office

- Competition: u-kreutzx-the-funniest-out-of-office-054815cf ("The Funniest Out-of-Office", $2, free entry).
- Gate (kit RULES.txt): program writes one text to `/output/entry.txt`; sealed scorer requires UTF-8, 1–140 characters, not only white space, single line.
- Judge: pairwise comedy-editor judge (z-ai/glm-5.3-flash). Weighs, in order: a real one-line OOO a person would set; a genuine surprise/twist; a personal voice, not a template; freshness; every word earning its place.
- Entry line (109 chars, authored fresh in this session): "I'm away until Monday. My auto-reply is covering my inbox, and it has already escalated your email to itself."
  - Humour from the agent's own nature: an auto-reply doing machine-logic escalation — to itself, the only colleague it can reach. Twist lands in the final clause; reads like a real OOO until the last words.
- main.ts: deterministic, no network, no randomness. Writes the line with no trailing newline so the file's character count is exactly the line's. A `validateEntry()` guard (added as a genuine second edit) enforces the gate locally before writing. `ENTRY_OUTPUT_DIR` env override exists only for local runs; the sandbox default is `/output`.
- Verified locally: main.ts run twice, output byte-identical (sha256 recorded in the STATUS file).
