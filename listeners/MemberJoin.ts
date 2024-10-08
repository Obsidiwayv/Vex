import type Eris from "eris";
import { debug } from "../logger";
import { readKey } from "../config/config.reader";

export default function (guild: Eris.Guild, member: Eris.Member) {
  const role_id = readKey("ROLE_JOIN");
  try {
    member.addRole(role_id.str());
  } catch {
    debug("Unable to add join role to member");
  }
}
