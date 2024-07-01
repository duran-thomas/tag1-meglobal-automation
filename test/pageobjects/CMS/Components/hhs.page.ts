import Page from "../Login/page";

class HHSBlockPage extends Page {
    public get inputHHSID() {
        return $("#edit-settings-hhs-id");
    }

    public get configBlock() {
        return $(".ui-draggable-handle");
    }

    public get btnAddBlock() {
        return $("#edit-actions-submit");
    }

    public get btnSaveLayout() {
        return $("#edit-submit");
    }

    public imgHeart(id: string) {
        return $(`#${id} figure[role="group"]`);
    }

    public async createHHSComponent(id: string) {
        await browser.waitForCustomFrame(
            'iframe[name="lbim-dialog-iframe"]',
            5000
        );
        await (await this.inputHHSID).setValue(id);
        await browser.pause(1500);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }
}

export default new HHSBlockPage();
