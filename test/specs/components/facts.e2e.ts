import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import FactsBlockPage from '../../pageobjects/CMS/Components/facts.page';
import LandingPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import {users} from '../../data/users.data';
import { factsBlockData } from '../../data/facts.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { cookieData } from '../../data/cookie.data';


describe('Facts Component Tests', () => {
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
        expect(await LandingPage.tabLayout).toBeDisplayed();
    })

    afterEach(async function() { //TODO: This needs some checking out. The screenshots that it create seem to be taken a bit too early in the execution?
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/Facts/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    /**
     * TODO: Possibly add some cleanup code here?
     */
    // after(async function () {

    // })
  
    it('Verify that a site Content Administrator can create a Facts Component with a horizontal layout', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFacts).scrollIntoView();
        (await QALayoutPage.btnFacts).click();
        (await FactsBlockPage.configBlock).waitForDisplayed();

        await FactsBlockPage.createFactsWithHorizontalLayout(factsBlockData.mainTitle, factsBlockData.title1, factsBlockData.description1, factsBlockData.title2, factsBlockData.description2, factsBlockData.title3, factsBlockData.description3);

        expect(await FactsBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        expect(await FactsBlockPage.horizontalElement).toExist();   
        await (await FactsBlockPage.horizontalElement).scrollIntoView();
        
    });

    it('Verify that a site Content Administrator can create a Facts Component with a vertical layout', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFacts).scrollIntoView();
        (await QALayoutPage.btnFacts).click();
        (await FactsBlockPage.configBlock).waitForDisplayed();

        await FactsBlockPage.createFactsWithVerticalLayout(factsBlockData.mainTitle, factsBlockData.title1, factsBlockData.description1, factsBlockData.title2, factsBlockData.description2, factsBlockData.title3, factsBlockData.description3);

        expect(await FactsBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        expect(await FactsBlockPage.factsElement).toExist(); 
        await (await FactsBlockPage.factsElement).scrollIntoView();
        await browser.pause(4000);
    });

    it.only('Verify that a site Content Administrator can create a Facts Component with a grid layout', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFacts).scrollIntoView();
        (await QALayoutPage.btnFacts).click();
        (await FactsBlockPage.configBlock).waitForDisplayed();

        await FactsBlockPage.createFactsWithGridLayout(factsBlockData.mainTitle, factsBlockData.title1, factsBlockData.description1, factsBlockData.title2, factsBlockData.description2, factsBlockData.title3, factsBlockData.description3);

        expect(await FactsBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        expect(await FactsBlockPage.factsElement).toExist(); 
        await (await FactsBlockPage.factsElement).scrollIntoView();
        await browser.pause(4000);
    });

    it('Verify that a site Content Administrator can create a Facts Component with a slider layout', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFacts).scrollIntoView();
        (await QALayoutPage.btnFacts).click();
        (await FactsBlockPage.configBlock).waitForDisplayed();

        await FactsBlockPage.createFactsWithSliderLayout(factsBlockData.mainTitle, factsBlockData.title1, factsBlockData.description1, factsBlockData.title2, factsBlockData.description2, factsBlockData.title3, factsBlockData.description3, factsBlockData.title4, factsBlockData.description4, factsBlockData.title5, factsBlockData.description5);

        expect(await FactsBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        expect(await FactsBlockPage.btnCarousel).toExist(); 
        await (await FactsBlockPage.factsElement).scrollIntoView();
    });

    it('Verify that all design fields are present with the correct available options.', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFacts).scrollIntoView();
        (await QALayoutPage.btnFacts).click();
        (await FactsBlockPage.configBlock).waitForDisplayed();

        await FactsBlockPage.navToStyling()
        expect(await FactsBlockPage.dropdownBackground).toBeDisplayed();
        expect(await FactsBlockPage.dropdownBackground).toHaveValue('white');
        expect(await FactsBlockPage.dropdownBackground).toHaveValue('soft-blue');
        expect(await FactsBlockPage.dropdownBackground).toHaveValue('mist-gray');

        expect(await FactsBlockPage.dropdownTitleVariant).toBeDisplayed();
        expect(await FactsBlockPage.dropdownTitleVariant).toHaveValue('sans');
        expect(await FactsBlockPage.dropdownTitleVariant).toHaveValue('serif');

        expect(await FactsBlockPage.dropdownLayout).toBeDisplayed();
        expect(await FactsBlockPage.dropdownLayout).toHaveValue('vertical-list');
        expect(await FactsBlockPage.dropdownLayout).toHaveValue('horizontal-list');
        expect(await FactsBlockPage.dropdownLayout).toHaveValue('grid');
        expect(await FactsBlockPage.dropdownLayout).toHaveValue('slider');

        expect(await FactsBlockPage.dropdownHorizontalAlignment).toBeDisplayed();
        expect(await FactsBlockPage.dropdownHorizontalAlignment).toHaveValue('left');
        expect(await FactsBlockPage.dropdownHorizontalAlignment).toHaveValue('center');
        expect(await FactsBlockPage.dropdownHorizontalAlignment).toHaveValue('right');

        expect(await FactsBlockPage.dropdownVerticalAlignment).toBeDisplayed();
        expect(await FactsBlockPage.dropdownVerticalAlignment).toHaveValue('top');
        expect(await FactsBlockPage.dropdownVerticalAlignment).toHaveValue('center');
        expect(await FactsBlockPage.dropdownVerticalAlignment).toHaveValue('bottom');

        const checkbox = await FactsBlockPage.checkboxAddBorder;
        expect(await checkbox).toBeDisplayed();
        expect(await checkbox.isSelected()).toBe(false);
        
    });

    it('Verify that the Facts Component displays the correct title', async () => {
        (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFacts).scrollIntoView();
        (await QALayoutPage.btnFacts).click();
        (await FactsBlockPage.configBlock).waitForDisplayed();

        await FactsBlockPage.createAFact(factsBlockData.mainTitle, factsBlockData.title1, factsBlockData.description1)
        expect(await FactsBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        expect(((await FactsBlockPage.titleElement).getText)).toHaveText(factsBlockData.title1);
        await (await FactsBlockPage.factsElement).scrollIntoView();
    });

  });
