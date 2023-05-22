import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class VisualListBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout () {
        return $('#edit-submit');
    }

    public get inputTitle () {
        return $('#edit-settings-label');
    }

    public get dropdownToggle () {
        return $('.dropbutton__toggle');
    }

    public get inputItemTitle () {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-items-0-subform-field-title-"]');
    }

    public get secondInputItemTitle () {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-items-1-subform-field-title"]'); 
    }

    public get inputItemLink () {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-items-0-subform-field-link-0-uri"]');
    }

    public get secondInputItemLink () {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-items-1-subform-field-link"]');
    }

    public get simpleVisualList () {
        return $('input[id^="settings-block-form-field-content-0-subform-field-items-visual-list-item-simple-add-more"]');
    }

    public get illustrationVisualList () {
        return $('input[id^="settings-block-form-field-content-0-subform-field-items-visual-list-item-illustration-add-more"]');
    }

    public get imageCardVisualList () {
        return $('input[id^="settings-block-form-field-content-0-subform-field-items-visual-list-item-image-card-add-more"]');
    }

    public get illustrationCardVisualList () {
        return $('input[id^="settings-block-form-field-content-0-subform-field-items-visual-list-illustration-card-add-more"]');
    }

    public get illustrationCardVisualListEyebrow () {
        return $('textarea[id^="edit-settings-block-form-field-content-0-subform-field-items-0-subform-field-eyebrow"]');
    }

    public get illustrationCardVisualListHeading () {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-items-0-subform-field-heading"]');
    }

    public get illustrationCardVisualListDescription () {
        return $('textarea[id^="edit-settings-block-form-field-content-0-subform-field-items-0-subform-field-description"]');
    }

    public get illustrationCardVisualListURL () {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-items-0-subform-field-link-0-uri"]');
    }

    public get illustrationCardVisualListLinkText () {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-items-0-subform-field-link-0-title"]');
    }

    public get illustrationCardVisualListBackgroundDropdown () {
        return $('select[id^="edit-settings-block-form-field-content-0-subform-field-items-0-subform-field-illustration-background"]');
    }


    public get iconVisualList () {
        return $('input[id^="settings-block-form-field-content-0-subform-field-items-visual-list-item-icon-add-more"]');
    }

    public get iconVisualListDropdown () {
        return $('select[name="settings[block_form][field_content][0][subform][field_items][0][subform][field_icon][0][name]"]')
    }

    public get illustrationImageDropdown () {
        return $('.field--type-entity-reference.field--name-field-image');
    }

    public get inputItemDescription () {
        return $('textarea[id^="edit-settings-block-form-field-content-0-subform-field-items-0-subform-field-description-0-value"]');
    }

    public get dropdownAttributes () {
        return $('details[id^="edit-settings-block-form-field-content-0-subform-field-items-0-subform-field-link-0-options-attributes"]');
    }

    public get dropdownTarget () {
        return $('select[id^="edit-settings-block-form-field-content-0-subform-field-items-0-subform-field-link-0-options-attributes-target-"]');
    }

    public get dropdownStyling () {
        return $('#edit-settings-block-form-field-content-widget-0-subform-group-styling');
    }

    public get dropdownMediaBackground () {
        return $('#edit-settings-block-form-field-content-0-subform-field-background');
    }

    public get dropdownMediaSize () {
        return $('#edit-settings-block-form-field-content-0-subform-field-size');
    }

    public get dropdownMediaSpacing () {
        return $('#edit-settings-block-form-field-content-0-subform-field-content-padding');
    }

    public get dropdownMediaAlign () {
        return $('#edit-settings-block-form-field-content-0-subform-field-content-position');
    }

    public get checkboxRoundedMedia () {
        return $('#edit-settings-block-form-field-content-0-subform-field-rounded-value');
    }

    public get dropdownTemplate () {
        return $('#edit-settings-block-form-field-content-0-subform-field-template');
    }

    public get checkboxDivider () {
        return $('#edit-settings-block-form-field-content-0-subform-field-divider-value');
    }
    
    public get dropdownDividerStyle () {
        return $('#edit-settings-block-form-field-content-0-subform-field-divider-style');
    }

    public get btnAddBlock () {
        return $('#edit-actions-submit');
    }

    public get visualListElement () {
        return $('.mf-visual-list');
    }

    public get visualListElementTitle () {
        return $('h4.mf-text-body-3-sans');
    }

    public get successMsg () {
        return $('.mf-alert__container--success');
    }

    public get entityIframe () {
        return $('iframe[name="entity_browser_iframe_image_browser"]');
    }

    public get configBlock () {
        return $('.ui-draggable-handle');
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

    /**
     * Freeform Page Component
     */

    public get freeFormContentList () {
        return $$('li[class^="add-more-button"]');
    }

   

    /**
     * Helper methods to create Visual List Component with Simple List
     */

    public async createVisualListComponentSimple(mainTitle: string, itemTitle: string, link: string, description: string) {
        await browser.pause(10000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitle).setValue(mainTitle);
        await (await this.dropdownToggle).waitForClickable();
        await (await this.dropdownToggle).click();
        await browser.pause(5000);
        await (await this.simpleVisualList).scrollIntoView();
        await (await this.simpleVisualList).waitForClickable();
        await (await this.simpleVisualList).click();
        await browser.pause(5000);
        (await this.inputItemTitle).setValue(itemTitle);
        (await this.inputItemLink).setValue(link);
        (await this.dropdownAttributes).scrollIntoView();
        (await this.dropdownAttributes).click();
        (await this.dropdownTarget).waitForDisplayed();
        (await this.dropdownTarget).selectByIndex(1);
        (await this.inputItemDescription).click();
        (await this.inputItemDescription).setValue(description);
        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).scrollIntoView();
        (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }
    

    /**
     * Helper methods to create Visual List Component with Illustration list
     * @param mainTitle 
     * @param itemTitle 
     * @param link 
     * @param description 
     * @param remoteFilePath 
     * @param altText 
     */
    public async createVisualListComponentIllustration(mainTitle: string, itemTitle: string, link: string, description: string, remoteFilePath: string, altText:string) {
        await browser.pause(10000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitle).setValue(mainTitle);
        await (await this.illustrationVisualList).waitForClickable();
        await (await this.illustrationVisualList).click();
        (await this.inputItemTitle).setValue(itemTitle);
        (await this.inputItemLink).setValue(link);
        (await this.dropdownAttributes).scrollIntoView();
        (await this.dropdownAttributes).click();
        (await this.dropdownTarget).waitForDisplayed();
        (await this.dropdownTarget).selectByIndex(1);
        await (await this.illustrationImageDropdown).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        (await this.btnBrowse).scrollIntoView();
        (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(4000); //explicit waits seem to be necessary here
        (await this.inputAltText).waitForEnabled();
        (await this.inputAltText).setValue(altText);
        (await this.btnSaveImage).scrollIntoView();
        (await this.btnSaveImage).click();
        await browser.pause(6000); //explicit waits seem to be necessary here
        await browser.switchToFrame(iframe);
        await browser.pause(4000); //explicit waits seem to be necessary here
        (await this.inputItemDescription).click();
        (await this.inputItemDescription).setValue(description);

        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).scrollIntoView();
        (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    /**
     * Helper methods to create Visual List Component with Illustration list
     * @param mainTitle 
     * @param itemTitle 
     * @param link 
     * @param description 
     * @param remoteFilePath 
     * @param altText 
     */
    public async createVisualListComponentIcon(mainTitle: string, itemTitle: string, link: string, description: string) {
        await browser.pause(10000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitle).setValue(mainTitle);
        await (await this.dropdownToggle).waitForClickable();
        await (await this.dropdownToggle).click();
        await browser.pause(5000);
        await (await this.iconVisualList).scrollIntoView();
        await (await this.iconVisualList).waitForClickable();
        await (await this.iconVisualList).click();
        await browser.pause(5000);
        (await this.inputItemTitle).setValue(itemTitle);
        (await this.inputItemLink).setValue(link);
        (await this.inputItemDescription).click();
        (await this.inputItemDescription).setValue(description);
        (await this.dropdownTarget).waitForDisplayed();
        (await this.dropdownTarget).selectByIndex(1);
        (await this.iconVisualListDropdown).waitForDisplayed();
        (await this.iconVisualListDropdown).selectByIndex(1);
        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).scrollIntoView();
        (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    /**
     * Helper methods to create Visual List Component with Illustration list
     * @param mainTitle 
     * @param itemTitle 
     * @param link 
     * @param description 
     * @param remoteFilePath 
     * @param altText 
     */
     public async createVisualListComponentIllustrationCard(mainTitle: string, eyebrow: string, heading: string, url:string, linkText:string, description: string, remoteFilePath: string, altText:string) {
        await browser.pause(10000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitle).setValue(mainTitle);
        await (await this.dropdownToggle).waitForClickable();
        await (await this.dropdownToggle).click();
        await browser.pause(5000);
        await (await this.illustrationCardVisualList).waitForClickable();
        await (await this.illustrationCardVisualList).click();
        await browser.pause(5000);
        (await this.illustrationCardVisualListEyebrow).setValue(eyebrow);
        (await this.illustrationCardVisualListHeading).setValue(heading);
        (await this.illustrationCardVisualListDescription).setValue(description);
        (await this.illustrationCardVisualListURL).setValue(url);
        (await this.illustrationCardVisualListLinkText).setValue(linkText);
        (await this.dropdownAttributes).scrollIntoView();
        (await this.dropdownAttributes).click();
        (await this.dropdownTarget).waitForDisplayed();
        (await this.dropdownTarget).selectByIndex(1);
        await (await this.illustrationImageDropdown).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        (await this.btnBrowse).scrollIntoView();
        (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(4000); //explicit waits seem to be necessary here
        (await this.inputAltText).waitForEnabled();
        (await this.inputAltText).setValue(altText);
        (await this.btnSaveImage).scrollIntoView();
        (await this.btnSaveImage).click();
        await browser.pause(6000); //explicit waits seem to be necessary here
        await browser.switchToFrame(iframe);
        await browser.pause(4000); //explicit waits seem to be necessary here

        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).scrollIntoView();
        (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    /**
     * Helper methods to create Visual List Component with Illustration list
     * @param mainTitle 
     * @param itemTitle 
     * @param link 
     * @param description 
     * @param remoteFilePath 
     * @param altText 
     */
     public async createVisualListComponentImageCard(mainTitle: string, eyebrow: string, heading: string, url:string, linkText:string, description: string, remoteFilePath: string, altText:string) {
        await browser.pause(10000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitle).setValue(mainTitle);
        await (await this.dropdownToggle).waitForClickable();
        await (await this.dropdownToggle).click();
        await browser.pause(5000);
        await (await this.imageCardVisualList).waitForClickable();
        await (await this.imageCardVisualList).click();
        await browser.pause(5000);
        (await this.illustrationCardVisualListEyebrow).setValue(eyebrow);
        (await this.illustrationCardVisualListHeading).setValue(heading);
        (await this.illustrationCardVisualListDescription).setValue(description);
        (await this.illustrationCardVisualListURL).setValue(url);
        (await this.illustrationCardVisualListLinkText).setValue(linkText);
        (await this.dropdownAttributes).scrollIntoView();
        (await this.dropdownAttributes).click();
        (await this.dropdownTarget).waitForDisplayed();
        (await this.dropdownTarget).selectByIndex(1);
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        (await this.btnBrowse).scrollIntoView();
        (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(4000); //explicit waits seem to be necessary here
        (await this.inputAltText).waitForEnabled();
        (await this.inputAltText).setValue(altText);
        (await this.btnSaveImage).scrollIntoView();
        (await this.btnSaveImage).click();
        await browser.pause(6000); //explicit waits seem to be necessary here
        await browser.switchToFrame(iframe);
        await browser.pause(4000); //explicit waits seem to be necessary here

        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).scrollIntoView();
        (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    /**
     * 
     * @param mainTitle 
     * @param simpleItemTitle 
     * @param illustrationItemTitle 
     * @param link 
     * @param simpleDescription 
     * @param illustrationDescription 
     * @param remoteFilePath 
     * @param altText 
     */
    public async createIllustrationAndSimple(mainTitle: string, simpleItemTitle: string, illustrationItemTitle, link: string, 
        simpleDescription: string, illustrationDescription: string,  remoteFilePath: string, altText:string) {
        await browser.pause(10000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitle).setValue(mainTitle);
        await (await this.illustrationVisualList).waitForClickable();
        await (await this.illustrationVisualList).click();
        (await this.inputItemTitle).setValue(illustrationItemTitle);
        (await this.inputItemLink).setValue(link);
        (await this.dropdownAttributes).scrollIntoView();
        (await this.dropdownAttributes).click();
        (await this.dropdownTarget).waitForDisplayed();
        (await this.dropdownTarget).selectByIndex(1);
        await (await this.illustrationImageDropdown).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        (await this.btnBrowse).scrollIntoView();
        (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(4000); //explicit waits seem to be necessary here
        (await this.inputAltText).waitForEnabled();
        (await this.inputAltText).setValue(altText);
        (await this.btnSaveImage).scrollIntoView();
        (await this.btnSaveImage).click();
        await browser.pause(6000); //explicit waits seem to be necessary here
        await browser.switchToFrame(iframe);
        await browser.pause(4000); //explicit waits seem to be necessary here
        (await this.inputItemDescription).click();
        (await this.inputItemDescription).setValue(illustrationDescription);
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).waitForClickable();
        await (await this.dropdownToggle).click();
        await browser.pause(5000);
        await (await this.simpleVisualList).scrollIntoView();
        await (await this.simpleVisualList).waitForClickable();
        await (await this.simpleVisualList).click();
        await browser.pause(5000);
        await (await this.secondInputItemTitle).scrollIntoView();
        (await this.secondInputItemTitle).setValue(simpleItemTitle);
        await (await this.secondInputItemLink).scrollIntoView();
        (await this.secondInputItemLink).setValue(link);
        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).scrollIntoView();
        (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async isVisualListInFreeformBlock () {
        const freeFormContentList = await this.freeFormContentList;
        console.log(freeFormContentList);
    }
  
}

export default new VisualListBlockPage();
