import Page from "../Login/page";

class ContentProxyBlockPage extends Page {
    public get firstParagraphText() {
        return $$("div.mainContent p")[0];
    }

    public get linkTag() {
        return $('link[rel="canonical"]');
    }

    public get metaTag() {
        return $('meta[name="description"]');
    }

    public get titleTag() {
        return $$("title")[0];
    }
}

export default new ContentProxyBlockPage();
