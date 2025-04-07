import {BaseCommand, CTX} from "./Base.ts";
import Eris from "npm:eris@0.18.0";

export default class extends BaseCommand {
    public override async execute(message: Eris.Message, ctx: CTX) {
        const file = await fetch("https://wayvlyte.xyz/mods/archive");
        await message.channel.createMessage(`https://wayvlyte.xyz/mods/${await file.text()}`);
    }
}