import Eris, { EmbedOptions } from "eris";
import { client } from "../index.ts";
import { ReadKey } from "../config/config.reader.ts";
import { encodeBase64 } from "@std/encoding";

const log_channel = ReadKey("MOD_LOG_CHANNEL");

export default async function (m: Eris.Message) {
  if (!m.id) return;
  
  if (m.author.id === client.user.id && m.channel.id === log_channel.Str()) {
    return client.createMessage(log_channel.Str(), { embeds: m.embeds });
  }
  if (m.author.bot && m.embeds.length && m.author.id !== client.user.id) {
    const context: Eris.WebhookPayload = { embeds: m.embeds };
    if (m.content) {
      context.content = m.content;
    }
    const request = await fetch(m.author.dynamicAvatarURL("png"));
    const avatar = `data:image/png;base64,${encodeBase64(await request.bytes())}`;
    const webhook = await client.createChannelWebhook(log_channel.Str(), { 
      avatar,
      name: m.author.username
    });
    await client.executeWebhook(webhook.id, webhook.token!, context);
    await client.deleteWebhook(webhook.id, webhook.token!);
    return false;
  }
  const embed: EmbedOptions = {
    title: `Message deleted by ${m.author.username}${
      m.attachments.length ? ", (Has Attachments)" : ""
    }`,
    description: m.content,
    color: 0xffc300,
  };
  client.createMessage(log_channel.Str(), { embeds: [embed] });
}
