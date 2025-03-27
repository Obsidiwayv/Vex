import Eris, { EmbedOptions } from "eris";
import { client } from "../index.ts";
import { readKey } from "../config/config.reader.ts";

const log_channel = readKey("MOD_LOG_CHANNEL");

export default function (m: Eris.Message) {
  const embed: EmbedOptions = {
    title: `Message deleted by ${m.author.username}${
      m.attachments.length ? ", (Has Attachments)" : ""
    }`,
    description: m.content,
    color: 0xff8d46,
  };
  client.createMessage(log_channel.str(), { embeds: [embed] });
}
