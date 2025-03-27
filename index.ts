import Eris, { Client } from "eris";
import { debugMode, readKey } from "./config/config.reader.ts";
import { crashReport, debug, log } from "./logger.ts";
import { voiceJoin } from "./listeners/VoiceEvents.ts";
import { isEnabled } from "./check.ts";
if (isEnabled(readKey("ENABLE_SERVER").str())) {
  import("./server.ts");
}
import MessageCreateListener from "./listeners/MessageCreateListener.ts";
import { checkAliases, RegisterCommand } from "./CommandRegistry.ts";
import { GeminiCommand } from "./commands/Gemini.ts";

import MessageDeleteListener from "./listeners/MessageDeleteListener.ts";
import MessageEditListener from "./listeners/MessageEditListener.ts";
import { createPool } from "mariadb";
import WLCommand from "./commands/WL.ts";
//import Reaction from "./listeners/common/Reaction.ts";
import {SnowTransfer} from "npm:snowtransfer@0.13.1";
import {PlasmaEmojis} from "./config/Emoji.ts";


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

export const rest = new SnowTransfer(token.str());

export const database = createPool(readKey("DB_STRING").str());

async function OnReady() {
  await PlasmaEmojis.GetAllFromRest();
}

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
  // client.on("messageReactionAdd", (message: any, emoji) => Reaction({ message, emoji }, false));
  // client.on("messageReactionRemove", (message: any, emoji) => Reaction({ message, emoji }, true));
  client.once("ready", OnReady);
  client.on("error", (e) => debug(e.message));
  client.on("warn", (msg) => debug(msg));
}
// stfu
start();
