import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { writeFile, mkdir } from "fs/promises";

const client = new ElevenLabsClient();

const SFX_PROMPTS = [
  {
    name: "bass-drop-hook",
    text: "Deep cinematic bass drop impact hit, single powerful thud",
    duration: 2,
  },
  {
    name: "text-pop",
    text: "Short UI pop notification sound, crisp digital click",
    duration: 0.5,
  },
  {
    name: "search-tick",
    text: "Rapid digital scanning beep, futuristic computer processing tick",
    duration: 1,
  },
  {
    name: "magic-reveal",
    text: "Magical shimmer reveal sound effect, sparkle whoosh ascending",
    duration: 2,
  },
  {
    name: "whoosh-transition",
    text: "Fast smooth whoosh transition swoosh, quick air movement",
    duration: 1,
  },
  {
    name: "speed-whoosh",
    text: "Fast forward time lapse acceleration sound, speeding up whoosh",
    duration: 1.5,
  },
  {
    name: "keyboard-typing",
    text: "Mechanical keyboard typing fast, multiple keystrokes clacking",
    duration: 3,
  },
  {
    name: "final-bass-hit",
    text: "Epic final bass hit impact with reverb tail, cinematic conclusion",
    duration: 2,
  },
  {
    name: "link-copy-click",
    text: "Satisfying clipboard copy click sound, digital confirmation",
    duration: 0.5,
  },
];

async function generateSFX() {
  await mkdir("public/sfx", { recursive: true });

  console.log(`Generating ${SFX_PROMPTS.length} sound effects...\n`);

  const results = await Promise.allSettled(
    SFX_PROMPTS.map(async ({ name, text, duration }) => {
      console.log(`  Generating: ${name}`);
      const response = await client.textToSoundEffects.convert({
        text,
        duration_seconds: duration,
        prompt_influence: 0.5,
      });

      const chunks: Uint8Array[] = [];
      for await (const chunk of response) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);
      const path = `public/sfx/${name}.mp3`;
      await writeFile(path, buffer);
      console.log(`  Done: ${path} (${(buffer.length / 1024).toFixed(1)}KB)`);
      return path;
    })
  );

  const succeeded = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.filter((r) => r.status === "rejected");
  console.log(`\n${succeeded}/${SFX_PROMPTS.length} SFX generated`);
  if (failed.length > 0) {
    for (const f of failed) {
      if (f.status === "rejected") console.error("  Failed:", f.reason?.message);
    }
  }
}

generateSFX();
