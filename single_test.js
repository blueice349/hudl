const chai = require('chai');
const expect = require('chai').expect;
var assert = require('assert');
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var By = webdriver.By;
var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions( /* … */)
    .build();

var hudlSite = "https://www.hudl.com/login";
var goodEmail = "blueice349@gmail.com";
var goodPassword = "Asapjax1";
var badEmail = "blueice349@gmail.comm";
var badpassword = "password";

describe('Login test for hudl', function () {

    after( async function () {

        driver.quit();

    });

    describe('Should login to hudl', function () {

        it('should go to hudl enter a good email and password and sucsfully login', function (done) {
            this.timeout(10000);
            driver.get(hudlSite);
            driver.getTitle().then(function (title) {
                expect(title).equal('Some String Here');

            }).catch(err=>{
                console.log(err)
            });
            driver.findElement(By.id("email")).sendKeys(goodEmail);
            driver.findElement(By.id("password")).sendKeys(goodPassword);
            driver.findElement(By.id("logIn")).click();
            driver.getTitle().then( function (title) {
                expect(title).to.equal("Home - Hudl");
                done();
                console.log(title);
            });
        });
    });

    // describe('Should fail to login to hudl', function () {

    //     it('should go to hudl and enter bad email good password and fail to login', function () {
    //         driver.get(hudlSite);
    //         driver.getTitle().then(function (title) {
    //             expect(title).equals('Lodg In');
    //         });
    //         driver.findElement(By.id("email")).sendKeys(badEmail);
    //         driver.findElement(By.id("password")).sendKeys(goodPassword);
    //         driver.findElement(By.id("logIn")).click();
    //         driver.getTitle().then(function (title) {
    //             expect(title).equals('Lodg In');
    //         });
            
    //     });
    //     it('should go to hudl and enter good email bad password and fail to login', function () {
    //         driver.get(hudlSite);
    //         driver.getTitle().then(function (title) {
    //             expect(title).equals("Losg In");
    //         });
    //         driver.findElement(By.id("email")).sendKeys(goodEmail);
    //         driver.findElement(By.id("password")).sendKeys(badpassword);
    //         driver.findElement(By.id("logIn")).click();
    //         driver.getTitle().then(function (title) {
    //             expect(title).equals('Lodg In');
    //         });
    //     });
    // });
});