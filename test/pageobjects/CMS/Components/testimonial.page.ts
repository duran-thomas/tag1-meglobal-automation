import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class TestimonialBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout() {
        return $('#edit-submit');
    }

    public get inputAdminTitle() {
        return $('#edit-settings-label');
    }

    public get inputQuote() {
        return $('#edit-settings-block-form-field-content-0-subform-field-quote-0-value');
    }

    public get inputName() {
        return $('#edit-settings-block-form-field-content-0-subform-field-testimonial-name-0-value');
    }

    public get inputSecondQuote() {
        return $('textarea[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-quote-0-value"]');
    }

    public get inputSecondName() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-testimonial-name-0-value"]');
    }

    public get inputThirdQuote() {
        return $('textarea[data-drupal-selector="edit-settings-block-form-field-content-2-subform-field-quote-0-value"]');
    }

    public get inputThirddName() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-2-subform-field-testimonial-name-0-value"]');
    }

    public get inputFourthQuote() {
        return $('textarea[data-drupal-selector="edit-settings-block-form-field-content-3-subform-field-quote-0-value"]');
    }

    public get inputFourthName() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-3-subform-field-testimonial-name-0-value"]');
    }

    public get inputFifthQuote() {
        return $('textarea[data-drupal-selector="edit-settings-block-form-field-content-4-subform-field-quote-0-value"]');
    }

    public get inputFifthName() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-4-subform-field-testimonial-name-0-value"]');
    }

    public get btnAddTestimonial() {
        return $('div[data-drupal-selector="edit-settings-block-form-field-content-add-more"]');
    }

    public get dropdownImage() {
        return $('#edit-field-image');
    }

    public get secondDropdownImage() {
        return $('div[data-drupal-selector="edit-settings-block-form-field-content-1-subform-field-image-wrapper"]');
    }

    public get thirdDropdownImage() {
        return $('div[data-drupal-selector="edit-settings-block-form-field-content-2-subform-field-image-wrapper"]');
    }

    public get fourthDropdownImage() {
        return $('div[data-drupal-selector="edit-settings-block-form-field-content-3-subform-field-image-wrapper"]');
    }

    public get fifthDropdownImage() {
        return $('div[data-drupal-selector="edit-settings-block-form-field-content-4-subform-field-image-wrapper"]');
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

    public get checkboxImageBackground() {
        return $('#edit-settings-block-form-field-content-0-subform-field-image-background-value');
    }

    public get dropdownDesktopAspectRatio() {
        return $('#edit-settings-block-form-field-content-0-subform-field-desktop-aspect-ratio');
    }

    public get dropdownMobileAspectRatio() {
        return $('#edit-settings-block-form-field-content-0-subform-field-mobile-aspect-ratio');
    }

    public get dropdownBackground() {
        return $('#edit-settings-block-form-field-content-0-subform-field-background');
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
        return $('#entity_browser_iframe_image_browser');
    }

    public get frames() {
        return $$('#entity_browser_iframe_image_browser');
    }

    public get testimonialElement() {
        return $('.mf-testimonial');
    }

    public get allTestimonials() {
        return $$('.mf-testimonial');
    }

    public get quotes() {
        return $$('blockquote');
    }

    /**
     * Helper methods to create Testimonial Component
     */

    public async createTestimonial(title: string, quote: string, name: string, remoteFilePath: string, altText: string) {
        await browser.pause(5000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputAdminTitle).setValue(title);
        await (await this.inputQuote).scrollIntoView();
        await (await this.inputQuote).setValue(quote);
        await (await this.inputName).setValue(name);
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
        await browser.pause(3000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await browser.pause(3000); //explicit waits seem to be necessary here
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createBackgroundTestimonial(title: string, quote: string, name: string, remoteFilePath: string, altText: string) {
        await browser.pause(5000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputAdminTitle).setValue(title);
        await (await this.inputQuote).scrollIntoView();
        await (await this.inputQuote).setValue(quote);
        await (await this.inputName).setValue(name);
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
        await browser.pause(3000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await browser.pause(3000); //explicit waits seem to be necessary here
        await (await this.dropdownStyling).scrollIntoView();
        await (await this.dropdownStyling).click();
        await (await this.checkboxImageBackground).click();
        await (await this.dropdownStyling).click();
        await (await this.dropdownDesktopAspectRatio).waitForDisplayed({timeout:3000});
        await (await this.dropdownDesktopAspectRatio).selectByVisibleText('16:9');
        await (await this.dropdownMobileAspectRatio).selectByVisibleText('16:9');
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createMultiTestimonialBlock1(title: string, quote: string, name: string, remoteFilePath: string, altText: string, quote1: string, name1: string, remoteFilePath1: string, altText1: string, quote2: string, name2: string, remoteFilePath2: string, altText2: string, quote3: string, name3: string, remoteFilePath3: string, altText3: string, quote4: string, name4: string, remoteFilePath4: string, altText4: string) {
        await browser.pause(5000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputAdminTitle).setValue(title);
        await (await this.inputQuote).scrollIntoView();
        await (await this.inputQuote).setValue(quote);
        await (await this.inputName).setValue(name);
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
        await browser.pause(3000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await browser.pause(1500); //explicit waits seem to be necessary here
        //second quote
        await (await this.btnAddTestimonial).scrollIntoView({ block: 'center' });
        await (await this.btnAddTestimonial).click();
        await browser.pause(3000);
        await (await this.inputSecondQuote).waitForDisplayed({timeout:5000});
        await (await this.inputSecondQuote).setValue(quote1);
        await (await this.inputSecondName).setValue(name1);
        await (await this.secondDropdownImage).scrollIntoView();
        await browser.pause(2000);
        await (await this.secondDropdownImage).click();
        // switch to the iframe
        const frame1 = await this.frames[1];
        await frame1.waitForDisplayed();
        await browser.switchToFrame(frame1);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath1);
        await browser.pause(4000); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText1);
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(3000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await browser.pause(2000); //explicit waits seem to be necessary here
        //third quote
        await (await this.btnAddTestimonial).scrollIntoView({ block: 'center' });
        await (await this.btnAddTestimonial).click();
        await browser.pause(3000);
        await (await this.inputThirdQuote).waitForDisplayed({timeout:4000});
        await (await this.inputThirdQuote).setValue(quote2);
        await (await this.inputThirddName).setValue(name2);
        await (await this.thirdDropdownImage).scrollIntoView();
        await browser.pause(2000);
        await (await this.thirdDropdownImage).click();
        // switch to the iframe
        const frame2 = await this.frames[2];
        await frame2.waitForDisplayed();
        await browser.switchToFrame(frame2);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath2);
        await browser.pause(4000); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText2);
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(3000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await browser.pause(2000); //explicit waits seem to be necessary here
        //fourth quote
        await (await this.btnAddTestimonial).scrollIntoView({ block: 'center' });
        await (await this.btnAddTestimonial).click();
        await browser.pause(3000);
        await (await this.inputFourthQuote).waitForDisplayed({timeout:4000});
        await (await this.inputFourthQuote).setValue(quote3);
        await (await this.inputFourthName).setValue(name3);
        await (await this.fourthDropdownImage).scrollIntoView();
        await browser.pause(2000);
        await (await this.fourthDropdownImage).click();
        // switch to the iframe
        const frame3 = await this.frames[3];
        await frame3.waitForDisplayed();
        await browser.switchToFrame(frame3);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath3);
        await browser.pause(4000); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText3);
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(3000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await browser.pause(2000); //explicit waits seem to be necessary here
        //fifth quote
        await (await this.btnAddTestimonial).scrollIntoView({ block: 'center' });
        await (await this.btnAddTestimonial).click();
        await browser.pause(3000);
        await (await this.inputFifthQuote).waitForDisplayed({timeout:4000});
        await (await this.inputFifthQuote).setValue(quote4);
        await (await this.inputFifthName).setValue(name4);
        await (await this.fifthDropdownImage).scrollIntoView();
        await browser.pause(2000);
        await (await this.fifthDropdownImage).click();
        // switch to the iframe
        const frame4 = await this.frames[4];
        await frame4.waitForDisplayed();
        await browser.switchToFrame(frame4);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath4);
        await browser.pause(4000); //explicit waits seem to be necessary here
        await (await this.inputAltText).waitForEnabled();
        await (await this.inputAltText).setValue(altText4);
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(3000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        await browser.pause(2000); //explicit waits seem to be necessary here

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

export default new TestimonialBlockPage();
