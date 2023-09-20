import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class QuickActionsBlockPage extends Page {
    /**
     * define selectors using getter methods
     */



    public get btnAddNewMenu() {
        return $('.button');
    }

    public get linkGroupQuickActions() {
        return $('=Group menu (Quick Actions)');
    }

    public get inputTitle() {
        return $('#edit-label-0-value');
    }

    public get btnSave() {
        return $('#edit-submit');
    }

    public get statusMsg() {
        return $('.messages__content');
    }

    public get btnAddNewContent() {
        return $('a[href="/group/1/node/create"]');
    }

    public get linkGroupLayoutPage() {
        return $('=Group node (Layout Page)');
    }

    public get createdMenu() {
        return $('=Quick Actions test menu');
    }

    public get addLink() {
        return $('=Add link');
    }

    public get inputMenuLinkTitle() {
        return $('#edit-title-0-value');
    }

    public get inputLink() {
        return $('#edit-link-0-uri');
    }

    public get tabLayout() {
        return $('=Layout');
    }

    public get modalBtnAddSection() {
        return $$('#edit-actions-submit')[0];
    }

    public get linkAddBlock() {
        return $$('div[class="layout-builder__add-block"]')[0];
    }

    public get compTitle() {
        return $('#edit-settings-label');
    }

    public get inputHeadline() {
        return $('#edit-settings-headline');
    }

    public get dropdownSource() {
        return $('#edit-settings-source-menu');
    }

    public get btnSaveLayout() {
        return $('#edit-submit');
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

    public get quickActionsElement() {
        return $('.mf-quick-actions');
    }

    public get quickActionsButton() {
        return $('a.mf-button');
    }

    public get inputNodeTitle() {
        return $('input[data-drupal-selector="edit-title-0-value"]');
    }

    public get btnDelete() {
        return $('#edit-delete');
    }

    public get createdNode() {
        return $('=Quick Action test node')
    }

    public get pageDelete() {
        return $('=Delete');
    }


    /**
     * Helper methods to create Quick Actions Component
     */

    public async createMenu(title: string) {
        await (await this.btnAddNewMenu).click();
        await this.linkGroupQuickActions.waitForDisplayed({ timeout: 2000 });
        await (await this.linkGroupQuickActions).click();
        await (await this.inputTitle).waitForDisplayed({ timeout: 2000 });
        await (await this.inputTitle).setValue(title);
        await (await this.btnSave).waitForEnabled({ timeout: 2000 });
        await (await this.btnSave).click();
    }

    public async addLinkToMenu(menuTitle: string, link: string) {
        await (await this.createdMenu).waitForDisplayed({ timeout: 2000 });
        await (await this.createdMenu).click();
        await (await this.addLink).click();
        await (await this.inputMenuLinkTitle).waitForDisplayed({ timeout: 2000 });
        await (await this.inputMenuLinkTitle).setValue(menuTitle);
        await (await this.inputLink).setValue(link);
        await (await this.btnSave).scrollIntoView();
        await (await this.btnSave).click();
    }

    public async createNode(title: string) {
        await (await this.btnAddNewContent).waitForDisplayed({ timeout: 2000 });
        await (await this.btnAddNewContent).click();
        await this.linkGroupLayoutPage.waitForDisplayed({ timeout: 2000 });
        await (await this.linkGroupLayoutPage).click();
        await (await this.inputNodeTitle).waitForDisplayed({ timeout: 2000 });
        await (await this.inputNodeTitle).setValue(title);
        await (await this.btnSave).scrollIntoView();
        await (await this.btnSave).click();
    }

    public async createQuickAction(title: string, healdine: string) {
        await browser.pause(3000);
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed({ timeout: 2000 });
        await browser.switchToFrame(iframe);
        await (await this.compTitle).setValue(title);
        await (await this.inputHeadline).setValue(healdine);
        await (await this.dropdownSource).selectByVisibleText('Aesthetics: Quick Actions test menu');
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed({ timeout: 2000 });
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(2000);

    }

    public async cleanUp() {
        await this.openNodes();
        await (await this.createdNode).waitForDisplayed({ timeout: 2000 });
        await (await this.createdNode).click();
        await (await this.pageDelete).waitForDisplayed({ timeout: 2000 });
        await (await this.pageDelete).click();
        await (await this.btnSave).waitForDisplayed({ timeout: 2500 });
        await (await this.btnSave).click();
        await this.openMenus();
        await (await this.createdMenu).click();
        await (await this.btnDelete).waitForDisplayed({ timeout: 2500 });
        await (await this.btnDelete).click();
        await (await this.btnSave).click();
        await browser.pause(1500);
    }





    /**
    * overwrite specific options to adapt it to page object
    */
    public openMenus() {
        return super.open('group/1/menus');
    }

    public openNodes() {
        return super.open('group/1/nodes');
    }
}

export default new QuickActionsBlockPage();
