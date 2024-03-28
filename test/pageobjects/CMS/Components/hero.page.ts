import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HeroBlockPage extends Page {
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

    public get inputIntro() {
        return $$('div[role="textbox"]')[2];
    }

    public get inputContent() {
        return $$('div[role="textbox"]')[3];
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

    public get linkUploadVideo() {
        return $('=Upload new video');
    }

    public get btnBrowse() {
        return $("input[type='file']");
    }

    public get inputAltText() {
        return $('input[id^="edit-inline-entity-form-field-media-image-0-alt-"]');
    }

    public get btnSaveMedia() {
        return $('#edit-submit');
    }

    public get btnAddBlock() {
        return $('#edit-actions-submit');
    }

    public get successMsg() {
        return $('.mf-alert__container--success');
    }

    public get entityIframe() {
        return $('iframe[name="entity_browser_iframe_image_and_video"]');
    }

    public get titleBlockElement() {
        return $('#block-meda-page-title');
    }

    public headlineElement(id: string) {
        return $(`#${id} .mf-text-title-1-serif`);
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

    public get configBlock() {
        return $('.ui-draggable-handle');
    }

    public get dropdownToggle() {
        return $('.dropbutton__toggle');
    }

    public get dropdownButtonOptions() {
        return $('summary[aria-controls="edit-settings-block-form-field-content-0-subform-field-buttons-0-link-options"]');
    }

    public get dropdownTarget() {
        return $('#edit-settings-block-form-field-content-0-subform-field-buttons-0-link-options-target');
    }

    /**
     * Helper methods to create Hero Component
    */

    public async createComponentWithImage(title: string, headline: string, eyebrow: string, intro: string, content: string, btnText: string, url: string, remoteFilePath: string, altText: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputTitle).setValue(title);
        await (await this.inputHeadline).scrollIntoView();
        await (await this.inputHeadline).setValue(headline);
        await (await this.inputEyebrow).setValue(eyebrow);
        await (await this.inputIntro).setValue(intro);
        await (await this.inputContent).scrollIntoView();
        await (await this.inputContent).setValue(content);
        await (await this.inputButtonText).setValue(btnText);
        await (await this.inputURL).setValue(url);
        await (await this.dropdownMedia).scrollIntoView();
        await (await this.dropdownMedia).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(4000); //explicit waits seem to be necessary here
        await (await this.inputAltText).setValue(altText);
        await (await this.btnSaveMedia).scrollIntoView();
        await (await this.btnSaveMedia).click();
        await browser.pause(6000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        //await browser.pause(4000); //explicit waits seem to be necessary here
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).waitForEnabled();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(2000);
    }

    public async createComponentWithVideo(title: string, headline: string, eyebrow: string, intro: string, content: string, btnText: string, url: string, remoteFilePath: string, altText: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputTitle).setValue(title);
        await (await this.inputHeadline).scrollIntoView();
        await (await this.inputHeadline).setValue(headline);
        await (await this.inputEyebrow).setValue(eyebrow);
        await (await this.inputIntro).setValue(intro);
        await (await this.inputContent).scrollIntoView();
        await (await this.inputContent).setValue(content);
        await (await this.inputButtonText).setValue(btnText);
        await (await this.inputURL).setValue(url);
        await (await this.dropdownMedia).scrollIntoView();
        await (await this.dropdownMedia).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        await (await this.linkUploadVideo).click();
        await (await this.btnBrowse).waitForDisplayed();
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(10900); //explicit waits seem to be necessary here
        await (await this.btnSaveMedia).scrollIntoView();
        await (await this.btnSaveMedia).click();
        await browser.pause(6000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        //await browser.pause(4000); //explicit waits seem to be necessary here
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).waitForEnabled();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(2000);
    }

    public async deletePages() {
        await (await this.heroPageLink).click();
        await (await this.deletelink).waitForExist();
        await (await this.deletelink).click();
        await (await this.btnDelete).waitForExist();
        await (await this.btnDelete).click();
        await browser.pause(3000);
    }

    public async switchIntoFrame() {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
    }

    public async createHeroAnalytics(title: string, headline: string, eyebrow: string, intro: string, content: string, btnText: string, url: string, remoteFilePath: string, altText: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputTitle).setValue(title);
        await (await this.inputHeadline).scrollIntoView();
        await (await this.inputHeadline).setValue(headline);
        await (await this.inputEyebrow).setValue(eyebrow);
        await (await this.inputIntro).setValue(intro);
        await (await this.inputContent).scrollIntoView();
        await (await this.inputContent).setValue(content);
        await (await this.inputButtonText).setValue(btnText);
        await (await this.dropdownButtonOptions).click();
        await (await this.dropdownTarget).selectByVisibleText('_blank');
        await (await this.inputURL).scrollIntoView();
        await (await this.inputURL).setValue(url);
        await (await this.dropdownMedia).scrollIntoView();
        await (await this.dropdownMedia).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(4000); //explicit waits seem to be necessary here
        await (await this.inputAltText).setValue(altText);
        await (await this.btnSaveMedia).scrollIntoView();
        await (await this.btnSaveMedia).click();
        await browser.pause(6000); //explicit waits seem to be necessary here
        await browser.switchToParentFrame();
        //await browser.pause(4000); //explicit waits seem to be necessary here
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).waitForEnabled();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(2000);
    }


}

export default new HeroBlockPage();
