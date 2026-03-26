import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { Readable } from "stream";
import { createWriteStream, mkdirSync } from "fs";
import { pipeline } from "stream/promises";

const client = new ElevenLabsClient();

async function generateMusic() {
  mkdirSync("public/music", { recursive: true });

  console.log("Generating background music (60s)...\n");

  try {
    console.log("  Step 1: Creating composition plan...");
    const plan = await client.music.compositionPlan.create({
      prompt:
        "Dark electronic cinematic background music for a tech product demo video. Driving synth beat, modern, no vocals, instrumental only. Starts with a deep bass impact, builds energy with arpeggios and pulsing rhythm, peaks with powerful synths, then resolves confidently. 130 BPM, dark and sleek like a Vercel or Linear product launch.",
      musicLengthMs: 60000,
    });

    console.log("  Plan created. Composing...");
    console.log(`  Sections: ${plan.sections?.length || "unknown"}`);

    console.log("\n  Step 2: Composing from plan...");
    const track = await client.music.compose({
      compositionPlan: plan,
      forceInstrumental: true,
    });

    const path = "public/music/bg-track.mp3";
    await pipeline(Readable.from(track), createWriteStream(path));
    console.log(`  Done: ${path}`);
  } catch (err: unknown) {
    console.log("  Composition plan failed, trying simple prompt...\n");

    try {
      const track = await client.music.compose({
        prompt:
          "Dark electronic cinematic instrumental background music for a tech demo video. Driving synth beat, 130 BPM, no vocals. Deep bass impact intro, building arpeggios, powerful peak, confident resolution.",
        musicLengthMs: 60000,
        forceInstrumental: true,
      });

      const path = "public/music/bg-track.mp3";
      await pipeline(Readable.from(track), createWriteStream(path));
      console.log(`  Done: ${path}`);
    } catch (err2: unknown) {
      const msg = err2 instanceof Error ? err2.message : String(err2);
      console.error("  Failed:", msg);
      console.log(
        "\n  Fallback: generate from elevenlabs.io/app/music studio"
      );
    }
  }
}

generateMusic();
