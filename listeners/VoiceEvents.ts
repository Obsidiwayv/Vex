import Eris from "eris";
import { ReadKey } from "../config/config.reader.ts";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function voiceJoin(
  member: Eris.Member,
  channel: Eris.AnyVoiceChannel,
  client: Eris.Client,
) {
  const role = ReadKey("VC_COMMANDER_ROLE");
  const ping_role = ReadKey("PING_ROLE");
  const channel_id = ReadKey("PING_CHANNEL");

  pingRole(
    role.Str(),
    channel_id.Str(),
    ping_role.Str(),
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
