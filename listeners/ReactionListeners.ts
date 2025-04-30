import Eris from "eris";
import { client, database } from "../index.ts";
import { ReactionRolesObj } from "../database/DB.ts";

interface ReactionOptions {
    message: Eris.PossiblyUncachedMessage;
    emoji: Eris.Emoji;
}

export default class {
    private static cache: ReactionRolesObj[];

    public static Create() {
        this.SetCache();
        client.on("messageReactionAdd", this.HandleAdd.bind(this));
        client.on("messageReactionRemove", this.HandleRemove.bind(this));
    }

    private static async SetCache() {
        this.cache = await database.execute("SELECT * FROM reaction_roles");
    }

    private static FilterCache(data: ReactionOptions) {
        return this.cache.filter(
            (obj) => obj.message_id === data.message.id && data.emoji.name === obj.emoji);
    }

    private static HandleAdd(message: Eris.PossiblyUncachedMessage, emoji: Eris.Emoji) {
        const reactionRole = this.FilterCache({ message, emoji });
        if (reactionRole.length && message instanceof Eris.TextChannel) {
            (<Eris.GuildChannel>message.channel)
                .guild.addMemberRole(emoji.user!.id, reactionRole[0].role_id);
        }
    }

    
    private static HandleRemove(message: Eris.PossiblyUncachedMessage, emoji: Eris.Emoji) {
        const reactionRole = this.FilterCache({ message, emoji });
        if (reactionRole.length && message instanceof Eris.TextChannel) {
            (<Eris.GuildChannel>message.channel)
                .guild.removeMemberRole(emoji.user!.id, reactionRole[0].role_id);
        }
    }
}