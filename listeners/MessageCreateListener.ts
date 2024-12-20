import type Eris from "eris";
import { readKey } from "../config/config.reader";
import { ccmap } from "../CommandRegistry";
import { database } from "..";
import { WLChannelObject } from "../database/DB";
import { getEmoji } from "../config/Emoji";
import { isEnabled } from "../check";

export default function(message: Eris.Message) {
    
    if (message.author.bot) return;

    if (readKey("WL_CHANNELS").array<string>().includes(message.channel.id) 
        && message.content.includes("w/l")) {
        HandleWL(message);
    };
    const prefix = readKey("PREFIX");

    if (!message.content.startsWith(prefix.str())) return;

    const args = message.content.slice(prefix.str().length).split(" ")
    const args_after = args.slice(1);

    const command = ccmap.get(args[0]);
    const role = readKey("VC_COMMANDER_ROLE");

    if (command.isAdmin() && !message.member.roles.includes(role.str())) {
        return;
    }
    if (command) command.execute(message, { args: args_after });
}

async function HandleWL(message: Eris.Message) {
    const dbObj = await database.query<WLChannelObject[]>(
        `SELECT locked FROM win_lose where channel = ${message.channel.id}`
    );
    const obj = dbObj[0];
    if (typeof obj !== "undefined" 
        && !isEnabled(obj.locked)
        && message.attachments.length) {
        message.addReaction(getEmoji("Upvote").discordReconized());
        message.addReaction(getEmoji("Polarity").discordReconized());
        message.addReaction(getEmoji("Downvote").discordReconized());
    }
}