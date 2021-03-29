import * as vscode from 'vscode';
import { getActiveEditor, getSelectURL, generateSnippet } from "./utils/vscodes";
import { getTitle } from "./utils/communication";

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "markdown-linker" is now active!');

	const linkController = new LinkController();

	let disposableShow = vscode.commands.registerCommand('extension.showURL', () => {
		linkController.showURL();
	});

	let disposableReplace = vscode.commands.registerCommand('extension.replaceURL', () => {
		linkController.replaceURL();
	});

	context.subscriptions.push(linkController);
	context.subscriptions.push(disposableShow);
	context.subscriptions.push(disposableReplace);
}

class LinkController {
	private _disposable: vscode.Disposable;
	
	constructor () {
		let subscriptions: vscode.Disposable[] = [];
		this._disposable = vscode.Disposable.from(...subscriptions);
	}

	public async replaceURL() {
		// アクティブエディタの取得 =========================================================
		const editor = getActiveEditor();
		if (editor === null) return;

		// エディタ内の情報取得 ============================================================
		const doc        = editor.document;

		// 選択部分の情報取得 ===============================================================
		const selection  = editor.selection;
		const url = getSelectURL(doc, selection);
		if (url === null) return;

		// リンク情報の取得 ================================================================
		const titles = await getTitle(url);

		// スニペットの作成 ================================================================
		if (titles.length === 1) {
			// エラー処理
			vscode.window.showInformationMessage(titles[0]);
			return;
		}
		const snippets = generateSnippet(titles, url);
		
		// スニペットの適用
		editor.insertSnippet(snippets);
	}

	public async showURL() {
		// アクティブエディタの取得 =========================================================
		const editor = getActiveEditor();
		if (editor === null) return;

		// エディタ内の情報取得 ============================================================
		const doc        = editor.document;

		// 選択部分の情報取得 ==============================================================
		const selection  = editor.selection;
		const url = getSelectURL(doc, selection);
		if (url === null) return;

		// リンク情報の取得 ================================================================
		const title = await getTitle(url);
		
		// 取得したサイト情報の表示 =========================================================
		// vscode.window.showInformationMessage();
	}

	dispose() {
        this._disposable.dispose();
    }
}


export function deactivate() {}
