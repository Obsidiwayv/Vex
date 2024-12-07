import type { BaseCommand } from "./commands/Base";

export const ccmap = new Map<string, BaseCommand>();

export function RegisterCommand(name: string, cclass: BaseCommand, aliases?: string[]) {
    ccmap.set(name, cclass);
    if (aliases) {
        aliases.forEach(a => ccmap.set(a, cclass));
    }
}

/**
 * A function to check if the alias is already registered
 */
export function checkAliases(names: string[]) {
    names.forEach(n => {
        if (ccmap.get(n)) throw new Error("Command Alias already exists");
    });
    return names;
}