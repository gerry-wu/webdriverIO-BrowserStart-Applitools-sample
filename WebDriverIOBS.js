function main() {
    const webdriverio = require('webdriverio');
    var ConsoleLogHandler = require('eyes.selenium').ConsoleLogHandler;

    var bsUser = "gerry35";//process.env.SAUCE_USER;
    var bsKey = "9aXjGCgxH8ZcfdMhbKWq";//process.env.SAUCE_KEY;

    const options = {
        user: "gerry35",
        key: "9aXjGCgxH8ZcfdMhbKWq",

        seleniumHost: 'hub-cloud.browserstack.com',
        seleniumPort: 80,

        desiredCapabilities: [{
            browserName: 'chrome',
            platform: 'ANDROID',
            os_version: '7.0',
            device: 'Samsung Galaxy S8',
            realMobile: 'true',
        }]
    }


    const driver = webdriverio.remote(options);
    let browser = driver.init();

    // Initialize the eyes SDK and set your private API key.
    const { Eyes, Target } = require('@applitools/eyes.webdriverio');
    let eyes = new Eyes();
    eyes.setApiKey("SXhtohYtbRnE109M0hwjs4vqRFODfy110ixSmUnpxkTMHSg110");//(process.env.APPLITOOLS_API_KEY);
    eyes.setLogHandler(new ConsoleLogHandler(true));


    try {

        // Start the test and set the browser's viewport size to 800x600.
        eyes.open(browser, 'Hello World!', 'My first WebdriverIO test!');

        // Navigate the browser to the "hello world!" web-site.
        browser.url('https://applitools.com/helloworld');

        // Visual checkpoint #1.
        eyes.check('Main Page', Target.window());

        // Click the "Click me!" button.
        browser.click('button');

        // Visual checkpoint #2.
        eyes.check('Click!', Target.window());

        // End the test.
        eyes.close();

    } finally {

        // Close the browser.
        browser.end();

        // If the test was aborted before eyes.close was called ends the test as aborted.
        eyes.abortIfNotClosed();

    }

}

main();