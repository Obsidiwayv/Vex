import type { FastifyReply, FastifyRequest } from "fastify";
import { client } from "..";
import { readKey } from "../config/config.reader";
import type Eris from "eris";

export default class {
  static handle(req: FastifyRequest, res: FastifyReply) {
    console.log(req.body);
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
}
