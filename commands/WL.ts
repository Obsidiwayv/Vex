import { Message } from "eris";
import { BaseCommand, CTX } from "./Base";
import { database } from "..";
import { WLChannelObject } from "../database/DB";
import { isEnabled } from "../check";

export default class WLCommand extends BaseCommand {
    public async execute(message: Message, ctx: CTX) {
        const dbObj = await database.query<WLChannelObject[]>(
            `SELECT locked FROM win_lose where channel = ${message.channel.id}`
        );
        const obj = dbObj[0];
        if (ctx.args[0] === "lock") {
            if (isEnabled(obj.locked)) {
                message.channel.createMessage("The bot is already restricted from reacting in this W/L channel.");
            } else {
                this.updateSQL(message.channel.id, "YES");
                message.channel.createMessage("Locked this WL channel.");
            }
            return;
        }
        if (ctx.args[0] === "unlock") {
            if (!isEnabled(obj.locked)) {
                message.channel.createMessage("The bot is already not restricted from reacting in this W/L channel.");
            } else {
                this.updateSQL(message.channel.id, "NO");
                message.channel.createMessage("Unlocked this WL channel.");
            }
            return;
        }
    }

    private async updateSQL(channelID: string, lock: string) {
        await database.query(
            `UPDATE win_lose SET locked = '${lock}' where channel = ${channelID}`
        );
    }
}