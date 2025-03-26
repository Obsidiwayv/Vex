import { debugMode } from "./config/config.reader.ts";

enum Emojis {
  GEAR = "⚙️",
  FIRE = "🔥",
}

interface LogOptions {
  emoji?: Emojis;
  debug?: boolean;
}

// Small wrapper to check if its debug mode.
// If it's not it will not log
export function createLog(text: string) {
  if (debugMode()) {
    console.log(text);
  }
}

export function log(text: string, opt?: LogOptions) {
  let a_string = "";
  if (opt) {
    if (opt.emoji) {
      a_string += opt.emoji + " ";
    }
    if (opt.debug) {
      return createLog(text);
    }
  }
  console.log(text);
}

export function debug(text: string) {
  log(text, { debug: true });
}

export async function crashReport(text: string[] | Error) {
  const current_date = new Date().toISOString();
  log("A crash has been detected and will now write to a file");
  Deno.writeTextFileSync(
    `crash/${current_date}.log`,
    Array.isArray(text) ? text.join("\n") : text.message
  );
}
