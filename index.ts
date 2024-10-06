import Eris, { Client } from "eris";
import { debugMode, readKey } from "./config/config.reader";
import { crashReport, debug, log } from "./logger";
import { voiceJoin } from "./listeners/VoiceEvents";

import "./server";

const token = readKey("TKN");
if (token.unknown()) {
  log("'TKN' is unknown and will throw an error");
}

export const client = new Client(token.str(), {
  intents: [
    "guildMessageReactions",
    "guildVoiceStates",
    "guildMembers",
    "messageContent",
    "guilds",
  ],
  allowedMentions: {
    everyone: true,
  },
});

async function start() {
  debug("attempting to start the bot");
  log(`Starting bot (${debugMode() ? "Debug mode" : "Debug disabled"})`);
  await client.connect().catch(crashReport);
  debug("Starting event listeners");
  listenToEvents(client);
}

function listenToEvents(client: Eris.Client) {
  client.on("voiceChannelJoin", (m, c) => voiceJoin(m, c, client));
  client.on("error", (e) => debug(e.message));
  client.on("warn", (msg) => debug(msg));
}

start();
