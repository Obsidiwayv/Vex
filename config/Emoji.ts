import {client} from "../index.ts";
import {readKey} from "./config.reader.ts";
import {RESTGetAPIApplicationEmojisResult} from "npm:discord-api-types@0.37.119/rest";

export class PlasmaEmojis {
    public static cache = new Map<string, string>();

    constructor(private e: string) {}

    public static async GetAllFromRest() {
        const emojis = await fetch(
            `https://discord.com/api/v10/applications/${client.user.id}/emojis`, {
                headers: {
                    "Authorization": `Bot ${readKey("TKN").str()}`
                }
            })
        for (const emoji of (await emojis.json() as RESTGetAPIApplicationEmojisResult).items) {
            this.cache.set(emoji.name!, `<${emoji.animated ? "a" : ""}:${emoji.name}:${emoji.id}>`);
        }
    }

    /**
     * String
     */
    public Str() {
        return this.e;
    }

    /**
     * Emoji ID
     */
    public ID() {
        const regex = /[0-9]+/.exec(this.e);
        if (!regex) return "UNKNOWN_EMOJI";
        else return regex[0];
    }

    /**
     * Emoji name + ID for discord to reconize them
     * 
     */
    public DiscordReconized() {
        const regex = /[a-z]+:[0-9]+/.exec(this.e);
        if (!regex) return "UNKNOWN_EMOJI";
        else return regex[0];
    }
}

/**
 * Small wrapper function to get a string next an emoji
 */
export function Append(str: string, emoji: PlasmaEmojis) {
    return `${emoji.Str()} ${str}`;
}

export function GetEmoji(e: string) {
    const emoji = PlasmaEmojis.cache.get(e);
    if (!emoji) return new PlasmaEmojis("NONE");
    return new PlasmaEmojis(emoji);
}