import Eris from "eris";
import { messageDeletedMap } from "..";

export default function(m: Eris.Message) {
    const deletedMessages = messageDeletedMap.find(({ id }) => id === m.id);
    if (!deletedMessages) {
        messageDeletedMap.push({ id: m.author.id, name: m.author.id, messages: [m.content] });
    } else {
        deletedMessages.messages.push(m.content);
    }
}