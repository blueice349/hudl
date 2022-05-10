// https://www.lambdatest.com/blog/automation-testing-with-selenium-javascript/
const { By, Key, Builder } = require( "selenium-webdriver" );
require( "chromedriver" );

var hudlLogin = "https://www.hudl.com/login";
var hudlLogout = "https://www.hudl.com/logout";
var goodEmail = "blueice349@gmail.com";
var goodPassword = "Asapjax1";
var badEmail = "blueice349@gmail.comm";

async function goodLogin() {

    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();

    //To go to hudl site from the chrome browser .
    await driver.get( hudlLogin );

    //To enter good email and password and login
    await driver.findElement(By.id("email")).sendKeys(goodEmail);
    await driver.findElement(By.id("password")).sendKeys(goodPassword);
    await driver.findElement(By.id("logIn")).click();

    //Verify the page title and print it
    driver.sleep(2000).then( function () {
       driver.getTitle().then(function (title) {
            if (title === 'Home - Hudl') {
                console.log('Good login test passed, Title is:', title);
            } else {
                console.log('Good login test failed, Title is:', title);
            }
            driver.quit();
        });
    });
}

async function badEmailLogin() {

    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();

    //To go to hudl site from the chrome browser .
    await driver.get(hudlLogin);

    //To enter bad email good password and try to login
    await driver.findElement(By.id("email")).sendKeys(badEmail);
    await driver.findElement(By.id("password")).sendKeys(goodPassword);
    await driver.findElement(By.id("logIn")).click();

    //Verify the page title and print it
    driver.sleep(2000).then(function () {
        driver.getTitle().then(function (title) {
            if (title === 'Log In') {
                console.log('Bad email login test passed, Title is:', title);
            } else {
                console.log('Bad email login test failed, Title is:', title);
            }
            driver.quit();
        });
    });
}

const run = async () => {
    await goodLogin();
    await badEmailLogin();
}

run();