# MEDGLOBAL Automation suite

## Running it locally

### `npm install`

Installs the dependencies and creates the node modules folder.<br />

### Executing Tests

`npm run all` - runs all tests/spec files <br />

`npm run <component>` - runs tests in the specified component suite. All components are listed in the 'specs/component' folder.<br />

### Generating Test Report

From the root of the project, run the following command: `npm run allure` <br />

This generates and opens the allure report locally, displaying all test results that are currently in the `allure-results` directory. <br />

Alternatively you can use the command `allure generate --clean && allure open` to achieve the same outcome in the event of directory issues.<br/>

Results from the report can also be downloaded as a csv file while in the allure interface for export and sharing.

## Adding a New Suite

*Update the `suites` property in the `wdio.conf.js` file to include the tests/specs that should be included in your new suite.<br/>
    *Eg: `search: ['./test/specs/components/search/*.js'] ` would be added for a suite with the name search.<br/><br/>
*Update the `scripts` property in the `package.json` file to include the new suite.<br />
    *Eg: `"search": "npx wdio run wdio.conf.ts --spec ./test/specs/components/search.e2e.ts` would be added for a suite with the name search.<br/>


## Executing Data Driven Suites

The automation suite is executed against areas of the site that require some human input, As such it relies on the data pulled from the Data directory, `test/data`. These files contain standard data for completing the test processes and can be modified for changing test rigidity or assessing the input boundaries. </br>

Should new features be added that require user input; create a data file in the data directory or should they be related to the existing data files the information can be added in the respective files.

## Test Maintenance & Management

Generally the test cases should be maintained alongside the site for any changes to avoid breaking and giving false negatives. Something to note includes changing selectors. Typically selectors less subject to change are used in the page elements but there are times when a change shall occur. 

Another point for consideration, while the reason has not yet been determined there are often false negatives received when executing all suites at once, it may or may not be performance related but each full execution of the suite should have individual inspection for failed cases to determine correctness of results


## Best Practices

When using the automation suite independently there are few things to consider. <br/>

***Exceution***

For a general confidence test executing the entire suite at once is appropriate but when assessing an issue it is better to execute the suites individually. This allows for easier error tracking and allows you the ability to visually follow the flow of the test as it is occuring,in which you can see exactly where a case begins to fail, typically there is a pause in execution or you may able to briefly see some error on the page. <br/>

***Test Inpsection***

If during test execution you would like the execution to be paused to inspect a page for some reason this can be done using pauses. Simply putting a browser pause where necessary will halt the exection for your desired amount of time. For e.g. `browser.pause(5000)` will pause exectuion for 5 seconds. This is usually helpful when you want to observe some element behaviour or result of a line of code before the test completes in full.<br/>

***Skipping Tests***

There may be times in executing a test suite when you no longer need the entire suite to be executed because you are focused on a specific test case. For e.g a specific case has failed and it is not dependent on other cases in the suite. In this instance it would be more time efficient to skip the tests that have passed and only execute the tests of focus. Here we can use `x` or `skip` to skip test cases. This is written as `xit` or `it.skip`. If only one particular case needs to be executed then you could also use the `it.only` format to execute only that test script.

`skips` can also be placed on the describe block to skip an entire component suite from being executed, ie `describe.skip`.


## QualityWatcher Reporter

> This project uses QualityWatcher WebdriverIO [reporter](https://www.npmjs.com/package/@qualitywatcher/wdio-reporter), and [service](https://www.npmjs.com/package/@qualitywatcher/wdio-service)

When sending results to QualityWatcher, you will only need an API Key and an Email:

- QUALITYWATCHER_API_KEY=
- QUALITYWATCHER_EMAIL=

These should be placed in your `.env` file.

If you need more information on how to map test cases to existing qualitywatcher cases, please see [documentation](https://www.docs.qualitywatcher.com/docs/guides/integrating-automation-results)