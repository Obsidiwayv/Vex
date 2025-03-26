import type { FastifyReply, FastifyRequest } from "fastify";
import { client } from "../index.ts";
import { readKey } from "../config/config.reader.ts";
import type Eris from "eris";
import { debug, log } from "../logger.ts";

async function runGitCommand() {
  await new Deno.Command("git", { args: ["pull"] })
      .output();
}

export default class {
  static handle(req: Request) {
    const response: any = req.body;
    if (response.ref === "refs/heads/main") {
      this.createMessage(
        `Pulling \`${response.before.substring(0, 7)}\` -> \`${response.after.substring(0, 7)}\``,
      );
      this.update();
    }
  }

  // Validating a github webhook
  static validate(req: Request) {
    const agent = req.headers.get("user-agent");
    if (agent && !agent.startsWith("GitHub-Hookshot/")) {
      return false;
    } else if (!agent) {
      return false;
    }
    return true;
  }

  private static createMessage(text: Eris.MessageContent) {
    client.createMessage(readKey("GIT_UPDATE_CHANNEL").str(), text);
  }

  private static async update() {
    runGitCommand();
    const api_key = readKey("PANEL_KEY");
    const server_id = readKey("SERVER_ID");
    const host_url = readKey("HOST_URL");
    await fetch(`${host_url.str()}/api/client/servers/${server_id.str()}/power`, {
      headers: {
        "Authorization": `Bearer ${api_key.str()}`,
        "Content-Type": "application/json",
        "Accept": "Application/vnd.pterodactyl.v1+json",
      },
      method: "POST",
      body: JSON.stringify({
        signal: "restart"
      }),
    })
      .then(() => log("Restarting now!"))
      .catch((e) => debug(e));
  }
}
