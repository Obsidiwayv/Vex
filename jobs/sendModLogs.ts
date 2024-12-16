import Eris, { EmbedOptions } from "eris";
import { client, messageDeletedMap } from ".."
import { readKey } from "../config/config.reader";

const log_channel = readKey("MOD_LOG_CHANNEL");
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

setInterval(() => {
    if (messageDeletedMap.length) {
      let message_col = 0;

      messageDeletedMap.forEach(({ messages, attachments, name }) => {
        sleep(2000);
        const embed: EmbedOptions = {
            title: `Messages deleted by ${name}${attachments.length ? ", (Attachments below)" : ""}`,
            ...messages.length ? {
              description: messages.map((s) => {
                const msg = `${message_col === 0 ? `${message_col}.` : ""} ${s}\n\n`;
                message_col++
                return msg;
              }).join("")
            } : {},
            color: 0xD03D33
        };
        client.createMessage(log_channel.str(), { embeds: [embed] });
        messageDeletedMap.shift();
        message_col = 0;
      })
    }
}, 1000);