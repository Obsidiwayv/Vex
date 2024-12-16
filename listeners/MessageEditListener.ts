import Eris from "eris";
import { readKey } from "../config/config.reader";
import { client } from "..";
import { append, Emojis } from "../config/Emoji";
import MessageUtils from "../MessageUtils";

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
                name: "Previously",
                value: append(MessageUtils.block(m_o.content), Emojis.Remove)
            }, {
                name: "Currently",
                value: append(MessageUtils.block(m_n.content), Emojis.Add)
            }],
            color: 0xD03D33
        }]
    });
}