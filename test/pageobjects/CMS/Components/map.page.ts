import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class MapBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout() {
        return $('#edit-submit');
    }

    public get inputTitle() {
        return $('#edit-settings-label');
    }

    public get inputLocation(){
        return $('input[data-drupal-selector="edit-settings-block-form-field-location-0-target-id"]')
    }

    public get inputHighlightTitle() {
        return $('#edit-settings-block-form-field-highlights-0-subform-field-title-0-value');
    }

    public get inputLatitude() {
        return $('#edit-settings-block-form-field-highlights-0-subform-field-coordinates-0-value-lat');
    }

    public get inputLongitude() {
        return $('#edit-settings-block-form-field-highlights-0-subform-field-coordinates-0-value-lon');
    }

    public get inputMapConfig() {
        return $('#edit-settings-block-form-field-map-config-0-value');
    }

    public get dropdownStyling() {
        return $('#edit-settings-block-form-group-styling');
    }

    public get dropdownLayout() {
        return $('#edit-settings-block-form-field-layout');
    }

    public get checkboxHideLocationCards() {
        return $('#edit-settings-block-form-field-hide-location-cards-value');
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

    public mapElement(id:string) {
        return $(`#${id} .mf-map`);
    }

    public get dropdownImage() {
        return $('#edit-field-image');
    }

    public get dropdownIcon() {
        return $('#edit-field-icon-image');
    }

    public get entityIframe() {
        return $('#entity_browser_iframe_image_browser');
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

    public get frames() {
        return $('#entity_browser_iframe_image_browser');
    }

    public get btnFirstLocation() {
        return $$('div[data-analytics-link-type="button"]')[0]
    }

    public get btnMapIcon() {
        return $$('button[data-analytics-click-text="map-trifold"]')[0]
    }

    public get btnPhoneIcon() {
        return $$('a[data-analytics-link-type="button"]')[0]
    }

    public get btnOverlayMapIcon() {
        return $$('button[data-analytics-click-text="map-trifold"]')[3]
    }

    public get overlayAddressText(){
        return $$('a[data-analytics-click-text*="111 East"]')[2]
    }

    public get overlayPhoneIcon() {
        return $$('a[data-analytics-link-type="button"]')[3]
    }

    public get overlayPhoneText() {
        return $$('a[data-analytics-click-text="phone"]')[5]
    }


    /**
     * Helper methods to create Map Component
     */

    public async createMap(title: string, highlightTitle: string, latitude: string, longitude, remoteFilePath: string, altText: string, remoteFilePath1: string, altText1: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputTitle).setValue(title);
        await (await this.inputHighlightTitle).scrollIntoView();
        await (await this.inputHighlightTitle).setValue(highlightTitle);
        await (await this.inputLatitude).scrollIntoView();
        await (await this.inputLatitude).setValue(latitude);
        await (await this.inputLongitude).scrollIntoView();
        await (await this.inputLongitude).setValue(longitude);
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
        await (await this.dropdownIcon).scrollIntoView();
        await browser.pause(2000);
        await (await this.dropdownIcon).click();
        // switch to the iframe
        const frame1 = await this.frames;
       //await frame1.waitForDisplayed();
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
        await browser.pause(1000);
        // await (await this.inputMapConfig).scrollIntoView();
        // await (await this.inputMapConfig).setValue(mapConfig);
        // await browser.pause(2000);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(2000);
    }

    public async createMapWithLocation(title: string, location: string, highlightTitle: string, latitude: string, longitude, remoteFilePath: string, altText: string, remoteFilePath1: string, altText1: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputTitle).setValue(title);
        await (await this.inputLocation).scrollIntoView();
        await (await this.inputLocation).setValue(location);
        await (await this.inputHighlightTitle).scrollIntoView();
        await (await this.inputHighlightTitle).setValue(highlightTitle);
        await (await this.inputLatitude).scrollIntoView();
        await (await this.inputLatitude).setValue(latitude);
        await (await this.inputLongitude).scrollIntoView();
        await (await this.inputLongitude).setValue(longitude);
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
        await (await this.dropdownIcon).scrollIntoView();
        await browser.pause(2000);
        await (await this.dropdownIcon).click();
        // switch to the iframe
        const frame1 = await this.frames;
       //await frame1.waitForDisplayed();
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
        await browser.pause(1000);
        // await (await this.inputMapConfig).scrollIntoView();
        // await (await this.inputMapConfig).setValue(mapConfig);
        // await browser.pause(2000);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(2000);
    }


    public async navToStyling() {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.dropdownStyling).scrollIntoView();
        await (await this.dropdownStyling).click();
        await browser.pause(2000);
    }
}

export default new MapBlockPage();