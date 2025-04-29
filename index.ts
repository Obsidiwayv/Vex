import Eris, { Client } from "eris";
import { debugMode, ReadKey } from "./config/config.reader.ts";
import { crashReport, debug, log } from "./logger.ts";
import {voiceJoin, VoiceStatusUpdate} from "./listeners/VoiceEvents.ts";
import { isEnabled } from "./check.ts";
if (isEnabled(ReadKey("ENABLE_SERVER").Str())) {
  import("./server.ts");
}
import MessageCreateListener from "./listeners/MessageCreateListener.ts";
import { checkAliases, RegisterCommand } from "./CommandRegistry.ts";
import { GeminiCommand } from "./commands/Gemini.ts";
import Ban from "./commands/mod/Ban.ts";
import Kick from "./commands/mod/Kick.ts";

import MessageDeleteListener from "./listeners/MessageDeleteListener.ts";
import MessageEditListener from "./listeners/MessageEditListener.ts";
import { createPool } from "mariadb";
//import WLCommand from "./commands/WL.ts";
//import Reaction from "./listeners/common/Reaction.ts";
import {SnowTransfer} from "snowtransfer";
import {PlasmaEmojis} from "./config/Emoji.ts";
import MessageBulkDeleteListener from "./listeners/MessageBulkDeleteListener.ts";
import Mods from "./commands/Mods.ts";
import RobloxSearch from "./commands/RobloxSearch.ts";
import WordBlacklist from "./commands/blacklist/WordBlacklist.ts";
import Embed from "./commands/Embed.ts";


const token = ReadKey("TKN");
if (token.Unknown()) {
  log("'TKN' is unknown and will throw an error");
}

export const client = new Client(token.Str(), {
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

export const rest = new SnowTransfer(token.Str());

export const database = createPool(ReadKey("DB_STRING").Str());
export const contentFilterDB = createPool(ReadKey("DB_WORDS_BLACKLIST").Str());

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
    RegisterCommand("ai", new GeminiCommand(), checkAliases(["g", "gemini"]));
    RegisterCommand("ban", new Ban());
    RegisterCommand("kick", new Kick());
    //RegisterCommand("wl", new WLCommand());
    RegisterCommand("mods", new Mods());
    RegisterCommand("rsearch", new RobloxSearch());
    RegisterCommand("blacklist", new WordBlacklist());
    RegisterCommand("embed", new Embed(), checkAliases(["e"]));
  }
}

function listenToEvents(client: Eris.Client) {
  client.on("voiceChannelJoin", (m, c) => voiceJoin(m, c, client));
  //client.on("guildMemberAdd", MemberJoin);
  client.on("messageDelete", (m: any) => MessageDeleteListener(m));
  client.on("messageDeleteBulk", MessageBulkDeleteListener);
  client.on("messageCreate", (m: any) => MessageCreateListener(m));
  // m_o might be uncached but all we need it for the content anyway
  client.on("messageUpdate", (m_n: any, m_o: any) => MessageEditListener(m_n, m_o));
  // client.on("messageReactionAdd", (message: any, emoji) => Reaction({ message, emoji }, false));
  // client.on("messageReactionRemove", (message: any, emoji) => Reaction({ message, emoji }, true));
    client.on("voiceChannelStatusUpdate", (c_o, c_n) => VoiceStatusUpdate(c_o, c_n));
  client.once("ready", OnReady);
  client.on("error", (e) => debug(e.message));
  client.on("warn", (msg) => debug(msg));
}

start();
