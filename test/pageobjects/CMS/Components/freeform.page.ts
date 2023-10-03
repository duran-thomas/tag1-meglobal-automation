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

    //Dropdown Block
    public get inputDropdownTriggerText () {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-trigger-text-0-value-"]');
    }

    public get inputDropdownUrl() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-linked-list-item-0-uri-"]');
    }

    public get inputDropdownLinkText() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-linked-list-item-0-title-"]');
    }

    //Image Block
    public get dropdownImage () {
        return $('details[id^="edit-field-image-"]');
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

    public get entityIframe() {
        return $('#entity_browser_iframe_image_browser');
    }

    //Inline Navigation Block
    public get inputInlineNavLabel() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-label-0-value-"]');
    }

    public get inputInlineNavHeadline() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-text-headline-0-value-"]');
    }

    public get inputInlineNavLinkText() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-links-0-title-"]');
    }
    public get inputInlineNavUrl() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-links-0-uri-"]');
    }

    //Links Block
    public get inputLinkText() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-links-0-title-"]');
    }

    public get inputLinkUrl() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-links-0-uri-"]');
    }

    public get inputLinkText1() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-links-1-title-"]');
    }

    public get inputLinkUrl1() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-links-1-uri-"]');
    }

    public get inputLinkText2() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-links-2-title-"]');
    }

    public get inputLinkUrl2() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-links-2-uri-"]');
    }

    public get btnAddAnotherLink() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-links-add-more-"]');
    }

    //RichText Block

    public get inputContentRichText () {
        return $('.ck-editor__editable');
    }


    //Typeahead block


    public get inputTypeLabel() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-label-0-value-"]');
    }

    public get inputTypePlaceholder() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-placeholder-0-value-"]');
    }

    public get dropdownTypeEndpoint() {
        return $('select[id^="edit-settings-block-form-field-content-0-subform-field-typeahead-config-0-endpoint-"]');
    }

    public get dropdownTypeaheadType() {
        return $('select[id^="edit-settings-block-form-field-content-0-subform-field-typeahead-config-0-config-type-"]');
    }

    //Video Block
    public get dropdownVideo () {
        return $('details[id^="edit-field-video-"]');
    }

    public get btnVideoBrowse() {
        return $("input[type='file']");
    }

    public get btnSaveMedia() {
        return $('#edit-submit');
    }

    public get entityVideoIframe() {
        return $('#entity_browser_iframe_video_media_browser');
    }

    public get tabUploadNewVideo() {
        return $('=Upload new video');
    }

    //Visual List Block
    public get linkAddSimple() {
        return $('.add-more-button-visual-list-item-simple');
    }

    public get inputVisualTitle() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-items-0-subform-field-title-0-value-"]');
    }

    public get inputVisualLink() {
        return $('input[id^="edit-settings-block-form-field-content-0-subform-field-items-0-subform-field-link-0-uri-"]');
    }

    public get dropdownVisualToggle() {
        return $('button[class="dropbutton__toggle"]');
    }

    //Healdine sizing

    public get dropdownHeadlineOptions() {
        return $('#edit-settings-block-form-field-headline-0-more-options');
    }

    public get dropdownRenderAs() {
        return $('#edit-settings-block-form-field-headline-0-more-options-render-as');
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
        await browser.pause(4500); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
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
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createFreeformButton(adminTitle: string, headline: string, text:string, url: string, text1:string, url1: string, text2:string, url2: string) {
        await browser.pause(4500); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
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
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createFreeformDivider(adminTitle: string, headline: string) {
        await browser.pause(4500); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
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
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createFreeformDropdown(adminTitle: string, headline: string, triggerText: string, url: string, linkText: string) {
        await browser.pause(4500); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputAdminTitle).setValue(adminTitle);
        await (await this.inputHeadline).setValue(headline);
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.linkAddDropdownList).click();
        await (await this.inputDropdownTriggerText).waitForDisplayed({timeout:8000});
        await (await this.inputDropdownTriggerText).setValue(triggerText);
        await (await this.inputDropdownUrl).setValue(url);
        await (await this.inputDropdownLinkText).setValue(linkText);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createFreeformImage(adminTitle: string, headline: string, remoteFilePath: string, altText: string) {
        await browser.pause(4500); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputAdminTitle).setValue(adminTitle);
        await (await this.inputHeadline).setValue(headline);
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.linkAddImage).click();
        await (await this.dropdownImage).waitForDisplayed({timeout:8000});
        await (await this.dropdownImage).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityIframe);
        await (await this.btnBrowse).scrollIntoView();
        await (await this.btnBrowse).setValue(remoteFilePath);
        await browser.pause(6000); //explicit waits seem to be necessary here
        await (await this.inputAltText).scrollIntoView();
        await (await this.inputAltText).setValue(altText);
        await (await this.btnSaveImage).scrollIntoView();
        await (await this.btnSaveImage).click();
        await browser.pause(5000); //explicit waits seem to be necessary here
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

    public async createFreeformInlineNav(adminTitle: string, headline: string, label: string, navHeadline: string, linkText: string, url: string) {
        await browser.pause(4500); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputAdminTitle).setValue(adminTitle);
        await (await this.inputHeadline).setValue(headline);
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.linkAddInlineNavigation).click();
        await (await this.inputInlineNavLabel).waitForDisplayed({timeout:8000});
        await (await this.inputInlineNavLabel).setValue(label);
        await (await this.inputInlineNavHeadline).setValue(navHeadline);
        await (await this.inputInlineNavLinkText).setValue(linkText);
        await (await this.inputInlineNavUrl).setValue(url);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createFreeformLinks(adminTitle: string, headline: string, linkText: string, url: string, linkText1: string, url1: string, linkText2: string, url2: string) {
        await browser.pause(4500); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputAdminTitle).setValue(adminTitle);
        await (await this.inputHeadline).setValue(headline);
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.linkAddLinks).click();
        await (await this.inputLinkText).waitForDisplayed({timeout:8000});
        await (await this.inputLinkText).setValue(linkText);
        await (await this.inputLinkUrl).setValue(url);
        await (await this.btnAddAnotherLink).scrollIntoView();
        await (await this.btnAddAnotherLink).click();
        await (await this.inputLinkText1).scrollIntoView();
        await (await this.inputLinkText1).setValue(linkText1);
        await (await this.inputLinkUrl1).setValue(url1);
        await (await this.btnAddAnotherLink).scrollIntoView();
        await (await this.btnAddAnotherLink).click();
        await (await this.inputLinkText2).scrollIntoView();
        await (await this.inputLinkText2).setValue(linkText2);
        await (await this.inputLinkUrl2).setValue(url2);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createFreeformRichText(adminTitle: string, headline: string, content: string) {
        await browser.pause(4500); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputAdminTitle).setValue(adminTitle);
        await (await this.inputHeadline).setValue(headline);
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.linkAddRichText).click();
        await (await this.inputContentRichText).waitForDisplayed({timeout:8000});
        await (await this.inputContentRichText).setValue(content);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createFreeformSpacer(adminTitle: string, headline: string) {
        await browser.pause(4500); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputAdminTitle).setValue(adminTitle);
        await (await this.inputHeadline).setValue(headline);
        await (await this.dropdownToggle).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.dropdownToggle).click();
        await (await this.linkAddSpacer).waitForDisplayed({timeout:4000});
        await (await this.linkAddSpacer).click();
        browser.pause(2000);
        await (await this.btnAddBlock).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createFreeformTypeahead(adminTitle: string, headline: string, label: string, placeholder: string) {
        await browser.pause(4500); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputAdminTitle).setValue(adminTitle);
        await (await this.inputHeadline).setValue(headline);
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.linkAddTypeahead).click();
        await (await this.inputTypeLabel).waitForDisplayed({timeout:8000});
        await (await this.inputTypeLabel).setValue(label);
        await (await this.inputTypePlaceholder).setValue(placeholder);
        await (await this.dropdownTypeEndpoint).selectByVisibleText('Clinical categories');
        await (await this.dropdownTypeaheadType).waitForDisplayed({timeout:6000});
        await (await this.dropdownTypeaheadType).selectByVisibleText('Layout page');
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createFreeformVideo(adminTitle: string, headline: string, remoteFilePath: string) {
        await browser.pause(4500); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputAdminTitle).setValue(adminTitle);
        await (await this.inputHeadline).setValue(headline);
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.linkAddVideo).click();
        await (await this.dropdownVideo).waitForDisplayed({timeout:8000});
        await (await this.dropdownVideo).click();
        // switch to the iframe
        await browser.switchToFrame(await this.entityVideoIframe);
        await (await this.tabUploadNewVideo).click();
        await (await this.btnVideoBrowse).waitForDisplayed({timeout:3500});
        await (await this.btnVideoBrowse).setValue(remoteFilePath);
        await browser.pause(15000); //explicit waits seem to be necessary here
        await (await this.btnSaveMedia).scrollIntoView();
        await (await this.btnSaveMedia).click();
        await browser.pause(5000); //explicit waits seem to be necessary here
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

    public async createFreeformVisualList(adminTitle: string, headline: string, title: string, link: string) {
        await browser.pause(4500); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputAdminTitle).setValue(adminTitle);
        await (await this.inputHeadline).setValue(headline);
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.linkAddVisualList).click();
        await (await this.dropdownVisualToggle).waitForDisplayed({timeout:4000});
        await browser.pause(5000);
        await (await this.dropdownVisualToggle).click();
        await (await this.linkAddSimple).click();
        await (await this.inputVisualTitle).waitForDisplayed({timeout:8000});
        await (await this.inputVisualTitle).setValue(title);
        await (await this.inputVisualLink).setValue(link);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createFreeformSizing(adminTitle: string, headline: string) {
        await browser.pause(4500); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.inputAdminTitle).setValue(adminTitle);
        await (await this.inputHeadline).setValue(headline);
        await (await this.dropdownHeadlineOptions).click();
        await (await this.dropdownRenderAs).selectByVisibleText('h4');
        await (await this.dropdownToggle).scrollIntoView();
        await (await this.dropdownToggle).click();
        await (await this.linkAddDivider).click();
        await (await this.dropdownDividerStyling).waitForDisplayed({timeout:8000});
        await (await this.dropdownDividerStyling).click();
        await (await this.inputExtraClasses).setValue('bg-tint-sky');
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

}

export default new FreeformBlockPage();
