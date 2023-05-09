import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class FactsBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout () {
        return $('#edit-submit');
    }

    public get inputTitleLabel () {
        return $('#edit-settings-label');
    }

    //Facts area start

    public get inputFactTitle1 () {
        return $('input[id^="edit-settings-block-form-field-facts-0-subform-field-title-0-value"]');
    }

    public get inputFactDescription1 () {
        return $('textarea[id^="edit-settings-block-form-field-facts-0-subform-field-description-0-value"]');
    }

    public get inputFactTitle2 () {
        return $('input[id^="edit-settings-block-form-field-facts-1-subform-field-title-0-value"]');
    }

    public get inputFactDescription2 () {
        return $('textarea[id^="edit-settings-block-form-field-facts-1-subform-field-description-0-value"]');
    }

    public get inputFactTitle3 () {
        return $('input[id^="edit-settings-block-form-field-facts-2-subform-field-title-0-value"]');
    }

    public get inputFactDescription3 () {
        return $('textarea[id^="edit-settings-block-form-field-facts-2-subform-field-description-0-value"]');
    }

    public get inputFactTitle4 () {
        return $('input[id^="edit-settings-block-form-field-facts-3-subform-field-title-0-value"]');
    }

    public get inputFactDescription4 () {
        return $('textarea[id^="edit-settings-block-form-field-facts-3-subform-field-description-0-value"]');
    }

    public get inputFactTitle5 () {
        return $('input[id^="edit-settings-block-form-field-facts-4-subform-field-title-0-value"]');
    }

    public get inputFactDescription5 () {
        return $('textarea[id^="edit-settings-block-form-field-facts-4-subform-field-description-0-value"]');
    }


    //Facts area end

    public get btnAddFact () {
        return $('input[value="Add Fact"]');
    }

    public get dropdownMenuIcon () {
        return $('.paragraphs-dropdown-toggle');
    }

    public get btnDuplicate () {
        return $('input[value="Duplicate"]');
    }


    //Styling area start

    public get dropdownStyling () {
        return $('.claro-details__summary');
    }

    public get dropdownBackground () {
        return $('#edit-settings-block-form-field-background');
    }

    public get dropdownTitleVariant () {
        return $('#edit-settings-block-form-field-facts-title-variant');
    }

    public get dropdownLayout () {
        return $('#edit-settings-block-form-field-facts-layout');
    }

    public get dropdownHorizontalAlignment () {
        return $('#edit-settings-block-form-field-horizontal-alignment');
    }

    public get dropdownVerticalAlignment () {
        return $('#edit-settings-block-form-field-vertical-alignment');
    }

    public get checkboxAddBorder() {
        return $('#edit-settings-block-form-field-border-value');
    }
    //Styling area end


    public get btnAddBlock () {
        return $('#edit-actions-submit');
    }

    public get configBlock () {
        return $('.ui-draggable-handle');
    }

    public get horizontalElement () {
        return $('.mf-facts--horizontal');
    }

    public get factsElement () {
        return $('.mf-facts');
    }

    public get btnCarousel() {
        return $('.mf-carousel__nav-button');
    }

    public get titleElement () {
        return $('p.mb-8');
    }

    public get successMsg () {
        return $('.mf-alert__container--success');
    }

    /**
     * Helper methods to create Quotes Component
     */

    public async createFactsWithHorizontalLayout(mainTitle: string, title1: string, description1: string, title2: string, description2: string, title3: string, description3: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitleLabel).setValue(mainTitle);
        (await this.inputFactTitle1).setValue(title1);
        (await this.inputFactDescription1).scrollIntoView();
        (await this.inputFactDescription1).click();
        (await this.inputFactDescription1).setValue(description1);
        (await this.btnAddFact).scrollIntoView();
        (await this.btnAddFact).click();
        (await this.inputFactTitle2).waitForExist();
        (await this.inputFactTitle2).scrollIntoView();
        (await this.inputFactTitle2).setValue(title2);
        (await this.inputFactDescription2).setValue(description2);
        await browser.pause(5000);
        (await this.btnAddFact).waitForClickable();
        (await this.btnAddFact).scrollIntoView();
        (await this.btnAddFact).click();
        (await this.inputFactTitle3).waitForExist();
        (await this.inputFactTitle3).scrollIntoView();
        (await this.inputFactTitle3).setValue(title3);
        (await this.inputFactDescription3).setValue(description3);
        (await this.dropdownStyling).scrollIntoView();
        (await this.dropdownStyling).click();
        await browser.pause(5000);
        (await this.dropdownLayout).scrollIntoView();
        (await this.dropdownLayout).selectByIndex(1);
        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).waitForDisplayed();
        (await this.btnSaveLayout).scrollIntoView();
        (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createFactsWithVerticalLayout(mainTitle: string, title1: string, description1: string, title2: string, description2: string, title3: string, description3: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitleLabel).setValue(mainTitle);
        (await this.inputFactTitle1).setValue(title1);
        (await this.inputFactDescription1).scrollIntoView();
        (await this.inputFactDescription1).click();
        (await this.inputFactDescription1).setValue(description1);
        (await this.btnAddFact).scrollIntoView();
        (await this.btnAddFact).click();
        (await this.inputFactTitle2).waitForExist();
        (await this.inputFactTitle2).scrollIntoView();
        (await this.inputFactTitle2).setValue(title2);
        (await this.inputFactDescription2).setValue(description2);
        await browser.pause(5000);
        (await this.btnAddFact).waitForClickable();
        (await this.btnAddFact).scrollIntoView();
        (await this.btnAddFact).click();
        (await this.inputFactTitle3).waitForExist();
        (await this.inputFactTitle3).scrollIntoView();
        (await this.inputFactTitle3).setValue(title3);
        (await this.inputFactDescription3).setValue(description3);
        (await this.dropdownStyling).scrollIntoView();
        (await this.dropdownStyling).click();
        await browser.pause(5000);
        (await this.dropdownLayout).scrollIntoView();
        (await this.dropdownLayout).selectByIndex(0);
        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).waitForDisplayed();
        (await this.btnSaveLayout).scrollIntoView();
        (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }
    
    public async createFactsWithGridLayout(mainTitle: string, title1: string, description1: string, title2: string, description2: string, title3: string, description3: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitleLabel).setValue(mainTitle);
        (await this.inputFactTitle1).setValue(title1);
        (await this.inputFactDescription1).scrollIntoView();
        (await this.inputFactDescription1).click();
        (await this.inputFactDescription1).setValue(description1);
        (await this.btnAddFact).scrollIntoView();
        (await this.btnAddFact).click();
        (await this.inputFactTitle2).waitForExist();
        (await this.inputFactTitle2).scrollIntoView();
        (await this.inputFactTitle2).setValue(title2);
        (await this.inputFactDescription2).setValue(description2);
        await browser.pause(5000);
        (await this.btnAddFact).waitForClickable();
        (await this.btnAddFact).scrollIntoView();
        (await this.btnAddFact).click();
        (await this.inputFactTitle3).waitForExist();
        (await this.inputFactTitle3).scrollIntoView();
        (await this.inputFactTitle3).setValue(title3);
        (await this.inputFactDescription3).setValue(description3);
        (await this.dropdownStyling).scrollIntoView();
        (await this.dropdownStyling).click();
        await browser.pause(5000);
        (await this.dropdownLayout).scrollIntoView();
        (await this.dropdownLayout).selectByIndex(2);
        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).waitForDisplayed();
        (await this.btnSaveLayout).scrollIntoView();
        (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createFactsWithSliderLayout(mainTitle: string, title1: string, description1: string, title2: string, description2: string, title3: string, description3: string, title4: string, description4: string, title5: string, description5: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitleLabel).setValue(mainTitle);
        (await this.inputFactTitle1).setValue(title1);
        (await this.inputFactDescription1).scrollIntoView();
        (await this.inputFactDescription1).click();
        (await this.inputFactDescription1).setValue(description1);
        (await this.btnAddFact).scrollIntoView();
        (await this.btnAddFact).click();
        (await this.inputFactTitle2).waitForExist();
        (await this.inputFactTitle2).scrollIntoView();
        (await this.inputFactTitle2).setValue(title2);
        (await this.inputFactDescription2).setValue(description2);
        await browser.pause(5000);
        (await this.btnAddFact).waitForClickable();
        (await this.btnAddFact).scrollIntoView();
        (await this.btnAddFact).click();
        (await this.inputFactTitle3).waitForExist();
        (await this.inputFactTitle3).scrollIntoView();
        (await this.inputFactTitle3).setValue(title3);
        (await this.inputFactDescription3).setValue(description3);
        
        await browser.pause(5000);
        (await this.btnAddFact).waitForClickable();
        (await this.btnAddFact).scrollIntoView();
        (await this.btnAddFact).click();
        (await this.inputFactTitle4).waitForExist();
        (await this.inputFactTitle4).scrollIntoView();
        (await this.inputFactTitle4).setValue(title4);
        (await this.inputFactDescription4).setValue(description4);

        await browser.pause(5000);
        (await this.btnAddFact).waitForClickable();
        (await this.btnAddFact).scrollIntoView();
        (await this.btnAddFact).click();
        (await this.inputFactTitle5).waitForExist();
        (await this.inputFactTitle5).scrollIntoView();
        (await this.inputFactTitle5).setValue(title5);
        (await this.inputFactDescription5).setValue(description5);

        (await this.dropdownStyling).scrollIntoView();
        (await this.dropdownStyling).click();
        await browser.pause(5000);
        (await this.dropdownLayout).scrollIntoView();
        (await this.dropdownLayout).selectByIndex(3);
        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).waitForDisplayed();
        (await this.btnSaveLayout).scrollIntoView();
        (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createAFact(mainTitle: string, title1: string, description1: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitleLabel).setValue(mainTitle);
        (await this.inputFactTitle1).setValue(title1);
        (await this.inputFactDescription1).scrollIntoView();
        (await this.inputFactDescription1).click();
        (await this.inputFactDescription1).setValue(description1);
        await browser.pause(5000);
        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        (await this.btnSaveLayout).waitForDisplayed();
        (await this.btnSaveLayout).scrollIntoView();
        (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async navToStyling() {
        await browser.pause(10000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await browser.pause(3000);
        (await this.dropdownStyling).scrollIntoView();
        (await this.dropdownStyling).click();
        (await this.dropdownLayout).scrollIntoView();
    }


}

export default new FactsBlockPage();
