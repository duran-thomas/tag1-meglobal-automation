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

    public get inputGroupID() {
        return $('#edit-settings-block-form-field-group-id-0-value');
    }
    //Team Leader Carousel
    public get inputTitle() {
        return $('#edit-settings-block-form-field-title-0-value');
    }

    public get inputTeamGroupID() {
        return $('#edit-settings-block-form-field-team-id-0-value');
    }

    public get inputContent() {
        return $('.ck-content');
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

    public get teamMemberGrid() {
        return $('.mf-grid');
    }

    public get textBox() {
        return $$('.mf-card-general__box');
    }

    public get teamCarousel() {
        return $('.mf-carousel');
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

    public async createTeamMemberGrid(adminTitle: string, groupID: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.adminTitle).setValue(adminTitle);
        await (await this.inputGroupID).setValue(groupID);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createTeamLeaderCarousel(adminTitle: string, title: string, teamGroupID: string, content: string, btnText: string, url: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.adminTitle).setValue(adminTitle);
        await (await this.inputTitle).setValue(title);
        await (await this.inputTeamGroupID).setValue(teamGroupID);
        await (await this.inputContent).scrollIntoView();
        await (await this.inputContent).setValue(content);
        await (await this.inputButtonText).scrollIntoView();
        await (await this.inputButtonText).setValue(btnText);
        await (await this.inputURL).setValue(url);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }

    public async createAnalyticsCarousel(adminTitle: string, title: string, teamGroupID: string, content: string, btnText: string, url: string) {
        await browser.pause(6000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
        await (await this.adminTitle).setValue(adminTitle);
        await (await this.inputTitle).setValue(title);
        await (await this.inputTeamGroupID).setValue(teamGroupID);
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
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }


}

export default new TeamLeaderBlockPage();
