import Eris from "eris";
import {GetEmoji} from "../config/Emoji.ts";

export default class {
    constructor(private message: Eris.Message, private args: string[], private guild: Eris.Guild) {}

    public static Register(message: Eris.Message, args: string[]) {
        return new this(message, args, (<Eris.GuildChannel>message.channel).guild);
    }

    public GetMember(index: number) {
        let member: Eris.Member | undefined | null;

        if (!this.args.length) {
            return this.message.member!;
        }

        member = this.guild.members.find(i => i.id === this.ripSymbols(this.args[index])) ||
            this.guild.members.find(i => i.username === this.args[index]);

        if (!member) {
            member = this.message.member!;
        }

        return member;
    }

    public getChannel(index: number) {
        const channel = this.guild.channels.find(i => i.id === this.ripSymbols(this.args[index])) ||
            this.guild.channels.find(i => i.name === this.args[index]);

        if (!channel) {
            return false;
        }

        return channel;
    }

    public getRole(index: number) {
        const role = this.guild.roles.find(i => i.id === this.ripSymbols(this.args[index])) ||
            this.guild.roles.find(i => i.name === this.args[index]);

        if (!role) {
            return false;
        }

        return role;
    }

    private ripSymbols(arg: string) {
        return arg.replace("<", "")
            .replace("@", "")
            .replace("!", "")
            .replace(">", "")
            .replace("#", "");
    }
}