import { Member } from "eris";
import { client } from "./index.ts";

export function isEnabled(s: string) {
  return s === "YES" ? true : s === "ENABLE" ? true : false;
}
