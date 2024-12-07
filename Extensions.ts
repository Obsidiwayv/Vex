import { GoogleGenerativeAI } from "@google/generative-ai";
import { readKey } from "./config/config.reader";

export class GeminiExtension {
    private static API_KEY = readKey("GEMINI_API_KEY");
    private static MODEL = readKey("GEMINI_MODEL_TYPE");

    public static init() {
        const genAI_base = new GoogleGenerativeAI(this.API_KEY.str());
        return genAI_base.getGenerativeModel({ model: this.MODEL.str() });
    }

    public async createResponse(content: string) {
        const genAI = GeminiExtension.init();
        return await genAI.generateContent(content);
    }
}