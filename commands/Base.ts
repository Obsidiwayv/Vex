import type Eris from "eris";

export interface CTX {
    args: string[];
}

export class BaseCommand {
    public execute(message: Eris.Message, ctx: CTX) {}
}