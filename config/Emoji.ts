class PlasmaEmoji {
    static Add = "<:add_green:1318362625263931392>";
    static Remove = "<:remove_red:1318362617445613638>";
    static Upvote = "<:upvote:1319691862113521704>";
    static Downvote = "<:downvote:1319691856774303774>";
    static Polarity = "<:polarity:1319709500013285538>";

    constructor(private e: string) {}

    /**
     * String
     */
    public str() {
        return this.e;
    }

    /**
     * Emoji ID
     */
    public id() {
        return /[0-9]+/g.exec(this.e)[0];
    }

    /**
     * Emoji name + ID for discord to reconize them
     * 
     */
    public discordReconized() {
        return /[a-z]+:[0-9]+/.exec(this.e)[0];
    }
}

/**
 * Small wrapper function to get a string next an emoji
 */
export function append(str: string, emoji: PlasmaEmoji) {
    return `${emoji.str()} ${str}`;
}

export function getEmoji(e: keyof typeof PlasmaEmoji) {
    return new PlasmaEmoji(PlasmaEmoji[e] as string);
}