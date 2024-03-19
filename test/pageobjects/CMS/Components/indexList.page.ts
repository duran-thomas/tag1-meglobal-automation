import Page from '../Login/page';

class IconListBlockPage extends Page {

  public get configBlock() {
    return $('.ui-draggable-handle');
  }

  public get successMsg() {
    return $('.mf-alert__container--success');
  }

  public get inputTitle() {
    return $('#edit-settings-label');
  }

  public get dropdownView() {
    return $('#edit-settings-block-form-field-index-list-0-target-id');
  }

  public get dropdownDisplay() {
    return $('#edit-settings-block-form-field-index-list-0-display-id');
  }

  public get dropdownAdvancedOption(){
    return $('#edit-settings-block-form-field-index-list-0--2')
  }

  public get inputArguments(){
    return $('#edit-settings-block-form-field-index-list-0-arguments')
  }

  public get btnAddBlock() {
    return $('#edit-actions-submit');
  }

  public get btnSaveLayout() {
    return $('#edit-submit');
  }

  public get btnAddNewContent(){
    return $$('#block-claro-local-actions ul li a')[1]
  }

  public get linkGroupNodeLayoutPage(){
    return $$('#block-claro-content div a')[0]
  }

  public get inputPageTitle(){
    return $('#edit-title-0-value')
  }

  public get selectClinicalCategories(){
    return $('select[data-drupal-selector="edit-settings-block-form-field-index-list-0-arguments"]')
  }

  public async createIndexListClinicalCategories(title: string){
    await browser.waitForCustomFrame('iframe[name="lbim-dialog-iframe"]', 5000);
    await (await this.inputTitle).setValue(title)
    await (await this.dropdownView).selectByVisibleText('Clinical Categories Index List');
    await browser.pause(1000)
    await (await this.selectClinicalCategories).scrollIntoView();
    await (await this.selectClinicalCategories).selectByIndex(0);
    await (await this.btnAddBlock).scrollIntoView();
    await (await this.btnAddBlock).waitForEnabled();
    await (await this.btnAddBlock).click();
    await browser.refresh();
    await (await this.btnSaveLayout).waitForDisplayed();
    await (await this.btnSaveLayout).scrollIntoView();
    await (await this.btnSaveLayout).click();
    await browser.pause(2000);
  } 
}

export default new IconListBlockPage();