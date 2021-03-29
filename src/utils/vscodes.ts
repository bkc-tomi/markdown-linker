import { window, TextEditor, TextDocument, Selection, SnippetString} from "vscode";

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

/**
 * [ページタイトル - ホームページタイトル,ページタイトル,ホームページタイトル]  
 * の選択肢を含むスニペットを返す
 */
export function generateSnippet(titles: string[], url:string):SnippetString {
    const snippets = new SnippetString(`[`);
    const choice:string[] = [];
    titles.map(title => {
        // パイプラインが入ると選択肢が文字列になる
        const rep = title.replace("|", "-");
        choice.push(rep);
    });
    snippets.appendChoice(choice);
    snippets.appendText(`](${ url })`);
    return snippets;
}