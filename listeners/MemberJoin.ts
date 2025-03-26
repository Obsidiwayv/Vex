import type Eris from "eris";
import { debug } from "../logger.ts";
import { readKey } from "../config/config.reader.ts";

export default function (guild: Eris.Guild, member: Eris.Member) {
  const role_id = readKey("MEMBER_JOIN_ROLE");
  try {
    if (!member.bot) {
      member.addRole(role_id.str());
    }
  } catch {
    debug("Unable to add join role to member");
  }
}
