## ロードマップ
- [x] 「ハローワールド」表示のエクステンションの書き出し  
    参考: https://techblog.gmo-ap.jp/2020/12/28/vscode-extension-dev/  
    
    プロジェクトの作成
    ```
    npm install yo generator-code --save-dev
    npx yo code
    ```
    パッケージ出力
    ```
    npm install vsce --save-dev
    npx vsce package
    ```
    F5デバッグモードで実行可能だが、package.jsonの設定で./outディレクトリが必要。
    パッケージ出力を行うことで./outを出力可能

    パッケージをマーケットプレイスに公開せずにインストール
    ```
    code --install-extension markdown-linker-0.0.1.vsix
    ```
    その他詳しくは`vsc-extension-quickstart.md`を参照

- [x] マークダウンファイル操作時のみアクティベート  
    参考: https://webdesign.vdlz.xyz/Editor/VSCode/Doc/ExtensionAuthoring/Doc029_Example-WordCount.html

- [x] マークダウンでテキスト選択時にのみ、コマンド実行
    ```json
    "keybindings": [
        {
            "command": "Change URL",
            "key": "ctrl+u",
            "mac": "cmd+u",
            "when": "editorHasSelection && resourceLangId == markdown"
        }
    ]
    ```

- [ ] 選択したURLをインフォメーションメッセージに表示  
    おそらく使わないが一応  
    ```ts
    // エディタ内の情報取得 ============================================================
    const doc = editor.document;
    if (doc.languageId !== "markdown") {
        return;
    }
    
    // 選択部分の情報取得 ===============================================================
    const selection = editor.selection;
    if (selection.isEmpty) {
        return;
    }
    ```
- [x] 選択したURLをマークダウンのリンク形式に変換
- [x] 選択したURLをマークダウンのリンク形式に変換の際にサイト名とページタイトルを取得して[]に書き込む機能を追加
