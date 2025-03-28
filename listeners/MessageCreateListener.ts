import type Eris from "eris";
import { ReadKey } from "../config/config.reader.ts";
import { ccmap } from "../CommandRegistry.ts";
//import { database } from "../index.ts";
//import { WLChannelObject } from "../database/DB.ts";
import { GetEmoji } from "../config/Emoji.ts";
import Resolver from "../util/Resolver.ts";
//import { isEnabled } from "../check.ts";

const WIN_OR_LOSE = [
    "win or lose",
    "w/l",
    "win/lose"
]

export default function(message: Eris.Message) {
    if (message.author.bot) return;

    if (ReadKey("WL_CHANNELS").Array<string>().includes(message.channel.id)
        && WIN_OR_LOSE.includes(message.content.toLowerCase())) {
        HandleWL(message);
    }
    const prefix = ReadKey("PREFIX");

    if (!message.content.startsWith(prefix.Str())) return;

    const args = message.content.slice(prefix.Str().length).split(" ")
    const args_after = args.slice(1);

    const command = ccmap.get(args[0]);
    const role = ReadKey("VC_COMMANDER_ROLE");

    if (command && command.isAdmin()
        && message.member
        && !message.member.roles.includes(role.Str())) {
        return;
    }
    if (command) {
        command.resolvers = Resolver.Register(message, args);
        command.execute(message, {args: args_after});
    }
}

function HandleWL(message: Eris.Message) {
    // @deprecated
    //const dbObj = await database.query<WLChannelObject[]>(
    //    `SELECT locked FROM win_lose where channel = ${message.channel.id}`
    //);
    //const obj = dbObj[0];
    if (// typeof obj !== "undefined"
        // && !isEnabled(obj.locked)
       // &&
    message.attachments.length) {
        message.addReaction(GetEmoji("upvote").DiscordRecognized());
        message.addReaction(GetEmoji("polarity").DiscordRecognized());
        message.addReaction(GetEmoji("downvote").DiscordRecognized());
    }
}