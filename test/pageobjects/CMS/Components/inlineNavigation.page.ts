import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class InlineNavigationBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout() {
        return $('#edit-submit');
    }

    public get inputTitle() {
        return $('#edit-settings-label');
    }

    public get inputLabel() {
        return $('#edit-settings-block-form-field-content-0-subform-field-label-0-value');
    }

    public get inputHeadline() {
        return $('#edit-settings-block-form-field-content-0-subform-field-text-headline-0-value');
    }

    public get inputLinkText() {
        return $('#edit-settings-block-form-field-content-0-subform-field-links-0-title');
    }

    public get inputURL() {
        return $('#edit-settings-block-form-field-content-0-subform-field-links-0-uri');
    }

    public get inputID() {
        return $('#edit-settings-block-form-field-id-0-value');
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

    public get inlineNavElement() {
        return $('.mf-inline-navigation');
    }

    public get inlineLink() {
        return $('=Google');
    }

    //freeform selectors
    public get dropdownToggle() {
        return $('.dropbutton__toggle');
    }

    public get dropdownInlineLink() {
        return $('.add-more-button-inline-navigation');
    }

    public get inputLabel1() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-label-0-value"]');
    }

    public get inputHeadline1() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-text-headline-0-value"]');
    }

    public get inputLinkText1() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-links-0-title"]');
    }

    public get inputURL1() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-links-0-uri"]');
    }


    /**
     * Helper methods to create Inline Navigation Component
     */

    public async createExtInlineNav(title: string, label: string, headline: string, linkText: string, url: string, id: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputTitle).setValue(title);
        await (await this.inputLabel).scrollIntoView();
        await (await this.inputLabel).setValue(label);
        await (await this.inputHeadline).setValue(headline);
        await (await this.inputLinkText).scrollIntoView();
        await (await this.inputLinkText).setValue(linkText);
        await (await this.inputURL).setValue(url);
        await (await this.inputID).scrollIntoView();
        await (await this.inputID).setValue(id);
        await browser.pause(2000);
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createIntInlineNav(title: string, label: string, headline: string, intLinkText: string, intUrl: string, id: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputTitle).setValue(title);
        await (await this.inputLabel).scrollIntoView();
        await (await this.inputLabel).setValue(label);
        await (await this.inputHeadline).setValue(headline);
        await (await this.inputLinkText).scrollIntoView();
        await (await this.inputLinkText).setValue(intLinkText);
        await (await this.inputURL).setValue(intUrl);
        await (await this.inputID).scrollIntoView();
        await (await this.inputID).setValue(id);
        await browser.pause(2000);
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createInlineNavFragment(title: string, label: string, headline: string, linkText: string, jumpUrl: string, id: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputTitle).setValue(title);
        await (await this.inputLabel).scrollIntoView();
        await (await this.inputLabel).setValue(label);
        await (await this.inputHeadline).setValue(headline);
        await (await this.inputLinkText).scrollIntoView();
        await (await this.inputLinkText).setValue(linkText);
        await (await this.inputURL).setValue(jumpUrl);
        await (await this.inputID).scrollIntoView();
        await (await this.inputID).setValue(id);
        await browser.pause(2000);
        await (await this.btnAddBlock).click();
    }

    public async createFreeformInlineNav(title: string, label: string, headline: string, linkText: string, url: string, id: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputTitle).setValue(title);
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.dropdownInlineLink).click();
        await browser.pause(1500);
        await (await this.inputLabel1).scrollIntoView();
        await (await this.inputLabel1).setValue(label);
        await (await this.inputHeadline1).setValue(headline);
        await (await this.inputLinkText1).scrollIntoView();
        await (await this.inputLinkText1).setValue(linkText);
        await (await this.inputURL1).setValue(url);
        await (await this.inputID).scrollIntoView();
        await (await this.inputID).setValue(id);
        await browser.pause(2000);
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }


}

export default new InlineNavigationBlockPage();
