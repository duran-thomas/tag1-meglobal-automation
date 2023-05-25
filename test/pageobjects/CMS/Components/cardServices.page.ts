import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CardServicesBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout () {
        return $('#edit-submit');
    }

    public get inputTitle () {
        return $('#edit-settings-label');
    }

    public get inputHeadline () {
        return $('#edit-settings-block-form-field-content-0-subform-field-headline-0-headline');
    }

    public get inputEyebrow () {
        return $('#edit-settings-block-form-field-content-0-subform-field-eyebrow-0-value');
    }

    public get inputList () {
        return $('#edit-settings-block-form-field-content-0-subform-field-list-0-value');
    }

    public get inputContent () {
        return $('#edit-settings-block-form-field-content-0-subform-field-content-0-value');
    }

    public get inputButtonText () {
        return $('#edit-settings-block-form-field-content-0-subform-field-buttons-0-title');
    }

    public get inputButtonURL () {
        return $('#edit-settings-block-form-field-content-0-subform-field-buttons-0-uri');
    }

    public get inputLinkText () {
        return $('#edit-settings-block-form-field-content-0-subform-field-links-0-title');
    }

    public get inputLinkURL () {
        return $('#edit-settings-block-form-field-content-0-subform-field-links-0-uri');
    }

    public get inputInfo () {
        return $('#edit-settings-block-form-field-content-0-subform-field-info-label-0-value');
    }

    public get dropdownImage () {
        return $('#edit-field-image');
    }

    public get btnBrowse () {
        return $("input[type='file']");
    }

    public get inputAltText () {
        return $('input[id^="edit-inline-entity-form-field-media-image-0-alt-"]');
    }

    public get btnSaveImage () {
        return $('#edit-submit');
    }

    public get dropdownStyling () {
        return $('#edit-settings-block-form-field-content-widget-0-subform-group-styling');
    }

    public get dropdownBackground () {
        return $('#edit-settings-block-form-field-content-0-subform-field-background');
    }

    public get dropdownContentPosition () {
        return $('#edit-settings-block-form-field-content-0-subform-field-content-position');
    }

    public get dropdownServicesDisplay () {
        return $('#edit-settings-block-form-field-content-0-subform-field-services-display');
    }

    public get checkboxMinimal () {
        return $('#edit-settings-block-form-field-content-0-subform-field-minimal-value');
    }

    public get dropdownMobileAspectRatio () {
        return $('#edit-settings-block-form-field-content-0-subform-field-mobile-aspect-ratio');
    }

    public get dropdownDesktopAspectRatio () {
        return $('#edit-settings-block-form-field-content-0-subform-field-desktop-aspect-ratio');
    }

    public get dropdownTheme () {
        return $('#edit-settings-block-form-field-content-0-subform-field-theme');
    }

    public get dropdownAlignment () {
        return $('#edit-settings-block-form-field-content-0-subform-field-alignment');
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

    public get entityIframe () {
        return $('iframe[name="entity_browser_iframe_image_browser"]');
    }

    public get cardServicesElement () {
        return $('.mf-card-services');
    }

    public get cardContent () {
        return $('p.mf-text-body-3-sans');
    }

    public get internalUrl () {
        return $('=Residency Programs');
    }

    public get internalLink () {
        return $('a[data-analytics-click-text="Residency Programs"]');
    }

    public get listElement () {
        return $('.mf-icon-list__item');
    }


    /**
     * Helper methods to create Cards Services Component
     */

    public async createCardServiceExtLink(title: string, eyebrow: string, headline: string, content: string, list: string, btnText: string, btnUrl: string, linkText: string, linkUrl: string, info: string, remoteFilePath: string, altText: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitle).setValue(title);
        (await this.inputEyebrow).scrollIntoView();
        (await this.inputEyebrow).setValue(eyebrow);
        (await this.inputHeadline).setValue(headline);
        (await this.inputContent).scrollIntoView();
        (await this.inputContent).setValue(content);
        (await this.inputList).setValue(list);
        (await this.inputButtonText).scrollIntoView();
        (await this.inputButtonText).setValue(btnText);
        (await this.inputButtonURL).setValue(btnUrl);
        (await this.inputLinkText).scrollIntoView();
        (await this.inputLinkText).setValue(linkText);
        (await this.inputLinkURL).setValue(linkUrl);
        (await this.inputInfo).scrollIntoView();
        (await this.inputInfo).setValue(info);
        await browser.pause(2000);
        (await this.dropdownImage).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        (await this.btnBrowse).scrollIntoView();
        (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(4500); //explicit waits seem to be necessary here
        (await this.inputAltText).waitForClickable();
        (await this.inputAltText).setValue(altText);
        (await this.btnSaveImage).scrollIntoView();
        (await this.btnSaveImage).click();
        await browser.pause(6000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await browser.pause(4000); //explicit waits seem to be necessary here
        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).waitForDisplayed();
        (await this.btnSaveLayout).scrollIntoView();
        (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createCardServiceIntLink(title: string, eyebrow: string, headline: string, content: string, list: string, resiText: string, info: string, remoteFilePath: string, altText: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitle).setValue(title);
        (await this.inputEyebrow).scrollIntoView();
        (await this.inputEyebrow).setValue(eyebrow);
        (await this.inputHeadline).setValue(headline);
        (await this.inputContent).scrollIntoView();
        (await this.inputContent).setValue(content);
        (await this.inputList).setValue(list);
        (await this.inputButtonText).scrollIntoView();
        (await this.inputButtonText).setValue(resiText);
        (await this.inputButtonURL).setValue(resiText);
        await browser.pause(800);
        (await this.internalUrl).click();
        (await this.inputLinkText).scrollIntoView();
        (await this.inputLinkText).setValue(resiText);
        (await this.inputLinkURL).setValue(resiText);
        await browser.pause(800);
        (await this.internalUrl).click();
        (await this.inputInfo).scrollIntoView();
        (await this.inputInfo).setValue(info);
        await browser.pause(2000);
        (await this.dropdownImage).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        (await this.btnBrowse).scrollIntoView();
        (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(5200); //explicit waits seem to be necessary here
        (await this.inputAltText).waitForClickable();
        (await this.inputAltText).setValue(altText);
        (await this.btnSaveImage).scrollIntoView();
        (await this.btnSaveImage).click();
        await browser.pause(6000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await browser.pause(4000); //explicit waits seem to be necessary here
        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).waitForDisplayed();
        (await this.btnSaveLayout).scrollIntoView();
        (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async navToStyling() {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await browser.pause(3000);
        (await this.dropdownStyling).scrollIntoView();
        (await this.dropdownStyling).click();
        await browser.pause(3000);
    }
}

export default new CardServicesBlockPage();
