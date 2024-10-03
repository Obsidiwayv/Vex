import { debugMode } from "./config/config.reader";

function start() {}

// Small wrapper to check if its debug mode.
// If it's not it will not log
export function createLog(text: string) {
  if (debugMode()) {
    console.log(text);
  }
}
