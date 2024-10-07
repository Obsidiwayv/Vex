import type { FastifyReply, FastifyRequest } from "fastify";
import { client } from "..";
import { readKey } from "../config/config.reader";
import type Eris from "eris";
import { $ } from "bun";
import { debug, log } from "../logger";
import axios from "axios";

export default class {
  static handle(req: FastifyRequest, res: FastifyReply) {
    const response: any = req.body;
    if (response.ref) {
      this.createMessage(
        `Pulling latest from ${response.before} to ${response.after}`,
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
    client.createMessage(readKey("UPD_CHNL").str(), text);
  }

  private static async update() {
    $`git pull`;
    const api_key = readKey("H_KEY");
    const server_id = readKey("S_ID");
    const host_url = readKey("H_URL");
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
