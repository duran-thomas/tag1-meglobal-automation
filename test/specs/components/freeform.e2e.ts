import LoginPage from '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import FreeformBlockPage from '../../pageobjects/CMS/Components/freeform.page';
import * as data from '../../data/freeform.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';
import * as fs from "fs";


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
        //await expect(QALayoutPage.btnRemoveSection).not.toBeDisplayedInViewport();
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
        const id=`Freeform-S3C1011-${Date.now()}`;
        const titleID = data.accordionFreeformData.title.replace(/\s+/g, '-').toLowerCase();
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformAccordion(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, data.accordionFreeformData.title, data.accordionFreeformData.content);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.btnAccordion).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await $(`#${id} button#${titleID}`)).toBeExisting();

    });

    it('[S3C1012] Verify that a site Content Administrator can create a Freeform Component with a Button)', async () => {
        const id=`Freeform-S3C1012-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformButton(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, data.buttonFreeformData.text, data.buttonFreeformData.url, data.buttonFreeformData.text1, data.buttonFreeformData.url1, data.buttonFreeformData.text2, data.buttonFreeformData.url2);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await $(`#${id} a[href="${data.buttonFreeformData.url}"]`)).toBeExisting();
        await expect(await $(`#${id} a[href="${data.buttonFreeformData.url1}"]`)).toBeExisting();
        await expect(await $(`#${id} a[href="${data.buttonFreeformData.url2}"]`)).toBeExisting();

    });

    it('[S3C1013] Verify that a site Content Administrator can create a Freeform Component with a Divider)', async () => {
        const id=`Freeform-S3C1013-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformDivider(data.freeformBlockData.adminTitle, data.freeformBlockData.headline);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await FreeformBlockPage.dividerElement(id)).toBeExisting();

    });

    it('[S3C1014] Verify that a site Content Administrator can create a Freeform Component with a Dropdown block)', async () => {
        const id=`Freeform-S3C1014-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformDropdown(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, data.dropdownFreeformData.triggerText, data.dropdownFreeformData.url, data.dropdownFreeformData.linkText);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await $(`#${id} button[data-analytics-click-text="${data.dropdownFreeformData.triggerText}"]`)).toBeExisting();
    });

    it('[S3C1015] Verify that a site Content Administrator can create a Freeform Component with an Icon List block', async () => {
        const id=`Freeform-S3C1015-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformIconList(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, data.iconListFreeformData.text+' 1', data.iconListFreeformData.text+' 2', data.iconListFreeformData.text+' 3', data.iconListFreeformData.text+' 4', data.iconListFreeformData.text+' 5', data.iconListFreeformData.text+' 6');

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.iconListElement).scrollIntoView({ behavior: 'auto', block: 'center' });
        
        await expect($(`#${id} span[data-analytics-click-text="bullet-square"]`)).toBeExisting() 
        await expect(FreeformBlockPage.listItem(id)).toHaveText(data.iconListFreeformData.text+' 1'); 
        await expect(FreeformBlockPage.lastItem).not.toHaveAttribute('data-analytics-click-text');
    });

    it('[S3C1016] Verify that a site Content Administrator can create a Freeform Component with an Image block)', async () => {
        const id=`Freeform-S3C1016-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
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
        await expect(await $(`#${id} img[alt="${data.imageFreeformData.altText}"]`)).toBeDisplayed();
    });

    it('[S3C1017] Verify that a site Content Administrator can create a Freeform Component with an Inline Navigation block)', async () => {
        const id=`Freeform-S3C1017-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformInlineNav(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, data.inlineNavFreeformData.label, data.inlineNavFreeformData.headline, data.inlineNavFreeformData.linkText, data.inlineNavFreeformData.url);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await $(`#${id} nav[aria-label="${data.inlineNavFreeformData.label}"]`)).toBeExisting();
    });

    it('[S3C1018] Verify that a site Content Administrator can create a Freeform Component with Links)', async () => {
        const id=`Freeform-S3C1018-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformLinks(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, data.linksFreeformData.linkText1, data.linksFreeformData.url1, data.linksFreeformData.linkText2, data.linksFreeformData.url2, data.linksFreeformData.linkText3, data.linksFreeformData.url3);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await $(`#${id} a[data-analytics-click-text="${data.linksFreeformData.linkText1}"`)).toBeExisting();
        await expect(await $(`#${id} a[data-analytics-click-text="${data.linksFreeformData.linkText2}"`)).toBeExisting();
        await expect(await $(`#${id} a[data-analytics-click-text="${data.linksFreeformData.linkText3}"`)).toBeExisting();
    });

    it('[S3C1019] Verify that a site Content Administrator can create a Freeform Component with Rich Text)', async () => {
        const id=`Freeform-S3C1019-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformRichText(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, data.richTextFreeformData.content);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await $(`#${id} .mf-rich-text`)).toBeExisting();
    });

    it('[S3C1020] Verify that a site Content Administrator can create a Freeform Component with a Spacer block)', async () => {
        const id=`Freeform-S3C1020-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnFreeform).scrollIntoView();
        await (await QALayoutPage.btnFreeform).click();
        await (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformSpacer(data.freeformBlockData.adminTitle, data.freeformBlockData.headline);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await $(`#${id} .mf-spacer`)).toBeExisting();
    });

    it('[S3C1021] Verify that a site Content Administrator can create a Freeform Component with Typeahead block)', async () => {
        const id=`Freeform-S3C1021-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformTypeahead(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, data.typeaheadFreeformData.label, data.typeaheadFreeformData.placeholder);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await $(`#${id} .mf-typeahead`)).toBeExisting();
        await expect(await $(`#${id} input[placeholder="${data.typeaheadFreeformData.placeholder}"]`)).toBeExisting();
    });

    it('[S3C1022] Verify that a site Content Administrator can create a Freeform Component with a Video block)', async () => {
        const id=`Freeform-S3C1022-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg3.jpg');
        const videoFilePath = await browser.uploadFile('scriptFiles/sampleVideo.mp4');
        await FreeformBlockPage.createFreeformVideo(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, videoFilePath, imageFilePath, data.imageFreeformData.altText);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await $(`#${id} .mf-media`)).toBeDisplayed();
    });

    it('[S3C1023] Verify that a site Content Administrator can create a Freeform Component with a Visual List block', async () => {
        const id=`Freeform-S3C1023-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformVisualList(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, data.visualListFreeformData.title, data.visualListFreeformData.link);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        await expect(await $(`#${id} .mf-visual-list`)).toBeExisting();
        await expect(await $(`#${id} a[data-analytics-click-text="${data.visualListFreeformData.title}"]`)).toBeExisting();
    });

    it('[S3C1024] Verify that a site Content Administrator can specify headline sizing when creating a Freeform Component)', async () => {
        const id=`Freeform-S3C1024-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformSizing(data.freeformBlockData.adminTitle, data.freeformBlockData.headline);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.dividerElement(id)).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(await FreeformBlockPage.dividerElement(id)).toBeExisting();
        await expect(await $(`#${id} h4`)).toBeExisting();
        await expect(await $(`#${id} h4`)).toHaveText(data.freeformBlockData.headline);
    });

    it('[S3C1080] Verify that the Headline size defaults to h3 when creating a Freeform Component)', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        await (await QALayoutPage.btnFreeform).scrollIntoView();
        await (await QALayoutPage.btnFreeform).click();
        await (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.checkHeadingSize();

        await expect(FreeformBlockPage.dropdownRenderAs).toHaveValue('h3');
    });

    it('[S3C1087] Verify that Analytics for the Freeform Component with Rich Text is configured)', async () => {
        const id=`Freeform-S3C1087-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await FreeformBlockPage.configBlock).waitForDisplayed();

        await FreeformBlockPage.createFreeformRichText(data.freeformBlockData.adminTitle, data.freeformBlockData.headline, data.richTextFreeformData.content);

        await expect(FreeformBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await FreeformBlockPage.freeformHeadline).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(FreeformBlockPage.freeformHeadline).toBeDisplayedInViewport();
        const elem = await $(`#${id} .mf-rich-text`);

        await expect(elem).toHaveAttribute('data-analytics-event','e_componentClick');
        await expect(elem).toHaveAttribute('data-analytics-component-type','rich text');
    });

    it('[S3C1106] Verify that Analytics for the Freeform Component with an Image block is configured)', async () => {
        const id=`Freeform-S3C1106-${Date.now()}`;
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection(id);
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

        const elem = await $(`#${id} .mf-media`);

        const expectedAnalyticsData = {
            event: 'e_componentClick',
            componentType: 'media image',
            linkType: 'image',
            //clickText: ctaText,
            pageSlot: '1'
        }

        // Get the current url of the page
        const currentUrl = await browser.getUrl();

        //set element to open links in new tab
        await browser.execute(() => {
            const clickElement = document.querySelector('a[href="https://google.com"]');
            clickElement.setAttribute('target', '_blank');
        })

        // Interact to generate the analytics.
        await (await ($(`a[href="https://google.com"]`))).scrollIntoView();
        await ($(`a[href="https://google.com"]`)).click();

        // Switch back to the tab where the analytics is being generated
        await browser.switchWindow(currentUrl)

        // Get the data layer for the window and get the data for the click event for the component
        const dataLayer = await browser.executeScript('return window.dataLayer', []);
        const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_componentClick")[0];

        // Build the actual analytics data object
        const parsedActualAnalyticsData = {
            //Remove whitespace from the Headline
            //clickText: actualAnalyticsData.clickText.trim(),
            componentType: actualAnalyticsData.componentType,
            event: actualAnalyticsData.event,
            // Remove html tags, whitespace and newlines from the Headline
            linkType: actualAnalyticsData.linkType,
            pageSlot: actualAnalyticsData.pageSlot
        }

        fs.writeFile('analyticsTestEvidence/freeformImage.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);


    });

});
