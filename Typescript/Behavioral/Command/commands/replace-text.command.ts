import { Command } from "../Models/command.model";
import { TextEditor } from "../TextEditor";

export class ReplaceTextCommand implements Command {
    private originalText: string = '';

    constructor(
        private editor: TextEditor,
        private startPosition: number,
        private length: number,
        private newText: string
    ) { }

    execute(): void {
        this.originalText = this.editor.deleteText(this.startPosition, this.length);
        this.editor.insertText(this.newText, this.startPosition);
    }

    undo(): void {
        this.editor.deleteText(this.startPosition, this.newText.length);
        this.editor.insertText(this.originalText, this.startPosition);
    }

    getDescription(): string {
        return `Replace text at position ${this.startPosition}`;
    }
}
