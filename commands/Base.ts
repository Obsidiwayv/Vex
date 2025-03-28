import type Eris from "eris";
import Resolver from "../util/Resolver.ts";

export interface CTX {
    args: string[];
}

export class BaseCommand {
    public resolvers!: Resolver;
    public async event() {};
    public execute(message: Eris.Message, ctx: CTX) {}
    public isAdmin() {
        return false;
    }
}