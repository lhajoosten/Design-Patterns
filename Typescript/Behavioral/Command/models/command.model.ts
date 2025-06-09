export interface Command {
    execute(): void;
    undo(): void;
    getDescription(): string;
}

export interface CommandHistory {
    executeCommand(command: Command): void;
    undo(): boolean;
    redo(): boolean;
    getHistory(): string[];
}