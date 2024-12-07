import type Eris from "eris";
import { readKey } from "../config/config.reader";
import { ccmap } from "../CommandRegistry";

export default function(message: Eris.Message) {
    const prefix = readKey("PREFIX");

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix.str())) return;

    const args = message.content.slice(prefix.str().length).split(" ")
    const args_after = args.slice(1);

    const command = ccmap.get(args[0]);
    if (command) command.execute(message, { args: args_after });
}