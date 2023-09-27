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

    public get progressIndicatorElement() {
        return $('.mf-progress-indicator');
    }

    public get indicatorTextElement() {
        return $('.absolute.inset-0.flex');
    }

    /**
     * Helper methods to create Progress Indicator Component
     */

    public async createDefaultProgressIndicator(title: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputAdminTitle).setValue(title);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createMinimalProgressIndicator(title: string, value: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputAdminTitle).setValue(title);
        await (await this.inputPercentage).setValue(value);
        await (await this.dropdownStyling).click();
        await (await this.dropdownTheme).waitForDisplayed({timeout:3000});
        await (await this.dropdownTheme).selectByVisibleText('minimal');
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createFullProgressIndicator(title: string, value: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputAdminTitle).setValue(title);
        await (await this.inputPercentage).setValue(value);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

}

export default new ProgressIndicatorBlockPage();
