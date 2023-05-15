import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HeroBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout () {
        return $('#edit-submit');
    }

    public get inputTitle () {
        return $('#edit-title-0-value');
    }

    public get inputHeadline () {
        return $('#edit-field-hero-0-subform-field-headline-0-headline');
    }

    public get inputEyebrow () {
        return $('#edit-field-hero-0-subform-field-eyebrow-0-value');
    }

    public get inputIntro () {
        return $('#edit-field-hero-0-subform-field-intro-0-value');
    }

    public get inputContent () {
        return $('#edit-field-hero-0-subform-field-content-0-value');
    }

    public get inputButtonText () {
        return $('#edit-field-hero-0-subform-field-buttons-0-title');
    }

    public get inputURL () {
        return $('#edit-field-hero-0-subform-field-buttons-0-uri');
    }

    public get dropdownMedia () {
        return $('#edit-field-media-entity');
    }

    public get linkUploadVideo () {
        return $('=Upload new video');
    }

    public get btnBrowse () {
        return $("input[type='file']");
    }

    public get inputAltText () {
        return $('input[id^="edit-inline-entity-form-field-media-image-0-alt-"]');
    }

    public get btnSaveMedia () {
        return $('#edit-submit');
    }
    
    public get btnSavePage () {
        return $('#edit-submit');
    }

    public get successMsg () {
        return $('.mf-alert__container--success');
    }

    public get entityIframe () {
        return $('iframe[name="entity_browser_iframe_image_and_video"]');
    }

    public get titleBlockElement () { 
        return $('#block-meda-page-title');
    }

    public get headlineElement () {
        return $('.mf-text-title-1-serif');
    }

    public get heroPageLink() {
        return $('=Hero Title');
    }

    public get deletelink() {
        return $('=Delete');
    }

    public get btnDelete() {
        return $('#edit-submit');
    }

    public get configBlock () {
        return $('.ui-draggable-handle');
    }

    public get dropdownToggle () {
        return $('.dropbutton__toggle');
    }


    /**
     * Helper methods to create Hero Component
     */

    public async createComponentWithImage(title: string, headline: string, eyebrow: string, intro: string, content: string, btnText: string, url: string, remoteFilePath: string, altText: string) {
        await (await this.inputTitle).waitForClickable();
        (await this.inputTitle).setValue(title);
        (await this.inputHeadline).scrollIntoView();
        (await this.inputHeadline).setValue(headline);
        (await this.inputEyebrow).setValue(eyebrow);
        (await this.inputIntro).setValue(intro);
        (await this.inputContent).scrollIntoView();
        (await this.inputContent).setValue(content);
        (await this.inputButtonText).setValue(btnText);
        (await this.inputURL).setValue(url);
        (await this.dropdownMedia).scrollIntoView();
        await (await this.dropdownMedia).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        (await this.btnBrowse).scrollIntoView();
        (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(4000); //explicit waits seem to be necessary here
        await (await this.inputAltText).setValue(altText);
        await (await this.btnSaveMedia).scrollIntoView();
        await (await this.btnSaveMedia).click();
        await browser.pause(6000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        //await browser.pause(4000); //explicit waits seem to be necessary here
        (await this.btnSavePage).scrollIntoView();
        await (await this.btnSavePage).waitForEnabled();
        (await this.btnSavePage).click();
        await browser.pause(2000);
    }

    public async createComponentWithVideo(title: string, headline: string, eyebrow: string, intro: string, content: string, btnText: string, url: string, remoteFilePath: string, altText: string) {
        await (await this.inputTitle).waitForClickable();
        (await this.inputTitle).setValue(title);
        (await this.inputHeadline).scrollIntoView();
        (await this.inputHeadline).setValue(headline);
        (await this.inputEyebrow).setValue(eyebrow);
        (await this.inputIntro).setValue(intro);
        (await this.inputContent).scrollIntoView();
        (await this.inputContent).setValue(content);
        (await this.inputButtonText).setValue(btnText);
        (await this.inputURL).setValue(url);
        (await this.dropdownMedia).scrollIntoView();
        await (await this.dropdownMedia).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        await (await this.linkUploadVideo).click();
        (await this.btnBrowse).waitForDisplayed();
        (await this.btnBrowse).scrollIntoView();
        (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(10000); //explicit waits seem to be necessary here
        await (await this.btnSaveMedia).scrollIntoView();
        await (await this.btnSaveMedia).click();
        await browser.pause(6000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        //await browser.pause(4000); //explicit waits seem to be necessary here
        (await this.btnSavePage).scrollIntoView();
        await (await this.btnSavePage).waitForEnabled();
        (await this.btnSavePage).click();
        await browser.pause(2000);
    }

    public async deletePages() {
            (await this.heroPageLink).click();
            (await this.deletelink).waitForExist();
            (await this.deletelink).click();
            (await this.btnDelete).waitForExist();
            (await this.btnDelete).click();
            await browser.pause(3000);
    }

    public async switchIntoFrame() {
        await browser.pause(5000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.dropdownToggle).scrollIntoView();
        (await this.dropdownToggle).click();
    }

   
}

export default new HeroBlockPage();
