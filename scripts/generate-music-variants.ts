import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { Readable } from "stream";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";

const client = new ElevenLabsClient();

const variants = [
  {
    name: "bg-track-2-dark-minimal",
    prompt: "Minimal dark electronic instrumental, deep sub bass pulses, sparse hi-hats, atmospheric pads, reverb-heavy synth stabs. 120 BPM. Noir cyberpunk aesthetic. No vocals. Perfect for tech product showcase.",
  },
  {
    name: "bg-track-3-high-energy",
    prompt: "High energy electronic instrumental, aggressive synth arpeggios, punchy 808 kicks, fast build-ups and drops, glitch effects. 140 BPM. Intense and powerful. No vocals. For hackathon demo video.",
  },
  {
    name: "bg-track-4-ambient-build",
    prompt: "Ambient electronic instrumental that slowly builds. Starts with soft pads and distant bass, gradually adds layers of rhythm, synth melodies, and percussion. Reaches powerful climax at 40 seconds then resolves. 125 BPM. No vocals. Cinematic tech demo.",
  },
];

async function generate() {
  console.log(`Generating ${variants.length} music variants (60s each)...\n`);

  for (const { name, prompt } of variants) {
    try {
      console.log(`  ${name}...`);
      const track = await client.music.compose({
        prompt,
        musicLengthMs: 60000,
        forceInstrumental: true,
      });
      const path = `public/music/${name}.mp3`;
      await pipeline(Readable.from(track), createWriteStream(path));
      console.log(`  Done: ${path}\n`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  Failed ${name}: ${msg}\n`);
    }
  }
  console.log("All done.");
}

generate();
