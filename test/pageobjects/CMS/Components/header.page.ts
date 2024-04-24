import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HeaderBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

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

    public get entityIframe() {
        return $('#entity_browser_iframe_image_and_video');
    }

    public get carouselElement() {
        return $('.mf-carousel');
    }

    //Global utility
    public get btnFindDoctor() {
        return $('a[data-analytics-click-text="Find a Doctor"][data-analytics-link-type="button"]');
    }

    //Hamburger
    public get btnMenu() {
        return $('button[data-analytics-click-text="Menu"]');
    }

    //Flyout
    public get navFlyout() {
        return $('.mf-flyout__nav');
    }

    //Utility left
    public get navLeft() {
        return $$('nav.mf-top-bar-menu')[0];
    }

    //Utility Right
    public get navRight() {
        return $$('nav.mf-top-bar-menu')[1];
    }

    public get globalUtilityIcon() {
        return $('span[data-analytics-click-text="doctor"]');
    }

    public get btnAddLinkUR() {
        return $('a[href="/admin/structure/menu/manage/global-utilities/add?destination=/admin/structure/menu/manage/global-utilities"]');
    }

    public get inputLink() {
        return $('#edit-link-0-uri');
    }

    public get inputMenuTitle() {
        return $('#edit-title-0-value');
    }

    public get inputDescription() {
        return $('#edit-description-0-value');
    }

    public get inputLabel() {
        return $('#edit-field-menu-icon-0-label');
    }

    public get dropdownIcon() {
        return $('#edit-field-menu-icon-0-name');
    }

    public get btnSave() {
        return $('#edit-submit');
    }

    public get statusMsg() {
        return $('.messages__content');
    }

    public get menuElement() {
        return $('a[href="https://www.wikipedia.com/"]');
    }

    public get createdLink() {
        return $('=QA Test - Wikipedia');
    }

    public get dropdownToggle() {
        return $$('.dropbutton__toggle')[1];
    }

    public get linkDelete() {
        return $('=Delete');
    }

    public get btnDelete() {
        return $('button.button--primary');
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
        return $('a[href="/admin/structure/menu/manage/utility-left/add?destination=/admin/structure/menu/manage/utility-left"]');
    }

    public get TestHamburgerLink() {
        return $('=QA Donate');
    }

    //attempt to target created menu through indexing
    public get btnEdit() {
        return $$('=Edit')[3];
    }

    public get btnConfirmDelete() {
        return $('button[class="button button--primary js-form-submit form-submit ui-button ui-corner-all ui-widget"]');
    }

    public get linkFellowship() {
        return $$('a[data-analytics-click-text="Fellowship Programs"]')[2];
    }

    

    /**
     * Helper methods to create Header Component
     */


    public async createUtilityMenu(link: string, title: string, description: string, label: string) {
       await (await this.btnAddLink).waitForDisplayed({timeout:5000});
       await (await this.btnAddLink).click();
       await (await this.inputLink).waitForDisplayed({timeout:5000});
       await (await this.inputLink).setValue(link);
       await (await this.inputMenuTitle).scrollIntoView();
       await (await this.inputMenuTitle).setValue(title);
       // await (await this.inputDescription).setValue(description);
       await (await this.dropdownIcon).scrollIntoView();
       await (await this.dropdownIcon).selectByVisibleText('wifi');
       await (await this.inputLabel).setValue(label);
       await (await this.btnSave).scrollIntoView();
       await (await this.btnSave).click();
    }

    public async navToUtilityLeft() {
        return super.open('/admin/structure/menu/manage/utility-left');
    }

    public async openHomePage() {
        return super.open('/');
    }

    public async navToFellowshipPage() {
        return super.open('/education/fellowship');
    }

    public async createUtilLeftLink(menuTitle:string, link:string) {
        await (await this.btnAddLink).click();
        await (await this.inputMenuTitle).waitForDisplayed({timeout:3000});
        await (await this.inputMenuTitle).setValue(menuTitle);
        await (await this.inputLink).setValue(link);
        await (await this.btnSave).scrollIntoView();
        await (await this.btnSave).click();
    }

    public async deleteUtilLeftLink() {
        await (await this.btnEdit).waitForDisplayed({timeout:3500});
        await (await this.btnEdit).click();
        await (await this.linkDelete).scrollIntoView();
        await (await this.linkDelete).click();
        await (await this.btnConfirmDelete).waitForDisplayed();
        await (await this.btnConfirmDelete).click();

    public openHome(baseurl: string) {
        return browser.url(baseurl);
    }

    public openUtilityMenu(baseurl: string) {
        return browser.url(`${baseurl}admin/structure/menu/manage/global-utilities`);

    }

    public async goToMainMenu() {
        await (await this.btnHamburgerMenu).waitForDisplayed({timeout:4000});
        await (await this.btnHamburgerMenu).click();
        // Patient Care
        await (await $('button[data-analytics-click-text="Patient Care"]')).waitForDisplayed();
        // await (await $('button[data-analytics-click-text="Patient Care"]')).click();
        expect (await $('button[data-analytics-click-text="Patient Care"]')).toBeDisplayed()
        // College of Medicine
        await (await $('button[data-analytics-click-text="College of Medicine"]')).waitForDisplayed();
        expect (await $('button[data-analytics-click-text="College of Medicine"]')).toBeDisplayed();
        // Research
        await (await $('a[data-analytics-click-text="Research"]')).waitForDisplayed()
        expect (await $('a[data-analytics-click-text="Research"]')).toBeDisplayed()
        // Community
        await (await $('button[data-analytics-click-text="Community"]')).waitForDisplayed();
        expect (await $('button[data-analytics-click-text="Community"]')).toBeDisplayed();
        // Education
        await (await $('button[data-analytics-click-text="Education"]')).waitForDisplayed();
        expect (await $('button[data-analytics-click-text="Education"]')).toBeDisplayed();
        // News
        await (await $('button[data-analytics-click-text="News"]')).waitForDisplayed();
        expect (await $('button[data-analytics-click-text="News"]')).toBeDisplayed();
        // For Donors
        await (await $('button[data-analytics-click-text="For Donors"]')).waitForDisplayed();
        expect (await $('button[data-analytics-click-text="For Donors"]')).toBeDisplayed();
        // About
        await (await $('button[data-analytics-click-text="About"]')).scrollIntoView();
        expect (await $('button[data-analytics-click-text="About"]')).toBeDisplayed();

    }

    public async openHomePage() {
        return super.open('/');
    }
}

export default new HeaderBlockPage();
