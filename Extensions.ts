import { GoogleGenerativeAI } from "@google/generative-ai";
import { ReadKey } from "./config/config.reader.ts";

import wget from "wget";
import { debug } from "./logger.ts";

export class GeminiExtension {
    private static API_KEY = ReadKey("GEMINI_API_KEY");
    private static MODEL = ReadKey("GEMINI_MODEL_TYPE");

    public static init() {
        const genAI_base = new GoogleGenerativeAI(this.API_KEY.Str());
        return genAI_base.getGenerativeModel({ model: this.MODEL.Str()});
    }

    public async createResponse(content: string) {
        const genAI = GeminiExtension.init();
        return await genAI.generateContent(content);
    }
}

export class SCPExtension {
    public getSCPIndexFile() {
        wget.download("https://scp-data.tedivm.com/data/scp/items/index.json", ".files/index.json")
            .on("error", debug("Unable to download SCP index"));
    }
}