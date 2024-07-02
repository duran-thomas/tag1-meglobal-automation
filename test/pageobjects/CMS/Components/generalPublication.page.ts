import Page from "../Login/page";

class GeneralPublicationsBlockPage extends Page {
    public get configBlock() {
        return $(".ui-draggable-handle");
    }

    public get btnAddBlock() {
        return $("#edit-actions-submit");
    }

    public get btnSaveLayout() {
        return $("#edit-submit");
    }

    public get inputAdminTitle() {
        return $("#edit-settings-label");
    }

    public get dropDownGroupTitle() {
        return $("#edit-settings-block-form-field-group-title");
    }

    public async createGeneralPublicationComponent(title: string) {
        await browser.waitForCustomFrame(
            'iframe[name="lbim-dialog-iframe"]',
            5000
        );
        await (await this.inputAdminTitle).setValue(title);
        await (await this.dropDownGroupTitle).selectByIndex(1);
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

export default new GeneralPublicationsBlockPage();
