export enum Emojis {
    Add = "<:add_green:1318362625263931392>",
    Remove = "<:remove_red:1318362617445613638>"
}

/**
 * Small wrapper function to get a string next an emoji
 */
export function append(str: string, emoji: Emojis) {
    return `${emoji} ${str}`;
}