import type { FastifyReply, FastifyRequest } from "fastify";
import { client } from "..";
import { readKey } from "../config/config.reader";
import type Eris from "eris";
import { debug, log } from "../logger";
import axios from "axios";

function runGitCommand() {
  if (typeof Bun !== "undefined") {
    Bun.$`git pull`;
  } else {
    const { execSync }  = require("child_process");
    execSync("git pull");
  }
}

export default class {
  static handle(req: FastifyRequest, res: FastifyReply) {
    const response: any = req.body;
    if (response.ref) {
      this.createMessage(
        `Pulling \`${response.before.substring(0, 7)}\` -> \`${response.after.substring(0, 7)}\``,
      );
      this.update();
    }
  }

  // Validating a github webhook
  static validate(req: FastifyRequest) {
    const agent = req.headers["user-agent"];
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
    await axios({
      headers: {
        Authorization: `Bearer ${api_key.str()}`,
        "Content-Type": "application/json",
        Accept: "Application/vnd.pterodactyl.v1+json",
      },
      method: "POST",
      url: `${host_url.str()}/api/client/servers/${server_id.str()}/power`,
      params: {
        signal: "restart",
      },
    })
      .then(() => log("Restarting now!"))
      .catch((e) => debug(e));
  }
}
