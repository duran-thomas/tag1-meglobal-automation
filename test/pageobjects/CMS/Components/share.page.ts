import Page from "../Login/page";

class ShareBlockPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get inputAdminTitle() {
        return $(`input[data-drupal-selector="edit-settings-label"]`);
    }

    public get checkBoxPinterest() {
        return $(
            "#edit-settings-block-form-field-content-0-subform-field-social-links-pinterest"
        );
    }

    public get btnAddBlock() {
        return $("#edit-actions-submit");
    }

    public get configBlock() {
        return $(".ui-draggable-handle");
    }

    public get shareComponent() {
        return $(".mf-share");
    }

    public get btnSaveLayout() {
        return $("#edit-submit");
    }

    public async createShareComponent(title: string) {
        await browser.waitForCustomFrame(
            'iframe[name="lbim-dialog-iframe"]',
            5000
        );
        await (await this.inputAdminTitle).setValue(title);
        await (await this.checkBoxPinterest).click();
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }
}

export default new ShareBlockPage();
