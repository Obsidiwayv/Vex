import { Message } from "eris";
import { BaseCommand, CTX } from "./Base.ts";

export default class extends BaseCommand {
    public override isAdmin(): boolean {
      return true;
    }

    public override execute(message: Message, ctx: CTX): void {
        const color = parseInt(`0x${ctx.args[0]}`);
        message.channel.createMessage({ embeds: [{ color, description: ctx.args.slice(1).join(" ") }] })
    }
}