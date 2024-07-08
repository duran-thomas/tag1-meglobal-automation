import Page from "../Login/page";

class FindAnInvestigatorBlockPage extends Page {
    public get configBlock() {
        return $(".ui-draggable-handle");
    }

    public get btnAddBlock() {
        return $("#edit-actions-submit");
    }

    public get successMsg() {
        return $(".mf-alert__container--success");
    }

    public get btnSaveLayout() {
        return $("#edit-submit");
    }

    public get inputSearchName() {
        return $("#find_an_investigator");
    }

    public btnSearchInvestigator(id: string) {
        return $(`#${id} button[data-analytics-click-text="search"]`);
    }

    public get investigatorName() {
        return $("h2.phynd-title-h2");
    }

    public async createFindAnInvestigatorBlock() {
        await browser.waitForCustomFrame(
            'iframe[name="lbim-dialog-iframe"]',
            5000
        );
        await (await this.btnAddBlock).waitForDisplayed();
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }
}

export default new FindAnInvestigatorBlockPage();
