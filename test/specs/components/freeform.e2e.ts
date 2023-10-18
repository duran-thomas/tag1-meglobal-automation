import LoginPage from '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import FreeformBlockPage from '../../pageobjects/CMS/Components/freeform.page';
import * as data from '../../data/freeform.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';


describe('Freeform Component Tests', () => {

    before(async ()=>{
        // Get the environment configuration
        const environment = getEnvironmentConfig(process.env.ENV);

        // Use the environment data
        const bypassURL = environment.bypassURL;
        const cookies = environment.cookies;

        //Bypass login
        await browser.url(await bypassURL);
        await browser.maximizeWindow();

        // Set user cookies
        await browser.setCookies(await cookies);

    });

    before(async function () {
        global.suiteDescription = this.currentTest?.parent?.title;
        //navigate to admin content page
        await AdminContentPage.open();
        // Navigate to QA Landing page to execute tests
        await AdminContentPage.getTestPage(global.suiteDescription);
        await expect(QALayoutPage.tabLayout).toBeDisplayed();
    });

    afterEach(async function () {
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/Freeform/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //delete previously created sections
    afterEach(async function () {
        await AdminContentPage.open();
        await AdminContentPage.getTestPage(global.suiteDescription);
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.cleanUpJob();
        await expect(QALayoutPage.btnRemoveSection).not.toBeDisplayedInViewport();
        //return to starting point
        await AdminContentPage.open();
        await AdminContentPage.getTestPage(global.suiteDescription);
    });

    //delete page
    after(async function () {
        // Get the environment configuration
        const environment = getEnvironmentConfig(process.env.ENV);
        //await browser.url(environment.baseUrl+'user/logout');
        await browser.setCookies(environment.admin);
        await AdminContentPage.open();
        await AdminContentPage.deleteTestPage(global.suiteDescription);
        await expect($('.mf-alert__container--highlight')).toBeDisplayed();
    });


    it('[S3C1011] Verify that a site Content Administrator can create a Freeform Component with an Accordion block)', async () => {
        const titleID = data.accordionFreeformData.title.replace(/\s+/g, '-').toLowerCase();
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformAccordion(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, data.accordionFreeformData.title, data.accordionFreeformData.content);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.btnAccordion).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await $(`button#${titleID}`)).toBeExisting();

    });

    it('[S3C1012] Verify that a site Content Administrator can create a Freeform Component with a Button)', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformButton(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, data.buttonFreeformData.text, data.buttonFreeformData.url, data.buttonFreeformData.text1, data.buttonFreeformData.url1, data.buttonFreeformData.text2, data.buttonFreeformData.url2);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await $(`a[href="${data.buttonFreeformData.url}"]`)).toBeExisting();
        await expect(await $(`a[href="${data.buttonFreeformData.url1}"]`)).toBeExisting();
        await expect(await $(`a[href="${data.buttonFreeformData.url2}"]`)).toBeExisting();

    });

    it('[S3C1013] Verify that a site Content Administrator can create a Freeform Component with a Divider)', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformDivider(data.freeformBlockData.adminTitle, data.freeformBlockData.headline);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await FreeformBlockPage.dividerElement).toBeExisting();

    });

    it('[S3C1014] Verify that a site Content Administrator can create a Freeform Component with a Dropdown block)', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformDropdown(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, data.dropdownFreeformData.triggerText, data.dropdownFreeformData.url, data.dropdownFreeformData.linkText);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await $(`button[data-analytics-click-text="${data.dropdownFreeformData.triggerText}"]`)).toBeExisting();
    });

    it('[S3C1015] Verify that a site Content Administrator can create a Freeform Component with an Icon List block', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformIconList(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, data.iconListFreeformData.text+' 1', data.iconListFreeformData.text+' 2', data.iconListFreeformData.text+' 3', data.iconListFreeformData.text+' 4', data.iconListFreeformData.text+' 5', data.iconListFreeformData.text+' 6');

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.iconListElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect($('span[data-analytics-click-text="bullet-square"]')).toBeExisting() 
        await expect(FreeformBlockPage.listItem).toHaveText(data.iconListFreeformData.text+' 1');   
        await expect(FreeformBlockPage.lastItem).not.toHaveAttribute('data-analytics-click-text');
    });

    it('[S3C1016] Verify that a site Content Administrator can create a Freeform Component with an Image block)', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        await FreeformBlockPage.createFreeformImage(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, imageFilePath, data.imageFreeformData.altText);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await $(`img[alt="${data.imageFreeformData.altText}"]`)).toBeDisplayed();
    });

    it('[S3C1017] Verify that a site Content Administrator can create a Freeform Component with an Inline Navigation block)', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformInlineNav(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, data.inlineNavFreeformData.label, data.inlineNavFreeformData.headline, data.inlineNavFreeformData.linkText, data.inlineNavFreeformData.url);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await $(`nav[aria-label="${data.inlineNavFreeformData.label}"]`)).toBeExisting();
    });

    it('[S3C1018] Verify that a site Content Administrator can create a Freeform Component with Links)', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformLinks(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, data.linksFreeformData.linkText1, data.linksFreeformData.url1, data.linksFreeformData.linkText2, data.linksFreeformData.url2, data.linksFreeformData.linkText3, data.linksFreeformData.url3);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await $(`a[data-analytics-click-text="${data.linksFreeformData.linkText1}"`)).toBeExisting();
        await expect(await $(`a[data-analytics-click-text="${data.linksFreeformData.linkText2}"`)).toBeExisting();
        await expect(await $(`a[data-analytics-click-text="${data.linksFreeformData.linkText3}"`)).toBeExisting();
    });

    it('[S3C1019] Verify that a site Content Administrator can create a Freeform Component with Rich Text)', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformRichText(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, data.richTextFreeformData.content);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await $('.mf-rich-text')).toBeExisting();
    });

    it('[S3C1020] Verify that a site Content Administrator can create a Freeform Component with a Spacer block)', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformSpacer(data.freeformBlockData.adminTitle, data.freeformBlockData.headline);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await $('.mf-spacer')).toBeExisting();
    });

    it('[S3C1021] Verify that a site Content Administrator can create a Freeform Component with Typeahead block)', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformTypeahead(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, data.typeaheadFreeformData.label, data.typeaheadFreeformData.placeholder);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await $('.mf-typeahead')).toBeExisting();
        await expect(await $(`input[placeholder="${data.typeaheadFreeformData.placeholder}"]`)).toBeExisting();
    });

    it('[S3C1022] Verify that a site Content Administrator can create a Freeform Component with a Video block)', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        const videoFilePath = await browser.uploadFile('scriptFiles/sampleVideo.mp4');
        await FreeformBlockPage.createFreeformVideo(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, videoFilePath);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await $('.mf-media')).toBeDisplayed();
    });

    it('[S3C1023] Verify that a site Content Administrator can create a Freeform Component with a Visual List block)', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformVisualList(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, data.visualListFreeformData.title, data.visualListFreeformData.link);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await $('.mf-visual-list')).toBeExisting();
        await expect(await $(`a[data-analytics-click-text="${data.visualListFreeformData.title}"]`)).toBeExisting();
    });

    it('[S3C1024] Verify that a site Content Administrator can specify headline sizing when creating a Freeform Component)', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformSizing(data.freeformBlockData.adminTitle, data.freeformBlockData.headline);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.dividerElement).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(await FreeformBlockPage.dividerElement).toBeExisting();
        await expect(await $(`h4=${data.freeformBlockData.headline}`)).toBeExisting();
    });

    it('[S3C1080] Verify that the Headline size defaults to h3 when creating a Freeform Component)', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformSpacer(data.freeformBlockData.adminTitle, data.freeformBlockData.headline);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();

        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(await $(`h3=${data.freeformBlockData.headline}`)).toBeExisting();
    });

    it('[S3C1087] Verify that Analytics for the Freeform Component with Rich Text is configured)', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformRichText(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, data.richTextFreeformData.content);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        const elem = await $('.mf-rich-text');

        await expect(elem).toHaveAttribute('data-analytics-event','e_componentClick');
        await expect(elem).toHaveAttribute('data-analytics-component-type','rich text');
    });

    it('[S3C1106] Verify that Analytics for the Freeform Component with an Image block is configured)', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg2.jpg');
        await FreeformBlockPage.createFreeformImage(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, imageFilePath, data.imageFreeformData.altText);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        const elem = await $('.mf-media');

        await expect(elem).toHaveAttribute('data-analytics-event','e_mediaEngagement');
    });

});
