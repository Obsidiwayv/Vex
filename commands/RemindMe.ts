import {BaseCommand, CTX} from "./Base.ts";
import Eris from "eris";
import {database} from "../index.ts";
import ms, {StringValue} from "../util/ms.ts";
import {log} from "../logger.ts";
import {ReminderDatabaseObj} from "../database/DB.ts";

async function CheckTimers() {
    const timers = await database.query<ReminderDatabaseObj[]>(
        `SELECT * FROM reminders`
    );
    timers.forEach(timer => {

    });
}

export default class extends BaseCommand {
    public override async event() {
      await Deno.cron("timer_check", "*/1 * * *", CheckTimers);
    }

    public override execute(message: Eris.Message, ctx: CTX) {
        this.CreateTimer(ms(ctx.args[0] as StringValue), message)
            .then(() => log(`${message.author.id} called this.CreateTimer()`));
    }

    private async CreateTimer(time: number, { author, channel }: Eris.Message) {
        await database.query(
            `INSERT into reminders (user, time, channel) VALUES (?,?,?)`,
            (author.id, time.toString(), channel.id)
        )
    }
}