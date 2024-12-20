import Eris from "eris";
import { readKey } from "../config/config.reader";
import { client } from "..";
import MessageUtils from "../MessageUtils";
import { append, getEmoji } from "../config/Emoji";

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
                name: append("Previously", getEmoji("Remove")),
                value: m_o.content
            }, {
                name: append("Currently", getEmoji("Add")),
                value: m_n.content
            }],
            color: 0xD03D33
        }]
    });
}