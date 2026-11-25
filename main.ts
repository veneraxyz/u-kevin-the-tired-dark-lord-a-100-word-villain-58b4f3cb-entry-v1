import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const MONOLOGUE = [
  "Come in. Mind the\u2014 yes, the step. Third one. I had it fixed twice and it still\u2014 never mind.",
  "",
  "You came for the sword, the crown, the whole little prophecy. Sit. No, not there. That chair remembers my father, and frankly, so do I.",
  "",
  "The bell will ring at dusk, the seventh bell, and the tide will bring my ships home from the Ashen Coast, salt and all. I have counted the days on these walls. Twelve years. Twelve.",
  "",
  "So swing, hero, and be done with it. Or\u2014 wait. Let me pour the wine first. The good vintage. Someone should enjoy it.",
].join("\n");

function wordCount(text: string): number {
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

function main(): void {
  const words = wordCount(MONOLOGUE);
  if (words < 90 || words > 110) {
    throw new Error(`monologue is ${words} words, expected about 100`);
  }
  if (MONOLOGUE.length > 600) {
    throw new Error(`monologue is ${MONOLOGUE.length} characters, gate caps at 600`);
  }
  const outputDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
  mkdirSync(outputDir, { recursive: true });
  const target = join(outputDir, "entry.txt");
  writeFileSync(target, MONOLOGUE + "\n", "utf8");
}

main();
