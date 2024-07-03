import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SectionHeaderBlockPage extends Page {
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
        return $$('.ck-editor__editable')[0];
    }

    public get inputContent() {
        return $$('.ck-editor__editable')[1];
    }

    public get btnAddButtons() {
        return $('.add-more-button-buttons');
    }

    public get inputButtonText() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-actions-0-subform-field-buttons-0-title"]');
    }

    public get inputButtonURL() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-actions-0-subform-field-buttons-0-uri"]');
    }

    public get dropdownToggle() {
        return $('.dropbutton__toggle');
    }

    public get btnAddLinks() {
        return $('.add-more-button-links');
    }

    public get inputLinkText() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-actions-1-subform-field-links-0-title"]');
    }

    public get inputLinkURL() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-content-0-subform-field-actions-1-subform-field-links-0-uri"]');
    }

    public get dropdownStyling() {
        return $('#edit-settings-block-form-field-content-widget-0-subform-group-styling');
    }

    public get checkboxMinimal() {
        return $("#edit-settings-block-form-field-content-0-subform-field-minimal-value");
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

    public sectionHeaderElement(id: string) {
        return $(`#${id} .mf-section-header`);
    }

    public get headlineOptions() {
        return $('summary[class="claro-details__summary"]');
    }

    public get dropdownRenderAs() {
        return $('#edit-settings-block-form-field-content-0-subform-field-rich-headline-0-more-options-render-as');
    }

    public get dropdownLinkOptions() {
        return $('summary[aria-controls^="edit-settings-block-form-field-content-0-subform-field-actions-1-subform-field-links-0-link-options"]');
    }

    public get dropdownLinkTarget() {
        return $('select[id^="edit-settings-block-form-field-content-0-subform-field-actions-1-subform-field-links-0-link-options-target"]');
    }

    public get dropdownButtonOptions() {
        return $('summary[aria-controls^="edit-settings-block-form-field-content-0-subform-field-actions-0-subform-field-buttons-0-link-options"]');
    }

    public get dropdownButtonTarget() {
        return $('select[id^="edit-settings-block-form-field-content-0-subform-field-actions-0-subform-field-buttons-0-link-options-target"]');
    }

    /**
     * Helper methods to create Section Header Component
     */


    public async createSectionHeader(title: string, headline: string, content: string, btnText: string, btnUrl: string, linkText: string, linkUrl: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputTitle).setValue(title);
        await (await this.inputHeadline).scrollIntoView();
        await (await this.inputHeadline).setValue(headline);
        await (await this.inputContent).scrollIntoView();
        await (await this.inputContent).setValue(content)
        await browser.pause(3000); //explicit wait seems necessary here
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.btnAddButtons).click();
        await (await this.inputButtonText).scrollIntoView();
        await (await this.inputButtonText).setValue(btnText);
        await (await this.inputButtonURL).setValue(btnUrl);
        await browser.pause(3000); //explicit wait seems necessary here
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.btnAddLinks).click();
        await (await this.inputLinkText).scrollIntoView();
        await (await this.inputLinkText).setValue(linkText);
        await (await this.inputLinkURL).setValue(linkUrl);
        await browser.pause(3000); //explicit wait seems necessary here
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async checkHeadingSize(){
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.headlineOptions).scrollIntoView();
        await (await this.headlineOptions).click();
        await browser.pause(2500);
    }

    public async createSectionHeaderAnalytics(title: string, headline: string, content: string, btnText: string, btnUrl: string, linkText: string, linkUrl: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputTitle).setValue(title);
        await (await this.inputHeadline).scrollIntoView();
        await (await this.inputHeadline).setValue(headline);
        await (await this.inputContent).scrollIntoView();
        await (await this.inputContent).setValue(content)
        await browser.pause(3000); //explicit wait seems necessary here
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.btnAddButtons).click();
        await (await this.inputButtonText).scrollIntoView();
        await (await this.inputButtonText).setValue(btnText);
        await (await this.inputButtonURL).scrollIntoView();
        await (await this.inputButtonURL).setValue(btnUrl);
        await (await this.dropdownButtonOptions).scrollIntoView();
        await (await this.dropdownButtonOptions).click();
        await (await this.dropdownButtonTarget).selectByVisibleText('_blank');
        await browser.pause(3000); //explicit wait seems necessary here
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.btnAddLinks).click();
        await (await this.inputLinkText).scrollIntoView();
        await (await this.inputLinkText).setValue(linkText);
        await (await this.inputLinkURL).setValue(linkUrl);
        await (await this.dropdownLinkOptions).scrollIntoView();
        await (await this.dropdownLinkOptions).click();
        await (await this.dropdownLinkTarget).selectByVisibleText('_blank');
        await browser.pause(3000); //explicit wait seems necessary here
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }


    public async navToStyling() {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.dropdownStyling).scrollIntoView();
        await (await this.dropdownStyling).click();
        await (await this.checkboxMinimal).scrollIntoView()
        await browser.pause(3000);
    }

}

export default new SectionHeaderBlockPage();
