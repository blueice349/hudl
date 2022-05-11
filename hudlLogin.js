const {webdriver, Builder, By, Key, until} = require('selenium-webdriver'),
    test = require('selenium-webdriver/testing'),
    assert = require('assert'),
    chai = require('chai'),
    expect = require('chai').expect;

var hudlUrl = 'https://www.hudl.com/',
    hudlHomeUrl = 'https://www.hudl.com/home',
    hudlLoginUrl = 'https://www.hudl.com/login',
    hudlLogoutUrl = 'https://www.hudl.com/logout',
    login = '[data-qa-id="login"]',
    hudlCorrectEmail = process.env.HUDL_CORRECT_EMAIL,
    hudlCorrectPassword = process.env.HUDL_CORRECT_PASSWORD,
    hudlWrongEmail = 'wrongemail@wrongemail.com',
    hudlWrongPassword = 'wrongPassword',
    emailInput = '[data-qa-id="email-input"]',
    passwordInput = '[data-qa-id="password-input"]',
    loginBtn = '[data-qa-id="login-btn"]',
    loginError = '[data-qa-id="error-display"]',
    videoElement = '[data-qa-id="webnav-primarynav-video"]',
    driverRunning;

let driver;
    
  describe('Hudl login test', function() {

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
        if(!driverRunning){

        driver = await new Builder().forBrowser('chrome').build();

        } else {

            console.log('Driver is alreqady running');
        }

        //should go to https://hudl.com and click the login button before each test
        try {

            //go to hudl.com website
            await goToHudlUrl();

            //find and click the login button
            await driver.findElement(By.css(login)).click();
            await loginPageCheck();
            //let loginTitle = await driver.getTitle();
            //should check that the title is the correct "Log In"
            //assert.strictEqual(loginTitle, "Log In");

        } catch (e) {

            //catch any errors and fail the test
            assert.fail(e);

        }

    });

    afterEach(async function () {

        //should close the browser and driver after each test
        await driver.quit();
        driverRunning = false;

    });

    after(async function () {

        //should close the browser and driver after all test run if still runing
        if(driverRunning){

            await driver.quit();
            driverRunning = false;
        
        } else {

            console.log('Driver is already stopped');
            driverRunning= false;

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

            //should check that the title is correcct "Hudl: We Help Teams and Athletes Win"
            assert.strictEqual(hudlUrlTitle, "Hudl: We Help Teams and Athletes Win");

            //find and click the login button
            await driver.findElement(By.css(login)).click();
            await loginPageCheck();

        } catch (e) {

            assert.fail(e);

        }

    };

    async function goToHudlHomeUrl() {

        try {

            //should check that the title text is the correct "Home - Hudl"
            await driver.get(hudlHomeUrl);
            let currentUrl = await driver.getCurrentUrl();
            assert.strictEqual(currentUrl, hudlHomeUrl);

        } catch (e) {

            assert.fail(e);

        }

    };

    async function hudlHomePageCheck(videoText) {

        try {

            //checks to see if we are on home page after login
            let videoElementPresent = await driver.wait(until.elementLocated(By.css(videoElement)), 30000).getText();
            assert.strictEqual(videoElementPresent, videoText);
            await goToHudlHomeUrl();
            //await driver.get(hudlHomeUrl);

            //should check that the title text is the correct "Home - Hudl"
            let homeTitle = await driver.getTitle();
            assert.strictEqual(homeTitle, "Home - Hudl");

        } catch (e) {

            assert.fail(e);

        }

    };


    async function hudlLogin(email, password) {

        try {

            //find email, password and login. Then Enter good email address, good password and click login
            console.log('1 ' + email);
            await driver.findElement(By.css(emailInput)).sendKeys(email);
            console.log('2');
            await driver.findElement(By.css(passwordInput)).sendKeys(password);
            console.log('3');
            await driver.findElement(By.css(loginBtn)).click();
            console.log('4');

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
            await driver.sleep(3000);
            let errorMessage = await driver.findElement(By.css(loginError)).getText();
            assert.strictEqual(errorMessage, "We didn't recognize that email and/or password.Need help?");

        } catch(e) {

            assert.fail(e);

        }

    };

    async function hudlLogout() {

        try {

            //should check that the title text is the correct "Home - Hudl"
            await driver.get(hudlLogoutUrl);
            let logoutUrl = await driver.getCurrentUrl();
            assert.strictEqual(logoutUrl, hudlUrl)

        } catch (e) {

            assert.fail(e);

        }

    };

    it('Should try to login to hudl with correct email and password', async function () {
        this.skip();
        //set the time out for this test to 2 mins, if 2 mins happens the test will fail.
        this.timeout(120000);

        try {

            //should login to https://hudl.com with correct email and password
            await hudlLogin(hudlCorrectEmail, hudlCorrectPassword);
            
            //wait for video element on page
            let videoElementPresent = await driver.wait(until.elementLocated(By.css(videoElement)), 30000).getText();
            
            //should check that the title text is the correct "Home - Hudl"
            await hudlHomePageCheck(videoElementPresent);

            //should naviage to the logout URL and make sure the page logged out.
            await hudlLogout();

        } catch (e) {

            assert.fail(e);

        }
    });

    it('Should try to login to hudl with wrong email and correct password', async function () {

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

    it('Should try to login to hudl with correct email and wrong password', async function () {
        this.skip();
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