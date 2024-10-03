import fs from "fs";
import path from "path";
import modes from "./modes.json";
import { isEnabled } from "../check";
import { createLog } from "..";

class Key {
  constructor(private k: any) {}

  str() {
    return new String(this.k);
  }

  int() {
    return new Number(this.k);
  }
}

function readFile() {
  const base_path = "config";
  const encoding: BufferEncoding = "utf8";
  const cfg_p = "cfg-prod";
  const cfg_d = "cfg-dev";

  let cfg_file;
  if (modes.production) {
    cfg_file = fs.readFileSync(path.join(base_path, cfg_p), encoding);
  } else {
    cfg_file = fs.readFileSync(path.join(base_path, cfg_d), encoding);
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
    return "unknown";
  } else {
    const [_, value] = item.split("::");
  }
}
