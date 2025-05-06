import Eris from "eris";
import { ReadKey } from "../config/config.reader.ts";
import { client, contentFilterDB } from "../index.ts";
import { Append, GetEmoji } from "../config/Emoji.ts";

const log_channel = ReadKey("MOD_LOG_CHANNEL");

function VerifyMessages(newMessage: Eris.Message, oldMessage: Eris.Message) {
    if (!newMessage.content && !newMessage.content) {
        return false;
    } else if (newMessage.content === oldMessage.content) {
        return false;
    }
    if (newMessage && !oldMessage) {
        return false;
    }
    return true;
}

/**
 * @param m_n New Message
 * @param m_o Old Message
 */
export default async function(m_n: Eris.Message, m_o: Eris.Message) {
    if (!VerifyMessages(m_n, m_o)) return;
    
    const wordBlacklist = await contentFilterDB.query<{
        word: string;
        lett: string;
    }[]>("SELECT * FROM `word_list`");
    const words = wordBlacklist.map(blacklist => blacklist.word.toLowerCase());
    for (const word of words) {
        for (const content of m_n.content.toLowerCase().split(" ")) {
            if (word === content) {
                m_n.delete();
                return;
            }
        }
    }
    
    client.createMessage(log_channel.Str(), {
        embeds: [{
            title: `Message edited by ${m_n.author.username}`,
            fields: [{
                name: Append("original", GetEmoji("minus")),
                value: m_o.content
            }, {
                name: Append("new", GetEmoji("plus")),
                value: m_n.content
            }],
            color: 0xff003a
        }]
    });
}