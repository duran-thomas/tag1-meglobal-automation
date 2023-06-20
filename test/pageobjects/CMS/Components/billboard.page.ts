import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class BillboardBlockPage extends Page {
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
        return $('#edit-settings-block-form-field-content-0-subform-field-headline-0-headline');
    }

    public get inputEyebrow() {
        return $('#edit-settings-block-form-field-content-0-subform-field-eyebrow-0-value');
    }

    public get inputIntro() {
        return $('#edit-settings-block-form-field-content-0-subform-field-intro-0-value');
    }

    public get inputContent() {
        return $('#edit-settings-block-form-field-content-0-subform-field-content-0-value');
    }

    public get inputButtonText() {
        return $('#edit-settings-block-form-field-content-0-subform-field-buttons-0-title');
    }

    public get inputURL() {
        return $('#edit-settings-block-form-field-content-0-subform-field-buttons-0-uri');
    }

    public get dropdownMedia() {
        return $('#edit-field-media-entity');
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

    public get dropdownTheme() {
        return $('#edit-settings-block-form-field-content-0-subform-field-theme');
    }

    public get dropdownGradientIntensity() {
        return $('#edit-settings-block-form-field-content-0-subform-field-gradient-intensity');
    }

    public get inputMobileFixedHeight() {
        return $('#edit-settings-block-form-field-content-0-subform-field-mobile-fixed-height-0-value');
    }

    public get inputDesktopFixedHeight() {
        return $('#edit-settings-block-form-field-content-0-subform-field-desktop-fixed-height-0-value');
    }

    public get dropdownMobileAspectRatio() {
        return $('#edit-settings-block-form-field-content-0-subform-field-mobile-aspect-ratio');
    }

    public get dropdownDesktopAspectRatio() {
        return $('#edit-settings-block-form-field-content-0-subform-field-desktop-aspect-ratio');
    }

    public get dropdownContentPosition() {
        return $('#edit-settings-block-form-field-content-0-subform-field-content-position');
    }

    public get dropdownContentColumns() {
        return $('#edit-settings-block-form-field-content-0-subform-field-content-columns');
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

    public get billboardElement() {
        return $('.mf-billboard');
    }

    public get billboardHeadline() {
        return $('.mf-text-title-1-serif');
    }

    public get billboardEyebrow() {
        return $('.mf-text-body-4-serif');
    }

    public get billboardImage() {
        return $('.mf-media__image');
    }
    //carousel layer selectors start
    public get dropdownToggle() {
        return $('.dropbutton__toggle');
    }

    public get listBillboardLink() {
        return $('.add-more-button-billboard');
    }

    public get inputHeadline1() {
        return $('textarea[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-headline-0-headline"]');
    }

    public get inputEyebrow1() {
        return $('textarea[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-eyebrow-0-value"]');
    }

    public get inputIntro1() {
        return $('textarea[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-intro-0-value"]');
    }

    public get inputContent1() {
        return $('textarea[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-content-0-value"]');
    }

    public get inputButtonText1() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-buttons-0-title"]');
    }

    public get inputURL1() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-buttons-0-uri"]');
    }

    public get dropdownMedia1() {
        return $('details[id^="edit-field-media-entity-"]');
    }

    public get carouselElement() {
        return $('.mf-carousel');
    }
    //carousel layer selectors end


    /**
     * Helper methods to create Billboard Component
     */

    public async createBillboard(title: string, headline: string, eyebrow: string, intro: string, content: string, btnText: string, url: string, remoteFilePath: string, altText: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputTitle).setValue(title);
        await (await this.inputHeadline).scrollIntoView();
        await (await this.inputHeadline).setValue(headline);
        await (await this.inputEyebrow).setValue(eyebrow);
        await (await this.inputIntro).scrollIntoView();
        await (await this.inputIntro).setValue(intro);
        await (await this.inputContent).setValue(content);
        await (await this.inputButtonText).scrollIntoView();
        await (await this.inputButtonText).setValue(btnText);
        await (await this.inputURL).setValue(url);
        await (await this.dropdownMedia).scrollIntoView();
        await browser.pause(2000);
        await (await this.dropdownMedia).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(10000); //explicit waits seem to be necessary here
        await (await this.inputAltText).scrollIntoView();
        await (await this.inputAltText).setValue(altText);
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(5000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await browser.pause(2000); //explicit waits seem to be necessary here
        await (await this.btnAddBlock).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.btnAddBlock).click();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createCarouselBillboard(title: string, headline: string, eyebrow: string, intro: string, content: string, btnText: string, url: string, remoteFilePath: string, altText: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputTitle).setValue(title);
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.listBillboardLink).click();
        await browser.pause(3000);
        await (await this.inputHeadline1).scrollIntoView();
        await (await this.inputHeadline1).setValue(headline);
        await (await this.inputEyebrow1).setValue(eyebrow);
        await (await this.inputIntro1).scrollIntoView();
        await (await this.inputIntro1).setValue(intro);
        await (await this.inputContent1).setValue(content);
        await (await this.inputButtonText1).scrollIntoView();
        await (await this.inputButtonText1).setValue(btnText);
        await (await this.inputURL1).setValue(url);
        await (await this.dropdownMedia1).scrollIntoView();
        await browser.pause(2000);
        await (await this.dropdownMedia1).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(6000); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText);
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(5000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await browser.pause(2000); //explicit waits seem to be necessary here
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
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
        await browser.pause(2000);

    }
}

export default new BillboardBlockPage();
