import Fastify from "fastify";
import { readKey } from "./config/config.reader";
import GithubListener from "./listeners/GithubListener";

const app = Fastify({ logger: true });
const port = readKey("PORT");

app.get("/webhooks/post", (req, res) => {
  if (!GithubListener.validate(req)) {
    return;
  }
  // Make sure github gets the code
  res.status(202).send("Accepted");
  GithubListener.handle(req, res);
});

app.listen({ port: port.int() });
