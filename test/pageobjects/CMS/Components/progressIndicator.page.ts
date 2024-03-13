import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProgressIndicatorBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout() {
        return $('#edit-submit');
    }

    public get inputAdminTitle() {
        return $('#edit-settings-label');
    }

    public get inputPercentage() {
        return $('#edit-settings-block-form-field-percentage-0-value');
    }

    public get dropdownStyling() {
        return $('#edit-settings-block-form-group-styling');
    }

    public get dropdownTheme() {
        return $('#edit-settings-block-form-field-theme');
    }

    public get btnAddBlock() {
        return $('#edit-actions-submit');
    }

    public get configBlock() {
        return $('.ui-draggable-handle');
    }

    public get successMsg() {
        return $('.mf-alert__container--success');
    }

    public progressIndicatorElement(id:string) {
        return $(`#${id} .mf-progress-indicator`);
    }

    public indicatorTextElement(id:string) {
        return $(`#${id} .absolute.inset-0.flex`);
    }

    /**
     * Helper methods to create Progress Indicator Component
     */

    public async createDefaultProgressIndicator(title: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputAdminTitle).setValue(title);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createMinimalProgressIndicator(title: string, value: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputAdminTitle).setValue(title);
        await (await this.inputPercentage).setValue(value);
        await (await this.dropdownStyling).click();
        await (await this.dropdownTheme).waitForDisplayed({timeout:3000});
        await (await this.dropdownTheme).selectByVisibleText('minimal');
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createFullProgressIndicator(title: string, value: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputAdminTitle).setValue(title);
        await (await this.inputPercentage).setValue(value);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

}

export default new ProgressIndicatorBlockPage();
