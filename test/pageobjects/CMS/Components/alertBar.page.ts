import Page from '../Login/page';

class AlertBarBlockPage extends Page {

  public get alertBarIcon() {
    return $('span[data-analytics-click-text="warning-false"]');
  }

  public get alertBarText() {
    return $$('div.mf-alert__container .mf-text-body-3-sans p')[0];
  }

  public get alertBarCloseIcon() {
    return $('div.mf-alert__container button[data-analytics-click-text="close"]')
  }

  public get checkboxEmbedAlertInNavigation() {
    return $('#edit-settings-alert-bar-display-embedded')
  }

  public get checkboxDisplayAlertAboveNavigation() {
    return $('#edit-settings-alert-bar-display-above')
  }

  public get btnSave(){
    return $('#edit-actions-submit')
  }

  public get navTopBar(){
    return $$('.mf-top-bar')[0];
  }

  public get alertBar() {
    return $('.mf-alert')
  }

  public get btnEditEnglishTranslate(){
    return $$('li.edit a')[0]
  }

  public get inputAlertBarText() {
    return $('div[role=textbox]')
  }

  public get btnSaveConfig(){
    return $('#edit-submit')
  }
}


export default new AlertBarBlockPage(); 