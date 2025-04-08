import {BaseCommand, CTX} from "../Base.ts";
import Eris from "npm:eris@0.18.0";
import {contentFilterDB} from "../../index.ts";

export default class extends BaseCommand {
    public override async execute(message: Eris.Message, ctx: CTX) {
        if (!ctx.args.length) return;
        if (message.content.length < 3) {
            return message.channel.createMessage("Word cannot be blacklisted because its below 3");
        }
        try {
            const word = ctx.args[0];
            const letter = word[0].toUpperCase();
            await contentFilterDB.query(
                `INSERT INTO word_list (word,lett) VALUES (?,?)`,
                [word, letter]
            );
            await message.channel.createMessage("Word has been blacklisted");
        } catch (e) {
            console.log(e);
            await message.channel.createMessage("Could not blacklist that word");
        }
    }

    public override isAdmin(): boolean {
        return true;
    }
}