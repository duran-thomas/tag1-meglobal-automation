import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import FooterBlockPage from '../../pageobjects/CMS/Components/footer.page';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';
import { footerBlockData, contactConfigData, groupMenuData } from '../../data/footer.data';
import * as fs from "fs";


describe('Footer Component Tests', () => {

    before(async ()=>{
        // Get the environment configuration
        const environment = getEnvironmentConfig(process.env.ENV);

        // Use the environment data
        const bypassURL = environment.bypassURL;
        const cookies = environment.admin;

        //Bypass login
        await browser.url(await bypassURL);
        await browser.maximizeWindow();

        // Set user cookies
        await browser.setCookies(await cookies);

    });

    afterEach(async function() { 
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/Footer/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

  
    it('[S3C649] Verify that the Footer component exists on a page of the site', async () => {
        await FooterBlockPage.openHome();
        await (await FooterBlockPage.footerElement).scrollIntoView();
        await expect(FooterBlockPage.footerElement).toBeExisting();
        await expect(FooterBlockPage.footerBottom).toBeExisting();
        await expect(FooterBlockPage.footerRightBlock).toBeExisting();
        await expect(FooterBlockPage.footerMainLinks).toBeExisting();
        await expect(FooterBlockPage.footerTopLinks).toBeExisting();

    });

    it('[S3C685] Verify the display of the Contact Us section for Montefiore and Einstein', async () => {
        await FooterBlockPage.openHome();
        await (await FooterBlockPage.footerElement).scrollIntoView();

        const rightBlock = await FooterBlockPage.footerRightBlock;
        const logo = await rightBlock.$(await FooterBlockPage.meLogo.selector);
        const phoneIcons = await FooterBlockPage.phoneIcons;
        const locationIcons = await FooterBlockPage.locationIcons;
        const xIcons = await FooterBlockPage.xIcon;
        const fbIcons = await FooterBlockPage.fbIcon;
        const linkedInIcons = await FooterBlockPage.linkedInIcon;
        const igIcons = await FooterBlockPage.igIcon;
        const youTubeIcons = await FooterBlockPage.youTubeIcon;

        await expect(logo).toBeExisting();
        await expect(phoneIcons.length).toBe(2);
        await expect(locationIcons.length).toBe(2);
        await expect(xIcons.length).toBe(2);
        await expect(fbIcons.length).toBe(2);
        await expect(linkedInIcons.length).toBe(2);
        await expect(igIcons.length).toBe(2);
        await expect(youTubeIcons.length).toBe(2);
    });

    it('[S3C688] Verify social media icons are present with valid links', async () => {
        await FooterBlockPage.openHome();
        await (await FooterBlockPage.footerElement).scrollIntoView({block:'start'});
        await FooterBlockPage.closeElements();
            
        const xIcons = await FooterBlockPage.xIcon;
        const fbIcons = await FooterBlockPage.fbIcon;
        const linkedInIcons = await FooterBlockPage.linkedInIcon;
        const igIcons = await FooterBlockPage.igIcon;
        const youTubeIcons = await FooterBlockPage.youTubeIcon;

        // Loop through each Icon, click it, and assert the URL
        for (let i = 0; i < xIcons.length; i++) {
            const href = await xIcons[i].getAttribute('href');
            await expect(href).toContain('https://twitter.com/');        }

        for (let i = 0; i < fbIcons.length; i++) {
            const href = await fbIcons[i].getAttribute('href');
            await expect(href).toContain('https://www.facebook.com/');
        }

        for (let i = 0; i < linkedInIcons.length; i++) {
            const href = await linkedInIcons[i].getAttribute('href');
            await expect(href).toContain('https://www.linkedin.com/');
        }

        for (let i = 0; i < igIcons.length; i++) {
            const href = await igIcons[i].getAttribute('href');
            await expect(href).toContain('https://www.instagram.com/');
        }

        for (let i = 0; i < youTubeIcons.length; i++) {
            const href = await youTubeIcons[i].getAttribute('href');
            await expect(href).toContain('https://www.youtube.com/');
        }

    });

    it('[S3C980] Verify that the default icon configurations for the Montefiore and Einstein Social menu items are set', async () => {
        await FooterBlockPage.monteSocialMenu();
        const socialPages = FooterBlockPage.editBtn;
        const icons = ['x', 'facebook', 'linkedin', 'instagram', 'youtube']

        // Loop through each social node and verify icon field value
        for (let i = 0; i < icons.length; i++) {
            await (await socialPages[i]).scrollIntoView();
            await (await socialPages[i]).click();
            await expect(FooterBlockPage.dropdownIcon).toHaveValue(icons[i]);
            await FooterBlockPage.monteSocialMenu();   
        }

    });

    it('[S3C689] Verify the ability to configure footer menus', async () => {
        //add top link
        await FooterBlockPage.topLinksMenu();
        await FooterBlockPage.addLinkTestItem(footerBlockData.mainTitle, footerBlockData.link);
        await FooterBlockPage.openHome();
        await expect(await FooterBlockPage.expectedFooterElement).toBeExisting();

        //remove top link
        await FooterBlockPage.topLinksMenu();
        await FooterBlockPage.removeTestItem();
        await FooterBlockPage.openHome();
        await expect(await FooterBlockPage.expectedFooterElement).not.toBeExisting();

        //add bottom link
        await FooterBlockPage.bottomLinksMenu();
        await FooterBlockPage.addLinkTestItem(footerBlockData.mainTitle, footerBlockData.link);
        await FooterBlockPage.openHome();
        await expect(await FooterBlockPage.expectedFooterElement).toBeExisting();

        //remove bottom link
        await FooterBlockPage.bottomLinksMenu();
        await FooterBlockPage.removeTestItem();
        await FooterBlockPage.openHome();
        await expect(await FooterBlockPage.expectedFooterElement).not.toBeExisting();

        //add Main Footer link
        await FooterBlockPage.footerMenu();
        await FooterBlockPage.addLinkTestItem(footerBlockData.mainTitle, footerBlockData.link);
        await FooterBlockPage.openHome();
        await expect(await FooterBlockPage.expectedFooterElement).toBeExisting();

        //add Main Footer sub link
        await FooterBlockPage.footerMenu();
        await FooterBlockPage.addSubFooterLink(footerBlockData.subTitle, footerBlockData.link2);
        await FooterBlockPage.openHome();
        await expect(await FooterBlockPage.expectedFooterElement).toBeExisting();
        await expect(await FooterBlockPage.expectedSubFooterElement).toBeExisting();

        //remove both main footer links
        await FooterBlockPage.footerMenu();
        await FooterBlockPage.removeTestItem();
        await FooterBlockPage.removeTestItem();
        await FooterBlockPage.openHome();
        await (await FooterBlockPage.footerElement).scrollIntoView();
        await expect(await FooterBlockPage.expectedFooterElement).not.toBeExisting();
        await expect(await FooterBlockPage.expectedSubFooterElement).not.toBeExisting();
    });

    it('[S3C976] Verify that icons can be configured for menu items in the Montefiore Social menu', async () => {
        await FooterBlockPage.monteSocialMenu();
        await FooterBlockPage.updateIcon();
        await FooterBlockPage.openHome();
        await expect(FooterBlockPage.iconElement).toBeExisting();
        await FooterBlockPage.monteSocialMenu();
        await FooterBlockPage.revertIcon();
        await FooterBlockPage.openHome();
        await expect(FooterBlockPage.iconElement).not.toBeExisting();
        await FooterBlockPage.footerElement.scrollIntoView();
    });

    it('[S3C977] Verify that icons can be configured for menu items in the Einstein Social menu', async () => {
        await FooterBlockPage.einSocialMenu();
        await FooterBlockPage.updateIcon();
        await FooterBlockPage.openHome();
        await expect(FooterBlockPage.iconElement).toBeExisting();
        await FooterBlockPage.einSocialMenu();
        await FooterBlockPage.revertIcon();
        await FooterBlockPage.openHome();
        await expect(FooterBlockPage.iconElement).not.toBeExisting();
        await FooterBlockPage.footerElement.scrollIntoView();
    });

    it('[S3C987] Verify the ability to create Group Footer menu', async () => {
        //create menu
        await FooterBlockPage.addGroupFooterMenu(groupMenuData.title);
        await FooterBlockPage.clinicalTrialsGroupMenus();
        await expect(await FooterBlockPage.newQAFooterLink).toBeExisting();

        //add links
        await (await FooterBlockPage.newQAFooterLink).click();
        await FooterBlockPage.addLinkToMenu(groupMenuData.menuLinkTitle, groupMenuData.link);
        await FooterBlockPage.addSecondLinkToMenu(groupMenuData.secondMenuLinkTitle, groupMenuData.secondLink);

        await expect($(`=${groupMenuData.menuLinkTitle}`)).toBeExisting();
        await expect($(`=${groupMenuData.secondMenuLinkTitle}`)).toBeExisting();
    });

    it('[S3C691] Verify dynamic selection of footer menu based on the page context', async () => {
        await FooterBlockPage.clinicalTrialsGroupNodes();
        await FooterBlockPage.createGroupLayout(groupMenuData.layoutTitle);
        await expect(FooterBlockPage.meGroupName).toHaveText('Group: Clinical Trials / ITCR');

        //delete layout node
        await FooterBlockPage.deleteGroupLayout();
        await expect(FooterBlockPage.msgElement).toHaveTextContaining('has been deleted.');

        //deleteGroup (from previous test)
        await FooterBlockPage.deleteCreatedGroupMenu();
        await FooterBlockPage.clinicalTrialsGroupMenus();
        await expect(FooterBlockPage.newQAFooterLink).not.toBeExisting();

    });

    it('[S3C692] Verify the ability to edit Montefiore and Einstein Contact Us information from a single page', async () => {
        //update contact number
        await FooterBlockPage.dapContactMenu();
        await FooterBlockPage.updateContactInfo(contactConfigData.monteUpdate, contactConfigData.einUpdate);
        await FooterBlockPage.openHome();
        const mNewText = await FooterBlockPage.mNumberElement.getText();
        const eNewText = await FooterBlockPage.eNumberElement.getText();

        await expect(mNewText).toContain(contactConfigData.mUpdate);
        await expect(eNewText).toContain(contactConfigData.mUpdate);

        //revert contact number
        await FooterBlockPage.dapContactMenu();
        await FooterBlockPage.updateContactInfo(contactConfigData.monteOriginal, contactConfigData.einOrignal);
        await FooterBlockPage.openHome();
        const mText = await FooterBlockPage.mNumberElement.getText();
        const eText = await FooterBlockPage.eNumberElement.getText();

        await expect(mText).toContain(contactConfigData.mNumber);
        await expect(eText).toContain(contactConfigData.eNumber);
        await (await FooterBlockPage.footerElement).scrollIntoView();
        
    });

    it('[S3C690] Verify an "active link" designation and animation exists for the links of the Footer Top menu.', async () => {
        await FooterBlockPage.openHome();
        await (await FooterBlockPage.footerElement).scrollIntoView();
        const monteLink = await FooterBlockPage.linkME;
        await expect(monteLink).toHaveElementClass('mf-link--animation-default');
        await FooterBlockPage.patientCare();
        await (await FooterBlockPage.footerElement).scrollIntoView();
        const pcLink = await FooterBlockPage.linkPCare;
        await expect(pcLink).toHaveElementClass('mf-link--animation-default');
    });

    it('[S3C1331] Verify that an administrator can add a Copyright Section to the Footer', async () => {
        await FooterBlockPage.footerMgmt();
        await FooterBlockPage.updateFooterCopyright('[current-date:html_year] Test Copyright');
        await (await FooterBlockPage.footerElement).scrollIntoView();
        await expect(FooterBlockPage.testCopyrightElem).toBeExisting;
        await expect(FooterBlockPage.testCopyrightElem).toHaveTextContaining('Test Copyright');
        await FooterBlockPage.footerMgmt();
        await FooterBlockPage.updateFooterCopyright('');
        await (await FooterBlockPage.footerElement).scrollIntoView();
        await expect(FooterBlockPage.testCopyrightElem).not.toBeExisting;
    });

    it('[S3C1346] Verify that Analytics for the Footer Component is configured', async () => {
       await FooterBlockPage.openHome;
       await (await FooterBlockPage.footerElement).scrollIntoView();

        /**
         * Create the expected analytics 
         * object based on the spec below: 
         * https://docs.google.com/presentation/d/1ZutjAoLuYLu2ZtFSzIIrdZdabk-01rpA8aT5JcmEMPc/edit#slide=id.g127fd856972_0_260
         * */
        const expectedAnalyticsData = {
            event: 'e_navigationClick',
            navigationType: 'footer',
            clickText: 'Find Care > Find a Doctor | 2',
            linkType: "link"
        }

        const footerItem = await $('a[data-analytics-click-text="Find a Doctor | 2"]');

        // Perform cmd + click
        await browser.performActions([
            {
                type: 'key',
                id: 'keyboard1',
                actions: [
                    { type: 'keyDown', value: '\uE03D' }, // Command key down (Meta key)
                ]
            },
            {
                type: 'pointer',
                id: 'mouse1',
                actions: [
                    { type: 'pointerMove', origin: footerItem, x: 0, y: 0 },
                    { type: 'pointerDown', button: 0 }, // Left click down
                    { type: 'pointerUp', button: 0 } // Left click up
                ]
            },
            {
                type: 'key',
                id: 'keyboard2',
                actions: [
                    { type: 'keyUp', value: '\uE03D' } // Command key up (Meta key)
                ]
            }
        ]);

        // Get the data layer for the window and get the data for the click event for the component
        const dataLayer = await browser.executeScript('return window.dataLayer',[]);

        // Get the data layer for the window and get the data for the click event for the component
        const actualAnalyticsData = dataLayer.filter((item) => item.event === "e_navigationClick")[0];
        // Build the actual analytics data object
        const parsedActualAnalyticsData = {
            //Remove whitespace from the Headline
            clickText: actualAnalyticsData.clickText.trim(),
            navigationType: actualAnalyticsData.navigationType,
            linkType: actualAnalyticsData.linkType,
            event: actualAnalyticsData.event
        }

        fs.writeFile('analyticsTestEvidence/footer.json', JSON.stringify(dataLayer), err => {
            if (err) {
                console.error(err);
            }
        });

        await expect(parsedActualAnalyticsData).toEqual(expectedAnalyticsData);
    });

    it('[S3C1628] Verify that the number of columns in the footer is configurable', async () => {
        await FooterBlockPage.footerMgmt();
        await FooterBlockPage.updateFooterColumn('3');
        await (await FooterBlockPage.footerElement).scrollIntoView();
        let footerElem = await FooterBlockPage.footerMainLinks;
        await expect(footerElem).toHaveAttribute('style', '--column-count: 3;');
        //revert changes
        await FooterBlockPage.footerMgmt();
        await FooterBlockPage.updateFooterColumn('5');
        await (await FooterBlockPage.footerElement).scrollIntoView();
        await expect(footerElem).toHaveAttribute('style', '--column-count: 5;');

    });

    it('[S3C1672] Verify that Footer links support onClick values to enable OneTrust Panel', async () => {
        await FooterBlockPage.updateElemClass('me-cookie-preference');
        await (await FooterBlockPage.linkFindDoctor).click();
        await expect(await FooterBlockPage.oneTrustElement).toBeDisplayedInViewport();
        //revert changes
        await FooterBlockPage.updateElemClass('');
        await (await FooterBlockPage.linkFindDoctor).click();
        await expect(await FooterBlockPage.oneTrustElement).not.toBeDisplayedInViewport();

    });

  });
