import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class QuotesBlockPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get inputTitle () {
        return $('#edit-settings-label');
    }

    public get inputQuote () {
        return $('#edit-settings-block-form-field-content-0-subform-field-quote-0-value');
    }

    public get inputAuthor () {
        return $('#edit-settings-block-form-field-content-0-subform-field-author-0-value');
    }

    public get inputAuthorTitle () {
        return $('#edit-settings-block-form-field-content-0-subform-field-author-title-0-value');
    }

    public get inputTitle () {
        return $('#edit-settings-label');
    }

    public get inputTitle () {
        return $('#edit-settings-label');
    }

    public get inputTitle () {
        return $('#edit-settings-label');
    }



    public get btnAddBlock () {
        return $('#edit-actions-submit');
    }



    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async login (username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('user/login');
    }
}

export default new QuotesBlockPage();
