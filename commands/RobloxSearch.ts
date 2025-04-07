import {BaseCommand, CTX} from "./Base.ts";
import Eris from "npm:eris@0.18.0";
import Roblox from "../request/Roblox.ts";

export default class extends BaseCommand {
    public override async execute(message: Eris.Message, ctx: CTX) {
        if (!ctx.args.length) return;
        const games = await Roblox.SearchGames(ctx.args.join(" "));
        if (!games.searchResults) return;
        let results = "";
        for (const res of games.searchResults) {
            results += `\`${res.contents[0].name}\` - ${res.contents[0].universeId}\n`;
        }
        await message.channel.createMessage(results);
    }
}