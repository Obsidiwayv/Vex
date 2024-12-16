import Eris from "eris";
import { messageDeletedMap } from "..";

export default function(m: Eris.Message) {
    const deletedMessages = messageDeletedMap.find(({ id }) => id === m.id);
    if (!deletedMessages) {
        messageDeletedMap.push({ id: m.author.id, attachments: m.attachments, name: m.author.username, messages: [m.content] });
    } else {
        deletedMessages.messages.push(m.content);
        deletedMessages.attachments = m.attachments;
    }
}