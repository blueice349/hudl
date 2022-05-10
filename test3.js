require("chromedriver");

const { Builder, By, Key } = require("selenium-webdriver");
const assert = require("assert");

var hudlLogin = "https://www.hudl.com/login";
var hudlLogout = "https://www.hudl.com/logout";
var goodEmail = "blueice349@gmail.com";
var goodPassword = "Asapjax1";
var badEmail = "blueice349@gmail.comm";
var badPassword = "password";

async function goodLogin() {
    //open Chrome browser
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        //open the website
        await driver.get(hudlLogin);
        let loginTitle = await driver.getTitle();
        //assert that thetitle text is the correct "Log In"
        assert.strictEqual(loginTitle, "Log In");
        
        //find email, password and login. Enter email address, password and click login
        await driver.findElement(By.id("email")).sendKeys(goodEmail);
        await driver.findElement(By.id("password")).sendKeys(goodPassword);
        await driver.findElement(By.id("logIn")).click();
        await driver.get("https://www.hudl.com/home");

        //get the title
        let homeTitle = await driver.getTitle();
        //assert that thetitle text is the correct "Home - Hudl"
        assert.strictEqual(homeTitle, "Home - Hudl");
        console.log("TEST PASSED");

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
        await driver.get(hudlLogin);
        let loginTitle = await driver.getTitle();
        //assert that thetitle text is the correct "Log In"
        assert.strictEqual(loginTitle, "Log In");

        //find email, password and login. Enter email address, password and click login
        await driver.findElement(By.id("email")).sendKeys(badEmail);
        await driver.findElement(By.id("password")).sendKeys(goodPassword);
        await driver.findElement(By.id("logIn")).click();
        await driver.get("https://www.hudl.com/home");

        //get the title
        let homeTitle = await driver.getTitle();
        //assert that thetitle text is the correct "Log In"
        assert.strictEqual(homeTitle, "Log In");
        console.log("TEST PASSED");

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
        await driver.get(hudlLogin);
        let loginTitle = await driver.getTitle();
        //assert that thetitle text is the correct "Log In"
        assert.strictEqual(loginTitle, "Log In");

        //find email, password and login. Enter email address, password and click login
        await driver.findElement(By.id("email")).sendKeys(goodEmail);
        await driver.findElement(By.id("password")).sendKeys(badPassword);
        await driver.findElement(By.id("logIn")).click();
        await driver.get("https://www.hudl.com/home");

        //get the title
        let homeTitle = await driver.getTitle();
        //assert that thetitle text is the correct "Log In"
        assert.strictEqual(homeTitle, "Log In");
        console.log("TEST PASSED");

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