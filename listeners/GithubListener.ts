import type { FastifyReply, FastifyRequest } from "fastify";
import { client } from "..";
import { readKey } from "../config/config.reader";
import type Eris from "eris";

export default class {
  static handle(req: FastifyRequest, res: FastifyReply) {
    const commit_body = JSON.parse(req.body as string);
    const commit_hash = commit_body.head_commit.id;
    console.log(commit_body, commit_hash);
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
