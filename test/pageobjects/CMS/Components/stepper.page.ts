import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class StepperBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout() {
        return $('#edit-submit');
    }

    public get inputAdminTitle() {
        return $('#edit-settings-label');
    }

    public get inputTitle() {
        return $('#edit-settings-block-form-field-steps-0-subform-field-title-0-value');
    }

    public get inputContent() {
        return $('#edit-settings-block-form-field-steps-0-subform-field-content-0-value');
    }

    public get inputActiveStep() {
        return $('#edit-settings-block-form-field-active-step-0-value')
    }

    public get inputBackLabel() {
        return $('#edit-settings-block-form-field-go-back-label-0-value')
    }

    public get inputContinueLabel() {
        return $('#edit-settings-block-form-field-continue-label-0-value')
    }

    public get dropdownStyling() {
        return $('#edit-settings-block-form-group-styling')
    }

    public get dropdownOrientation() {
        return $('#edit-settings-block-form-field-orientation')
    }
    public get dropdownSite() {
        return $('#edit-settings-block-form-field-site')
    }

    public get btnAddStep() {
        return $('div[data-drupal-selector="edit-settings-block-form-field-steps-add-more"]');
    }

    //second tab area

    public get inputTitle1() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-steps-1-subform-field-title-0-value"]');
    }

    public get inputContent1() {
        return $('textarea[data-drupal-selector="edit-settings-block-form-field-steps-1-subform-field-content-0-value"]');
    }

    public get inputTitle2() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-steps-2-subform-field-title-0-value"]');
    }

    public get inputContent2() {
        return $('textarea[data-drupal-selector="edit-settings-block-form-field-steps-2-subform-field-content-0-value"]');
    }

    public get inputTitle3() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-steps-3-subform-field-title-0-value"]');
    }

    public get inputContent3() {
        return $('textarea[data-drupal-selector="edit-settings-block-form-field-steps-3-subform-field-content-0-value"]');
    }

    public get inputTitle4() {
        return $('input[data-drupal-selector="edit-settings-block-form-field-steps-4-subform-field-title-0-value"]');
    }

    public get inputContent4() {
        return $('textarea[data-drupal-selector="edit-settings-block-form-field-steps-4-subform-field-content-0-value"]');
    }

    public get btnAddBlock() {
        return $('#edit-actions-submit');
    }

    public get successMsg() {
        return $('.mf-alert__container--success');
    }

    public stepperElement(id:string) {
        return $(`#${id} .mf-stepper`);
    }

    public get stepperList() {
        return $('.mf-stepper__list');
    }

    public get stepsElements() {
        return $$('.mf-stepper__step');
    }

    public get configBlock() {
        return $('.ui-draggable-handle');
    }

    public get dropdownToggle() {
        return $('.dropbutton__toggle');
    }

    public get linkRichText() {
        return $('.add-more-button-rich-text');
    }

    public btnBackStep(id:string) {
        return $(`#${id} button[data-analytics-click-text="Step 5: Transition of care"]`);
    }

    public btnNextStep(id:string) {
        return $(`#${id} button[data-analytics-click-text="Step 1: Assess the situation"]`);
    }

    public get btnLastStep() {
        return $$('.mf-stepper__button')[4];
    }

    /**
     * Helper methods to create Stepper Component
     */

    public async checkRequired(adminTitle: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputAdminTitle).setValue(adminTitle);

        await (await this.btnAddBlock).scrollIntoView({ block: 'center' });
        await (await this.btnAddBlock).click();
        await browser.pause(1500);
        // await browser.refresh();
    }

    public async createHorizontalStepper(adminTitle: string, title: string, content: string, title1: string, content1: string, title2: string, content2: string, title3: string, content3: string, title4: string, content4: string, backLabel: string, contLabel: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);

        await (await this.inputAdminTitle).setValue(adminTitle);

        await (await this.inputTitle).scrollIntoView({ block: 'center' });
        await (await this.inputTitle).setValue(title);
        await (await this.inputContent).setValue(content);
        await (await this.btnAddStep).scrollIntoView({ block: 'center' });
        await (await this.btnAddStep).click();

        await (await this.inputTitle1).waitForDisplayed({ timeout: 5000 });
        await (await this.inputTitle1).setValue(title1);
        await (await this.inputContent1).setValue(content1);
        await (await this.btnAddStep).click();

        await (await this.inputTitle2).waitForDisplayed({ timeout: 5000 });
        await (await this.inputTitle2).setValue(title2);
        await (await this.inputContent2).setValue(content2);
        await (await this.btnAddStep).click();

        await (await this.inputTitle3).waitForDisplayed({ timeout: 5000 });
        await (await this.inputTitle3).setValue(title3);
        await (await this.inputContent3).setValue(content3);
        await (await this.btnAddStep).click();

        await (await this.inputTitle4).waitForDisplayed({ timeout: 5000 });
        await (await this.inputTitle4).setValue(title4);
        await (await this.inputContent4).setValue(content4);

        await (await this.inputBackLabel).scrollIntoView({ block: 'center' });
        await (await this.inputBackLabel).setValue(backLabel);
        await (await this.inputContinueLabel).setValue(contLabel);

        await (await this.btnAddBlock).scrollIntoView({ block: 'center' });
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed({ timeout: 4000 });
        await (await this.btnSaveLayout).scrollIntoView({ block: 'center' });
        await (await this.btnSaveLayout).click();
        await browser.pause(2000);
    }

    public async createVerticalStepper(adminTitle: string, title: string, content: string, title1: string, content1: string, title2: string, content2: string, title3: string, content3: string, title4: string, content4: string, backLabel: string, contLabel: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.inputAdminTitle).setValue(adminTitle);

        await (await this.inputTitle).scrollIntoView({ block: 'center' });
        await (await this.inputTitle).setValue(title);
        await (await this.inputContent).setValue(content);
        await (await this.btnAddStep).scrollIntoView({ block: 'center' });
        await (await this.btnAddStep).click();

        await (await this.inputTitle1).waitForDisplayed({ timeout: 5000 });
        await (await this.inputTitle1).setValue(title1);
        await (await this.inputContent1).setValue(content1);
        await (await this.btnAddStep).click();

        await (await this.inputTitle2).waitForDisplayed({ timeout: 5000 });
        await (await this.inputTitle2).setValue(title2);
        await (await this.inputContent2).setValue(content2);
        await (await this.btnAddStep).click();

        await (await this.inputTitle3).waitForDisplayed({ timeout: 5000 });
        await (await this.inputTitle3).setValue(title3);
        await (await this.inputContent3).setValue(content3);
        await (await this.btnAddStep).click();

        await (await this.inputTitle4).waitForDisplayed({ timeout: 5000 });
        await (await this.inputTitle4).setValue(title4);
        await (await this.inputContent4).setValue(content4);

        await (await this.inputBackLabel).scrollIntoView({ block: 'center' });
        await (await this.inputBackLabel).setValue(backLabel);
        await (await this.inputContinueLabel).setValue(contLabel);
        await (await this.dropdownStyling).click();
        await (await this.dropdownOrientation).selectByVisibleText('Vertical');

        await (await this.btnAddBlock).scrollIntoView({ block: 'center' });
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed({ timeout: 4000 });
        await (await this.btnSaveLayout).scrollIntoView({ block: 'center' });
        await (await this.btnSaveLayout).click();
        await browser.pause(2000);
    }


}

export default new StepperBlockPage();
