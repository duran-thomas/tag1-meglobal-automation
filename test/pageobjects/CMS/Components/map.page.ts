import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class MapBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout () {
        return $('#edit-submit');
    }

    public get inputTitle () {
        return $('#edit-settings-label');
    }

    public get inputHighlightTitle () {
        return $('#edit-settings-block-form-field-highlights-0-subform-field-title-0-value');
    }

    public get inputMapConfig () {
        return $('#edit-settings-block-form-field-map-config-0-value');
    }

    public get dropdownStyling () {
        return $('#edit-settings-block-form-group-styling');
    }

    public get dropdownLayout () {
        return $('#edit-settings-block-form-field-layout');
    }

    public get checkboxHideLocationCards () {
        return $('#edit-settings-block-form-field-hide-location-cards-value');
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

    public get mapElement () {
        return $('.mf-map');
    }


    /**
     * Helper methods to create Map Component
     */

    public async createMap(title: string, highlightTitle: string, mapConfig: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        (await this.inputTitle).setValue(title);
        (await this.inputHighlightTitle).scrollIntoView();
        (await this.inputHighlightTitle).setValue(highlightTitle);
        await browser.pause(2000);
        (await this.inputMapConfig).scrollIntoView();
        (await this.inputMapConfig).setValue(mapConfig);
        await browser.pause(2000);
        (await this.btnAddBlock).scrollIntoView();
        (await this.btnAddBlock).click();
        await browser.pause(2000);
        (await this.btnSaveLayout).waitForDisplayed();
        (await this.btnSaveLayout).scrollIntoView();
        (await this.btnSaveLayout).click();
        await browser.pause(2000);
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
        await browser.pause(2000);
    }
}

export default new MapBlockPage();