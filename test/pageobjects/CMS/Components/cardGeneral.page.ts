import Page from '../Login/page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CardGeneralBlockPage extends Page {

    public get configBlock () {
        return $('.ui-draggable-handle');
    }

    public async createCardGeneral(mainTitle: string, itemTitle: string, link: string, description: string, content: string) {
        await browser.pause(8000); //TODO: find a better wait criteria here. At the moment an explicit wait is the only thing that seems to work
        // switch to the iframe
        const iframe = await $('iframe[name="lbim-dialog-iframe"]');
        await iframe.waitForDisplayed();
        await browser.switchToFrame(iframe);
    }
}

export default new CardGeneralBlockPage();
