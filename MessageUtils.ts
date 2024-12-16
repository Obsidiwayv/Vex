export default class {
    static scrubMarkdown(cont: string) {
        return cont
            .replaceAll("\`", "\\`");
    }

    static block(cont: string) {
        return `\`\`\`${cont}\`\`\``;
    }
}