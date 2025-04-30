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
        Deno.cron("Update Reaction Cache", { minute: { every: 10 } }, {}, () => this.SetCache());
        client.on("messageReactionAdd", this.HandleAdd.bind(this));
        client.on("messageReactionRemove", this.HandleRemove.bind(this));
    }

    private static async SetCache() {
        this.cache = await database.execute("SELECT * FROM reaction_roles");
    }

    private static FilterCache(data: ReactionOptions) {
        return this.cache.filter(
            (obj) => {
                return obj.message_id === data.message.id && data.emoji.name === obj.emoji;
            });
    }

    private static async HandleAdd(message: Eris.Message, emoji: Eris.Emoji, reactor: Eris.Member) {
        const reactionRole = this.FilterCache({ message, emoji });
        if (reactionRole.length) {
            await (<Eris.GuildChannel>message.channel)
                .guild.addMemberRole(reactor.id, reactionRole[0].role_id);
        }
    }
    
    private static async HandleRemove(message: Eris.PossiblyUncachedMessage, emoji: Eris.Emoji, userID: string) {
        const reactionRole = this.FilterCache({ message, emoji });
        if (reactionRole.length) {
            await (<Eris.GuildChannel>message.channel)
                .guild.removeMemberRole(userID, reactionRole[0].role_id);
        }
    }
}