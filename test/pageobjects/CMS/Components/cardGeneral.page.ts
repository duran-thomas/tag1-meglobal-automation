import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CardGeneralBlockPage extends Page {
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
        return $('#edit-field-media-entity');
    }

    public get btnBrowse() {
        return $("input[type='file']");
    }

    public get inputAltText() {
        return $('input[id^="edit-inline-entity-form-field-media-image-0-alt"]');
    }

    public get btnSaveImage() {
        return $('#edit-submit');
    }

    public get dropdownStyling() {
        return $('#edit-settings-block-form-field-content-widget-0-subform-group-styling');
    }

    public get dropdownSite() {
        return $('#edit-settings-block-form-field-content-0-subform-field-site');
    }

    public get checkboxFill() {
        return $('#edit-settings-block-form-field-content-0-subform-field-fill-value');
    }

    public get dropdownContentPosition() {
        return $('#edit-settings-block-form-field-content-0-subform-field-content-position');
    }

    public get dropdownContentSize() {
        return $('#edit-settings-block-form-field-content-0-subform-field-content-size');
    }

    public get dropdownContentPadding() {
        return $('#edit-settings-block-form-field-content-0-subform-field-content-padding');
    }

    public get dropdownContentBackground() {
        return $('#edit-settings-block-form-field-content-0-subform-field-background');
    }

    public get dropdownMobileAspectRatio() {
        return $('#edit-settings-block-form-field-content-0-subform-field-mobile-aspect-ratio');
    }

    public get dropdownDesktopAspectRatio() {
        return $('#edit-settings-block-form-field-content-0-subform-field-desktop-aspect-ratio');
    }

    public get dropdownTheme() {
        return $('#edit-settings-block-form-field-content-0-subform-field-theme');
    }

    public get dropdownAlignment() {
        return $('#edit-settings-block-form-field-content-0-subform-field-alignment');
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
        return $('#entity_browser_iframe_image_and_video');
    }

    public cardGeneralElement(id:string) {
        return $(`#${id} .mf-card-general`);
    }

    public cardEyebrow(id:string) {
        return $(`#${id} .mf-text-body-4-serif`);
    }

    public get headlineOptions() {
        return $('summary[class="claro-details__summary"]');
    }

    public get dropdownRenderAs() {
        return $('#edit-settings-block-form-field-content-0-subform-field-rich-headline-0-more-options-render-as');
    }

    public get dropdownButtonOptions() {
        return $('summary[aria-controls="edit-settings-block-form-field-content-0-subform-field-buttons-0-link-options"]');
    }

    public get dropdownTarget() {
        return $('#edit-settings-block-form-field-content-0-subform-field-buttons-0-link-options-target');
    }

    /**
     * Helper methods to create Card General Component
     */

    public async createCardGeneral(title: string, headline: string, eyebrow: string, list: string, btnText: string, url: string, remoteFilePath: string, altText: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputTitle).setValue(title);
        await (await this.inputHeadline).scrollIntoView();
        await (await this.inputHeadline).setValue(headline);
        await (await this.inputEyebrow).setValue(eyebrow);
        await (await this.inputList).scrollIntoView();
        await (await this.inputList).setValue(list);
        await (await this.inputButtonText).scrollIntoView();
        await (await this.inputButtonText).setValue(btnText);
        await (await this.inputURL).setValue(url);
        await (await this.dropdownImage).scrollIntoView();
        await browser.pause(2000);
        await (await this.dropdownImage).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(4000); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText);
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(6500); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await browser.pause(1000); //explicit waits seem to be necessary here
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async checkHeadingSize(){
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.headlineOptions).scrollIntoView();
        await (await this.headlineOptions).click();
        await browser.pause(2500);
    }

    public async createCardGeneralAnalytics(title: string, headline: string, eyebrow: string, list: string, btnText: string, url: string, remoteFilePath: string, altText: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputTitle).setValue(title);
        await (await this.inputHeadline).scrollIntoView();
        await (await this.inputHeadline).setValue(headline);
        await (await this.inputEyebrow).setValue(eyebrow);
        await (await this.inputList).scrollIntoView();
        await (await this.inputList).setValue(list);
        await (await this.inputButtonText).scrollIntoView();
        await (await this.inputButtonText).setValue(btnText);
        await (await this.dropdownButtonOptions).click();
        await (await this.dropdownTarget).selectByVisibleText('_blank');
        await (await this.inputURL).scrollIntoView();
        await (await this.inputURL).setValue(url);
        await (await this.dropdownImage).scrollIntoView();
        await browser.pause(2000);
        await (await this.dropdownImage).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(4000); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText);
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(6500); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await browser.pause(1000); //explicit waits seem to be necessary here
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async navToStyling() {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.dropdownStyling).scrollIntoView();
        await (await this.dropdownStyling).click();
        await browser.pause(3000);
    }
}

export default new CardGeneralBlockPage();
