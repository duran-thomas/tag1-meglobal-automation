import Page from "../Login/page";

class DatePickerBlockPage extends Page {
    public get inputDateField() {
        return $$('input[placeholder="MM/DD/YYYY"]')[1];
    }

    public get viewCalendar() {
        return $("div .flatpickr-calendar");
    }

    public get configBlock() {
        return $(".ui-draggable-handle");
    }

    public get btnAddBlock() {
        return $("#edit-actions-submit");
    }

    public get btnSaveLayout() {
        return $("#edit-submit");
    }

    public async createDatePickerComponent() {
        await browser.waitForCustomFrame(
            'iframe[name="lbim-dialog-iframe"]',
            5000
        );
        await (await this.btnAddBlock).scrollIntoView();
        await (await this.btnAddBlock).click();
        await browser.refresh();
        await (await this.btnSaveLayout).waitForDisplayed();
        await (await this.btnSaveLayout).scrollIntoView();
        await (await this.btnSaveLayout).click();
        await browser.pause(3000);
    }
}

export default new DatePickerBlockPage();
