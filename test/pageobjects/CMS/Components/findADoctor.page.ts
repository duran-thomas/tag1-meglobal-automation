import Page from "../Login/page";

class FindADoctorBlockPage extends Page {
    public get inputDoctorName() {
        return $$('input[data-drupal-selector="edit-name"]')[1];
    }

    public get btnClearInputField() {
        return $$(
            'form[data-drupal-selector="views-exposed-form-find-a-doctor-search"] button[data-analytics-click-text="close"]'
        )[2];
    }

    public get loader() {
        return $$("div.mf-spinner-fullscreen")[0];
    }
}

export default new FindADoctorBlockPage();
