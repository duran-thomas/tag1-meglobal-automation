import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class TranslationBlockPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnLanguage() {
        return $('.mf-dropdown--base > button:nth-child(1)');
    }

    public get iconGlobe() {
        return $('span[data-analytics-click-text="globe-alternative"]');
    }

    public get listItems() {
        return $$('li.mf-dropdown__item');
    }

    public get htmlElem() {
        return $('html');
    }

    public get logoElem() {
        return $('a[data-analytics-link-type="logo"]');
    }

    public get linkCollege() {
        return $('a[data-analytics-click-text="Albert Einstein College of Medicine"]');
    }

    




    /**
     * Helper methods to create Translation Component
     */


   

}

export default new TranslationBlockPage();
