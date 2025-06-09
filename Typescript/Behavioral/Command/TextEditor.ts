/**
 * TextEditor.ts
 * This module defines a simple text editor class that allows inserting and deleting text,
 * managing cursor position, and retrieving the current content.
*/
export class TextEditor {
    private content: string = '';
    private cursorPosition: number = 0;

    insertText(text: string, position?: number): void {
        const pos = position ?? this.cursorPosition;
        this.content = this.content.slice(0, pos) + text + this.content.slice(pos);
        this.cursorPosition = pos + text.length;
    }

    deleteText(startPos: number, length: number): string {
        const deletedText = this.content.slice(startPos, startPos + length);
        this.content = this.content.slice(0, startPos) + this.content.slice(startPos + length);
        this.cursorPosition = startPos;
        return deletedText;
    }

    getContent(): string {
        return this.content;
    }

    getCursorPosition(): number {
        return this.cursorPosition;
    }

    setCursorPosition(position: number): void {
        this.cursorPosition = Math.max(0, Math.min(position, this.content.length));
    }
}