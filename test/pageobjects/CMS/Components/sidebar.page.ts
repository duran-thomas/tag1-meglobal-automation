import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SidebarBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout() {
        return $('#edit-submit');
    }

    public get inputTitle() {
        return $('#edit-title-0-value');
    }

    public get nodesBtn() {
        return $('a[data-analytics-click-text="Group content"]');
    }

    public get addNewContentBtn() {
        return $('a[href="/group/71/node/create"]');
    }

    public get layoutPageBtn() {
        return $('a[href="/group/71/content/create/group_node%3Alanding_page"]');
    }

    public get linkDropdown() {
        return $('#edit-field-sidebar-link-0-selection-link');
    }

    public get btnSave() {
        return $('#edit-submit');
    }

    public get layoutBtn() {
        return $('a[data-analytics-click-text="Layout"]');
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

    public get entityIframe() {
        return $('iframe[name="entity_browser_iframe_image_browser"]');
    }

    public get sidebarElement() {
        return $('.mf-sidebar');
    }

    public get nodePage() {
        return $('=QA Test - Sidebar page');
    }

    public get deleteBtn() {
        return $('=Delete');
    }

    public get inputFirstColumnClasses() {
        return $('#edit-layout-settings-first-column-classes');
    }

    public get inputSecondColumnClasses() {
        return $('#edit-layout-settings-second-column-classes');
    }

    //Menu edit selectors 
    public get btnMenuEdit() {
        return $('.edit');
    }

    public get inputMenuTitle() {
        return $('#edit-label-0-value');
    }

    public get linkEdit() {
        return $('=Edit');
    }

    public get btnAddNewContent() {
        return $('=Add new content');
    }

    public get linkGroupNodeLayoutPage() {
        return $('=Group node (Layout Page)');
    }

    public get tabLayout() {
        return $('=Layout');
    }

    public get editedElement() {
        return $('a[data-analytics-click-text="Test Menu Link 1 Edit"]');
    }

    public get linkDummyQANode() {
        return $('=Dummy QA Group test Layout node for Side Bar menu');
    }

    public get messageContent() {
        return $('.messages__content');
    }

    public get linkTestMenu() {
        return $('=Test Menu Link 1');
    }

    public get sidebarNavFields() {
        return $('#edit-field-sidebar-link-wrapper');
    }



    /**
     * Helper methods to create Sidebar Component
     */

    public async setupSidebar(title:string, ) {
        await this.openDentistryGroup();
        await (await this.nodesBtn).click();
        await (await this.addNewContentBtn).click();
        await (await this.layoutPageBtn).click();
        await (await this.inputTitle).setValue(title);
        await (await this.linkDropdown).scrollIntoView();
        await (await this.linkDropdown).selectByVisibleText('---- Professional Training Programs');
        await (await this.btnSave).click();        
    }

    public async createSidebar() {
        await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);       
    }

    public async deleteNode(){
        await this.openDentistryGroup();
        await (await this.nodesBtn).click();
        await (await this.nodePage).click();
        await (await this.deleteBtn).waitForDisplayed();
        await (await this.deleteBtn).click();
        await browser.pause(2000);
        await (await this.btnSave).waitForClickable();
        await (await this.btnSave).click();
        await browser.pause(2000);
    }

    public async editMenuLink(edit: string) {
        await this.openDummyTestGroupMenus();
        await (await this.btnMenuEdit).waitForDisplayed();
        await (await this.btnMenuEdit).click();
        await browser.refresh();
        await (await this.linkEdit).waitForDisplayed();
        await (await this.linkEdit).click();
        await browser.refresh();

        await (await this.inputTitle).setValue(edit);
        await (await this.btnSave).scrollIntoView();
        await (await this.btnSave).click();
    }

    public async createEditedNodeLayoutPage(nodeLayoutTitle: string) {
        await this.openDummyTestGroupNodes();
        await (await this.btnAddNewContent).waitForClickable();
        await (await this.btnAddNewContent).click();
        await (await this.linkGroupNodeLayoutPage).waitForClickable();
        await (await this.linkGroupNodeLayoutPage).click();
        await (await this.inputTitle).setValue(nodeLayoutTitle);
        await (await this.linkDropdown).scrollIntoView();
        await (await this.linkDropdown).selectByIndex(1);
        await (await this.btnSave).scrollIntoView();
        await (await this.btnSave).click();
    }

    // public async createCardServicesAnalytics(title: string, eyebrow: string, headline: string, content: string, list: string, btnText: string, btnUrl: string, linkText: string, linkUrl: string, info: string, remoteFilePath: string, altText: string) {
    //     await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
    //     await (await this.inputTitle).setValue(title);
    //     await (await this.inputEyebrow).scrollIntoView();
    //     await (await this.inputEyebrow).setValue(eyebrow);
    //     await (await this.inputHeadline).setValue(headline);
    //     await (await this.inputContent).scrollIntoView();
    //     await (await this.inputContent).setValue(content);
    //     await (await this.inputList).setValue(list);
    //     await (await this.inputButtonText).scrollIntoView();
    //     await (await this.inputButtonText).setValue(btnText);
    //     await (await this.dropdownButtonOptions).click();
    //     await (await this.dropdownTarget).selectByVisibleText('_blank');
    //     await (await this.inputButtonURL).scrollIntoView();
    //     await (await this.inputButtonURL).setValue(btnUrl);
    //     await (await this.inputLinkText).scrollIntoView();
    //     await (await this.inputLinkText).setValue(linkText);
    //     await (await this.inputLinkURL).setValue(linkUrl);
    //     await (await this.inputInfo).scrollIntoView();
    //     await (await this.inputInfo).setValue(info);
    //     await browser.pause(2000);
    //     await (await this.dropdownImage).click();
    //     // switch to the iframe
    //     await browser.switchToFrame(await this.entityIframe);
    //     await (await this.btnBrowse).scrollIntoView();
    //     await (await this.btnBrowse).setValue(remoteFilePath);
    //     await browser.pause(4500); //explicit waits seem to be necessary here
    //     await (await this.inputAltText).waitForClickable();
    //     await (await this.inputAltText).setValue(altText);
    //     await (await this.btnSaveImage).scrollIntoView();
    //     await (await this.btnSaveImage).click();
    //     await browser.pause(6000); //explicit waits seem to be necessary here
    //     await browser.switchToParentFrame();
    //     await browser.pause(4000); //explicit waits seem to be necessary here
    //     await (await this.btnAddBlock).scrollIntoView();
    //     await (await this.btnAddBlock).click();
    //     await browser.refresh();
    //     await (await this.btnSaveLayout).waitForDisplayed();
    //     await (await this.btnSaveLayout).scrollIntoView();
    //     await (await this.btnSaveLayout).click();
    //     await browser.pause(3000);
    // }

    /**

    overwrite specific options to adapt it to page object
    */
    public openDentistryGroup() {
        //return super.open('group/71');
        return super.open('group/71');
    }

    public openDummyTestGroupMenus() {
        return super.open('group/361/menus');
    }

    public openDummyTestGroupNodes() {
        return super.open('group/361/nodes');
    }
}

export default new SidebarBlockPage();
