import Eris, { EmbedOptions } from "eris";
import { client } from "../index.ts";
import { ReadKey } from "../config/config.reader.ts";

const log_channel = ReadKey("MOD_LOG_CHANNEL");

export default function (m: Eris.Message) {
  if (m.author.id === client.user.id && m.channel.id === log_channel.Str()) {
    return client.createMessage(log_channel.Str(), { embeds: m.embeds });
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
