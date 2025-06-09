import { Command } from "../Models/command.model";
import { TextEditor } from "../TextEditor";

export class DeleteTextCommand implements Command {
    private deletedText: string = '';

    constructor(
        private editor: TextEditor,
        private startPosition: number,
        private length: number
    ) { }

    execute(): void {
        this.deletedText = this.editor.deleteText(this.startPosition, this.length);
    }

    undo(): void {
        this.editor.insertText(this.deletedText, this.startPosition);
    }

    getDescription(): string {
        return `Delete ${this.length} characters from position ${this.startPosition}`;
    }
}
