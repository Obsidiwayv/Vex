import Eris, { Client } from "eris";
import { readKey } from "./config/config.reader";
import { crashReport, debug, log } from "./logger";
import { voiceJoin } from "./listeners/VoiceEvents";

async function start() {
  const token = readKey("TKN");
  if (token.unknown()) {
    log("'TKN' is unknown and will throw an error");
  }

  const client = new Client(token.str(), {
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

  debug("attempting to start the bot");
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
