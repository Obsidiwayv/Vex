import {PossiblyUncachedMessage, Constants} from "eris";
import {ReadKey} from "../config/config.reader.ts";
import {client} from "../index.ts";

const log_channel = ReadKey("MOD_LOG_CHANNEL");

export default function(messages: PossiblyUncachedMessage[]) {
    const channel = client.getChannel(messages[0].channel.id);
    if (channel.type === Constants.ChannelTypes.GUILD_TEXT) {
        client.createMessage(log_channel.Str(), {
            embeds: [{
                description: `${messages.length} messages have been purged from \`${channel.name}\``,
                color: 0x008fff
            }]
        })
    }
}