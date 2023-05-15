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

    public get inputItemLink () {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-items-0-subform-field-link-0-uri"]');
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
        return $('iframe[name="entity_browser_iframe_image_and_video"]');
    }

    public get configBlock () {
        return $('.ui-draggable-handle');
    }

   

    /**
     * Helper methods to create Visual List Component
     */

    public async createVisualComponentWithSimpleList(mainTitle: string, itemTitle: string, link: string, description: string) {
        await browser.pause(8000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitle).setValue(mainTitle);
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
        (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }
   
}

export default new VisualListBlockPage();
