require('chromedriver');

const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

var hudlUrl = 'https://www.hudl.com/';
var hudlHomeUrl = 'https://www.hudl.com/home';
var hudlLoginUrl = 'https://www.hudl.com/login';
var hudlLogoutUrl = 'https://www.hudl.com/logout';
var login = '[data-qa-id="login"]';
var hudlCorrectEmail = process.env.HUDL_CORRECT_EMAIL;
var hudlCorrectPassword = process.env.HUDL_CORRECT_PASSWORD;
var hudlWrongEmail = 'noemail';
var hudlWrongPassword = 'password';
var emailInput = '[data-qa-id="email-input"]';
var passwordInput = '[data-qa-id="password-input"]';
var loginBtn = '[data-qa-id="login-btn"]';
var loginError = '[data-qa-id="error-display"]';
var videoElement = '[data-qa-id="webnav-primarynav-video"]';

async function goodLogin() {

    //open Chrome browser
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        
        //open the website
        await driver.get(hudlUrl);
        let hudlUrlTitle = await driver.getTitle();
        //assert thqt the title is correcct "Hudl: We Help Teams and Athletes Win"
        assert.strictEqual(hudlUrlTitle, "Hudl: We Help Teams and Athletes Win");
        await driver.findElement(By.css(login)).click();
        let loginTitle = await driver.getTitle();
        //assert that the title text is the correct "Log In"
        assert.strictEqual(loginTitle, "Log In");
    
    } catch (e) {

        console.log('goodLogin() FAILED');
        await driver.quit();
        assert.fail(e);
    
    }

    try {

        //find email, password and login. Enter good email address, good password and click login
        await driver.findElement(By.css(emailInput)).sendKeys(hudlCorrectEmail);
        await driver.findElement(By.css(passwordInput)).sendKeys(hudlCorrectPassword);
        await driver.findElement(By.css(loginBtn)).click();
        let videoElementPresent = await driver.wait(until.elementLocated(By.css(videoElement)), 30000).getText();
        assert.strictEqual(videoElementPresent, "Video");
        await driver.get(hudlHomeUrl);

        //get the title
        let homeTitle = await driver.getTitle();
        //assert that thetitle text is the correct "Home - Hudl"
        assert.strictEqual(homeTitle, "Home - Hudl");
        await driver.get(hudlLogoutUrl);
        let logoutUrl = await driver.getCurrentUrl();
        assert.strictEqual(logoutUrl, hudlUrl);
        console.log("goodLogin() PASSED");

    } catch (e) {

        console.log('goodLogin() FAILED');
        await driver.quit();
        assert.fail(e);    

    } finally {

        //close the browser
        await driver.quit();
    }
};

async function badEmailLogin() {

    //open Chrome browser
    let driver = await new Builder().forBrowser("chrome").build();

    try {

        //open the website
        await driver.get(hudlUrl);
        let hudlUrlTitle = await driver.getTitle();
        //assert thqt the title is correcct "Hudl: We Help Teams and Athletes Win"
        assert.strictEqual(hudlUrlTitle, "Hudl: We Help Teams and Athletes Win");
        await driver.findElement(By.css(login)).click();
        let loginTitle = await driver.getTitle();
        //assert that thetitle text is the correct "Log In"
        assert.strictEqual(loginTitle, "Log In");

    } catch (e) {

        console.log('badEmailLogin() FAILED');
            await driver.quit();
            assert.fail(e);
    }

    try {

        //find email, password and login. Enter bad email address, good password and click login
        await driver.findElement(By.css(emailInput)).sendKeys(hudlWrongEmail);
        await driver.findElement(By.css(passwordInput)).sendKeys(hudlCorrectPassword);
        await driver.findElement(By.css(loginBtn)).click();
        let loginErrorElement = await driver.wait(until.elementLocated(By.css(loginError)), 30000);
        await driver.wait(until.elementIsVisible(loginErrorElement), 30000);
        // finds error text
        let errorMessage = await driver.findElement(By.css(loginError)).getText();
        assert.strictEqual(errorMessage, "We didn't recognize that email and/or password.Need help?");
        await driver.get(hudlHomeUrl);

        //get the title
        let homeTitle = await driver.getTitle();
        //assert that thetitle text is the correct "Log In"
        assert.strictEqual(homeTitle, "Log In");
        console.log("badEmailLogin() PASSED");

    } catch (e) {

        console.log('badEmailLogin() FAILED');
        await driver.quit();
        assert.fail(e);
    
     } finally {

        //close the browser
        await driver.quit();
    }
};

async function badPasswordLogin() {

    //open Chrome browser
    let driver = await new Builder().forBrowser("chrome").build();

    try {

        //open the website
        await driver.get(hudlUrl);
        let hudlUrlTitle = await driver.getTitle();
        //assert thqt the title is correcct "Hudl: We Help Teams and Athletes Win"
        assert.strictEqual(hudlUrlTitle, "Hudl: We Help Teams and Athletes Win");
        //click login
        await driver.findElement(By.css(login)).click();
        let loginTitle = await driver.getTitle();
        //assert that thetitle text is the correct "Log In"
        assert.strictEqual(loginTitle, "Log In");
    
    } catch (e) {

        console.log('badPasswordLogin() TEST FAILED');
        await driver.quit();
        assert.fail(e);

    }
    
    try {
        
        //find email, password and login. Enter good email address, bad password and click login
        await driver.findElement(By.css(emailInput)).sendKeys(hudlCorrectEmail);
        await driver.findElement(By.css(passwordInput)).sendKeys(hudlWrongPassword);
        await driver.findElement(By.css(loginBtn)).click(); 
        let loginErrorElement = await driver.wait(until.elementLocated(By.css(loginError)), 30000);
        await driver.wait(until.elementIsVisible(loginErrorElement), 30000);
        //finds error text
        let errorMessage = await driver.findElement(By.css(loginError)).getText();
        assert.strictEqual(errorMessage, "We didn't recognize that email and/or password.Need help?");
        await driver.get(hudlHomeUrl);

        //get the title
        let homeTitle = await driver.getTitle();
        //assert that thetitle text is the correct "Log In"
        assert.strictEqual(homeTitle, "Log In");
        console.log("badPasswordLogin() PASSED");
    
    } catch (e) {

        console.log('badPasswordLogin() FAILED');
        await driver.quit();
        assert.fail(e);

    } finally {

        //close the browser
        await driver.quit();
    }
};

const run = async () => {

   await goodLogin();
   await badEmailLogin();
   await badPasswordLogin(); 
}

run();