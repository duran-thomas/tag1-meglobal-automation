import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class InlineNavigationBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout () {
        return $('#edit-submit');
    }

    public get inputTitle () {
        return $('#edit-settings-label');
    }

    public get inputLabel () {
        return $('#edit-settings-block-form-field-content-0-subform-field-label-0-value');
    }

    public get inputHeadline () {
        return $('#edit-settings-block-form-field-content-0-subform-field-text-headline-0-value');
    }

    public get inputLinkText () {
        return $('#edit-settings-block-form-field-content-0-subform-field-links-0-title');
    }

    public get inputURL () {
        return $('#edit-settings-block-form-field-content-0-subform-field-links-0-uri');
    }

    public get inputID () {
        return $('#edit-settings-block-form-field-id-0-value');
    }

    public get btnAddBlock () {
        return $('#edit-actions-submit');
    }

    public get configBlock () {
        return $('.ui-draggable-handle');
    }

    public get successMsg () {
        return $('.mf-alert__container--success');
    }

    public get inlineNavElement () {
        return $('.mf-inline-navigation');
    }

    public get inlineLink () {
        return $('=Google');
    }

    //freeform selectors
    public get dropdownToggle () {
        return $('.dropbutton__toggle');
    }

    public get dropdownInlineLink () {
        return $('.add-more-button-inline-navigation');
    }

    public get inputLabel1 () {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-label-0-value"]');
    }

    public get inputHeadline1 () {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-text-headline-0-value"]');
    }

    public get inputLinkText1 () {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-links-0-title"]');
    }

    public get inputURL1 () {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-links-0-uri"]');
    }


    /**
     * Helper methods to create Inline Navigation Component
     */

    public async createExtInlineNav(title: string, label: string, headline: string,  linkText: string, url: string, id: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitle).setValue(title);
        (await this.inputLabel).scrollIntoView();
        (await this.inputLabel).setValue(label);
        (await this.inputHeadline).setValue(headline);
        (await this.inputLinkText).scrollIntoView();
        (await this.inputLinkText).setValue(linkText);
        (await this.inputURL).setValue(url);
        (await this.inputID).scrollIntoView();
        (await this.inputID).setValue(id);
        await browser.pause(2000);
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).waitForDisplayed();
        (await this.btnSaveLayout).scrollIntoView();
        (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createIntInlineNav(title: string, label: string, headline: string, intLinkText: string, intUrl:string, id: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitle).setValue(title);
        (await this.inputLabel).scrollIntoView();
        (await this.inputLabel).setValue(label);
        (await this.inputHeadline).setValue(headline);
        (await this.inputLinkText).scrollIntoView();
        (await this.inputLinkText).setValue(intLinkText);
        (await this.inputURL).setValue(intUrl);
        (await this.inputID).scrollIntoView();
        (await this.inputID).setValue(id);
        await browser.pause(2000);
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).waitForDisplayed();
        (await this.btnSaveLayout).scrollIntoView();
        (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createInlineNavFragment(title: string, label: string, headline: string,  linkText: string, jumpUrl: string, id: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitle).setValue(title);
        (await this.inputLabel).scrollIntoView();
        (await this.inputLabel).setValue(label);
        (await this.inputHeadline).setValue(headline);
        (await this.inputLinkText).scrollIntoView();
        (await this.inputLinkText).setValue(linkText);
        (await this.inputURL).setValue(jumpUrl);
        (await this.inputID).scrollIntoView();
        (await this.inputID).setValue(id);
        await browser.pause(2000);
        (await this.btnAddBlock).click();
    }

    public async createFreeformInlineNav(title: string, label: string, headline: string,  linkText: string, url: string, id: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitle).setValue(title);
        (await this.dropdownToggle).scrollIntoView();
        (await this.dropdownToggle).click();
        (await this.dropdownInlineLink).click();
        await browser.pause(1500);
        (await this.inputLabel1).scrollIntoView();
        (await this.inputLabel1).setValue(label);
        (await this.inputHeadline1).setValue(headline);
        (await this.inputLinkText1).scrollIntoView();
        (await this.inputLinkText1).setValue(linkText);
        (await this.inputURL1).setValue(url);
        (await this.inputID).scrollIntoView();
        (await this.inputID).setValue(id);
        await browser.pause(2000);
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).waitForDisplayed();
        (await this.btnSaveLayout).scrollIntoView();
        (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }


}

export default new InlineNavigationBlockPage();
