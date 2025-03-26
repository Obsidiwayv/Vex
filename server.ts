//import Fastify from "fastify";
import { readKey } from "./config/config.reader.ts";
import GithubListener from "./listeners/GithubListener.ts";

// Fastify isn't supported in Deno
//const app = Fastify({ logger: true });
const port = readKey("PORT");
const host = readKey("HOST");

const GITHUB_ROUTE = new URLPattern({ pathname: "/webhooks/post" });

// app.post("/webhooks/post", (req, res) => {
//   if (!GithubListener.validate(req)) {
//     return res.status(400).send("Invalid request");
//   }
//   console.log(req.body);
//   GithubListener.handle(req, res);
//   // Make sure github gets the code
//   res.status(202).send("Accepted");
// });
//
// app.listen({ port: port.int(), host: host.str() });

Deno.serve({
    port: port.int(),
    hostname: host.str(),
    handler: (req) => {
        if (GITHUB_ROUTE.exec(req.url)) {
            if (!GithubListener.validate(req)) {
                return new Response("Invalid Request", { status: 400 });
            }
            GithubListener.handle(req);
//     Make sure GitHub gets the code
            return new Response("Accepted", { status: 200 });
        }
        return new Response("-1", { status: 400 });
    }
});