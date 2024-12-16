import Eris, { Client } from "eris";
import { debugMode, readKey } from "./config/config.reader";
import { crashReport, debug, log } from "./logger";
import { voiceJoin } from "./listeners/VoiceEvents";
import { isEnabled } from "./check";
if (isEnabled(readKey("ENABLE_SERVER").str())) {
  require("./server");
}
import MessageCreateListener from "./listeners/MessageCreateListener";
import { checkAliases, RegisterCommand } from "./CommandRegistry";
import { GeminiCommand } from "./commands/Gemini";

import "./jobs/sendModLogs";
import MessageDeleteListener from "./listeners/MessageDeleteListener";

export const messageDeletedMap: Array<{
  id: string;
  name: string;
  messages: string[];
  attachments: Eris.Attachment[];
}> = [];

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
    "guildMessages"
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
  debug("Registering commands");
  {
    RegisterCommand("ai", new GeminiCommand(), checkAliases(["g"]));
  }
}

function listenToEvents(client: Eris.Client) {
  client.on("voiceChannelJoin", (m, c) => voiceJoin(m, c, client));
  //client.on("guildMemberAdd", MemberJoin);
  client.on("messageDelete", (m: any) => MessageDeleteListener(m))
  client.on("messageCreate", (m: any) => MessageCreateListener(m));
  client.on("error", (e) => debug(e.message));
  client.on("warn", (msg) => debug(msg));
}

start();
