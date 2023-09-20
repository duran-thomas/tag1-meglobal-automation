import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class TooltipBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout() {
        return $('#edit-submit');
    }

    public get inputTitle() {
        return $('#edit-settings-label');
    }

    public get inputContent() {
        return $('.ck-content');
    }

    public get btnTooltipTrigger() {
        return $('button[data-cke-tooltip-text="Tooltip"]');
    }

    public get btnTooltipSave() {
        return $('button[data-cke-tooltip-text="Save"]');
    }

    //Tooltip component has no unique identifiers, accessing based on index
    public get inputAddText() {
        return $$('input[id^="ck-labeled-field-view"]')[1];
    }

    public get inputAddTooltip() {
        return $$('input[id^="ck-labeled-field-view"]')[2];
    }

    public get inputPlacement() {
        return $$('input[id^="ck-labeled-field-view"]')[3];
    }

    public get inputTheme() {
        return $$('input[id^="ck-labeled-field-view"]')[4];
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

    public get tooltipElement() {
        return $('.mf-tooltip');
    }

    public get dropdownTextFormat() {
        return $('#edit-settings-block-form-field-content-0-subform-field-rich-text-0-format--2');
    }




    /**
     * Helper methods to create Tooltip Component
     */

    public async createHighlightTooltip(title: string, tooltip: string, content: string, placement: string, theme: string) {
        await browser.pause(3000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed({ timeout: 3000 });
        await browser.switchToFrame(iframe);
        await (await this.inputTitle).setValue(title);
        await (await this.inputContent).scrollIntoView();
        //await (await this.dropdownTextFormat).selectByVisibleText('Basic HTML');
        await (await this.inputContent).setValue(content);
        await (await this.inputContent).click();

        await (await browser.pause(1000));
        await (await browser.keys(['Command', 'a']));
        await (await browser.pause(1000));
        await (await this.btnTooltipTrigger).click();
        await (await this.inputAddTooltip).setValue(tooltip);
        await browser.pause(1000);
        await (await this.inputPlacement).setValue(placement);
        await browser.pause(1000);
        await (await this.inputTheme).setValue(theme);
        await browser.pause(1000);
        await (await this.btnTooltipSave).click();
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createTextTooltip(title: string, tooltip: string, content: string, placement: string, theme: string) {
        await browser.pause(3000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed({ timeout: 3000 });
        await browser.switchToFrame(iframe);
        await (await this.inputTitle).setValue(title);
        await (await this.inputContent).scrollIntoView();
        //await (await this.dropdownTextFormat).selectByVisibleText('Basic HTML');
        await (await this.inputContent).click();
        await (await this.btnTooltipTrigger).click();
        await browser.pause(1000);
        await (await this.inputAddText).setValue(content);
        await browser.pause(1000);
        await (await this.inputAddTooltip).setValue(tooltip);
        await browser.pause(1000);
        await (await this.inputPlacement).setValue(placement);
        await browser.pause(1000);
        await (await this.inputTheme).setValue(theme);
        await browser.pause(1000);
        await (await this.btnTooltipSave).click();
        await browser.pause(1000);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async navToTooltip() {
        await browser.pause(3000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed({ timeout: 3000 });
        await browser.switchToFrame(iframe);
        //await (await this.dropdownTextFormat).scrollIntoView({ behavior: 'auto', block: 'center' });
        //await (await this.dropdownTextFormat).selectByVisibleText('Basic HTML');
        await (await this.btnTooltipTrigger).scrollIntoView({ behavior: 'auto', block: 'center' });
        await (await this.btnTooltipTrigger).click();
        await browser.pause(3000);
    }


}

export default new TooltipBlockPage();
