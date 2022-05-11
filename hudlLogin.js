


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
    hudlWrongEmail = 'noemail',
    hudlWrongPassword = 'password',
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

          //should start the chrome browser before each test
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

        //should go to https://hudle.com and click the login button before each test
        try {

            //open the website
            await driver.get(hudlUrl);
            let hudlUrlTitle = await driver.getTitle();
            //should check that the title is correcct "Hudl: We Help Teams and Athletes Win"
            assert.strictEqual(hudlUrlTitle, "Hudl: We Help Teams and Athletes Win");
            //find and click the login button
            await driver.findElement(By.css(login)).click();
            let loginTitle = await driver.getTitle();
            //should check that the title is the correct "Log In"
            assert.strictEqual(loginTitle, "Log In");

        } catch (e) {

            //catch any errors and fail the test
            console.log('TEST FAILED');
            await driver.quit();
            assert.fail(e);

        }

    });

    afterEach(async function () {

        //should close the browswer and driver after each test
        await driver.quit();
        driverRunning = false;

    });

    after(async function () {

        //should close the browswer and driver after each test
        if(driverRunning == true){

            await driver.quit();
            driverRunning = false;
        
        } else {

            console.log('Driver has already stopped running');

        }

    });

    it('Should try to login to hudl with correct email and password', async function () {

        //set the time out for this test to 2 mins, if 2 mins happens the test will fail.
        this.timeout(120000);

        try {

            //find email, password and login. Then Enter good email address, good password and click login
            await driver.findElement(By.css(emailInput)).sendKeys(hudlCorrectEmail);
            await driver.findElement(By.css(passwordInput)).sendKeys(hudlCorrectPassword);
            await driver.findElement(By.css(loginBtn)).click();
            let videoElementPresent = await driver.wait(until.elementLocated(By.css(videoElement)), 30000).getText();
            assert.strictEqual(videoElementPresent, "Video");
            await driver.get(hudlHomeUrl);

            //should check that the title text is the correct "Home - Hudl"
            let homeTitle = await driver.getTitle();
            assert.strictEqual(homeTitle, "Home - Hudl");

            //should naviage to the logout URL and make sure the page logged out.
            await driver.get(hudlLogoutUrl);
            let logoutUrl = await driver.getCurrentUrl();
            assert.strictEqual(logoutUrl, hudlUrl);
            console.log("TEST PASSED");

        } catch (e) {

            console.log('TEST FAILED');
            await driver.quit();
            assert.fail(e);

        }
    });

    it('Should try to login to hudl with wrong email and correct password', async function () {

        //set the time out for this test to 2 mins, if 2 mins happens the test will fail.
        this.timeout(120000);

        try {

            //find email, password and login. Enter bad email address, good password and click login
            await driver.findElement(By.css(emailInput)).sendKeys(hudlWrongEmail);
            await driver.findElement(By.css(passwordInput)).sendKeys(hudlCorrectPassword);
            await driver.findElement(By.css(loginBtn)).click();
            let loginErrorElement = await driver.wait(until.elementLocated(By.css(loginError)), 30000);
            await driver.wait(until.elementIsVisible(loginErrorElement), 30000);

            //find the error text
            let errorMessage = await driver.findElement(By.css(loginError)).getText();
            assert.strictEqual(errorMessage, "We didn't recognize that email and/or password.Need help?");
            await driver.get(hudlHomeUrl);

            //should check that the title text is the correct "Log In"
            let homeTitle = await driver.getTitle();
            assert.strictEqual(homeTitle, "Log In");
            console.log("TEST PASSED");

        } catch (e) {

            console.log('badEmailLogin() FAILED');
            await driver.quit();
            assert.fail(e);

        }
    });

    it('Should try to login to hudl with wrong email and correct password', async function () {

        //set the time out for this test to 2 mins, if 2 mins happens the test will fail.
        this.timeout(120000);

        try {

            //find email, password and login. Enter good email address, bad password and click login
            await driver.findElement(By.css(emailInput)).sendKeys(hudlCorrectEmail);
            await driver.findElement(By.css(passwordInput)).sendKeys(hudlWrongPassword);
            await driver.findElement(By.css(loginBtn)).click();
            let loginErrorElement = await driver.wait(until.elementLocated(By.css(loginError)), 30000);
            await driver.wait(until.elementIsVisible(loginErrorElement), 30000);

            //find the error text
            let errorMessage = await driver.findElement(By.css(loginError)).getText();
            assert.strictEqual(errorMessage, "We didn't recognize that email and/or password.Need help?");
            await driver.get(hudlHomeUrl);

            //should check that the title text is the correct "Log In"
            let homeTitle = await driver.getTitle();
            assert.strictEqual(homeTitle, "Log In");
            console.log("TEST PASSED");

        } catch (e) {

            console.log('TEST FAILED');
            await driver.quit();
            assert.fail(e);

        }
    });

  });