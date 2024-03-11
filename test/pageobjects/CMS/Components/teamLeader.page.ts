import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class TeamLeaderBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout() {
        return $('#edit-submit');
    }
    //Team Member Grid
    public get adminTitle() {
        return $('#edit-settings-label');
    }

    public get dropdownGroupID() {
        return $('#edit-settings-block-form-field-team-identifier');
    }

    public get listChoiceThree() {
        return $('#choices--edit-settings-block-form-field-team-identifier-item-choice-3');
    }

    public get checkboxOnlyLeaders() {
        return $('#edit-settings-block-form-field-show-only-leaders-value');
    }

    //Team Leader Carousel
    public get inputTitle() {
        return $('#edit-settings-block-form-field-title-0-value');
    }

    public get dropdownTeamGroupID() {
        return $('#edit-settings-block-form-field-team-identifier');
    }

    public get inputContent() {
        return $('.ck-editor__editable');
    }

    public get inputButtonText() {
        return $('#edit-settings-block-form-field-button-0-title');
    }

    public get inputURL() {
        return $('#edit-settings-block-form-field-button-0-uri');
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

    public teamMemberGrid(id:string) {
        return $(`#${id} .mf-grid`);
    }

    public get textBox() {
        return $$('.mf-card-general__box');
    }

    public teamCarousel(id:string) {
        return $(`#${id} .mf-carousel`);
    }

    public get headerTitleElem() {
        return $('.mf-section-header');
    }

    public get dropdownButtonOptions() {
        return $('#edit-settings-block-form-field-button-0-link-options');
    }

    public get dropdownTarget() {
        return $('#edit-settings-block-form-field-button-0-link-options-target');
    }



    /**
     * Helper methods to create Team Leader Component
     */

    public async createTeamMemberGridLeaders(adminTitle: string, groupID: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.adminTitle).setValue(adminTitle);
        await (await this.dropdownGroupID).click();
        await (await this.listChoiceThree).click();
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createTeamMemberGrid(adminTitle: string, groupID: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.adminTitle).setValue(adminTitle);
        await (await this.dropdownGroupID).click();
        await (await this.listChoiceThree).click();
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createTeamLeaderCarousel(adminTitle: string, title: string, teamGroupID: string, content: string, btnText: string, url: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.adminTitle).setValue(adminTitle);
        await (await this.inputTitle).setValue(title);
        await (await this.dropdownTeamGroupID).click();
        await (await this.listChoiceThree).click();
        await (await this.inputContent).scrollIntoView();
        await (await this.inputContent).setValue(content);
        await (await this.inputButtonText).scrollIntoView();
        await (await this.inputButtonText).setValue(btnText);
        await (await this.inputURL).setValue(url);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createAnalyticsCarousel(adminTitle: string, title: string, teamGroupID: string, content: string, btnText: string, url: string) {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.adminTitle).setValue(adminTitle);
        await (await this.inputTitle).setValue(title);
        await (await this.dropdownTeamGroupID).click();
        await (await this.listChoiceThree).click();
        await (await this.inputContent).scrollIntoView();
        await (await this.inputContent).setValue(content);
        await (await this.inputButtonText).scrollIntoView();
        await (await this.inputButtonText).setValue(btnText);
        await (await this.inputURL).setValue(url);
        await (await this.dropdownButtonOptions).scrollIntoView();
        await (await this.dropdownButtonOptions).click();
        await (await this.dropdownTarget).selectByVisibleText('_blank');
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }


}

export default new TeamLeaderBlockPage();
