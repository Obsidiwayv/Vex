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

import MessageDeleteListener from "./listeners/MessageDeleteListener";
import MessageEditListener from "./listeners/MessageEditListener";
import { createPool } from "mariadb";
import WLCommand from "./commands/WL";


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

export const database = createPool(readKey("DB_STRING").str());

async function start() {
  debug("attempting to start the bot");
  log(`Starting bot (${debugMode() ? "Debug mode" : "Debug disabled"})`);
  await client.connect().catch(crashReport);
  debug("Starting event listeners");
  listenToEvents(client);
  debug("Registering commands");
  {
    RegisterCommand("ai", new GeminiCommand(), checkAliases(["g"]));
    RegisterCommand("wl", new WLCommand());
  }
}

function listenToEvents(client: Eris.Client) {
  client.on("voiceChannelJoin", (m, c) => voiceJoin(m, c, client));
  //client.on("guildMemberAdd", MemberJoin);
  client.on("messageDelete", (m: any) => MessageDeleteListener(m))
  client.on("messageCreate", (m: any) => MessageCreateListener(m));
  // m_o might be uncached but all we need it for the content anyway
  client.on("messageUpdate", (m_n: any, m_o: any) => MessageEditListener(m_n, m_o));
  client.on("error", (e) => debug(e.message));
  client.on("warn", (msg) => debug(msg));
}

start();
