import Eris from "eris";
import { readKey } from "../config/config.reader";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function voiceJoin(
  member: Eris.Member,
  channel: Eris.AnyVoiceChannel,
  client: Eris.Client,
) {
  const pings = 3;
  const role = readKey("ROLE");
  const ping_role = readKey("PING");
  const channel_id = readKey("CHNL");
  const msg = `<@&${ping_role.str()}>`;

  if (member.roles.includes(role.str()) && channel.voiceMembers.size === 1) {
    for (let i = 0; i < pings; i++) {
      client.createMessage(
        channel_id.str(),
        `${msg}, \`${member.username}\` is in <#${channel.id}>`,
      );
      await sleep(5000);
    }
  }
}
