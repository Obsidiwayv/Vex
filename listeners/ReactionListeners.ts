import Eris from "eris";
import { client } from "../index.ts";

export default class {
    public static Create() {
        client.on("messageReactionAdd", this.HandleAdd.bind(this));
    }

    private static HandleAdd(message: Eris.PossiblyUncachedMessage, emoji: Eris.Emoji) {}
}