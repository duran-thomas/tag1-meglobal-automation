import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class FreeformBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout() {
        return $('#edit-submit');
    }

    public get inputAdminTitle() {
        return $('#edit-settings-label');
    }

    public get inputHeadline() {
        return $('#edit-settings-block-form-field-headline-0-headline');
    }

    public get dropdownToggle() {
        return $('.dropbutton__toggle');
    }

    public get linkAddButtons() {
        return $('.add-more-button-buttons');
    }

    public get linkAddImage() {
        return $('.add-more-button-image');
    }

    public get linkAddLinks() {
        return $('.add-more-button-links');
    }

    public get linkAddRichText() {
        return $('.add-more-button-rich-text');
    }

    public get linkAddAccordion() {
        return $('.add-more-button-accordion');
    }

    public get linkAddSpacer() {
        return $('.add-more-button-spacer');
    }

    public get linkAddVideo() {
        return $('.add-more-button-video');
    }

    public get linkAddDropdownList() {
        return $('.add-more-button-dropdown-list');
    }
    public get linkAddVisualList() {
        return $('.add-more-button-visual-list');
    }

    public get linkAddInlineNavigation() {
        return $('.add-more-button-inline-navigation');
    }

    public get linkAddDivider() {
        return $('.add-more-button-divider');
    }

    public get linkAddTypeahead() {
        return $('.add-more-button-typeahead');
    }

    public get freeformHeadline() {
        return $('h3=Freeform Headline');
    }

    //Accordion block
    public get inputTitle() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-rich-accordion-item-0-title-"]');
    }

    public get inputContent() {
        return $('div[role="textbox"]');
    }

    public get btnAccordion() {
        return $$('.mf-accordion__item__trigger')[0];
    }


    //Button block
    public get inputButtonText() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-buttons-0-title"]');
    }

    public get inputButtonUrl() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-buttons-0-uri"]');
    }

    public get btnAddAnother() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-buttons-add-more"]');
    }

    public get inputButtonText1() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-buttons-1-title"]');
    }

    public get inputButtonUrl1() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-buttons-1-uri"]');
    }

    public get inputButtonText2() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-buttons-2-title"]');
    }

    public get inputButtonUrl2() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-buttons-2-uri"]');
    }

    //Divider block
    public get dropdownDividerStyling () {
        return $('details[id^="edit-settings-block-form-field-content-widget-0-subform-group-styling-"]');
    }

    public get inputExtraClasses() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-extra-classes-0-value-"]');
    }

    public get dividerElement() {
        return $('hr[class="mf-divider bg-soft-gray bg-tint-sky"]');
    }

    // public get () {
    //     return $('');
    // }
    // public get () {
    //     return $('');
    // }

    // public get () {
    //     return $('');
    // }

    // public get () {
    //     return $('');
    // }
    // public get () {
    //     return $('');
    // }

    // public get () {
    //     return $('');
    // }

    // public get () {
    //     return $('');
    // }
    // public get () {
    //     return $('');
    // }

    // public get () {
    //     return $('');
    // }

    // public get () {
    //     return $('');
    // }

    public get btnAddBlock() {
        return $('#edit-actions-submit');
    }

    public get configBlock() {
        return $('.ui-draggable-handle');
    }

    public get successMsg() {
        return $('.mf-alert__container--success');
    }


    /**
     * Helper methods to create freeform Components
     */

    public async createFreeformAccordion(adminTitle: string, headline: string, title:string, content: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputAdminTitle).setValue(adminTitle);
        await (await this.inputHeadline).setValue(headline);
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.linkAddAccordion).click();
        await (await this.inputTitle).waitForDisplayed({timeout:8000});
        await (await this.inputTitle).setValue(title);
        await (await this.inputContent).setValue(content);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createFreeformButton(adminTitle: string, headline: string, text:string, url: string, text1:string, url1: string, text2:string, url2: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputAdminTitle).setValue(adminTitle);
        await (await this.inputHeadline).setValue(headline);
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.linkAddButtons).click();
        await (await this.inputButtonText).waitForDisplayed({timeout:8000});
        await (await this.inputButtonText).setValue(text);
        await (await this.inputButtonUrl).setValue(url);
        await (await this.btnAddAnother).scrollIntoView();
        await (await this.btnAddAnother).click();
        //second button
        await (await this.inputButtonText1).waitForDisplayed({timeout:8000});
        await (await this.inputButtonText1).setValue(text1);
        await (await this.inputButtonUrl1).setValue(url1);
        await (await this.btnAddAnother).scrollIntoView();
        await (await this.btnAddAnother).click();
        //third button
        await (await this.inputButtonText2).waitForDisplayed({timeout:8000});
        await (await this.inputButtonText2).setValue(text2);
        await (await this.inputButtonUrl2).setValue(url2);

        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createFreeformDivider(adminTitle: string, headline: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputAdminTitle).setValue(adminTitle);
        await (await this.inputHeadline).setValue(headline);
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.linkAddDivider).click();
        await (await this.dropdownDividerStyling).waitForDisplayed({timeout:8000});
        await (await this.dropdownDividerStyling).click();
        await (await this.inputExtraClasses).setValue('bg-tint-sky');
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    

}

export default new FreeformBlockPage();
