import Eris from "eris";
import { readKey } from "../config/config.reader.ts";
import { client } from "../index.ts";
import { Append, GetEmoji } from "../config/Emoji.ts";

const log_channel = readKey("MOD_LOG_CHANNEL");

/**
 * @param m_n New Message
 * @param m_o Old Message
 */
export default function(m_n: Eris.Message, m_o: Eris.Message) {
    client.createMessage(log_channel.str(), {
        embeds: [{
            title: `Message edited by ${m_n.author.username}`,
            fields: [{
                name: Append("previously", GetEmoji("Remove")),
                value: m_o.content
            }, {
                name: Append("currently", GetEmoji("Add")),
                value: m_n.content
            }],
            color: 0xD03D33
        }]
    });
}