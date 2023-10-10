import LoginPage from '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import StepperBlockPage from '../../pageobjects/CMS/Components/stepper.page';
import { stepperBlockData } from '../../data/stepper.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';



describe('Stepper Component Tests', () => {

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
    })

    afterEach(async function () {
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/Stepper/${testName}.png`;
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

    it.skip('[S3C926] Verify required fields in a stepper component', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnStepper).scrollIntoView();
        (await QALayoutPage.btnStepper).click();
        (await StepperBlockPage.configBlock).waitForDisplayed();

        await StepperBlockPage.checkRequired(stepperBlockData.adminTitle);

        const elem = await StepperBlockPage.inputTitle;
        await expect(await elem.getAttribute('aria-required')).toEqual('true');

    });

    it('[S3C927] Verify that a site Content Administrator can create a horizontal Stepper Component', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnStepper).scrollIntoView();
        (await QALayoutPage.btnStepper).click();
        (await StepperBlockPage.configBlock).waitForDisplayed();

        await StepperBlockPage.createHorizontalStepper(stepperBlockData.adminTitle, stepperBlockData.steps.title1, stepperBlockData.steps.content1, stepperBlockData.steps.title2, stepperBlockData.steps.content2, stepperBlockData.steps.title3, stepperBlockData.steps.content3, stepperBlockData.steps.title4, stepperBlockData.steps.content4, stepperBlockData.steps.title5, stepperBlockData.steps.content5, stepperBlockData.backLabel, stepperBlockData.contLabel);

        await expect(await StepperBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await StepperBlockPage.stepperElement).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(await $('.mf-stepper__list--horizontal')).toBeExisting();
        await expect(await StepperBlockPage.stepsElements.length).toEqual(5);
    });

    it('[S3C928] Verify that a site Content Administrator can create a vertical Stepper Component', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnStepper).scrollIntoView();
        (await QALayoutPage.btnStepper).click();
        (await StepperBlockPage.configBlock).waitForDisplayed();

        await StepperBlockPage.createVerticalStepper(stepperBlockData.adminTitle, stepperBlockData.steps.title1, stepperBlockData.steps.content1, stepperBlockData.steps.title2, stepperBlockData.steps.content2, stepperBlockData.steps.title3, stepperBlockData.steps.content3, stepperBlockData.steps.title4, stepperBlockData.steps.content4, stepperBlockData.steps.title5, stepperBlockData.steps.content5, stepperBlockData.backLabel, stepperBlockData.contLabel);

        await expect(await StepperBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await StepperBlockPage.stepperElement).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(await $('.mf-stepper__list--vertical')).toBeExisting();
        await expect(await StepperBlockPage.stepsElements.length).toEqual(5);
    });

    it('[S3C929] Verify that when the stepper component is on the initial step, the "back" button is not displayed, and the "Next Step" button is displayed.', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnStepper).scrollIntoView();
        (await QALayoutPage.btnStepper).click();
        (await StepperBlockPage.configBlock).waitForDisplayed();

        await StepperBlockPage.createHorizontalStepper(stepperBlockData.adminTitle, stepperBlockData.steps.title1, stepperBlockData.steps.content1, stepperBlockData.steps.title2, stepperBlockData.steps.content2, stepperBlockData.steps.title3, stepperBlockData.steps.content3, stepperBlockData.steps.title4, stepperBlockData.steps.content4, stepperBlockData.steps.title5, stepperBlockData.steps.content5, stepperBlockData.backLabel, stepperBlockData.contLabel);

        await expect(await StepperBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await StepperBlockPage.stepperElement).scrollIntoView({ behavior: 'auto', block: 'center' });

        await expect(await StepperBlockPage.btnBackStep).not.toBeDisplayedInViewport();
        await expect(await StepperBlockPage.btnNextStep).toBeDisplayedInViewport();
    });

    it('[S3C930] Verify that when the stepper component is on the last step, "continue" button is not displayed and the "back" button is displayed', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnStepper).scrollIntoView();
        (await QALayoutPage.btnStepper).click();
        (await StepperBlockPage.configBlock).waitForDisplayed();

        await StepperBlockPage.createHorizontalStepper(stepperBlockData.adminTitle, stepperBlockData.steps.title1, stepperBlockData.steps.content1, stepperBlockData.steps.title2, stepperBlockData.steps.content2, stepperBlockData.steps.title3, stepperBlockData.steps.content3, stepperBlockData.steps.title4, stepperBlockData.steps.content4, stepperBlockData.steps.title5, stepperBlockData.steps.content5, stepperBlockData.backLabel, stepperBlockData.contLabel);

        await expect(await StepperBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await StepperBlockPage.stepperElement).scrollIntoView({ behavior: 'auto', block: 'center' });

        await (await StepperBlockPage.btnLastStep).click();
        await expect(await StepperBlockPage.btnBackStep).toBeEnabled();
        await expect(await StepperBlockPage.btnNextStep).not.toBeDisplayedInViewport();
    });







});
