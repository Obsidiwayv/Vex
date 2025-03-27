import type { Message } from "eris";
import { BaseCommand, type CTX } from "./Base.ts";
import { GeminiExtension } from "../Extensions.ts";
import {GetEmoji} from "../config/Emoji.ts";

export class GeminiCommand extends BaseCommand {
    public override async execute(message: Message, ctx: CTX) {
        const bMsg =
            await message.channel.createMessage(`Gemini is thinking... ${GetEmoji("gemini").Str()}`);
        const gemini = new GeminiExtension();
        const genAI = await gemini.createResponse(ctx.args.join(" "));
        await bMsg.edit(genAI.response.text());
    }
}