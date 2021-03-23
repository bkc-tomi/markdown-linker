import { window, TextEditor, TextDocument, Selection} from "vscode";

export function getActiveEditor(): TextEditor | null {
    const editor = window.activeTextEditor;
    if (!editor) {
        window.showInformationMessage("アクティブなウィンドウがありません。");
        return null;
    }
    return editor;
}

export function getSelectURL(doc: TextDocument, selection: Selection):string | null {
    let selectURL: string = "";

    const temp = doc.getText(selection);
    // URLかどうかの判定
    if (temp.indexOf("http://") !== 0 && temp.indexOf("https://") !== 0) {
        window.showInformationMessage("URLを選択してください。");
        return null;
    }
    selectURL = temp;
    return selectURL;
}