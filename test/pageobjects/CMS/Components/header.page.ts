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

    public get btnAddLink() {
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
        return $('#edit-submit');
    }

    public get btnHamburgerMenu() {
        return $('button[x-ref="btnHamburgerMenu"]');
    }

    public get btnAbout() {
        return $('button[data-analytics-click-text="About"]');
    }

    // public get () {
    //     return $('');
    // }

    // public get () {
    //     return $('');
    // }


    

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
       await (await this.inputDescription).setValue(description);
       await (await this.dropdownIcon).scrollIntoView();
       await (await this.dropdownIcon).selectByVisibleText('wifi');
       await (await this.inputLabel).setValue(label);
       await (await this.btnSave).scrollIntoView();
       await (await this.btnSave).click();
    }

    public openHome() {
        return browser.url('https://meglobalode6.prod.acquia-sites.com/home');
    }

    public openUtilityMenu() {
        return browser.url('https://meglobalode6.prod.acquia-sites.com/admin/structure/menu/manage/global-utilities');
    }

    public async goToMainMenu() {
        await (await this.btnHamburgerMenu).waitForDisplayed({timeout:4000});
        await (await this.btnHamburgerMenu).click();
        await browser.pause(3000);
        await (await $('span[data-analytics-click-text="chevron-left"]')).waitForDisplayed({timeout:6000});
        await (await $('span[data-analytics-click-text="chevron-left"]')).click();
        await (await $('button[data-analytics-click-text="Education"]')).waitForDisplayed({timeout:3000});
        await (await $('button[data-analytics-click-text="Education"]')).click();
        await (await $('button[data-analytics-click-text="Montefiore Einstein"]')).waitForDisplayed({timeout:3000});
        await (await $('button[data-analytics-click-text="Montefiore Einstein"]')).click();

    }
}

export default new HeaderBlockPage();
