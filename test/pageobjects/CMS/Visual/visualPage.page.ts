import Page from "../Login/page";

class VisualTestPage extends Page {
    //Cancer page section elements
    public get mainHeroElem() {
        return $("div[data-analytics-item-title='New research.New discoveries.New options.']");
    }

    public get gridElements() {
        return $$(".mf-grid.gap-48");
    }

    //   public get() {
    //     return $("");
    //   }

    public get iframe() {
        return $("#hyro-frame");
    }

    public get btnRejectCookies() {
        return $("#onetrust-reject-all-handler");
    }

    public get btnClosePopup() {
        return $(".css-19ftm6o");
    }

    /**
    * Helper methods to clear window dialogs
    */

    public async closeDialogs() {
        await (await this.btnRejectCookies).waitForClickable();
        await (await this.btnRejectCookies).click();
        await (await this.iframe).waitForExist({timeout:5000});
        const frame = await this.iframe;
        await browser.switchToFrame(frame);
        await (await this.btnClosePopup).waitForDisplayed();
        await (await this.btnClosePopup).click();
        await browser.switchToParentFrame();
    }

}

export default new VisualTestPage();
