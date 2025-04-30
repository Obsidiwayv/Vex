export interface WLChannelObject {
    channel: string;
    locked: string;
}

export interface ReminderDatabaseObj {
    user: string;
    channel: string;
    time: string;
}

export interface ReactionRolesObj {
    message_id: string;
    emoji: string;
    role_id: string;
}