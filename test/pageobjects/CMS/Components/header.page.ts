import Page from "../Login/page";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HeaderBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnSaveLayout() {
        return $("#edit-submit");
    }

    public get btnAddBlock() {
        return $("#edit-actions-submit");
    }

    public get configBlock() {
        return $(".ui-draggable-handle");
    }

    public get successMsg() {
        return $(".mf-alert__container--success");
    }

    public get entityIframe() {
        return $("#entity_browser_iframe_image_and_video");
    }

    public get carouselElement() {
        return $(".mf-carousel");
    }

    //Global utility
    public get btnFindDoctor() {
        return $(
            'a[data-analytics-click-text="Find a Doctor"][data-analytics-link-type="button"]'
        );
    }

    //Hamburger
    public get btnMenu() {
        return $('button[data-analytics-click-text="Menu"]');
    }

    //Flyout
    public get navFlyout() {
        return $(".mf-flyout__nav");
    }

    //Utility left
    public get navLeft() {
        return $$("nav.mf-top-bar-menu")[0];
    }

    //Utility Right
    public get navRight() {
        return $$("nav.mf-top-bar-menu")[1];
    }

    public get globalUtilityIcon() {
        return $('span[data-analytics-click-text="doctor"]');
    }

    public get btnAddLinkURL() {
        return $(
            'a[href="/admin/structure/menu/manage/global-utilities/add?destination=/admin/structure/menu/manage/global-utilities"]'
        );
    }

    public get inputLink() {
        return $("#edit-link-0-uri");
    }

    public get inputMenuTitle() {
        return $("#edit-title-0-value");
    }

    public get inputDescription() {
        return $("#edit-description-0-value");
    }

    public get inputLabel() {
        return $("#edit-field-menu-icon-0-label");
    }

    public get dropdownIcon() {
        return $("#edit-field-menu-icon-0-name");
    }

    public get btnSave() {
        return $("#edit-submit");
    }

    public get statusMsg() {
        return $(".messages__content");
    }

    public get menuElement() {
        return $('a[href="https://www.wikipedia.com/"]');
    }

    public get createdLink() {
        return $("=QA Test - Wikipedia");
    }

    public get dropdownToggle() {
        return $$(".dropbutton__toggle")[1];
    }

    public get linkDelete() {
        return $("=Delete");
    }

    public get btnDelete() {
        return $("button.button--primary");
    }

    public get btnHamburgerMenu() {
        return $('button[data-analytics-click-text="Menu"]');
        // return $('button[x-ref="btnHamburgerMenu"]');
    }

    public get btnAbout() {
        return $('button[data-analytics-click-text="About"]');
    }
    //Resumed work

    public get btnAddLink() {
        return $(
            'a[href="/admin/structure/menu/manage/utility-left/add?destination=/admin/structure/menu/manage/utility-left"]'
        );
    }

    public get btnAddRightLink() {
        return $(
            'a[href="/admin/structure/menu/manage/utility-right/add?destination=/admin/structure/menu/manage/utility-right"]'
        );
    }

    public get TestHamburgerLink() {
        return $("=QA Donate");
    }

    //attempt to target created menu through indexing
    public get btnEdit() {
        return $$("=Edit")[3];
    }

    public get btnConfirmDelete() {
        return $(
            'button[class="button button--primary js-form-submit form-submit ui-button ui-corner-all ui-widget"]'
        );
    }

    public get linkFellowship() {
        return $$('a[data-analytics-click-text="Fellowship Programs"]')[2];
    }

    public get flyoutEducation(){
        return $('button[data-analytics-click-text="Education"]');
    }

    public get btnAddNewMenu() {
        return $(".local-actions__item");
    }

    public get addNewGroupFlyout() {
        return $(
            `a[href="/group/1/content/create/group_content_menu%3Aflyout"]`
        );
    }

    public get inputFlyOutTitle() {
        return $(`#edit-label-0-value`);
    }

    public get inputFlyOutURL() {
        return $(`#edit-field-headline-0-uri`);
    }

    public get inputFlyOutLinkText() {
        return $(`#edit-field-headline-0-title`);
    }

    public get btnAddNewFlyoutLink() {
        return $(".local-actions__item a");
    }

    public get inputFlyoutLinkURL() {
        return $(
            `input[data-drupal-selector="edit-field-columns-0-subform-field-flyout-links-0-uri"]`
        );
    }

    public get secondInputFlyoutLinkURL() {
        return $(
            `input[data-drupal-selector="edit-field-columns-0-subform-field-flyout-links-1-uri"]`
        );
    }

    public get inputFlyoutLink() {
        return $(`#edit-field-columns-0-subform-field-flyout-links-0-title`);
    }

    public get secondInputFlyoutLink() {
        return $(
            `input[data-drupal-selector="edit-field-columns-0-subform-field-flyout-links-1-title"]`
        );
    }

    public get inputFlyOutLinkContent() {
        return $(`div[role="textbox"]`);
    }

    public get selectFlyoutMenu() {
        return $(`#edit-field-flyout-menu`);
    }

    public get btnGroupContent() {
        return $('a[data-analytics-click-text="Group content"]');
    }

    public get btnCreateNewContent() {
        return $('a[href="/group/1/node/create"]');
    }

    public get groupNodeLayoutPage() {
        return $$(".admin-item__link")[0];
    }

    public get btnAddAnotherFlyoutLink() {
        return $('input[value="Add another flyout link"]');
    }
    /**
     * Helper methods to create Header Component
     */

    public async createUtilityMenu(
        link: string,
        title: string,
        description: string,
        label: string
    ) {
        await (await this.btnAddLinkURL).waitForDisplayed({ timeout: 5000 });
        await (await this.btnAddLinkURL).click();
        await (await this.inputLink).waitForDisplayed({ timeout: 5000 });
        await (await this.inputLink).setValue(link);
        await (await this.inputMenuTitle).scrollIntoView();
        await (await this.inputMenuTitle).setValue(title);
        // await (await this.inputDescription).setValue(description);
        await (await this.dropdownIcon).scrollIntoView();
        await (await this.dropdownIcon).selectByVisibleText("wifi");
        await (await this.inputLabel).setValue(label);
        await (await this.btnSave).scrollIntoView();
        await (await this.btnSave).click();
    }

    public async navToUtilityLeft() {
        return super.open("/admin/structure/menu/manage/utility-left");
    }

    public async openHomePage() {
        return super.open("/");
    }

    public async navToFellowshipPage() {
        return super.open("/education/fellowship");
    }

    public async createUtilLeftLink(menuTitle: string, link: string) {
        await (await this.btnAddLink).click();
        await (await this.inputMenuTitle).waitForDisplayed({ timeout: 3000 });
        await (await this.inputMenuTitle).setValue(menuTitle);
        await (await this.inputLink).setValue(link);
        await (await this.btnSave).scrollIntoView();
        await (await this.btnSave).click();
    }

    public async deleteUtilLeftLink() {
        await (await this.btnEdit).waitForDisplayed({ timeout: 3500 });
        await (await this.btnEdit).click();
        await (await this.linkDelete).scrollIntoView();
        await (await this.linkDelete).click();
        await (await this.btnConfirmDelete).waitForDisplayed();
        await (await this.btnConfirmDelete).click();
    }

    public openHome(baseurl: string) {
        return browser.url(baseurl);
    }

    public openUtilityMenu(baseurl: string) {
        return browser.url(
            `${baseurl}admin/structure/menu/manage/global-utilities`
        );
    }

    public async goToMainMenu() {
        await (await this.btnHamburgerMenu).waitForDisplayed({ timeout: 4000 });
        await (await this.btnHamburgerMenu).click();
        await (
            await $('button[data-analytics-click-text="Patient Care"]')
        ).waitForDisplayed();
        expect(
            await $('button[data-analytics-click-text="Patient Care"]')
        ).toBeDisplayed();
        expect(
            await $('button[data-analytics-click-text="College of Medicine"]')
        ).toBeDisplayed();
        expect(
            await $('a[data-analytics-click-text="Research"]')
        ).toBeDisabled();
        expect(
            await $('button[data-analytics-click-text="Community"]')
        ).toBeDisabled();
        expect(
            await $('button[data-analytics-click-text="Education"]')
        ).toBeDisabled();
        expect(
            await $('button[data-analytics-click-text="News"]')
        ).toBeDisabled();
        expect(
            await $('button[data-analytics-click-text="For Donors"]')
        ).toBeDisabled();
        expect(
            await $('button[data-analytics-click-text="About"]')
        ).toBeDisabled();
    }

    public async navToUtilityRight() {
        return super.open("/admin/structure/menu/manage/utility-right");
    }

    public async navToGlobalFlyoutMenu() {
        return super.open("/group/1/menus");
    }

    public async createUtilRightLink(menuTitle: string, link: string) {
        await (await this.btnAddRightLink).click();
        await (await this.inputMenuTitle).waitForDisplayed({ timeout: 3000 });
        await (await this.inputMenuTitle).setValue(menuTitle);
        await (await this.inputLink).setValue(link);
        await (await this.btnSave).scrollIntoView();
        await (await this.btnSave).click();
    }

    public async deleteUtilRightLink() {
        await (await this.btnEdit).waitForDisplayed({ timeout: 3500 });
        await (await this.btnEdit).click();
        await (await this.linkDelete).scrollIntoView();
        await (await this.linkDelete).click();
        await (await this.btnConfirmDelete).waitForDisplayed();
        await (await this.btnConfirmDelete).click();
    }

    public async addNewGroupFlyoutMenu(
        menuTitle: string,
        menuUrl: string,
        menuLinkText: string
    ) {
        await (await this.inputFlyOutTitle).setValue(menuTitle);
        await (await this.inputFlyOutURL).setValue(menuUrl);
        await (await this.inputFlyOutLinkText).setValue(menuLinkText);
        await (await this.btnSave).click();
    }

    public async addFlyoutLinks(title: string, link: string, content: string) {
        await (await this.btnAddNewFlyoutLink).click();
        await (await this.inputMenuTitle).setValue(title);
        await (await this.inputLink).setValue(link);
        await (await this.inputFlyoutLinkURL).scrollIntoView();
        await (await this.inputFlyoutLinkURL).setValue(link);
        await (await this.inputFlyoutLink).setValue(title);
        await (await this.inputFlyOutLinkContent).scrollIntoView();
        await (await this.inputFlyOutLinkContent).setValue(content);
        await (await this.btnSave).scrollIntoView();
        await (await this.btnSave).click();
    }

    public async cleanUp() {
        await (await $(`=Header Component Tests`)).click();
        await (await $("=Delete")).click();
        await (await this.btnSave).waitForDisplayed({ timeout: 8000 });
        await (await this.btnSave).click();
        await browser.pause(2000);
    }

    public async cleanUpMenuItems() {
        await (await $(`=QA Research`)).click();
        await (await $$(`ul.tabs--primary li`)[1]).click();
        await (await this.btnSave).waitForDisplayed({ timeout: 8000 });
        await (await this.btnSave).click();
        await browser.pause(2000);
    }

    public async addGlobalFlyoutLinks(
        firstUrl: string,
        firstLinkText: string,
        secondUrl: string,
        secondLinkText: string
    ) {
        await (await this.inputFlyoutLinkURL).scrollIntoView();
        await (await this.inputFlyoutLinkURL).setValue(firstUrl);
        await (await this.inputFlyoutLink).setValue(firstLinkText);
        await (await this.btnAddAnotherFlyoutLink).click();
        await (await this.secondInputFlyoutLinkURL).scrollIntoView();
        await (await this.secondInputFlyoutLinkURL).setValue(secondUrl);
        await (await this.secondInputFlyoutLink).setValue(secondLinkText);
        await browser.pause(1000);
        await (await this.btnSave).click();
    }
}

export default new HeaderBlockPage();
