import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class MediaBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout () {
        return $('#edit-submit');
    }

    public get inputTitle () {
        return $('#edit-settings-label');
    }

    //Image area start
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

    public get inputLink () {
        return $('#edit-settings-block-form-field-content-0-subform-field-link-0-uri');
    }

    public get inputCaption () {
        return $('#edit-settings-block-form-field-content-0-subform-field-caption-0-value');
    }

    public get checkboxCover () {
        return $('#edit-settings-block-form-field-content-0-subform-field-cover-value');
    }

    public get checkboxRounded () {
        return $('#edit-settings-block-form-field-content-0-subform-field-rounded-value');
    }

    public get dropdownMobileAspectRatio () {
        return $('#edit-settings-block-form-field-content-0-subform-field-mobile-aspect-ratio');
    }

    public get dropdownDesktopAspectRatio () {
        return $('#edit-settings-block-form-field-content-0-subform-field-desktop-aspect-ratio');
    }
    //Image area end


    //Video area start
    public get dropdownVideo () {
        return $('#edit-field-video');
    }

    public get tabNewVideo () {
        return $('li:nth-child(2) a:nth-child(1)');
    }

    public get btnBrowse1 () {
        return $("input[type='file']");
    }

    public get inputDuration () {
        return $('#edit-inline-entity-form-field-duration-0-value');
    }

    public get btnSaveMedia () {
        return $('#edit-submit');
    }

    public get dropdownPoster () {
        return $('#edit-field-poster-image')
    }
    //Video area end

    public get dropdownStyling () {
        return $('#edit-settings-block-form-field-content-widget-0-subform-group-styling');
    }

    public get dropdownContentPadding () {
        return $('#edit-settings-block-form-field-content-0-subform-field-content-padding');
    }

    public get dropdownSite () {
        return $('#edit-settings-block-form-field-content-0-subform-field-site');
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

    public get imageIframe () {
        return $('iframe[name="entity_browser_iframe_image_browser"]');
    }

    public get videoIframe () {
        return $('iframe[name="entity_browser_iframe_video_media_browser"]');
    }

    public get captionElement () {
        return $('.mf-media__content');
    }

    public get mediaElement () {
        return $('.mf-media__button');
    }

    public get durationElement () {
        return $('.mf-media__play__duration');
    }

    public get btnClose () {
        return $('.close-0-2-17');
    }


    /**
     * Helper methods to create media Components
     */

    public async createImageType(title: string, remoteFilePath: string, altText: string, link: string, caption: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitle).setValue(title);
        await browser.pause(2000);
        (await this.dropdownImage).click();
        // switch to the iframe
        await browser.switchToFrame(await this.imageIframe);
        (await this.btnBrowse).scrollIntoView();
        (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(4500); //explicit waits seem to be necessary here
        (await this.inputAltText).waitForEnabled();
        (await this.inputAltText).scrollIntoView();
        (await this.inputAltText).setValue(altText);
        (await this.btnSaveImage).scrollIntoView();
        (await this.btnSaveImage).click();
        await browser.pause(5000); //explicit waits seem to be necessary here
        await browser.switchToFrame(iframe);
        await browser.pause(3000); //explicit waits seem to be necessary here
        (await this.inputLink).scrollIntoView();
        (await this.inputLink).setValue(link);
        (await this.inputCaption).setValue(caption);
        await browser.pause(2000);
        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).waitForDisplayed();
        (await this.btnSaveLayout).scrollIntoView();
        (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async navToStyleVisibility() {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await browser.pause(3000);
        (await this.checkboxCover).scrollIntoView();
    }

    public async createVideoType(title: string, remoteFilePath: string, duration: string, remoteFilePath1: string, altText: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitle).setValue(title);
        await browser.pause(2000);
        (await this.dropdownVideo).click();
        // switch to the iframe
        await browser.switchToFrame(await this.videoIframe);
        (await this.tabNewVideo).scrollIntoView();
        (await this.tabNewVideo).click();
        (await this.btnBrowse).scrollIntoView();
        (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(9000); //explicit waits seem to be necessary here
        (await this.inputDuration).setValue(duration);
        await browser.pause(2000);
        (await this.btnSaveMedia).scrollIntoView();
        (await this.btnSaveMedia).click();
        await browser.pause(3500); //explicit waits seem to be necessary here
        await browser.switchToFrame(iframe);
        await browser.pause(2000); //explicit waits seem to be necessary here
        (await this.dropdownPoster).scrollIntoView();
        (await this.dropdownPoster).click();
        await browser.switchToFrame(await this.imageIframe);
        (await this.btnBrowse).scrollIntoView();
        (await this.btnBrowse).setValue(remoteFilePath1);
        await browser.pause(4500); //explicit waits seem to be necessary here
        (await this.inputAltText).waitForEnabled();
        (await this.inputAltText).scrollIntoView();
        (await this.inputAltText).setValue(altText);
        (await this.btnSaveImage).scrollIntoView();
        (await this.btnSaveImage).click();
        await browser.pause(5000); //explicit waits seem to be necessary here
        await browser.switchToFrame(iframe);
        await browser.pause(2000); //explicit waits seem to be necessary here
        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        await browser.pause(3000);
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

export default new MediaBlockPage();
