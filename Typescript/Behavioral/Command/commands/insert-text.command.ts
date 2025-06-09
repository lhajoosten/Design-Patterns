import { Command } from "../Models/command.model";
import { TextEditor } from "../TextEditor";

export class InsertTextCommand implements Command {
    constructor(
        private editor: TextEditor,
        private text: string,
        private position: number
    ) { }

    execute(): void {
        this.editor.insertText(this.text, this.position);
    }

    undo(): void {
        this.editor.deleteText(this.position, this.text.length);
    }

    getDescription(): string {
        return `Insert "${this.text}" at position ${this.position}`;
    }
}