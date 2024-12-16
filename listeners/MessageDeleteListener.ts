import Eris, { EmbedOptions } from "eris";
import { client } from "..";
import { readKey } from "../config/config.reader";

const messageDeletedMap: Array<{
    id: string;
    name: string;
    messages: string[];
    attachments: Eris.Attachment[];
}> = [];

const log_channel = readKey("MOD_LOG_CHANNEL");

export default function (m: Eris.Message) {
    const deletedMessages = messageDeletedMap.find(({ id }) => id === m.id);
    if (!deletedMessages) {
        messageDeletedMap.push({
            id: m.author.id,
            attachments: m.attachments,
            name: m.author.username,
            messages: [m.content]
        });
    } else {
        deletedMessages.messages.push(m.content);
        deletedMessages.attachments = m.attachments;
    }

    if (messageDeletedMap.length) {
        let message_col = 0;

        messageDeletedMap.forEach(({ messages, attachments, name }) => {
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
}