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
  const ping_role_reg = readKey("PING");
  const channel_id_reg = readKey("CHNL");
  const ping_role_ad = readKey("AD_ROLE");
  const channel_id_ad = readKey("AD_CHNL");

  const is_admin = channel.id === channel_id_ad.str();

  pingRole(
    role.str(),
    is_admin ? channel_id_ad.str() : channel_id_reg.str(),
    is_admin ? ping_role_ad.str() : ping_role_reg.str(),
    { channel, client, member },
  );
}

interface pingOptions {
  member: Eris.Member;
  channel: Eris.AnyVoiceChannel;
  client: Eris.Client;
}

async function pingRole(
  role: string,
  channel_id: string,
  ping_role: string,
  { channel, client, member }: pingOptions,
) {
  if (member.roles.includes(role) && channel.voiceMembers.size === 1) {
    for (let i = 0; i < 3; i++) {
      client.createMessage(
        channel_id,
        `<@&${ping_role}>, \`${member.username}\` is in <#${channel.id}>`,
      );
      await sleep(5000);
    }
  }
}
