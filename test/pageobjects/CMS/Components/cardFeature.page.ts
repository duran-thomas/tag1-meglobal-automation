import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CardFeatureBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout() {
        return $('#edit-submit');
    }

    public get inputTitle() {
        return $('#edit-settings-label');
    }

    public get inputHeadline() {
        return $$('div[role="textbox"]')[0];
    }

    public get inputEyebrow() {
        return $$('div[role="textbox"]')[1];
    }

    public get inputList() {
        return $('#edit-settings-block-form-field-content-0-subform-field-list-0-value');
    }

    public get inputButtonText() {
        return $('#edit-settings-block-form-field-content-0-subform-field-buttons-0-title');
    }

    public get inputURL() {
        return $('#edit-settings-block-form-field-content-0-subform-field-buttons-0-uri');
    }

    public get dropdownImage() {
        return $('#edit-field-image');
    }

    public get btnBrowse() {
        return $("input[type='file']");
    }

    public get inputAltText() {
        return $('input[id^="edit-inline-entity-form-field-media-image-0-alt-"]');
    }

    public get btnSaveImage() {
        return $('#edit-submit');
    }

    public get dropdownStyling() {
        return $('#edit-settings-block-form-field-content-widget-0-subform-group-styling');
    }

    public get dropdownContentPosition() {
        return $('#edit-settings-block-form-field-content-0-subform-field-content-position');
    }

    public get checkboxInset() {
        return $('#edit-settings-block-form-field-content-0-subform-field-inset-value');
    }

    public get dropdownDesktopAspectRatio() {
        return $('#edit-settings-block-form-field-content-0-subform-field-desktop-aspect-ratio');
    }

    public get dropdownMobileAspectRatio() {
        return $('#edit-settings-block-form-field-content-0-subform-field-mobile-aspect-ratio');
    }

    public get dropdownTheme() {
        return $('#edit-settings-block-form-field-content-0-subform-field-theme');
    }

    public get dropdownAlignment() {
        return $('#edit-settings-block-form-field-content-0-subform-field-alignment');
    }

    public get dropdownBackground() {
        return $('#edit-settings-block-form-field-content-0-subform-field-background');
    }

    public get checkboxMinimal() {
        return $('#edit-settings-block-form-field-content-0-subform-field-minimal-value');
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

    public get entityIframe() {
        return $('iframe[name="entity_browser_iframe_image_browser"]');
    }

    public get cardFeatureElement() {
        return $('.mf-card-feature');
    }

    public get cardFeatureImage() {
        return $('img[alt="Card Feature Alt Text"]');
    }

    public get internalUrl() {
        return $('=Residency Programs')
    }


    /**
     * Helper methods to create card feature Component
     */

    public async createCardFeature(title: string, headline: string, eyebrow: string, list: string, btnText: string, url: string, remoteFilePath: string, altText: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputTitle).setValue(title);
        await (await this.inputHeadline).scrollIntoView();
        await (await this.inputHeadline).setValue(headline);
        await (await this.inputEyebrow).setValue(eyebrow);
        await (await this.inputList).setValue(list);
        await (await this.inputButtonText).scrollIntoView();
        await (await this.inputButtonText).setValue(btnText);
        await (await this.inputURL).setValue(url);
        await (await this.dropdownImage).scrollIntoView();
        await (await this.dropdownImage).click();
        await browser.pause(2000);
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(4500); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText);
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(6000); //explicit waits seem to be necessary here
        await browser.switchToFrame(iframe);
        await browser.pause(4000); //explicit waits seem to be necessary here
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createCardFeatureInternal(title: string, headline: string, eyebrow: string, list: string, btnText: string, remoteFilePath: string, altText: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputTitle).setValue(title);
        await (await this.inputHeadline).scrollIntoView();
        await (await this.inputHeadline).setValue(headline);
        await (await this.inputEyebrow).setValue(eyebrow);
        await (await this.inputList).setValue(list);
        await (await this.inputButtonText).scrollIntoView();
        await (await this.inputButtonText).setValue(btnText);
        await (await this.inputURL).setValue('/education/residency');
        await (await this.dropdownImage).scrollIntoView();
        await (await this.dropdownImage).click();
        await browser.pause(2000);
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(4500); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText);
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(6000); //explicit waits seem to be necessary here
        await browser.switchToFrame(iframe);
        await browser.pause(4000); //explicit waits seem to be necessary here
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }


    public async navToStyling() {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await browser.pause(3000);
        await (await this.dropdownStyling).scrollIntoView();
        await (await this.dropdownStyling).click();
        await browser.pause(3000);
    }
}

export default new CardFeatureBlockPage();
