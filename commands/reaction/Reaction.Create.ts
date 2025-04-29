import { Message } from "eris";
import { BaseCommand, CTX } from "../Base.ts";
import { client, database } from "../../index.ts";

export default class extends BaseCommand {
    public override isAdmin(): boolean {
        return true;
    }

    public override async execute(message: Message, ctx: CTX) {
        await database.execute(
            "INSERT INTO reaction_roles (message_id,emoji,role_id) VALUES (?,?,?)",
            [ctx.args[0], ctx.args[1], ctx.args[2]]
        );
        await client.addMessageReaction(message.channel.id, ctx.args[0], ctx.args[1]);
        await message.delete();
    }
}