import Fastify from "fastify";
import { readKey } from "./config/config.reader";
import GithubListener from "./listeners/GithubListener";

const app = Fastify({ logger: true });
const port = readKey("PORT");
const host = readKey("HOST");

app.post("/webhooks/post", (req, res) => {
  if (!GithubListener.validate(req)) {
    return res.status(400).send("Invalid request");
  }
  GithubListener.handle(req, res);
  // Make sure github gets the code
  res.status(202).send("Accepted");
});

app.listen({ port: port.int(), host: host.str() });
