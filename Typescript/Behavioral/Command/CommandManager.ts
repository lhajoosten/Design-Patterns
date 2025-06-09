import { CommandHistory, Command } from "./Models/command.model";

/**
 * CommandManager class implements the CommandHistory interface to manage a history of commands.
 * It allows executing commands, undoing and redoing actions, and maintaining a history of executed commands.
 */
export class CommandManager implements CommandHistory {
    private history: Command[] = [];
    private currentIndex: number = -1;
    private maxHistorySize: number = 50;

    executeCommand(command: Command): void {
        // Remove any commands after current index (for when we're in middle of history)
        this.history = this.history.slice(0, this.currentIndex + 1);

        // Execute the command
        command.execute();

        // Add to history
        this.history.push(command);
        this.currentIndex++;

        // Maintain max history size
        if (this.history.length > this.maxHistorySize) {
            this.history.shift();
            this.currentIndex--;
        }

        console.log(`✅ Executed: ${command.getDescription()}`);
    }

    undo(): boolean {
        if (this.currentIndex >= 0) {
            const command = this.history[this.currentIndex];
            command.undo();
            this.currentIndex--;
            console.log(`↩️ Undid: ${command.getDescription()}`);
            return true;
        }
        console.log('❌ Nothing to undo');
        return false;
    }

    redo(): boolean {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            const command = this.history[this.currentIndex];
            command.execute();
            console.log(`↪️ Redid: ${command.getDescription()}`);
            return true;
        }
        console.log('❌ Nothing to redo');
        return false;
    }

    getHistory(): string[] {
        return this.history.map((cmd, index) => {
            const marker = index === this.currentIndex ? '👉 ' : index <= this.currentIndex ? '✅ ' : '⏸️ ';
            return `${marker}${cmd.getDescription()}`;
        });
    }

    canUndo(): boolean {
        return this.currentIndex >= 0;
    }

    canRedo(): boolean {
        return this.currentIndex < this.history.length - 1;
    }
}