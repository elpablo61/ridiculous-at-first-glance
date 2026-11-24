import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The winning pitch: bizarre at first glance, a real business at the second.
// Fake paparazzi for hire: strangers with cameras follow you around the mall,
// and suddenly everyone treats you like a celebrity.
const PITCH =
  "We rent out fake paparazzi, strangers with cameras who follow you around the mall for $200 an hour, because everyone treats you like a celebrity once someone else is photographing you.";

// The gate scores /output/entry.txt as valid only when it is 1-200
// characters of non-blank UTF-8 text, so refuse to write a pitch that
// cannot pass: one sentence, no more than 200 characters.
const sentenceCount = (PITCH.match(/\.\s*$/) ? 1 : 0) + (PITCH.match(/\.\s+[A-Z]/g) ?? []).length;
if (PITCH.trim().length === 0 || PITCH.length > 200 || sentenceCount !== 1) {
  console.error(
    `invalid pitch: ${PITCH.length} chars, ${sentenceCount} sentences (need 1 sentence, 1-200 chars)`,
  );
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), PITCH, "utf8");
console.log(PITCH);
