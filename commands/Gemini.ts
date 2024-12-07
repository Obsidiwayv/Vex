import type { Message } from "eris";
import { BaseCommand, type CTX } from "./Base";
import { GeminiExtension } from "../Extensions";

export class GeminiCommand extends BaseCommand {
    public async execute(message: Message, ctx: CTX) {
        const bMsg = await message.channel.createMessage("Gemini is thinking...");
        const gemini = new GeminiExtension();
        const genAI = await gemini.createResponse(ctx.args.join(" "));
        await bMsg.edit(genAI.response.text());
    }
}