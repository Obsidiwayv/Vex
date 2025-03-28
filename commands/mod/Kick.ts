import {BaseCommand, CTX} from "../Base.ts";
import Eris from "eris";

export default class extends BaseCommand {
    public override execute(message: Eris.Message, ctx: CTX) {
        const member = this.resolvers.GetMember(0);

        if (!member) return;
        if (member.id === message.author.id) return;

        member.kick(ctx.args.length ? ctx.args.join(" ") : "No reason provided");
    }

    public override isAdmin(): boolean {
        return true;
    }
}