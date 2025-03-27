import { client } from "../index.ts";
import { ReadKey } from "../config/config.reader.ts";
import type Eris from "eris";
import { debug, log } from "../logger.ts";

function createMessage(text: Eris.MessageContent) {
  client.createMessage(ReadKey("GIT_UPDATE_CHANNEL").Str(), text);
}

async function runGitCommand() {
  const pipes = new Deno.Command("git", { args: ["pull"] });
  const { stderr, stdout } = await pipes.output();

  console.log(new TextDecoder().decode(stdout));
  console.log(new TextDecoder().decode(stderr));
  createMessage(`\`\`\`diff\n${new TextDecoder().decode(stdout)}\n\`\`\``);
}

export default class {
  static async handle(req: Request) {
    const response: any = await req.json();
    if (response.ref === "refs/heads/main") {
      createMessage(
        `Pulling \`${response.before.substring(0, 7)}\` -> \`${response.after.substring(0, 7)}\``,
      );
      await this.update();
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

  private static async update() {
    await runGitCommand();
    const api_key = ReadKey("PANEL_KEY");
    const server_id = ReadKey("SERVER_ID");
    const host_url = ReadKey("HOST_URL");
    await fetch(`${host_url.Str()}/api/client/servers/${server_id.Str()}/power`, {
      headers: {
        "Authorization": `Bearer ${api_key.Str()}`,
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
