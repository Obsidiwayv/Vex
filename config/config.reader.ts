import modes from "./modes.json" with { type: "json" };
import { isEnabled } from "../check.ts";
import { createLog } from "../logger.ts";

class Key {
  constructor(private k: any) {}

  str() {
    return this.k as string;
  }

  int() {
    return parseInt(this.k);
  }

  array<T>() {
    return this.k.split("|") as Array<T>;
  }

  unknown() {
    return this.k === "unknown";
  }
}

function readFile() {
  const base_path = "config";
  const cfg_p = "cfg-prod";
  const cfg_d = "cfg-dev";

  let cfg_file: string | string[];
  if (modes.production) {
    cfg_file = Deno.readTextFileSync(`${base_path}/${cfg_p}`);
  } else {
    cfg_file = Deno.readTextFileSync(`${base_path}/${cfg_d}`);
  }
  createLog(`Using config file ${modes.production ? cfg_p : cfg_d}`);
  cfg_file = cfg_file.split("\n");
  return cfg_file;
}

export function debugMode() {
  if (typeof modes.debug === "string") {
    return isEnabled(modes.debug);
  } else {
    return modes.debug;
  }
}

export function readKey(key: string) {
  const item = readFile().filter((v) => v.includes(key))[0];
  if (typeof item === "undefined") {
    return new Key("unknown");
  } else {
    let [_, value] = item.split("::");
    value = value.replace("}", "");
    return new Key(value);
  }
}
