import { EmbedOptions } from "eris";
import { client, messageDeletedMap } from ".."
import { readKey } from "../config/config.reader";

const log_channel = readKey("MOD_LOG_CHANNEL");

setInterval(() => {
    if (messageDeletedMap.length) {
      messageDeletedMap.forEach(({ messages, name }) => {
        const embed: EmbedOptions = {
            title: `Messages deleted by ${name}`,
            description: messages.join("\n"),
            color: 0xD03D33
        };
        client.createMessage(log_channel.str(), { embeds: [embed] });
      })
    }
}, 300000);