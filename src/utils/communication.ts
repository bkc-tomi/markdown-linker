import axios from "axios";
import { URL } from "url";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;


export async function fetchHTML(link: string) {
    // 引数の判定 =======================================================
    if (link.indexOf("http://") !== 0 && link.indexOf("https://") !== 0) {
        return [null, null];
    }
    // URL解析 ========================================================
    const url = new URL(link);
    // フェッチ処理 =====================================================
    const pageData = await axios.get(url.href)
    .then(res => {
        return res.data;
    })
    .catch(e => {
        console.log(e);
        return null;
    });

    const homepageData = await axios.get(url.origin)
    .then(res => {
        return res.data;
    })
    .catch(e => {
        console.log(e);
        return null;
    });

    // 返還 ============================================================
    return [pageData, homepageData];
}

export function getTitleFromHTML(html: any): string | null {
    const doms = new JSDOM(html);
    let title: string = "";

    // titleタグ取得 ====================================================
    title = String(doms.window.document.title);
    // 返還 
    if (title) {
        return String(title);
    }

    // metaタグ取得 =====================================================
    title = "";
    const metas = doms.window.document.getElementsByTagName('meta');
    // propertyタイプから取得
    for (let i = 0; i < metas.length; i++) {
        let pro = metas[i].getAttribute("property");
        if (typeof pro === "string") {
            if (pro.match("title")) title = metas[i].getAttribute("content");
        }
    }
    // nameタイプから取得
    for (let i = 0; i < metas.length; i++) {
        let pro = metas[i].getAttribute("name");
        if (typeof pro == "string") {
            if (pro.match("title")) title = metas[i].getAttribute("content");
        }
    }

    // 返還 
    if (!title) return null;
    return String(title);
}

export async function getTitle(link: string) {
    let pageTitle     = "";
    let homepageTitle = "";

    // htmlデータフェッチ ======================================================
    const [page, homepage] = await fetchHTML(link);

    // ページタイトル取得失敗 ====================================================
    if (page === null && homepage === null) {
        return ["ページ情報が取得出来ませんでした。"];
    }

    // タイトル取得 =============================================================
    // 該当ページ
    if (page !== null) {
        var temp = getTitleFromHTML(page);
        if (temp !== null) {
            pageTitle = temp;
        }
    }
    // ホームページ
    if (homepage !== null) {
        var temp = getTitleFromHTML(homepage);
        if (temp !== null) {
            homepageTitle = temp;
        }
    }
    // タイトル生成 =============================================================
    let title: string;
    title = pageTitle ? pageTitle : "";
    title = homepageTitle ? `${ title } | ${ homepageTitle }` : title;
    if (title === "") {
        return ["タイトル情報が取得出来ませんでした。"];
    }
    return [title, pageTitle, homepageTitle];
}