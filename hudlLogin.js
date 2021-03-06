const { webdriver, Builder, By, Key, until } = require('selenium-webdriver'),
    assert = require('assert'),
    chai = require('chai'),
    expect = require('chai').expect;

var hudlUrl = 'https://www.hudl.com/',
    hudlHomeUrl = 'https://www.hudl.com/home',
    hudlLoginUrl = 'https://www.hudl.com/login',
    hudlLogoutUrl = 'https://www.hudl.com/logout',
    hudlCorrectEmail = process.env.HUDL_CORRECT_EMAIL,
    hudlCorrectPassword = process.env.HUDL_CORRECT_PASSWORD,
    hudlWrongEmail = 'wrongemail@wrongemail.com',
    hudlWrongPassword = 'wrongPassword',
    loginElement = '[data-qa-id="login"]',
    emailInputElement = '[data-qa-id="email-input"]',
    passwordInputElement = '[data-qa-id="password-input"]',
    loginBtnElement = '[data-qa-id="login-btn"]',
    loginErrorElement = '[data-qa-id="error-display"]',
    videoElement = '[data-qa-id="webnav-primarynav-video"]',
    driverRunning;

let driver;

describe('Running Hudl login test', function () {

    before(async function () {

        //sets time out that runs before all the test.
        this.timeout(12000);

        //should start the chrome browser before any test runs
        driver = await new Builder().forBrowser('chrome').build();
        driverRunning = true;

    });

    beforeEach(async function () {

        this.timeout(120000);

        //should start the chrome browser before each test
        if (!driverRunning) {

            driver = await new Builder().forBrowser('chrome').build();

        }

    });

    afterEach(async function () {

        //should close the browser and driver after each test
        await driver.quit();
        driverRunning = false;

    });

    after(async function () {

        //should close the browser and driver after all test run if still runing
        if (driverRunning) {

            await driver.quit();
            driverRunning = false;

        }

    });

    async function goToHudlUrl() {

        try {

            //should check that the title text is the correct "Home - Hudl"
            await driver.get(hudlUrl);
            let currentUrl = await driver.getCurrentUrl();
            assert.strictEqual(currentUrl, hudlUrl);
            let hudlUrlTitle = await driver.getTitle();

            //should check that the title is correcct "Hudl: We Help Teams and Athletes Win"
            assert.strictEqual(hudlUrlTitle, "Hudl: We Help Teams and Athletes Win");

        } catch (e) {

            assert.fail(e);

        }

    };

    async function goToHudlLoginPage() {

        try {

            //go to hudl.com
            await goToHudlUrl();

            //find and click the login button
            await driver.findElement(By.css(loginElement)).click();
            await loginPageCheck();

        } catch (e) {

            assert.fail(e);

        }

    };

    async function goToHudlHomeUrl() {

        try {

            //should check that the title text is the correct "Home - Hudl"
            await driver.get(hudlHomeUrl);
            await hudlHomePageCheck();


        } catch (e) {

            assert.fail(e);

        }

    };

    async function hudlHomePageCheck() {

        try {

            //checks to see if we are on home page after login
            let videoElementPresent = await driver.wait(until.elementLocated(By.css(videoElement)), 10000);
            videoElementPresent = await driver.findElement(By.css(videoElement)).getText();
            assert.strictEqual(videoElementPresent, "Video");
            let currentUrl = await driver.getCurrentUrl();
            assert.strictEqual(currentUrl, hudlHomeUrl);
            let homeTitle = await driver.getTitle();
            assert.strictEqual(homeTitle, "Home - Hudl");

        } catch (e) {

            assert.fail(e);
        }

    };


    async function hudlLogin(email, password) {

        try {

            //find email, password and login. Then Enter good email address, good password and click login
            await goToHudlLoginPage();
            await driver.findElement(By.css(emailInputElement)).sendKeys(email);
            await driver.findElement(By.css(passwordInputElement)).sendKeys(password);
            await driver.findElement(By.css(loginBtnElement)).click();

        } catch (e) {

            assert.fail(e);

        }

    };

    async function loginPageCheck() {

        try {

            //should check that the title text is the correct "Log In"
            let homeTitle = await driver.getTitle();
            assert.strictEqual(homeTitle, "Log In");

        } catch (e) {

            assert.fail(e);

        }

    };

    async function loginError() {

        try {

            //find the error text
            let errorMessageText = await driver.wait(until.elementLocated(By.css(loginErrorElement)), 20000, 'Timed out after 20 seconds', 1000);
            await driver.wait(until.elementIsVisible(errorMessageText), 10000, 'Timed out looking for the login error message element');
            errorMessageText = await driver.findElement(By.css(loginErrorElement)).getText();
            assert.strictEqual(errorMessageText, "We didn't recognize that email and/or password.Need help?");

        } catch (e) {

            assert.fail(e);
        }

    };

    async function hudlLogout() {

        try {

            //should check that the title text is the correct "Home - Hudl"
            await driver.get(hudlLogoutUrl);
            let logoutUrl = await driver.getCurrentUrl();
            assert.strictEqual(logoutUrl, hudlUrl);

        } catch (e) {

            assert.fail(e);

        }

    };

    it('Should login to hudl.com with correct email and password', async function () {

        //set the time out for this test to 2 mins, if 2 mins happens the test will fail.
        this.timeout(120000);

        try {

            //should login to https://hudl.com with correct email and password
            await hudlLogin(hudlCorrectEmail, hudlCorrectPassword);

            //should check that the title text is the correct "Home - Hudl"
            await hudlHomePageCheck();

            //should naviage to the logout URL and make sure the page logged out.
            await hudlLogout();

        } catch (e) {

            assert.fail(e);

        }
    });

    it('Should try to login to hudl.com with wrong email and correct password', async function () {

        //set the time out for this test to 2 mins, if 2 mins happens the test will fail.
        this.timeout(120000);

        try {

            //should try to login to https://hudl.com with wrong email and correct password
            await hudlLogin(hudlWrongEmail, hudlCorrectPassword);

            //find the login error text
            await loginError();

            //should check that the title text is the correct "Log In"
            await loginPageCheck();

            //go to https://hudl.com
            await goToHudlUrl();

        } catch (e) {

            assert.fail(e);

        }
    });

    it('Should try to login to hudl.com with correct email and wrong password', async function () {

        //set the time out for this test to 2 mins, if 2 mins happens the test will fail.
        this.timeout(120000);

        try {

            //should try to login to https://hudl.com with wrong email and correct password
            await hudlLogin(hudlCorrectEmail, hudlWrongPassword);

            //find the login error text
            await loginError();

            //should check that the title text is the correct "Log In"
            await loginPageCheck();

            //go to https://hudl.com
            await goToHudlUrl();

        } catch (e) {

            assert.fail(e);

        }
    });

});