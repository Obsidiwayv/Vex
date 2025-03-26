import {Member} from "npm:eris@0.18.0";
import {client} from "./index.ts";

export function isEnabled(s: string) {
  return s === "YES" ? true : s === "ENABLE" ? true : false;
}