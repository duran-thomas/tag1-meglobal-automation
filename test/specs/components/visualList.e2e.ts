import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import VisualListBlockPage from '../../pageobjects/CMS/Components/visualList.page';
import {users} from '../../data/users.data';
import { visualListBlockData, illustrationVisualListBlockData, simplevisualListBlockData } from '../../data/visualList.data';
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
        await AdminContentPage.getQALandingPage();  //TODO: This function may need some checking out. When its run with all tests at once. I don't think it behaves as expected.
        expect(await QALayoutPage.tabLayout).toBeDisplayed();
    })

    afterEach(async function() { //TODO: This needs some checking out. The screenshots that it create seem to be taken a bit too early in the execution?
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/VisualList/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    /**
     * TODO: Possibly add some cleanup code here?
     */
    // after(async function () {

    // })
  
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
                expect(await (await VisualListBlockPage.visualListElementTitle).getText).toHaveText(record.mainTitle);
                expect(await VisualListBlockPage.visualListElement).toExist();  
                await QALayoutPage.goToPageView();
                await (await VisualListBlockPage.visualListElement).scrollIntoView();
            }
            if (record.itemTitle === 'QA Simple Visual List Item Title Internal URL' ){
                await VisualListBlockPage.createVisualListComponentSimple(record.mainTitle, record.itemTitle, record.link, record.description);
                expect(await (await VisualListBlockPage.visualListElementTitle).getText).toHaveText(record.mainTitle);
                expect(await VisualListBlockPage.visualListElement).toExist();  
                await QALayoutPage.goToPageView();
                await (await VisualListBlockPage.visualListElement).scrollIntoView();
            }
            if (record.itemTitle === 'QA Illustration Visual List Item Title'){
                
                await VisualListBlockPage.createVisualListComponentIllustration(record.mainTitle, record.itemTitle, record.link, record.description, imageFilePath, record.altText);
                expect(await (await VisualListBlockPage.visualListElementTitle).getText).toHaveText(record.mainTitle);
                expect(await VisualListBlockPage.visualListElement).toExist();  
                await QALayoutPage.goToPageView();
                await (await VisualListBlockPage.visualListElement).scrollIntoView();
            }
            if (record.itemTitle === 'QA Illustration Visual List Item Title Internal URL'){
                await VisualListBlockPage.createVisualListComponentIllustration(record.mainTitle, record.itemTitle, record.link, record.description, imageFilePath, record.altText);
                expect(await (await VisualListBlockPage.visualListElementTitle).getText).toHaveText(record.mainTitle);
                expect(await VisualListBlockPage.visualListElement).toExist();  
                await QALayoutPage.goToPageView();
                await (await VisualListBlockPage.visualListElement).scrollIntoView();
            }
            if (record.itemTitle === 'QA Icon Visual List Item Title'){
                await VisualListBlockPage.createVisualListComponentIcon(record.mainTitle,record.itemTitle,record.link,record.description)
                expect(await (await VisualListBlockPage.visualListElementTitle).getText).toHaveText(record.mainTitle);
                expect(await VisualListBlockPage.visualListElement).toExist();  
                await QALayoutPage.goToPageView();
                await (await VisualListBlockPage.visualListElement).scrollIntoView();
            }
            if (record.itemTitle === 'QA Icon Visual List Item Title Internal URL'){
                await VisualListBlockPage.createVisualListComponentIcon(record.mainTitle,record.itemTitle,record.link,record.description)
                expect(await (await VisualListBlockPage.visualListElementTitle).getText).toHaveText(record.mainTitle);
                expect(await VisualListBlockPage.visualListElement).toExist();  
                await QALayoutPage.goToPageView();
                await (await VisualListBlockPage.visualListElement).scrollIntoView();
            }
            if (record.itemTitle === 'QA Illustration Card Visual List Item Title'){
                await VisualListBlockPage.createVisualListComponentIllustrationCard(record.mainTitle,
                record.eyebrow, record.heading, record.url, record.linkText, record.description, imageFilePath, record.altText)

                expect(await (await VisualListBlockPage.visualListElementTitle).getText).toHaveText(record.mainTitle);
                expect(await VisualListBlockPage.visualListElement).toExist();  
                await QALayoutPage.goToPageView();
                await (await VisualListBlockPage.visualListElement).scrollIntoView();
            }
            if (record.itemTitle === 'QA Illustration Card Visual List Item Title Internal URL'){
                await VisualListBlockPage.createVisualListComponentIllustrationCard(record.mainTitle,
                record.eyebrow, record.heading, record.url, record.linkText, record.description, imageFilePath, record.altText)
                
                expect(await (await VisualListBlockPage.visualListElementTitle).getText).toHaveText(record.mainTitle);
                expect(await VisualListBlockPage.visualListElement).toExist();  
                await QALayoutPage.goToPageView();
                await (await VisualListBlockPage.visualListElement).scrollIntoView();    
            }
            if (record.itemTitle === 'QA Image Card Visual List Item Title'){
                await VisualListBlockPage.createVisualListComponentImageCard(record.mainTitle,
                    record.eyebrow, record.heading, record.url, record.linkText, record.description, imageFilePath, record.altText)
                    
                    expect(await (await VisualListBlockPage.visualListElementTitle).getText).toHaveText(record.mainTitle);
                    expect(await VisualListBlockPage.visualListElement).toExist();  
                    await QALayoutPage.goToPageView();
                    await (await VisualListBlockPage.visualListElement).scrollIntoView();   
            }
        })
    }

    it('Verify that a site Content Administrator can create a Visual List Component with both an Illustration visual list item paragraph and a Simple visual list item', async () => {
        await (QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnVisualList).scrollIntoView();
        (await QALayoutPage.btnVisualList).click();
        (await VisualListBlockPage.configBlock).waitForDisplayed();
        const imageFilePath = await browser.uploadFile('scriptFiles/sampleImg1.jpg');
        await VisualListBlockPage.createIllustrationAndSimple(simplevisualListBlockData[0].mainTitle,simplevisualListBlockData[0].itemTitle,illustrationVisualListBlockData[0].itemTitle,simplevisualListBlockData[0].link, 
            simplevisualListBlockData[0].description, illustrationVisualListBlockData[0].description, imageFilePath,illustrationVisualListBlockData[0].altText)
        expect(await (await VisualListBlockPage.visualListElementTitle).getText).toHaveText(simplevisualListBlockData[0].mainTitle);
        expect(await VisualListBlockPage.visualListElement).toExist();  
        await QALayoutPage.goToPageView();
        await (await VisualListBlockPage.visualListElement).scrollIntoView();   
    });


    //#region TODO: Look at this again later. For now, manually execute these tests.
    it.only('Verify that the Visual List Paragraph type has been added to the list of paragraph types that appear in the Freeform block', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await VisualListBlockPage.configBlock).waitForDisplayed();
        await VisualListBlockPage.isVisualListInFreeformBlock();
    });

    it('Verify that all design fields are present with the correct available options.', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnVisualList).scrollIntoView();
        (await QALayoutPage.btnVisualList).click();
        (await VisualListBlockPage.configBlock).waitForDisplayed();
    });
    //#endregion
    
  });
