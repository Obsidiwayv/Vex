import type Eris from "eris";
import { debug } from "../logger.ts";
import { ReadKey } from "../config/config.reader.ts";

export default function (guild: Eris.Guild, member: Eris.Member) {
  const role_id = ReadKey("MEMBER_JOIN_ROLE");
  try {
    if (!member.bot) {
      member.addRole(role_id.Str());
    }
  } catch {
    debug("Unable to add join role to member");
  }
}
