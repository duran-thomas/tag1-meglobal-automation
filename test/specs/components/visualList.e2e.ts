import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import VisualListBlockPage from '../../pageobjects/CMS/Components/visualList.page';
import {users} from '../../data/users.data';
import { visualListBlockData, illustrationVisualListBlockData, simplevisualListBlockData, stylingData } from '../../data/visualList.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';


describe('Visual List Component Tests', () => {
    before(async () => {
        // //Login
        await browser.url(await users.bypassUrl);
        await browser.maximizeWindow();

        // Set the cookie for a logged in user
        await browser.setCookies([
            {
              name: cookieData.name,
              value: cookieData.value,
              domain: cookieData.domain,
              path: cookieData.path,
            }
        ]);
    });

    beforeEach(async function() {
        //navigate to admin content page
        await AdminContentPage.open();
        // Navigate to QA Landing page to execute tests
        await AdminContentPage.getQALandingPage();  
        expect(await QALayoutPage.tabLayout).toBeDisplayed();
    })

    afterEach(async function() { 
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/VisualList/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //delete previously created sections
    afterEach(async function() { 
        await AdminContentPage.open();
        await AdminContentPage.getQALandingPage();
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.cleanUpJob();
        expect(await QALayoutPage.btnRemoveSection).not.toBeDisplayedInViewport();
        //return to starting point
        await AdminContentPage.open();
        await AdminContentPage.getQALandingPage();  
    });

    for(const record of visualListBlockData){
        it(`${record.testCaseTitle}`, async () => {
            (await QALayoutPage.tabLayout).click();
            await QALayoutPage.createNewSection();
            await QALayoutPage.navigateToBlockList();
            (await QALayoutPage.btnVisualList).scrollIntoView();
            (await QALayoutPage.btnVisualList).click();
            (await VisualListBlockPage.configBlock).waitForDisplayed();
            const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
            if (record.itemTitle === 'QA Simple Visual List Item Title'){
                await VisualListBlockPage.createVisualListComponentSimple(record.mainTitle, record.itemTitle, record.link, record.description);
                await QALayoutPage.goToPageView();
                expect(await (await VisualListBlockPage.visualListElementTitle).getText).toHaveText(record.mainTitle);
                await expect(VisualListBlockPage.visualListElement).toExist();  
                await (await VisualListBlockPage.visualListElement).scrollIntoView();
            }
            if (record.itemTitle === 'QA Simple Visual List Item Title Internal URL' ){
                await VisualListBlockPage.createVisualListComponentSimple(record.mainTitle, record.itemTitle, record.link, record.description);
                await QALayoutPage.goToPageView();
                expect(await (await VisualListBlockPage.visualListElementTitle).getText).toHaveText(record.mainTitle);
                await expect(VisualListBlockPage.visualListElement).toExist();  
                await (await VisualListBlockPage.visualListElement).scrollIntoView();
            }
            if (record.itemTitle === 'QA Illustration Visual List Item Title'){
            
                await VisualListBlockPage.createVisualListComponentIllustration(record.mainTitle, record.itemTitle, record.link, record.description, imageFilePath, record.altText);
                await QALayoutPage.goToPageView();
                expect(await (await VisualListBlockPage.visualListElementTitle).getText).toHaveText(record.mainTitle);
                await expect(VisualListBlockPage.visualListElement).toExist();  
                await (await VisualListBlockPage.visualListElement).scrollIntoView();
            }
            if (record.itemTitle === 'QA Illustration Visual List Item Title Internal URL'){
                await VisualListBlockPage.createVisualListComponentIllustration(record.mainTitle, record.itemTitle, record.link, record.description, imageFilePath, record.altText);
                await QALayoutPage.goToPageView();
                expect(await (await VisualListBlockPage.visualListElementTitle).getText).toHaveText(record.mainTitle);
                await expect(VisualListBlockPage.visualListElement).toExist();  
                await (await VisualListBlockPage.visualListElement).scrollIntoView();
            }
            if (record.itemTitle === 'QA Icon Visual List Item Title'){
                await VisualListBlockPage.createVisualListComponentIcon(record.mainTitle,record.itemTitle,record.link,record.description)
                await QALayoutPage.goToPageView();
                expect(await (await VisualListBlockPage.visualListElementTitle).getText).toHaveText(record.mainTitle);
                await expect(VisualListBlockPage.visualListElement).toExist();  
                await (await VisualListBlockPage.visualListElement).scrollIntoView();
            }
            if (record.itemTitle === 'QA Icon Visual List Item Title Internal URL'){
                await VisualListBlockPage.createVisualListComponentIcon(record.mainTitle,record.itemTitle,record.link,record.description)
                await QALayoutPage.goToPageView();
                expect(await (await VisualListBlockPage.visualListElementTitle).getText).toHaveText(record.mainTitle);
                await expect(VisualListBlockPage.visualListElement).toExist();  
                await (await VisualListBlockPage.visualListElement).scrollIntoView();
            }
            if (record.itemTitle === 'QA Illustration Card Visual List Item Title'){
                await VisualListBlockPage.createVisualListComponentIllustrationCard(record.mainTitle,
                record.eyebrow, record.heading, record.url, record.linkText, record.description, imageFilePath, record.altText)

                await QALayoutPage.goToPageView();
                expect(await (await VisualListBlockPage.visualListElementTitle).getText).toHaveText(record.mainTitle);
                await expect(VisualListBlockPage.visualListElement).toExist();  
                await (await VisualListBlockPage.visualListElement).scrollIntoView();
            }
            if (record.itemTitle === 'QA Illustration Card Visual List Item Title Internal URL'){
                await VisualListBlockPage.createVisualListComponentIllustrationCard(record.mainTitle,
                record.eyebrow, record.heading, record.url, record.linkText, record.description, imageFilePath, record.altText)
                
                await QALayoutPage.goToPageView();
                expect(await (await VisualListBlockPage.visualListElementTitle).getText).toHaveText(record.mainTitle);
                await expect(VisualListBlockPage.visualListElement).toExist();  
                await (await VisualListBlockPage.visualListElement).scrollIntoView();    
            }
            if (record.itemTitle === 'QA Image Card Visual List Item Title'){
                await VisualListBlockPage.createVisualListComponentImageCard(record.mainTitle,
                    record.eyebrow, record.heading, record.url, record.linkText, record.description, imageFilePath, record.altText)
                    
                    await QALayoutPage.goToPageView();
                    expect(await (await VisualListBlockPage.visualListElementTitle).getText).toHaveText(record.mainTitle);
                    await expect(VisualListBlockPage.visualListElement).toExist();  
                    await (await VisualListBlockPage.visualListElement).scrollIntoView();   
            }
        })
    }

    it('[S3C836] Verify that a site Content Administrator can create a Visual List Component with both an Illustration visual list item paragraph and a Simple visual list item', async () => {
        await (QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnVisualList).scrollIntoView();
        (await QALayoutPage.btnVisualList).click();
        (await VisualListBlockPage.configBlock).waitForDisplayed();
        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await VisualListBlockPage.createIllustrationAndSimple(simplevisualListBlockData[0].mainTitle,simplevisualListBlockData[0].itemTitle,illustrationVisualListBlockData[0].itemTitle,simplevisualListBlockData[0].link, 
            simplevisualListBlockData[0].description, illustrationVisualListBlockData[0].description, imageFilePath,illustrationVisualListBlockData[0].altText)
        
        await QALayoutPage.goToPageView();
        expect(await (await VisualListBlockPage.visualListElementTitle).getText).toHaveText(simplevisualListBlockData[0].mainTitle);
        await expect( VisualListBlockPage.visualListElement).toExist();  
        await (await VisualListBlockPage.visualListElement).scrollIntoView();   
    });
       
    it('[S3C832] Verify that a site Content Administrator can create a Visual List Component with a Simple visual list item paragraph', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnVisualList).scrollIntoView();
        (await QALayoutPage.btnVisualList).click();
        (await VisualListBlockPage.configBlock).waitForDisplayed();
        await VisualListBlockPage.createVisualListComponentSimple(visualListBlockData[0].mainTitle, visualListBlockData[0].itemTitle, visualListBlockData[0].link, visualListBlockData[0].description);
        
        await QALayoutPage.goToPageView();
        await (await VisualListBlockPage.visualListElement).scrollIntoView();
        expect(await (await VisualListBlockPage.visualListElementTitle).getText).toHaveText(visualListBlockData[0].mainTitle);
        await expect(VisualListBlockPage.visualListElement).toExist();  
        
    });

    //#region TODO: Look at this again later. For now, manually execute these tests.
    it('[S3C842] Verify that the Visual List Paragraph type has been added to the list of paragraph types that appear in the Freeform block', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await VisualListBlockPage.configBlock).waitForDisplayed();
        await VisualListBlockPage.isVisualListInFreeformBlock();

        await expect(VisualListBlockPage.freeformVisualList).toBeDisplayedInViewport();
    });

    it('[S3C843] Verify that all design fields are present with the correct available options.', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnVisualList).scrollIntoView();
        (await QALayoutPage.btnVisualList).click();
        (await VisualListBlockPage.configBlock).waitForDisplayed();

        await VisualListBlockPage.navToStyling();

        await expect(VisualListBlockPage.dropdownMediaBackground).toBeDisplayed();

        async function verifyBackgroundOptions() {
            const expectedBackgroundOptions = stylingData.backgroundOptions;
            const dropdownMediaBackgroundOptions = await $$('#edit-settings-block-form-field-content-0-subform-field-background option');
          
            for (const option of expectedBackgroundOptions) {
              const isOptionPresent = await dropdownMediaBackgroundOptions.some(async (element) => {
                return await element.getText() === option;
              });
          
              if (!isOptionPresent) {
                throw new Error(`Option '${option}' is missing from the dropdown list.`);
              }
            }
          
            await expect(dropdownMediaBackgroundOptions).toHaveLength(expectedBackgroundOptions.length);
          }
          
          await verifyBackgroundOptions();


        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('none');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('primary-montefiore-200');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('primary-montefiore-500');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('primary-montefiore-800');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('primary-einstein-200');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('primary-einstein-500');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('primary-einstein-800');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('secondary-montefiore-200');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('secondary-montefiore-500');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('secondary-montefiore-800');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('secondary-einstein-200');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('secondary-einstein-500');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('secondary-einstein-800');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('gray-100');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('gray-200');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('gray-300');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('gray-400');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('gray-500');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('gray-600');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('gray-700');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('soft-blue');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('soft-fuchsia');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('soft-gray');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('black');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('white');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('tint-sky');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('tint-water');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('tint-flesh');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('tint-wheat');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('tint-mint');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('tint-bronze');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('functional-success-200');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('functional-success-500');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('functional-success-800');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('functional-error-200');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('functional-error-500');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('functional-error-800');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('functional-warning-200');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('functional-warning-500');
        // await expect(VisualListBlockPage.dropdownMediaBackground).toHaveValueContaining('functional-warning-800');

        // await expect(VisualListBlockPage.dropdownMediaSize).toBeDisplayed();
        // await expect(VisualListBlockPage.dropdownMediaSize).toHaveValueContaining('_none');
        // await expect(VisualListBlockPage.dropdownMediaSize).toHaveValueContaining('small');
        // await expect(VisualListBlockPage.dropdownMediaSize).toHaveValueContaining('medium');
        // await expect(VisualListBlockPage.dropdownMediaSize).toHaveValueContaining('large');

        // await expect(VisualListBlockPage.dropdownMediaSpacing).toBeDisplayed();
        // await expect(VisualListBlockPage.dropdownMediaSpacing).toHaveValueContaining('base');
        // await expect(VisualListBlockPage.dropdownMediaSpacing).toHaveValueContaining('none');
        // await expect(VisualListBlockPage.dropdownMediaSpacing).toHaveValueContaining('narrow');

        // await expect(VisualListBlockPage.dropdownMediaAlign).toBeDisplayed();
        // await expect(VisualListBlockPage.dropdownMediaAlign).toHaveValueContaining('_none');
        // await expect(VisualListBlockPage.dropdownMediaAlign).toHaveValueContaining('left');
        // await expect(VisualListBlockPage.dropdownMediaAlign).toHaveValueContaining('right');

        // const roundedCheckbox = await VisualListBlockPage.checkboxRoundedMedia;
        // await expect(roundedCheckbox).toBeDisplayed();
        // await expect(roundedCheckbox.isSelected()).toBe(false);

        // await expect(VisualListBlockPage.dropdownTemplate).toBeDisplayed();
        // await expect(VisualListBlockPage.dropdownTemplate).toHaveValueContaining('list');
        // await expect(VisualListBlockPage.dropdownTemplate).toHaveValueContaining('card');
        // await expect(VisualListBlockPage.dropdownTemplate).toHaveValueContaining('card-small');

        // const dividerCheckbox = await VisualListBlockPage.checkboxDivider;
        // await expect(dividerCheckbox).toBeDisplayed();
        // await expect(dividerCheckbox.isSelected()).toBe(true);

        // await expect(VisualListBlockPage.dropdownDividerStyle).toBeDisplayed();
        // await expect(VisualListBlockPage.dropdownDividerStyle).toHaveValueContaining('light');
        // await expect(VisualListBlockPage.dropdownDividerStyle).toHaveValueContaining('dark');


    });
    //#endregion

  });
